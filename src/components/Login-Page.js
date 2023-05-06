import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { UserAuth } from '../context/UserAuthContext';
import logo from "./img/logo.png";
import "./css/Login-Page.css";
// import NavBar from './NavBar';

function LoginPage() {
    const { signIn } = UserAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try{
            await signIn(username, password);
        }catch(err){
            console.log(err);
        }
        console.log(`Logging in with username: ${username} and password: ${password}`);
        navigate(('/Profile-Page'))
    };

    return (
        <>
            {/* <NavBar/> */}
            
            <div className="loginBody">
                <Link to="/">
                    <img src={logo} alt="logo" className="logo" />
                </Link>

                <h1>Welcome Back!</h1>
                
                <form onSubmit={handleSubmit}>
                    <label>
                        Username:
                        <input type="text" value={username} onChange={handleUsernameChange} />
                    </label>
                    <br />
                    <label>
                        Password:
                        <input type="password" value={password} onChange={handlePasswordChange} />
                    </label>
                    <br />
                    <button type="submit">Login</button>
                </form>
            </div>
        </>
    );
}

export default LoginPage;
