import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.css';
import './search.css'
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
                .catch ( err => console.error(err));
    }
    const navigate = useNavigate()
    function changeRoute(el){
        navigate('/weatherProdcas')
        props.setCity([el.city,el.latitude,el.longitude])
    }
    return(
        <div className="backround">
             <div className="container input-continer">
            <div className="form-group container search-continer">
                <input type="text" name="search" ref={input} placeholder="search city" className="form-control" />
                <button onClick={SerchCity} className="btn btn-primary">SEARCH</button>
            </div>
            <div className="container resault-container">
                {result !==undefined ? result.data.map((element)=>
                <div key={element.id} onClick={()=>changeRoute(element)} className=" p-3 my-3 border reasult">
                        <h2 className="">{element.city}</h2>
                        <h3>{element.country}</h3>
                </div>) : ""}
            </div>
        </div>
        </div>
       
    )
}