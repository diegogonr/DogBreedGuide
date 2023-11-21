import { Link } from 'react-router-dom';
import Navbar from '../navbar/navbar.component';
import { useLocation } from 'react-router-dom';
import './Navigate.styles.css'; 
import logoNegro from "../../Data/logoNegro.png"

const Navigate = () => {
  const location = useLocation();
  const isButtonActive = (path) => {
    return location.pathname === path;
  };

  return (
    <div className='navigate-container'>
      <div className='img-logo'>
          <Link to="/home" >
            <img src={logoNegro} alt="logo" />
          </Link>
          
      </div>
      {location.pathname !== '/' ? (
        <nav className="nav-container">
            <div className='button'>
              <button className="navigate-button ">
                <Link to="/home" className="navigate-link">HOME</Link>
              </button>
              <div className={`${isButtonActive('/home') && 'active'}`}>
              </div>
            </div>
            <div  className='button'>
              <button className="navigate-button">
                <Link to="/create" className="navigate-link">CREATE</Link>
              </button>
              <div className={`${isButtonActive('/create') && 'active'}`}>
              </div>
            </div>
            <div>
              <button className="navigate-button logout-button">
                <Link to="/" className="navigate-link">BACK</Link>
              </button>
              <div className={`${isButtonActive('/') && 'active'}`}>
              </div>
            </div>
           
        </nav>
      ) : null}
    </div>
  );
};



export default Navigate;
