/*
 * @Author: your name
 * @Date: 2020-12-09 23:52:35
 * @LastEditTime: 2020-12-10 02:09:12
 * @LastEditors: Please set LastEditors
 * @Description: In Project Settings Edit
 * @FilePath: \Movie-Casting-Application\src\controller\Project.js
 */
import ProjectModel from '../model/ProjectModel';
import db from '../base';
import User from './User'

class Project {
    get(key) {
        return ProjectModel.read(key).then((project) => {
            console.log('getting project ' + project)
            return project;})
    }

    create(data) {
        var key = ProjectModel.create(data);
        User.addProject(key);
    }

    delete() {
        return db.auth().currentProject.delete().then(console.log('deleted ' + db.auth().currentProject.uid))
    }
}

export default new Project();