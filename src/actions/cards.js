export const addCardAction = (data) => {
    return {
        type: 'ADD_CARD',
        payload: {
            data
        }
    }
};

export const openModalAction = () => {
    return {
        type: 'OPEN_MODAL'
    }
};

export const closeModalAction = () => {
    return {
        type: 'CLOSE_MODAL'
    }
};

export const deleteCardAction = (id) => {
    return {
        type: 'DELETE_CARD',
        payload: {
            id
        }
    }
}
