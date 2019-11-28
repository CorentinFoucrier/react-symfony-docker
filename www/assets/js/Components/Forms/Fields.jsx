import React from 'react';

const Field = ({name, value, onChange, placeholder, type="text", error=""}) => {
    return (
        <div className="form-group">
            <input
            name={name}
            className={"form-control" + (error && " is-invalid")}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            type={type}
            />
            {error && <div className="invalid-feedback">{error}</div>}
        </div>
    );
}

export default Field;