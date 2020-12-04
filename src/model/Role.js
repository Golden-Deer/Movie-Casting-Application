import db from '../base';

const ref = db.database().ref('ROLE');
class Role {
    create(data) {
        var key = ref.push().key;
        data.key = key;
        ref.child(key).set(data);
        console.log('created role ' + key);
        return key;
    }

    read(key) {
        var data = null;
        ref.child(key).once('value', dataSnapshot => {
            data = dataSnapshot.val();
        });
        console.log('read role ' + key);
        return data;
    }

    addCandidate(key, data) {
        var candKey = ref.child(key).child('candidates').push().key;
        data.key = candKey;
        ref.child(key).child('candidates').child(candKey).set(data);
        console.log('added candidate ' + data.name + ' to role ' + key);
        return candKey;
    }

    deleteCandidate(key, candKey) {
        ref.child(key).child('candidates').child(candKey).remove();
        console.log('removed candidate ' + data.name + ' from role ' + key);
        return candKey;
    }

    readAll() {
        var allData = [];
        ref.once('value', dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                allData[childSnapshot.key] = childSnapshot.val()
            });
        });
        console.log('read all role data');
        return allData;
    }

    update(key, data) {
        ref.child(key).set(data);
        console.log('updated role ' + key);
    }

    delete(key) {
        ref.child(key).remove();
        console.log('removed role ' + key);
    }
}

export default new Role();