import React from 'react';
import PropTypes from 'prop-types';

const ComponentWithProps = props => {
    return (
        <>
            <h1>{props.header}</h1>
            <p>{props.content}</p>
            <p>This is a number from props: {props.number}</p>
            <p>This is a display of a prop that doesn't exist: {props.nonexistent}</p>
        </>
    );
}

ComponentWithProps.propTypes = {				// PT2
    header: PropTypes.string.isRequired,		// PT2.1
    content: PropTypes.string.isRequired,		// PT2.1
    number: PropTypes.number.isRequired		    // PT2.2
};

ComponentWithProps.defaultProps = {			    // DP1
    header: `Header from defaults`,			    // DP1.2
    content: `Content from defaults`,		    // DP1.3
    number: 10							        // DP1.3
};


export default ComponentWithProps;
