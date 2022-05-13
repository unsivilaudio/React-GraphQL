import { Link } from 'react-router-dom';
import React from 'react';

import routes from '../../routes';
import classes from '../../styles/navigation/Navigation.module.scss';
import NavItem from './NavItem';

const Navigation = props => {
    const listItems = routes.map((route, i) => {
        return <NavItem key={i} path={route.path} label={route.label} />;
    });

    return (
        <div className={classes.Navigation}>
            <div className={classes.Brand}>Songify</div>
            <ul className={classes.List}>{listItems}</ul>
        </div>
    );
};

export default Navigation;
