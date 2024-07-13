import BallsBackground from "../Components/BallsBackground";
import FilterBar from "../Components/FilterBar";
import { useNavigate } from "react-router-dom";
import SideBar from "../Components/SideBar";
import { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import Notes from "../Components/Notes";
import "../assets/css/HomeRoute.css";

function HomeRoute() {
  const [allNotes, setAllNotes] = useState([]);
  const [notes, setNotes] = useState([]);
  const [searchText, setSearchText] = useState("");
  const { authenticated, getActor } = useAuth();
  const navigate = useNavigate();

  async function initializeNotes() {
    let userNotes = await (await getActor()).getNotes();
    setAllNotes(userNotes);
    setNotes(userNotes);
  }

  function removeNoteFromState(noteId) {
    setAllNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
    setNotes((prevNotes) => prevNotes.filter((note) => note.id !== noteId));
  }

  useEffect(() => {
    if (authenticated) {
      initializeNotes();
    } else if (authenticated === false) {
      navigate(`/`);
    }
  }, [authenticated]);

  if (authenticated === null) return <>Loading...</>;

  return (
    <div className="home-container">
      <div className="background"></div>
      <BallsBackground parallax={false} />
      <SideBar />
      <FilterBar
        allNotes={allNotes}
        setNotes={setNotes}
        setSearchText={setSearchText}
      />
      <Notes
        notes={
          notes
            ? notes
                .filter((note) =>
                  note.title.toLowerCase().includes(searchText.toLowerCase())
                )
                .reverse()
            : []
        }
        removeNoteFromState={removeNoteFromState}
      />
    </div>
  );
}

export default HomeRoute;
