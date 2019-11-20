import React, { useState, useEffect } from 'react';
import PaginationCompoment from '../Compoments/PaginationCompoment';
import moment from 'moment';
import InvoicesApi from '../Services/InvoicesApi';

const InvoicesPage = (props) =>
{
    const [invoices, setInvoices] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setsearch] = useState("");

    const formatDate= (str) => moment(str).format('DD/MM/YYYY');

    const itemsPerPage = 15;

    const filteredInvoices = invoices.filter(invoice =>
        invoice.customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        invoice.customer.lastName.toLowerCase().includes(search.toLowerCase())
    );
    const Pagination = PaginationCompoment.getData(filteredInvoices, currentPage, itemsPerPage);

    const STATUS_CLASSES = {
        PAID: "success",
        SENT: "primary",
        CANCELLED: "danger"
    }

    const STATUS_LABEL = {
        PAID: "Payée",
        SENT: "Envoyée",
        CANCELLED: "Annulée"
    }

    const fetchInvoices = async () =>
    {
        try {
            const data = await InvoicesApi.findAll();
            setInvoices(data);
        } catch(error) {
            console.log(error.response);
        }
    }

    useEffect(() => 
    {
        fetchInvoices();
    }, []);

    const handlePageChange = (page) => setCurrentPage(page);

    const handleSearch = (event) =>
    {
        setsearch(event.currentTarget.value);
        setCurrentPage(0);
    }

    const handleDelete = async (id) => {
        const originalInvoices = [...invoices];
        setInvoices(invoices.filter(invoice => invoice.id !== id));
        try {
            const data = await InvoicesApi.delete(id);
            setInvoice(originalInvoices);
        } catch (error) {
            console.log(error.response);
        }
    }

    return (
        <>
            <h1>Liste des facture</h1>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                </div>
                <input className="form-control" type="text" value={search} onChange={handleSearch} placeholder="Rechercher..." />
            </div>
            <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                    <tr>
                        <th>No</th>
                        <th>Client <i className="fas fa-users"></i></th>
                        <th className="text-center">Date <i className="fas fa-calendar-alt"></i></th>
                        <th className="text-center">Montant <i className="fas fa-dollar-sign"></i></th>
                        <th className="text-center">Status</th>
                        <th>Suppr. <i className="far fa-trash-alt"></i></th>
                    </tr>
                </thead>
                <tbody>
                    {Pagination.map (invoice =>
                    <tr key={invoice.id}>
                        <td>{invoice.chrono}</td>
                        <td><a href="#">{invoice.customer.firstName} {invoice.customer.lastName}</a></td>
                        <td className="text-center">{formatDate(invoice.sentAt)}</td>
                        <td className="text-center">{invoice.amount.toLocaleString()} €</td>
                        <td className="text-center"><span className={"badge badge-"+STATUS_CLASSES[invoice.status]}>{STATUS_LABEL[invoice.status]}</span></td>
                        <td>
                            <button className="btn btn-sm btn-primary mr-1">
                                <i className="far fa-edit"></i>
                            </button>
                            <button className="btn btn-sm btn-danger" onClick={() => handleDelete(invoice.id)}>
                                <i className="far fa-trash-alt"></i>
                            </button>
                        </td>
                    </tr>
                    )}
                </tbody>
                <tfoot className="thead-dark">
                    <tr>
                        <th>No</th>
                        <th>Client <i className="fas fa-users"></i></th>
                        <th className="text-center">Date <i className="fas fa-calendar-alt"></i></th>
                        <th className="text-center">Montant <i className="fas fa-dollar-sign"></i></th>
                        <th className="text-center">Status</th>
                        <th>Suppr. <i className="far fa-trash-alt"></i></th>
                    </tr>
                </tfoot>
            </table>
            <PaginationCompoment currentPage={currentPage}
                itemsPerPage={itemsPerPage}
                length={filteredInvoices.length}
                onPageChange={handlePageChange} />
        </>
    );
}

export default InvoicesPage;