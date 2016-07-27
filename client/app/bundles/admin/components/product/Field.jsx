import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Immutable from 'immutable';

export default class Field extends React.Component {

  constructor(props, context) {
    super(props, context);
    let { product, field } = props;
    this.state = { isEdit: false, value: props.product.get(props.field) }
    _.bindAll(this, 'updateProduct', 'setProduct', 'showForm', 'hideForm', 'enterEvent');
  }

  updateProduct() {
    let _this = this;
    let { product, updateProduct, field } = this.props;
    let newProduct = product.set(field, this.state.value);
    let test = updateProduct(product.get('id'), newProduct);
    test.then(isSuccess => {
     if (isSuccess) { _this.hideForm() }
    })
  }

  enterEvent(e) {
    if (e.key == 'Enter') {
      this.updateProduct();
    } else if(e.key == 'Escape') {
      this.hideForm();
    }
  }

  setProduct(e) {
    this.setState({value: e.target.value});
  }

  showForm() {
    this.setState({ isEdit: true});
  }

  hideForm() {
    let { product, field, setProductErrors, productErrors } = this.props;
    let newErrors = productErrors.delete(field);
    setProductErrors(newErrors);
    this.setState({ isEdit: false, value: product.get(field)});
  }
  render() {
    let component, error, input;
    let { isEdit, value } = this.state;
    let { product, field, label, productErrors, textarea } = this.props;
    let hasError = productErrors.has(field);
    if (hasError) {
      error = <span className='help-block'>{productErrors.get(field).first()}</span>
    }
    if (isEdit) {
      input =
        <input className='form-control'
          ref= {
            (component) => {
              if (component != null) {
                ReactDOM.findDOMNode(component).focus()
              }
            }
          }
          value={value}
          onKeyUp={this.enterEvent}
          onChange={this.setProduct}/>
      if (textarea) {
        input = <textarea className='form-control'
          ref= {
            (component) => {
              if (component != null) {
                ReactDOM.findDOMNode(component).focus()
              }
            }
          }
          value={value}
          onKeyUp={this.enterEvent}
          onChange={this.setProduct}/>
      }
      component =
        <div className={hasError ? 'form-group has-error' : 'form-group'}>
          <label className='col-sm-2 control-label'>{label}</label>
          <div className="col-sm-10">
            <div className={hasError ? 'input-group has-error' : 'input-group'}>
              {input}
              <span className="input-group-btn">
                <button className="btn btn-success" onClick={this.updateProduct}>
                  <span className="glyphicon glyphicon-ok"/>
                </button>
                <button className="btn btn-default" onClick={this.hideForm}>
                  <span className="glyphicon glyphicon-menu-left"/>
                </button>
              </span>
            </div>
            {error}
          </div>
        </div>
    } else {
      component =
        <div className='form-group'>
          <label className='col-sm-2 control-label'>{label}</label>
          <div className="col-sm-10">
            <i className='admin-product__field-value'>{value}</i>
            <button className="btn btn-default pull-right" onClick={this.showForm}>
              <span className="glyphicon glyphicon-pencil"/>
            </button>
          </div>
        </div>
    }
    return (
      <div>{component}</div>
    );
  }
}
