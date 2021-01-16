import React, { Component } from 'react';
import Spinner from '../spinner';

import './item-details.css';

export default class ItemDetails extends Component {

  state = {
    item: null,
    loading: false,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId ||
      this.props.getData !== prevProps.getData ||
      this.props.getImageUrl !== prevProps.getImageUrl) { // or endless loop
      this.updateItem();
    }
  }

  updateItem() {
    const { itemId, getData, getImageUrl } = this.props;
    
    if (itemId) {
      this.setState({
        loading: true
      });

      getData(itemId)
        .then(item => {
          this.setState({
            item,
            loading: false,
            image: getImageUrl(item)
          });
        });
    }
  }

  render() {
    if (!this.state.item) {
      return <span>Select an item from the list</span>
    }

    const { item, loading, image } = this.state;

    const content = loading ? <Spinner/> :
      <ItemView item={item} image={image} children={this.props.children}/>

    return (
      <div className="person-details card">
        {content}
      </div>
    );
  }
}

const ItemView = ({ item, image, children }) => {
  const { name } = item;

  return (
    <>
      <img className="person-image"
        src={image}
        alt="person details"/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          { React.Children.map(children, (child) => {
            return React.cloneElement(child, { item });
          }) }
        </ul>
      </div>
    </>
  );
}

const Record = ({ item, field, label}) => {
  return (
    <li className="list-group-item">
      <span className="term">{label}</span>
      <span>{item[field]}</span>
    </li>
  );
};

export { Record };