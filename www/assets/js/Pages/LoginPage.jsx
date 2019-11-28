import React, { useState, useContext } from 'react';
import AuthApi from '../Services/AuthApi';
import Field from '../Components/Forms/Fields';
import AuthContext from '../Contexts/AuthContext';

const LoginPage = ({history}) => {
    const [credentials, setCredentials] = useState({
        'username': '',
        'password': ''
    });
    const {setIsAuthenticated} = useContext(AuthContext);
    const [error, setError] = useState('');

    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setCredentials({...credentials, [name] : value});
    }

    const handleSubmit = async event => {
        event.preventDefault();
        try {
            await AuthApi.authenticate(credentials);
            setError("");
            setIsAuthenticated(true);
            history.replace('/customers');
        } catch (error) {
            setError("Infos incorrects");
        }
    }

    return (
        <>
            <div className="row">
                <fieldset className="col-6 offset-3">
                    <legend>Formulaire de connexion</legend>
                    <Field name="username" value={credentials.username} onChange={handleChange} placeholder="Email" type="email" error={error} />
                    <Field name="password" value={credentials.password} onChange={handleChange} placeholder="Mot de passe" type="password" error={error} />
                    <div className="form-group">
                        <button type="submit" onClick={handleSubmit} className="btn btn-success">Connexion</button>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default LoginPage;