import logo from "../assets/img/logo.png"
import NewNoteButton from "./NewNoteButton";

function SideBar() {
    return (
    <div className="side-bar glass">
        <div className="logo"><img src={logo} alt="Logo" /></div>
        <NewNoteButton />
    </div>
    );
}

export default SideBar;