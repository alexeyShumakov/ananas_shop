import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class NavbarProductSearch extends React.Component {
  static propTypes = {
  }

  constructor(props) {
    super(props);
    this.state = {text: '', products: []};
    _.bindAll(this, ['handleChange', 'resetProducts', 'moveToSearch'])
  }

  resetProducts() {
    let _this = this;
    setTimeout(function(){
    _this.setState({products: []});
    }, 200);
  }

  moveToSearch(event){
    event.preventDefault();
    let params = $.param({keyword: this.state.text});
    let url = `/products/search?${params}`;
    window.location.href = url;
  }
  handleChange(event) {
    let keyword = event.target.value;
    let _this = this;

    this.setState({text: keyword});

    $.get('/api/v1/products', {keyword: keyword}).then(
      (data) => {
        this.setState({ products: data.products });
      },
      (errors) => {
        console.log(errors);
      }
    )
  }

  render() {
    let products = this.state.products;
    if (products.length > 0 ) {
      products =
          products.map(product => {
            return(
              <li key={product.id}>
                <a href={`/products/${product.id}`} >
                  <img src={product.thumb_cover_url} alt=""/>
                  {product.title}
                </a>
              </li>
            );
          });
      products =
        <ul className='dropdown-menu'>
          {products}
        </ul>
    } else {
      products = null;
    }

    return (
      <div>
        <form onSubmit={this.moveToSearch} className="navbar-form navbar-left dropdown nav-product-search" role="search">
          <div className="form-group has-feedback">
            <input
              value={this.state.text}
              onChange={this.handleChange}
              onBlur={this.resetProducts}
              type="text"
              className="form-control"
              placeholder="Поиск"/>
            <span className="form-control-feedback" aria-hidden="true">
              <span className="glyphicon glyphicon-search"></span>
            </span>
          </div>
          {products}
        </form>
      </div>
    );
  }
}
