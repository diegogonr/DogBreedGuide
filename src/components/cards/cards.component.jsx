import './cards.styles.css';
import Card from '../card/card.component';
import { useState, useEffect } from 'react';
import Paginate from '../../components/paginate/paginate.component'

function Cards({ allDogs }) {
  const [currentDogs, setCurrentDogs] = useState([]);

  return (
    <div>
      <div  className='card-list'>
        {
        currentDogs?.map((dog) => (
          <Card key={dog.id} dog={dog}></Card>
        ))}
      </div>
      <Paginate allDogs={allDogs} setCurrentDogs = {setCurrentDogs}></Paginate>

    </div>
    
  );
}

export default Cards;
