import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import { RotatingLines } from 'react-loader-spinner'
import meets_password_criteria from "../../scripts/meets_password_criteria"
import { useLocation, useNavigate } from "react-router-dom";
const check_password_follows_criteria = (password, navigate) => {
  if (meets_password_criteria(password)) {
    navigate('importOrCreate', { state: { password } })
  } else {
    alert("Please, use a stronger password with at least one digit, one uppercase, one lowercase, one special character and a minimum length of 8 characters.")
  }
}
const NewWalletPasswordPage = () => {
  const [password, set_password] = useState("");
  // const [passwordValidFlag, set_passwordValidFlag] = useState("");
  const [loadingRing, setLoadingRing] = useState(false)
  let navigate = useNavigate();
  const { state } = useLocation();
  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <br></br>
      <h4>Step 1: Enter Password for new Wallet</h4>
      <br></br>
      <MDBInput label='Password' type='password' size='lg' onChange={e => set_password(e.target.value)} />
      <MDBInput label='Confirm Password' type='password' size='lg' />
      <br></br>

      <RotatingLines
        strokeColor="green"
        strokeWidth="5"
        animationDuration="0.75"
        width="90"
        visible={loadingRing} />

      <button className='btn' style={styles.btnStyle} onClick={() => check_password_follows_criteria(password, navigate)}>
        Create Wallet
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
    border: "none"
  },
  imgStyle: {
    width: 180,
    height: 140
  }
}
export default NewWalletPasswordPage;
