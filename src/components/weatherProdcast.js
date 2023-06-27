import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Weather(props){
    const [weather,setWeather] = useState();
    const [prodcast, setProdcast] = useState([]);
    const [DayOne, setDayOne] = useState([])
    //const firstDayWeather = prodcast.list.slice(0,3)
   
   
    function toCelsius(temp){
        return  Math.trunc(temp-273.5)
    }
    //const url = `https://api.openweathermap.org/data/2.5/weather?lat=${props.city[1]}&lon=${props.city[2]}&appid=7c47bc055a3d35204ebb00585919b3a3`
    const ProdcastApi=`https://api.openweathermap.org/data/2.5/forecast?lat=${props.city[1]}&lon=${props.city[2]}&appid=7c47bc055a3d35204ebb00585919b3a3`
    useEffect( ()=>{
        /*function fetchCurrentWether(){
            fetch(url)
                .then(response => response.json())
                .then(response => console.log(response))
                .then(response =>console.log(response))
                .then(console.log(weather))
                .catch(err => console.error(err))
        }*/
        function fetchProdcast(){
            fetch(ProdcastApi)
                .then(response => response.json())
                .then(response => setProdcast(response))
                .catch(err => console.error(err))
        }
       //fetchCurrentWether()
        fetchProdcast()
    }
    ,[props.city])
    function toHour(string){
        return string.slice(10,16)
    }
    function findNextDay(array){
        const today=
        array.map()
    }
    const navigate = useNavigate()
    function changeRoute(){
        navigate('/weatherProdcas/fiveDaysProdcast')
        props.Prodcast(prodcast.list)
    }
    if(prodcast.list !==undefined){
        let firstDayWeather = prodcast.list.slice(0,8)
        console.log(firstDayWeather)
        console.log(prodcast.list)
        return(
            <div>
                <div>
                    <h1>{props.city[0]}</h1>
                    <div>
                        <h2>{toCelsius(firstDayWeather[0].main.temp)}</h2>
                        <h3>{firstDayWeather[0].weather[0].main}</h3>
                    </div>
                    <div>
                        <div><span></span><span>{firstDayWeather[0].main.humidity}</span></div>
                        <div><span></span><span>{firstDayWeather[0].wind.speed}</span></div>
                    </div>
                </div>
                <div>{firstDayWeather.map((el)=>{
                    return (
                    <div>
                        <span>{toCelsius(el.main.temp)}</span><span>img</span><span>{toHour(el.dt_txt)}</span>
                    </div>
                
                )}

                )}</div>
                <div><button onClick={changeRoute}>5 DAYS PRODACST</button></div>
            </div>
        )
    }
    else{

    }
}