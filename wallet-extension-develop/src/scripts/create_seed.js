import { mnemonicToSeedSync } from "bip39";

const create_seed = master_mnemonic => {
    let buffer = mnemonicToSeedSync(master_mnemonic)
    let seed = new Uint8Array(buffer.toJSON().data.slice(0, 32))

    return seed
}

export default create_seed;
