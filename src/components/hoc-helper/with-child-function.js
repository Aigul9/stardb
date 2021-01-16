import React from 'react';

const withChildFunction = (fn) => (Wrapped) => { // HOC
    return (props) => {
        return (
            <Wrapped {...props}>
                {fn}
            </Wrapped>
        );
    };
};

export default withChildFunction;