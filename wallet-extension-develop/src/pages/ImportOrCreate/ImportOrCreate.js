import colors from "../../includes/colors"
import { useNavigate, useLocation } from "react-router-dom";

const ImportOrCreateWalletPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation();

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <h4>Import an existing wallet? or create a new one?</h4> <br></br>

      <button className='btn' style={styles.btnStyle} onClick={() => {
        navigate('/importWallet', { state: { password: state.password } })
      }}>
        Import Wallet
      </button>

      <button className='btn' style={styles.btnStyle} onClick={() => {
        navigate('/CustodyChoice', { state: { password: state.password } })
      }}>
        Create New Wallet
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
export default ImportOrCreateWalletPage;
