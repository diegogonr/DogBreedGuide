

import axios from "axios";

export const GET_DOGS ="GET_DOGS";
export const GET_TEMPERAMENTS ="GET_TEMPERAMENTS";
export const ORDER_PESO ="ORDER_PESO";
export const ORDER_ALFABETICAMENTE ="ORDER_ALFABETICAMENTE";
export const UPDATE_SEARCH ="UPDATE_SEARCH";
export const FILTER_TEMPERAMENTS ="FILTER_TEMPERAMENTS";

export const getDogs = () => {
    return async (dispatch) => {
        try {
            const response = await axios('/dogs');
            console.log(response)
            return dispatch({
                type: GET_DOGS,
                payload: response.data,
            });
        } catch (error) {
            console.log(error.message)
        }

    };
 };

 export const getTemperaments = () => {
    return async (dispatch) => {
        try {
            const response = await axios('/temperaments');
            console.log(response)

            return dispatch({
                type: GET_TEMPERAMENTS,
                payload: response.data,
            });
        } catch (error) {
            console.log(error.message)
        }

    };
 };

// export const getTemperaments = () => {
//   return async (dispatch) => {
//     try {
//       const response = await fetch('/temperaments');

//       if (!response.ok) {
//         throw new Error('Erro');
//       }

//       const data = await response.json();

//       if (data) {
//         console.log(data);
//         dispatch({
//           type: GET_TEMPERAMENTS,
//           payload: data,
//         });
//       } else {
//         throw new Error('Erro ao carregar temperamentos');
//       }
//     } catch (error) {
//       console.error('Erro:', error.message);
//     }
//   };
// };

 export const order_alfabeto = (order) => {
    return async (dispatch, getState) => {
      try {
        const { allDogs } = getState();
        let sortedDogs;
  
        if (order === 'A') {
          sortedDogs = [...allDogs].sort((a, b) => a.name.localeCompare(b.name));
        } else {
          sortedDogs = [...allDogs].sort((a, b) => b.name.localeCompare(a.name));
        }
  
        return dispatch({
          type: ORDER_ALFABETICAMENTE,
          payload: sortedDogs,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };
  
  export const filter_temperaments = (temperament) => {
    return async (dispatch, getState) => {
      try {
        const { allDogs } = getState();
        console.log(temperament)
        const sortedDogs = allDogs.filter((dog) => {

          return dog?.temperaments?.includes(temperament);
        });
  
        return dispatch({
          type: FILTER_TEMPERAMENTS,
          payload: sortedDogs,
        });
      } catch (error) {
        console.log(error.message);
      }
    };
  };

export const order_peso = (order) => {
  return async (dispatch, getState) => {
    try {
      const { allDogs } = getState();
      let sortedDogs;

      if (order === 'M') {
        sortedDogs = [...allDogs].sort((a, b) => {
          const weightA = getAverageWeight(a.weight);
          const weightB = getAverageWeight(b.weight);
          return weightA - weightB;
        });
      } else {
        sortedDogs = [...allDogs].sort((a, b) => {
          const weightA = getAverageWeight(a.weight);
          const weightB = getAverageWeight(b.weight);
          return weightB - weightA;
        });
      }

      return dispatch({
        type: ORDER_PESO,
        payload: sortedDogs,
      });
    } catch (error) {
      console.log(error.message);
    }
  };
};
  
  const getAverageWeight = (weight) => {
    const [min, max] = weight.split(' - ').map(Number);
    return (min + max) / 2;
  };
  

  export const updateAllDogs = (newDogs) => ({
    type: 'UPDATE_SEARCH',
    payload: newDogs,
  });