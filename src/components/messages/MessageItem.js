import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

const MessageItem = ({msg: {content, image, timestamp, user: {name, avatar}}}) => {
  return (
    <Fragment>
      <li className="collection-item avatar">
        <img src={avatar} alt="" className="circle" />
        <span className="title">
          <strong>{name}</strong> 
          <span> <small> {moment(timestamp).fromNow()}</small></span>
        </span>
        <p>{content && content}</p>
        {image && <img style={{ width: '100%', height: 'auto' }} src={image} /> }
      </li>
    </Fragment>
  )
}

MessageItem.propTypes = {

}

export default MessageItem;
