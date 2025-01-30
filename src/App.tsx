import { useState } from "react";
import useData from "./useData";
import Carousel from "./Carousel";
import { FaRegCircle } from "react-icons/fa";
import './App.css'

const App = () => {
  const api: string = "http://localhost:3000/images";
  const { data, error, isLoading } = useData({ api });
  const [ind, setInd] = useState(0);

  return (
    <div className="main-container">
      <div className="image-container">
        {isLoading && <h1>Is Loading</h1>}
        {!error && !isLoading && (
          <Carousel
            src={data[ind]?.src}
            alt={data[ind]?.alt}
            id={data[ind]?.id}
          />
        )}
        <button className="button"
          onClick={() =>
            setInd((prev: number) => (prev - 1 < 0 ? data.length-1 : prev - 1))
          }
        >
          {"<"}
        </button>
        <button className="button"
          onClick={() =>
            setInd((prev: number) => (prev + 1 >5 ? 0 : prev + 1))
          }
        >
          {">"}
        </button>
      </div>
      <div className="dot">
  {data.map((_: any, index: number) => (
    <FaRegCircle key={index} className={ind === index ? "active" : ""} />
  ))}
</div>
    </div>
  );
};

export default App;
