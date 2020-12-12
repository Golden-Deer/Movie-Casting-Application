/*
 * @Author: your name
 * @Date: 2020-12-09 23:52:35
 * @LastEditTime: 2020-12-11 08:24:11
 * @LastEditors: Please set LastEditors
 * @Description: In Project Settings Edit
 * @FilePath: \Movie-Casting-Application\src\controller\Project.js
 */
import ProjectModel from '../model/ProjectModel';
import db from '../base';
import User from './User'
import UserModel from '../model/UserModel';

class Project {
    get(key) {
        return ProjectModel.read(key).then((project) => {
            console.log('getting project ' + project)
            return project;})
    }

    getRoles(projectKey) {
        return ProjectModel.read(projectKey).then((project) => {return (project.val().roles == undefined) ? [] : project.val().roles })
    }

    addRole(projectKey, roleKey) {
        return ProjectModel.read(projectKey).then((project) => {
            var data = project.val()
            console.log(data)
            if (data.roles == undefined) {
                data.roles = [];
                console.log(data)
            }
            data.roles.push(roleKey);
            console.log(data);
            ProjectModel.update(projectKey, data);
            return roleKey;
        })
    }

    update(key, data) {
        ProjectModel.update(key, data);
    }

    getAll() {
        return User.getProjects().then(myproj => myproj.map(key => ProjectModel.read(key).then(data => key = data.val())));
    }

    create(data) {
        var key = ProjectModel.create(data);
        return User.addProject(key);
    }

    delete(key) {
        return ProjectModel.delete(key);
    }
}

export default new Project();