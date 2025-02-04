import { useState, ChangeEvent } from 'react';
import './App.css';
import Carousel from './components/Carousel';

const App = () => {
  const [inp, setInp] = useState('');
  let timer: ReturnType<typeof setTimeout>;

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      setInp(e.target.value);
    }, 3000);
  };

  // Sample images for the carousel
  const images = [
    'https://picsum.photos/600/400?random=1',
    'https://picsum.photos/600/400?random=2',
    'https://picsum.photos/600/400?random=3',
    'https://picsum.photos/600/400?random=4',
  ];

  return (
    <div className="main-input-container">
      <h1 className='headin'>Input container</h1>
      <div className='input-container'>
        <input className='input-box' placeholder='Enter input here' onChange={handleInput} />
        <input className='input-box' placeholder='' value={inp} readOnly />
      </div>
      
      <div className="carousel-wrapper">
        <Carousel images={images} />
      </div>
    </div>
  );
};

export default App;
