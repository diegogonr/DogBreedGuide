import { GET_DOGS, GET_TEMPERAMENTS, ORDER_PESO, ORDER_ALFABETICAMENTE,UPDATE_SEARCH, FILTER_TEMPERAMENTS } from "../actions";

const initialState={
    allDogs: [],
    allTemperaments: [],

}

const reducer=(state= initialState, action)=> {
    switch (action.type) {
        case GET_DOGS:
            return{
                ...state,
                allDogs: action.payload
            };
        case GET_TEMPERAMENTS:
            return{
                ...state,
                allTemperaments: action.payload
            };
        case ORDER_PESO:
            return{
                ...state,
                allDogs: action.payload
            };
        case ORDER_ALFABETICAMENTE:
            return{
                ...state,
                allDogs: action.payload
            };
        case UPDATE_SEARCH:
            return{
                ...state,
                allDogs: action.payload
            };

        default:
            return state
    }
}

export default reducer;