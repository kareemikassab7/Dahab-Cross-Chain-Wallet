import './App.css';
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import MakeTransaction from "./pages/MakeTransaction/MakeTransaction"
import Swap from "./pages/Swap/Swap"
import ImportWallet from "./pages/ImportWallet/ImportWallet";
import ImportOrCreate from "./pages/ImportOrCreate/ImportOrCreate";
import privatekey_exists from "./scripts/privatekey_exists"
import Report from "./pages/Report/Report";
import NewWalletPassword from "./pages/NewWalletPassword/NewWalletPassword"
import CustodyChoice from "./pages/CustodyChoice/CustodyChoice"
import { Provider } from 'react-redux'
import store from "./scripts/store"
import ShowMnemonics from "./pages/ShowMnemonics/ShowMnemonics"
import ValidateMnemonics from "./pages/ValidateMnemonics/ValidateMnemonics"

function App() {
  return (
    <Provider store={store}>

      <Router>
        <Routes>
          {
            privatekey_exists() ? <Route path="/" element={<Login />} /> :
              <Route path="/" element={<NewWalletPassword />} />
          }

          <Route path="/importWallet" element={<ImportWallet />} />
          <Route path="/importOrCreate" element={<ImportOrCreate />} />

          <Route path="/wallet" element={<MakeTransaction />} />
          <Route path="/swap" element={<Swap />} />
          <Route path="/report" element={<Report />} />
          <Route path="/CustodyChoice" element={<CustodyChoice />} />
          <Route path="/validateMnemonics" element={<ValidateMnemonics />} />
          <Route path="/mnemonics" element={<ShowMnemonics />} />

        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
