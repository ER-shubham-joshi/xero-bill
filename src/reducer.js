export const initialState = {
  user: null,
  dataEntry: {},
  clientName: null,
  clientData: [],
  clients: [],
  sortBy: "",
  clientToBeDeleted: "",
};

// Calculate the amount of the xerox
export const calcAmount = ({ pages, copies, ro1, ro2 }) => {
  let amount =
    Math.floor(pages / 2) * 2 * ro2 * copies +
    (pages - Math.floor(pages / 2) * 2) * copies * ro1;
  amount = parseFloat(parseFloat(amount)?.toFixed(2));
  return amount ? amount : 0;
};

// Calculate the total amount
export const calcTotalAmount = (clientData) => {
  let totalAmount = clientData?.reduce(
    (acc, curr) => acc + calcAmount(curr),
    0
  );
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
    case "SET_CLIENT_DATA":
      return {
        ...state,
        clientData: action.clientData ? action.clientData : [],
      };
    case "DELETE_CLIENT_DATA":
      return {
        ...state,
        clientData: [],
      };

    case "DELETE_DATA_ENTRY":
      state.clientData = state.clientData.filter((e) => {
        if (action.id !== e.id) {
          return true;
        }
      });
      return { ...state };

    case "SET_CLIENT_NAME":
      return {
        ...state,
        clientName: action.client,
      };

    case "SET_CLIENTS":
      return {
        ...state,
        clients: action.clients ? action.clients : [],
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    case "SET_SORT":
      return {
        ...state,
        sortBy: action.sortBy,
      };

    case "SET_CLIENT_TO_BE_DELETED":
      return {
        ...state,
        clientToBeDeleted: action.client,
      };
    default:
      return state;
  }
};

export default reducer;
