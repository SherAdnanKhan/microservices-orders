import React, { useEffect } from 'react';
import { BehaviorSubject } from 'rxjs';
import { filter, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { alphabetsWithoutSpecialChars } from '../../constants/regex';

const serachSubject = new BehaviorSubject('');
const searchQueryChangeObservable = serachSubject.pipe(
  filter(value => value.length > 0),
  debounceTime(1000),
  distinctUntilChanged()
);

const useObservable = (observable, callback) => {
  useEffect(() => {
    const subscription = observable.subscribe(result => {
      if (alphabetsWithoutSpecialChars.test(result)) {
        callback(result)
      }
    });
    return () => subscription.unsubscribe();
  }, [observable, callback])
}

const LazyInput = ({ id, name, value, onChange, onSearchComplete, type = 'text', ...rest }) => {
  useObservable(searchQueryChangeObservable, onSearchComplete);

  const handleChange = ({ target: input }) => {
    serachSubject.next(input.value);
    onChange(input.value);
  }

  return (
    <>
      <input
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
