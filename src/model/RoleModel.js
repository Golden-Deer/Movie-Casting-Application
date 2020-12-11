import db from '../base';

const ref = db.database().ref('ROLE');
class RoleModel {
    create(data) {
        var key = ref.push().key;
        data.key = key;
        ref.child(key).set(data);
        console.log('creating role ' + key);
        return key;
    }

    read(key) {
        return ref.child(key).once('value').then((data) => {
            console.log('read role ' + data);
            return data;})
    }

    readAll() {
        return ref.once('value');
    }

    update(key, data) {
        ref.child(key).set(data);
        console.log('updating role ' + key);
    }

    delete(key) {
        ref.child(key).remove();
        console.log('removing role ' + key);
    }
}

export default new RoleModel();