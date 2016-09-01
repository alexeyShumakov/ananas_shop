import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import Slider from 'react-slick';
import _ from 'lodash';

export default class LastSeen extends React.Component {
  constructor(props, context) {
    super(props, context);
    let _this = this;
    this.state = {items: Immutable.List([])}
    props.fetchLastSeen().then((resp)=>{
      let items = Immutable.fromJS(resp.data.products);
      _this.setState({items});
    })

  }

  coverUrl(pictures, defaultUrl) {
    if (!pictures.isEmpty()) {
      let coverPic = pictures.find( p => {
        return p.get('is_hover');
      }) || pictures.first();
      return coverPic.get('thumb');
    } else {
      return defaultUrl;
    }
  }
  render() {
    let { product } = this.props;
    let itemsElements;
    let {items} = this.state;
    items = items.filter((item) => {
      return item.get('id') != product.get('id');
    });
    if (!items.isEmpty()) {
      itemsElements = items.map((item, key) => {
        let thumbCoverUrl = this.coverUrl(item.get('pictures'), item.get('default_thumb_cover_url'));
        return <div key={key} className='similar__slide'>
            <a href={`/products/${item.get('id')}`}>
              <img src={thumbCoverUrl} />
            </a>
            <div className='hidden-xs'>
              <div> {item.get('title')} </div>
              <div><b>{item.get('price')} руб.</b></div>
            </div>
          </div>
      })
    }
    let settings = {
      dots: false,
      infinite: false,
      slidesToShow: 8,
      responsive: [
        {
          breakpoint: 1000,
          settings: {
            slidesToShow: 5,
            slidesToScroll: 1,
          }
        },
        {
          breakpoint: 700,
          settings: {
            slidesToShow: 2,
            slidesToScroll: 1
          }
        }
      ]
    };
    return (
      <div className='col-md-12'>
        <h4>Вы смотрели</h4>
        <Slider {...settings}>
          {itemsElements}
        </Slider>
      </div>
    );
  }
}
