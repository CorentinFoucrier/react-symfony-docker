import React, {useState, useEffect} from 'react';
import Field from '../Components/Forms/Fields';
import {Link} from 'react-router-dom';
import Axios from 'axios';
import CustomersApi from '../Services/CustomersApi';

const CustomerPage = ({match, history}) => {
    const [customer, setCustomer] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    const {id='new'} = match.params;
    const [editing, setEditing] = useState(false);

    useEffect(() => {
        if (id !== 'new') {
            setEditing(true);
        }
    }, [id]);

    const handleChange = ({currentTarget}) => {
        const {name , value} = currentTarget;
        setCustomer({...customer, [name] : value});
    }
    
    const handleSubmit = async event => {
        event.preventDefault();
        try {
            if (editing) {
                await CustomersApi.update(id, customer);
            } else {
                await CustomersApi.create(customer);
            }
            setError({});
            history.replace('/customers');
        } catch ({response}) {
            const {violations} = response.data;
            if (violations) {
                const apiErrors = {};
                violations.map(({propertyPath, message}) => {
                    apiErrors[propertyPath] = message;
                });
                setError(apiErrors);
            }
            console.log(error.response.data);
        }
    }

    const fetchCustomers = async id => {
        try {
            const data = await Axios.get('http://localhost:8282/api/customers/'+id)
            .then(response => response.data);
            const {firstName, lastName, email, company} = data;
            setCustomer({firstName, lastName, email, company});
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        setEditing(true);
        fetchCustomers(id);
    }, []);

    const [error, setError] = useState({
        lastName: "",
        firstName: "",
        email: "",
        company: ""
    })

    return ( 
        <>
            <div className="row">
                <fieldset className="col-6 offset-3">
                <legend>{!editing && <h1>Ajouté un client</h1> || <h1>Modifier un client</h1>}</legend>
                    <Field name="lastName" placeholder="Nom de famille du client"
                            value={customer.lastName} onChange={handleChange} error={error.lastName}
                    />
                    <Field name="firstName" placeholder="Prénom du client"
                            value={customer.firstName} onChange={handleChange} error={error.firstName}
                    />
                    <Field name="email" placeholder="Adresse email du client"
                            value={customer.email} onChange={handleChange} error={error.email}
                    />
                    <Field name="company" placeholder="Entreprise du client"
                            value={customer.company} onChange={handleChange} error={error.company}
                    />
                    <div className="form-group">
                        <button type="submit" type="submit" className="btn btn-success" onSubmit={handleSubmit}>Enregistrer</button>
                        <Link to="/customers" className="btn btn-link">Retour à la liste</Link>
                    </div>
                </fieldset>
            </div>
        </>
    );
}

export default CustomerPage;