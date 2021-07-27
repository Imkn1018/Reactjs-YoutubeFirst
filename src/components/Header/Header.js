import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import { Store } from '../../store/index';
import Style from './Header.module.scss';

export const Header = (props) => {
  const [term, setTerm] = useState('');
  const histroy = useHistory();
  const { globalState, setGloabalState } = useContext(Store);
  const handleSubmit = (e) => {
    e.preventDefault();
    setGloabalState({ type: 'SET_TERM', payload: { term } });
    histroy.push(`/search?query=${term}`);
  };
  useEffect(() => {
    setTerm(globalState.term);
  }, []);
  return (
    <div className={Style.header}>
      <div className={Style.item}>
        <Link to="/">Video Tube</Link>
      </div>
      <div className={Style.item}>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Search"
            onChange={(e) => setTerm(e.target.value)}
            value={term}
          />
          <button type="submit">
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </form>
      </div>
    </div>
  );
};
