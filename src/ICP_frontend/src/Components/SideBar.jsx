import logo from "../assets/img/logo.png";
import NewNoteButton from "./NewNoteButton";
import exitIcon from "../assets/img/exit.svg";
import { useAuth } from "../AuthContext";

function SideBar() {
  const { logout } = useAuth();

  return (
    <div className="side-bar glass">
      <div className="logo">
        <img src={logo} alt="Logo" />
      </div>
      <NewNoteButton />
      <div className="side-bar__bottom">
        <div className="logout-btn glass button" onClick={logout}>
          <div className="logout-btn__icon">
            <img src={exitIcon} alt="Logout" />
          </div>
          <div className="logout-btn__text">Logout</div>
        </div>
      </div>
    </div>
  );
}

export default SideBar;
