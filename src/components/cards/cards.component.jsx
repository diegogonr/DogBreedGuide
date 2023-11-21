import './cards.styles.css';
import Card from '../card/card.component';
import { useState, useEffect } from 'react';

function Cards({ allDogs }) {
  const dogsPerPage = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const [currentDogs, setCurrentDogs] = useState([]);

  const indexOfLastDog = currentPage * dogsPerPage;
  const indexOfFirstDog = indexOfLastDog - dogsPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePaginationButtons = () => {
    const totalPages = Math.ceil(allDogs?.length / dogsPerPage);
    const buttons = [];
    for (let i = 1; i <= totalPages; i++) {
      buttons.push(
        <button key={i} onClick={() => paginate(i)}>
          {i}
        </button>
      );
    }

    return buttons;
  };

  useEffect(() => {
    const newCurrentDogs = allDogs?.slice(indexOfFirstDog, indexOfLastDog);
    setCurrentDogs(newCurrentDogs);
  }, [allDogs, currentPage, indexOfFirstDog, indexOfLastDog]);

  return (
    <div className='card-list'>
      {
      currentDogs?.map((dog) => (
        <Card key={dog.id} dog={dog}></Card>
      ))}
      <div className='pagination'>{generatePaginationButtons()}</div>
    </div>
    
  );
}

export default Cards;
