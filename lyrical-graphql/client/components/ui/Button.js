import React from 'react';

import classes from '../../styles/ui/Button.module.scss';

const Button = props => {
    const { theme, label, onClick, disabled } = props;
    const btnClasses = [classes.Button];

    switch (theme?.toLowerCase()) {
        case 'primary':
            btnClasses.push(classes.Primary);
            break;
        case 'secondary':
            btnClasses.push(classes.Secondary);
            break;
        default:
            break;
    }

    return (
        <button
            className={btnClasses.join(' ')}
            onClick={onClick}
            disabled={disabled}>
            {label}
        </button>
    );
};

export default Button;
