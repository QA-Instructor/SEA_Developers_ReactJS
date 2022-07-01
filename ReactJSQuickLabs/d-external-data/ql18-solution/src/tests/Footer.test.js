import React from 'react';
import { create } from 'react-test-renderer';

import Footer from '../Components/Footer';

describe(`Test Footer component renders correctly`, () => {
    test(`Footer matches snapshot`, () => {
        const footer = create(<Footer />);
        expect(footer.toJSON()).toMatchSnapshot();
    });
});