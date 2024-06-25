import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../AuthContext";
import "../assets/css/Nav.css"
import { useEffect } from "react";

function Nav() {
    const { authClient, actor, login, logout, isLoggedIn } = useAuth();
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        (async () => {
            console.log("Logged in: " + await isLoggedIn());
        })();
    }, [])

    return <nav className="navbar">
        <h1 className="navbar-brand">Inkwell</h1>
        <div className="navbar-links">
            <div onClick={async () => {
                if (actor) await logout();
                else {
                    await login();
                    // navigate(`/app?canisterId=${searchParams.get('canisterId')}`); 
                }
            }}>{actor ? "Logout" : "Login"}</div>
        </div>
    </nav>
}

export default Nav;