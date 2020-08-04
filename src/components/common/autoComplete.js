import React, { useState, useEffect, useRef } from 'react';

const InputAutoComplete = ({
  options, displayProperty, onChange,
  onSelect, placeholder, defaultValue
}) => {
  const [list, setList] = useState([]);
  const [selected, setSelected] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const [scrollHeight, setScrollHeight] = useState(0);

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

  const handleChange = ({ target: input }) => {
    optionRef.current.scrollTo(0, 0);
    setScrollHeight(0);

    setSelected(input.value);
    onChange(input.value);
    setHighlightedIndex(0);
  };

  const handleSelect = option => {
    setSelected(option[displayProperty]);
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
            handleSelect(options[highlightedIndex]);
          }
        }}
      />
      <div
        className="suggestions"
        ref={ref => optionRef.current = ref}
      >
        {list
          && list.map((option, index) => (
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
