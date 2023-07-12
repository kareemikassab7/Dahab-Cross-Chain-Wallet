// hexString assumes that it will entered without 0x at the beginning
import  { lib} from 'crypto-js'

export function hexStringToByteArray(hexString) {

    if (hexString.length % 2 !== 0) {
        throw "Must have an even number of hex digits to convert to bytes";
    }/* w w w.  jav  a2 s .  c o  m*/
    var numBytes = hexString.length / 8;  //this suggests that 8 hex characters represents one integer
    // var byteArray = new Uint32Array(numBytes);
    var byteArray = new Array(numBytes);  // when it is Uint32Array it comes with strange behavior in  lib.WordArray.create(ba,length); function call

    for (var i=0; i<numBytes; i++) {
        byteArray[i] = parseInt(hexString.substr(i*8, 8), 16);
    }
    return byteArray;
}

export function stringToByteArray(s){

    // Otherwise, fall back to 7-bit ASCII only
    var result = new Uint8Array(s.length);
    for (var i=0; i<s.length; i++){
        result[i] = s.charCodeAt(i);/* w ww. ja  v  a 2s . co  m*/
    }
    return result;
}

export function byteArrayToString(byteArray){

    // Otherwise, fall back to 7-bit ASCII only
    var result = "";
    for (var i=0; i<byteArray.byteLength; i++){
        // console.log(`from the converter: bytearray[${i}] = ${byteArray[i]}`)
        // console.log(`test: ${Encoding.ASCII.GetString(new byte[]{ 65 })}`)
        result += String.fromCharCode(byteArray[i])
    }/*from   w  ww . ja v a 2 s .  co  m*/
    return result;
}

export function byteArrayToWordArray(ba, length) {
	
    return lib.WordArray.create(ba,length);
}
