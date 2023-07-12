import  { lib,PBKDF2, algo} from 'crypto-js'

export function generateKeyFromPassword(password, length,salt){


    // console.log(`password: ${password}, length: ${length}, salt: ${salt}`)
  
  

    // let salt= randomBytes(length)
    // let salt= lib.WordArray.random(length);
    // let salt= CryptoJs.lib.WordArray.random(length);

    // console.log ("salt: ", salt.toString('hex'));
    let iterations = 1000;
    
    
    // let single_hash= pbkdf2.pbkdf2Sync(password, salt.toString('binary'), iterations, length, 'sha512' );
    let single_hash=  PBKDF2(password, salt, {iterations:iterations, keysize: length, hasher: algo.SHA512} );
    let double_hash=  PBKDF2(single_hash, salt, {iterations:iterations, keysize: length, hasher: algo.SHA512} );

    
    // let single_hash= pbkdf2.pbkdf2Sync(password, salt.toString('binary'), iterations, length, 'sha512' );
    // let double_hash= pbkdf2.pbkdf2Sync(single_hash, salt, iterations, length, 'sha512' );


   
    return [ single_hash, double_hash];


}


export function verifyPassword(password, double_hash,salt, length){


}
