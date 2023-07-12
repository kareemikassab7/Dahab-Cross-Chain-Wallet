import CryptoJS from "crypto-js";

function is_password_valid(password){

    var cipher;
    cipher = window.localStorage.getItem('passFile');
    var decipher = CryptoJS.AES.decrypt(cipher, password);
    decipher = decipher.toString(CryptoJS.enc.Utf8);
    if (decipher === "DahabIsTheSecretKey"){
     return true;
    } else {
        return false;
    }
}

export default is_password_valid;
