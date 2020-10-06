import React from 'react'

const Stroke = ({ hasStroke, onStroke, onUnstroke, className }) => {
  return (
    <>

      {hasStroke
        ? (
          <img
            className={className + ' clickable'}
            src="/assets/images/stroke.png"
            alt=""
            onClick={onUnstroke}
            data-for="stroke"
            data-tip="unStroke"
          />
        ) : (
          <img
            className={className + ' clickable'}
            src="/assets/images/unstroke.png"
            alt=""
            onClick={onStroke}
            data-for="stroke"
            data-tip="stroke"
          />
        )
      }
    </>
  )
}

export default Stroke;
