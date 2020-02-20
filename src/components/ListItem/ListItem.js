import React from 'react';

import './styles.css';

const ListItem = ({ name, imageUrl, itemNumber }) => {
  return (
    <div className="item">
      <div className="item__image-wrapper">
        <img className="item__image" src={imageUrl} alt={name} />
      </div>
      <div className="item__info">
        <p className="item__number">{itemNumber}</p>
        <h3 className="item__name">{name}</h3>
      </div>
    </div>
  );
};

export default ListItem;
