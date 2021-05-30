import React from 'react';

import { BackdropStyled } from './ui.scss';

const Backdrop = ({ show, close }) => {

    if (!show) {
        return null
    };

    return (
        <BackdropStyled
            onClick={close}
        />
    )
};

export default Backdrop;