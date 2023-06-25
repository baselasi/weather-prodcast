import logo from './logo.svg';
import './App.css';
import fetchData from './components/fetchData';
import SerchBar from './components/serschbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Weather from './components/weatherProdcast';
import { useState } from 'react';

function App() {
  const [cordination,setCordination] = useState([])
  //console.log(cordination)
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/'
            element={<SerchBar
            setCity={setCordination}
            />}
        />
        <Route path='/weatherProdcast'
          element={<Weather
          city={cordination}
          />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
