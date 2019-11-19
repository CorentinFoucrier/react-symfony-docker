import React from 'react';

const PaginationCompoment = ({currentPage, itemsPerPage, length, onPageChange}) => {
    const pageCount = Math.ceil(length / itemsPerPage);
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
        pages.push(i);
    }

    return (
        <div>
        <ul className="pagination pagination-sm">
            <li className={"page-item " + (currentPage === 1 && "disabled")}>
                <button className="page-link" onClick={() => onPageChange(currentPage - 1)}>&laquo;</button>
            </li>
            {pages.map(page =>
                <li key={page} className={"page-item " + (currentPage === page && "active") }>
                    <button className="page-link" onClick={() => onPageChange(page)}>{page+1}</button>
                </li>
            )}
            <li className={"page-item " + (currentPage === pageCount && "disabled")}>
                <button className="page-link" onClick={() => onPageChange(currentPage + 1)}>&raquo;</button>
            </li>
        </ul>
    </div>
    );
}
PaginationCompoment.getData = (items, page, itemsPerPage) => {
    let start = page * itemsPerPage - page;
    let stop = start + itemsPerPage;

    return items.slice(start, stop);
}

export default PaginationCompoment;