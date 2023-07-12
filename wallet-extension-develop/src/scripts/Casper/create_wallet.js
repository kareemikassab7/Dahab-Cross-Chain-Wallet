import { CasperClient } from 'casper-js-sdk';
import { CONNECTION } from "./CasperTransferParams";
import store_keypair from "../store_keypair";
import privKeyTypeEnum from "../private_key_format"
import { Buffer } from 'buffer'


import { KeyFactory, EncryptionType, CasperHDWallet } from "casper-storage"


async function create_wallet_casper(master_seed, password, length) {

   


    const hdWallet = new CasperHDWallet(master_seed);
    const acc0 = await hdWallet.getAccount(0)
    const privateKey= acc0.getPrivateKey()
    const publicKey= await acc0.getPublicKey()



    
    store_keypair("CSPR", publicKey, privateKey,
        length, password, privKeyTypeEnum.ByteArray);

}

export default create_wallet_casper;
