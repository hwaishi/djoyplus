import React from 'react';
import { X, Play } from 'lucide-react';
import { getWhatsAppUrl } from '../lib/whatsapp';

interface VideoModalProps {
  title: string | null;
  onClose: () => void;
}

export const VideoModal: React.FC<VideoModalProps> = ({ title, onClose }) => {
  if (!title) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>
        <div className="text-center space-y-4 pt-2">
          <div className="w-16 h-16 rounded-full bg-[#008C9E]/10 text-[#008C9E] flex items-center justify-center mx-auto">
            <Play className="w-8 h-8 fill-[#008C9E] ml-1" />
          </div>
          <h3 className="text-xl font-bold text-[#292929]">{title}</h3>
          <p className="text-sm text-gray-600 leading-relaxed">
            真实用家分享：通过日常补充 D’ Joy Plus 膳食纤维与复合酵素，肠胃恢复轻松规律。
          </p>
          <div className="bg-[#DDF9FC] p-4 rounded-xl text-xs text-[#008C9E] font-medium">
            注：个别使用体验因人而异。
          </div>
          <button
            onClick={() => {
              onClose();
              const url = getWhatsAppUrl(`您好，我想了解关于 "${title}" 的更多见证与产品资讯。`);
              window.open(url, '_blank', 'noopener,noreferrer');
            }}
            className="w-full bg-[#008C9E] hover:bg-[#007382] text-white py-3 rounded-xl font-bold text-sm transition cursor-pointer"
          >
            向客服深入了解此见证
          </button>
        </div>
      </div>
    </div>
  );
};
