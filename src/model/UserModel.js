/*
 * @Author: your name
 * @Date: 2020-12-04 07:43:34
 * @LastEditTime: 2020-12-10 02:18:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \Movie-Casting-Application\src\model\UserModel.js
 */
import db from '../base';

const ref = db.database().ref('USER');
class UserModel {
    create(key, data) {
        ref.child(key).set(data).catch((error) => {
            console.log(error);
        });
        console.log('creating user ' + key);
        return key;
    }

    read(key) {
        return ref.child(key).once('value').then((user) => {
            console.log('read user ' + user);
            return user;})
            .catch(error => console.log(error));
    }

    readAll() {
        var allData = [];
        ref.once('value', dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                allData[childSnapshot.key] = childSnapshot.val()
            });
        });
        console.log('reading all user data');
        return allData;
    }

    update(key, data) {
        ref.child(key).set(data);
        console.log('updating user ' + key);
    }

    delete(key) {
        ref.child(key).remove();
        console.log('removing user ' + key);
    }
}

export default new UserModel();