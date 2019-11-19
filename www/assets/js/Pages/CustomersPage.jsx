import React, {Component} from 'react';
import Axios from 'axios';
import {useState,useEffect} from 'react';
import PaginationCompoment from '../Compoments/PaginationCompoment';

const CustomersPage = (props) => {
    const [Customer, setCustomer] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);

    const itemsPerPage = 10;

    const onPageChange = (page) => setCurrentPage(page);
    const paginatedCompoment = PaginationCompoment.getData(Customer, currentPage, itemsPerPage);

    useEffect(() => {
        Axios.get('http://localhost:8282/api/customers')
        .then(response => response.data['hydra:member'])
        .then(data => setCustomer(data))
        .catch(error => console.log(error.response));
    }, []);

    const handleDelete = (id) => {
        const originalCustomers = [...Customer];

        setCustomer(Customer.filter(customer => customer.id !== id));

        Axios.delete('http://localhost:8282/api/customers/'+id)
        .then(response => console.log(response))
        .catch( error => {
            console.log(error.response);
            setCustomer(originalCustomers)
        });
    }

    return (
        <>
            <h1>Liste des clients</h1>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Client <i className="fas fa-users"></i></th>
                        <th>Email <i className="fas fa-at"></i></th>
                        <th>Société <i className="fas fa-building"></i></th>
                        <th className="text-center">Facture <i className="fas fa-file-invoice-dollar"></i></th>
                        <th className="text-center">Montant total facturé <i className="fas fa-dollar-sign"></i></th>
                        <th>Suppr. <i className="far fa-trash-alt"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {paginatedCompoment.map (customer =>
                    <tr key={customer.id}>
                        <td>{customer.id}</td>
                        <td>
                            <a href="1">{customer.firstName} {customer.lastName}</a>
                        </td>
                        <td>{customer.email}</td>
                        <td>{customer.company}</td>
                        <td className="text-center"><span className="badge badge-pill badge-primary">{customer.invoices.length}</span></td>
                        <td className="text-center">{customer.totalAmount.toLocaleString()}</td>
                        <td>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(customer.id)}>
                            <i className="far fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                    )}
                </tbody>
                <tfoot className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Client <i className="fas fa-users"></i></th>
                        <th>Email <i className="fas fa-at"></i></th>
                        <th>Société <i className="fas fa-building"></i></th>
                        <th className="text-center">Facture <i className="fas fa-file-invoice-dollar"></i></th>
                        <th className="text-center">Montant total facturé <i className="fas fa-dollar-sign"></i></th>
                        <th>Suppr. <i className="far fa-trash-alt"></i></th>
                    </tr>
                </tfoot>
            </table>
            <PaginationCompoment currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={Customer.length}
                onPageChange={onPageChange} />
        </>
    );
}

export default CustomersPage;
