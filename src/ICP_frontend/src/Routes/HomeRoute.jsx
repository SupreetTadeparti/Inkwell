import { useAuth } from "../AuthContext";
import { useNavigate } from "react-router-dom"
import SideBar from "../Components/SideBar";
import FilterBar from "../Components/FilterBar";
import Notes from "../Components/Notes";
import BallsBackground from "../Components/BallsBackground";
import "../assets/css/HomeRoute.css"


function HomeRoute() {
  const { authenticated } = useAuth();
  const navigate = useNavigate();

  if (authenticated === null) return <>Loading...</>

  // if (authenticated === false) navigate(`/?canisterId=${process.env.CANISTER_ID}`)

  return <div className="app-container">
    <div className="background"></div>
    <BallsBackground parallax={false} />
    <SideBar />
    <FilterBar />
    <Notes />
  </div>
}

export default HomeRoute;
