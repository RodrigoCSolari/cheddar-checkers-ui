const CONTRACT_NAME = 'checkers.cheddar.near'
const NFT_CONTRACT_NAME = 'nft-checkers.near'
const CHEDDAR_TOKEN_CONTRACT = 'token.cheddar.near'
const NEKO_TOKEN_CONTRACT = 'ftv2.nekotoken.near'
const network = 'mainnet'
function getConfig() {
  switch (network) {
    case 'production':
    case 'mainnet':
      return {
        networkId: 'mainnet',
        nodeUrl: 'https://rpc.mainnet.near.org',
        contractName: CONTRACT_NAME,
        NFTContractName: NFT_CONTRACT_NAME,
        cheddarToken: CHEDDAR_TOKEN_CONTRACT,
        nekoToken: NEKO_TOKEN_CONTRACT,
        walletUrl: 'https://wallet.near.org',
        helperUrl: 'https://helper.mainnet.near.org',
        explorerUrl: 'https://explorer.mainnet.near.org',
      }
    case 'development':
    case 'testnet':
      return {
        networkId: 'testnet',
        nodeUrl: 'https://rpc.testnet.near.org',
        contractName: CONTRACT_NAME,
        NFTContractName: NFT_CONTRACT_NAME,
        cheddarToken: CHEDDAR_TOKEN_CONTRACT,
        nekoToken: NEKO_TOKEN_CONTRACT,
        walletUrl: 'https://wallet.testnet.near.org',
        helperUrl: 'https://helper.testnet.near.org',
        explorerUrl: 'https://explorer.testnet.near.org',
      }
    case 'betanet':
      return {
        networkId: 'betanet',
        nodeUrl: 'https://rpc.betanet.near.org',
        contractName: CONTRACT_NAME,
        NFTContractName: NFT_CONTRACT_NAME,
        cheddarToken: CHEDDAR_TOKEN_CONTRACT,
        nekoToken: NEKO_TOKEN_CONTRACT,
        walletUrl: 'https://wallet.betanet.near.org',
        helperUrl: 'https://helper.betanet.near.org',
        explorerUrl: 'https://explorer.betanet.near.org',
      }
    default:
      throw Error(
        `Unconfigured environment. Can be configured in src/config.js.`
      )
  }
}

module.exports = { getConfig, network: network }
