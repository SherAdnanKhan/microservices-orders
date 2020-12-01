import React, { useCallback, useEffect, useRef, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

const LazyInput = ({ id, name, time, value, onSearchComplete, onChange, showInput = true, type = 'text', ...rest }) => {
  const [searchSubject] = useState(new BehaviorSubject(''));
  let searchQueryChangeObservable = useRef('');

  const textarea = document.querySelector(".autoExpand");
  const resizeTextArea = useCallback(() => {
    if (textarea) {
      textarea.style.height = "";
      if (textarea.scrollHeight > 82) {
        textarea.style.overflowY = 'scroll';
        textarea.style.height = textarea.scrollHeight + "px";
      }
      else {
        textarea.style.height = Math.min(textarea.scrollHeight - 20, 300) + "px";
      }
    }
  }, [textarea])

  useEffect(() => {
    resizeTextArea();
  }, [value, resizeTextArea])

  useEffect(() => {
    searchQueryChangeObservable.current = searchSubject.pipe(
      debounceTime(time),
      distinctUntilChanged()
    );
  }, [searchSubject, time]);

  useEffect(() => {
    const subscription = searchQueryChangeObservable.current.subscribe(result => {
      onSearchComplete(result);
    });

    return () => {
      subscription.unsubscribe();
    }
  }, [searchQueryChangeObservable, onSearchComplete]);

  const handleChange = ({ target: input }) => {
    searchSubject.next(input.value);
    onChange(input.value);
  }



  return (
    <>
      {showInput
        ? (
          <input
            autoFocus
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={handleChange}
            {...rest}
          />
        ) : (
          <textarea
            className="autoExpand"
            autoFocus
            type={type}
            name={name}
            id={id}
            value={value}
            onChange={handleChange}
            {...rest}
            rows={1}
          ></textarea>
        )
      }
    </>
  )
}

export default React.memo(LazyInput);
