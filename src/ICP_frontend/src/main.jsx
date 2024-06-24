import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Landing from './Routes/Landing';
import "./index.css"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ParallaxProvider } from 'react-scroll-parallax';


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path='/' element={<ParallaxProvider><Landing /></ParallaxProvider>} />
        <Route path='/app' element={<App />} />
      </Routes>
    </Router>
  </React.StrictMode>,
);
