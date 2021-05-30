import React from 'react';

import Backdrop from './backdrop';

import { ModalStyled } from './ui.scss';

const BackendSuspense = ({ loading, error, errorMessage, close }) => {

    return (
        <ModalStyled>
            <div>
                {error ? errorMessage : 'Loading...'}
            </div>
            {!loading && <button onClick={close}>close</button>}
        </ModalStyled>
    )
};

const Modal = (props) => {

    const { show, loading, error, errorMessage, children, close } = props;

    if (!show) {
        return null
    }

    if (error || loading) {
        return (
            <React.Fragment>
                <Backdrop
                    show={error || loading}
                    close={close}
                />
                <BackendSuspense
                    loading={loading}
                    error={error}
                    errorMessage={errorMessage}
                    close={close}
                />
            </React.Fragment>
        )
    }

    return (
        <React.Fragment>
            <Backdrop
                show={show}
                close={close}
            />
            <ModalStyled>
                {children}
            </ModalStyled>
        </React.Fragment>
    )
}

export default Modal;