import React from 'react';
import { NavLink, useLocation } from 'react-router-dom';

import classes from '../../styles/navigation/NavItem.module.scss';

const NavItem = props => {
    const location = useLocation();

    return (
        <li className={classes.NavItem}>
            <NavLink
                to={props.path}
                className={_ =>
                    location.pathname === props.path ? classes.Active : null
                }>
                {props.label}
            </NavLink>
        </li>
    );
};

export default NavItem;
