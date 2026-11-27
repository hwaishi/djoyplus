import React, { useState } from 'react';
import { X, CheckCircle2, Package, MessageCircle, AlertCircle } from 'lucide-react';
import { PackageOption } from '../types';
import { validateMalaysianPhone, validateEmail } from '../lib/validation';
import { submitLead } from '../lib/leadApi';
import { getWhatsAppUrl } from '../lib/whatsapp';
import { trackEvent } from '../lib/analytics';

interface LeadModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedPkg: PackageOption;
  ctaSource: string;
  onOpenPrivacy: () => void;
}

export const LeadModal: React.FC<LeadModalProps> = ({
  isOpen,
  onClose,
  selectedPkg,
  ctaSource,
  onOpenPrivacy
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [contactAcknowledged, setContactAcknowledged] = useState(false);
  const [marketingOptIn, setMarketingOptIn] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [successLeadId, setSuccessLeadId] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    if (!name.trim()) {
      setErrorMessage('请填写您的姓名');
      return;
    }

    const phoneValidation = validateMalaysianPhone(phone);
    if (!phoneValidation.isValid) {
      setErrorMessage(phoneValidation.error || '请输入有效的手机号码');
      return;
    }

    if (email.trim() && !validateEmail(email)) {
      setErrorMessage('请输入正确的电子邮箱格式');
      return;
    }

    if (!contactAcknowledged) {
      setErrorMessage('请勾选同意联络确认条款');
      return;
    }

    setIsSubmitting(true);

    const result = await submitLead({
      name: name.trim(),
      phone: phoneValidation.cleaned,
      email: email.trim() || undefined,
      packageId: selectedPkg.id,
      contactAcknowledged,
      marketingOptIn,
      ctaSource,
    });

    setIsSubmitting(false);

    if (!result.success) {
      setErrorMessage(result.error || '提交失败，请稍后重试');
      return;
    }

    setSuccessLeadId(result.leadId || 'LEAD-SUCCESS');
    trackEvent('Lead', { package_id: selectedPkg.id, value: selectedPkg.price, currency: 'MYR' });
  };

  const handleOpenWhatsAppAfterSuccess = () => {
    const msg = `您好，我是 ${name.trim()} (电话: ${phone})，我已提交咨询并选择 ${selectedPkg.name} (RM ${selectedPkg.price})。请协助安排。`;
    const url = getWhatsAppUrl(msg);
    trackEvent('Contact', { method: 'WhatsApp', package: selectedPkg.id });
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 relative shadow-2xl animate-in fade-in zoom-in duration-200">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-600 flex items-center justify-center transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="text-center mb-6">
          <div className="w-12 h-12 rounded-2xl bg-[#008C9E]/10 text-[#008C9E] flex items-center justify-center mx-auto mb-3">
            <Package className="w-6 h-6" />
          </div>
          <h3 className="text-xl font-black text-[#292929]">免费咨询 / 确认配套</h3>
          <p className="text-xs text-gray-500 mt-1">
            已选配套：<strong className="text-[#008C9E]">{selectedPkg.name} (RM {selectedPkg.price})</strong>
          </p>
        </div>

        {successLeadId ? (
          <div className="space-y-4 text-center">
            <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-6 space-y-3">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
              <h4 className="text-lg font-bold text-emerald-900">资料已成功提交！</h4>
              <p className="text-xs text-emerald-700 leading-relaxed">
                您的咨询已安全记录 (编号: {successLeadId})。我们的中文客服将尽快与您联系。
              </p>
            </div>

            <button
              onClick={handleOpenWhatsAppAfterSuccess}
              className="w-full bg-[#25D366] hover:bg-[#20ba5a] text-white font-black py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-base"
            >
              <MessageCircle className="w-5 h-5" />
              <span>立即通过 WhatsApp 连接客服</span>
            </button>

            <button
              onClick={onClose}
              className="text-xs text-gray-400 hover:text-gray-600 underline"
            >
              关闭窗口
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            {errorMessage && (
              <div className="bg-red-50 border border-red-200 rounded-xl p-3 flex items-center gap-2 text-red-700 text-xs font-medium">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">您的姓名 *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="请输入您的姓名 (如: 陈先生 / 林太太)"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C9E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">马来西亚 WhatsApp 联络号码 *</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="例如: 012-3456789"
                required
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C9E]"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">电子邮箱 (选填)</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-[#008C9E]"
              />
            </div>

            <div className="space-y-2 pt-2">
              <label className="flex items-start gap-2.5 text-xs text-gray-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={contactAcknowledged}
                  onChange={(e) => setContactAcknowledged(e.target.checked)}
                  className="mt-0.5 rounded text-[#008C9E] focus:ring-[#008C9E]"
                />
                <span>
                  我同意让客服人员通过电话或 WhatsApp 联系我，并已阅读并接受{' '}
                  <button
                    type="button"
                    onClick={onOpenPrivacy}
                    className="text-[#008C9E] underline font-bold"
                  >
                    隐私政策
                  </button>
                  。*
                </span>
              </label>

              <label className="flex items-start gap-2.5 text-xs text-gray-500 cursor-pointer">
                <input
                  type="checkbox"
                  checked={marketingOptIn}
                  onChange={(e) => setMarketingOptIn(e.target.checked)}
                  className="mt-0.5 rounded text-[#008C9E] focus:ring-[#008C9E]"
                />
                <span>我愿意接收关于 D’ Joy Plus 的健康资讯与限时优惠通知 (可选)</span>
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#FFD43B] hover:bg-[#ffcb14] text-[#650F16] font-black py-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 cursor-pointer text-base disabled:opacity-50"
            >
              {isSubmitting ? (
                <span>正在安全提交...</span>
              ) : (
                <>
                  <MessageCircle className="w-5 h-5" />
                  <span>提交咨询并安排客服</span>
                </>
              )}
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
