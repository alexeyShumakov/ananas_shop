import React, { PropTypes } from 'react';
import Gallery from 'react-image-gallery';

import Loader from './Loader';
import AddToCart from './fullProduct/AddToCart';
import FieldsList from './fullProduct/FieldsList';

export default class ModalProduct extends React.Component {
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
      productComp = <div className="loader"/>
    } else {
      let fields = product.get('products_fields');
      let title = product.get('title');
      let price = product.get('price');
      let similar = product.get('similar');
      let description = product.get('description');
      let pictures = product.get('pictures');
      let forExample = product.get('example');
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
      if (galleryImages.length < 1) {
        galleryImages = [{
          original: product.get('medium_cover_url'),
          thumbnail: product.get('thumb_cover_url')
        }]
      }
      let exampleElement;
      if(forExample) {
        exampleElement = <div><b>Продукт выставлен для примера</b></div>
      }
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
            <h3>{title}</h3>
            {exampleElement}
            <h2 className='text-primary'><b>{price} руб.</b></h2>
            <p>{description}</p>
            <FieldsList {...{fields}}/>
            <AddToCart {...{addToCart, productId, selectedProductId}} />
          </div>
        </div>
    }
    return (
      <div className='full-product'>{productComp}</div>
    );
  }
}
