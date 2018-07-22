//Higher Order Component -> a component which renders other components
import React from 'react';
import ReactDOM from 'react-dom';

const Info = (props) => (
    <div>
        <p>Here is the personal info : {props.info}.</p>
    </div>
);

const requireAuthentication = (WrappedComponent) => {
    return (props) => (
        <div>
            {(props.isAuthenticated)?<WrappedComponent {...props}/> : <p>Please login to continue.</p>}
        </div>
    );
}

const AuthInfo = requireAuthentication(Info);

ReactDOM.render(<AuthInfo isAuthenticated={true} info='Some details' />,document.getElementById('app'));