import { PackageOption, ReviewItem, TestimonialItem, FaqItem } from '../types';

export const PACKAGES: PackageOption[] = [
  {
    id: 'pkg-1',
    name: '体验装 (1盒)',
    boxes: 1,
    price: 168,
    originalPrice: 168,
    savings: 0,
  },
  {
    id: 'pkg-2',
    name: '热销推荐装 (2盒)',
    boxes: 2,
    price: 288,
    originalPrice: 336,
    savings: 48,
    popular: true,
    tag: '只需多加 RM120，就能多拿1盒！'
  },
  {
    id: 'pkg-3',
    name: '疗程巩固装 (3盒)',
    boxes: 3,
    price: 414,
    originalPrice: 504,
    savings: 90,
    tag: '超值划算'
  },
  {
    id: 'pkg-4',
    name: '买4送2 (6盒)',
    boxes: 6,
    price: 672,
    originalPrice: 1008,
    savings: 336,
    tag: '全家共享首选'
  },
  {
    id: 'pkg-5',
    name: '买8送4 (12盒)',
    boxes: 12,
    price: 1240,
    originalPrice: 2016,
    savings: 776,
    tag: '长期调理最优惠'
  }
];

export const REVIEWS_DATA: ReviewItem[] = [
  {
    name: '槟城林太太 (62岁)',
    comment: '以前经常两三天上不到厕所，肚子胀得很难受。喝了D’ Joy Plus几天后，现在每天早上都顺畅很多，整个人轻松了！',
    source: 'Google 真实评价',
    stars: 5,
    date: '2026-11'
  },
  {
    name: '吉隆坡陈先生 (55岁)',
    comment: '应酬多、常常胃胀胃气多。朋友介绍这款法国配方酵素，饭后喝一杯感觉舒服很多，不会顶着胃了。',
    source: 'Facebook 顾客分享',
    stars: 5,
    date: '2026-11'
  },
  {
    name: '新山黄女士 (48岁)',
    comment: '味道酸甜很好入口，不像有些纤维粉很难喝。独立条装带去公司或出门旅游泡一杯很方便，非常推荐！',
    source: 'Google 真实评价',
    stars: 5,
    date: '2026-10'
  },
  {
    name: '怡保张先生 (68岁)',
    comment: '年纪大了消化比较慢，容易胃口不好。现在每天中午饭后喝一包，消化顺畅了，胃口也开朗了。',
    source: 'Facebook 顾客分享',
    stars: 5,
    date: '2026-10'
  },
  {
    name: '八打灵再也王女士 (51岁)',
    comment: '客服态度很好，发货也快。最重要的是成份天然温和，喝了不会绞痛，是全家人的肠胃好帮手。',
    source: 'Google 真实评价',
    stars: 5,
    date: '2026-09'
  },
  {
    name: '马六甲李先生 (59岁)',
    comment: '买给家里长辈试看，结果长辈非常满意，现在叫我定期补货。感谢D’ Joy Plus！',
    source: 'Facebook 顾客分享',
    stars: 5,
    date: '2026-09'
  }
];

export const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    title: '便秘困扰改善分享：重拾每日顺畅',
    category: '便秘调理',
    desc: '分享者分享了多年排便不顺、蹲马桶痛苦，到使用 D’ Joy Plus 后恢复每日定时顺畅的转变。',
    author: '林女士 (58岁，家庭主妇)'
  },
  {
    title: '饭后胃胀大改善：享受美食不再担惊受怕',
    category: '胃胀消除',
    desc: '探讨如何通过复合消化酵素缓解饭后胃气胀、饱胀感，找回轻松自在的饮食乐趣。',
    author: '陈先生 (61岁，退休人士)'
  },
  {
    title: '日常消化与全家养生保健心得',
    category: '日常养生',
    desc: '分享全家人如何将 D’ Joy Plus 融入日常饮食中，作为温和补充纤维与果蔬营养的长期保养秘诀。',
    author: '王太太 (53岁，行政主管)'
  }
];

export const FAQ_DATA: FaqItem[] = [
  {
    q: 'D’ Joy Plus 是什么？',
    a: 'D’ Joy Plus 是一款结合复合消化酵素、膳食纤维与多元果蔬营养成分的植物饮品冲调产品，具体配方与成份说明请参阅产品包装标示。'
  },
  {
    q: '排便不顺畅的人适合吗？',
    a: '膳食纤维有助增加粪便体积与维持正常排便；产品性质温和，是否适合需视个人体质与饮食习惯而定。'
  },
  {
    q: '经常胃胀可以喝吗？',
    a: '产品含有复合消化酵素配方，可为日常饮食提供消化营养支持。若胃胀情况持续，建议咨询专业医生。'
  },
  {
    q: '消化不良可以喝吗？',
    a: '可以。DigeSEB Pro™ 复合酵素配方专门协助碳水化合物、蛋白质与脂肪的日常分解，饭后饮用更舒适。'
  },
  {
    q: '多久才会有感觉？',
    a: '个别使用体验因人而异，取决于个人体质、饮食习惯与水分摄取量，本产品不保证特定时间或结果。'
  },
  {
    q: '怎样冲泡、每天喝多少？',
    a: '建议每日 1-2 包，以 150ml-200ml 温/冷水冲泡搅拌均匀饮用。详细说明请参考产品包装及冲泡指南。'
  },
  {
    q: '长期服药或有慢性疾病可以喝吗？',
    a: '孕妇、哺乳期妇女或长期服药及有特殊健康状况者，建议在饮用前先向主治医生或药剂师咨询确认。'
  },
  {
    q: '如何购买、付款及配送？',
    a: '我们提供全马现货速递与安全的下单服务。您可以直接在下方选择配套并点击咨询或下单，由中文客服为您安排。'
  },
  {
    q: '有售后服务吗？',
    a: '有的。我们拥有专业的中文客服团队，为您解答任何产品使用及配送相关问题。'
  }
];
