import React from 'react'

const Stroke = ({ hasStroke, onStroke, onUnstroke, className }) => {
  return (
    <>
      {hasStroke
        ? (
          <img
            className={className}
            src="/assets/images/strokeiconfull.png"
            alt=""
            onClick={onUnstroke}
          />
        ) : (
          <img
            className={className}
            src="/assets/images/strokeiconem.png"
            alt=""
            onClick={onStroke}
          />
        )
      }
    </>
  )
}

export default Stroke
