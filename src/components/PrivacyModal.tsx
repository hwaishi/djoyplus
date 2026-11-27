import React from 'react';
import { X, Shield } from 'lucide-react';

interface PrivacyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyModal: React.FC<PrivacyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl max-h-[85vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-[#008C9E]/10 text-[#008C9E] flex items-center justify-center">
            <Shield className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-xl font-black text-[#292929]">隐私政策与个人资料保护 (PDPA)</h3>
            <p className="text-xs text-gray-500">M-Plan Sdn. Bhd. — D’ Joy Plus 官方授权</p>
          </div>
        </div>

        <div className="space-y-4 text-sm text-gray-600 leading-relaxed">
          <p>
            我们非常重视您的个人隐私。本隐私政策说明了 D’ Joy Plus (M-Plan Sdn. Bhd.) 如何收集、使用及保护您在浏览网页或提交咨询时提供的个人资料。
          </p>
          <h4 className="font-bold text-[#292929] pt-2">1. 资料收集目的</h4>
          <p>
            您所提供的姓名与 WhatsApp 联络号码，仅用于处理您的产品咨询、配套报价及安排订单配送。我们绝不会将您的个人资料出售或透露给第三方。
          </p>
          <h4 className="font-bold text-[#292929] pt-2">2. 数据安全与保护</h4>
          <p>
            我们采用加密连接与安全服务器存储您的咨询记录，防止未经授权的访问或泄露。
          </p>
          <h4 className="font-bold text-[#292929] pt-2">3. 您的权利</h4>
          <p>
            您随时有权要求查阅、修改或删除您的个人联系资料。如有任何隐私相关疑问，欢迎随时通过 WhatsApp 联系我们的客户服务团队。
          </p>
        </div>

        <div className="mt-8 pt-4 border-t border-gray-100 text-center">
          <button
            onClick={onClose}
            className="bg-[#008C9E] hover:bg-[#007382] text-white font-bold px-8 py-3 rounded-xl text-sm transition cursor-pointer"
          >
            我知道了
          </button>
        </div>
      </div>
    </div>
  );
};
