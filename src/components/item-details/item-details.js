import React, { Component } from 'react';
import SwapiService from '../../services/swapi-service';
import Spinner from '../spinner';

import './item-details.css';

export default class ItemDetails extends Component {

  swapiService = new SwapiService();
  state = {
    item: null,
    loading: false,
    image: null
  };

  componentDidMount() {
    this.updateItem();
  }

  componentDidUpdate(prevProps) {
    if (this.props.itemId !== prevProps.itemId) { // or endless loop
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

    const content = loading ? <Spinner/> : <ItemView item={item} image={image}/>

    return (
      <div className="person-details card">
        {content}
      </div>
    );
  }
}

const ItemView = ({ item, image }) => {
  const { id, name, gender, birthYear, eyeColor } = item;

  return (
    <>
      <img className="person-image"
        src={image}
        alt="person details"/>

      <div className="card-body">
        <h4>{name}</h4>
        <ul className="list-group list-group-flush">
          <li className="list-group-item">
            <span className="term">Gender</span>
            <span>{gender}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Birth Year</span>
            <span>{birthYear}</span>
          </li>
          <li className="list-group-item">
            <span className="term">Eye Color</span>
            <span>{eyeColor}</span>
          </li>
        </ul>
      </div>
    </>
  );
}