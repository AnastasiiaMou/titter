import {useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function LoginPage (props) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function login() {
        const credentials = {
            username,
            password
        };

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

    return <div>
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
}

export default LoginPage;