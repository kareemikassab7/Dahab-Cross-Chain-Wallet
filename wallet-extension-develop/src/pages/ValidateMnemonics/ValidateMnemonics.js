import { useState } from 'react';
import colors from "../../includes/colors"
import { useNavigate, useLocation } from "react-router-dom";
import { MDBInput } from 'mdb-react-ui-kit';

const validate_mnemonics = (mnemonics, firstWord, lastWord, navigate) => {
  const mnemonics_split = mnemonics.split(' ')
  console.log('Mnemonics: ', mnemonics_split, firstWord, lastWord)
  if (mnemonics_split[0] == firstWord && mnemonics_split[11] == lastWord) {
    navigate('/')
  } else {
    alert("Incorrect words")
  }
}

const ValidateMnemonics = () => {
  const navigate = useNavigate()
  const { state } = useLocation();

  const [firstWord, setFirstWord] = useState("")
  const [lastWord, setLastWord] = useState("")

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <br></br>
      <h4> Step 3: Verify credential phrases</h4>

      <br></br>
      <MDBInput label='Enter first word' size='lg' onChange={e => setFirstWord(e.target.value)} />
      <MDBInput label='Enter last word' size='lg' onChange={e => setLastWord(e.target.value)} />
      <br></br>

      <button className='btn' style={styles.btnStyle} onClick={() => {
        validate_mnemonics(state.mnemonics, firstWord, lastWord, navigate);
      }}>
        next
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
export default ValidateMnemonics;
