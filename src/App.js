import logo from './logo.svg';
import './App.css';
import fetchData from './components/fetchData';
import SerchBar from './components/serschbar';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Weather from './components/weatherProdcast';
import { useState } from 'react';
import Prodcast from './components/fiveDaysProdcast';


function App() {
  const [cordination,setCordination] = useState([])
  const [prodcast,setProdcast] = useState ([])
  //console.log(cordination)
  return (
    <BrowserRouter>
      <Routes>
        <Route index
            element={<SerchBar
            setCity={setCordination}
            />}
        />
        <Route path='/weatherProdcas'
          element={<Weather
          city={cordination}
          Prodcast={setProdcast}
          />}
        >
        
        </Route>
        <Route path='/fiveDaysProdcast'
        element={<Prodcast
        prodcast={prodcast}
        city={cordination}
        />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
