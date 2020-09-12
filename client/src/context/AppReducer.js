export default (state, action) => {
  switch (action.type) {
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [...state.contacts, action.payload],
      };
    case 'GET_CONTACTS': {
      return {
        ...state,
        contacts: action.payload,
      };
    }
    case 'ADD_CONTACT_FAIL':
    case 'GET_CURRENT_FAIL':
    case 'CONTACT_ERROR':
    case 'UPDATE_ERROR':
    case 'DELETE_ERROR': {
      return {
        ...state,
        error: action.payload,
      };
    }
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(contact =>
          contact._id === action.payload._id ? action.payload : contact
        ),
      };
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact._id !== action.payload
        ),
      };
    case 'GET_CURRENT':
      return {
        ...state,
        current: action.payload,
      };
    case 'CLEAR_CURRENT':
      return {
        ...state,
        current: null,
      };
    case 'CLEAR_ALL':
      return {
        ...state,
        contacts: null,
        filtered: null,
        error: null,
        current: null,
      };
    case 'FILTER_CONTACTS':
      return {
        ...state,
        filtered: state.contacts.filter(contact => {
          const regex = new RegExp(`${action.payload}`, 'gi');
          return contact.name.match(regex) || contact.email.match(regex);
        }),
      };
    case 'CLEAR_FILTER':
      return {
        ...state,
        filtered: null,
      };
    case 'SET_ALERT':
      return {
        ...state,
        alerts: [...state.alerts, action.payload],
      };
    case 'REMOVE_ALERT':
      return {
        ...state,
        alerts: state.alerts.filter(alert => alert.id !== action.payload),
      };
    case 'USER_LOADED': {
      return {
        ...state,
        isAuthenticated: true,
        loading: false,
        user: action.payload,
      };
    }
    case 'REGISTER_SUCESS':
    case 'LOGIN_SUCESS': {
      localStorage.setItem('token', action.payload.token);
      return {
        ...state,
        ...action.payload,
        isAuthenticated: true,
        loading: false,
      };
    }
    case 'LOAD_FAIL':
    case 'REGISTER_FAIL':
    case 'LOGIN_FAIL': {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        error: action.payload,
      };
    }
    case 'LOGOUT': {
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
        user: null,
        contacts: [],
      };
    }
    case 'CLEAR_ERROR': {
      return {
        ...state,
        error: null,
      };
    }
    default:
      return state;
  }
};
