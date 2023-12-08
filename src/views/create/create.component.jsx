
import { useEffect,useState } from 'react';
import {useDispatch, useSelector } from "react-redux";
import axios from "axios";

import {getTemperaments} from "../../redux/actions"
import './create.styles.css';

import SuccessDialog from '../../components/successDialog/successDialog.component';

function Create() {
  const dispatch = useDispatch()
  const allTemperaments= useSelector((state)=>state.allTemperaments) 

  useEffect(()=>{
    dispatch(getTemperaments())
  }, [dispatch]);
  
  const [selectedTemperaments, setSelectedTemperaments] = useState([]);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [success, setSuccess] = useState(true);

  const [form, setForm] = useState({
    name: "",
    minHeight: '',
    maxHeight: '',
    minweight: '',
    maxweight: '',
    age:"",
    temperament: [],
    img:""
})

const [errors, setErrors] = useState({
    name: "",
    minHeight: '',
    maxHeight: '',
    minweight: '',
    maxweight: '',
    age:"",
    temperament: "",
    img:""

})

const handleSelectChange = (event) => {
  const selectedOptions = Array.from(event.target.options)
    .filter((option) => option.selected)
    .map((option) => option.value);

  setSelectedTemperaments(selectedOptions);
  setForm({
    ...form,
    temperament: selectedOptions,
  });
};


const handleChange = event => { 
  setForm(prevForm=>({
    ...prevForm,
      [event.target.name]: event.target.value
  }))

  validate()

}

const validate = () =>{
  if(form.name.length<2) {
      setErrors(prevErrors=>({
          ...prevErrors,
          name: 'El nombre tiene que ser mayor a 2 caracteres'
      }))
  }

  else {
      setErrors({
          ...errors,
          name: ''
      })
  }
}

const createDogs = async (newDog) => {
    const endpoint = '/dogs';
    console.log(newDog)

    try {
        const response = await axios.post(endpoint, newDog)
        setSuccess(true)
        setDialogOpen(true);

    } catch (error) {
        setSuccess(false);
        setDialogOpen(true);
        console.log(error.message)
    }


};

const handleCloseDialog = () => {
  setDialogOpen(false);
};


const handleSubmit = event => {
  event.preventDefault()

  const { minHeight,maxHeight,minweight, maxweight, ...formNew} = form;

  const createDog = {
    ...formNew,
    height: `${form.minHeight} - ${form.maxHeight}`,
    weight: `${form.minweight} - ${form.maxweight}`,

  };

  setForm({
    name: "",
    minHeight: '',
    maxHeight: '',
    minweight: '',
    maxweight: '',
    age:"",
    temperament: "",
    img:""

})

  createDogs (createDog)
}


  return (
    <div className='container-create'>
      <div className='container-form'>
        <form onSubmit={handleSubmit}>
          <div className='container-label'>
            <label htmlFor="name">Nombre: </label>
            <input type="text" name="name" value={form.name} onChange={handleChange}/>
          </div>
          {errors.name && <p className="error-message">{errors.name}</p>}

          <div className='container-label'>
            <div>
              <label htmlFor="minHeight">Altura min: </label>
              <input type="text" name="minHeight" value={form.minHeight} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="maxHeight">Altura max: </label>
              <input type="text" name="maxHeight" value={form.maxHeight} onChange={handleChange}/>
            </div>
          </div>
          <div className='container-label'>
            <div>
              <label htmlFor="minweight">Peso min: </label>  
              <input type="text" name="minweight" value={form.minweight} onChange={handleChange}/>
            </div>
            <div>
              <label htmlFor="maxweight">Peso max: </label>  
              <input type="text" name="maxweight" value={form.maxweight} onChange={handleChange}/>
            </div>
          </div>
          <div className='container-label'>
            <label htmlFor="age">Años de vida: </label>
            <input type="text" name="age" value={form.age} onChange={handleChange}/>
          </div>
          <div className="select-container">
              <select name="temperament" value={selectedTemperaments} onChange={handleSelectChange}  multiple className="custom-select"> 
                <option value="">-- Selecciona temperamento(s) --</option>
                {allTemperaments?.map((temperament) => (
                  <option key={temperament.id} value={temperament.name}>
                    {temperament.name}
                  </option>
                ))}
              </select>
          </div>
          <div className='container-label'>
            <label htmlFor="img">Link IMG:</label>
            <input type="text" name="img" value={form.img} onChange={handleChange}/>
          </div>

          <button
            className={(form.name.length<2) ? 'disabled-button' : ''}
            
            type="submit"
          >
            CREATE
          </button>        
        </form>
      </div>
      <SuccessDialog success={success}  open={dialogOpen} onClose={handleCloseDialog} />

    </div>
  );
}

export default Create;
