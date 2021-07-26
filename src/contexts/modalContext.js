import React, { createContext, useState } from 'react';

export const ModalContext = createContext();

export const ModalContextProvider = props => {
    const [showModal, setshowModal] = useState(false);
    const [modalTitle, setsmodalTitle] = useState('');

    return (
        <ModalContext.Provider
            value={
                {showModal,
                modalTitle,
                setshowModal,
                setsmodalTitle}
            }
        >
            {props.children}
        </ModalContext.Provider>
    );
};
