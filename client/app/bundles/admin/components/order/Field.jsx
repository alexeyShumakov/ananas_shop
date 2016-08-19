import React, { PropTypes } from 'react';
import ReactDOM from 'react-dom';
import _ from 'lodash';
import Immutable from 'immutable';

export default class Field extends React.Component {

  constructor(props, context) {
    super(props, context);
    let { model, field } = props;
    this.state = { isEdit: false, value: model.get(props.field), errors: Immutable.Map() }
    _.bindAll(this, 'updateModel', 'setModel', 'showForm', 'hideForm', 'enterEvent');
  }

  updateModel() {
    let _this = this;
    let { model, updateModel, field, fetchModel } = this.props;
    let newModel = model.set(field, this.state.value);
    updateModel(model.get('id'), newModel).then(
      () => {
        fetchModel(model.get('id')).then(() =>{
          _this.hideForm();
        })
      }, (errors) => {
        _this.setState({errors: Immutable.fromJS(errors.data)});
      });
  }

  enterEvent(e) {
    if (e.key == 'Enter') {
      this.updateModel();
    } else if(e.key == 'Escape') {
      this.setState({errors: Immutable.Map()});
      this.hideForm();
    }
  }

  setModel(e) {
    this.setState({value: e.target.value});
  }

  showForm() {
    this.setState({ isEdit: true});
  }

  hideForm() {
    let { model, field } = this.props;
    this.setState({ isEdit: false, value: model.get(field)});
  }
  render() {
    let component, error, input;
    let { isEdit, value, errors } = this.state;
    let { model, field, label } = this.props;
    let hasError = !errors.isEmpty();
    if (hasError) {
      error = <span className='help-block'>{errors.get(field).first()}</span>
    }
    if (isEdit) {
      component =
        <div className={hasError ? 'form-group has-error' : 'form-group'}>
          <label className='col-sm-2 control-label'>{label}</label>
          <div className="col-sm-10">
            <div className={hasError ? 'input-group has-error' : 'input-group'}>
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
                onChange={this.setModel}/>
              <span className="input-group-btn">
                <button className="btn btn-success" onClick={this.updateModel}>
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
