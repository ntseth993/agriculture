import React, { useRef, useState, useCallback } from 'react';
import Webcam from 'react-webcam';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCamera, FiUpload, FiX, FiRefreshCw, FiCheck } from 'react-icons/fi';

export const ImageUploadComponent = ({ onImageCapture }) => {
  const webcamRef = useRef(null);
  const fileInputRef = useRef(null);
  const [isCameraActive, setIsCameraActive] = useState(false);
  const [preview, setPreview] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [activeTab, setActiveTab] = useState('upload');

  const startCamera = () => {
    setActiveTab('camera');
    setIsCameraActive(true);
    setPreview(null);
  };

  const captureImage = () => {
    if (webcamRef.current) {
      const imageSrc = webcamRef.current.getScreenshot();
      setPreview(imageSrc);
      onImageCapture(imageSrc);
      setIsCameraActive(false);
    }
  };

  const stopCamera = () => {
    setIsCameraActive(false);
    setActiveTab('upload');
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    processFile(file);
  };

  const processFile = (file) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result);
      onImageCapture(file);
    };
    reader.readAsDataURL(file);
  };

  const handleDrop = useCallback((e) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  }, []);

  const handleDragOver = useCallback((e) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback(() => {
    setIsDragging(false);
  }, []);

  const reset = () => {
    setPreview(null);
    setIsCameraActive(false);
    setActiveTab('upload');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  if (preview) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        className="space-y-3"
      >
        <div className="relative rounded-2xl overflow-hidden border border-green-500/40 bg-black/20">
          <img src={preview} alt="Preview" className="w-full max-h-72 object-contain" />
          <div className="absolute top-3 right-3">
            <div className="flex items-center gap-1.5 px-3 py-1.5 bg-green-500/90 backdrop-blur rounded-full text-white text-xs font-semibold">
              <FiCheck size={12} /> Image Ready
            </div>
          </div>
        </div>
        <button
          onClick={reset}
          className="w-full flex items-center justify-center gap-2 px-4 py-2.5 bg-white/10 hover:bg-white/15 border border-white/20 text-white/80 hover:text-white rounded-xl text-sm font-medium transition-all"
        >
          <FiRefreshCw size={14} /> Choose Different Image
        </button>
      </motion.div>
    );
  }

  if (isCameraActive) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-3"
      >
        <div className="relative rounded-2xl overflow-hidden border border-white/20">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full"
          />
          <div className="absolute inset-0 border-[3px] border-green-400/50 rounded-2xl pointer-events-none" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-green-400/60 rounded-2xl pointer-events-none" />
        </div>
        <div className="flex gap-3">
          <motion.button
            onClick={captureImage}
            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-green-500 hover:bg-green-400 text-white rounded-xl font-semibold transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            <FiCamera size={18} /> Capture
          </motion.button>
          <motion.button
            onClick={stopCamera}
            className="px-4 py-3 bg-white/10 hover:bg-white/20 border border-white/20 text-white rounded-xl transition-colors"
            whileTap={{ scale: 0.97 }}
          >
            <FiX size={18} />
          </motion.button>
        </div>
      </motion.div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex gap-2 p-1 bg-white/10 rounded-xl">
        <button
          onClick={() => setActiveTab('upload')}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'upload'
              ? 'bg-white/20 text-white shadow'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <FiUpload size={15} /> Upload File
        </button>
        <button
          onClick={startCamera}
          className={`flex-1 flex items-center justify-center gap-2 py-2 rounded-lg text-sm font-medium transition-all ${
            activeTab === 'camera'
              ? 'bg-white/20 text-white shadow'
              : 'text-white/60 hover:text-white'
          }`}
        >
          <FiCamera size={15} /> Camera
        </button>
      </div>

      <motion.div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onClick={() => fileInputRef.current?.click()}
        animate={{
          borderColor: isDragging ? 'rgba(34,197,94,0.7)' : 'rgba(255,255,255,0.15)',
          backgroundColor: isDragging ? 'rgba(34,197,94,0.08)' : 'rgba(255,255,255,0.04)',
        }}
        className="relative flex flex-col items-center justify-center gap-4 p-10 border-2 border-dashed rounded-2xl cursor-pointer transition-colors group"
      >
        <motion.div
          animate={{ scale: isDragging ? 1.1 : 1 }}
          className="w-16 h-16 bg-white/10 group-hover:bg-white/15 rounded-2xl flex items-center justify-center transition-colors"
        >
          <FiUpload className="text-white/60 group-hover:text-white transition-colors" size={26} />
        </motion.div>

        <div className="text-center">
          <p className="text-white font-semibold mb-1">
            {isDragging ? 'Drop your image here' : 'Drag & drop or click to upload'}
          </p>
          <p className="text-white/50 text-sm">PNG, JPG, JPEG up to 10MB</p>
        </div>

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          className="hidden"
        />
      </motion.div>
    </div>
  );
};
