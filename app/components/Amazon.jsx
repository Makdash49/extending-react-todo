import React from 'react';
import {connect} from 'react-redux';
import Product from 'Product';
import ProductAPI from 'ProductAPI'


import * as actions from 'actions';
var socket = io();



export class Amazon extends React.Component {

  onLogout(e) {
    var {dispatch} = this.props;

    e.preventDefault();

    dispatch(actions.startLogout());
  }

  handleSubmit (e) {
    e.preventDefault();
    var {dispatch} = this.props

    var todoText = this.refs.todoText.value;

    if (todoText.length > 0) {
      this.refs.todoText.value = '';

      dispatch(actions.startAddProduct(todoText));
    } else {
      this.refs.todoText.focus();
    }
  }



  render() {
    var {products} = this.props;
    console.log('PRODUCTS!!!!!!!', products);
    // console.log("AMAZON COMPONENT:", products)

    var total = 0;

    products.forEach((product) => {
      total = total + product.counter;
    });

    console.log('TOTAL:', total );


    var renderProducts = () => {
      var filteredProducts = ProductAPI.filterProducts(products);
      return filteredProducts.map((product) => {
        return (
          <Product key={product.id} {...product} total={total}/>
        );
      });
    }

    return (
      <div>
        <div className="page-actions">
          <a href="#" onClick={this.onLogout.bind(this)}>Logout</a>
        </div>
        <h1 className="page-title">Product Vote</h1>

        <div className="row">
            <div className="productContainer">
              <h5>TOTAL VOTES: {total}</h5>
              {renderProducts()}
            </div>
            <div className="productContainer">
              <h5>TOTAL VOTES: {total}</h5>
              {renderProducts()}
            </div>
            <div className="productContainer">
              <h5>TOTAL VOTES: {total}</h5>
              {renderProducts()}
            </div>
        </div>

        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type="text" ref="todoText" placeholder="What would you like to buy?"/>
          <button className="button expanded">Add Product</button>
        </form>

      </div>
    )
  }
};

// export default Redux.connect()(Amazon);

export default connect(
  (state) => {
    return state;
  }
)(Amazon);
