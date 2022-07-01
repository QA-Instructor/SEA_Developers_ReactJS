import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { create } from 'react-test-renderer';

import Header from '../Components/Header';

test(`Header matches snapshot`, () => {
    const header = create(<MemoryRouter><Header /></MemoryRouter>);
    expect(header.toJSON()).toMatchSnapshot();
});
