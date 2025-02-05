import React, { useState } from 'react'
import './App.css'
const App = () => {
  const [light,setLight]=useState<number>(0);
  const obj:number[]=[5000,3000,2000];
  setTimeout(() => {
    setLight(prev=>(prev+1)%3);
  }, obj[light]);
  return (
    <div className='traffic-container'>
<div className='traffic_light-container'>
      <div className={light==0?"red-light red-background":"red-light"} ></div>
      <div className={light==1?"yellow-light yellow-background":"yellow-light"} ></div>
      <div className={light==2?"green-light green-background":"green-light"} ></div>
    </div>
    <div className='small-container'>
    </div>
    </div>
  )
}

export default App



