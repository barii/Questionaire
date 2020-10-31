import React from 'react';
import classnames from 'classnames';
import PropTypes from 'prop-types';

const ListFieldGroup = ({
  name,
  placeholder,
  options,
  label,
  error,
  info,
  onChange,
  disabled,
}) => {
  if (error)console.log(error[Object.keys(error)[0]]);
  
  return (
    <div className="form-group">
      {label && <label htmlFor={name}>{label}</label>}
      <ul className={classnames("list-group form-control no-border", {
          'is-invalid': error
        })}>
        {options.map((choice, i) => (
          <li key={choice.id} className='list-group-item no-padding'>
          {error && error.choices && <p>error.choices[choice.id]</p>}
            <input
              type="text"
              className={classnames('form-control form-control-lg no-border-if-valid', {
                'is-invalid': error && error[choice.id]
              })}
              key={choice.id}
              placeholder={placeholder}
              name={name}
              value={choice.value}
              onChange={(e) => onChange(e, choice.id)}
              disabled={disabled}
            />
          </li>
        ))}
      </ul>
      {info && <small className="form-text text-muted">{info}</small>}
      {error && <div className="was-validated invalid-feedback">{error[Object.keys(error)[0]]}</div>}
    </div>
  );
};

ListFieldGroup.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string,
  options: PropTypes.array.isRequired,
  info: PropTypes.string,
  error: PropTypes.object,
  onChange: PropTypes.func.isRequired,
  disabled: PropTypes.string
};

export default ListFieldGroup;
