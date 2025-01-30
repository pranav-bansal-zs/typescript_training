import './Carousel.css'

interface image{
  src:string;
  alt:string;
  id:string;
  animation:string;
}

const Carousel = ({src,alt,id,animation}:image) => {
  return (
    <div className='child-container'>
      <img src={src} alt={alt} key={id} className={`images ${animation}`}></img>
    </div>
  )
}

export default Carousel
