
    

    function meets_password_criteria(password){

    // criteria: at least one lowercase letter one uppercase letter, 
    // one digit, one special character, and is at least eight characters long
    let strongPassword = new RegExp('(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})');

        if(strongPassword.test(password)) {
            return true;
        } 
        else{
            return false;
        }
    }

    export default meets_password_criteria;
