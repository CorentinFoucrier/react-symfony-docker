import Axios from 'axios';

function findAll() {
    return Axios.get('http://localhost:8282/api/customers')
        .then(response => response.data['hydra:member']);
}

function deleteCustomer(id) {
    return Axios.delete('http://localhost:8282/api/customers'+id);
}

function update(id, customer) {
    return Axios.put('http://localhost:8282/api/customers'+id, customer);
}

function create(customer) {
    return Axios.post('http://localhost:8282/api/customers', customer);
}

export default {
    findAll,
    delete: deleteCustomer
}