import React, { useEffect, useRef, useState } from "react";

const HorizontalInfiniteScroller = ({ dataLength, onNextPage, hasMore, children }) => {
  const [shouldCallNext, setShouldCallNext] = useState(false);
  const scrollRef = useRef();

  useEffect(() => {
    if (dataLength)
      setShouldCallNext(shouldCallNext => shouldCallNext = true);
  }, [dataLength]);

  const handleScroll = () => {
    const scrollLeft = scrollRef.current.scrollLeft;
    const scrollWidth = scrollRef.current.scrollWidth;
    const clientWidth = scrollRef.current.clientWidth
    const percentage = (scrollLeft / (scrollWidth - clientWidth)) * 100;

    if (percentage > 70 && shouldCallNext && hasMore) {
      onNextPage();
      setShouldCallNext(false);
    }
  }
  return (
    <div
      style={{ overflowX: 'auto' }}
      ref={scrollRef}
      onScroll={handleScroll}
    >
      {children && children}
    </div>
  )
}
export default HorizontalInfiniteScroller;