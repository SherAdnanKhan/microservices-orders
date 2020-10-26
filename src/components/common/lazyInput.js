import React, { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { alphabetsWithoutSpecialChars } from '../../constants/regex';

const LazyInput = ({ id, name, action, clearAction, type = 'text', ...rest }) => {
  const [serachSubject] = useState(new BehaviorSubject(''));
  const [query, setQuery] = useState('');
  let searchQueryChangeObservable = useRef('');
  const dispatch = useDispatch();

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
      dispatch(clearAction());
    }
    serachSubject.next(input.value);
    setQuery(input.value);
  }

  return (
    <>
      <input
        type={type}
        name={name}
        id={id}
        value={query}
        onChange={handleChange}
        {...rest}
      />
    </>
  )
}

export default React.memo(LazyInput);
