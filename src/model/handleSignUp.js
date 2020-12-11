const db = require('../db_config');

module.exports = function handleSignUp(signUpEmail, signUpPassword, firstName, lastName) {
    db
        .auth()
        //check if the account exists
        .fetchSignInMethodsForEmail(signUpEmail)
        .then((signInMethods) => {
            // an empty array means the account doesn't exist
            if (signInMethods.length == 0) {
                console.log("exists")
                // db.auth().createUserWithEmailAndPassword(signUpEmail, signUpPassword)
                //     .then((user) => {
                //         var user = db.auth().currentUser;
                //         db.database().ref('USER/' + user.uid).set({
                //             email: user.email,
                //             firstName: firstName,
                //             lastName: lastName,
                //             projects: []
                //         });
                //     })
                //     .catch((error) => {
                //         var errorCode = error.code;
                //         var errorMessage = error.message;
                //         alert(errorCode + errorMessage);
                //     });
            }
            else {
                console.log("FAIL")
                // setIndicator("This email is already associated with an account");
                // setPadding(20);
                return false;
            }
        });
}
