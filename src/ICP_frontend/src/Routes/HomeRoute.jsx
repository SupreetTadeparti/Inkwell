import { ICP_backend } from "../../../declarations/ICP_backend";
import BallsBackground from "../Components/BallsBackground";
import FilterBar from "../Components/FilterBar";
import { useNavigate } from "react-router-dom"
import SideBar from "../Components/SideBar";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Notes from "../Components/Notes";
import "../assets/css/HomeRoute.css"

function HomeRoute() {
  const [allNotes, setAllNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const { actor, authenticated } = useAuth();
  const navigate = useNavigate();

  async function initializeNotes() {
    let userNotes = await (actor ?? ICP_backend).getNotes();
    setAllNotes(userNotes);
    setNotes(userNotes);
  }

  useEffect(() => {
    initializeNotes();
  }, [])

  if (authenticated === null) return <>Loading...</>

  // if (authenticated === false) navigate(`/?canisterId=${process.env.CANISTER_ID}`)

  return <div className="home-container">
    <div className="background"></div>
    <BallsBackground parallax={false} />
    <SideBar />
    <FilterBar allNotes={allNotes} setNotes={setNotes} />
    <Notes notes={notes} />
  </div>
}

export default HomeRoute;
