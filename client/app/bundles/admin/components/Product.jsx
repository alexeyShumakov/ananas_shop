import React, { PropTypes } from 'react';
import _ from 'lodash';
import axios from '../utils/axios';

export default class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'uploadImage');
  }

  uploadImage(event) {
    let formData = new FormData();
    formData.append('image', event.target.files[0]);
    axios.post('/api/v1/images', formData);
  }
  render() {
    let { test } = this.props;
    return (
      <div>
        <button className='btn btn-default' onClick={test}>click me</button>
        <input type='file' onChange={this.uploadImage}/>
      </div>
    );
  }
}
