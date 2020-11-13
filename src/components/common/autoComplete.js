import React, { useEffect, useRef, useState } from 'react';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { alphabetsWithoutSpecialChars } from '../../constants/regex';
import { BehaviorSubject } from 'rxjs';

const InputAutoComplete = ({
  options, displayProperty, onChange, onSearchEnd,
  onSelect, placeholder, defaultValue, ...rest
}) => {
  const [list, setList] = useState([]);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);
  const [serachSubject] = useState(new BehaviorSubject(''));
  let searchQueryChangeObservable = useRef('');
  const optionRef = useRef();

  useEffect(() => {
    if (options) {
      setList(options || []);
    }
  }, [options]);


  useEffect(() => {
    searchQueryChangeObservable.current = serachSubject.pipe(
      debounceTime(500),
      distinctUntilChanged()
    );
  }, [serachSubject]);

  useEffect(() => {
    const subscription = searchQueryChangeObservable.current.subscribe(result => {
      if (alphabetsWithoutSpecialChars.test(result)) {
        onSearchEnd(result);
      }
    });
    return () => {
      subscription.unsubscribe();
    }
  }, [searchQueryChangeObservable, onSearchEnd]);

  const handleChange = ({ target: input }) => {
    onChange(input.value);
    if (input.value.length === 0) {
      setList([]);
    }

    optionRef.current.scrollTo(0, 0);
    setScrollHeight(0);

    serachSubject.next(input.value);
    setHighlightedIndex(0);;
  };

  const handleSelect = option => {
    if (option) {
      onSelect(option);
    }
    setList([]);
  };

  return (
    <div className="autocomplete">
      <input
        type="text"
        placeholder={placeholder}
        value={defaultValue}
        onChange={handleChange}
        {...rest}
        onKeyDown={e => {
          e.stopPropagation();
          if (e.keyCode === 40 && list) {

            if (highlightedIndex < list.length - 1) {
              setHighlightedIndex(highlightedIndex => highlightedIndex + 1);
              setScrollHeight(scrollHeight => scrollHeight + 40);
              optionRef.current.scrollTo(0, scrollHeight + 40);
            }
          } else if (e.keyCode === 38 && list) {
            if (list && highlightedIndex > 0) {
              setHighlightedIndex(highlightedIndex => highlightedIndex - 1);
              setScrollHeight(scrollHeight => scrollHeight - 40);
              optionRef.current.scrollTo(0, scrollHeight - 40);

            }
          } else if (e.keyCode === 13 && list) {
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
