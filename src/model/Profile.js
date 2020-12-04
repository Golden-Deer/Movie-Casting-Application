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
        var allData = [];
        ref.once('value', dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                allData[childSnapshot.key] = childSnapshot.val()
            });
        });
        console.log('reading all profile data');
        return allData;
    }
}

export default new Profile();