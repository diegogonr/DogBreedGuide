import './lading.styles.css'; 
import {Link} from 'react-router-dom';
import logo from "../../Data/logo.png"

const Landing = () => {
  return (

      <div className='landing'>
        <div className='img-logo'>
          <img src={logo} alt="logo" />
        </div>
        <div className='landing-container'>
          <h2 className='landing-title'>The Top Dog Breed Guide</h2>
          <p className='landing-description'>Todo sobre las razas de perros en nuestro sitio. Información detallada y datos esenciales para elegir la compañía canina perfecta para ti.</p>
          <Link to={`/home`}>
            <button className='landing-button'>Explora Ahora</button>
          </Link>
        </div>
      </div>


  );
}

export default Landing;
