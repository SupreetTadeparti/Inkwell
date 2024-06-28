import Popup from 'reactjs-popup';

function Popups() {
    return (
        <div>
          <h1>Reactjs Popup with Absolute Positioning Example</h1>
          <Popup
            trigger={<button> Open Popup </button>}
            modal
            contentStyle={customStyles.content}
            overlayStyle={customStyles.overlay}
          >
            <div className="popup-message">This is a popup message at an absolute position!</div>
          </Popup>
        </div>
      );
};

