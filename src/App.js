import React, { useEffect, useState } from 'react'
import { inizialise_game } from './utils/initialiseGame'

function App() {
  useEffect(() => {
    inizialise_game()
  }, [])

  const [isRule, setRule] = useState('true')
  const handleRuleToggle = (e) => {
    if (
      e.target.tagName.toLowerCase() == 'a' ||
      e.target.tagName.toLowerCase() == 'svg' ||
      e.target.tagName.toLowerCase() == 'path' ||
      e.target.id == 'rules-layer'
    ) {
      setRule(!isRule)
    }
  }

  // const [moreGamesShown, setMoreGamesShown] = useState(false)
  // const moreGamesDropdownHandler = () => {
  //   setMoreGamesShown(!moreGamesShown)
  // }

  const [userInfoShown, setUserInfoShown] = useState(false)
  const userDropdownHandler = () => {
    setUserInfoShown(!userInfoShown)
  }

  const [showBurguerMenu, setShowBurguerMenu] = useState(true)
  const handlerBurgerMenu = () => {
    setShowBurguerMenu(!showBurguerMenu)
  }

  const handleGiveUp = () => {
    window.give_up()
  }

  const handleStopGame = () => {
    window.stop_game()
  }

  return (
    <>
      <header>
        <div id="cheddar-mark">
          <a href="#" className="logo">
            <img src="./assets/img/cheddar-logo.svg" width="175px;" />
          </a>
        </div>

        <div className="nav-bar">
          <div className="show-in-big-screen">
            {/* <a className="btn btn-outline-none draw" href="https://draw.cheddar.farm" target="_blank">Draw 🎨</a> */}
            <a
              href="https://vps179324.iceservers.net/"
              target="_blank"
              className="btn btn-outline-none coinFlip"
            >
              CoinFlip{' '}
              <img src="./assets/img/cheddar.svg" alt="coin flip icon" />
            </a>
            <a
              href="https://nearhub.club/qEmhFPF/cheddar-farm-scavengerhunt001"
              target="_blank"
              className="btn btn-outline-none VRFarm"
            >
              {' '}
              VRFarm{' '}
              <svg
                width="16"
                height="16"
                fill="currentColor"
                className="bi bi-controller"
              >
                <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"></path>
                <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"></path>
              </svg>
            </a>
            <a
              href="https://app.cheddar.farm/"
              target="_blank"
              className="btn btn-outline-none farm"
            >
              Farm{' '}
              <img
                src="./assets/img/farmer-svgrepo-com.svg"
                alt="farmer icon"
              />
            </a>
          </div>

          <div id="burguer-button" onClick={handlerBurgerMenu}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              fill="currentColor"
              className="bi bi-list"
              viewBox="0 0 16 16"
            >
              <path
                fillRule="evenodd"
                d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </div>

          <div
            id="links"
            className={showBurguerMenu ? 'only-hide-on-mobile' : ''}
          >
            <a href="#" className="logo logo-in-mobile">
              <img src="./assets/img/cheddar-logo.svg" width="175px;" />
            </a>
            <div className="general-links">
              <a
                className="btn btn-outline-none"
                href="https://nft.cheddar.farm/"
                target="_blank"
              >
                PowerUp
                <svg
                  width="19"
                  height="20"
                  viewBox="0 0 19 23"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="#F9BA37"
                >
                  <path
                    d="M15.6841 2.60303C16.2051 1.94403 15.7141 1.00003 14.8481 1.00003H8.13205C7.9502 0.9987 7.77107 1.04418 7.61187 1.1321C7.45268 1.22001 7.31878 1.34741 7.22305 1.50203L2.14105 9.95803C1.74005 10.624 2.24405 11.455 3.04905 11.455H6.47805L3.24805 19.52C2.78105 20.54 4.04305 21.473 4.89105 20.735L18.0001 8.33103H11.1511L15.6841 2.60303V2.60303Z"
                    stroke="black"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
              <a
                className="btn btn-outline-none"
                href="https://app.ref.finance/#token.cheddar.near|token.v2.ref-finance.near"
                target="_blank"
              >
                Ref Swap
                <svg
                  id="swap-icon"
                  xmlns="http://www.w3.org/2000/svg"
                  width="14"
                  height="14"
                  fill="currentColor"
                  className="bi bi-arrow-left-right"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M1 11.5a.5.5 0 0 0 .5.5h11.793l-3.147 3.146a.5.5 0 0 0 .708.708l4-4a.5.5 0 0 0 0-.708l-4-4a.5.5 0 0 0-.708.708L13.293 11H1.5a.5.5 0 0 0-.5.5zm14-7a.5.5 0 0 1-.5.5H2.707l3.147 3.146a.5.5 0 1 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L2.707 4H14.5a.5.5 0 0 1 .5.5z"
                  />
                </svg>
              </a>
            </div>

            <div className="user-section" onClick={userDropdownHandler}>
              <span
                className={
                  !userInfoShown ? 'user-dropdown' : 'user-dropdown droped-down'
                }
                onClick={userDropdownHandler}
              >
                <img
                  src="./assets/img/cheddar.svg"
                  onClick={userDropdownHandler}
                />
                <div className="only-before-login">
                  <p className="not-connected-text">Not connected</p>
                </div>
                <div id="near-account" onClick={userDropdownHandler}></div>
                <svg
                  onClick={userDropdownHandler}
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className={
                    userInfoShown
                      ? 'bi bi-caret-down-fill flipped'
                      : 'bi bi-caret-down-fill'
                  }
                  viewBox="0 0 16 16"
                >
                  <path
                    onClick={userDropdownHandler}
                    d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"
                  />
                </svg>
              </span>
              <div className="user-dropdown-items">
                <div
                  className={
                    userInfoShown
                      ? 'user-container'
                      : 'user-container user-dropdown-hidden-position'
                  }
                >
                  <div className="only-after-login">
                    <div id="near-action"></div>
                  </div>
                  <div className="only-before-login">
                    <div id="near-action-login"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="game-links">
              {/* <span className='games-dropdown btn btn-outline-none' onClick={moreGamesDropdownHandler}>
               More games
               <svg onClick={moreGamesDropdownHandler} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className={moreGamesShown? "bi bi-caret-down-fill flipped" : "bi bi-caret-down-fill"} viewBox="0 0 16 16">
               <path onClick={moreGamesDropdownHandler} d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z"/>
               </svg>
             </span> */}
              {/* <div className='games-dropdown-items'> */}
              <div
                className={
                  /*moreGamesShown*/ true
                    ? 'games-links-container'
                    : 'games-links-container games-dropdown-hidden-position'
                }
              >
                <a
                  className="btn btn-outline-none"
                  href="https://draw.cheddar.farm"
                  target="_blank"
                >
                  Draw 🎨
                </a>
                <a
                  href="https://vps179324.iceservers.net/"
                  target="_blank"
                  className="btn btn-outline-none coinFlip"
                >
                  CoinFlip{' '}
                  <img src="./assets/img/cheddar.svg" alt="coin flip icon" />
                </a>
                <a
                  href="https://nearhub.club/qEmhFPF/cheddar-farm-scavengerhunt001"
                  target="_blank"
                  className="btn btn-outline-none VRFarm"
                >
                  {' '}
                  VRFarm{' '}
                  <svg
                    width="16"
                    height="16"
                    fill="currentColor"
                    className="bi bi-controller"
                  >
                    <path d="M11.5 6.027a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm2.5-.5a.5.5 0 1 1-1 0 .5.5 0 0 1 1 0zm-1.5 1.5a.5.5 0 1 0 0-1 .5.5 0 0 0 0 1zm-6.5-3h1v1h1v1h-1v1h-1v-1h-1v-1h1v-1z"></path>
                    <path d="M3.051 3.26a.5.5 0 0 1 .354-.613l1.932-.518a.5.5 0 0 1 .62.39c.655-.079 1.35-.117 2.043-.117.72 0 1.443.041 2.12.126a.5.5 0 0 1 .622-.399l1.932.518a.5.5 0 0 1 .306.729c.14.09.266.19.373.297.408.408.78 1.05 1.095 1.772.32.733.599 1.591.805 2.466.206.875.34 1.78.364 2.606.024.816-.059 1.602-.328 2.21a1.42 1.42 0 0 1-1.445.83c-.636-.067-1.115-.394-1.513-.773-.245-.232-.496-.526-.739-.808-.126-.148-.25-.292-.368-.423-.728-.804-1.597-1.527-3.224-1.527-1.627 0-2.496.723-3.224 1.527-.119.131-.242.275-.368.423-.243.282-.494.575-.739.808-.398.38-.877.706-1.513.773a1.42 1.42 0 0 1-1.445-.83c-.27-.608-.352-1.395-.329-2.21.024-.826.16-1.73.365-2.606.206-.875.486-1.733.805-2.466.315-.722.687-1.364 1.094-1.772a2.34 2.34 0 0 1 .433-.335.504.504 0 0 1-.028-.079zm2.036.412c-.877.185-1.469.443-1.733.708-.276.276-.587.783-.885 1.465a13.748 13.748 0 0 0-.748 2.295 12.351 12.351 0 0 0-.339 2.406c-.022.755.062 1.368.243 1.776a.42.42 0 0 0 .426.24c.327-.034.61-.199.929-.502.212-.202.4-.423.615-.674.133-.156.276-.323.44-.504C4.861 9.969 5.978 9.027 8 9.027s3.139.942 3.965 1.855c.164.181.307.348.44.504.214.251.403.472.615.674.318.303.601.468.929.503a.42.42 0 0 0 .426-.241c.18-.408.265-1.02.243-1.776a12.354 12.354 0 0 0-.339-2.406 13.753 13.753 0 0 0-.748-2.295c-.298-.682-.61-1.19-.885-1.465-.264-.265-.856-.523-1.733-.708-.85-.179-1.877-.27-2.913-.27-1.036 0-2.063.091-2.913.27z"></path>
                  </svg>
                </a>
                <a
                  href="https://app.cheddar.farm/"
                  target="_blank"
                  className="btn btn-outline-none farm"
                >
                  Farm{' '}
                  <img
                    src="./assets/img/farmer-svgrepo-com.svg"
                    alt="farmer icon"
                  />
                </a>
              </div>
              {/* </div> */}
            </div>
          </div>
        </div>
      </header>

      <div id="circulatingSupply">
        <span className="supply"></span>
        <a href="https://t.me/cheddarfarm" alt="telegram" target="_blank">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM8.287 5.906c-.778.324-2.334.994-4.666 2.01-.378.15-.577.298-.595.442-.03.243.275.339.69.47l.175.055c.408.133.958.288 1.243.294.26.006.549-.1.868-.32 2.179-1.471 3.304-2.214 3.374-2.23.05-.012.12-.026.166.016.047.041.042.12.037.141-.03.129-1.227 1.241-1.846 1.817-.193.18-.33.307-.358.336a8.154 8.154 0 0 1-.188.186c-.38.366-.664.64.015 1.088.327.216.589.393.85.571.284.194.568.387.936.629.093.06.183.125.27.187.331.236.63.448.997.414.214-.02.435-.22.547-.82.265-1.417.786-4.486.906-5.751a1.426 1.426 0 0 0-.013-.315.337.337 0 0 0-.114-.217.526.526 0 0 0-.31-.093c-.3.005-.763.166-2.984 1.09z" />
          </svg>
        </a>
        <a href="https://discord.gg/G9PTbmPUwe" alt="discord" target="_blank">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 448 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M297.216 243.2c0 15.616-11.52 28.416-26.112 28.416-14.336 0-26.112-12.8-26.112-28.416s11.52-28.416 26.112-28.416c14.592 0 26.112 12.8 26.112 28.416zm-119.552-28.416c-14.592 0-26.112 12.8-26.112 28.416s11.776 28.416 26.112 28.416c14.592 0 26.112-12.8 26.112-28.416.256-15.616-11.52-28.416-26.112-28.416zM448 52.736V512c-64.494-56.994-43.868-38.128-118.784-107.776l13.568 47.36H52.48C23.552 451.584 0 428.032 0 398.848V52.736C0 23.552 23.552 0 52.48 0h343.04C424.448 0 448 23.552 448 52.736zm-72.96 242.688c0-82.432-36.864-149.248-36.864-149.248-36.864-27.648-71.936-26.88-71.936-26.88l-3.584 4.096c43.52 13.312 63.744 32.512 63.744 32.512-60.811-33.329-132.244-33.335-191.232-7.424-9.472 4.352-15.104 7.424-15.104 7.424s21.248-20.224 67.328-33.536l-2.56-3.072s-35.072-.768-71.936 26.88c0 0-36.864 66.816-36.864 149.248 0 0 21.504 37.12 78.08 38.912 0 0 9.472-11.52 17.152-21.248-32.512-9.728-44.8-30.208-44.8-30.208 3.766 2.636 9.976 6.053 10.496 6.4 43.21 24.198 104.588 32.126 159.744 8.96 8.96-3.328 18.944-8.192 29.44-15.104 0 0-12.8 20.992-46.336 30.464 7.68 9.728 16.896 20.736 16.896 20.736 56.576-1.792 78.336-38.912 78.336-38.912z"></path>
          </svg>
        </a>
        <a href="https://twitter.com/CheddarFi" alt="twitter" target="_blank">
          <svg
            stroke="currentColor"
            fill="currentColor"
            strokeWidth="0"
            viewBox="0 0 512 512"
            height="1em"
            width="1em"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z"></path>
          </svg>
        </a>
        <a
          href="https://cheddarfarm.gitbook.io/docs"
          alt="litepaper"
          target="_blank"
          style={{ width: '1.4em' }}
        >
          <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M10.802 17.77a.703.703 0 11-.002 1.406.703.703 0 01.002-1.406m11.024-4.347a.703.703 0 11.001-1.406.703.703 0 01-.001 1.406m0-2.876a2.176 2.176 0 00-2.174 2.174c0 .233.039.465.115.691l-7.181 3.823a2.165 2.165 0 00-1.784-.937c-.829 0-1.584.475-1.95 1.216l-6.451-3.402c-.682-.358-1.192-1.48-1.138-2.502.028-.533.212-.947.493-1.107.178-.1.392-.092.62.027l.042.023c1.71.9 7.304 3.847 7.54 3.956.363.169.565.237 1.185-.057l11.564-6.014c.17-.064.368-.227.368-.474 0-.342-.354-.477-.355-.477-.658-.315-1.669-.788-2.655-1.25-2.108-.987-4.497-2.105-5.546-2.655-.906-.474-1.635-.074-1.765.006l-.252.125C7.78 6.048 1.46 9.178 1.1 9.397.457 9.789.058 10.57.006 11.539c-.08 1.537.703 3.14 1.824 3.727l6.822 3.518a2.175 2.175 0 002.15 1.862 2.177 2.177 0 002.173-2.14l7.514-4.073c.38.298.853.461 1.337.461A2.176 2.176 0 0024 12.72a2.176 2.176 0 00-2.174-2.174"></path>
          </svg>
        </a>
      </div>

      {!isRule && (
        <>
          <div id="rules-layer" onClick={handleRuleToggle}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
            </svg>
          </div>
          <div id="near-game-rules">
            <h2>How to play:</h2>
            <ul>
              <li>
                Click a checkbox "double jump" on the top of the board before
                every double jump. Shift key makes the same trick.
              </li>
              <li>
                Set a bid and join waiting list or select an available player to
                start the game.
              </li>
              <li>The winner takes the pot.</li>
              <li>
                Invite a friend to get a 10% referral bonus from his rewards.
              </li>
              <li>
                Hold shift button (or check a checkbox) to perform a double
                jump. Release a shift button before a final move.
              </li>
              <li>
                If you spent more than an hour, your opponent may stop the game
                and get the reward.
              </li>
              <li>
                Service fee is 10%, referral reward is half of the service fee.
              </li>
              <li>Various game stats are storing onchain.</li>
            </ul>
            <div className="subtitle">
              General Game Rules (
              <a
                href="https://en.wikipedia.org/wiki/Draughts"
                target="_blank"
                rel="noopener noreferrer"
              >
                source
              </a>
              )
            </div>
            <ul>
              <li>
                Capturing is mandatory. Double capturing is not mandatory.
              </li>
              <li>
                Uncrowned pieces (men) move one step diagonally forwards, and
                capture an opponent's piece. Men can jump only forwards.
                Multiple enemy pieces can be captured in a single turn provided
                this is done by successive jumps made by a single piece.
              </li>
              <li>
                Kings acquires additional powers including the ability to move
                backwards and capture backwards.
              </li>
            </ul>
          </div>
        </>
      )}

      <div className="game-container">
        <div className="column" style={{ minHeight: 0, paddingBottom: '30px' }}>
          <div className="info">
            <h1>Cheddar Checkers</h1>

            <div className="only-before-login">
              <div className="subtitle">
                Login with NEAR account (or{' '}
                <a href="//wallet.near.org" target="_blank">
                  create one for free!
                </a>
                )
              </div>
            </div>

            <div className="only-after-login">
              <div id="near-available-players" className="hidden">
                <div className="subtitle">
                  Available players
                  <span id="near-available-players-hint" className="hidden">
                    {' '}
                    (click on a player to start a game)
                  </span>
                  :
                </div>
                <div id="near-available-players-list"></div>
              </div>
              <div id="near-waiting-list" className="hidden">
                <div id="near-make-available-block" className="hidden">
                  <div className="subtitle">
                    <label htmlFor="near-bid-deposit">Join waiting list:</label>
                  </div>
                  <div>
                    My bid:{' '}
                    <input
                      type="text"
                      id="near-bid-deposit"
                      defaultValue={0}
                      style={{ width: '30px' }}
                    />{' '}
                    NEAR
                  </div>
                  <div>
                    Cheddar bid:{' '}
                    <input
                      type="text"
                      id="cheddar-bid-deposit"
                      defaultValue={0}
                      style={{ width: '30px' }}
                    />{' '}
                    Cheddar
                  </div>
                  <div>
                    Neko bid:{' '}
                    <input
                      type="text"
                      id="neko-bid-deposit"
                      defaultValue={0}
                      style={{ width: '30px' }}
                    />{' '}
                    Neko
                  </div>
                  <button className="button" id="near-make-available">
                    Join waiting list
                  </button>
                </div>
                <div id="near-make-unavailable-block" className="hidden">
                  <button className="button" id="near-make-unavailable">
                    Leave waiting list
                  </button>
                </div>
              </div>
              <div id="near-game" className="hidden">
                <div id="near-game-turn-block" className="subtitle">
                  There is an ongoing game on turn #
                  <span id="near-game-turn">...</span>
                </div>
                <div id="near-game-give-up">
                  <button className="button" onClick={handleGiveUp}>
                    Concede
                  </button>
                </div>
                <div id="near-game-finished" className="subtitle hidden">
                  Game winner: <span id="near-game-winner">...</span>
                  <br></br>
                  Reward: <span id="near-game-reward">...</span>
                </div>
              </div>
            </div>
            <div style={{ paddingTop: '10px' }}>
              <a href="#" onClick={handleRuleToggle}>
                How to play / Rules (Click to view)
              </a>
            </div>
          </div>
          <div id="near-game-stats" className="stats hidden">
            <h2>Game Statistics</h2>
            <div className="wrapper">
              <div id="player1">
                <h3>
                  <div style={{ paddingBottom: '5px' }}>
                    <p id="near-game-player-1" style={{ color: '#e4a6ae' }}></p>
                  </div>
                  <div style={{ height: '30px' }}>
                    <span
                      id="near-active-player-1"
                      className="active-player hidden"
                    >
                      (Active)
                    </span>
                  </div>
                </h3>
                <div id="near-player-1-deposit"></div>
                <div id="near-player-1-time-spent"></div>
                <div id="near-player-1-stop-game" className="hidden">
                  <button onClick={handleStopGame} className="button centered">
                    Stop game and get reward
                  </button>
                </div>
              </div>
              <div id="player2">
                <h3>
                  <div style={{ paddingBottom: '5px' }}>
                    <p id="near-game-player-2" style={{ color: '#8b8bff' }}></p>
                  </div>
                  <div style={{ height: '30px' }}>
                    <span
                      id="near-active-player-2"
                      className="active-player hidden"
                    >
                      (Active)
                    </span>
                  </div>
                </h3>
                <div id="near-player-2-deposit"></div>
                <div id="near-player-2-time-spent"></div>
                <div id="near-player-2-stop-game" className="hidden">
                  <button onClick={handleStopGame} className="button centered">
                    Stop game and get reward
                  </button>
                </div>
              </div>
            </div>
            <div className="clearfix"></div>
            <div className="turn"></div>
            <span id="winner"></span>
            <div className="hidden">
              <button id="cleargame">Reload</button>
            </div>
          </div>
          <div className="account only-after-login">
            <div>
              <div id="near-account-ref"></div>
            </div>
          </div>
        </div>
        <div className="column">
          <div
            className="double-jump-button-container"
            style={{ textAlign: 'center' }}
          >
            <input type="checkbox" id="near-game-double-move" />
            <label htmlFor="near-game-double-move">Double jump</label>
          </div>
          <div id="board">
            <div className="tiles"></div>
            <div className="pieces">
              <div className="player1pieces"></div>
              <div className="player2pieces"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
