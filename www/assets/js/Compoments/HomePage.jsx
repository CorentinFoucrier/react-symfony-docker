import React from 'react';

const HomePage = (props) => {
    return (
        <div className="jumbotron">
            <h1 className="display-4">Welcome to react.js <i className="fab fa-react"></i></h1>
            <p className="lead">A JavaScript library for building user interfaces</p>
            <hr className="my-4" />
            <p>It uses utility classNamees for typography and spacing to space content out within the larger container.</p>
            <p className="lead">
                <a className="btn btn-primary btn-lg" href="#" role="button">Learn more</a>
            </p>
        </div>
    );
}

export default HomePage;
