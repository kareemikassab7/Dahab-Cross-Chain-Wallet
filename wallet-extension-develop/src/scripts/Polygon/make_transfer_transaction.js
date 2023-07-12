import { ethers } from "ethers"

async function sendTransaction(sender_priv_key, receiver_pub_key, amount) {

  const dic_net = {
    name: 'Mumbai Testnet',
    chainId: 80001,
    _defaultProvider: (providers) => new providers.JsonRpcProvider('https://rpc-mumbai.maticvigil.com/')
  };

  let provider = new ethers.providers.getDefaultProvider(dic_net)
  let walletPrivKey = new ethers.Wallet(sender_priv_key)

  let tx = {
    to: receiver_pub_key,
    value: ethers.utils.parseEther(amount)
  }

  const wallet = walletPrivKey.connect(provider)
  await walletPrivKey.signTransaction(tx)
  let result = await wallet.sendTransaction(tx)
  return result
}

export default sendTransaction


