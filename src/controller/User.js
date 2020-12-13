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

    deleteProject(projectKey) {
        return UserModel.read(db.auth().currentUser.uid).then((user) => {
            var data = user.val();
            console.log(data);
            var index = data.projects.indexOf(projectKey);
            data.projects.splice(index, 1);
            console.log(data);
            UserModel.update(user.key, data);
        })
    }

    addProject(projectKey) {
        return UserModel.read(db.auth().currentUser.uid).then((user) => {
            var data = user.val();
            console.log(data);
            if (data.projects == undefined) {
                data.projects = [];
                console.log(data);
            }
            data.projects.push(projectKey);
            console.log(data);
            UserModel.update(user.key, data);
        })
    }

    getProjects() {
        return UserModel.read(db.auth().currentUser.uid).then(user => user.val().projects)
    }

    get() {
        return UserModel.read(db.auth().currentUser.uid).then((user) => {
            console.log('getting user ' + user.key);
            return user;
        })
    }

    create(key, data) {
        UserModel.create(key, data);
    }

    signUp(email, password, data) {
        return db.auth().createUserWithEmailAndPassword(email, password).then(() => {
            console.log('sign up ' + db.auth().currentUser.uid);
            UserModel.create(db.auth().currentUser.uid, data);
        });
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
        UserModel.delete(db.auth().currentUser.uid);
        db.auth().currentUser.delete().then(console.log('deleted user ' + db.auth().currentUser.uid)).catch(function(error) {
            console.log(error);
        });
    }
}

export default new User();