import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';

import store_password from "../../scripts/store_password"
import create_wallet_cspr from "../../scripts/Casper/create_wallet"
import create_wallet_sol from "../../scripts/Solana/create_wallet"
import create_wallet_eth from "../../scripts/ethereum/eth_create_wallet"
import { default as create_wallet_polygon } from "../../scripts/Polygon/create_wallet"

import create_seed from "../../scripts/create_seed"
import { useNavigate, useLocation } from "react-router-dom";

const create_wallet_local = async (password, my_mnemonic, navigate) => {
  store_password(password);
  const length = 128

  const my_seed = await create_seed(my_mnemonic)

  create_wallet_eth(my_mnemonic, password, length);
  create_wallet_sol(my_seed, password, length);
  create_wallet_cspr(my_seed, password, length);
  create_wallet_polygon(password, length);

  navigate('/')
  window.location.reload();
}

const MnemonicInputField = ({ mnemonicsArray, id }) => {
  return (
    <div style={{ margin: 5 }}>
      <MDBInput onChange={e => {
        mnemonicsArray[id] = e.target.value
      }}
      />
    </div>

  )
}

const ImportWalletPage = () => {
  const [password, set_password] = useState("");
  const { state } = useLocation();
  const navigate = useNavigate()

  const mnemonicsArray = new Array(12);

  const mnemonicsComponents = []
  for (let i = 0; i < 12; i++) {
    mnemonicsComponents.push(<MnemonicInputField mnemonicsArray={mnemonicsArray} id={i} />);
  }

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <br></br>
      <h4> Enter your 12 mnemonic phrase</h4>

      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingRight: 10, paddingLeft: 10 }}>
        {mnemonicsComponents.slice(0, 6)}
      </div>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', paddingRight: 10, paddingLeft: 10 }}>
        {mnemonicsComponents.slice(6, 12)}
      </div>

      <button className='btn' style={styles.btnStyle} onClick={() => {
        const mnemonicsString = mnemonicsArray.join(' ')
        create_wallet_local(state.password, mnemonicsString, navigate)
      }}>
        Import Wallet
      </button>
    </div >

  );
}
const styles = {
  parentStyle: {
    height: "100vh",
    width: "100vw",
    backgroundColor: colors['grey-background'],
    flexDirection: "column",
    "font-family": 'Montserrat Alternates',
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  btnStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "white",
    backgroundColor: colors['orange'],
    border: "none",
    marginTop: 20
  },
  imgStyle: {
    width: 180,
    height: 140
  }
}
export default ImportWalletPage;
