import React from "react"
// import { Text, View } from 'react-native'; 
import Logo from '../assets/logo.png';
import { onChange, validateForm } from './utils';

class LoginPage extends React.Component<any, any> {

    constructor(props: any) {
        super(props);
        this.state = {
            email: { name: 'email', value: '', required: true, error: '' },
            password: { name: 'password', value: '', required: true, error: '' },
            rememberMe: { name: 'rememberMe', value: false, required: false, error: '' },
        }
    }

    render() {
        const { email, password, rememberMe } = this.state;
        return (
            <div >
                <div >
                    <div >
                        <div >
                            {/* <img src={Logo} height="250" /> */}
                        </div>
                        <form onSubmit={this.onSubmit} className="">
                            <div >
                                <div >
                                    <div >
                                        <h1 >Login</h1>
                                        <p >Login with your credentials</p>
                                        <hr />
                                    </div>
                                </div>
                                <div >
                                    <div >
                                        <div className="form-group">
                                            <label>Email *</label>
                                            <input
                                                name={email.name}
                                                value={email.value}
                                                onChange={this.onChange}
                                                type="email"
                                                className={email.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Enter your email"
                                            />
                                        </div>

                                        <div className="form-group">
                                            <label>Password *</label>
                                            <input
                                                name={password.name}
                                                value={password.value}
                                                onChange={this.onChange}
                                                type="password"
                                                className={password.error.length > 0 ? "form-control is-invalid" : "form-control"}
                                                placeholder="Enter your password"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div >
                                <div >
                                    <div >
                                        <div >
                                            <label >
                                                <input
                                                    name={rememberMe.name}
                                                    checked={rememberMe.value}
                                                    onChange={this.onChange}
                                                    className="form-check-input"
                                                    type="checkbox"
                                                />
                                                Remember me
                                            </label>
                                        </div>
                                    </div>
                                </div>
                                <div >
                                    <div >
                                        <button type="submit" className="btn btn-primary">Submit</button>
                                    </div>
                                </div>
                            </div>
                        </form>

                        <div >
                            <div >
                                <a className="" href="#">Register here</a>
                            </div>
                            <div >
                                <a className="" href="#">Forgot password ?</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    onChange = (e: any) => {
        const name = e.target.name;
        let value = e.target.value;

        if (name === this.state.rememberMe.name) {
            value = e.target.checked;
        }
        onChange(this, name, value);
    }

    onSubmit = (e: any) => {
        e.preventDefault();
        debugger;
        if (validateForm(this)) {
            const { email, password, rememberMe } = this.state;
            const model = {
                email: email.value,
                password: password.value,
                rememberMe: rememberMe.value
            }

            console.log(model);
        }
    }
}

// const LoginPage = () => {
//     return(
//     <View
//     style={{
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center',
//     }}>
//         <Text>THIS IS THE LOGIN PAGE!</Text>
//     </View>
//     );
// };

export default LoginPage;