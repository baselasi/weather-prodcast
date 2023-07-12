import React, { useEffect, useState } from "react";
export default function Prodcast(props){
    const [newDay,setNewDay] = useState()
    const weekdays = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];      
    function cutString(str){   //use it to cut the first 10 caracter of the object's date string (the first 10 carcater contiene the date without hour)
        return str.slice(0,10)
    }
    function toHour(string){
        return string.slice(10,16)
    }
    function todate(str){ //transfer the string that contiene the day date to a DATE so i can compere it other dates
        return new Date(str)
    }
    function lowestTemp(arr,start,end){    //search for the lowest temperture of the day
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
    function highestTemp(arr,start,end){  //search for the highest temperture of the day
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
    function  averageHumidity(arr,start,end){  //calculate the averge humidity of the day
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
    class day {         //a class to create a object for each day that contiene the main informations
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
                    let prodcas =[]                        //array that contiene the drodcast of the next 5 days
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
        <div className="main flex-column align-content-center h-100" style={{backgroundImage: `url(${newDay.icon})`}} >
            <div className="container h-75 flex-column align-content-center " style={{backdropFilter:" blur(8px)"}}>
                <div className="row container h-25 fst-italic" >
                    <div className="col-12 row w-100 h-75">
                        <h1 className="col-12 h-25 text-center">{props.city[0]}</h1>
                        <h2 className="col-12 h-25 text-center">{newDay.name}</h2>
                        <div  className="col-12 h-50 text-center" ><img className="h-100"  src={`https://openweathermap.org/img/wn/${newDay.prodcast[0].weather[0].icon}@2x.png`} alt="icon"  /></div>
                    </div>
                    <div className=" row w-100" style={{marginRight:'-15px'}}>
                        <h4 className=" col-sm-6  text-center">max {newDay.highesttemp}&deg;</h4>
                        <h4 className="col-sm-6  mr-0 text-center">min {newDay.lowesttemp}&deg;</h4>
                    </div>
                </div>
                <div className="row h-50 w-90 " style={{backdropFilter:" blur(8px)"}}>
                    {newDay.prodcast.map((hour)=><div className="col-12 row hour ">
                            <div className="pt-2 col-2 h-100  row">
                                <span className="col-6">{Math.trunc(hour.main.temp-273.5)}&deg;</span>
                                <div className="col-6 h-100"><img  src={`https://openweathermap.org/img/wn/${hour.weather[0].icon}@2x.png`} alt="icon" className="h-100"/></div>
                            </div>
                            <span className="pt-2 col-10 text-end">{toHour(hour.dt_txt)}</span>
                        </div>) }
                </div>
                <div >
                    { daysArr.map((el)=><div onClick={()=>changeDay(el)}>
                        <span>{el.name}</span>
                        < span>{el.weather}</span>
                    </div>)}
                </div>
            </div>
        </div>
    )
    }
}
    