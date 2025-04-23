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
        const res = await fetch('https://dummyjson.com/products?limit=100');
        const res1 = await res.json();
        setData(res1.products);
        setButtonarr(Array.from({ length:Math.ceil(res1.products.length/10) > 5 ? 5 : Math.ceil(res1.products.length/10)}, (value, index) => index + 1))
      } catch (err) {
        console.error("Error->", err);
      }
    };
    dataFetch();
  }, []);
  const pagedata = data.slice((page - 1) * 12, page * 12);
  const datalength=Math.ceil(data.length/12);
  const [buttonarr, setButtonarr] = useState<number[]>([]); 
  return (
    <div className="container">
      <div className='main-container'>
        {pagedata.map(({ id, title, images }) => (
          <Child key={id} id={id} title={title} image={images[0]} />
        ))}
      </div>
      <div className="buttons">
        <button 
          onClick={() => {
          setPage((prev=>prev==1?datalength:1));
          setClickedbutton((prev=>prev==1?datalength:1));
          setButtonarr(()=>{
            if(page===1){
              return Array.from({ length: datalength < 5 ? datalength : 5 }, (_, index) => datalength - index).reverse();
            }else{
            return Array.from({length:datalength>5?5:datalength},(value,index)=>index+1)}});
        }}>{'<<'}</button>
        <button 
        onClick={() => {
          setPage((prev => prev-1<1?datalength:prev-1));
          setButtonarr((prev) => {
            if (page === 1) {
              return Array.from({ length: datalength < 5 ? datalength : 5 }, (_, index) => datalength - index).reverse();
            } 
            else {
              return prev[0] === 1 ? prev : prev.map(value => value - 1)}});
          setClickedbutton((prev => prev-1<1?datalength:prev-1));
        }}>{'<'}</button>


        {buttonarr.map((value, index) => (
          <button key={index} onClick={() => {
            if(value==buttonarr[buttonarr.length-1]){
              setButtonarr(prev=>prev[prev.length - 1] === datalength ? prev : prev.map(value => value + 1))
            }else if(value==buttonarr[0]){
              setButtonarr(prev => (prev[0] === 1 ? prev : prev.map(value => value - 1)));
            }
            setPage(value);
            setClickedbutton(value);
          }} className={clickedbutton === value ? 'filled' : ''}>
            {value}
          </button>
        ))}


         <button 
         onClick={() => {
          setPage(prev => prev==datalength? 1:prev+ 1);
          setButtonarr((prev) => {
            if (page === datalength) {
              return Array.from({length:datalength>5?5:datalength},(value,index)=>index+1);
            } 
            else {
              return prev[prev.length - 1] === datalength ? prev : prev.map(value => value + 1)}});
            
          setClickedbutton(prev => prev==datalength? 1:prev+ 1);
        }}>{'>'}</button>

        <button 
          onClick={() => {
          setPage(page==datalength?1:datalength);
          setClickedbutton(page==datalength?1:datalength);
          setButtonarr(() => {
            if (page === datalength) {
              return Array.from({length:datalength>5?5:datalength},(value,index)=>index+1);
            } else {
              return Array.from({ length: datalength < 5 ? datalength : 5 }, (_, index) => datalength - index).reverse();
            }
          });
          
        }}>{'>>'}</button>
      </div>
    </div>
  );
}

export default App;
