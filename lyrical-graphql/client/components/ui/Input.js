import React from 'react';

import classes from '../../styles/ui/Input.module.scss';

const Input = props => {
    const { onChange, value, label, name } = props;
    return (
        <div className={classes.InputGroup}>
            {label && <label htmlFor={name}>{label}</label>}
            <input
                type={props.type || 'text'}
                id={name}
                name={name}
                value={value}
                onChange={onChange}
            />
        </div>
    );
};

export default Input;
