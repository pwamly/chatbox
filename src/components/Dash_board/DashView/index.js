import React from 'react';
import './dashview.css';
import { Link, useHistory } from 'react-router-dom';
import EmojiTransportationIcon from '@mui/icons-material/EmojiTransportation';
import DepartureBoardIcon from '@mui/icons-material/DepartureBoard';
import BusinessIcon from '@mui/icons-material/Business';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import { connect } from 'react-redux';

// import { useStateValue } from "./StateProvider";

function Index({ id, title, image, price, rating, profile }) {
  let history = useHistory();

  const { branches, vehicles, customers, transporters, employes } =
    profile.dashData || {};

  const dataadimindata = {
    branches: '6',
    employe: 5,
    vehicle: '9',
    Transporters: '12',
    customers: 200,
  };

  const addToBasket = () => {
    // dispatch the item into the data layer
    // dispatch({
    //   type: 'ADD_TO_BASKET',
    //   item: {
    //     id: id,
    //     title: title,
    //     image: image,
    //     price: price,
    //     rating: rating,
    //   },
    // });
  };

  return (
    <div className='dashview'>
      {dataadimindata && (
        <div
          // style={{ background: 'yellow' }}
          className='product'
          onClick={() => history.push('/dashboard/branch')}>
          <HomeWorkIcon
            sx={{
              fontSize: '75px',
            }}
          />
          <p className='product__title'>Branches</p>
          <p className='product__price'>
            <small>{branches}</small>
            <strong>{price}</strong>
          </p>
        </div>
      )}
      {dataadimindata && (
        <div
          className='product'
          onClick={() => history.push('/dashboard/employee')}>
          <PeopleAltIcon
            sx={{
              fontSize: '75px',
            }}
          />

          <p className='product__title'>Employee</p>
          <p className='product__price'>
            <small>{employes}</small>
            <strong>{price}</strong>
            <br />
          </p>
        </div>
      )}
      {dataadimindata && (
        <div
          className='product'
          onClick={() => history.push('/dashboard/customers')}>
          <BusinessIcon
            sx={{
              fontSize: '75px',
            }}
          />
          <p className='product__title'>Customers</p>
          <p className='product__price'>
            <small>{customers}</small>
            <strong>{price}</strong>
            <br />
          </p>
        </div>
      )}
      {dataadimindata && (
        <div
          className='product'
          onClick={() => history.push('/dashboard/vehicles')}>
          <EmojiTransportationIcon
            sx={{
              fontSize: '75px',
            }}
          />
          <p className='product__title'>Vehicle</p>
          <p className='product__price'>
            <small>{vehicles}</small>
            <strong>{price}</strong>
            <br />
          </p>
        </div>
      )}
      {dataadimindata && (
        <div
          className='product'
          onClick={() => history.push('/dashboard/transporters')}>
          <DepartureBoardIcon
            sx={{
              fontSize: '75px',
            }}
          />
          <p className='product__title'>Transporters</p>
          <p className='product__price'>
            <small>{transporters}</small>
            <strong>{price}</strong>
            <br />
          </p>
        </div>
      )}
    </div>
  );
}

const MapStateToprops = (store) => {
  return { ...store };
};

export default connect(MapStateToprops)(Index);