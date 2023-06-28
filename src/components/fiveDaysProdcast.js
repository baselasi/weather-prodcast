import React, { useEffect, useState } from "react";
export default function Prodcast(props){
    const [newDay,setNewDay] = useState([])
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
    function cutString(str){
        return str.slice(0,10)
        
    }
    function toHour(string){
        return string.slice(10,16)
    }
    function todate(str){
        return new Date(str)
    }
    
    function lowestTemp(arr,start,end){
        let lowtemp=arr[start].main.temp
        for(let i=start; i<end;i++){
            if(i<arr.length){
                if(lowtemp>arr[i].main.temp ){
                    lowtemp=arr[i].main.temp
                }
            }
        }
        return  Math.trunc(lowtemp-273.5)
    }
    function highestTemp(arr,start,end){
        let hightemp=arr[start].main.temp
        for(let i=start; i<end;i++){
            if(i<arr.length){
                if(hightemp<arr[i].main.temp ){
                    hightemp=arr[i].main.temp
                }
            }
        }
        return  Math.trunc(hightemp-273.5)
    }
    function  averageHumidity(arr,start,end){
        let average=0
        let j=0
        for(let i=start; i<end;i++){
            if(i<arr.length){
                average= (average + arr[i].main.humidity)
                j++
            }
        }
        return Math.trunc((average/j))
    }
    class day {
        constructor (name,highesttemp,lowesttemp,humidity,url,weather,prodcast){
            this.name = name;
            this.highesttemp = highesttemp;
            this.lowesttemp = lowesttemp;
            this.humidity = humidity
            this.icon = url
            this.weather= weather
            this.prodcast= prodcast
        }
    }
    let daysArr=[]
    if(props.prodcast.length!==0){
        for (let i=0 ; i<40;){
            for (let j=i; j<40;j++){
                if( todate(cutString(props.prodcast[i].dt_txt)) < todate(cutString(props.prodcast[j].dt_txt))){
                    let prodcas =[]
                    for(let i=j ; i<j+8 ; i++){
                        prodcas.push(props.prodcast[i])
                    }
                    let lowtemp=lowestTemp(props.prodcast,j,j+8)
                    let hightemp=highestTemp(props.prodcast,j,j+8)
                    let humidity=averageHumidity(props.prodcast,j,j+8)
                    let weekday = new day(
                        weekdays[(todate(cutString(props.prodcast[j].dt_txt)).getDay())],
                        hightemp,
                        lowtemp,
                        humidity,
                        `https://openweathermap.org/img/wn/${props.prodcast[j].weather[0].icon}@2x.png`,
                        props.prodcast[j].weather[0].main,
                        prodcas
                        ) ;
                    daysArr.push(weekday)
                    i=j
                }
            }
            i++
        }
    }
    useEffect((()=>{
        setNewDay(daysArr[0])
        console.log(newDay)
    }
    ),[])
    function changeDay(obj){
        setNewDay(obj)
    }
   console.log(daysArr)
    return (
        <div>
            <div>
                <div>
                    <h1>{props.city[0]}</h1>
                    <h2>{newDay.name}</h2>
                    <h2>{newDay.weather}</h2>
                </div>
                <div>
                    <h4>{newDay.highesttemp}</h4>
                    <h4>{newDay.lowesttemp}</h4>
                    <h4>{newDay.humidity}</h4>
                </div>
            </div>
            <div>
                {newDay.prodcast.map((hour)=><div>
                    <h3>{toHour(hour.dt_txt)}</h3>
                    <h4>{hour.weather[0].main}</h4>
                    <h4>{Math.trunc(hour.main.temp-273.5)}</h4>
                </div>)}
            </div>
            <div >
                {daysArr.map((el)=><div onClick={()=>changeDay(el)}>
                    <span>{el.name}</span>
                    < span>{el.weather}</span>
                </div>)}
            </div>
        </div>
        
    )
}