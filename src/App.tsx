import { Button } from '@mui/material';
import { useState } from 'react';
import './App.css';
import CheckBoxGlobal from './components/CheckBoxGlobal/CheckBoxGlobal';
import ModalGlobal from './components/ModalGlobal/ModalGlobal';


function App() {
  const [open, setOpen] = useState<boolean>(false);
  


  const handleOpen = () => {
    setOpen(true);
  }

  const handleClose = () => {
    setOpen(false);
  }

  const handleSubmit = () => {
    alert("hello")
  }


  return (
    <div className="App">
      <Button onClick={handleOpen}>Open modal</Button>
      <ModalGlobal
        open={open}
        hideBackdrop={true}
        handleOpen={handleOpen}
        handleClose={handleClose}
        handleSubmit={handleSubmit}
        submitButtonText={"Submit"}
      >
        <>
          <h2 id="parent-modal-title">Text in a modal</h2>
          <p id="parent-modal-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </p>
          <CheckBoxGlobal
            checked={true}
            onChange={() => {}}
          />
        </>
      </ModalGlobal>
    </div>
  );
}

export default App;
