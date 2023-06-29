import React from "react";

const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/cities?namePrefix=beirut';
const options = {
	method: 'GET',
	headers: {
		'X-RapidAPI-Key': '966d95ada9msh401c9a27710d5f2p161ad8jsn6f30632bc28e',
		'X-RapidAPI-Host': 'wft-geo-db.p.rapidapi.com'
	}
};

export default function fetchData(){
    fetch(url, options)
    .then(response => response.json())
	.then(response => console.log(response))
    .catch ( err => console.error(err));	
}

/*https://api.openweathermap.org/data/2.5/weather?lat={lat}&lon={lon}&appid=7c47bc055a3d35204ebb00585919b3a3*/
