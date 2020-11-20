import React from "react";
import db from "../base";
import '../App.css';
import logo from '../images/logo.png';
import firebase from 'firebase';
import 'bootstrap/dist/css/bootstrap.min.css';

class signUp extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            email: '',
            password: '',
            disableRegister: true,
            indicator: '',
            labelPadding: 79,
        };

        // bind functions to constructor
        this.handleSubmit = this.handleSubmit.bind(this);
        this.emailChange = this.emailChange.bind(this);
        this.passwordChange = this.passwordChange.bind(this);
        this.redirectLogin = this.redirectLogin.bind(this);
        this.redirectPasswordRecovery = this.redirectPasswordRecovery.bind(this);
    }
    
    redirectLogin(){
        this.props.history.push('/login');
    }

    redirectPasswordRecovery(){
        this.props.history.push('/passwordrecovery');
    }

    emailChange(e){
        this.setState({email: e.target.value}, this.checkValidity);
    }

    passwordChange(e){
        this.setState({password: e.target.value}, this.checkValidity);
    }

    checkValidity(){
        if (this.state.email != '' && this.state.password != '')
            this.setState({disableRegister: false});
        else
            this.setState({disableRegister: true});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {email, password} = event.target.elements;
        try{
            db
            .auth()
            //check if the account exists
            .fetchSignInMethodsForEmail(email.value)
            .then((signInMethods) => {
                // an empty array means the account doesn't exist
                if (signInMethods.length == 0){
                    firebase.auth().createUserWithEmailAndPassword(email.value, password.value);
                }
                else{
                    this.setState({indicator: "This email is already associated with an account"})
                    this.setState({labelPadding: 30})
                }
            })
            //redirect to home
            this.props.history.push('/');
        } catch(error){
            alert(error);
        }
    }

    render(){
        return(
            <div className='center'>
                <form onSubmit={this.handleSubmit} id='recovery_form'></form>
                <table class='center'>
                    <tr class='center'><img class='center' src={logo} width="300" height="300" /></tr>
                    <tr class='center'><td class='center'><input name="email" type="email" placeholder="Email" form='recovery_form' onChange={this.emailChange}/></td></tr>
                    <tr class='center'><td class='center'><input name="password" type="password" placeholder="Password" form='recovery_form' onChange={this.passwordChange}/></td></tr>
                    <tr class='center' style={{marginTop: 25 + 'px'}}>
                        <button class="btn btn-primary" variant="primary" form='recovery_form' disabled={this.state.disableRegister}>Register</button>
                        </tr>
                    <tr class='warning' style={{marginTop: 25 + 'px'}}><p>{this.state.indicator}</p></tr>
                    <tr class='center' style={{marginTop: this.state.labelPadding + 'px'}}>
                        <p><b>Who are We?</b></p>
                        <label>Golden Cast is a service to help your casting crew quickly find the right actors for your next project</label>
                    </tr>
                    <tr class='center' style={{marginTop: 45 + 'px'}}>
                        <label >Already have an account?&nbsp;</label>
                        <button class='button' onClick={this.redirectLogin}> Login here.</button>
                    </tr>
                    <tr class='center'>
                        <label >Forgot your password?&nbsp;</label>
                        <button class='button' onClick={this.redirectPasswordRecovery}> Reset it here.</button>
                    </tr>
                </table>
            </div>
        );
    }
};

export default signUp;