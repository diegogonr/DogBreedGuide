
import { useEffect,useState } from 'react';
import {useDispatch, useSelector } from "react-redux";

import { getDogs, getTemperaments } from '../../redux/actions';
import { order_alfabeto, order_peso, filter_temperaments } from '../../redux/actions';

import './home.styles.css';
import Cards from '../../components/cards/cards.component'
import Navbar from '../../components/navbar/navbar.component';

function Home({onSearch}) {

  const dispatch = useDispatch()
  const allDogs= useSelector((state)=>state.allDogs)            //suscribir al cambio del estado global!
  const allTemperaments= useSelector((state)=>state.allTemperaments)          

  const [filteredDogs, setFilteredDogs]= useState([...allDogs]); 

  const handleOrderPeso = (event)=> {
    if (event.target.value !== "") {
      dispatch(order_peso(event.target.value))                                         //se ejecuta la "action", es decir despacho order_alfabeto
    }
    console.log(allTemperaments)
  }

  const handleOrderAlfabeto = (event) => {
    if (event.target.value !== "") {
      dispatch(order_alfabeto(event.target.value));
    }
  }
  const handleFilterTemperaments= (event) => {
    if (event.target.value !== "") {
      const filterDogs = allDogs.filter((dog) => {
        return dog?.temperaments?.includes(event.target.value);
      });
      setFilteredDogs(filterDogs)
    }  
  }

  const handleFilterChange = (event) => {
    const filterOption = event.target.value;
    setFilteredDogs( filterOption === "ALL"
    ? allDogs: allDogs.filter(dog => dog.source === filterOption))
  }

  useEffect(()=>{
    setFilteredDogs(allDogs)
  }, [allDogs]);

  useEffect(()=>{
    dispatch(getDogs())
    dispatch(getTemperaments())
  }, [dispatch]);

  return (
    <div>
      <div className='home'>
          <div className='container-card-filter'>
            <div>
              <select className="card-filter" onChange={handleOrderAlfabeto}>
                        <option value="" >--Selecciona Orden--</option>
                        <option value="A">Ascendente</option>
                        <option value="D">Descendente</option>
              </select>
            </div>
            <div>
              <select className="card-filter" onChange={handleOrderPeso}>
                        <option value="" >--Selecciona Orden Peso--</option>
                        <option value="N">Mayor peso</option>
                        <option value="M">Menor peso</option>
              </select>
            </div>
      
            <div>
              <select className="card-filter" onChange={handleFilterChange}>
                <option value="ALL">--Seleccionar Origen--</option>
                <option value="API">API</option>
                <option value="DB">DB</option>
              </select>
            </div>

            <div>
              <select className="card-filter" onChange={handleFilterTemperaments}>
              <option value="">--Seleccionar Temperamento--</option>
              {allTemperaments.map((temperamento, index) => (
                <option key={index} value={temperamento.nam}>
                  {temperamento.name}
                </option>
              ))}
              </select>
            </div>
        </div>
        <div className="nav-navbar">
            <Navbar className="navigate-button" onSearch={onSearch} />
        </div>

        <div className='container-cards'>
          <Cards allDogs= {filteredDogs}></Cards>
        </div>
      </div>
    </div>
  );
}

export default Home;
