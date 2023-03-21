import React, { useState } from 'react';

function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // TODO: handle login logic using Database:
        // 1. The user enters their credentials (username and password) into a login form.
        // 2. The form data is submitted to the server for validation.
        // 3. The server verifies that the user's credentials are valid by checking them against a database or some other authentication mechanism.
        // 4. If the user's credentials are valid, the server creates a session or token that represents the user's authenticated state and sends it back to the client.
        // 5. The client stores the session or token(e.g., in a cookie or local storage) and sends it back to the server with each subsequent request to identify the user.
        console.log(`Logging in with username: ${username} and password: ${password}`);
    };

    return (
        <div>
            <h1>Login Page</h1>
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
    );
}

export default LoginPage;
