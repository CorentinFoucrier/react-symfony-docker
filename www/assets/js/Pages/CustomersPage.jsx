import React, {useState,useEffect} from 'react';
import {Link} from 'react-router-dom';
import PaginationCompoment from '../Components/PaginationCompoment';
import CustomersApi from '../Services/CustomersApi';

const CustomersPage = (props) => {
    const [Customer, setCustomer] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [search, setSearch] = useState("");

    const itemsPerPage = 10;
    
    const onPageChange = (page) => setCurrentPage(page);
    const filteredCustomers = Customer.filter(customer => 
        customer.firstName.toLowerCase().includes(search.toLowerCase()) ||
        customer.lastName.toLowerCase().includes(search.toLowerCase()) ||
        customer.email.toLowerCase().includes(search.toLowerCase())
    );
    const paginatedCompoment = PaginationCompoment.getData(filteredCustomers, currentPage, itemsPerPage);

    const fetchCustomers = async () => {
        try {
            const data = await CustomersApi.findAll()
                .then(data => setCustomer(data))
                .catch(error => console.log(error.response));
        } catch (error) {
            console.log(error.response);
        }
    }

    useEffect(() => {
        fetchCustomers();
    }, []);

    const handleDelete = async (id) => {
        const originalCustomers = [...Customer];

        setCustomer(Customer.filter(customer => customer.id !== id));

        try {
            const data = await CustomersApi.delete(id);
            setCustomer(originalCustomers);
        } catch (error) {
            console.log(error.response);
        }
    }

    const handleSearch = ({currentTarget}) => {
        setSearch(currentTarget.value);
        setCurrentPage(0);
    }

    return (
        <>
            <div className="d-flex justify-content-between align-items-center">
                <h1>Liste des clients</h1>
                <Link to="customer/new" className="btn btn-primary">Créer un client</Link>
            </div>
            <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <span className="input-group-text"><i className="fas fa-search"></i></span>
                </div>
                <input className="form-control" type="text" value={search} onChange={handleSearch} placeholder="Rechercher..." />
            </div>
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
                            <Link to={"/customer/"+customer.id}>{customer.firstName} {customer.lastName}</Link>
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
                length={filteredCustomers.length}
                onPageChange={onPageChange} />
        </>
    );
}

export default CustomersPage;
