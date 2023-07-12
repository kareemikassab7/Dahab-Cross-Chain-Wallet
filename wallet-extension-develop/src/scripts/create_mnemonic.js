import { generateMnemonic } from "bip39";

function create_mnemonics() {
  return (generateMnemonic())
}

export default create_mnemonics;
