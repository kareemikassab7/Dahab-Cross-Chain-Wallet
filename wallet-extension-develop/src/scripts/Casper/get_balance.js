import { getAccountBalance } from "./utils";

async function getBalance(public_key) {
   
    let balance = await getAccountBalance(public_key);
    return balance;
}


export default getBalance;
