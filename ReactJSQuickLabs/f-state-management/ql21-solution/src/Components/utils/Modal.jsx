import React from 'react';
import PropTypes from 'prop-types';
import '../css/Modal.css';

const Modal = ({ handleClose, message }) => {

    const showHideClassName = message ? `modal display-block` : `modal display-none`;

    return (
        <div className={showHideClassName}>
            <section className="modal-main">
                <h3>Todo Application Information</h3>
                <p>{message}</p>
                <button className="btn btn-primary" onClick={handleClose}>Close</button>
            </section>
        </div>
    );
};

Modal.propTypes = {
    handleClose: PropTypes.func.isRequired,
    message: PropTypes.string
}


export default Modal;
