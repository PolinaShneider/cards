import notifier from 'codex-notifier';

const initState = {
    cards: JSON.parse(localStorage.getItem("SEMrush-cards")) || [],
    modalIsOpen: false
};

const cardsReducer = (state = initState, {type, payload}) => {
    switch (type) {
        case 'ADD_CARD':
            const newItem = payload.data;
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
