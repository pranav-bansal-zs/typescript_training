import './Carousel.css'
import { useState } from 'react';
interface image{
  src:string;
  alt:string;
  id:string;
  setInd: (value: number | ((prev: number) => number)) => void;
  length:number;
}

const Carousel = ({src,alt,id,setInd,length}:image) => {
  const [animation,setAnimation]=useState<string>("")
  return (
    <div className='child-container'>
      <img src={src} alt={alt} key={id} className={`images ${animation}`}></img>
    <div className="button-and-dot">
      <button className="button"
          onClick={() =>{
            setInd((prev: number) => (prev - 1 < 0 ? length-1 : prev - 1))
            setAnimation("SlideOut");
          }
          }
        >
          {"<"}
        </button>
        <button className="button"
          onClick={() =>{
            setInd((prev: number) => (prev + 1 >5 ? 0 : prev + 1))
            setAnimation("SlideIn")
          }
          }
        >
          {">"}
        </button>
      </div>
    </div>
  )
}

export default Carousel
