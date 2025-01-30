import './Child.css'

interface Product {
    id: number;
    title: string;
    image: string;
  }

const Child = ({id,title,image}:Product) => {
  return (
    <div className='child-container'>
      <div className="image-div">
      <img src={image}></img>
      </div>
      <p>{title}{' --> '}{id}</p>
    </div>
  )
}

export default Child
