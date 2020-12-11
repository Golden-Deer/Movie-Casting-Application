/*
 * @Author: your name
 * @Date: 2020-12-09 23:52:35
 * @LastEditTime: 2020-12-10 02:09:12
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Movie-Casting-Application\src\controller\User.js
 */
import UserModel from '../model/UserModel';
import db from '../base';

class User {
    isSignedIn() {
        return db.auth().currentUser != null;
    }
    getUser() {
        return UserModel.read(db.auth().currentUser.uid).then((user) => {
            console.log('getting user ' + user)
            return user;})
    }

    create(key, data) {
        UserModel.create(key, data);
    }

    signUp(email, password, data) {
        return db.auth().createUserWithEmailAndPassword(email, password).then(() => {
            console.log('sign up ' + db.auth().currentUser.uid);
            UserModel.create(db.auth().currentUser.uid, data)});
    }

    async isSignedUp(email) {
        const list = await db.auth().fetchSignInMethodsForEmail(email);
        console.log(list.length != 0)
        return list.length != 0
    }

    signIn(email, password){
        return db.auth().signInWithEmailAndPassword(email, password);
    }

    passwordRecovery(email) {
        return db.auth().sendPasswordResetEmail(email);
    }

    signOut() {
        return db.auth().signOut();
    }

    delete() {
        return db.auth().currentUser.delete().then(console.log('deleted ' + db.auth().currentUser.uid))
    }
}

export default new User();