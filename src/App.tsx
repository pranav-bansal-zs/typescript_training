import { useEffect, useState } from 'react'
import Child from './Child';
import './App.css'

interface Product {
  id: number;
  title: string;
  images: string[];
}

function App() { 
  const [clickedbutton, setClickedbutton] = useState<number>(1);
  const [data, setData] = useState<Product[]>([]);
  const [page, setPage] = useState<number>(1);

  useEffect(() => {
    const dataFetch = async () => {
      try {
        const res = await fetch('https://dummyjson.com/products?limit=300');
        const res1 = await res.json();
        setData(res1.products);
        setButtonarr(Array.from({ length:Math.ceil(res1.products.length/10) > 5 ? 5 : Math.ceil(res1.products.length/10)}, (value, index) => index + 1))
      } catch (err) {
        console.error("Error->", err);
      }
    };
    dataFetch();
  }, []);
  const pagedata = data.slice((page - 1) * 10, page * 10);
  const datalength=Math.ceil(data.length/10);
  const [buttonarr, setButtonarr] = useState<number[]>([]); 
  useEffect(()=>{
    
  },[datalength])
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
          setButtonarr(Array.from({length:datalength>5?5:datalength},(value,index)=>index+1));
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
          setPage(prev => prev==datalength? 0:prev + 1);
          setButtonarr(prev => (prev[prev.length - 1] === datalength ? prev : prev.map(value => value + 1)));
          setClickedbutton((prev)=>prev+1);
        }}>{'>'}</button>

        <button 
          disabled={page>datalength-1}
          onClick={() => {
          setPage(datalength);
          setClickedbutton(datalength);
          setButtonarr(Array.from({length:datalength<5?datalength:5},(value,index)=>datalength-index).reverse());
        }}>{'>>'}</button>
      </div>
    </div>
  );
}

export default App;
