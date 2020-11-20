import React from "react";
import db from "../base";
import '../App.css';
import logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

class passwordRecovery extends React.Component{
    constructor(props){
        super(props);
        this.state = {
        email: '',
        disableEmail: true,
        indicator: '',
        labelPadding: 102
        };

        // bind functions to constructor
        this.handleSubmit = this.handleSubmit.bind(this);
        this.changeEmail = this.changeEmail.bind(this);
        this.checkEmail = this.checkEmail.bind(this);
        this.redirectSignUp = this.redirectSignUp.bind(this);
        this.redirectLogin = this.redirectLogin.bind(this);
    }
    
    redirectSignUp(){
        this.props.history.push('/signup');
    }

    redirectLogin(){
        this.props.history.push('/login');
    }

    changeEmail(e){
        this.setState({email: e.target.value}, this.checkEmail)
    }

    checkEmail(){
        if (this.state.email != '')
            this.setState({disableEmail: false});
        else
            this.setState({disableEmail: true});
    }

    handleSubmit(event) {
        event.preventDefault();
        const {email} = event.target.elements;
        try{
            db
            .auth()
            .fetchSignInMethodsForEmail(email.value)
            .then((signInMethods) => {
                // an empty array means the account doesn't exist
                if (signInMethods.length == 0){
                    this.setState({indicator: "No account in our database is associated with this email"})
                    this.setState({labelPadding: 58})
                }
                else{
                    this.setState({indicator: "Account found (email sending in progress)"})
                    this.setState({labelPadding: 58})
                }
            })
            // history.push("/");
        } catch(error){
            alert(error);
        }
      }

    render(){
        console.log(this.state.labelPadding)
        return(
            <div className='center'>
                <form onSubmit={this.handleSubmit} id='recovery_form'></form>
                <table class='center'>
                    <tr class='center'><img class='center' src={logo} width="300" height="300" /></tr>
                    <tr class='center'><td class='center'><input name="email" type="email" placeholder="Email" form='recovery_form' onChange={this.changeEmail}/></td></tr>
                    <tr class='center' style={{marginTop: 25 + 'px'}}><button class="btn btn-primary" variant="primary" form='recovery_form' disabled={this.state.disableEmail}>Send Email</button></tr>
                    <tr class='warning' style={{marginTop: 20 + 'px'}}><p>{this.state.indicator}</p></tr>
                    <tr class='center' style={{marginTop: this.state.labelPadding + 'px'}}>
                        <label >Don't have an account?&nbsp;</label>
                        <button class='button' onClick={this.redirectSignUp}> Sign up here.</button>
                    </tr>
                    <tr class='center'>
                        <label >Know your password?&nbsp;</label>
                        <button class='button' onClick={this.redirectLogin}> Login here.</button>
                    </tr>
                </table>
            </div>
        );
    }
};

export default passwordRecovery;