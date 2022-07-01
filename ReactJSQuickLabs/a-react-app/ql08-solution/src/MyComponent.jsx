import React from 'react';
import ComponentWithProps from './ComponentWithProps';

const MyComponent = () => {
    return (
        <>
            <h1>Hello World</h1>
            <ComponentWithProps />
            <ComponentWithProps content="Content from props" number={10} />
        </>
    );
};



export default MyComponent;
