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
};

export const editCardAction = (data) => {
    return {
        type: 'EDIT_CARD',
        payload: {
            data
        }
    }
};

export const confirmEditAction = (data) => {
    return {
        type: 'CONFIRM_EDIT',
        payload: {
            data
        }
    }
};

export const toggleEditModeAction = () => {
    return {
        type: 'TOGGLE_EDIT_MODE',
    }
};
