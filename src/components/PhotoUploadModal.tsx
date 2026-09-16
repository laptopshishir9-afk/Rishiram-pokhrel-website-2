import React, { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  X,
  Upload,
  Camera,
  Globe,
  CheckCircle2,
  AlertCircle,
  Download,
  RotateCcw,
  ShieldCheck,
  Smartphone,
  Laptop,
} from 'lucide-react';

interface PhotoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentPhotoUrl: string;
  onPhotoSaved: (newUrl: string) => void;
  onResetToDefault: () => void;
  isCustomPhoto: boolean;
}

export const PhotoUploadModal: React.FC<PhotoUploadModalProps> = ({
  isOpen,
  onClose,
  currentPhotoUrl,
  onPhotoSaved,
  onResetToDefault,
  isCustomPhoto,
}) => {
  const [activeTab, setActiveTab] = useState<'upload' | 'url'>('upload');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{
    type: 'success' | 'error';
    text: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isOpen) return null;

  // Read exact original file as Data URL without any canvas processing or compression
  const readExactOriginalImage = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        resolve(e.target?.result as string);
      };
      reader.onerror = () => reject(new Error('Failed to read file'));
      reader.readAsDataURL(file);
    });
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setStatusMessage(null);

    try {
      const exactBase64 = await readExactOriginalImage(file);
      setPreviewUrl(exactBase64);
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Could not process the selected image file. Please try another image.',
      });
    }
  };

  const handleDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files?.[0];
    if (!file) return;

    setSelectedFile(file);
    setStatusMessage(null);

    try {
      const exactBase64 = await readExactOriginalImage(file);
      setPreviewUrl(exactBase64);
    } catch {
      setStatusMessage({
        type: 'error',
        text: 'Could not process the dropped image. Please try another.',
      });
    }
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleSaveUpload = async () => {
    if (!previewUrl) return;

    setIsUploading(true);
    setStatusMessage(null);

    try {
      // 1. Send to server so it saves into public/profile.jpg, docs/profile.jpg, etc.
      const response = await fetch('./api/upload-photo', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: previewUrl }),
      });

      if (response.ok) {
        const data = await response.json();
        const updatedUrl = `./profile.jpg?v=${data.timestamp || Date.now()}`;
        onPhotoSaved(updatedUrl);
        setStatusMessage({
          type: 'success',
          text: 'Success! Your photo is now saved on the server and visible to all devices.',
        });
        setTimeout(() => {
          onClose();
        }, 1800);
      } else {
        // If server route is not available (e.g. running statically on GitHub Pages), save locally and notify
        onPhotoSaved(previewUrl);
        setStatusMessage({
          type: 'success',
          text: 'Photo updated! Download profile.jpg below to include in your GitHub repository.',
        });
      }
    } catch (err: any) {
      // Fallback: save to client state and localStorage
      onPhotoSaved(previewUrl);
      setStatusMessage({
        type: 'success',
        text: 'Photo updated! Download profile.jpg below to include in your GitHub repository.',
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handleSaveUrl = () => {
    if (!imageUrlInput.trim()) {
      setStatusMessage({ type: 'error', text: 'Please enter a valid image URL' });
      return;
    }

    try {
      new URL(imageUrlInput.trim());
      onPhotoSaved(imageUrlInput.trim());
      setStatusMessage({
        type: 'success',
        text: 'Direct image URL saved! Visible across all devices with internet access.',
      });
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch {
      setStatusMessage({ type: 'error', text: 'Please enter a valid HTTP or HTTPS image URL' });
    }
  };

  const handleDownloadCurrentPhoto = () => {
    const a = document.createElement('a');
    a.href = currentPhotoUrl;
    a.download = 'profile.jpg';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <div
      id="photo-upload-modal-overlay"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs overflow-y-auto"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 15 }}
        transition={{ duration: 0.25 }}
        onClick={(e) => e.stopPropagation()}
        className="bg-white rounded-xl shadow-2xl border border-[#dbe5df] max-w-lg w-full overflow-hidden"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#e2ebe5] bg-[#f7faf8]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#ebf3ed] border border-[#d2e2d7] flex items-center justify-center text-[#143d2b]">
              <Camera className="w-4 h-4 text-[#205c3b]" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#143d2b]">Photo Manager (All Devices)</h3>
              <p className="text-xs text-[#52796f]">
                Upload your photo to be visible on every phone, laptop, and browser
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#63756b] hover:text-[#143d2b] hover:bg-[#ebf3ed] transition-colors cursor-pointer"
            aria-label="Close photo manager modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 space-y-5">
          {/* Multi-Device Guarantee Notice */}
          <div className="p-3.5 rounded-lg bg-[#ebf3ed] border border-[#c8dcd0] flex items-start gap-3 text-xs text-[#143d2b]">
            <ShieldCheck className="w-5 h-5 text-[#205c3b] shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">Multi-Device Synchronization:</span>
              <p className="text-[#3f4e44] mt-0.5 leading-relaxed">
                When you save your photo, it is written directly to the website&apos;s server and asset
                folder (<code className="bg-white px-1 py-0.5 rounded font-mono text-[11px]">public/profile.jpg</code>).
                Anyone visiting your link on any device will see your exact photo!
              </p>
            </div>
          </div>

          {/* Navigation Tabs */}
          <div className="flex border-b border-[#e2ebe5]">
            <button
              type="button"
              onClick={() => setActiveTab('upload')}
              className={`flex items-center gap-2 pb-2.5 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                activeTab === 'upload'
                  ? 'border-[#143d2b] text-[#143d2b]'
                  : 'border-transparent text-[#63756b] hover:text-[#143d2b]'
              }`}
            >
              <Upload className="w-3.5 h-3.5" />
              <span>Upload from This Device</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('url')}
              className={`flex items-center gap-2 pb-2.5 px-4 text-xs font-bold border-b-2 cursor-pointer transition-colors ${
                activeTab === 'url'
                  ? 'border-[#143d2b] text-[#143d2b]'
                  : 'border-transparent text-[#63756b] hover:text-[#143d2b]'
              }`}
            >
              <Globe className="w-3.5 h-3.5" />
              <span>Online Image URL</span>
            </button>
          </div>

          {/* Status Message */}
          <AnimatePresence>
            {statusMessage && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className={`p-3 rounded-lg flex items-center gap-2 text-xs font-semibold ${
                  statusMessage.type === 'success'
                    ? 'bg-[#e3f0e7] text-[#143d2b] border border-[#a3ceb1]'
                    : 'bg-[#fdf0ed] text-[#842029] border border-[#f5c2c7]'
                }`}
              >
                {statusMessage.type === 'success' ? (
                  <CheckCircle2 className="w-4 h-4 text-[#205c3b] shrink-0" />
                ) : (
                  <AlertCircle className="w-4 h-4 text-[#842029] shrink-0" />
                )}
                <span>{statusMessage.text}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tab 1: Upload from Device */}
          {activeTab === 'upload' && (
            <div className="space-y-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/jpeg, image/png, image/jpg, image/webp"
                onChange={handleFileSelect}
                className="hidden"
                id="modal-file-input"
              />

              {/* Drag and Drop Zone */}
              <div
                onDrop={handleDrop}
                onDragOver={handleDragOver}
                onClick={() => fileInputRef.current?.click()}
                className={`border-2 border-dashed rounded-xl p-6 text-center cursor-pointer transition-all flex flex-col items-center justify-center ${
                  previewUrl
                    ? 'border-[#205c3b] bg-[#f7faf8]'
                    : 'border-[#bcd6c4] hover:border-[#143d2b] bg-[#fbfdfc] hover:bg-[#ebf3ed]'
                }`}
              >
                {previewUrl ? (
                  <div className="flex flex-col items-center gap-3">
                    <div className="w-28 h-36 rounded-full overflow-hidden border-2 border-[#143d2b] shadow-md relative bg-white">
                      <img
                        src={previewUrl}
                        alt="Preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="text-center">
                      <p className="text-xs font-bold text-[#143d2b]">
                        {selectedFile?.name || 'Selected Photo'}
                      </p>
                      <p className="text-[11px] text-[#52796f] mt-0.5">
                        Click or drag another file to replace
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 rounded-full bg-[#ebf3ed] flex items-center justify-center text-[#205c3b] mb-3">
                      <Upload className="w-6 h-6" />
                    </div>
                    <p className="text-sm font-bold text-[#143d2b]">
                      Click to choose photo from this device
                    </p>
                    <p className="text-xs text-[#52796f] mt-1">or drag & drop your image file here</p>
                    <span className="mt-2 text-[11px] font-semibold text-[#205c3b] bg-[#ebf3ed] px-2.5 py-0.5 rounded-full">
                      JPG, PNG, or WEBP
                    </span>
                  </div>
                )}
              </div>

              {/* Action buttons */}
              <div className="flex items-center justify-between gap-3 pt-2">
                {isCustomPhoto && (
                  <button
                    type="button"
                    onClick={() => {
                      onResetToDefault();
                      setPreviewUrl(null);
                      setSelectedFile(null);
                      setStatusMessage({
                        type: 'success',
                        text: 'Reset to default portrait photo.',
                      });
                    }}
                    className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-[#63756b] hover:text-[#143d2b] hover:bg-[#ebf3ed] rounded-lg transition-colors cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Default</span>
                  </button>
                )}

                <div className="flex items-center gap-2 ml-auto">
                  <button
                    type="button"
                    onClick={onClose}
                    className="px-4 py-2 text-xs font-semibold text-[#3f4e44] hover:bg-[#ebf3ed] rounded-lg transition-colors cursor-pointer"
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    disabled={!previewUrl || isUploading}
                    onClick={handleSaveUpload}
                    className={`inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white rounded-lg shadow-xs transition-all cursor-pointer ${
                      !previewUrl || isUploading
                        ? 'bg-gray-400 opacity-60 cursor-not-allowed'
                        : 'bg-[#143d2b] hover:bg-[#1b4332]'
                    }`}
                  >
                    {isUploading ? (
                      <>
                        <span className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                        <span>Saving to Server...</span>
                      </>
                    ) : (
                      <>
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Save for All Devices</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Tab 2: Direct Image URL */}
          {activeTab === 'url' && (
            <div className="space-y-4">
              <div>
                <label
                  htmlFor="photo-url-input"
                  className="block text-xs font-bold text-[#143d2b] mb-1.5"
                >
                  Enter Direct Image URL (HTTPS)
                </label>
                <input
                  id="photo-url-input"
                  type="url"
                  placeholder="https://example.com/rishiram-photo.jpg"
                  value={imageUrlInput}
                  onChange={(e) => {
                    setImageUrlInput(e.target.value);
                    setStatusMessage(null);
                  }}
                  className="w-full px-3.5 py-2.5 text-xs bg-white border border-[#dbe5df] focus:border-[#205c3b] focus:ring-1 focus:ring-[#205c3b] rounded-lg outline-none text-[#1e2420]"
                />
                <p className="text-[11px] text-[#52796f] mt-1.5 leading-relaxed">
                  Use this option if you have your photo hosted on Google Drive (direct link), ImgBB,
                  Cloudinary, or GitHub.
                </p>
              </div>

              <div className="flex items-center justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={onClose}
                  className="px-4 py-2 text-xs font-semibold text-[#3f4e44] hover:bg-[#ebf3ed] rounded-lg transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleSaveUrl}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold text-white bg-[#143d2b] hover:bg-[#1b4332] rounded-lg shadow-xs transition-all cursor-pointer"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Apply URL Photo</span>
                </button>
              </div>
            </div>
          )}

          {/* Quick Tools: Download current photo file */}
          <div className="pt-3 border-t border-[#e2ebe5] flex items-center justify-between text-xs text-[#52796f]">
            <div className="flex items-center gap-2">
              <Laptop className="w-3.5 h-3.5 text-[#205c3b]" />
              <Smartphone className="w-3.5 h-3.5 text-[#205c3b]" />
              <span>Synced across desktop & mobile</span>
            </div>

            <button
              type="button"
              onClick={handleDownloadCurrentPhoto}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#205c3b] hover:text-[#143d2b] cursor-pointer"
              title="Download the current profile.jpg file to your computer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download profile.jpg</span>
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
