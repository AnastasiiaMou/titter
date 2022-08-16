import {Link, useNavigate} from "react-router-dom";

function isLogged() {
    if (localStorage.getItem('token')) {
        return true
    }

    return false;
}

function Layout({children}) {
    const navigate = useNavigate()
    const logged = isLogged()

    async function logout() {
        localStorage.removeItem('token');
        navigate('/login')
    }

    return <>
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Titter</span>
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/me" className="nav-link">My feed</Link>
                    </li>
                </ul>
                <div className="d-flex" role="search">
                    {/*<input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>*/}
                    <button className="btn btn-light btn-sm" onClick={logout}>Logout</button>
                </div>
            </div>
        </nav>
        <div className="container pt-4">
            {children}
        </div>

    </>
}

export default Layout