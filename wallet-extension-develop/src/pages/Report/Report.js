import { useState } from 'react';
import colors from "../../includes/colors"
import { useLocation, useNavigate } from "react-router-dom";
import { faCircleCheck, faCircleXmark, faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const navigate_local = (navigate, page) => {
  navigate(`/${page}`)
}
const ReportPage = () => {
  //Sample Navigation 1 [Success]: navigate('report', { state: { message: 'Transaction Succeeded', statusId: 1, page: '' } })
  //Sample Navigation 2 [Failure]: navigate('report', { state: { message: 'Transaction Failed', statusId: 2, page: '' } })

  const navigate = useNavigate()
  const { state } = useLocation();
  const [color, setColor] = useState(state.statusId == 1 ? colors.green : colors.red);

  return (
    <div style={styles.parentStyle}>
      {state.statusId == 1 ?
        <FontAwesomeIcon icon={faCircleCheck} style={{ color: color, fontSize: 150 }} />
        : <FontAwesomeIcon icon={faCircleXmark} style={{ color: color, fontSize: 150 }} />
      }
      <div class="display-5" style={{ color: colors["black-text"], marginTop: 50, marginBottom: 50 }}>{state.message}</div>
      <button className='btn' style={{ ...styles.btnStyle, backgroundColor: color }} onClick={() => navigate_local(navigate, state.page)} >
        Proceed <FontAwesomeIcon icon={faArrowRight} />
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
    justifyContent: "center",
  },
  btnStyle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: "white",
    border: "none"
  },
  imgStyle: {
    width: 180,
    height: 140
  }
}
export default ReportPage;
