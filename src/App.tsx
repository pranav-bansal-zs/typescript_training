import { useState } from "react";
import useData from "./useData";
import Carousel from "./Carousel";
import { FaRegCircle } from "react-icons/fa";
import './App.css'

const App = () => {
  const api: string = "http://localhost:3000/images";
  const { data, error, isLoading } = useData({ api });
  const [ind, setInd] = useState<number>(0);
  const [animation,setAnimation]=useState<string>("");

  return (
    <div className="main-container">
      <div className="image-container">
        {isLoading && <h1>Is Loading</h1>}
        {!error && !isLoading && (
          <Carousel 
            src={data[ind]?.src}
            alt={data[ind]?.alt}
            id={data[ind]?.id}
            animation={animation}
          />
        )}
        <button className="button"
          onClick={() =>{
            setInd((prev: number) => (prev - 1 < 0 ? data.length-1 : prev - 1))
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
      <div className="dot">
  {data.map((_, index: number) => (
    <FaRegCircle key={index} className={ind === index ? "active" : ""} />
  ))}
</div>
    </div>
  );
};

export default App;
