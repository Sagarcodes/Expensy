import React from 'react';
import {NavLink} from 'react-router-dom';

const Header = () => (
    <div>
        <h2>Expensy</h2>
        <NavLink to='/' activeClassName="is-active" exact={true}>Dashboard</NavLink>
        <NavLink to='/create' activeClassName="is-active">Add</NavLink>
    </div>
)

export default Header;
