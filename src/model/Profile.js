import db from '../base';

const ref = db.database().ref('PROFILE');
class Profile {
    read(key) {
        var data = null;
        ref.child(key).once('value', dataSnapshot => {
            data = dataSnapshot.val();
        });
        console.log('reading profile ' + key);
        return data;
    }

    readAll() {
        console.log('reading all profile data');
        return ref.orderByChild('name').once('value');
    }
}

export default new Profile();