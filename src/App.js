import './App.css';
import axios from 'axios';
import _, { isEmpty, set } from 'lodash';
import {useState} from "react";

function App(){
  const [weather,setWeather]=useState({});
  const [city,setCity]=useState("");
  
 
  async function search(e){
    if(e.code==="Enter"){
      const input=_.capitalize(e.target.value);
      await axios.get('https://api.openweathermap.org/data/2.5/weather',{params:{q:input,appid:"4ad5eeea1a5b31382a642d4760a566fb"}})
      .then(function (response) {
        console.log(response);
        setWeather(response.data);
        setCity("");
        
         
      })
      .catch(function (error) {
        console.log(error);
        setWeather({code:"404"});
        setCity("");
      
      })
      .then(function () {
        // always executed
      });
    }
    }
   

  return(
    <div className='container'>
    <input className='input' onKeyDown={search} value={city} onChange={(e)=>{setCity(e.target.value)}}  type="text" placeholder='Enter City' />
    {  typeof weather.main === "undefined" ?  ""  :
    <div className='weatherInfo'>
     <h1 className='city'>{weather.name} </h1>
    
     <p className='temp'>{ Math.round(weather.main.temp -273) } °C</p>
     <img className='img' src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
     
     <h1 className='cloud' >{ weather.weather[0].description }</h1>
    </div>
    
    }
    {
      weather.code ==="404" ? <div className='weatherInfo' style={{height:"100px"}}><h1 className='city'>City Not Found!</h1></div> : "" 
    }
    </div>
    
  )
}

export default App;
