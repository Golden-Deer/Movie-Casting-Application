import db from '../base';

const ref = db.storage().ref('Actor Pictures');

class Picture {
    read(key) {
        console.log(ref.child(key));
        return ref.child(key);
    }
}

export default new Picture();