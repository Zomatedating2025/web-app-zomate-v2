import React, { useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PhotoUploadProps {
  photos: string[];
  onPhotosChange: (photos: string[]) => void;
  maxPhotos?: number;
  required?: boolean;
}

const PhotoUpload: React.FC<PhotoUploadProps> = ({ 
  photos, 
  onPhotosChange, 
  maxPhotos = 6,
  required = false 
}) => {
  const [draggedIndex, setDraggedIndex] = useState<number | null>(null);

  const handleFileUpload = useCallback((files: FileList | null, index?: number) => {
    if (!files || files.length === 0) return;

    const file = files[0];
    if (!file.type.startsWith('image/')) return;

    // Create a URL for the uploaded image (in real app, upload to server)
    const imageUrl = URL.createObjectURL(file);
    
    const newPhotos = [...photos];
    if (index !== undefined && index < newPhotos.length) {
      // Replace existing photo
      newPhotos[index] = imageUrl;
    } else {
      // Add new photo
      newPhotos.push(imageUrl);
    }
    
    onPhotosChange(newPhotos.slice(0, maxPhotos));
  }, [photos, onPhotosChange, maxPhotos]);

  const handleRemovePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index);
    onPhotosChange(newPhotos);
  };

  const handleReorderPhotos = (fromIndex: number, toIndex: number) => {
    const newPhotos = [...photos];
    const [movedPhoto] = newPhotos.splice(fromIndex, 1);
    newPhotos.splice(toIndex, 0, movedPhoto);
    onPhotosChange(newPhotos);
  };

  const renderPhotoSlot = (index: number) => {
    const hasPhoto = index < photos.length;
    const isMainPhoto = index === 0;

    return (
      <motion.div
        key={index}
        className={`relative aspect-square rounded-2xl overflow-hidden border-2 border-dashed transition-all duration-300 ${
          hasPhoto 
            ? 'border-galactic-gold bg-cosmic-card' 
            : 'border-galactic-purple/50 bg-cosmic-card/30 hover:border-galactic-purple hover:bg-cosmic-card/50'
        } ${isMainPhoto ? 'col-span-2 row-span-2' : ''}`}
        whileHover={{ scale: hasPhoto ? 1.02 : 1.05 }}
        whileTap={{ scale: 0.98 }}
        layout
      >
        {hasPhoto ? (
          <>
            <img
              src={photos[index]}
              alt={`Photo ${index + 1}`}
              className="w-full h-full object-cover"
              crossOrigin="anonymous"
            />
            
            {/* Photo Controls */}
            <div className="absolute inset-0 bg-black/40 opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
              <div className="flex space-x-2">
                <motion.button
                  className="p-2 bg-galactic-white/20 backdrop-blur-sm rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => {
                    const input = document.createElement('input');
                    input.type = 'file';
                    input.accept = 'image/*';
                    input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files, index);
                    input.click();
                  }}
                >
                  <i className="bi bi-pencil text-white"></i>
                </motion.button>
                
                <motion.button
                  className="p-2 bg-red-500/80 backdrop-blur-sm rounded-full"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => handleRemovePhoto(index)}
                >
                  <i className="bi bi-trash text-white"></i>
                </motion.button>
              </div>
            </div>

            {/* Main Photo Badge */}
            {isMainPhoto && (
              <div className="absolute top-2 left-2 bg-galactic-gold text-cosmic-bg text-xs font-bold px-2 py-1 rounded-full">
                Main Photo
              </div>
            )}
          </>
        ) : (
          <motion.button
            className="w-full h-full flex flex-col items-center justify-center text-galactic-white/60 hover:text-galactic-white transition-colors"
            onClick={() => {
              const input = document.createElement('input');
              input.type = 'file';
              input.accept = 'image/*';
              input.onchange = (e) => handleFileUpload((e.target as HTMLInputElement).files);
              input.click();
            }}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <i className={`bi bi-plus-circle text-3xl mb-2 ${isMainPhoto ? 'text-4xl' : ''}`}></i>
            <span className={`font-body text-center ${isMainPhoto ? 'text-sm' : 'text-xs'}`}>
              {isMainPhoto ? 'Add Main Photo' : 'Add Photo'}
            </span>
          </motion.button>
        )}
      </motion.div>
    );
  };

  return (
    <div className="space-y-4">
      {/* Photo Grid */}
      <div className="grid grid-cols-3 gap-3">
        {Array.from({ length: Math.min(maxPhotos, 6) }, (_, index) => renderPhotoSlot(index))}
      </div>

      {/* Upload Instructions */}
      <div className="text-center">
        <p className="text-galactic-white/70 font-body text-sm">
          {required && photos.length < 3 && (
            <span className="text-galactic-gold">At least 3 photos required. </span>
          )}
          Tap + to add photos. Your first photo will be your main profile picture.
        </p>
        <p className="text-galactic-white/50 font-body text-xs mt-1">
          Photos help others connect with your cosmic energy ✨
        </p>
      </div>

      {/* Photo Count */}
      <div className="flex justify-center">
        <div className="bg-cosmic-card rounded-full px-4 py-2">
          <span className="text-galactic-white font-body text-sm">
            {photos.length} / {maxPhotos} photos
          </span>
        </div>
      </div>
    </div>
  );
};

export default PhotoUpload;
