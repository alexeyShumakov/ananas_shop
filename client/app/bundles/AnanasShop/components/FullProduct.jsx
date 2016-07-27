import React, { PropTypes } from 'react';
import Gallery from 'react-image-gallery';

import Loader from './Loader';
import AddToCart from './fullProduct/AddToCart';

export default class FullProduct extends React.Component {
  static propTypes = {
  };

  constructor(props, context) {
    super(props, context);
    let _this = this;
    this.state = {loading: true};
    let { productId, fetchProduct} = props;
    fetchProduct(productId).then(() => {
      _this.setState({loading: false});
    })
  }

  render() {
    let productComp;
    let { product, productId, addToCart, selectedProductId } = this.props;

    if (this.state.loading) {
      productComp = <Loader/>
    } else {
      let title = product.get('title');
      let price = product.get('price');
      let description = product.get('description');
      let pictures = product.get('pictures');
      let startIndex = 0;
      let galleryImages = pictures.map( (pic, i) => {
        if (pic.get('is_hover')) {
          startIndex = i;
        }
        return {
          original: pic.get('medium'),
          thumbnail: pic.get('thumb')
        }
      }).toJS();
      productComp =
        <div className='row'>
          <div className="col-md-5">
            <Gallery
              items={galleryImages}
              slideOnThumbnailHover={true}
              showNav={false}
              startIndex={startIndex}
            />
          </div>
          <div className="col-md-7">
            <dl className="dl-horizontal">
              <dt>Название</dt>
              <dd>{title}</dd>
              <dt>Цена</dt>
              <dd>{price} руб.</dd>
              <dt>Описание</dt>
              <dd>{description}</dd>
            </dl>
            <AddToCart {...{addToCart, productId, selectedProductId}} />
          </div>
        </div>
    }
    return (
      <div className='full-product'>{productComp}</div>
    );
  }
}
