import { useState, useEffect } from "react";
import { RotatingLines } from "react-loader-spinner";

import colors from "../../includes/colors";
import { MDBInput } from "mdb-react-ui-kit";
import { useLocation, useNavigate } from "react-router-dom";
import csprGetBalance from "../../scripts/Casper/get_balance";
import solGetBalance from "../../scripts/Solana/get_balance";
import ethGetBalance from "../../scripts/ethereum/eth_get_balance";
import { getPolygonWethBalance } from "../../scripts/Polygon/get_balance";

import ethereumEthToPolygonWeth from "../../scripts/Bridges/EthereumEthToPolygonWeth";
import { swap_eth_to_sol } from "../../scripts/Bridges/EthereumEthToSolanaWeth.js";

import { useSelector } from 'react-redux';

import "bootstrap/dist/css/bootstrap.css";

const abbreviations_map = {
  casper: "CSPR",
  ethereum: "ETH",
  solana: "SOL",
  polygon: "MATIC",
};

const parseBalance = (balance) => {
  let nearest_decimal = 6;
  return Number(parseFloat(balance).toFixed(nearest_decimal));
};
const getSelectedChainBalance = async (selectedChain, keyPair) => {
  const chain_name_lower = selectedChain.toLowerCase();
  let abbr = abbreviations_map[chain_name_lower];

  let priv_key = keyPair.privateKey
  let pub_key = keyPair.publicKey


  switch (chain_name_lower) {
    case "casper":
      let cspr_balance = await csprGetBalance();
      return cspr_balance;
    case "ethereum":
      let eth_balance = await ethGetBalance(priv_key);
      return eth_balance;
    case "solana":
      let sol_balance = await solGetBalance(pub_key);
      return sol_balance;
    case "polygon":
      let polygon_balance = await getPolygonWethBalance(priv_key, pub_key);
      return polygon_balance;
    default:
      console.log(`Chain Not Found`);
  }
};

const transferCrossChainTransaction = async (
  selectedChainFrom,
  selectedChainTo,
  amount,
  navigate,
  setLoadingRing,
  keyPairs
) => {
  setLoadingRing(true);
  try {
    let abbr = 'ChainPlaceHolder';
    console.log("From: ", selectedChainFrom.toLowerCase());
    console.log("To: ", selectedChainTo.toLowerCase());
    if (
      selectedChainFrom.toLowerCase() === "ethereum" &&
      selectedChainTo.toLowerCase() === "polygon"
    ) {
      abbr = 'ETH'
      let pub_key = keyPairs[abbr].publicKey;
      let priv_key = keyPairs[abbr].privateKey;

      await ethereumEthToPolygonWeth(priv_key, pub_key, amount);
    } else if (
      selectedChainFrom.toLowerCase() === "ethereum" &&
      selectedChainTo.toLowerCase() === "solana"
    ) {

      abbr = 'SOL';
      let sol_priv_key = keyPairs[abbr].privateKey;

      abbr = 'ETH';
      let eth_priv_key = keyPairs[abbr].privateKey.slice(2);

      console.log(eth_priv_key);
      await swap_eth_to_sol(
        amount,
        eth_priv_key,
        sol_priv_key.split(",").map((str) => Number(str))
      );
    } else {
      alert("Will be supported soon!");
    }
    setLoadingRing(false);
    navigate("/report", {
      state: { message: "Transaction Succeeded", statusId: 1, page: "wallet" },
    });
  } catch (e) {
    setLoadingRing(false);
    let error_message = e.toString().split("(", 1)[0];
    navigate("/report", {
      state: {
        message: `Transaction Failed: ${error_message}`,
        statusId: 2,
        page: "wallet",
      },
    });
  }
};

const SwapPage = () => {
  const [amount, setAmount] = useState("");
  const chains = ["Casper", "Ethereum", "Solana", "Polygon"];
  const [balanceFrom, setBalanceFrom] = useState("-");
  const [balanceTo, setBalanceTo] = useState("-");
  const [loadingRing, setLoadingRing] = useState(false);

  const [selectedChainFrom, setSelectedChainFrom] = useState(chains[0]);
  const [selectedChainTo, setSelectedChainTo] = useState(chains[1]);

  const navigate = useNavigate();

  const KEYS = useSelector(state => state.keys);

  useEffect(() => {
    async function getBalanceFrom() {
      setBalanceFrom("-");
      let balanceFrom = await getSelectedChainBalance(selectedChainFrom, KEYS[abbreviations_map[selectedChainFrom.toLowerCase()]]);
      setBalanceFrom(parseBalance(balanceFrom));
    }
    getBalanceFrom();
  }, [selectedChainFrom]);

  useEffect(() => {
    async function getBalanceTo() {
      setBalanceTo("-");
      let balanceTo = await getSelectedChainBalance(selectedChainTo, KEYS[abbreviations_map[selectedChainTo.toLowerCase()]]);
      setBalanceTo(parseBalance(balanceTo));
    }
    getBalanceTo();
  }, [selectedChainTo]);

  return (
    <div style={styles.parentStyle}>
      <img
        src={require("../../images/jewel.png")}
        alt="jewel"
        style={styles.imgStyle}
      />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>
        DAHAB
      </h1>
      <h4 class="display-6" style={{ color: colors["black-text"] }}>
        Swap Page
      </h4>
      <form>
        <select
          style={styles.dropDownStyle}
          value={selectedChainFrom}
          onChange={(e) => {
            setSelectedChainFrom(e.target.value);
          }}
        >
          {chains.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </form>

      <h2 class="display-3" style={styles.fineTextStyle}>
        {selectedChainFrom} Balance: {balanceFrom}
      </h2>

      <form>
        <select
          style={styles.dropDownStyle}
          value={selectedChainTo}
          onChange={(e) => {
            setSelectedChainTo(e.target.value);
          }}
        >
          {chains.map((value) => (
            <option value={value} key={value}>
              {value}
            </option>
          ))}
        </select>
      </form>

      <h2 class="display-3" style={styles.fineTextStyle}>
        {selectedChainTo} Balance: {balanceTo}
      </h2>

      <MDBInput
        label="Amount in Home Chain Native Currency"
        type="text"
        size="lg"
        onChange={(e) => setAmount(e.target.value)}
      />

      <RotatingLines
        strokeColor="green"
        strokeWidth="5"
        animationDuration="0.75"
        width="90"
        visible={loadingRing}
      />

      <button
        className="btn"
        style={styles.btnStyle}
        onClick={() => {
          transferCrossChainTransaction(
            selectedChainFrom,
            selectedChainTo,
            amount,
            navigate,
            setLoadingRing,
            KEYS
          );
        }}
      >
        Swap
      </button>
    </div>
  );
};

const styles = {
  parentStyle: {
    height: "100vh",
    width: "100vw",
    backgroundColor: colors["grey-background"],
    flexDirection: "column",
    "font-family": "Montserrat Alternates",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  btnStyle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    backgroundColor: colors["orange"],
    border: "none",
  },
  dropDownStyle: {
    fontWeight: "bold",
    fontSize: 16,
    color: "white",
    backgroundColor: colors["orange"],
    border: "none",
    width: 240,
    height: 30,
    justifyContent: "center",
  },
  fineTextStyle: {
    color: colors["black-text"],
    fontSize: 22,
    justifyContent: "center",
    marginTop: 10,
  },
  imgStyle: {
    width: 240,
    height: 200,
  },
};
export default SwapPage;
