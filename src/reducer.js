export const initialState = {
  user: null,
  dataEntry: {},
  clientData: [],
};

// Claculate the amount of the xerox
export const calcAmount = ({ pages, copies, ro1, ro2 }) => {
  let amount =
    Math.floor(pages / 2) * 2 * ro2 * copies +
    (pages - Math.floor(pages / 2) * 2) * copies * ro1;
  return amount ? amount : 0;
};

const reducer = (state, action) => {
  console.log(action);
  switch (action.type) {
    case "SET_DATA_ENTRY":
      return {
        ...state,
        dataEntry: { ...state.dataEntry, ...action.dataEntry },
      };
    case "ADD_CLIENT_DATA":
      return {
        ...state,
        clientData: [...state.clientData, state.dataEntry],
      };

    default:
      return state;
  }
};

export default reducer;
