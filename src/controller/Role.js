/*
 * @Author: your name
 * @Date: 2020-12-09 23:52:35
 * @LastEditTime: 2020-12-11 08:16:50
 * @LastEditors: Please set LastEditors
 * @Description: In Role Settings Edit
 * @FilePath: \Movie-Casting-Application\src\controller\Role.js
 */
import RoleModel from '../model/RoleModel';
import Project from './Project'

class Role {
    get(key) {
        return RoleModel.read(key).then((role) => {
            console.log('getting role ' + role)
            return role;})
    }

    addCandidate(key, candidate) {
        return RoleModel.read(key).then((data) => {
            var role = data.val()
            console.log(role)
            if (role.candidates == undefined)
                role.candidates = []
            role.candidates.push(candidate)
            RoleModel.update(key, role);
            console.log('candidate ' + candidate.key + ' is added to role ' + key);
            return role;})
    }

    deleteCandidate(key, candidate) {
        return RoleModel.read(key).then((data) => {
            var role = data.val()
            role.candidates.forEach(cand => {
                if (cand.key === candidate.key)
                    role.candidates.splice(role.candidates.indexOf(cand), 1)
            })
            RoleModel.update(key, role);
            console.log(role)
            console.log('delete candidate ' + candidate.key + ' from role ' + key);
            return role;})
    }

    inCandidate(key, candidate) {
        return RoleModel.read(key).then((data) => {
            var role = data.val()
            console.log(role.candidates)
            console.log(candidate)
            if (role.candidates == undefined)
                role.candidates = []
            var yesno = false;
            role.candidates.forEach(cand => {
                if (cand.key === candidate.key)
                    yesno = true;
            })
            console.log('is candidate ' + candidate.key + ' in role ' + key + yesno);
            return yesno;})
    }

    getCandidates(key) {
        return RoleModel.read(key).then((role) => {
            console.log('getting candidates ' + role.val().candidates)
            return role.val().candidates;})
    }

    update(key, data) {
        return RoleModel.update(key, data);
    }

    getAll(projectKey) {
        return Project.getRoles(projectKey).then(myproj => myproj.map(key => RoleModel.read(key).then(data => key = data.val())));
    }

    create(projectKey, data) {
        var key = RoleModel.create(data);
        return Project.addRole(projectKey, key);
    }

    delete(projectKey, roleKey) {
        Project.deleteRole(projectKey, roleKey)
        return RoleModel.delete(roleKey);
    }
}

export default new Role();