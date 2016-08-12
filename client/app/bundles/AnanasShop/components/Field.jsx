import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Immutable from 'immutable';

export default class Field extends React.Component {

  constructor(props, context) {
    super(props, context);
    let { model, field } = props;
    let value = model.get(props.field);
    value = value || '';
    this.state = { isEdit: false, value: value }
    _.bindAll(this, 'updateModel', 'setValue', 'showForm', 'hideForm', 'enterEvent');
  }

  updateModel() {
    let _this = this;
    let { model, updateModel, field } = this.props;
    let newModel = model.set(field, this.state.value);
    updateModel(newModel).then(isSuccess => {
     if (isSuccess) { _this.hideForm() }
    })
  }

  enterEvent(e) {
    if (e.key == 'Enter') {
      this.updateModel();
    } else if(e.key == 'Escape') {
      this.hideForm();
    }
  }

  setValue(e) {
    this.setState({value: e.target.value});
  }

  showForm(e) {
    e.preventDefault();
    this.setState({ isEdit: true});
  }

  hideForm() {
    let { model, field, label } = this.props;
    let value = model.get(field) || '';
    this.setState({ isEdit: false, value: value });
  }
  render() {
    let component, error, input;
    let { isEdit, value } = this.state;
    let { model, field, label } = this.props;
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
          onChange={this.setValue}/>

      component =
        <div className='form-group'>
          <label className='col-sm-2 control-label'>{label}</label>
          <div className="col-sm-10">
            <div className='input-group'>
              {input}
              <span className="input-group-btn">
                <button className="btn btn-success" onClick={this.updateModel}>
                  <span className="glyphicon glyphicon-ok"/>
                </button>
                <button className="btn btn-default" onClick={this.hideForm}>
                  <span className="glyphicon glyphicon-menu-left"/>
                </button>
              </span>
            </div>
          </div>
        </div>
    } else {
      let valueBlock;
      if (value) {
        valueBlock =
          <div className='col-sm-10'>
            <i className='profile__field-value'>{value}</i>
            <button className="btn btn-default pull-right" onClick={this.showForm}>
              <span className="glyphicon glyphicon-pencil"/>
            </button>
          </div>
      } else {
        valueBlock =
          <div className='col-sm-10'>
            <a href="#" className='profile__field-value' onClick={this.showForm}>
              Добавить...
            </a>
          </div>
      }
      component =
        <div className='form-group'>
          <label className='col-sm-2 control-label'>{label}</label>
          {valueBlock}
        </div>
    }
    return (
      <div>{component}</div>
    );
  }
}
