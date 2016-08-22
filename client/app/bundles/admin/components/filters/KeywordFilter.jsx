import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

export default class CategoryFilter extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = { value: props.filter.get('value')};
    _.bindAll(this, 'handleChange', 'updateFilter');
    this.updateFilter = _.debounce(this.updateFilter, 300);
  }

  handleChange(e) {
    let value = e.target.value;
    this.setState({value: value});
    this.updateFilter();
  }

  updateFilter(){
    let { filter, updateFilter } = this.props;
    let value = this.state.value;
    let newFilter = filter.set('params', Immutable.List([value]));
    updateFilter(newFilter);
  }

  render() {
    let { filter } = this.props;
    let { value } = this.state;
    return(
      <div className='form'>
        <div className="form-group">
          <input className="form-control" value={value} onChange={this.handleChange} />
        </div>
      </div>);
  }
}
