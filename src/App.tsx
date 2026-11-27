/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  CheckCircle2, Sparkles, MessageCircle, Award, ShieldCheck, 
  ChevronDown, ChevronUp, Star, ArrowRight, Play, Package, AlertCircle
} from 'lucide-react';

import { PackageOption } from './types';
import { PACKAGES, REVIEWS_DATA, TESTIMONIALS_DATA, FAQ_DATA } from './data/catalog';
import { getWhatsAppUrl, openWhatsApp } from './lib/whatsapp';
import { initAnalytics, trackEvent } from './lib/analytics';
import { LeadModal } from './components/LeadModal';
import { PrivacyModal } from './components/PrivacyModal';
import { VideoModal } from './components/VideoModal';

export default function App() {
  const [selectedPkg, setSelectedPkg] = useState<PackageOption>(PACKAGES[1]); // Default to 2 boxes
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [leadModalSource, setLeadModalSource] = useState('pricing');
  const [activeFaq, setActiveFaq] = useState<number | null>(0);
  const [activeVideoTitle, setActiveVideoTitle] = useState<string | null>(null);

  useEffect(() => {
    initAnalytics();
    trackEvent('PageView');
  }, []);

  const handleOpenLeadModal = (source: string, pkg?: PackageOption) => {
    if (pkg) setSelectedPkg(pkg);
    setLeadModalSource(source);
    setIsLeadModalOpen(true);
    trackEvent('LeadModalOpen', { source, package_id: selectedPkg.id });
  };

  const handleWhatsApp = (source: string, customText?: string) => {
    trackEvent('Contact', { method: 'WhatsApp', source });
    openWhatsApp(customText);
  };

  return (
    <div className="min-h-screen bg-[#F8FCFD] text-[#292929] font-sans selection:bg-[#00C6D7] selection:text-white">
      
      {/* Top Banner Notice */}
      <div className="bg-[#008C9E] text-white text-xs sm:text-sm py-2 px-4 text-center font-medium sticky top-0 z-50 shadow-sm flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-[#FFD43B] animate-pulse" />
        <span>法国配方高纤维酵素 · 肠道轻盈新体验 | 全马现货免邮支持</span>
        <button 
          onClick={() => handleOpenLeadModal('top_banner')}
          className="hidden md:inline-block ml-3 bg-[#FFD43B] text-[#650F16] px-2.5 py-0.5 rounded-full text-xs font-bold hover:bg-yellow-300 transition cursor-pointer"
        >
          立即咨询
        </button>
      </div>

      {/* Navigation Header */}
      <header className="bg-white/95 backdrop-blur-md sticky top-[37px] sm:top-[41px] z-40 border-b border-[#DDF9FC] shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#008C9E] to-[#00C6D7] flex items-center justify-center text-white font-black text-xl shadow-md">
              D+
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-black tracking-tight text-[#008C9E]">
                D’ Joy <span className="text-[#650F16]">Plus</span>
              </h1>
              <p className="text-[10px] sm:text-xs text-gray-500 font-medium">高纤维酵素植物饮品 · Formulated in France</p>
            </div>
          </div>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <a href="#benefits" className="hover:text-[#008C9E] transition">三大困扰</a>
            <a href="#core" className="hover:text-[#008C9E] transition">消 · 排 · 养</a>
            <a href="#formula" className="hover:text-[#008C9E] transition">法国配方成分</a>
            <a href="#testimonials" className="hover:text-[#008C9E] transition">真实见证</a>
            <a href="#pricing" className="hover:text-[#008C9E] transition">优惠配套</a>
            <a href="#faq" className="hover:text-[#008C9E] transition">常见问题</a>
          </nav>

          <div className="flex items-center gap-3">
            <button
              onClick={() => handleWhatsApp('header_button')}
              className="bg-[#008C9E] hover:bg-[#007382] text-white px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm shadow-md hover:shadow-lg transition flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">中文客服咨询</span>
              <span className="sm:hidden">客服</span>
            </button>
          </div>
        </div>
      </header>

      {/* 01 — HERO SECTION */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#DDF9FC]/60 via-white to-white py-12 sm:py-20">
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#00C6D7]/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-10 left-0 w-80 h-80 bg-[#FFD43B]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
              <div className="inline-flex items-center gap-2 bg-white px-4 py-1.5 rounded-full border border-[#008C9E]/30 shadow-xs">
                <span className="w-2.5 h-2.5 rounded-full bg-[#008C9E] animate-ping"></span>
                <span className="text-xs sm:text-sm font-bold text-[#008C9E] tracking-wider uppercase">
                  FORMULATED IN FRANCE · 法国配方
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-black text-[#292929] tracking-tight leading-tight">
                排得顺畅 · 吃得开心 · <span className="text-[#008C9E] underline decoration-[#FFD43B] decoration-4 underline-offset-8">活得自在</span>
              </h2>

              <p className="text-lg sm:text-xl text-gray-600 font-medium leading-relaxed max-w-2xl mx-auto lg:mx-0">
                便秘 · 胃胀 · 消化不良 — 从日常肠道保养开始，重新找回轻盈好状态！
              </p>

              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-3 pt-2">
                <div className="bg-[#008C9E]/10 text-[#008C9E] px-4 py-2 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#FF963B]"></span> 消 · 消化支持
                </div>
                <div className="bg-[#008C9E]/10 text-[#008C9E] px-4 py-2 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#008C9E]"></span> 排 · 规律排便
                </div>
                <div className="bg-[#008C9E]/10 text-[#008C9E] px-4 py-2 rounded-xl font-bold text-sm sm:text-base flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#A8DF45]"></span> 养 · 植物营养
                </div>
              </div>

              <div className="pt-4 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
                <button
                  onClick={() => {
                    const el = document.getElementById('pricing');
                    el?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="w-full sm:w-auto bg-[#FFD43B] hover:bg-[#ffcb14] text-[#650F16] text-lg font-black px-8 py-4 rounded-2xl shadow-lg hover:shadow-xl transition transform hover:-translate-y-0.5 flex items-center justify-center gap-3 cursor-pointer"
                >
                  <Package className="w-6 h-6" />
                  <span>查看特惠配套 / 立即抢购</span>
                </button>
                <button
                  onClick={() => handleOpenLeadModal('hero_consult')}
                  className="w-full sm:w-auto bg-white hover:bg-gray-50 text-[#008C9E] border-2 border-[#008C9E] text-base font-bold px-6 py-4 rounded-2xl shadow-sm transition flex items-center justify-center gap-2 cursor-pointer"
                >
                  <MessageCircle className="w-5 h-5 text-[#008C9E]" />
                  <span>免费咨询 · 了解 D’ Joy Plus</span>
                </button>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-6 pt-4 text-xs sm:text-sm text-gray-500 font-medium">
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#008C9E]" />
                  <span>30天足量条装</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#008C9E]" />
                  <span>天然果蔬配方</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-4 h-4 text-[#008C9E]" />
                  <span>全马免邮保障</span>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 relative flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00C6D7] to-[#FFD43B] rounded-3xl blur-xl opacity-30 animate-pulse"></div>
                <div className="relative bg-white p-4 sm:p-6 rounded-3xl shadow-2xl border border-[#DDF9FC]">
                  <img 
                    src="/public/assets/aistudio/D_Joy_Plus_botanical_sachets_4b889186.jpg" 
                    alt="D' Joy Plus 高纤维酵素包装与独立条装" 
                    loading="eager"
                    fetchPriority="high"
                    className="w-full h-auto rounded-2xl object-cover shadow-md hover:scale-[1.02] transition duration-500"
                  />
                  <div className="mt-4 flex items-center justify-between text-xs font-bold text-gray-500 px-2">
                    <span className="flex items-center gap-1 text-[#008C9E]">
                      <Sparkles className="w-3.5 h-3.5" /> 净含量: 10g × 30 条装
                    </span>
                    <span className="bg-[#DDF9FC] text-[#008C9E] px-2.5 py-1 rounded-lg">植物酵素果蔬饮品</span>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 02 — 生活太忙，肠胃也有感！ */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mb-4">
              生活太忙，肠胃也有感！
            </h2>
            <p className="text-base sm:text-lg text-gray-600 font-medium">
              每天忙着工作、照顾家庭，却容易忽略日常饮食与肠胃保养。
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-[#F8FCFD] p-6 rounded-2xl border border-[#DDF9FC] shadow-sm hover:shadow-md transition group">
              <div className="h-48 rounded-xl overflow-hidden mb-4 relative bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=600&q=80" 
                  alt="经常外食、饮食油腻" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#FF963B] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  饮食油腻
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#292929] mb-2">经常外食、饮食油腻</h3>
              <p className="text-sm text-gray-600">重口味、多油多盐，不知不觉加重肠胃消化负担。</p>
            </div>

            <div className="bg-[#F8FCFD] p-6 rounded-2xl border border-[#DDF9FC] shadow-sm hover:shadow-md transition group">
              <div className="h-48 rounded-xl overflow-hidden mb-4 relative bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80" 
                  alt="蔬菜水果吃得少" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#A8DF45] text-[#292929] text-xs font-bold px-3 py-1 rounded-full shadow">
                  膳食纤维不足
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#292929] mb-2">蔬菜水果吃得少</h3>
              <p className="text-sm text-gray-600">工作忙碌三餐随便打发，日常纤维摄取严重不足。</p>
            </div>

            <div className="bg-[#F8FCFD] p-6 rounded-2xl border border-[#DDF9FC] shadow-sm hover:shadow-md transition group">
              <div className="h-48 rounded-xl overflow-hidden mb-4 relative bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80" 
                  alt="久坐、运动量不足" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#008C9E] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  久坐少动
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#292929] mb-2">久坐、运动量不足</h3>
              <p className="text-sm text-gray-600">长时间坐着办公或看电视，肠道蠕动日渐缓慢。</p>
            </div>

            <div className="bg-[#F8FCFD] p-6 rounded-2xl border border-[#DDF9FC] shadow-sm hover:shadow-md transition group">
              <div className="h-48 rounded-xl overflow-hidden mb-4 relative bg-gray-100">
                <img 
                  src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80" 
                  alt="三餐不定时、吃得太快" 
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                />
                <div className="absolute top-3 left-3 bg-[#F45B79] text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                  节奏急促
                </div>
              </div>
              <h3 className="text-lg font-bold text-[#292929] mb-2">三餐不定时、吃得太快</h3>
              <p className="text-sm text-gray-600">狼吞虎咽加上压力大，导致饭后胃胀、消化不良。</p>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-base sm:text-xl font-bold text-[#008C9E] bg-[#DDF9FC] py-4 px-6 rounded-2xl inline-block">
              生活再忙，也别忘了照顾自己的肠胃。
            </p>
          </div>
        </div>
      </section>

      {/* 03 — 三大肠胃困扰 */}
      <section id="benefits" className="py-16 sm:py-24 bg-[#F8FCFD] border-t border-b border-[#DDF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#650F16] uppercase tracking-wider bg-[#FFD43B]/30 px-3 py-1 rounded-full">
              常见痛点
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mt-3 mb-4">
              上大号不顺畅，吃饭后又不舒服？
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              您或家中的长辈，是否经常经历以下困扰？
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* 便秘 */}
            <div className="bg-white rounded-3xl p-8 shadow-md border-t-4 border-[#008C9E] hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#008C9E]/10 flex items-center justify-center text-[#008C9E] font-black text-2xl mb-6">
                  01
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#292929] mb-3">
                  便秘 | 上厕所蹲半小时，还是排不出来？
                </h3>
                <ul className="space-y-3 text-gray-600 font-medium mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#008C9E] shrink-0 mt-0.5" />
                    <span>两三天才上一次大号，囤积沉重</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#008C9E] shrink-0 mt-0.5" />
                    <span>大便干硬、每次排便费力难受</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#008C9E] shrink-0 mt-0.5" />
                    <span>明明有便意，却久久排不出</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#008C9E] shrink-0 mt-0.5" />
                    <span>排完还是感觉不干净、不通畅</span>
                  </li>
                </ul>
              </div>
              <div className="bg-[#DDF9FC] p-4 rounded-xl text-xs text-[#008C9E] font-bold">
                💡 补充充足膳食纤维与水分，有助维持规律排便。
              </div>
            </div>

            {/* 胃胀 */}
            <div className="bg-white rounded-3xl p-8 shadow-md border-t-4 border-[#FF963B] hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#FF963B]/10 flex items-center justify-center text-[#FF963B] font-black text-2xl mb-6">
                  02
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#292929] mb-3">
                  胃胀 | 吃一点就胀，肚子好像被顶住？
                </h3>
                <ul className="space-y-3 text-gray-600 font-medium mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FF963B] shrink-0 mt-0.5" />
                    <span>饭后肚子胀胀的、衣服变紧</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FF963B] shrink-0 mt-0.5" />
                    <span>经常打嗝、感觉胃部胀风不适</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FF963B] shrink-0 mt-0.5" />
                    <span>吃不多也有饱胀感，食欲缺缺</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#FF963B] shrink-0 mt-0.5" />
                    <span>晚上肚子鼓鼓，严重影响休息</span>
                  </li>
                </ul>
              </div>
              <div className="bg-orange-50 p-4 rounded-xl text-xs text-orange-700 font-bold">
                💡 给予消化支持与规律作息，让肚子不再沉重。
              </div>
            </div>

            {/* 消化不良 */}
            <div className="bg-white rounded-3xl p-8 shadow-md border-t-4 border-[#F45B79] hover:shadow-xl transition flex flex-col justify-between">
              <div>
                <div className="w-14 h-14 rounded-2xl bg-[#F45B79]/10 flex items-center justify-center text-[#F45B79] font-black text-2xl mb-6">
                  03
                </div>
                <h3 className="text-xl sm:text-2xl font-black text-[#292929] mb-3">
                  消化不良 | 吃完饭几个小时，还是感觉很饱？
                </h3>
                <ul className="space-y-3 text-gray-600 font-medium mb-8">
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#F45B79] shrink-0 mt-0.5" />
                    <span>饭后食物好像滞留胃部久久不消</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#F45B79] shrink-0 mt-0.5" />
                    <span>吃油腻食物后更容易消化不适</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#F45B79] shrink-0 mt-0.5" />
                    <span>上腹饱胀、嗳气频频</span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-[#F45B79] shrink-0 mt-0.5" />
                    <span>想享受美食，却担心饭后肠胃受罪</span>
                  </li>
                </ul>
              </div>
              <div className="bg-pink-50 p-4 rounded-xl text-xs text-pink-700 font-bold">
                💡 复合酵素配方，轻松应对美味佳肴。
              </div>
            </div>
          </div>

          <div className="mt-12 text-center">
            <p className="text-base sm:text-lg text-gray-700 font-bold">
              希望排便更规律、饭后更舒适？从了解日常饮食和肠道营养开始。
            </p>
          </div>
        </div>
      </section>

      {/* 04 — 消、排、养：品牌核心记忆点 */}
      <section id="core" className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#008C9E] uppercase tracking-wider bg-[#DDF9FC] px-3 py-1 rounded-full">
              核心理念
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mt-3 mb-4">
              不只是补充纤维，更关注「消、排、养」
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              三位一体的科学膳食哲学，全方位呵护您的肠道健康。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* 消 */}
            <div className="bg-gradient-to-b from-[#FFF5EC] to-white p-8 rounded-3xl border border-orange-100 shadow-lg text-center relative overflow-hidden group hover:-translate-y-1 transition duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF963B]/10 rounded-full blur-2xl"></div>
              <div className="w-24 h-24 mx-auto rounded-2xl bg-[#FF963B] text-white flex items-center justify-center font-black text-5xl shadow-md mb-6 group-hover:scale-110 transition">
                消
              </div>
              <h3 className="text-2xl font-black text-[#292929] mb-3">消化营养支持</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                采用 <strong className="text-[#FF963B]">DigeSEB Pro™ 复合酵素配方</strong>，为日常饮食中的食物分解与营养吸收提供温柔支持。
              </p>
            </div>

            {/* 排 */}
            <div className="bg-gradient-to-b from-[#DDF9FC]/40 to-white p-8 rounded-3xl border border-[#00C6D7]/30 shadow-lg text-center relative overflow-hidden group hover:-translate-y-1 transition duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#008C9E]/10 rounded-full blur-2xl"></div>
              <div className="w-24 h-24 mx-auto rounded-2xl bg-[#008C9E] text-white flex items-center justify-center font-black text-5xl shadow-md mb-6 group-hover:scale-110 transition">
                排
              </div>
              <h3 className="text-2xl font-black text-[#292929] mb-3">日常排便规律</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                结合 <strong className="text-[#008C9E]">Fibersol-2 & IMO 膳食纤维</strong>，帮助增加粪便含水量与体积，维持肠道正常蠕动。
              </p>
            </div>

            {/* 养 */}
            <div className="bg-gradient-to-b from-[#F2FCE3] to-white p-8 rounded-3xl border border-[#A8DF45]/40 shadow-lg text-center relative overflow-hidden group hover:-translate-y-1 transition duration-300">
              <div className="absolute top-0 right-0 w-32 h-32 bg-[#A8DF45]/20 rounded-full blur-2xl"></div>
              <div className="w-24 h-24 mx-auto rounded-2xl bg-[#8bc322] text-white flex items-center justify-center font-black text-5xl shadow-md mb-6 group-hover:scale-110 transition">
                养
              </div>
              <h3 className="text-2xl font-black text-[#292929] mb-3">多元植物营养</h3>
              <p className="text-gray-600 font-medium leading-relaxed">
                精选 <strong className="text-[#7cb31c]">多色果蔬萃取精华</strong>，补充现代人日常饮食中难以摄取到的植物抗氧化营养。
              </p>
            </div>

          </div>

          <div className="mt-12 bg-[#F8FCFD] p-6 rounded-2xl border border-[#DDF9FC] text-center max-w-2xl mx-auto">
            <p className="text-base text-gray-700 font-bold">
              从消化、排便与日常营养三个方向，全面照顾您的肠道健康。
            </p>
          </div>
        </div>
      </section>

      {/* 05 — Enhanced Formula: 为什么选择 D’ Joy Plus？ */}
      <section id="formula" className="py-16 sm:py-24 bg-[#F8FCFD] border-t border-b border-[#DDF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#008C9E] uppercase tracking-wider bg-[#DDF9FC] px-3 py-1 rounded-full">
              科学配方
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mt-3 mb-4">
              为什么选择 D’ Joy Plus？
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              精选三大黄金核心成分，贴合亚洲人饮食习惯，温和调理不刺激。
            </p>
          </div>

          <div className="space-y-12">
            {/* Ingredient 1 */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-[#DDF9FC] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="bg-[#FFF5EC] p-6 rounded-2xl border border-orange-100">
                  <span className="text-xs font-bold text-[#FF963B] uppercase">成分一</span>
                  <h3 className="text-2xl font-black text-[#292929] mt-1 mb-3">DigeSEB Pro™ 复合消化酵素配方</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    专为分解碳水化合物、蛋白质与脂肪而设的科学复合酵素组合，有效协助日常饮食中的消化营养支持，告别饭后沉重感。
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F8FCFD] p-5 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-[#008C9E] mb-1">减轻饭后负担</h4>
                    <p className="text-xs text-gray-600">帮助分解大鱼大肉后滞留在胃部的食物，恢复轻盈。</p>
                  </div>
                  <div className="bg-[#F8FCFD] p-5 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-[#008C9E] mb-1">温和高效支持</h4>
                    <p className="text-xs text-gray-600">适合经常外食、消化功能随着年龄增长而减缓的成年人。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient 2 */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-[#DDF9FC] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 lg:order-2">
                <div className="bg-[#DDF9FC]/50 p-6 rounded-2xl border border-[#00C6D7]/30">
                  <span className="text-xs font-bold text-[#008C9E] uppercase">成分二</span>
                  <h3 className="text-2xl font-black text-[#292929] mt-1 mb-3">Fibersol-2 & IMO 膳食纤维与肠道营养</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    结合水溶性膳食纤维（Fibersol-2）与低聚异麦芽糖（IMO），强调日常膳食纤维摄取与规律排便的重要性，滋养肠道好菌。
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7 lg:order-1">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F8FCFD] p-5 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-[#008C9E] mb-1">增加粪便体积</h4>
                    <p className="text-xs text-gray-600">吸水膨胀，使排便更顺畅、告别蹲马桶半小时的痛苦。</p>
                  </div>
                  <div className="bg-[#F8FCFD] p-5 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-[#008C9E] mb-1">温和科学支持</h4>
                    <p className="text-xs text-gray-600">采用温和植物纤维成分，助力日常肠道规律运作。</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Ingredient 3 */}
            <div className="bg-white rounded-3xl p-8 sm:p-12 shadow-md border border-[#DDF9FC] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5">
                <div className="bg-[#F2FCE3] p-6 rounded-2xl border border-[#A8DF45]/40">
                  <span className="text-xs font-bold text-[#7cb31c] uppercase">成分三</span>
                  <h3 className="text-2xl font-black text-[#292929] mt-1 mb-3">多色果蔬萃取多元植物营养配方</h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    结合经核实的优质果蔬来源成分，补充日常饮食中常缺少的维生素与抗氧化植物营养素，让身体时刻充满活力。
                  </p>
                </div>
              </div>
              <div className="lg:col-span-7">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-[#F8FCFD] p-5 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-[#008C9E] mb-1">全面营养补充</h4>
                    <p className="text-xs text-gray-600">均衡膳食中的植物微量元素，维持身体机能健康。</p>
                  </div>
                  <div className="bg-[#F8FCFD] p-5 rounded-2xl border border-gray-100">
                    <h4 className="font-bold text-[#008C9E] mb-1">清甜顺口好喝</h4>
                    <p className="text-xs text-gray-600">天然果蔬风味，每日一杯如喝果汁般享受。</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 06 — French Formula 法国配方 */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6">
              <div className="relative">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#008C9E] to-[#00C6D7] rounded-3xl blur-xl opacity-20"></div>
                <div className="relative bg-[#F8FCFD] p-6 rounded-3xl border border-[#DDF9FC] shadow-xl">
                  <img 
                    src="/public/assets/aistudio/D_Joy_Plus_six-angle_product_reference_c94ed8f7.jpg" 
                    alt="D' Joy Plus 多角度包装展示" 
                    loading="lazy"
                    className="w-full h-auto rounded-2xl object-cover shadow"
                  />
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 bg-[#DDF9FC] px-4 py-1.5 rounded-full text-[#008C9E] text-xs font-bold uppercase tracking-wider">
                FORMULATED IN FRANCE | 法国配方
              </div>
              <h2 className="text-2xl sm:text-4xl font-black text-[#292929] tracking-tight">
                严谨高标准 · 结合复合酵素与植物纤维
              </h2>
              <p className="text-gray-600 text-base sm:text-lg font-medium leading-relaxed">
                D’ Joy Plus 包装标示为 <strong className="text-[#008C9E]">Formulated in France</strong>，结合复合酵素、膳食纤维与果蔬营养配方，为注重生活品质的现代人带来科学可靠的肠道养护方案。
              </p>
              <div className="space-y-3 pt-2">
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#008C9E] shrink-0" />
                  <span className="text-sm font-bold text-gray-700">精美条装设计，携带方便、即冲即饮</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#008C9E] shrink-0" />
                  <span className="text-sm font-bold text-gray-700">符合现代食品安全管理标准，品质层层把关</span>
                </div>
                <div className="flex items-center gap-3">
                  <CheckCircle2 className="w-5 h-5 text-[#008C9E] shrink-0" />
                  <span className="text-sm font-bold text-gray-700">温和不刺激，适合长期日常调理保养</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 07 — Company Profile & Certificates */}
      <section className="py-16 sm:py-24 bg-[#F8FCFD] border-t border-b border-[#DDF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#008C9E] uppercase tracking-wider bg-[#DDF9FC] px-3 py-1 rounded-full">
              品质信心
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mt-3 mb-4">
              专业品质，安心选择
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              由 M-Plan Sdn. Bhd. 严格把关，致力于为大众提供优质健康的营养保健饮品。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-3xl shadow-md border border-[#DDF9FC] text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#008C9E]/10 text-[#008C9E] flex items-center justify-center mx-auto mb-6">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#292929] mb-3">M-Plan Sdn. Bhd.</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                正规注册企业，秉持诚信、专业、品质至上的理念，服务马来西亚及东南亚广大消费者多年。
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md border border-[#DDF9FC] text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#FF963B]/10 text-[#FF963B] flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#292929] mb-3">严格品质管理</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                从原料采购、配方调制到成品包装，均严格符合相关食品安全与卫生管理标准。
              </p>
            </div>

            <div className="bg-white p-8 rounded-3xl shadow-md border border-[#DDF9FC] text-center">
              <div className="w-16 h-16 rounded-2xl bg-[#A8DF45]/20 text-[#7cb31c] flex items-center justify-center mx-auto mb-6">
                <CheckCircle2 className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-black text-[#292929] mb-3">正品官方授权</h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                所有网购及线下销售均为官方正品保障，杜绝假冒伪劣，让您买得放心、喝得安心。
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 08 — Google / Facebook Reviews */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#008C9E] uppercase tracking-wider bg-[#DDF9FC] px-3 py-1 rounded-full">
              口碑见证
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mt-3 mb-4">
              听听真实顾客的分享
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              来自马来西亚各地真实用家的真实评价与使用感受。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {REVIEWS_DATA.map((rev, idx) => (
              <div key={idx} className="bg-[#F8FCFD] p-6 rounded-2xl border border-[#DDF9FC] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-1 text-amber-400 mb-3">
                    {[...Array(rev.stars)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 text-sm sm:text-base font-medium leading-relaxed mb-6">
                    "{rev.comment}"
                  </p>
                </div>
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 text-xs">
                  <span className="font-bold text-[#292929]">{rev.name}</span>
                  <span className="text-[#008C9E] font-medium bg-[#DDF9FC] px-2 py-0.5 rounded">
                    {rev.source}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 09 — Customer Testimonials 真人见证 */}
      <section id="testimonials" className="py-16 sm:py-24 bg-[#F8FCFD] border-t border-b border-[#DDF9FC]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#008C9E] uppercase tracking-wider bg-[#DDF9FC] px-3 py-1 rounded-full">
              真实体验
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mt-3 mb-4">
              真实体验，真实分享
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              聆听马来西亚用家真实的心得与改变。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {TESTIMONIALS_DATA.map((testi, idx) => (
              <div key={idx} className="bg-white rounded-3xl overflow-hidden shadow-md border border-[#DDF9FC] flex flex-col justify-between">
                <div className="relative h-48 bg-gradient-to-br from-[#008C9E] to-[#00C6D7] flex items-center justify-center p-6 text-center text-white">
                  <div className="absolute inset-0 bg-black/10"></div>
                  <div className="relative z-10 space-y-2">
                    <span className="bg-white/20 px-3 py-1 rounded-full text-xs font-bold backdrop-blur-xs">
                      {testi.category}
                    </span>
                    <h3 className="text-lg font-bold tracking-tight">{testi.title}</h3>
                  </div>
                  <button 
                    onClick={() => setActiveVideoTitle(testi.title)}
                    className="absolute bottom-4 right-4 bg-white text-[#008C9E] w-10 h-10 rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition cursor-pointer"
                  >
                    <Play className="w-5 h-5 fill-[#008C9E] ml-0.5" />
                  </button>
                </div>
                <div className="p-6 flex flex-col justify-between flex-grow">
                  <p className="text-sm text-gray-600 mb-6 leading-relaxed">
                    "{testi.desc}"
                  </p>
                  <div className="border-t border-gray-100 pt-4 flex items-center justify-between text-xs">
                    <span className="font-bold text-[#292929]">{testi.author}</span>
                    <span className="text-gray-400 italic">个别使用体验因人而异</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 10 — 使用方法 & 冲泡视频 */}
      <section className="py-16 sm:py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#008C9E] uppercase tracking-wider bg-[#DDF9FC] px-3 py-1 rounded-full">
              简单便捷
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mt-3 mb-4">
              简单冲泡，融入每天的生活
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              只需简单三步，即可享受清甜可口的膳食纤维酵素饮品。
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            <div className="lg:col-span-6 space-y-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-[#F8FCFD] p-5 rounded-2xl border border-[#DDF9FC]">
                  <div className="w-10 h-10 rounded-xl bg-[#008C9E] text-white flex items-center justify-center font-black shrink-0">
                    1
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#292929] mb-1">撕开条装</h3>
                    <p className="text-sm text-gray-600">取出一包独立密封条装 D’ Joy Plus，沿切口轻轻撕开。</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#F8FCFD] p-5 rounded-2xl border border-[#DDF9FC]">
                  <div className="w-10 h-10 rounded-xl bg-[#008C9E] text-white flex items-center justify-center font-black shrink-0">
                    2
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#292929] mb-1">加入适量温水或冷水</h3>
                    <p className="text-sm text-gray-600">倒入约 150ml - 200ml 的温水或常温水（避免过热开水破坏酵素活性）。</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-[#F8FCFD] p-5 rounded-2xl border border-[#DDF9FC]">
                  <div className="w-10 h-10 rounded-xl bg-[#008C9E] text-white flex items-center justify-center font-black shrink-0">
                    3
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#292929] mb-1">搅拌均匀后饮用</h3>
                    <p className="text-sm text-gray-600">充分搅拌至完全溶解即可享用，建议每日 1-2 包（依个人日常饮食需求调整）。</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-md">
                <div className="absolute -inset-2 bg-gradient-to-r from-[#00C6D7] to-[#FFD43B] rounded-3xl blur-xl opacity-20"></div>
                <div className="relative bg-[#F8FCFD] p-6 rounded-3xl border border-[#DDF9FC] shadow-xl">
                  <img 
                    src="/public/assets/aistudio/D_Joy_Plus_Sachet_Multi-Angle_Showcase_2346ad53.jpg" 
                    alt="D' Joy Plus 独立条装多角度展示" 
                    loading="lazy"
                    className="w-full h-auto rounded-2xl object-cover shadow"
                  />
                  <div className="mt-4 text-center">
                    <span className="text-xs font-bold text-[#008C9E] bg-[#DDF9FC] px-3 py-1.5 rounded-lg inline-block">
                      随身携带 · 随时补充纤维与酵素
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 11 — FAQ */}
      <section id="faq" className="py-16 sm:py-24 bg-[#F8FCFD] border-t border-b border-[#DDF9FC]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <span className="text-xs font-bold text-[#008C9E] uppercase tracking-wider bg-[#DDF9FC] px-3 py-1 rounded-full">
              常见疑问
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mt-3 mb-4">
              常见问题解答 (FAQ)
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              为您解答关于 D’ Joy Plus 的各项疑问。
            </p>
          </div>

          <div className="space-y-4">
            {FAQ_DATA.map((faq, idx) => {
              const isOpen = activeFaq === idx;
              return (
                <div key={idx} className="bg-white rounded-2xl border border-[#DDF9FC] shadow-xs overflow-hidden transition">
                  <button
                    onClick={() => setActiveFaq(isOpen ? null : idx)}
                    className="w-full text-left p-5 sm:p-6 font-bold text-[#292929] flex items-center justify-between gap-4 cursor-pointer hover:bg-gray-50/50"
                  >
                    <span className="text-base sm:text-lg">{faq.q}</span>
                    <span className="w-8 h-8 rounded-full bg-[#DDF9FC] text-[#008C9E] flex items-center justify-center shrink-0">
                      {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 sm:px-6 pb-6 text-gray-600 text-sm sm:text-base leading-relaxed border-t border-gray-100 pt-4">
                      {faq.a}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <div className="mt-12 bg-amber-50 border border-amber-200 rounded-2xl p-6 flex items-start gap-4">
            <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
            <div className="text-xs sm:text-sm text-amber-900 leading-relaxed font-medium">
              <strong>健康温馨提示：</strong> 持续或新出现的排便改变、胃胀或消化不良，尤其伴随便血、体重下降或严重腹痛，应及时就医。本产品不能替代医疗诊断或治疗。
            </div>
          </div>
        </div>
      </section>

      {/* 12 — Pricing & Promotions */}
      <section id="pricing" className="py-16 sm:py-24 bg-white relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <span className="text-xs font-bold text-[#650F16] uppercase tracking-wider bg-[#FFD43B]/40 px-3 py-1 rounded-full">
              限时特惠
            </span>
            <h2 className="text-2xl sm:text-4xl font-black text-[#292929] mt-3 mb-4">
              选择适合您的配套
            </h2>
            <p className="text-base sm:text-lg text-gray-600">
              全马包邮送到府上，支持多种便捷付款与专业售后咨询。
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {PACKAGES.map((pkg) => {
              const isSelected = selectedPkg.id === pkg.id;
              return (
                <div 
                  key={pkg.id}
                  onClick={() => setSelectedPkg(pkg)}
                  className={`relative rounded-3xl p-8 cursor-pointer transition-all duration-300 flex flex-col justify-between border-2 ${
                    pkg.popular 
                      ? 'bg-gradient-to-b from-[#F8FCFD] to-white border-[#008C9E] shadow-xl scale-[1.02]' 
                      : 'bg-white border-gray-200 shadow-md hover:border-[#00C6D7]'
                  } ${isSelected ? 'ring-4 ring-[#00C6D7]/40' : ''}`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FFD43B] text-[#650F16] font-black text-xs px-4 py-1.5 rounded-full shadow-md uppercase tracking-wider">
                      ★ 推荐热销配套 ★
                    </div>
                  )}

                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-black text-[#292929]">{pkg.name}</h3>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center ${isSelected ? 'border-[#008C9E] bg-[#008C9E] text-white' : 'border-gray-300'}`}>
                        {isSelected && <CheckCircle2 className="w-4 h-4" />}
                      </div>
                    </div>

                    {pkg.tag && (
                      <div className="bg-[#DDF9FC] text-[#008C9E] text-xs font-bold px-3 py-1.5 rounded-xl mb-6 text-center">
                        {pkg.tag}
                      </div>
                    )}

                    <div className="mb-6">
                      <div className="flex items-baseline gap-2">
                        <span className="text-3xl sm:text-4xl font-black text-[#008C9E]">RM {pkg.price}</span>
                        {pkg.savings > 0 && (
                          <span className="text-sm text-gray-400 line-through">RM {pkg.originalPrice}</span>
                        )}
                      </div>
                      {pkg.savings > 0 && (
                        <p className="text-xs font-bold text-[#650F16] mt-1">
                          为您省下 RM {pkg.savings}！
                        </p>
                      )}
                    </div>

                    <ul className="space-y-2.5 text-xs sm:text-sm text-gray-600 font-medium mb-8">
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#008C9E]" />
                        <span>含 {pkg.boxes * 30} 条装高纤维酵素</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#008C9E]" />
                        <span>全马包邮送到府上</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#008C9E]" />
                        <span>中文客服专属售后指导</span>
                      </li>
                    </ul>
                  </div>

                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedPkg(pkg);
                      handleOpenLeadModal('pricing_card', pkg);
                    }}
                    className={`w-full py-3.5 rounded-2xl font-bold text-base transition shadow-md flex items-center justify-center gap-2 cursor-pointer ${
                      pkg.popular
                        ? 'bg-[#FFD43B] hover:bg-[#ffcb14] text-[#650F16]'
                        : 'bg-[#008C9E] hover:bg-[#007382] text-white'
                    }`}
                  >
                    <span>立即订购此配套</span>
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              );
            })}
          </div>

          <div className="mt-16 bg-[#F8FCFD] p-8 rounded-3xl border border-[#DDF9FC] max-w-3xl mx-auto text-center space-y-4">
            <h3 className="text-xl font-bold text-[#292929]">已选择：<span className="text-[#008C9E]">{selectedPkg.name} (RM {selectedPkg.price})</span></h3>
            <p className="text-sm text-gray-600">点击下方按钮，立即通过咨询表单或 WhatsApp 与客服确认订单，快速安排发货。</p>
            <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
              <button
                onClick={() => handleOpenLeadModal('pricing_summary', selectedPkg)}
                className="bg-[#008C9E] hover:bg-[#007382] text-white font-black text-lg px-8 py-4 rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <Package className="w-5 h-5" />
                <span>填写资料并提交咨询</span>
              </button>
              <button
                onClick={() => handleWhatsApp('pricing_summary', `您好，我想了解 ${selectedPkg.name} (RM ${selectedPkg.price}) 的详情与购买流程。`)}
                className="bg-[#25D366] hover:bg-[#20ba5a] text-white font-bold text-base px-6 py-4 rounded-2xl shadow-lg transition flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5" />
                <span>直接 WhatsApp 咨询</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 13 — Final CTA & Footer */}
      <footer className="bg-[#292929] text-gray-300 pt-16 pb-24 sm:pb-16 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-[#008C9E] flex items-center justify-center text-white font-black text-xl">
                  D+
                </div>
                <h3 className="text-xl font-black text-white">D’ Joy Plus</h3>
              </div>
              <p className="text-xs text-gray-400 leading-relaxed">
                排得顺畅 · 吃得开心 · 活得自在。法国配方高纤维酵素植物饮品，为现代人提供科学可靠的日常肠胃营养保养方案。
              </p>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">快速导航</h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#benefits" className="hover:text-[#00C6D7] transition">三大胃肠困扰</a></li>
                <li><a href="#core" className="hover:text-[#00C6D7] transition">消 · 排 · 养 核心理念</a></li>
                <li><a href="#formula" className="hover:text-[#00C6D7] transition">法国配方成分</a></li>
                <li><a href="#pricing" className="hover:text-[#00C6D7] transition">特惠配套与价格</a></li>
                <li><a href="#faq" className="hover:text-[#00C6D7] transition">常见问题 FAQ</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">官方授权与企业</h4>
              <ul className="space-y-2.5 text-xs text-gray-400">
                <li>总经销 / 代理商: M-Plan Sdn. Bhd.</li>
                <li>产品类型: 高纤维酵素植物饮品</li>
                <li>规格: 10g × 30 条装 (Box)</li>
                <li>产地标示: Formulated in France</li>
              </ul>
            </div>

            <div>
              <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">中文客服咨询</h4>
              <p className="text-xs text-gray-400 mb-4">
                有任何产品疑问或配套咨询，欢迎随时联系我们的专业中文客服团队。
              </p>
              <button
                onClick={() => handleWhatsApp('footer_widget')}
                className="bg-[#008C9E] hover:bg-[#007382] text-white text-xs font-bold px-4 py-2.5 rounded-xl transition flex items-center gap-2 cursor-pointer"
              >
                <MessageCircle className="w-4 h-4" />
                <span>WhatsApp 客服热线</span>
              </button>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-500 space-y-3">
            <div className="flex items-center justify-center gap-4">
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-white underline cursor-pointer"
              >
                隐私政策 (Privacy Policy)
              </button>
              <span>|</span>
              <button
                onClick={() => setIsPrivacyOpen(true)}
                className="hover:text-white underline cursor-pointer"
              >
                服务条款 (Terms & Conditions)
              </button>
            </div>
            <p>
              © {new Date().getFullYear()} D’ Joy Plus (M-Plan Sdn. Bhd.) 版权所有。All Rights Reserved.
            </p>
            <p className="max-w-3xl mx-auto leading-relaxed">
              免责声明：本网站所载内容仅供参考，不作为医疗诊断、治疗或处方依据。个别使用体验因人而异。如有严重健康不适，请及时咨询专业医师。
            </p>
          </div>
        </div>
      </footer>

      {/* Sticky Mobile Bottom Bar */}
      <div className="sm:hidden fixed bottom-0 left-0 right-0 bg-white/95 backdrop-blur-md border-t border-gray-200 p-3 z-40 flex items-center justify-between gap-3 shadow-2xl">
        <div>
          <div className="text-[10px] text-gray-500 font-medium">{selectedPkg.name}</div>
          <div className="text-base font-black text-[#008C9E]">RM {selectedPkg.price}</div>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={() => handleWhatsApp('sticky_bar')}
            className="bg-[#25D366] text-white px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
          >
            <MessageCircle className="w-4 h-4" />
            <span>咨询</span>
          </button>
          <button
            onClick={() => handleOpenLeadModal('sticky_bar', selectedPkg)}
            className="bg-[#FFD43B] text-[#650F16] px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1 shadow cursor-pointer"
          >
            <Package className="w-4 h-4" />
            <span>立即订购</span>
          </button>
        </div>
      </div>

      {/* Modals */}
      <LeadModal
        isOpen={isLeadModalOpen}
        onClose={() => setIsLeadModalOpen(false)}
        selectedPkg={selectedPkg}
        ctaSource={leadModalSource}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
      />

      <VideoModal
        title={activeVideoTitle}
        onClose={() => setActiveVideoTitle(null)}
      />

    </div>
  );
}
