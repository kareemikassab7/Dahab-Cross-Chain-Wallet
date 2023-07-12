import { addKeyPair } from '../keysSlice';
import { claimKeys } from '../../scripts/claim_keys'

const store_keys_in_redux = (password, dispatch) => {
  const keys = ['CSPR', 'ETH', 'SOL', 'MATIC']
  const length = 128

  for (const key of keys) {
    console.log(key)
    let publicKey = claimKeys(`${key}`, length, password)[`${key}_publicKey`];
    let privateKey = claimKeys(`${key}`, length, password)[`${key}_privateKey`];

    dispatch(addKeyPair({ key, publicKey, privateKey }));
  }
}

export default store_keys_in_redux;
