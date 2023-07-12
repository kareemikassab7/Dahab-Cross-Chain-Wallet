import { ethers } from "ethers"
import { POSClient, use } from "@maticnetwork/maticjs"
import HDWalletProvider from "@truffle/hdwallet-provider"

const { Web3ClientPlugin } = require("@maticnetwork/maticjs-web3");
const getPolygonMaticBalance = async (publicKey) => {
  const dic_net = {
    name: 'Mumbai Testnet',
    chainId: 80001,
    _defaultProvider: (providers) => new providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/')
  };
  let provider = new ethers.providers.getDefaultProvider(dic_net)

  const balance = await provider.getBalance(publicKey);
  return ethers.utils.formatEther(balance);
}

const getPolygonWethBalance = async (privateKey, publicKey) => {

  use(Web3ClientPlugin);
  const posClient = new POSClient();

  await posClient.init({
    network: "testnet",
    version: "mumbai",
    parent: {
      provider: new HDWalletProvider(
        privateKey,
        'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161'
      ),
      defaultConfig: {
        from: publicKey
      }
    },
    child: {
      provider: new HDWalletProvider(
        privateKey,
        'https://rpc-mumbai.maticvigil.com'
      ),
      defaultConfig: {
        from: publicKey
      }
    }
  });

  const erc20Token = posClient.erc20("0xA6FA4fB5f76172d178d61B04b0ecd319C5d1C0aa");//weth's token on mumbai
  const wallet_balance = await erc20Token.getBalance(publicKey);

  return wallet_balance / 1000000000000000000
}

export { getPolygonMaticBalance, getPolygonWethBalance }
