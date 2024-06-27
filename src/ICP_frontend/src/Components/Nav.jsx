import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

function Nav() {
    const { login, logout, authenticated } = useAuth();
    const navigate = useNavigate();

    const navigateToApp = () => {
        navigate(`/app?canisterId=${process.env.CANISTER_ID}`);
    }

    return <nav className="navbar">
        <h1 className="navbar-brand">Inkwell</h1>
        <div className="navbar-links">
            <div onClick={navigateToApp}>{authenticated === null ? "Loading..." : authenticated && "Home"}</div>
            <div onClick={async () => {
                if (authenticated === null) return;

                if (authenticated) await logout();
                else {
                    await login();
                    navigateToApp();
                }
            }}>{authenticated === null ? "Loading..." : authenticated ? "Logout" : "Login"}</div>
        </div>
    </nav>
}

export default Nav;