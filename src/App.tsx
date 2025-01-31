import { useState } from "react";
import useData from "./useData";
import Carousel from "./Carousel";
import './App.css'
import { FaRegCircle } from "react-icons/fa";

const App = () => {
  const api: string = "http://localhost:3000/images";
  const { data, error, isLoading } = useData({ api });
  const [ind, setInd] = useState<number>(0);;

  return (
    <div className="main-container">
      <div className="image-container">
        {isLoading && <h1>Is Loading</h1>}
        {!error && !isLoading && (
          <Carousel 
          src={data[ind]?.src}
          alt={data[ind]?.alt}
           id={data[ind]?.id}
            setInd={setInd}
            length={data.length}
          />
        )}
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
