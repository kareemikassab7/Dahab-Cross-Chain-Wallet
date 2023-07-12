import store_keypair from "../store_keypair";
import { ethers } from "ethers"
import privKeyTypeEnum from "../private_key_format"
import { claimKeys } from "../claim_keys";

const create_wallet = (password, length) => {
	//Uses the same keys as Ethereum 
	let abbr = 'ETH'
	const privateKey = claimKeys(`${abbr}`, length, password)[`${abbr}_privateKey`];
	const publicKey = claimKeys(`${abbr}`, length, password)[`${abbr}_publicKey`];

	store_keypair("MATIC", publicKey, privateKey, length, password, privKeyTypeEnum.Hex)
}

export default create_wallet
