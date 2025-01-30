import './Carousel.css'

interface image{
  src:string;
  alt:string;
  id:string;

}

const Carousel = ({src,alt,id}:image) => {
  return (
    <div className='child-container'>
      <img src={src} alt={alt} key={id}></img>
    </div>
  )
}

export default Carousel
