import store_keypair from "../store_keypair";
import { ethers } from "ethers"
import privKeyTypeEnum from "../private_key_format"

const create_wallet = (master_mnemonic, password, length) => {
	const wallet = ethers.Wallet.fromMnemonic(master_mnemonic);
	const privateKey = wallet._signingKey().privateKey;
	const publicKey = wallet.address;


	store_keypair("ETH", publicKey, privateKey, length, password, privKeyTypeEnum.Hex)
}

export default create_wallet
