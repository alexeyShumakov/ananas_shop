import React, { PropTypes } from 'react';
import _ from 'lodash';

import Image from './Image';

export default class Sidebar extends React.Component {

  constructor(props, context) {
    super(props, context);
  }

  render() {
    let { pictures, deletePicture, updatePicture } = this.props;
      pictures = pictures.map( pic => {
        return <Image
          key={pic.get('id')}
          picture={pic}
          deletePicture={deletePicture}
          updatePicture={updatePicture}/>
      })
    return (
      <ul className='list-inline'>
        {pictures}
      </ul>
    );
  }
}
