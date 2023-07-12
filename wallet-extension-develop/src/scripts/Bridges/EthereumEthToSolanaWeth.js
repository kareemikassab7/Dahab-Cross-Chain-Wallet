"use strict";
var __awaiter =
  (this && this.__awaiter) ||
  function (thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function (resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function (resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator["throw"](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
var __generator =
  (this && this.__generator) ||
  function (thisArg, body) {
    var _ = {
        label: 0,
        sent: function () {
          if (t[0] & 1) throw t[1];
          return t[1];
        },
        trys: [],
        ops: [],
      },
      f,
      y,
      t,
      g;
    return (
      (g = { next: verb(0), throw: verb(1), return: verb(2) }),
      typeof Symbol === "function" &&
        (g[Symbol.iterator] = function () {
          return this;
        }),
      g
    );
    function verb(n) {
      return function (v) {
        return step([n, v]);
      };
    }
    function step(op) {
      if (f) throw new TypeError("Generator is already executing.");
      while (_)
        try {
          if (
            ((f = 1),
            y &&
              (t =
                op[0] & 2
                  ? y["return"]
                  : op[0]
                  ? y["throw"] || ((t = y["return"]) && t.call(y), 0)
                  : y.next) &&
              !(t = t.call(y, op[1])).done)
          )
            return t;
          if (((y = 0), t)) op = [op[0] & 2, t.value];
          switch (op[0]) {
            case 0:
            case 1:
              t = op;
              break;
            case 4:
              _.label++;
              return { value: op[1], done: false };
            case 5:
              _.label++;
              y = op[1];
              op = [0];
              continue;
            case 7:
              op = _.ops.pop();
              _.trys.pop();
              continue;
            default:
              if (
                !((t = _.trys), (t = t.length > 0 && t[t.length - 1])) &&
                (op[0] === 6 || op[0] === 2)
              ) {
                _ = 0;
                continue;
              }
              if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) {
                _.label = op[1];
                break;
              }
              if (op[0] === 6 && _.label < t[1]) {
                _.label = t[1];
                t = op;
                break;
              }
              if (t && _.label < t[2]) {
                _.label = t[2];
                _.ops.push(op);
                break;
              }
              if (t[2]) _.ops.pop();
              _.trys.pop();
              continue;
          }
          op = body.call(thisArg, _);
        } catch (e) {
          op = [6, e];
          y = 0;
        } finally {
          f = t = 0;
        }
      if (op[0] & 5) throw op[1];
      return { value: op[0] ? op[1] : void 0, done: true };
    }
  };
exports.__esModule = true;
exports.swap_eth_to_sol =
  exports.get_reciever_address =
  exports.getSignedVAAWithRetry =
    void 0;
var wormhole_sdk_1 = require("@certusone/wormhole-sdk");
var solana_1 = require("@certusone/wormhole-sdk/lib/cjs/solana");
var ethers_1 = require("ethers");
var web3_js_1 = require("@solana/web3.js");
var spl_token_1 = require("@solana/spl-token");
var web3_sol = require("@solana/web3.js");
var WORMHOLE_RPC_HOSTS = ["https://wormhole-v2-testnet-api.certus.one"];
var solana_node = new web3_sol.Connection("https://api.devnet.solana.com");
var bs58 = require("bs58");
var EMITTER_ADDRESS_ETH = "0xF890982f9310df57d00f659cf4fd87e65adEd8d7";
var BRIDGE_ADDR_ETH = "0x706abc4E45D419950511e474C7B9Ed348A4a716c";
var GOERLI_INFURA_ENDPOINT =
  "https://goerli.infura.io/v3/2c429d4bb7e94ca6b78f8a61fdd5d58c";
var SOL_BRIDGE_ADDRESS = "3u8hJUVTA4jH1wYAyUur7FFZVQ8H635K3tSHHF4ssjQ5";
var SOL_TOKEN_BRIDGE_ADDRESS = "DZnkkTmCiFWfYTfT41X3Rd1kDgozqzxWaHqsw6W4x2oe";
var WETH_SOL_ADDRESS = "7VPWjBhCXrpYYBiRKZh1ubh9tLZZNkZGp2ReRphEV4Mc";
/// Utility function to get the signed VAA and retry if the return is none. The function stops when
/// the number of retries are reached or the vaa is returned :)
var getSignedVAAWithRetry = function (
  emitterChain,
  emitterAddress,
  sequence,
  retryAttempts
) {
  return __awaiter(void 0, void 0, void 0, function () {
    var currentWormholeRpcHost, getNextRpcHost, attempts, rpcHost, results;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          currentWormholeRpcHost = -1;
          getNextRpcHost = function () {
            return ++currentWormholeRpcHost % WORMHOLE_RPC_HOSTS.length;
          };
          attempts = 0;
          _a.label = 1;
        case 1:
          if (!true) return [3 /*break*/, 4];
          attempts++;
          return [
            4 /*yield*/,
            new Promise(function (resolve) {
              return setTimeout(resolve, 1000);
            }),
          ];
        case 2:
          _a.sent();
          rpcHost = WORMHOLE_RPC_HOSTS[getNextRpcHost()];
          return [
            4 /*yield*/,
            Promise.allSettled([
              (0, wormhole_sdk_1.getSignedVAA)(
                rpcHost,
                emitterChain,
                emitterAddress,
                sequence
              ),
              (0, wormhole_sdk_1.getGovernorIsVAAEnqueued)(
                rpcHost,
                emitterChain,
                emitterAddress,
                sequence
              ),
            ]),
          ];
        case 3:
          results = _a.sent();
          if (results[0].status === "fulfilled") {
            return [
              2 /*return*/,
              { vaaBytes: results[0].value.vaaBytes, isPending: false },
            ];
          }
          if (
            results[1].status === "fulfilled" &&
            results[1].value.isEnqueued
          ) {
            return [2 /*return*/, { vaaBytes: undefined, isPending: true }];
          }
          if (retryAttempts !== undefined && attempts > retryAttempts) {
            throw new Error(results[0].reason);
          }
          return [3 /*break*/, 1];
        case 4:
          return [2 /*return*/];
      }
    });
  });
};
exports.getSignedVAAWithRetry = getSignedVAAWithRetry;
/// Utility function to get the address we will send the WETH for
function get_reciever_address(signer) {
  return __awaiter(this, void 0, void 0, function () {
    var weth_sol_addr, reciever_account;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          weth_sol_addr = new web3_sol.PublicKey(WETH_SOL_ADDRESS);
          return [
            4 /*yield*/,
            (0, spl_token_1.getOrCreateAssociatedTokenAccount)(
              solana_node,
              signer,
              weth_sol_addr,
              signer.publicKey
            ),
          ];
        case 1:
          reciever_account = _a.sent();
          console.log(reciever_account);
          return [2 /*return*/, reciever_account.address];
      }
    });
  });
}
exports.get_reciever_address = get_reciever_address;
/// Function that redeems weth on Solana. It is called by the transfer function
function redeem(tx, signer) {
  return __awaiter(this, void 0, void 0, function () {
    var sequence, emitterAddress, signedvaa, signer_factory, redeem_transaction;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          sequence = (0, wormhole_sdk_1.parseSequenceFromLogEth)(
            tx,
            BRIDGE_ADDR_ETH
          );
          emitterAddress = (0, wormhole_sdk_1.getEmitterAddressEth)(
            EMITTER_ADDRESS_ETH
          );
          return [
            4 /*yield*/,
            (0, exports.getSignedVAAWithRetry)(
              "ethereum",
              emitterAddress,
              sequence
            ),
          ];
        case 1:
          signedvaa = _a.sent();
          console.log("SIGNED VAA", signedvaa);
          signer_factory = (0, solana_1.signTransactionFactory)(signer);
          return [
            4 /*yield*/,
            (0, wormhole_sdk_1.postVaaSolanaWithRetry)(
              solana_node,
              signer_factory,
              SOL_BRIDGE_ADDRESS,
              signer.publicKey,
              Buffer.from(signedvaa.vaaBytes),
              30
            ),
          ];
        case 2:
          _a.sent();
          return [
            4 /*yield*/,
            (0, wormhole_sdk_1.redeemOnSolana)(
              solana_node,
              SOL_BRIDGE_ADDRESS,
              SOL_TOKEN_BRIDGE_ADDRESS,
              signer.publicKey,
              signedvaa.vaaBytes
            ),
          ];
        case 3:
          redeem_transaction = _a.sent();
          return [
            4 /*yield*/,
            (0, web3_js_1.sendAndConfirmTransaction)(
              solana_node,
              redeem_transaction,
              [signer]
            ),
          ];
        case 4:
          _a.sent();
          return [2 /*return*/];
      }
    });
  });
}
function swap_eth_to_sol(to_transfer, eth_private_key, solana_private_key) {
  return __awaiter(this, void 0, void 0, function () {
    var signer,
      provider,
      amount,
      sol_key_pair,
      sol_signer,
      calculate_token_account,
      transfer_receipt;
    return __generator(this, function (_a) {
      switch (_a.label) {
        case 0:
          signer = new ethers_1.ethers.Wallet(eth_private_key);
          provider = new ethers_1.ethers.providers.JsonRpcProvider(
            GOERLI_INFURA_ENDPOINT
          );
          amount = ethers_1.ethers.utils.parseUnits(
            to_transfer.toString(),
            "ether"
          );
          signer = signer.connect(provider);
          sol_key_pair = web3_js_1.Keypair.fromSecretKey(
            Uint8Array.from(solana_private_key)
          );
          sol_signer = {
            publicKey: sol_key_pair.publicKey,
            secretKey: sol_key_pair.secretKey,
          };
          return [4 /*yield*/, get_reciever_address(sol_signer)];
        case 1:
          calculate_token_account = _a.sent();
          console.log(calculate_token_account);
          return [
            4 /*yield*/,
            (0, wormhole_sdk_1.transferFromEthNative)(
              EMITTER_ADDRESS_ETH,
              signer,
              amount,
              1,
              calculate_token_account.toBuffer()
            ),
          ];
        case 2:
          transfer_receipt = _a.sent();
          redeem(transfer_receipt, sol_signer);
          return [2 /*return*/];
      }
    });
  });
}
exports.swap_eth_to_sol = swap_eth_to_sol;
