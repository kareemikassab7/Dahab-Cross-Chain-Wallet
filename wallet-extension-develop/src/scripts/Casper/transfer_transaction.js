import {
  CasperClient,
  CLPublicKey,
  DeployUtil,
  Keys
} from 'casper-js-sdk';
import { PAYMENT_AMOUNTS, CONNECTION } from "./CasperTransferParams";
import { Buffer } from 'buffer'



function hexToPem(hex) {
  let base64 = new Buffer(hex, "hex").toString("base64");
  let pem = base64.match(/.{1,64}/g).join("\n");
  return pem;
}

async function mapOwnerKeys(privKey) {
  let private_key_pem = hexToPem(privKey);

  const privateKey = Keys.Ed25519.parsePrivateKey(
    Keys.Ed25519.readBase64WithPEM(private_key_pem)
  );
  const publicKey = Keys.Ed25519.privateToPublicKey(privateKey);
  const mappedKeys = Keys.Ed25519.parseKeyPair(publicKey, privateKey);

  return mappedKeys;
}


export async function send_transaction_casper(
  privateKey,
  toAddress,
  amount,

) {
  const MOTE_RATE = 1000000000;

  const KEYS_USER = await mapOwnerKeys(privateKey);
  const fromAccount= KEYS_USER.publicKey
  const toAccount =  CLPublicKey.fromHex(toAddress);
  amount = parseInt(amount) * MOTE_RATE;
  const ttl = 1800000;

  const PAYMENT_AMOUNT = PAYMENT_AMOUNTS.NATIVE_TRANSFER_PAYMENT_AMOUNT;
  const deployParams = new DeployUtil.DeployParams(
    fromAccount,
    CONNECTION.CHAIN_NAME,
    ttl
  );

  const transferParams = DeployUtil.ExecutableDeployItem.newTransfer(
    amount,
    toAccount,
    null,
    1
  );

  const payment = DeployUtil.standardPayment(PAYMENT_AMOUNT);

  const deploy = DeployUtil.makeDeploy(deployParams, transferParams, payment);

  const deployJson = DeployUtil.deployToJson(deploy);

  let signedDeployJson;

 
    const client = new CasperClient(CONNECTION.NODE_ADDRESS);
    
    signedDeployJson = client.signDeploy(deploy, KEYS_USER);
  
  const transferDeployHash = await signedDeployJson.send(
    CONNECTION.NODE_ADDRESS
  );


  return transferDeployHash;
}

export default send_transaction_casper


