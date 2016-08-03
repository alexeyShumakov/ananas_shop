import React, { PropTypes } from 'react';
import _ from 'lodash';

export default class AddToButton extends React.Component {

  constructor(props, context) {
    super(props, context);
    this.state = {isLoading: true};
    let _this = this;
    let {params, fetchCategory } = props;
    fetchCategory(params.category);
  }
  render() {
    let { category } = this.props;
    let breadcrumb;
    let title = category.get('title');
    if (!category.isEmpty()) {
      let nodes = category.get('ancestors').map((cat, key) => {
        return <li {...{key}}><a href={`/categories/${cat.get('id')}`}>{cat.get('title')}</a></li>
      })
      breadcrumb =
        <ol className='breadcrumb'>
          <li><a href="/"><span className="glyphicon glyphicon-home"></span></a></li>
          {nodes}
          <li>{category.get('title')}</li>
        </ol>
    }
    return (
      <div>
        {breadcrumb}
        <h2>{title}</h2>
      </div>
    );
  }
}
