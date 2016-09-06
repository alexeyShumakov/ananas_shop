import React, { PropTypes } from 'react';
import Immutable from 'immutable';
import _ from 'lodash';

import DDMenu from './categoriesMenu/DropDownMenu';
import RootLink from './categoriesMenu/RootLink';

export default class CategoriesMenu extends React.Component {

  constructor(props, context) {
    super(props, context);
    let _this = this;
    this.state = { roots: Immutable.List([])};
    props.actions.fetchCategoriesRoots().then((resp)=> {
      let roots = Immutable.fromJS(resp.data.categories);
      _this.setState({roots});
    });
  }

  render() {
    let { roots } = this.state;
    roots = roots.map((category, key) => {
      return <RootLink key={key} category={category}/>
    })
    return (
      <div className="row categories-menu">
        <ul className="list-inline">
          {roots}
        </ul>
      </div>
    );
  }
}
