import React from 'react';

function ListErrors(props) {
  const { errors } = props;
  if (errors) {
    return (
      <ul className="error-messages">
        {
            Object.keys(errors).map((key) => (
              <li key={key}>
                {key}
                {' '}
                {errors[key]}
              </li>
            ))
          }
      </ul>
    );
  }
  return null;
}

export default ListErrors;
