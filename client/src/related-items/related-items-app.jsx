/* eslint-disable import/no-duplicates */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-indent */
/* eslint-disable arrow-body-style */
/* eslint-disable react/jsx-equals-spacing */
/* eslint-disable import/order */
/* eslint-disable import/extensions */
/* eslint-disable spaced-comment */
/* eslint-disable react/jsx-wrap-multilines */
/* eslint-disable react/function-component-definition */
/* eslint-disable react/prop-types */
/* eslint-disable semi */
/* eslint-disable react/destructuring-assignment */
import RelatedCSS from './cssModules/Related.module.css';
import React from 'react';
import { useEffect, useState } from 'react';
import Item from './Item.jsx';
import axios from 'axios';

const AppRelated = (props) => {
  //const [state, setState] = useState(initialState);
  const [items, setItems] = useState([]);
  const [isLoading, setLoading] = useState(true); //set true for loader to appear
  const productId = props.product_id || 63624;

  useEffect(() => {
    getAllRelatedItems();
  }, []);

  useEffect(() => {
    getAllRelatedItems();
  }, [props.product_id]);

  const getAllRelatedItems = () => {
    axios.get('/products/related', { params: { product_id: productId } })
      .then((res) => {
        var relatedItemsArray = res.data;
        getEachItem(relatedItemsArray);
      })
      .catch((err) => {
        console.log(err);
      })
  }

  const getEachItem = (itemsArr) => {
    let promises = [];
    var storeAllItems = []
    for (var i = 0; i < itemsArr.length; i++) {
      promises.push(axios.get('/products/get', { params: { product_id: itemsArr[i] } })
        .then((res) => {
         // console.log();
         var eachItem = res.data;
          storeAllItems.push(eachItem);
        })
        .catch((err) => {
          console.log(err);
        })
      )
    }
    Promise.all(promises).then(() => {
      setItems(storeAllItems);
      setLoading(false);
    });

  }

  if (isLoading) {
    return (
      <div className={RelatedCSS.container}>
        <h3>FETCHING RELATED ITEMS</h3>
        <div className={RelatedCSS.loader_container}>
          <div className={RelatedCSS.loader}></div>
        </div>
      </div>
    )
  }
  return (
    <div className={RelatedCSS.container}>
      {items.map((item) => {
        return (
          <Item
            name={item.name}
            category={item.category}
            price={item.default_price}
            key={item.id}
            id={item.id}
            parentId = {props.product_id}
            id = {item.id}
            setProduct={props.setProduct}
          />
        )
      }
      )
      }
    </div>
  )
}

export default AppRelated;

