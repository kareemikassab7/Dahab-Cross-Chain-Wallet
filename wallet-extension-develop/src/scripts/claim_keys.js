import {generateKeyFromPassword} from './hash_string'
import {byteArrayToString,byteArrayToWordArray, hexStringToByteArray, stringToByteArray} from './bytearray_converter'
import {twofish} from 'twofish'
import axios from 'axios'


export function claimKeys(chain_prefix, length, password){

   
 



    let key_string= window.localStorage.getItem(`${chain_prefix}_info`);
    let key_obj= JSON.parse(key_string);  //this method should be called when we are dealing with a real file.
    
 

    // salt 32 retrieval
    let salt_hex= key_obj ['salt32']
    let salt32_ba= hexStringToByteArray(salt_hex)
    let salt32_wa= byteArrayToWordArray(salt32_ba, length);

    // salt 8 retrieval
    let salt8_str= key_obj ['salt8']
    let salt_bytearr8 = stringToByteArray(salt8_str)

   



    // key names retrieval 
    let chain_name_hashed= generateKeyFromPassword(`${chain_prefix}`, length, salt32_wa)[1]
    
    
    let hashing_info= generateKeyFromPassword(password, length,salt32_wa)
    let single_hash= hashing_info[0]
    let double_hash= hashing_info[1]

    let enc_key_hashed= generateKeyFromPassword(`enc_key`, length, salt32_wa)[1]
    let chain_name_pub_hashed= generateKeyFromPassword(`${chain_prefix}_publicKey`, length, salt32_wa)[1]
    let chain_name_priv_hashed= generateKeyFromPassword(`${chain_prefix}_privKey`, length, salt32_wa)[1]

    // public key and private  key and the encrypted key retrieval 
    let chain_pub_key= key_obj[chain_name_hashed][chain_name_pub_hashed]
    let chain_pub_key_array= stringToByteArray(chain_pub_key)



    let chain_priv_key= key_obj[chain_name_hashed][chain_name_priv_hashed]
    let chain_priv_key_array= stringToByteArray(chain_priv_key)

    let enc_key= key_obj[enc_key_hashed]
    let enc_key_array= stringToByteArray(enc_key)

    

    var twF = twofish(salt_bytearr8); //it can take the seed or let it generate random one


    // decrypting the encrypted key to get the original key used for encrypting the private and public key
    let key_encfile =  twF.decryptCBC(new Uint8Array(single_hash["words"]), enc_key_array)
  

    // decrypting the encrypted public key and private key using the obtained key 
    let cipher_pubkey_dec= twF.decryptCBC(key_encfile, chain_pub_key_array)


    let public_key= byteArrayToString(new Uint8Array (cipher_pubkey_dec)).replaceAll('\x00','')


    let cipher_privkey_dec= twF.decryptCBC(key_encfile, chain_priv_key_array)
    let private_key= byteArrayToString(new Uint8Array (cipher_privkey_dec)).replaceAll('\x00','')

   
  
    let retrived_obj= {
        
       [`${chain_prefix}_publicKey`]: public_key,
       [`${chain_prefix}_privateKey`]:private_key
        
      }
   
    
    
      console.log ("public key: ", public_key)


      return retrived_obj

    






}