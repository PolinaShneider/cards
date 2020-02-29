import notifier from 'codex-notifier';
import {v4 as uuidv4} from 'uuid';
import {deletionError, localStorageIsFull} from '../helpers/notifications';

const initState = {
    cards: JSON.parse(localStorage.getItem('SEMrush-cards')) || [],
    editedItem: null,
    modalIsOpen: false,
    editingMode: false
};

const cardsReducer = (state = initState, {type, payload}) => {
    switch (type) {
        case 'ADD_CARD': {
            const newItem = {
                ...payload.data,
                id: uuidv4()
            };
            const cards = [newItem, ...state.cards];
            try {
                localStorage.setItem('SEMrush-cards', JSON.stringify(cards));
            } catch (e) {
                localStorageIsFull();
            }
            return {
                ...state,
                cards
            };
        }
        case 'DELETE_CARD': {
            const toDelete = state.cards.findIndex(elem => elem.id === payload.id);
            const updatedCards = [...state.cards];
            if (toDelete !== -1) {
                updatedCards.splice(toDelete, 1)
            }
            try {
                localStorage.setItem('SEMrush-cards', JSON.stringify(updatedCards));
                window.location.reload()
            } catch (e) {
                deletionError(payload.id)
            }
            return {
                ...state,
                cards: updatedCards
            };
        }
        case 'OPEN_MODAL': {
            return {
                ...state,
                modalIsOpen: true
            };
        }
        case 'CLOSE_MODAL': {
            return {
                ...state,
                editedItem: null,
                modalIsOpen: false
            };
        }
        case 'EDIT_CARD': {
            return {
                ...state,
                editedItem: payload.data,
                modalIsOpen: true
            };
        }
        case 'CONFIRM_EDIT': {
            const editedItem = {
                ...payload.data
            };
            const editedIndex = state.cards.findIndex(elem => elem.id === payload.data.id);
            const updatedCards = [...state.cards];
            updatedCards[editedIndex] = editedItem;
            try {
                localStorage.setItem('SEMrush-cards', JSON.stringify(updatedCards));
            } catch (e) {
                localStorageIsFull()
            }
            return {
                ...state,
                cards: updatedCards,
                editedItem: null,
                modalIsOpen: false
            };
        }
        case 'TOGGLE_EDIT_MODE': {
            return {
                ...state,
                editingMode: !state.editingMode
            }
        }
        default:
            return state;
    }
};

export default cardsReducer;
