// const getTutors = require('../model/getTutors');
// const addTutor = require('../model/createTutor');
// const updateTutors = require('../model/updateTutors');
// const deleteTutor = require('../model/deleteTutor');
const handleSignUp = require('../model/handleSignUp');
const express = require('express');
const router = express.Router();

router.post('/signUp', (req, res) => {
    handleSignUp(req.body.signUpEmail, req.body.signUpPassword, req.body.firstName, req.body.lastName)
    .then(val => console.log(val));
  })

//   router.post('/tutor_list/update_tutor', (req, res) => {
//     updateTutors(req.body.tutors, req.body.cseCourse);
//   })

//   router.post('/tutor_list/delete_tutor', (req, res) => {
//     deleteTutor(req.body.tutor, req.body.cseCourse);
//   })

//   router.post('/tutor_list/add_tutor', (req, res) => {
//     addTutor(req.body.name, req.body.years, req.body.cseCourse);
//   })

module.exports = router;