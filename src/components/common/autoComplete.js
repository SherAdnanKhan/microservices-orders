import React, { useEffect, useRef, useState } from 'react';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { alphabetsWithoutSpecialChars } from '../../constants/regex';
import { BehaviorSubject } from 'rxjs';
import { useDispatch } from "react-redux";

const InputAutoComplete = ({
  options, displayProperty, onChange,
  onSelect, placeholder, defaultValue, action, clearAction, clearArtName, clearError, ...rest
}) => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [serachSubject] = useState(new BehaviorSubject(''));
  let searchQueryChangeObservable = useRef('');
  const dispatch = useDispatch();
  const optionRef = useRef();

  useEffect(() => {
    if (options) {
      setList(options);
    }
  }, [options]);

  useEffect(() => {
    if (defaultValue) {
      setSelected(selected => selected = defaultValue);
    }
  }, [defaultValue]);

  useEffect(() => {

    searchQueryChangeObservable.current = serachSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
  }, [serachSubject]);

  useEffect(() => {
    const subscription = searchQueryChangeObservable.current.subscribe(result => {
      if (alphabetsWithoutSpecialChars.test(result)) {
        dispatch(action(result));
      }
    });
    return () => {
      subscription.unsubscribe();
    }
  }, [searchQueryChangeObservable, action, dispatch]);


  const handleChange = ({ target: input }) => {
    if (input.value.length === 0) {
      setList([]);
      clearArtName();
    }
    else {
      clearError()
    }
    optionRef.current.scrollTo(0, 0);
    setScrollHeight(0);
    setSelected(input.value);
    serachSubject.next(input.value);
    setHighlightedIndex(0);;
  };

  const handleSelect = option => {
    if (option) {
      setSelected(option[displayProperty]);
    }
    onSelect(option);
    setList(null);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder={placeholder}
        value={selected}
        onChange={handleChange}
        {...rest}
        onKeyDown={e => {
          if (e.keyCode === 40) {
            if (highlightedIndex < list.length - 1) {
              setHighlightedIndex(highlightedIndex => highlightedIndex + 1);
              setScrollHeight(scrollHeight => scrollHeight + 40);
              optionRef.current.scrollTo(0, scrollHeight + 40);
            }
          } else if (e.keyCode === 38) {
            if (highlightedIndex > 0) {
              setHighlightedIndex(highlightedIndex => highlightedIndex - 1);
              setScrollHeight(scrollHeight => scrollHeight - 40);
              optionRef.current.scrollTo(0, scrollHeight - 40);

            }
          } else if (e.keyCode === 13) {
            options &&
              handleSelect(options[highlightedIndex]);
          }
        }}
      />
      <div
        className="suggestions"
        ref={ref => optionRef.current = ref}
      >
        {list
          && options && list?.map((option, index) => (
            <div
              className={option === options[highlightedIndex] ? 'highlight' : ''}
              key={index}
              onMouseOver={() => setHighlightedIndex(index)}
              onClick={() => handleSelect(option)}
            >
              {option[displayProperty]}
            </div>
          ))}
      </div>
    </div>
  );
};
export default InputAutoComplete;
