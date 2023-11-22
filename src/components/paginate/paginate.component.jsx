import { useState, useEffect } from 'react';
import './paginate.styles.css'
const Paginate = ({ allDogs, setCurrentDogs }) => {
  const dogsPorPage = 9;
  const [currentPage, setCurrentPage] = useState(1);

  const indexOfLastDog = currentPage * dogsPorPage;
  const indexOfFirstDog = indexOfLastDog - dogsPorPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const generatePaginationButtons = () => {
    const totalPages = Math.ceil(allDogs?.length / dogsPorPage);            //20
    const buttons = [];

    const maxButtons = 3;
    let startPage = currentPage>2 ? currentPage-1 : 1
    let endPage = currentPage< totalPages-1 ? startPage+2 : totalPages

    if (totalPages > maxButtons) {
      if (currentPage <= Math.floor(maxButtons / 2) + 1) {
        endPage = maxButtons;
      } else if (currentPage >= totalPages - Math.floor(maxButtons / 2)) {
        startPage = totalPages - maxButtons + 1;
      }
    }

    for (let i = startPage; i <= endPage; i++) {
      buttons.push(
        <button
          key={i}
          onClick={() => paginate(i)}
          className={i === currentPage ? 'active' : ''}
        >
          {i}
        </button>
      );
    }

    return (
      <>
        {currentPage > 2 && (
          <>
            <button onClick={() => paginate(1)}>«</button>
          </>
        )}

        {buttons}
        
        {currentPage < 19 && (
          <>
            <button onClick={() => paginate(totalPages)}>»</button>
          </>
        )}
      </>
    );
  };

  useEffect(() => {
    const newCurrentDogs = allDogs?.slice(indexOfFirstDog, indexOfLastDog);
    setCurrentDogs(newCurrentDogs);
  }, [allDogs, currentPage, indexOfFirstDog, indexOfLastDog]);

  return (
    <div className='pagination'>
      {generatePaginationButtons()}
    </div>
  );
};

export default Paginate;
