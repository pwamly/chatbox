import React from 'react';
import './branchview.css';
import { Link, useHistory } from 'react-router-dom';

// import { useStateValue } from "./StateProvider";

function Index({ id, title, image, price, rating }) {
  let history = useHistory();

  //   const [{ basket }, dispatch] = useStateValue();

  //   console.log("this is basket >>> ", basket);
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
    <div className='dashview' onClick={() => history.push('/dashboard/branch')}>
      {dataadimindata && (
        <div className='branch'>
          <img src={image} alt='' className='images' />
          <p className='product__title'>Branches</p>
          <p className='product__price'>
            <small>{dataadimindata.branches}</small>
            <strong>{price}</strong>
          </p>
        </div>
      )}
      {dataadimindata && <div className='branch'></div>}
      {dataadimindata && (
        <div className='product'>
          <p className='product__title'>Customers</p>
          <p className='product__price'>
            <small>{dataadimindata.customers}</small>
            <strong>{price}</strong>
            <br />
          </p>
        </div>
      )}
      {dataadimindata && (
        <div className='branch'>
          <p className='product__title'>Vehicle</p>
          <p className='product__price'>
            <small>{dataadimindata.vehicle}</small>
            <strong>{price}</strong>
            <br />
          </p>
        </div>
      )}
      {dataadimindata && (
        <div className='branch'>
          <p className='product__title'>Transporters</p>
          <p className='product__price'>
            <small>{dataadimindata.Transporters}</small>
            <strong>{price}</strong>
            <br />
          </p>
        </div>
      )}
    </div>
  );
}

export default Index;
