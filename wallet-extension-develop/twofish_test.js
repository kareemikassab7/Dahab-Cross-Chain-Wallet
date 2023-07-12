const twofish= require('twofish'); 
const pdk= require('pbkdf2')
const crypto_j= require('crypto-js')
const bytebuffer= require('bytebuffer')

 function generateKeyFromPassword(password, length){
  let salt=  crypto_j.lib.WordArray.random(length);
  console.log("salt: ", salt)
 
  let iterations = 1
  // let single_hash=   pdk.pbkdf2Sync(password, salt, iterations, length, 'sha512' );
  let single_hash=   crypto_j.PBKDF2(password, salt, {iterations:iterations, keysize: length/32, hasher: crypto_j.algo.SHA512} );
  console.log("single hash: ", single_hash)
  let double_hash=   pdk.pbkdf2Sync(single_hash, salt, iterations, length, 'sha512' );
 
  
  // var info= {"salt": salt, "single_hash": single_hash, "double_hash": double_hash}
  // console.log(`hashing_info: ${info}`)
  return [salt, single_hash, double_hash]

}

console.log (`trying block bytes: ${bytebuffer.fromHex("0xe526c02cdc0a9f0a5f7346310942fafec8aae97ca47ae4a10e1fe4cdb7d53ad9")}`)
console.log (`trying block bytes: ${bytebuffer.fromUTF8("0xe526c02cdc0a9f0a5f7346310942fafec8aae97ca47ae4a10e1fe4cdb7d53ad9")}`)


console.log("hello from store_keypair")

let pass= 'macoisnothing'
let length= 256

// this needs to return an object for a better design
let hashing_info=  generateKeyFromPassword(pass, length)
let salt= hashing_info[0]
let single_hash= hashing_info[1]
let double_hash= hashing_info[2]

console.log("salt: ", salt)
console.log("single_hash: ", single_hash)
console.log("double_hash: ", double_hash)



var IV = IV = [
    180, 106, 2, 96, //b4 6a 02 60
    176, 188, 73, 34, //b0 bc 49 22
    181, 235, 7, 133, //b5 eb 07 85
    164, 183, 204, 158 //a4 b7 cc 9e;
  ];

var twF = twofish.twofish(IV);

let cipher_enc= twF.encryptCBC(["macopassword", "hellofuck"], ["ADBXCDE", "hellsodhf"])
console.log("hello from store_keypair")
console.log("cipher: ", cipher_enc)

