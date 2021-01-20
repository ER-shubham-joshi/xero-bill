export const initialState = {
  user: null,
  dataEntry: {},
  clientData: [],
};

// Claculate the amount of the xerox
export const calcAmount = ({ pages, copies, ro1 = 0.7, ro2 = 0.6 }) => {
  let amount =
    Math.floor(pages / 2) * 2 * ro2 * copies +
    (pages - Math.floor(pages / 2) * 2) * copies * ro1;
  amount = parseFloat(parseFloat(amount)?.toFixed(2));
  return amount ? amount : 0;
};

// Claculate the total amount
export const calcTotalAmount = (clientData) => {
  let totalAmount = clientData.reduce((acc, curr) => acc + calcAmount(curr), 0);
  totalAmount = parseFloat(parseFloat(totalAmount)?.toFixed(2));
  return totalAmount ? totalAmount : 0;
};

const reducer = (state, action) => {
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
