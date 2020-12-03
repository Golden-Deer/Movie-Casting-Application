import db from '../base';

const ref = db.database().ref('PROJECT');
class Project {
    create(data) {
        var key = ref.push().key;
        data.key = key;
        ref.child(key).set(data);
        console.log('creating project ' + key);
        return key;
    }

    read(key) {
        var data = null;
        ref.child(key).once('value', dataSnapshot => {
            data = dataSnapshot.val();
        });
        console.log('reading project ' + key);
        return data;
    }

    readAll() {
        var allData = [];
        ref.once('value', dataSnapshot => {
            dataSnapshot.forEach(childSnapshot => {
                allData[childSnapshot.key] = childSnapshot.val()
            });
        });
        console.log('reading all project data');
        return allData;
    }

    update(key, data) {
        ref.child(key).set(data);
        console.log('updating project ' + key);
    }

    delete(key) {
        ref.child(key).remove();
        console.log('removing project ' + key);
    }
}

export default new Project();