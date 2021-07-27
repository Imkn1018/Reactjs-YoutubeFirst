import React from 'react';
import Style from './SideListItem.module.scss';
import { Link } from 'react-router-dom';

export const SideListItem = ({ id, src, title, channel_name }) => {
  return (
    <Link className={Style.item} to={{ pathname: 'watch', search: `?v=${id}` }}>
      <img src={src} alt={title} />
      <div className={Style.info}>
        <span>{title}</span>
        <p>{channel_name}</p>
      </div>
    </Link>
  );
};
