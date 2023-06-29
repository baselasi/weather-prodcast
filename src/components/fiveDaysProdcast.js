import React, { useEffect, useState } from "react";
export default function Prodcast(props){
    const [newDay,setNewDay] = useState()
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
                        `/imgs/${props.prodcast[j].weather[0].main}.jpg`,
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
   if(newDay !==undefined){
    return (
        <div style={{backgroundImage: `url(${newDay.icon})`}} className="h-100 d-flex flex-column align-content-center w-100 flex-wrap">
            <div className="d-flex w-50  align-content-center flex-wrap">
                <div className="weather w-100">
                    <h1>{props.city[0]}</h1>
                    <h2>{newDay.name}</h2>
                    <h2>{newDay.weather}</h2>
                </div>
                <div className="w-100 d-flex  justify-content-between flex-row">
                    <h4 className="w-25">max {newDay.highesttemp}&deg;</h4>
                    <h4 className="w-25 align-self-end">min {newDay.lowesttemp}&deg;</h4>
                    <h4>{/*newDay.prodcast*/}</h4>
                </div>
            </div>
            <div className="w-50 h-50 d-flex justify-content-between">
                {newDay.prodcast.map((hour)=><div className="hour d-flex flex-row justify-content-between ">
                        <div className="">
                            <span>{Math.trunc(hour.main.temp-273.5)}&deg;</span>
                            <img src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="icon" className="h-100" />
                        </div>
                        <span className="pt-2">{toHour(hour.dt_txt)}</span>
                    </div>) }
            </div>
            <div >
                { daysArr.map((el)=><div onClick={()=>changeDay(el)}>
                    <span>{el.name}</span>
                    < span>{el.weather}</span>
                </div>)}
            </div>
        </div>
        
    )
}
   }
    