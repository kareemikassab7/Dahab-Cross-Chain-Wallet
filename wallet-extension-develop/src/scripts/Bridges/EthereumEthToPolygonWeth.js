import { transferETHFromEthereumToMaticUsingPOSBridge } from "@ethereumnetwork/matic-bridge";

const ethereumEthToPolygonWeth = async (sender_priv_key, receiver_pub_key, amount) => {
  await transferETHFromEthereumToMaticUsingPOSBridge({
    maticApiUrl: 'https://rpc-mumbai.maticvigil.com',
    ethereumApiUrl: 'https://goerli.infura.io/v3/9aa3d95b3bc440fa88ea12eaa4456161',
    ethereumAccountPrivateKey: sender_priv_key,
    amountWei: amount * 100000000000000000,
    recipientAddress: receiver_pub_key
  })
}

export default ethereumEthToPolygonWeth
