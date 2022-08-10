import {useNavigate} from "react-router-dom";

function Layout({children}) {
    const navigate = useNavigate()
    async function logout() {
        localStorage.removeItem('token');
        navigate('/login')
    }
    return <>
        <nav className="navbar navbar-dark bg-primary">
            <div className="container-fluid">
                <span className="navbar-brand mb-0 h1">Titter</span>
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