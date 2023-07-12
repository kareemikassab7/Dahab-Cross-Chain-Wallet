import colors from "../../includes/colors"
import { useNavigate, useLocation } from "react-router-dom";

const ShowMnemonicsPage = () => {
  const navigate = useNavigate()
  const { state } = useLocation();

  return (
    <div style={styles.parentStyle}>

      <img src={require('../../images/jewel.png')} alt="jewel" style={styles.imgStyle} />
      <h1 class="display-3" style={{ color: colors["black-text"] }}>DAHAB</h1>
      <h4>Step 2: Please save your credential phrases</h4> <br></br>

      <div style={styles.nemStyle}>
        {state.mnemonics}
      </div>

      <button className='btn' style={styles.btnStyle} onClick={() => {
        navigate('/validateMnemonics', { state: { mnemonics: state.mnemonics } })
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
    border: "none",
    marginBottom: 20
  },
  imgStyle: {
    width: 180,
    height: 140
  },
  nemStyle: {
    fontWeight: 'bold',
    fontSize: 24,
    color: 'black',
    backgroundColor: colors['white'],
    padding: '10px',
    border: 'solid',
    borderColor: 'orange',  // new property
    borderWidth: 5,  // optional - sets the width of the border
    marginBottom: 40,
    marginTop: 40
  }
  ,

}
export default ShowMnemonicsPage;
