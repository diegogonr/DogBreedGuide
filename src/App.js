import {  Routes, Route, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { updateAllDogs, getDogs } from "./redux/actions";
import axios from 'axios';
import Landing from './views/lading/lading.component';
import Home from './views/home/home.component';
import Create from './views/create/create.component';
import Detail from './views/detail/detail.component';
import Navigate from './components/navigate/Navigate.component';

function App() {
  const dispatch = useDispatch();
  const location = useLocation()     //donde esta ubicado el usuarios

  const onSearch = async (name) => {
    try {
      if(name){
        const response = await axios.get(`http://localhost:3001/dogs/?name=${name}`);
        console.log(response);
        dispatch(updateAllDogs(response.data));
      }
      else  dispatch(getDogs()); ;
    } catch (error) {
      alert('¡No hay perro con ese nombre!');
    }
  }

  return (
      <div >
        {location.pathname !== '/' ? <Navigate/> : null}
        
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/home" element={<Home  onSearch={onSearch} />} />
          <Route path='/detail/:idRaza' element={<Detail />} />
          <Route path="/create" element={<Create />} />
        </Routes>
      </div>
  );
}

export default App;
