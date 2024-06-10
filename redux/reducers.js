import { ADD_TODO, TOGGLE_TODO, REMOVE_TODO, UPDATE_TODO } from './actions';

const initialState = [];

export const todosReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TODO:
            return [
                ...state,
                { id: Date.now(), text: action.payload.text, completed: false },
            ];
        case TOGGLE_TODO:
            return state.map((todo) =>
                todo.id === action.payload.id
                    ? { ...todo, completed: !todo.completed }
                    : todo
            );
        case REMOVE_TODO:
            return state.filter((todo) => todo.id !== action.payload.id);
        case UPDATE_TODO:
            return state.map((todo) =>
                todo.id === action.payload.id ? { ...todo, text: action.payload.text } : todo
            );
        default:
            return state;
    }
};
