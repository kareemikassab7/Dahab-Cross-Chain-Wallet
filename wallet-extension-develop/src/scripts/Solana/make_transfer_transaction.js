import {
  Keypair,
  Transaction,
  SystemProgram,
  LAMPORTS_PER_SOL,
  sendAndConfirmTransaction,
  Connection,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";

const send_transaction = async (sender_priv_key, receiver_pub_key, amount) => {
  const connection = new Connection('https://api.testnet.solana.com');
  const toPublicKey = new PublicKey(receiver_pub_key);

  let fromKeypair = Keypair.fromSecretKey(
    Uint8Array.from(sender_priv_key.split(",").map(Number))
  );

  let transaction = new Transaction();
  transaction.add(
    SystemProgram.transfer({
      fromPubkey: fromKeypair.publicKey,
      toPubkey: toPublicKey,
      lamports: LAMPORTS_PER_SOL * amount
    })
  );
  //TODO: should add await here 
  sendAndConfirmTransaction(connection, transaction, [fromKeypair]);
};

export default send_transaction;
