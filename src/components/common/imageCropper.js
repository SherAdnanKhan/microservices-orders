import React, { useRef, useCallback, useState, useEffect } from 'react';
import ReactCrop from 'react-image-crop';
import 'react-image-crop/dist/ReactCrop.css';
import ToolTip from "../common/toolTip/toolTip";
const ImageCropper = ({
  toggle, onToggle, onCompleteCrop,
  imageUrl, onSkip, croppedImage
}) => {
  const imgRef = useRef(null);
  const [crop, setCrop] = useState({ unit: '%', aspect: 15 / 15 });
  const [image, setImage] = useState(imageUrl);
  const [selected, setSelected] = useState('');

  const handleLoad = useCallback(img => {
    imgRef.current = img;
  }, []);

  useEffect(() => {
    if (imageUrl) {
      setImage(image => image = imageUrl)
    }
  }, [imageUrl]);

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

  const handleFlip = async () => {
    setSelected('flip');

    const myImage = new Image();
    myImage.src = image;

    const flipped = await flipHorizontally(myImage, 10, 0, 'newFile.jpeg');

    setImage(URL.createObjectURL(flipped));
    onCompleteCrop(flipped);
  };

  const flipHorizontally = (image, x, y, fileName) => {
    const canvas = document.createElement('canvas');
    canvas.width = image.width;
    canvas.height = image.height;
    const ctx = canvas.getContext('2d');

    ctx.translate(image.width, y);
    ctx.scale(-1, 1);
    ctx.drawImage(image, 0, 0);

    return new Promise((resolve) => {
      canvas.toBlob(blob => {
        if (!blob) {
          console.error('Canvas is empty');
          return;
        }
        blob.name = fileName;
        resolve(blob);
      }, 'image/jpeg');
    });
  }

  const handleRotate = async () => {
    let degrees = 90;

    setSelected('rotate');

    const myImage = new Image();
    myImage.src = image;

    const rotatedImage = await rotateImage('newFile.jpeg', myImage, degrees);
    console.log(rotatedImage);
    setImage(URL.createObjectURL(rotatedImage));

    onCompleteCrop(rotatedImage);
  }

  const rotateImage = (fileName, image, degrees) => {
    const canvas = document.createElement('canvas');

    canvas.width = image.height;
    canvas.height = image.width;

    // canvas.style.width = "20%";
    const ctx = canvas.getContext('2d');
    // ctx.drawImage(image, canvas.width / 2 - image.width / 2, canvas.height / 2 - image.width / 2);

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    ctx.translate(canvas.width / 2, canvas.height / 2);
    ctx.rotate(degrees * Math.PI / 180);
    // ctx.drawImage(image, -image.width / 2, -image.width / 2);

    ctx.drawImage(image, -image.width / 2, -image.height / 2)
    ctx.restore();

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
  }

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
                src={image}
                crop={crop}
                disabled={selected === 'crop' ? false : true}
                onImageLoaded={handleLoad}
                onChange={newCrop => setCrop(newCrop)}
                onComplete={newCrop => handleComplete(newCrop)}
                ruleOfThirds
              />
            </div>
            <div className="model-actions">
              <div className="options">
                <i
                  className={`fas fa-crop ${selected === 'crop' ? 'selected' : ''}`}
                  onClick={() => setSelected('crop')}
                  data-for="crop"
                  data-tip="Crop"
                >
                  <ToolTip position="top" id="crop" />
                </i>
                <i
                  className={`fab fa-flipboard ${selected === 'flip' ? 'selected' : ''}`}
                  onClick={handleFlip}
                  data-for="mirror"
                  data-tip="Flip"
                >
                </i>
                <ToolTip position="top" id="mirror" />
                <i
                  className={`fas fa-undo ${selected === 'rotate' ? 'selected' : ''}`}
                  onClick={handleRotate}
                  data-for="rotate"
                  data-tip="Rotate"
                >
                </i>
                <ToolTip position="top" id="rotate" />
              </div>

              <div className="done">
                <button className="btn-done" onClick={() => onToggle(false)}> Done </button>
              </div>

              {/* <button className="btn-done" onClick={() => onSkip(false)}> Skip cropping </button> */}
              {/* <button className="btn-done" onClick={handleRotate}> Rotate </button> */}

              {/* <button className="btn-done" onClick={handleFlip}> Flip </button> */}
              {/* {rotated && <img src={URL.createObjectURL(rotated)} />} */}
            </div>
          </div>
        )}
    </>
  );
};

export default ImageCropper;
