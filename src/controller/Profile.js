import db from '../base';

const ref = db.database().ref('PROFILE');
class Profile {
    read(key) {
        return ref.child(key).once('value').then((data) => {
            console.log('read profile ' + key);
            return data;})
    }

    readAll() {
        console.log('reading all profile data');
        return ref.orderByChild('name').once('value');
    }
}

export default new Profile();