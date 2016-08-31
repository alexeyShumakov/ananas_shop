import React, { PropTypes } from 'react';
import Slider from 'react-slick';
import _ from 'lodash';

export default class Similar extends React.Component {
  constructor(props, context) {
    super(props, context);
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
    let {items} = this.props;
    items = items.map((item, key) => {
      let thumbCoverUrl = this.coverUrl(item.get('pictures'), item.get('default_thumb_cover_url'));
      return <div key={key} className='similar__slide'>
        <a href={`/products/${item.get('id')}`}>
          <img src={thumbCoverUrl}/>
        </a>
      </div>
    })
    let settings = {
      dots: false,
      infinite: false,
      slidesToShow: 3,
      slidesToScroll: 1
    };
    return (
      <div>
        <h3 className='text-center'>Так же вас может заинтересовать</h3>
        <Slider {...settings}>
          {items}
        </Slider>
      </div>
    );
  }
}
