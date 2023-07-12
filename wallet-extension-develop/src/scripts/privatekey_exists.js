const privatekey_exists = () => {

  let privateKey = window.localStorage.getItem('ETH_info');
  if (privateKey) {
    return true;
  }
  return false;
};

export default privatekey_exists;
