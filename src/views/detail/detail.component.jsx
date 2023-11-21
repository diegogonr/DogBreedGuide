import './detail.styles.css';
import { useState , useEffect} from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

function Detail() {
  const {idRaza} =useParams();                                            
  const [dog, setDog] = useState();
  const handleImageError = (event) => {
    event.target.src = 'https://img.freepik.com/vector-gratis/lindo-perro-sacando-lengua-ilustracion-icono-dibujos-animados_138676-2709.jpg?w=360&t=st=1700002951~exp=1700003551~hmac=b3538fd1a817a68e10462c83c449911a9a03f9722bafeb969927fb4f5c25e738'; 
    event.target.alt = 'Imagen no disponible';
  };
  useEffect(()=>{
    axios(`/dogs/${idRaza}`).then(({ data }) => {   
    if (data.length>0) {
      setDog(data[0]);                                   
      } else {
          alert('No existe Dog con ese nombre');
      }
    });

  }, [idRaza]);

  return (
    <div className="card_detail">
      {
        dog?
        
              <>

                <div className='container-detail'>
                  <div className="container-detail-text">
                      <h2>{dog.name} - {dog.id}</h2>
                      <p>
                        Los años de vida de la raza son {dog.age? dog.age : null} 
                        y tiene una altura de {dog.height? dog.height: null}. Además, su peso es
                         {dog.weight? dog.weight :null } y sus temperamentos incluyen  {dog?.temperaments?.length>0 ? dog.temperaments.map(temp => temp.name).join(', ') : null  }.
                      </p>
                      <button className='detail-button'>Learn more</button>
                  </div>
                  
                  <div className='container-img'>
                      <img src={dog.img} alt={dog.img}   onError={handleImageError} />

                  </div>
                </div>
              </> 
          :null    

        }
        
    </div>
  );
}

export default Detail;
