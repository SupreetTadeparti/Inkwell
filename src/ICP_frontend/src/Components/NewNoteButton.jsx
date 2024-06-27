import { useState } from "react";

const ColorCircle = ({ color }) => {
    return (
        <div className='small-circle' style={{ backgroundColor: color }}>

        </div>
    );
};

function NewNoteButton() {
    let [subComponents, setSubcomponents] = useState([]);

    let numCategories = 3;
    let categoryColors = ['red', 'blue', 'yellow'];

    function colorSelect(numCategories, categoryColors) {
        const subComponents = [];

        for (let i = 0; i < numCategories; i++) {
            subComponents.push(<ColorCircle color={categoryColors[i]} />)
        }

        setSubcomponents(subComponents)
    }

    return <>
        
        <div onClick={() => colorSelect(numCategories, categoryColors)} className="new-note-btn glass">+{subComponents}</div>
    </>
}

export default NewNoteButton