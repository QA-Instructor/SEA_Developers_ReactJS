import React from 'react';
import { create } from 'react-test-renderer';

import Modal from '../Components/utils/Modal';

describe(`Modal render tests`, () => {

    const handleClose = jest.fn();

    test(`Modal matches snapshot when message has a value`, () => {

        const modal = create(<Modal handleClose={handleClose} message={`Error`} />);
        expect(modal.toJSON()).toMatchSnapshot();
    });

    test(`Modal matches snapshot when message is falsy`, () => {

        const modal = create(<Modal handleClose={handleClose} message={``} />);
        expect(modal.toJSON()).toMatchSnapshot();
    });

    test(`Modal calls handleClose when button is clicked`, () => {

        const testRenderer = create(<Modal handleClose={handleClose} message={`Error`} />);
        const testInstance = testRenderer.root;

        const closeBtn = testInstance.findByType(`button`);


        closeBtn.props.onClick();

        expect(handleClose).toHaveBeenCalled();
    });
});