import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './weatherProdcast.css'
export default function Weather(props){
    const [prodcast, setProdcast] = useState([]);
    function toCelsius(temp){               //transfer temperture to celcius
        return  Math.trunc(temp-273.5)
    }
    const ProdcastApi=`https://api.openweathermap.org/data/2.5/forecast?lat=${props.city[1]}&lon=${props.city[2]}&appid=7c47bc055a3d35204ebb00585919b3a3`
    useEffect(()=>{                       //fetch data evry time i cahnge the city 
        function fetchProdcast(){
            fetch(ProdcastApi)
                .then(response => response.json())
                .then(response => setProdcast(response))
                .catch(err => console.error(err))
        }
        fetchProdcast()
    },[props.city])
    function toHour(string){          
        return string.slice(10,16)
    }
    const navigate = useNavigate()
    function changeRoute(){
        navigate('/fiveDaysProdcast')
        props.Prodcast(prodcast.list)
    }
    if(prodcast.list !==undefined){    
        let firstDayWeather = prodcast.list.slice(0,8)   //create an array with the next 24 hour prodacast (each array item contien 3 hour prodacast)
        console.log(firstDayWeather)
        console.log(prodcast.list)
        console.log(firstDayWeather[0].weather[0].description)
        return(
            <main style={{backgroundImage: ` url(/imgs/${firstDayWeather[0].weather[0].main}.jpg)`}} className="main">
                <div className="prodcast container-sm">
                    <div className=" weather">
                        <h1>{ props.city[0].toUpperCase()}</h1>
                        <div className="container-fluid">
                            <h2>{toCelsius(firstDayWeather[0].main.temp)}&deg;</h2>
                            <h3>{firstDayWeather[0].weather[0].main}</h3>
                        </div>
                        <div className="d-flex justify-content-between " style={{width : "20%"}}>
                            <div><span></span><span>{firstDayWeather[0].main.humidity}</span></div>
                            <div><span></span><span>{firstDayWeather[0].wind.speed}</span></div>
                    </div>
                    </div>
                    
                    <div className="d-flex flex-column justify-content-between w-50 h-50 ">{firstDayWeather.map((el)=>{
                        return (
                        <div className="hour d-flex flex-row justify-content-between  pr-4">
                            <span>{toCelsius(el.main.temp)}&deg;<img src={`https://openweathermap.org/img/wn/${el.weather[0].icon}@2x.png`} alt="Logo" className="h-100 "/> </span><span>{toHour(el.dt_txt)}</span>
                        </div>
                    )}
                    )}</div>
                    <div><button onClick={changeRoute} className="btn">5 DAYS PRODACST</button></div>
                </div>
            </main>
        )
    }
}