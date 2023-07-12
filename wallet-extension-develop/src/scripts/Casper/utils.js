import {
  CasperClient,
  CLPublicKey,
  CLURef,
  Keys,
  CasperServiceByJsonRPC,
} from 'casper-js-sdk';

import { CONNECTION } from '../Casper/CasperTransferParams';

export function HexToCLPublicKey(publicKey: string) {
  return CLPublicKey.fromHex(publicKey);
}

export const contractHashToByteArray = (contractHash: string) =>
  Uint8Array.from(Buffer.from(contractHash, 'hex'));

export const parseTokenMeta = (str: string): Array<[string, string]> =>
  str.split(',').map((s) => {
    const map = s.split(' ');
    return [map[0], map[1]];
  });

export const sleep = (ms: number) => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

/**
 * Returns a set ECC key pairs - one for each NCTL user account.
 * @param {String} pathToUsers - Path to NCTL user directories.
 * @return {Array} An array of assymmetric keys.
 */
export const getKeyPairOfUserSet = (pathToUsers: string) => {
  return [1, 2, 3, 4, 5].map((userID) => {
    return Keys.Ed25519.parseKeyFiles(
      `${pathToUsers}/user-${userID}/public_key.pem`,
      `${pathToUsers}/user-${userID}/secret_key.pem`
    );
  });
};

export const getDeploy = async (NODE_URL: string, deployHash: string) => {
  const client = new CasperClient(NODE_URL);
  let i = 300;
  while (i !== 0) {
    const [deploy, raw] = await client.getDeploy(deployHash);
    if (raw.execution_results.length !== 0) {
      // @ts-ignore
      if (raw.execution_results[0].result.Success) {
        return deploy;
      } else {
        // @ts-ignore
        throw Error(
          'Contract execution: ' +
          // @ts-ignore
          raw.execution_results[0].result.Failure.error_message
        );
      }
    } else {
      i--;
      await sleep(1000);
      continue;
    }
  }
  throw Error('Timeout after ' + i + "s. Something's wrong");
};

export const getAccountInfo: any = async (
  nodeAddress: string,
  accountHash: string
) => {
  const client = new CasperServiceByJsonRPC(nodeAddress);
  const stateRootHash = await client.getStateRootHash();
  const blockState = await client.getBlockState(stateRootHash, accountHash, []);

  return blockState.Account;
};

export const hashToURef: any = async (accountHash: string) => {
  const client = new CasperServiceByJsonRPC(CONNECTION.NODE_ADDRESS);
  const stateRootHash = await client.getStateRootHash();
  const blockState: any = await client.getBlockState(
    stateRootHash,
    accountHash,
    []
  );

  return CLURef.fromFormattedStr(blockState.Account.mainPurse);
};

export const getAccountInfoFromCLPub: any = async (
  nodeAddress: string,
  publicKey: CLPublicKey
) => {
  const accountHash = publicKey.toAccountHashStr();
  return await getAccountInfo(nodeAddress, accountHash);
};

/**
 * Returns a value under an on-chain account's storage.
 * @param accountInfo - On-chain account's info.
 * @param namedKey - A named key associated with an on-chain account.
 */


export const getAccountBalance: any = async (publicKey: string) => {
  const client = new CasperServiceByJsonRPC(CONNECTION.NODE_ADDRESS);
  const latestBlock: any = await client.getLatestBlockInfo();
  const root = await client.getStateRootHash(latestBlock.block.hash);
  const MOTE_RATE = 1000000000;
  let balanceUref;
  try {
    balanceUref = await client.getAccountBalanceUrefByPublicKey(
      root,
      CLPublicKey.fromHex(publicKey)
      // publicKey
    );
  } catch (err) {
    return 0;
  }

  //account balance from the last block
  
  const balance: any = await client.getAccountBalance(
    latestBlock.block.header.state_root_hash,
    balanceUref
  );


  return balance / MOTE_RATE;
};
