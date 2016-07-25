import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Loader extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'deletePicture');
  }

  deletePicture() {
    let { picture, deletePicture } = this.props;
    deletePicture(picture.get('id'));
  }
  render() {
    let { picture } = this.props;
    return (
      <div>
        <img src={picture.get('thumb')}/>
        <button className='btn btn-danger' onClick={this.deletePicture}>delete</button>
      </div>
    );
  }
}
