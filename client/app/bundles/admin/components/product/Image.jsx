import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class Loader extends React.Component {
  constructor(props, context) {
    super(props, context);
    _.bindAll(this, 'deletePicture', 'setAsHover');
  }

  deletePicture() {
    let { picture, deletePicture } = this.props;
    deletePicture(picture.get('id'));
  }

  setAsHover() {
    let { picture, updatePicture } = this.props;
    updatePicture(picture.get('id'), {is_hover: true});
  }
  render() {
    let { picture } = this.props;
    let coverLabel;
    let coverButton;
    if (picture.get('is_hover')) {
      coverLabel =
        <span className="label label-success admin-products-image__hover-label">
          <span className="glyphicon glyphicon-paperclip">Обложка</span>
        </span>
    } else {
      coverButton =
        <button
          className='btn btn-primary admin-products-image__hover-button'
          onClick={this.setAsHover}>
          <span className='glyphicon glyphicon-paperclip'></span>
        </button>
    }
    return (
      <li className='admin-products-image'>
        <img src={picture.get('thumb')}/>
        <div className="admin-products-image__control-block btn-group btn-group-sm">
          <button
            className='admin-products-image__delete-button btn btn-danger'
            onClick={this.deletePicture}>
            <span className='glyphicon glyphicon-remove'></span>
          </button>
          {coverButton}
        </div>
        {coverLabel}
      </li>
    );
  }
}
