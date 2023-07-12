import { ethers } from "ethers"

async function ethGetBalance(publicKey) {
    const provider = new ethers.providers.getDefaultProvider("goerli")
    const balance = await provider.getBalance(publicKey);

    return ethers.utils.formatEther(balance);
}

export default ethGetBalance


