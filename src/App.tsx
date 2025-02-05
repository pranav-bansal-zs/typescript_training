import { useState, ChangeEvent } from 'react';
import './App.css';


const App = () => {
  const [inp, setInp] = useState('');

  const handleInput = () => {
    let timer: ReturnType<typeof setTimeout>;
    return(e)=>{
      clearTimeout(timer);
      timer = setTimeout(() => {
        setInp(prev=>prev+e.target.value);
      }, 3000);}
  };

  return (
    <div className="main-input-container">
      <h1 className='headin'>Input container</h1>
      <div className='input-container'>
        <input className='input-box' placeholder='Enter input here' onChange={handleInput()} />
        <input className='input-box' placeholder='' value={inp} readOnly />
      </div>
    </div>
  );
};

export default App;
