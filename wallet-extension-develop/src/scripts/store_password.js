import CryptoJS from "crypto-js";

function store_password(password){

    let key = "DahabIsTheSecretKey";

    var cipher = CryptoJS.AES.encrypt(key, password);
    cipher = cipher.toString();
    
    try{
        window.localStorage.setItem('passFile', cipher);
        if(window.localStorage.getItem('passFile') !== cipher) return false;
    }catch(e){
        return false;
    }
    
}

export default store_password;
