import React, { useRef, useState } from 'react';
import Webcam from 'react-webcam';
import { FiCamera, FiUpload } from 'react-icons/fi';

export const ImageUploadComponent = ({ onImageCapture }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [preview, setPreview] = useState(null);

  // Camera capture
  const startCamera = () => {
    setIsCameraActive(true);
    setPreview(null);
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPreview(imageSrc);
      onImageCapture(imageSrc);
      stopCamera();
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
  };

  // File upload
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
        onImageCapture(file);
      };
      reader.readAsDataURL(file);
    }
  };

  if (isCameraActive) {
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
  }

  if (preview) {
    return (
      <div className="flex flex-col gap-4">
        <img src={preview} alt="Preview" className="w-full rounded-lg border-2 border-green-500" />
        <button
          onClick={() => setPreview(null)}
          className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600"
        >
          Choose Different Image
        </button>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      <button
        onClick={startCamera}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 font-medium"
      >
        <FiCamera size={20} /> Take Photo with Camera
      </button>
      <button
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center gap-2 px-4 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium"
      >
        <FiUpload size={20} /> Upload from File
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileUpload}
        className="hidden"
      />
    </div>
  );
};
