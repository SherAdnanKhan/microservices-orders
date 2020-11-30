import React, { useEffect, useRef, useState } from 'react';
import { BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { useLocation } from "react-router-dom";

const LazyInput = ({ id, name, time, value, onSearchComplete, onChange, type = 'text', ...rest }) => {
  const [searchSubject] = useState(new BehaviorSubject(''));
  let searchQueryChangeObservable = useRef('');
  const location = useLocation();
  const url = location?.pathname?.split('/')[1];

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
  var textarea = document.querySelector(".autoExpand");
  if (textarea) {
    textarea.oninput = function () {
      textarea.style.height = "";
      if (textarea.scrollHeight > 82) {
        console.log("reached at final", textarea.style);
        textarea.style.overflowY = 'scroll';
        textarea.style.height = textarea.scrollHeight + "px";
      }
      else {
        console.log("else part=", textarea.scrollHeight)
        textarea.style.height = Math.min(textarea.scrollHeight - 20, 300) + "px";
      }
    };
  }

  return (
    <>
      {url !== "chat" ?
        <input
          autoFocus
          type={type}
          name={name}
          id={id}
          value={value}
          onChange={handleChange}
          {...rest}
        />
        :
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
      }
    </>
  )
}

export default React.memo(LazyInput);
