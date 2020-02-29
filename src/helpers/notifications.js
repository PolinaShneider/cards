import notifier from 'codex-notifier';

export const localStorageIsFull = () => {
    notifier.show({
        message: 'Hey, there is too much data in localStorage. Clear it?',
        type: 'confirm',
        okText: 'Yep',
        cancelText: 'No, I\'ll take risks',
        okHandler: () => {
            localStorage.setItem('SEMrush-cards', JSON.stringify([]));
            window.location.reload()
        }
    });
};

export const deletionError = (id) => {
    notifier.show({
        message: `Something went wrong. Cannot delete card with id ${id}`,
        type: 'error'
    });
};

export const unsupportedFileType = () => {
    notifier.show({
        style: 'info',
        message: 'Only image files are acceptable'
    });
};
