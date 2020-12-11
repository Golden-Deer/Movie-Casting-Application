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

    signOut() {
        return db.auth().signOut();
    }

    delete() {
        UserModel.delete(db.auth().currentUser.uid);
        db.auth().currentUser.delete().then(console.log('deleted user ' + db.auth().currentUser.uid));
    }
}

export default new User();