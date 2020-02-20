import React from 'react';
import { connect } from 'react-redux';

const Beer = ({ beer }) => {
  const { name, description } = beer;
  return (
    <div>
      <p>{name}</p>
      <p>{description}</p>
    </div>
  );
};

const mapStateToProps = ({ beersList }) => ({
  beer: beersList.currentBeer
});

export default connect(mapStateToProps)(Beer);
