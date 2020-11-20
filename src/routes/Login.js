import React, {useContext, useState, useRef, useEffect}  from "react";
import {AuthContext} from "../auth/Auth";
import { Redirect } from "react-router-dom";
import '../App.css';
import db , { provider2 } from "../base"
import logo from '../images/logo.png';
import 'bootstrap/dist/css/bootstrap.min.css';

const Login = ({history}) => {
    // states
    const[disableLogin, setDisableLogin] = useState(true);
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[indicator, setIndicator] = useState('');
    const[indicatorPadding, setPadding] = useState(60);
    const isFirstRender = useRef(true)

    useEffect(() => {
        if (!isFirstRender.current){
            if ({email}.email!='' && {password}.password!='')
                setDisableLogin(false);
            else
                setDisableLogin(true);
        }
     }, [email, password]);

    useEffect(() => {
        isFirstRender.current = false;
      }, []);

    const handleLogin = (event) => {
        event.preventDefault();
        const {email, password} = event.target.elements;

        try{
            db
            .auth()
            .signInWithEmailAndPassword(email.value, password.value)
            .then(() => {
                history.push("/");
            })
            .catch(() => {
                setIndicator('Incorrect Email or Password');
                setPadding(15);
            })
            
        } catch (error){
            alert(error);
        }
    }

    const handleLoginWithGoogle = () => {
        try{
                db
                  .auth()
                  .signInWithPopup(provider2);
                  history.push("/");
          } catch (error){
              alert(error);
          }
      }

    const { currentUser } = useContext(AuthContext);
    if (currentUser) {
        return <Redirect to="/" />;
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }
    
    const redirectSignUp = () => {
        history.push("/signup")
    }

    const redirectPasswordRecovery = () => {
        history.push('/passwordrecovery')
    }

    return(
        <div className='center'>
            <form onSubmit={handleLogin} id='login_form'></form>
            <table class='center'>
                <tr class='center'>
                        <img class='center' src={logo} width="300" height="300" />
                </tr>
                <tr class='center'>
                    <td class='center'><input name="email" type="email" placeholder="Email" form='login_form' onChange={changeEmail}/></td>
                </tr>
                <tr class='center'>
                    <td class='center'><input name="password" type="password" placeholder="Password" form='login_form' onChange={changePassword}/></td>
                </tr>
                <tr class='center' style={{marginTop: 25 + 'px'}}><button class="btn btn-primary" variant="primary" form='login_form' disabled={disableLogin}>Log In</button></tr>
                <tr class='warning' style={{marginTop: 20 + 'px'}}><p>{indicator}</p></tr>
                <tr class='center' style={{marginTop: [indicatorPadding] + 'px'}}>
                    <label >Don't have an account?&nbsp;</label>
                    <button class='button' onClick={redirectSignUp}> Sign up here.</button>
                </tr>
                <tr class='center'>
                    <label >Forgot your password?&nbsp;</label>
                    <button class='button' onClick={redirectPasswordRecovery}> Reset it here.</button>
                </tr>
            </table>
        </div>
    );
};

export default Login;