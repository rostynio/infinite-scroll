import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {
  getBeersList,
  removeBeersFromList,
  setCurrentBeer
} from '../store/actions/actions';
import ListItem from '../components/ListItem/ListItem';
import '../components/ListItem/styles.css';

const Beers = ({
  getBeersList,
  list = [],
  loading,
  removeBeersFromList,
  setCurrentBeer
}) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [lastElement, setLastElement] = useState(null);
  const [firstElement, setFirstElement] = useState(null);
  const [startIndex, setStartIndex] = useState(0);
  const [checkedList, setCheckedList] = useState([]);
  const listRef = useRef(list);

  useEffect(() => {
    const bottomObserver = lastItemObserver.current;
    const topObserver = firstItemObserver.current;
    if (lastElement) {
      bottomObserver.observe(lastElement);
    }

    if (firstElement) {
      topObserver.observe(firstElement);
    }
  }, [firstElement, lastElement]);

  useEffect(() => {
    getBeersList(pageNumber);
  }, [getBeersList, pageNumber]);

  useEffect(() => {
    listRef.current = list;
  }, [list]);

  const lastItemObserver = React.useRef(
    new IntersectionObserver(
      entries => {
        const [first] = entries;
        if (first.isIntersecting) {
          setStartIndex(prevStartIndex => {
            const rest = listRef.current.length % 5;
            if (listRef.current.length - prevStartIndex - 10 <= rest) {
              setPageNumber(prevPageNumber => prevPageNumber + 1);
            }

            return prevStartIndex + 5;
          });
        }
      },
      { threshold: 1 }
    )
  );

  const firstItemObserver = React.useRef(
    new IntersectionObserver(
      entries => {
        const [first] = entries;
        if (first.isIntersecting) {
          setStartIndex(prevStartIndex => {
            if (prevStartIndex > 0) return prevStartIndex - 5;
            if (prevStartIndex === 0) return prevStartIndex;
          });
        }
      },
      { threshold: 1 }
    )
  );

  const setClassName = itemId => {
    if (checkedList.some(id => id === `${itemId}`)) {
      return 'item__toggled__wrapper';
    } else {
      return 'item__wrapper';
    }
  };

  const renderList = () => {
    const listForRender = [];
    const endIndex =
      startIndex + 10 > list.length ? list.length : startIndex + 10;
    for (let i = startIndex; i < endIndex; i++) {
      const lastRef = i === startIndex + 10 - 1 ? setLastElement : null;
      const startRef = i === startIndex ? setFirstElement : null;
      const checkRef = i === startIndex ? startRef : lastRef;
      listForRender.push(
        <li
          className={setClassName(list[i].id)}
          id={list[i].id}
          key={list[i].id}
          ref={checkRef}
          onContextMenu={setChecked}
          onClick={() => setCurrentBeer(list[i].id)}
        >
          <Link to={`/list/${list[i].id}`} className="item__link">
            <ListItem
              name={list[i].name}
              imageUrl={list[i].image_url}
              itemNumber={list[i].id}
            />
          </Link>
        </li>
      );
    }
    return listForRender;
  };

  const setChecked = e => {
    const currentTarget = e.currentTarget;
    e.preventDefault();
    let toggledList;
    setCheckedList(prevState => {
      if (checkedList.some(id => id === currentTarget.id)) {
        toggledList = prevState.filter(id => id !== currentTarget.id);
      } else {
        toggledList = [...prevState, currentTarget.id];
      }
      return toggledList;
    });
  };

  const removeItems = () => {
    removeBeersFromList(checkedList);
    setCheckedList([]);
  };

  const showButtonText = length => {
    if (length === 1) {
      return `Remove ${length} item`;
    } else {
      return `Remove ${length} items`;
    }
  };

  return (
    <div className="list__wrapper">
      {checkedList.length > 0 && (
        <button className="remove__button" onClick={removeItems}>
          {showButtonText(checkedList.length)}
        </button>
      )}
      <ul className="list">
        {!!list.length && renderList()}
        {loading && <li>Loading...</li>}
      </ul>
    </div>
  );
};

function mapStateToProps({ beersList }) {
  const { beerList, isLoading } = beersList;
  return {
    list: beerList,
    loading: isLoading
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { getBeersList, removeBeersFromList, setCurrentBeer },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Beers);
