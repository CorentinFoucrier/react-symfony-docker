import React, {Component} from 'react';

const CustomersPage = (props) => {
    return (
        <>
            <h1>Liste des clients</h1>
            <table className="table table-striped">
                <thead className="thead-dark">
                    <tr>
                        <th>ID</th>
                        <th>Client</th>
                        <th>Email</th>
                        <th>Société</th>
                        <th className="text-center">Facture</th>
                        <th className="text-center">Montant total facturé</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    <td>1</td>
                    <td>
                        <a href="1">Le bob</a>
                    </td>
                    <td>lebob@react.com</td>
                    <td>LeBob Incorporation</td>
                    <td className="text-center"><span className="badge badge-primary">4</span></td>
                    <td className="text-center">2400,00€</td>
                    <td><button className="btn btn-sm btn-danger">Supprimer</button></td>
                </tbody>
            </table>
        </>
    );
}

export default CustomersPage;
