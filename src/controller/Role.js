/*
 * @Author: your name
 * @Date: 2020-12-09 23:52:35
 * @LastEditTime: 2020-12-11 08:16:50
 * @LastEditors: Please set LastEditors
 * @Description: In Role Settings Edit
 * @FilePath: \Movie-Casting-Application\src\controller\Role.js
 */
import RoleModel from '../model/RoleModel';
import db from '../base';
import Project from './Project'
import ProjectModel from '../model/ProjectModel';

class Role {
    get(key) {
        return RoleModel.read(key).then((role) => {
            console.log('getting role ' + role)
            return role;})
    }

    getAll() {
        return Project.getRoles().then(myproj => myproj.map(key => RoleModel.read(key).then(data => key = data.val())));
    }

    create(projectKey, data) {
        var key = RoleModel.create(data);
        return Project.addRole(projectKey, key);
    }

    delete() {
        return db.auth().currentRole.delete().then(console.log('deleted ' + db.auth().currentRole.uid))
    }
}

export default new Role();