import React, { useEffect, useRef, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { alphabetsWithoutSpecialChars } from '../../constants/regex';

const LazyInput = ({ id, name, time, value, onSearchComplete, onChange, type = 'text', ...rest }) => {

  const [searchSubject] = useState(new BehaviorSubject(''));
  let searchQueryChangeObservable = useRef('');

  useEffect(() => {
    searchQueryChangeObservable.current = searchSubject.pipe(
      debounceTime(time),
      distinctUntilChanged()
    );
  }, [searchSubject]);

  useEffect(() => {
    const subscription = searchQueryChangeObservable.current.subscribe(result => {
      if (alphabetsWithoutSpecialChars.test(result)) {
        onSearchComplete(result);
      }
    });
    return () => {
      subscription.unsubscribe();
    }
  }, [searchQueryChangeObservable, onSearchComplete]);

  const handleChange = ({ target: input }) => {
    searchSubject.next(input.value);
    onChange(input.value)
  }

  return (
    <>
      <input
        autoFocus
        type={type}
        name={name}
        id={id}
        value={value}
        onChange={handleChange}
        {...rest}
      />
    </>
  )
}

export default React.memo(LazyInput);
