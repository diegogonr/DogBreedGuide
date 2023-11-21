
import './card.styles.css';
import {Link} from "react-router-dom"

function Card({dog}) {
  const {img, name, temperaments, weight, id } = dog

  const handleImageError = (event) => {
    event.target.src = 'https://img.freepik.com/vector-gratis/lindo-perro-sacando-lengua-ilustracion-icono-dibujos-animados_138676-2709.jpg?w=360&t=st=1700002951~exp=1700003551~hmac=b3538fd1a817a68e10462c83c449911a9a03f9722bafeb969927fb4f5c25e738'; 
    event.target.alt = 'Imagen no disponible';
  };

  return (
    <div className='container'>

      <div  className='card-container'>
          <div className='text'>
            <h2>{name} </h2>
            {Array.isArray(temperaments)? 
              <p>Temperamentos: {temperaments.map(temp => temp.name).join(', ')}</p>
                          :
              <p>  Temperamentos: {temperaments}</p>
            }
            <p>  Peso:{weight}</p>
          </div>

          <div className='card-img'>
            {img && (
              <img
                src={img}
                alt="imagen no disponible"
                onError={handleImageError}
              />
            )}
          </div>
         <Link to={`/detail/${id}`}>
            <button className='landing-button'>Más Info</button>
          </Link>
      </div>
    </div>
  );
}


export default Card;
