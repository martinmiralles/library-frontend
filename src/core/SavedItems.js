import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import { getBooks } from "./apiCore";
import { getSavedItems, removeItem } from "./itemHelpers";
import Card from "./Card";
import Reserve from "./Reserve";
import { isAuthenticated } from "../auth";

const SavedItems = () => {
  const [items, setItems] = useState([]);

  // whenver there's a change in the number of items, the page reloads
  useEffect(() => {
    setItems(getSavedItems());
  }, [items]);

  const showItems = items => {
    return (
      <div>
        <h2>You have {`${items.length}`} saved items</h2>
        <hr />
        {items.map((book, i) => (
          <Card
            key={i}
            book={book}
            showSaveItemButton={false}
            showRemoveItemButton={true}
          />
        ))}
      </div>
    );
  };

  const noItems = () => (
    <h2>
      You have no saved items.
      <br />
      <br />
      <Link to='/browse'>Continue searching</Link>
    </h2>
  );

  return (
    <Layout
      title='Saved Items'
      description='Manage your selected books before reserving them.'
      className='container-fluid'
    >
      <div className='row'>
        <div className='col-6'>
          {items.length > 0 ? showItems(items) : noItems()}
        </div>

        <div className='col-6'>
          <h2 className='mb-4'>Your session summary</h2>
          <hr />
          <Reserve books={items} />
        </div>
      </div>
    </Layout>
  );
};

export default SavedItems;
