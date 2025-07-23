import React, { useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  currentImage?: string;
  className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onImageUpload, currentImage, className = '' }) => {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      onImageUpload(acceptedFiles[0]);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.jpg', '.png', '.webp']
    },
    maxFiles: 1,
    maxSize: 5 * 1024 * 1024, // 5MB
  });

  return (
    <motion.div
      {...getRootProps()}
      className={`relative cursor-pointer group ${className}`}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <input {...getInputProps()} />
      
      {currentImage ? (
        <div className="relative overflow-hidden rounded-2xl">
          <img
            src={currentImage}
            alt="Profile"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
          <div className={`absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center ${isDragActive ? 'opacity-100' : ''}`}>
            <div className="text-center">
              <i className="bi bi-camera text-white text-3xl mb-2 block"></i>
              <p className="text-white font-body text-sm">
                {isDragActive ? 'Drop to update' : 'Click or drag to change'}
              </p>
            </div>
          </div>
        </div>
      ) : (
        <div className={`border-2 border-dashed border-galactic-purple/50 rounded-2xl p-8 text-center transition-all duration-300 ${isDragActive ? 'border-galactic-gold bg-galactic-gold/10' : 'hover:border-galactic-purple hover:bg-galactic-purple/5'}`}>
          <i className="bi bi-camera text-4xl text-galactic-purple/70 mb-4 block"></i>
          <p className="text-galactic-white/80 font-body mb-2">
            {isDragActive ? 'Drop your photo here' : 'Add your photo'}
          </p>
          <p className="text-galactic-white/50 font-body text-sm">
            Click or drag and drop
          </p>
        </div>
      )}
      
      {isDragActive && (
        <motion.div
          className="absolute inset-0 border-2 border-galactic-gold rounded-2xl bg-galactic-gold/10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        />
      )}
    </motion.div>
  );
};

export default ImageUpload;
