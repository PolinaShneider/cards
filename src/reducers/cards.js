import notifier from 'codex-notifier';
import { v4 as uuidv4 } from 'uuid';
const initState = {
    cards: JSON.parse(localStorage.getItem("SEMrush-cards")) || [],
    modalIsOpen: false
};

const cardsReducer = (state = initState, {type, payload}) => {
    switch (type) {
        case 'ADD_CARD':
            const newItem = {
                ...payload.data,
                id: uuidv4()
            };
            const cards = [newItem, ...state.cards];
            try {
                localStorage.setItem("SEMrush-cards", JSON.stringify(cards));
            } catch (e) {
                notifier.show({
                    message: `Hey, there is too much data in localStorage. Clear it?`,
                    type: 'confirm',
                    okText: 'Yep',
                    cancelText: 'No, I\'ll take risks',
                    okHandler: () => {
                        localStorage.setItem("SEMrush-cards", JSON.stringify([]));
                        window.location.reload()
                    }
                });
            }
            return {
                ...state,
                cards
            };
        case 'DELETE_CARD':
            const toDelete = state.cards.findIndex(elem => elem.id === payload.id);
            const updatedCards = [...state.cards];
            if (toDelete !== -1) {
                updatedCards.splice(toDelete, 1)
            }
            try {
                localStorage.setItem("SEMrush-cards", JSON.stringify(updatedCards));
                window.location.reload()
            } catch (e) {
                notifier.show({
                    message: `Something went wrong. Cannot delete card with id ${payload.id}`,
                    type: 'error'
                });
            }
            return {
                ...state,
                cards: updatedCards
            };
        case 'OPEN_MODAL':
            return {
                ...state,
                modalIsOpen: true
            };
        case 'CLOSE_MODAL':
            return {
                ...state,
                modalIsOpen: false
            };
        default:
            return state;
    }
};

export default cardsReducer;
