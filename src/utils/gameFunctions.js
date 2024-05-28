/* global BigInt */
import $ from 'jquery'
import * as nearApi from 'near-api-js'
import { getConfig } from './networkConfig'
import { wallet } from '..'
import { inizialise_game } from './initialiseGame'
const { contractName, NFTContractName, cheddarToken, nekoToken } = getConfig()

const nft_web4_url = 'https://nft-checkers.near.page/style'
export const players_css = ['player-1', 'player-2']

export let current_game_id = -1
let loadPlayersInterval
let loadGamesInterval
let loadGameInterval

export async function load() {
  if (loadPlayersInterval) clearInterval(loadPlayersInterval)
  if (loadGamesInterval) clearInterval(loadGamesInterval)
  if (loadGameInterval) clearInterval(loadGameInterval)

  loadAvailableGames().then(async (my_games) => {
    update_game_ui(my_games)
    if (!my_games.length) {
      loadPlayers().then(() => {
        loadPlayersInterval = setInterval(async () => {
          await loadPlayers()
        }, 10000)
      })

      // check for new game
      loadGamesInterval = setInterval(async () => {
        await loadAvailableGames().then(async (my_games) => {
          update_game_ui(my_games)
          if (loadGameInterval) clearInterval(loadGameInterval)
          load_game().then(() => {
            loadGameInterval = setInterval(async () => {
              await load_game()
            }, 3000)
          })
        })
      }, 10000)
    } else {
      if (loadGameInterval) clearInterval(loadGameInterval)
      load_game().then(() => {
        loadGameInterval = setInterval(async () => {
          await load_game()
        }, 3000)
      })
    }
  })
}

function update_game_ui(my_games) {
  if (my_games.length) {
    $('#near-game').removeClass('hidden')
    current_game_id = my_games[0][0]

    $('#near-waiting-list').addClass('hidden')
    $('#near-available-players').addClass('hidden')
    $('#near-make-available-block').addClass('hidden')
    $('#near-make-unavailable-block').addClass('hidden')
  } else {
    $('#near-waiting-list').removeClass('hidden')
    $('#near-available-players').removeClass('hidden')
  }
  $('#near-game-stats').toggleClass('hidden', my_games.length === 0)
}

function getPlayerByIndex(game, index) {
  if (index === 0) {
    return game.player_1
  } else if (index === 1) {
    return game.player_2
  } else {
    alert('Error with player index')
    return -1
  }
}

let force_reload = false
let last_updated_turn = -1

export async function stop_game() {
  await wallet
    .callMethod({
      contractId: contractName,
      method: 'stop_game',
      args: { game_id: current_game_id },
      gas: GAS_GIVE_UP,
    })
    .then(async (resp) => {
      force_reload = true
      await load_game()
    })
    .catch(async (e) => {
      force_reload = true
      alert(e)
      await load_game()
    })
}

async function load_game() {
  if (current_game_id >= 0) {
    await wallet
      .viewMethod({
        contractId: contractName,
        method: 'get_game',
        args: { game_id: current_game_id },
      })
      .then(async (game) => {
        if (!game) return

        force_reload = false

        let is_turn_availabe =
          getPlayerByIndex(game, game.current_player_index) === wallet.accountId

        if (game.turns > -1) {
          let player_1_spent = getTimeSpent(
            game.total_time_spent[0],
            game.last_turn_timestamp,
            game.current_player_index === 0
          )
          let player_2_spent = getTimeSpent(
            game.total_time_spent[1],
            game.last_turn_timestamp,
            game.current_player_index === 1
          )
          document.getElementById('near-player-1-time-spent').innerText =
            'Time spent: ' + fromatTimestamp(player_1_spent)
          document.getElementById('near-player-2-time-spent').innerText =
            'Time spent: ' + fromatTimestamp(player_2_spent)

          if (
            game.player_1 === wallet.accountId &&
            isOpponentTimeSpent(player_2_spent)
          ) {
            $('#near-player-1-stop-game').removeClass('hidden')
          } else if (
            game.player_2 === wallet.accountId &&
            isOpponentTimeSpent(player_1_spent)
          ) {
            $('#near-player-2-stop-game').removeClass('hidden')
          }
        }

        window.player1 = game.player_1
        window.player2 = game.player_2
        await loadPlayerNFT()

        if (
          !force_reload &&
          is_turn_availabe &&
          last_updated_turn === game.turns &&
          game.winner_index === null
        ) {
          return
        }

        last_updated_turn = game.turns

        let selectedPiece = $('.selected').attr('id')
        $('.piece').remove()

        document.getElementById('near-game-player-1').innerText = game.player_1
        document.getElementById('near-game-player-2').innerText = game.player_2
        document.getElementById('near-game-turn').innerText = game.turns
        let half_reward =
          parseFloat(
            nearApi.utils.format.formatNearAmount(game.reward.balance, 2)
          ) / 2
        let rewardToken = getTokenName(game.reward.token_id)
        document.getElementById('near-player-1-deposit').innerText =
          `Deposit: ${half_reward} ${rewardToken}`
        document.getElementById('near-player-2-deposit').innerText =
          document.getElementById('near-player-1-deposit').innerText

        if (game.winner_index !== null) {
          $('#near-game-finished').removeClass('hidden')
          document.getElementById('near-game-winner').innerText =
            getPlayerByIndex(game, game.winner_index)
          document.getElementById('near-game-reward').innerText =
            `${nearApi.utils.format.formatNearAmount(game.reward.balance, 2)} ${rewardToken}`
          $('#near-game-give-up').addClass('hidden')
          $('#near-game-turn').addClass('hidden')
        } else {
          $('#near-game-finished').addClass('hidden')
          $('#near-game-give-up').removeClass('hidden')
          $('#near-game-turn').removeClass('hidden')
        }

        if (game.current_player_index === 0) {
          $('#near-active-player-1').removeClass('hidden')
          $('#near-active-player-2').addClass('hidden')
          $('.turn').css(
            'background',
            'linear-gradient(to right, #BEEE62 50%, transparent 50%)'
          )
        } else if (game.current_player_index === 1) {
          $('#near-active-player-2').removeClass('hidden')
          $('#near-active-player-1').addClass('hidden')
          $('.turn').css(
            'background',
            'linear-gradient(to right, transparent 50%, #BEEE62 50%)'
          )
        }

        //let board = reverseArray(game.board)

        /*let board = game.board.reverse();
            if(game.player_1 === wallet.accountId){
                console.log("reverse board");
                //board = reversePlayers(board.reverse());
                board = reversePlayers(board);
                console.log(board)
            }
            else{
                board = reverseArray(game.board.reverse())
                board = reversePlayers(board);
            }*/

        let board = game.board

        if (game.player_1 === wallet.accountId) {
          board = board.reverse()
          //board = reverseArray(board);
          //board = reversePlayers(board);
        } else if (game.player_2 === wallet.accountId) {
          board = reverseArray(board)
          board = reversePlayers(board)
        }

        let inverse_colors = game.player_2 === wallet.accountId

        inizialise_game(
          board,
          [2, 1][parseInt(game.current_player_index)],
          inverse_colors
        ) // 0 -> 2, 1 -> 1

        if (selectedPiece && is_turn_availabe) {
          $('#' + selectedPiece).addClass('selected')
        }

        $('.piece').toggleClass('disabled', !is_turn_availabe)
      })
  }
}

function isOpponentTimeSpent(time_spent) {
  return time_spent > 3600
}

function getTimeSpent(
  total_time_spent,
  last_turn_timestamp,
  is_current_player
) {
  if (is_current_player) {
    let after_last_turn =
      new Date().getTime() / 1000 - last_turn_timestamp / 1000000000
    return total_time_spent / 1000000000 + after_last_turn
  } else {
    return total_time_spent / 1000000000
  }
}

function fromatTimestamp(total_seconds) {
  var sec_num = parseInt(total_seconds, 10)
  var hours = Math.floor(sec_num / 3600)
  var minutes = Math.floor((sec_num - hours * 3600) / 60)
  var seconds = sec_num - hours * 3600 - minutes * 60

  if (hours < 10) {
    hours = '0' + hours
  }
  if (minutes < 10) {
    minutes = '0' + minutes
  }
  if (seconds < 10) {
    seconds = '0' + seconds
  }
  return hours + ':' + minutes + ':' + seconds
}

export async function make_move(line) {
  if (current_game_id >= 0) {
    await wallet
      .callMethod({
        contractId: contractName,
        method: 'make_move',
        args: { game_id: current_game_id, line },
        gas: GAS_MOVE,
      })
      .then(async (resp) => {
        force_reload = true
        await load_game()
      })
      .catch(async (e) => {
        let string = JSON.stringify(e)
        let error_begins = string.indexOf('***')
        if (error_begins !== -1) {
          let error_ends = string.indexOf("'", error_begins)
          force_reload = true
          alert(string.substring(error_begins + 4, error_ends))
        } else {
          alert(e)
        }

        await load_game()
      })
  }
}

window.give_up = async function give_up() {
  if (current_game_id >= 0) {
    await wallet
      .callMethod({
        contractId: contractName,
        method: 'give_up',
        args: { game_id: current_game_id },
        gas: GAS_GIVE_UP,
        deposit: '1',
      })
      .then(async (resp) => {
        console.log(resp)
        await load_game()
      })
  }
}

async function loadAvailableGames() {
  return await wallet
    .viewMethod({
      contractId: contractName,
      method: 'get_available_games',
      args: { from_index: 0, limit: 50 },
    })
    .then((games) => {
      let mygames = games.filter(
        (game) =>
          game[1][0] === wallet.accountId || game[1][1] === wallet.accountId
      )
      return mygames
    })
}

function getTokenName(token_id) {
  let tokenName = ''
  switch (token_id) {
    case cheddarToken:
      tokenName = 'CHEDDAR'
      break
    case nekoToken:
      tokenName = 'NEKO'
      break
    default:
      tokenName = 'NEAR'
      break
  }
  return tokenName
}

async function loadPlayers() {
  await wallet
    .viewMethod({
      contractId: contractName,
      method: 'get_available_players',
      args: { from_index: 0, limit: 50 },
    })
    .then((players) => {
      $('#near-available-players-hint').toggleClass(
        'hidden',
        players.length === 0
      )
      if (players.length) {
        let current_player_is_available = false
        let items = players.map((player) => {
          const token_id = player[1].token_id
          let displayableTokenName = getTokenName(token_id)
          if (!current_player_is_available && player[0] === wallet.accountId) {
            current_player_is_available = true
          }
          if (player[0] !== wallet.accountId) {
            return `<li><a href="#" onclick='select("${player[0]}", "${player[1].deposit}", "${token_id}")'>${player[0]}, bid: ${window.nearApi.utils.format.formatNearAmount(player[1].deposit, 24)} ${displayableTokenName}</a>`
          } else {
            return `<li><strong>${player[0]}, bid: ${window.nearApi.utils.format.formatNearAmount(player[1].deposit, 24)} ${displayableTokenName}</strong>`
          }
        })
        $('#near-available-players-list').html('<ul>' + items.join() + '</ul>')

        // console.log("current_player_is_available " + current_player_is_available)
        $('#near-make-available-block').toggleClass(
          'hidden',
          current_player_is_available
        )
        $('#near-make-unavailable-block').toggleClass(
          'hidden',
          !current_player_is_available
        )
      } else {
        $('#near-make-available-block').removeClass('hidden')
        $('#near-available-players-list').html(
          'No players available. Be the first!'
        )
      }
    })
}

const GAS_START_GAME = 50000000000000
const GAS_GIVE_UP = 50000000000000
const GAS_MOVE = 30000000000000

export function get_referral() {
  try {
    var url = new URL(window.location.href)
    return url.searchParams.get('r')
  } catch (e) {
    console.log(e)
    return ''
  }
}

async function hasSufficientTokenBalance(tokenId, minAmount) {
  if (tokenId === 'NEAR') {
    return true
  }
  const balance = await wallet.viewMethod({
    contractId: tokenId,
    method: 'ft_balance_of',
    args: { account_id: wallet.accountId },
  })
  return BigInt(balance) > BigInt(minAmount)
}

window.select = async function select(player, deposit, tokenId) {
  let referrer_id = get_referral()
  // check cheddar/neko balance first
  const isSufficient = await hasSufficientTokenBalance(tokenId, deposit)
  if (!isSufficient) {
    alert(
      `You don't have sufficient balance, please swap tokens first to begin the game.`
    )
    return
  }
  const transactions = []

  transactions.unshift({
    receiverId: contractName,
    actions: [
      {
        type: 'FunctionCall',
        params: {
          methodName: 'start_game',
          args: {
            opponent_id: player,
            referrer_id,
          },
          amount: '0',
          gas: '75000000000000',
        },
      },
    ],
  })

  if (tokenId == 'NEAR') {
    const GAS_MAKE_AVAILABLE = '290000000000000'
    transactions.unshift({
      receiverId: contractName,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: 'make_available',
            args: {
              config: {
                first_move: 'Random',
              },
              referrer_id,
            },
            amount: deposit.toString(),
            gas: GAS_MAKE_AVAILABLE,
            deposit: deposit.toString(),
          },
        },
      ],
    })
  } else {
    transactions.unshift({
      receiverId: tokenId,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: 'ft_transfer_call',
            args: {
              receiver_id: contractName,
              amount: deposit.toString(),
              msg: '',
            },
            amount: nearApi.utils.format.parseNearAmount(
              '0.000000000000000000000001'
            ),
            gas: '75000000000000',
            deposit: '1',
          },
        },
      ],
    })

    let isAccountRegistered =
      (await wallet.viewMethod({
        contractId: tokenId,
        method: 'storage_balance_of',
        args: {
          account_id: wallet.accountId,
        },
      })) != null

    if (!isAccountRegistered) {
      transactions.unshift({
        receiverId: tokenId,
        actions: [
          {
            type: 'FunctionCall',
            params: {
              methodName: 'storage_deposit',
              args: {
                account_id: wallet.accountId,
              },
              amount: nearApi.utils.format.parseNearAmount('0.2'),
              gas: '100000000000000',
              deposit: nearApi.utils.format.parseNearAmount('0.01'),
            },
          },
        ],
      })
    }
  }
  console.log(transactions)
  wallet.wallet.signAndSendTransactions({ transactions: transactions })
}

export function logout() {
  wallet.logout()
}

export function login() {
  wallet.login()
}

export function loadScript(src, callback) {
  var s, r, t
  r = false
  s = document.createElement('script')
  s.type = 'text/javascript'
  s.src = src
  s.onload = s.onreadystatechange = function () {
    if (!r && (!this.readyState || this.readyState === 'complete')) {
      r = true
      callback()
    }
  }
  t = document.getElementsByTagName('script')[0]
  t.parentNode.insertBefore(s, t)
}

export function after() {
  const nearPromise = (async () => {
    await wallet.startUp()

    window.nft_tokens = ['', '']

    await load()

    if (!wallet.accountId) {
      $('#near-action-login').html(
        '<input type="button" class="login-button button" value="Log In">'
      )

      $('.login-button').on('click', function () {
        login()
      })
      $('.only-after-login').addClass('hidden')
      $('.only-before-login').removeClass('hidden')
    } else {
      $('#near-account').html('Logged in as ' + wallet.accountId)
      $('#near-action').html(
        '<input type="button" id="logout-button" class="login-button button" value="Log Out">'
      )

      $('#near-action').on('click', '#logout-button', function () {
        logout()
      })
      $('.only-after-login').removeClass('hidden')
      $('.only-before-login').addClass('hidden')

      $('#near-account-ref').html(
        "<div>Invite a friend to get a 10% referral bonus:</div><div><input type='text' style='width: 280px' value='" +
          window.location.origin +
          '/?r=' +
          wallet.accountId +
          "'/></div>"
      )

      // console.log("Logged in as " + window.accountId);
    }
  })()
}

async function loadPlayerNFT() {
  if (window.nft_loaded === true || !window.player1 || !window.player2) return

  window.nft_loaded = true
  await wallet
    .viewMethod({
      contractId: NFTContractName,
      method: 'nft_tokens_for_owner',
      args: { account_id: window.player1 },
    })
    .then((tokens) => {
      if (tokens.length) {
        loadPlayerCss(tokens[tokens.length - 1].token_id, 0)
      }
    })

  await wallet
    .viewMethod({
      contractId: NFTContractName,
      method: 'nft_tokens_for_owner',
      args: { account_id: window.player2 },
    })
    .then((tokens) => {
      if (tokens.length) {
        loadPlayerCss(tokens[tokens.length - 1].token_id, 1)
      }
    })
}

function loadPlayerCss(token_id, index) {
  const cssId = 'nft-css-' + index
  if (!document.getElementById(cssId)) {
    window.nft_tokens[index] = token_id
    const head = document.getElementsByTagName('head')[0]
    const link = document.createElement('link')
    link.id = cssId
    link.rel = 'stylesheet'
    link.type = 'text/css'
    link.href = `${nft_web4_url}/${token_id}.css`
    link.media = 'all'
    head.appendChild(link)

    updatePlayerNft(index)
  }
}

export function updateAllPlayersNft() {
  if (window.nft_tokens && window.nft_tokens.length) {
    ;[0, 1].map((index) => {
      if (window.nft_tokens[index] !== '') replacePlayerNftClass(index)
    })
  }
}

function updatePlayerNft(index) {
  if (window.nft_tokens.length) {
    if (window.nft_tokens[index] !== '') replacePlayerNftClass(index)
  }
}

function replacePlayerNftClass(index) {
  let nft_class = window.nft_tokens[index]
  let player_class = players_css[index]
  let player_account =
    index === 1 ? window.player2 : index === 0 ? window.player1 : ''

  let player_account_css = player_account.replace('.', '_').replace('-', '_')
  let nft_css = nft_class.replace('.', '_').replace(' ', '_').replace('-', '_')

  var places = document.getElementsByClassName(player_class)
  for (var x = 0; x < places.length; x++) {
    if (!places[x].classList.contains(nft_css)) places[x].classList.add(nft_css)
    if (!places[x].classList.contains(player_account_css))
      places[x].classList.add(player_account_css)
  }
}

function reversePlayers(arr) {
  let i, j
  for (i = 0; i < 8; i++) {
    for (j = 0; j < 8; j++) {
      if (arr[i][j] > 0) arr[i][j] = (arr[i][j] % 2) + 1
      else if (arr[i][j] < 0) arr[i][j] = -1 * ((Math.abs(arr[i][j]) % 2) + 1)
    }
  }
  return arr
}

function reverseArray(arr) {
  // https://www.geeksforgeeks.org/program-to-reverse-the-rows-in-a-2d-array/
  // Traverse each row of arr
  let i
  for (i = 0; i < 8; i++) {
    // Initialise start and end index
    var start = 0
    var end = 8 - 1

    // Till start < end, swap the element
    // at start and end index
    while (start < end) {
      // Swap the element
      var temp = arr[i][start]
      arr[i][start] = arr[i][end]
      arr[i][end] = temp

      // Increment start and decrement
      // end for next pair of swapping
      start++
      end--
    }
  }

  return arr
}

export async function ft_transfer(sender_id, amount, token_id) {
  const isSufficient = await hasSufficientTokenBalance(
    token_id,
    nearApi.utils.format.parseNearAmount(amount.toString())
  )
  if (!isSufficient) {
    alert(
      `You don't have sufficient balance, please swap tokens first to begin the game.`
    )
    return
  }
  const transactions = []

  transactions.unshift({
    receiverId: token_id,
    actions: [
      {
        type: 'FunctionCall',
        params: {
          methodName: 'ft_transfer_call',
          args: {
            receiver_id: contractName,
            amount: nearApi.utils.format.parseNearAmount(amount.toString()),
            msg: '',
          },
          amount: nearApi.utils.format.parseNearAmount(
            '0.000000000000000000000001'
          ),
          gas: '75000000000000',
          deposit: '1',
        },
      },
    ],
  })

  let isAccountRegistered =
    (await wallet.viewMethod({
      contractId: token_id,
      method: 'storage_balance_of',
      args: {
        account_id: wallet.accountId,
      },
    })) != null

  if (!isAccountRegistered) {
    transactions.unshift({
      receiverId: token_id,
      actions: [
        {
          type: 'FunctionCall',
          params: {
            methodName: 'storage_deposit',
            args: {
              account_id: sender_id,
            },
            amount: nearApi.utils.format.parseNearAmount('0.2'),
            gas: '100000000000000',
            deposit: nearApi.utils.format.parseNearAmount('0.01'),
          },
        },
      ],
    })
  }

  console.log(transactions)
  wallet.wallet.signAndSendTransactions({ transactions: transactions })
}
