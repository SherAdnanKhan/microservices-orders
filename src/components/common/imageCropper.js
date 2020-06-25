import React, { useRef, useCallback, useState } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import { isEmpty } from '../../utils/helperFunctions';

const ImageCropper = ({
  toggle, onToggle, onCompleteCrop,
  imageUrl, onSkip, croppedImage
}) => {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', aspect: 15 / 15 });

  const handleLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  const handleComplete = async (crop) => {
    try {
      await makeClientCrop(crop);
    } catch (ex) {
      console.log(ex.message);
    }
  };

  const makeClientCrop = async (crop) => {
    if (imgRef && crop.width && crop.height) {
      const croppedImageUrl = await getCroppedImg(
        imgRef.current,
        crop,
        'newFile.jpeg'
      );
      onCompleteCrop(croppedImageUrl);
    }
  };

  const getCroppedImg = (image, crop, fileName) => {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = crop.width;
    canvas.height = crop.height;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(
      image,
      crop.x * scaleX,
      crop.y * scaleY,
      crop.width * scaleX,
      crop.height * scaleY,
      0,
      0,
      crop.width,
      crop.height
    );

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        if (!blob) {
          // reject(new Error('Canvas is empty'));
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        // const fileUrl = window.URL.createObjectURL(blob);
        resolve(blob);
      }, 'image/jpeg');
    });
  };

  return (
    <>
      {toggle
        && (
          <div className="model">
            <div className="model-image">
              <ReactCrop
                src={imageUrl}
                crop={crop}
                onImageLoaded={handleLoad}
                onChange={newCrop => setCrop(newCrop)}
                onComplete={newCrop => handleComplete(newCrop)}
                ruleOfThirds
              />
            </div>
            <div className="model-actions">
              {!isEmpty(croppedImage) &&
                <button className="btn-done" onClick={() => onToggle(false)}> Done </button>
              }
              <button className="btn-done" onClick={() => onSkip(false)}> Skip cropping </button>
            </div>
          </div>
        )}
    </>
  );
};

export default ImageCropper;
