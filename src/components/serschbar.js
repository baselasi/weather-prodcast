import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '966d95ada9msh401c9a27710d5f2p161ad8jsn6f30632bc28e',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};
export default function SerchBar(props){
    const [result,setResult] = useState()
    const input = useRef()
    function SerchCity(e){
            e=input.current.value
            fetch(`${url}?namePrefix=${e}`, options)
                .then(response => response.json())
                .then(response => setResult(response))
                .then(console.log(result))
                .catch ( err => console.error(err));
                
    }
    const navigate = useNavigate()
    function changeRoute(el){
        console.log(result)
        navigate('/weatherProdcast')
        props.setCity([el.city,el.latitude,el.longitude])
    }
    return(
        <div>
            <div>
                <input type="text" name="serch" ref={input} placeholder="serch city" />
                <button onClick={SerchCity}>SERCH</button>
            </div>
            <div>
                {result !==undefined ? result.data.map((element)=><div onClick={()=>changeRoute(element)}><h2>{element.city}</h2><h3>{element.country}</h3><h4>{element.region}</h4></div>) : ""}
            </div>
        </div>
        
    )
}