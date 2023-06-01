import React from 'react';
import './Quicks.css';

export default function Quicks(props) {
  return (
    <div className="pb-3 quicks-container">
      <button
        className="quicks btn btn-outline-secondary text-start"
        data-bs-toggle="collapse"
        href={`#${props.title}`}
        aria-expanded="false"
        aria-controls={props.title}
      >
        <h5>{props.title}</h5>
      </button>
      <div className="collapse" id={props.title}>
        <ul className="list-unstyled quicks-options">
          {Array.isArray(props.list) ? (
            props.list.map((item, index) => <li className="list-item" key={index}>{item.name}</li>)
          ) : (
            <li className="list-item">No items found</li>
          )}
        </ul>
      </div>
    </div>
  );
}
