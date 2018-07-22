import React from 'react';
import {Link} from 'react-router-dom';

const NotFoundPage = () => (
    <div>
        <p>404! Page Not Found</p>
        <p><Link to='/'>Return To Home</Link></p>
    </div>
)

export default NotFoundPage;