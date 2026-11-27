export function validateMalaysianPhone(phone: string): { isValid: boolean; cleaned: string; error?: string } {
  if (!phone || !phone.trim()) {
    return { isValid: false, cleaned: '', error: '请填写联络号码' };
  }

  const cleaned = phone.replace(/[\s\-\(\)]/g, '');
  // Malaysian mobile formats: 01x-xxxxxxxx or +601x-xxxxxxxx or 601x
  const phoneRegex = /^(\+?60|0)1[0-46-9]-*[0-9]{7,8}$/;
  const genericMobileRegex = /^(\+?60|0)[1-9][0-9]{8,9}$/;

  if (!phoneRegex.test(cleaned) && !genericMobileRegex.test(cleaned)) {
    return { isValid: false, cleaned, error: '请输入有效的马来西亚手机号码 (如 012-3456789)' };
  }

  return { isValid: true, cleaned };
}

export function validateEmail(email?: string): boolean {
  if (!email || !email.trim()) return true; // Optional by default
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email.trim());
}
