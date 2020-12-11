import db from '../base';

const ref = db.database().ref('PROJECT');
class ProjectModel {
    create(data) {
        var key = ref.push().key;
        data.key = key;
        ref.child(key).set(data);
        console.log('creating project ' + key);
        return key;
    }

    read(key) {
        return ref.child(key).once('value').then((data) => {
            console.log('read project ' + data);
            return data;})
    }

    readAll() {
        return ref.once('value');
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

export default new ProjectModel();