
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
          <div className='title'>
             <h2>{name} </h2>
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

          <div className='text'>
            {Array.isArray(temperaments)? 
              <p>Los Temperamentos son: {temperaments.map(temp => temp.name).join(', ')} y el Peso tiene un rango de {weight}</p>
                          :
              <p>  Los Temperamentos son: {temperaments} y el Ppeso tiene un rango de {weight}</p>
            }
          </div>

         <Link to={`/detail/${id}`}>
            <button className='landing-button'>Más Info</button>
          </Link>
      </div>
    </div>
  );
}


export default Card;
