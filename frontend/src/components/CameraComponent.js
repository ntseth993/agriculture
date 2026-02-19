import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FiCamera } from 'react-icons/fi';

export const CameraComponent = ({ onCapture }) => {
  const webcamRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);

  const startCamera = () => {
    setIsCameraActive(true);
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      onCapture(imageSrc);
      stopCamera();
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
  };

  if (!isCameraActive) {
    return (
      <button
        onClick={startCamera}
        className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
      >
        <FiCamera /> Open Camera
      </button>
    );
  }

  return (
    <div className="flex flex-col gap-4">
      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        className="w-full rounded-lg border-2 border-green-500"
      />
      <div className="flex gap-2">
        <button
          onClick={captureImage}
          className="flex-1 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
        >
          Capture
        </button>
        <button
          onClick={stopCamera}
          className="flex-1 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
