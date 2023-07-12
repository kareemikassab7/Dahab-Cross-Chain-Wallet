import colors from "../../includes/colors"
import store_password from "../../scripts/store_password"

import create_wallet_cspr from "../../scripts/Casper/create_wallet"
import create_wallet_sol from "../../scripts/Solana/create_wallet"
import create_wallet_eth from "../../scripts/ethereum/eth_create_wallet"
import { default as create_wallet_polygon } from "../../scripts/Polygon/create_wallet"

import create_mnemonic from "../../scripts/create_mnemonic.js"
import create_seed from "../../scripts/create_seed"

import { useLocation, useNavigate } from "react-router-dom";

const non_custodial_create_wallet_local = async (navigate, password) => {
  store_password(password);
  const length = 128
  const my_mnemonic = create_mnemonic();
  const my_seed = await create_seed(my_mnemonic)
  create_wallet_sol(my_seed, password, length);
  create_wallet_cspr(my_seed, password, length);
  create_wallet_eth(my_mnemonic, password, length);
  create_wallet_polygon(password, length);
  //TODO: don't pass password as a parameter.
  navigate('/mnemonics', { state: { mnemonics: my_mnemonic } })
  window.location.reload();
}

const custodial_create_wallet_local = (password) => {
  // Omar Function call
}

const CustodyChoicePage = () => {
  const navigate = useNavigate()
  const { state } = useLocation();
  const length = 128

  return (
    <div style={styles.parentStyle}>
      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <h3>Custody choice</h3> <br></br>
      <h5>Non-Custodial: you keep your own keys</h5> <br></br>
      <h5>Custodial: we securely store your keys</h5> <br></br>

      <button className='btn' style={styles.btnStyle} onClick={() => non_custodial_create_wallet_local(navigate, state.password)}>
        Non-Custodial
      </button>

      <button className='btn' style={styles.btnStyle} onClick={() => custodial_create_wallet_local(navigate, state.password)}>
        Custodial
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
    marginBottom: 20
  },
  imgStyle: {
    width: 180,
    height: 140
  }
}

export default CustodyChoicePage;
