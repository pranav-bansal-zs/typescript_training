import { useEffect, useState } from 'react'
import Child from './Child';
import './App.css'

interface Product {
  id: number;
  title: string;
  images: string[];
}

function App() {
  const [buttonarr, setButtonarr] = useState<number[]>([1, 2, 3, 4, 5]);
  const [clickedbutton, setClickedbutton] = useState<number>(1);
  const [data, setData] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const res1 = await res.json();
        setData(res1.products);
      } catch (err) {
        console.error("Error->", err);
      }
    };
    dataFetch();
  }, []);

  const pagedata = data.slice((page - 1) * 10, page * 10);
  const datalength=data.length/10;

  return (
    <div className="container">
      <div className='main-container'>
        {pagedata.map(({ id, title, images }) => (
          <Child key={id} id={id} title={title} image={images[0]} />
        ))}
      </div>
      <div className="buttons">
        <button 
          disabled={page<2}
          onClick={() => {
          setPage(1);
          setClickedbutton(1);
          setButtonarr([1,2,3,4,5]);
        }}>{'<<'}</button>
        <button 
          disabled={page<2}
        onClick={() => {
          setPage(prev => Math.max(1, prev - 1));
          setButtonarr(prev => (prev[0] === 1 ? prev : prev.map(value => value - 1)));
          setClickedbutton(prev=>prev-1);
        }}>{'<'}</button>

        {page >5 && (<p className='dot'>. .</p>)}

        {buttonarr.map((value, index) => (
          <button key={index} onClick={() => {
            setPage(value);
            setClickedbutton(value);
          }} className={clickedbutton === value ? 'filled' : ''}>
            {value}
          </button>
        ))}

        {page < datalength && (<p className='dot'>. .</p>)}

         <button 
         disabled={page>datalength-1}
         onClick={() => {
          setPage(prev => Math.min(datalength, prev + 1));
          setButtonarr(prev => (prev[prev.length - 1] === datalength ? prev : prev.map(value => value + 1)));
          setClickedbutton((prev)=>prev+1);
        }}>{'>'}</button>

        <button 
          disabled={page>datalength-1}
          onClick={() => {
          setPage(datalength);
          setClickedbutton(datalength);
          setButtonarr([datalength-4,datalength-3,datalength-2,datalength-1,datalength]);
        }}>{'>>'}</button>
      </div>
    </div>
  );
}

export default App;
