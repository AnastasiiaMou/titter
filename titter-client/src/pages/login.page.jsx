import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginPage (props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const [registerUsername, setRegisterUsername] = useState("");
    const [registerPassword, setRegisterPassword] = useState("");
    const [registerPasswordRepeat, setRegisterPasswordRepeat] = useState("");

    const navigate = useNavigate();

    async function login(event, loginAfterSignup = false) {
        const credentials = {
            username,
            password
        };

        if (loginAfterSignup) {
            credentials.username = registerUsername;
            credentials.password = registerPassword;
        }

        try {
            const res = await axios.post('/api/users/login', credentials);
            console.log(res);
            const token = res.headers.authorization;
            localStorage.setItem('token', token);
            navigate('/me')
        } catch (e) {
            alert('Incorrect credentials')
        }
    }

    async function signUp() {
        if (registerPasswordRepeat != registerPassword) {
            alert('Passwords must match')
            return;
        }

        const account = {
            username: registerUsername,
            password: registerPassword
        }

        try {
            const res = axios.post("/api/users/register", account);
            await login(null,true);
        } catch (e) {
            alert('Failed')
        }
    }

    return <div className="container">
        <div className="row  pt-5 justify-content-center">
            <div className="col-md-4">
                <h4>Login</h4>
                <div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail1" value={username} onChange={e => setUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword1" value={password} onChange={e => setPassword(e.target.value)} />
                    </div>
                    <button className="btn btn-primary" onClick={login}>Login</button>
                </div>
            </div>
            <div className="col-md-4">
                <h4>Sign Up</h4>
                <div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail2" className="form-label">Username</label>
                        <input type="text" className="form-control" id="exampleInputEmail2" value={registerUsername} onChange={e => setRegisterUsername(e.target.value)}/>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword2" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword2" value={registerPassword} onChange={e => setRegisterPassword(e.target.value)} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword3" className="form-label">Password</label>
                        <input type="password" className="form-control" id="exampleInputPassword3" value={registerPasswordRepeat} onChange={e => setRegisterPasswordRepeat(e.target.value)} />
                    </div>
                    <button className="btn btn-primary" onClick={signUp}>Sign Up</button>
                </div>
            </div>

        </div>
    </div>
}

export default LoginPage;