import store_keypair from "../store_keypair";
import * as solanaWeb3 from '@solana/web3.js';
import privKeyTypeEnum from "../private_key_format"

const create_wallet = (master_seed, password, length) => {
	let keypair = solanaWeb3.Keypair.fromSeed(master_seed);
	let privateKey = keypair.secretKey.toString();
	let publicKey = keypair.publicKey.toString('hex')
	store_keypair("SOL", publicKey, privateKey, length, password, privKeyTypeEnum.ByteArray);
}

export default create_wallet;
