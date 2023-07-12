import { useState } from 'react';
import colors from "../../includes/colors"
import { MDBInput } from 'mdb-react-ui-kit';
import { useNavigate } from "react-router-dom";

import is_password_valid from "../../scripts/is_password_valid"
import store_keys_in_redux from '../../scripts/KeysRedux/store_keys';

import { useDispatch } from 'react-redux';

const login = (navigate, length, password, dispatch) => {
  if (
    is_password_valid(password)
  ) {
    store_keys_in_redux(password, dispatch)
    navigate("/wallet", { replace: true });
  } else {
    alert("Invalid Password")
  }
}
const LoginPage = () => {
  const [password, set_password] = useState("");
  let navigate = useNavigate();
  const dispatch = useDispatch();
  const length = 128
  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 className="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <MDBInput label='Password' type='password' size='lg' onChange={e => set_password(e.target.value)} />
      <button className='btn' style={styles.btnStyle} onClick={() => login(navigate, length, password, dispatch)}>
        Login
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
export default LoginPage;
