var firebase = require('firebase');
var firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyDSvDPrxoqjK_lLjerSNhLkEpysFJAHSQY",
    authDomain: "golden-cast.firebaseapp.com",
    databaseURL: "https://golden-cast.firebaseio.com",
    projectId: "golden-cast",
    storageBucket: "golden-cast.appspot.com",
    messagingSenderId: "1007677499038",
    appId: "1:1007677499038:web:a911b11c73396a295d3d8f",
    measurementId: "G-WMRHB8J6XJ"
})

var db = firebaseApp;

module.exports = db; 