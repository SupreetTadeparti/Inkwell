import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../assets/css/Nav.css"

function Nav() {
    const { login, logout, authenticated } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    return <nav className="navbar">
        <h1 className="navbar-brand">Inkwell</h1>
        <div className="navbar-links">
            <div onClick={async () => {
                if (authenticated === null) return;

                if (authenticated) await logout();
                else {
                    await login();
                    navigate(`/app?canisterId=${searchParams.get('canisterId')}`);
                }
            }}>{authenticated === null ? "Loading..." : authenticated ? "Logout" : "Login"}</div>
        </div>
    </nav>
}

export default Nav;