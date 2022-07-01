import React from 'react';
import { create } from 'react-test-renderer';

import NotFound from '../Components/utils/NotFound';

describe(`Test NotFound component renders correctly`, () => {
    test(`NotFound matches snapshot`, () => {
        const notFound = create(<NotFound />);
        expect(notFound.toJSON()).toMatchSnapshot();
    });
});