import React, {Component} from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';

const CustomersPage = (props) => {
    const [Customer, setCustomer] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:8282/api/customers')
        .then(response => response.data['hydra:member'])
        .then(data => setCustomer(data))
        .catch(error => console.log(error.response));
    }, []);

    return (
        <>
            <h1>Liste des clients</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Société</th>
                        <th className="text-center">Facture</th>
                        <th className="text-center">Montant total facturé</th>
                        <th>Suppr.</th>
                    </tr>
                </thead>
                <tbody>
                    {Customer.map (customer =>
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>
                            <a href="1">{customer.firstName} {customer.lastName}</a>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center"><span className="badge badge-primary">{customer.invoices.length}</span></td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()}</td>
                        <td><button className="btn btn-sm btn-danger"><i className="far fa-trash-alt"></i></button></td>
                    </tr>
                    )}
                </tbody>
            </table>
        </>
    );
}

export default CustomersPage;
