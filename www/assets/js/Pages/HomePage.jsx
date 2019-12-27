import React from 'react';

const HomePage = (props) => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">Welcome to a react.js project <i className="fab fa-react"></i></h1>
            <p className="lead">A JavaScript library for building user interfaces</p>
            <hr className="my-4" />
            <p>React has been designed from the start for gradual adoption, and you can use as little or as much React as you need. Whether you want...</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="https://reactjs.org/docs/getting-started.html" role="button">Learn more</a>
            </p>
        </div>
    );
}

export default HomePage;
