import { PublicKey, Connection, clusterApiUrl } from "@solana/web3.js";

const get_balance = async (publicKey) => {
  let balance = 0;

  try {
    const connection = new Connection('https://api.testnet.solana.com');
    const accountInfo = await connection.getAccountInfo(new PublicKey(publicKey));
    const lamports = accountInfo?.lamports;
    balance = lamports ? lamports / 1000000000 : 0;
  } catch (error) {
    console.log('Error: ', error)
  }

  return balance;
};

export default get_balance;
