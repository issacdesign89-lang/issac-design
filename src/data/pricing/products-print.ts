/**
 * 인쇄물 카테고리 제품 데이터
 * 실사박사 가격 역공학 데이터 기반 (2026-03-26 분석)
 *
 * 포함 제품:
 * 1. 디지털명함-단면 (수량 기반, 20종 용지)
 * 2. 디지털전단지-단면 (수량 기반, 사이즈 x 용지 x 무게)
 * 3. 디지털포스터-단면 (수량 기반, 사이즈 x 용지 x 무게)
 * 4. 디지털인쇄-스티커 (수량 기반, 사이즈별 고정가)
 * 5. 디지털메뉴판-단면 (수량 기반, 사이즈 x 용지)
 */

import type { CategoryConfig, ProductConfig } from './types';

// ─── 공통 디자인 옵션 (인쇄물 전용, 가격이 다름) ───

/** 명함용 디자인 옵션 (단면: 22,000 / 44,000 / 66,000) */
const NAMECARD_DESIGN_OPTIONS = [
  { label: '셀프 교정', value: 'self-proof', price: 0, description: '고객이 직접 교정' },
  { label: '완성 파일 접수', value: 'complete-file', price: 0, description: '완성된 인쇄 파일 제출' },
  { label: '셀프 디자인', value: 'self-design', price: 0, description: '온라인 에디터로 직접 디자인' },
  { label: '일반 디자인', value: 'basic-design', price: 22000, description: '단면 / 시안 수정 3회' },
  { label: '고급 디자인', value: 'premium-design', price: 44000, description: '단면 / 시안 수정 3회' },
  { label: '명품 디자인', value: 'luxury-design', price: 66000, description: '단면 / 시안 수정 3회' },
];

/** 전단지/포스터/메뉴판용 디자인 옵션 (단면 기준) */
const PRINT_DESIGN_OPTIONS = [
  { label: '셀프 교정', value: 'self-proof', price: 0, description: '고객이 직접 교정' },
  { label: '완성 파일 접수', value: 'complete-file', price: 0, description: '완성된 인쇄 파일 제출' },
  { label: '셀프 디자인', value: 'self-design', price: 0, description: '온라인 에디터로 직접 디자인' },
  { label: '일반 디자인', value: 'basic-design', price: 33000, description: '단면 / 시안 수정 3회' },
  { label: '고급 디자인', value: 'premium-design', price: 66000, description: '단면 / 시안 수정 3회' },
  { label: '명품 디자인', value: 'luxury-design', price: 99000, description: '단면 / 시안 수정 3회' },
];

// ─── 1. 디지털명함-단면 ───

const digitalNamecardSingle: ProductConfig = {
  id: 'digital-namecard-single',
  slug: 'digital-namecard-single',
  name: '디지털명함-단면',
  categoryId: 'print',
  categoryName: '인쇄물',
  subcategory: '명함',
  description: '20종 특수지, 100~1000장, 후가공/코팅 선택 가능. 사이즈 90x50mm 고정.',
  thumbnail: 'https://picsum.photos/seed/namecard-s/400/400.webp',
  pricingMode: 'quantity',

  // 스노우지 기준 수량별 총 가격 (용지 옵션으로 단가 보정)
  // 공식: 2,750 + (수량 - 100) / 100 * 1,650 = 1,100 + 16.5 * 수량
  quantityPriceTable: {
    tiers: [
      [100, 2750],
      [200, 4400],
      [300, 6050],
      [400, 7700],
      [500, 9350],
      [600, 11000],
      [700, 12650],
      [800, 14300],
      [900, 15950],
      [1000, 17600],
    ],
  },

  sizeInput: { enabled: false }, // 90x50mm 고정
  quantityInput: {
    enabled: true,
    min: 100,
    max: 1000,
    presets: [100, 200, 300, 500, 1000],
    label: '인쇄량',
  },

  optionGroups: [
    {
      id: 'paper',
      label: '용지 선택',
      type: 'button',
      required: true,
      options: [
        { label: '스노우지', value: 'snow', price: 0, default: true },
        { label: '마쉬멜로우', value: 'marshmallow', price: 550 },       // 3,300 - 2,750 = +550
        { label: '그레이스지', value: 'grace', price: 550 },             // 3,300 - 2,750
        { label: '탄트지', value: 'tant', price: 1100 },                 // 3,850 - 2,750
        { label: '랑데뷰 210g', value: 'rendezvous-210', price: 1100 },  // 3,850 - 2,750
        { label: '반누보', value: 'vannuvo', price: 1650 },              // 4,400 - 2,750
        { label: '휘라레', value: 'firare', price: 1650 },               // 4,400 - 2,750
        { label: '아르떼', value: 'arte', price: 1650 },                 // 4,400 - 2,750
        { label: '랑데뷰 240g', value: 'rendezvous-240', price: 1650 },  // 4,400 - 2,750
        { label: '띤또레또', value: 'tintoretto', price: 2200 },         // 4,950 - 2,750
        { label: '키칼라', value: 'keykala', price: 2200 },              // 4,950 - 2,750
        { label: '팝셋지', value: 'popset', price: 2200 },               // 4,950 - 2,750
        { label: '스타드림', value: 'stardream', price: 2200 },           // 4,950 - 2,750
        { label: '스타드림골드', value: 'stardream-gold', price: 2200 },   // 4,950 - 2,750
        { label: '스코트랜드지', value: 'scotland', price: 2200 },        // 4,950 - 2,750
        { label: '실리카블루', value: 'silica-blue', price: 3850 },       // 6,600 - 2,750
        { label: '엑스트라 누보', value: 'extra-nuovo', price: 3850 },    // 6,600 - 2,750
        { label: '유포지', value: 'yupo', price: 4950 },                  // 7,700 - 2,750
        { label: '엑스트라 휘라레', value: 'extra-firare', price: 6050 }, // 8,800 - 2,750
        { label: '시리오펄 스노우', value: 'sirio-pearl', price: 7150 },  // 9,900 - 2,750
      ],
    },
    {
      id: 'finishing',
      label: '후가공 선택',
      type: 'button',
      required: true,
      options: [
        { label: '선택안해요', value: 'none', price: 0, default: true },
        { label: '금박', value: 'gold-foil', price: 8250, priceType: 'fixed' },
        { label: '은박', value: 'silver-foil', price: 8250, priceType: 'fixed' },
        { label: '바니시', value: 'varnish', price: 8250, priceType: 'fixed' },
      ],
    },
    {
      id: 'coating',
      label: '코팅면 선택',
      type: 'button',
      required: true,
      options: [
        { label: '코팅안해요', value: 'none', price: 0, default: true },
        { label: '단면무광코팅', value: 'single-matte', price: 3630, priceType: 'fixed' },
        { label: '양면무광코팅', value: 'double-matte', price: 7150, priceType: 'fixed' },
      ],
    },
    {
      id: 'corner',
      label: '귀돌이 선택',
      type: 'button',
      required: false,
      options: [
        { label: '신청안해요', value: 'none', price: 0, default: true },
        { label: '신청합니다', value: 'round', price: 0 },
      ],
    },
    {
      id: 'case',
      label: '케이스 선택',
      type: 'button',
      required: false,
      options: [
        { label: '신청안해요', value: 'none', price: 0, default: true },
        { label: '신청합니다', value: 'yes', price: 0 },
      ],
    },
  ],

  designOptions: NAMECARD_DESIGN_OPTIONS,

  specs: [
    { label: '사이즈', value: '90mm x 50mm (고정)' },
    { label: '인쇄', value: '디지털(소량) 양면 풀컬러' },
    { label: '용지', value: '20종 특수지 선택 가능' },
  ],
  deliveryInfo: '오후 1시 이전 입금확인+데이터접수 완료 시, 3~4일 이내 발송',
  notes: [
    '100장 단위 주문 (100~1,000장)',
    '양면 인쇄는 별도 상품으로 주문해 주세요',
    '후가공(금박/은박/바니시)은 수량과 무관하게 고정 추가 금액',
  ],
};

// ─── 2. 디지털전단지-단면 ───

const digitalFlyerSingle: ProductConfig = {
  id: 'digital-flyer-single',
  slug: 'digital-flyer-single',
  name: '디지털전단지-단면',
  categoryId: 'print',
  categoryName: '인쇄물',
  subcategory: '전단지',
  description: 'A3/A4/A5 사이즈, 3종 용지(스노우/아트지/모조지), 100g/120g 선택 가능.',
  thumbnail: 'https://picsum.photos/seed/flyer-s/400/400.webp',
  pricingMode: 'quantity',

  // A4 스노우 100g 기준 수량별 총 가격 (기본 옵션 선택 시)
  quantityPriceTable: {
    tiers: [
      [100, 11330],
      [200, 20020],
      [300, 28710],
      [400, 37290],
      [500, 45870],
      [600, 54450],
      [700, 63030],
      [800, 71610],
      [900, 80190],
      [1000, 88770],
    ],
  },

  sizeInput: { enabled: false }, // 사이즈는 옵션으로 선택
  quantityInput: {
    enabled: true,
    min: 100,
    max: 1000,
    presets: [100, 200, 300, 500, 1000],
    label: '인쇄량',
  },

  optionGroups: [
    {
      id: 'size',
      label: '출력물 선택 (사이즈)',
      type: 'button',
      required: true,
      options: [
        // 가격 차이를 A4 100g 기준 대비 추가분으로 산정
        { label: 'A3 (297x420mm)', value: 'a3', price: 7260, priceType: 'fixed' },   // 18,590 - 11,330
        { label: 'A4 (210x297mm)', value: 'a4', price: 0, default: true },            // 기준가
        { label: 'A5 (148x210mm)', value: 'a5', price: -4257, priceType: 'fixed' },   // 7,073 - 11,330
      ],
    },
    {
      id: 'paper',
      label: '페이퍼 선택 (용지+무게)',
      type: 'button',
      required: true,
      options: [
        // 같은 무게에서 용지 종류별 가격 차이 없음 - 무게만 영향
        { label: '스노우 100g', value: 'snow-100', price: 0, default: true },
        { label: '스노우 120g', value: 'snow-120', price: 220, priceType: 'fixed' },  // 11,550 - 11,330
        { label: '아트지 100g', value: 'art-100', price: 0 },
        { label: '아트지 120g', value: 'art-120', price: 220, priceType: 'fixed' },
        { label: '모조지 100g', value: 'mojo-100', price: 0 },
        { label: '모조지 120g', value: 'mojo-120', price: 220, priceType: 'fixed' },
      ],
    },
  ],

  designOptions: PRINT_DESIGN_OPTIONS,

  specs: [
    { label: '사이즈', value: 'A3 / A4 / A5 선택' },
    { label: '인쇄', value: '디지털(소량) 단면 풀컬러' },
    { label: '용지', value: '스노우/아트지/모조지 (100g/120g)' },
  ],
  deliveryInfo: '오후 1시 이전 입금확인+데이터접수 완료 시, 3~4일 이내 발송',
  notes: [
    '100장 단위 주문 (100~1,000장)',
    '같은 무게에서 용지 종류별 가격 차이 없음',
    '양면 인쇄는 별도 상품으로 주문해 주세요',
  ],
};

// ─── 3. 디지털포스터-단면 ───

const digitalPosterSingle: ProductConfig = {
  id: 'digital-poster-single',
  slug: 'digital-poster-single',
  name: '디지털포스터-단면',
  categoryId: 'print',
  categoryName: '인쇄물',
  subcategory: '포스터',
  description: 'A3/B4 사이즈, 12종 용지, 후가공/코팅 선택 가능. 10장~2000장 소량인쇄.',
  thumbnail: 'https://picsum.photos/seed/poster-s/400/400.webp',
  pricingMode: 'quantity',

  // A3 스노우 120g 기준 수량별 가격
  quantityPriceTable: {
    tiers: [
      [10, 3905],
      [20, 5500],
      [30, 7095],
      [40, 8745],
      [50, 10340],
      [60, 11990],
      [70, 13585],
      [80, 15235],
      [90, 16830],
      [100, 18480],
      [200, 32890],
      [500, 90530],
      [1000, 148170],
      [2000, 292270],
    ],
  },

  sizeInput: { enabled: false },
  quantityInput: {
    enabled: true,
    min: 10,
    max: 2000,
    presets: [10, 20, 50, 100, 200, 500, 1000],
    label: '인쇄량',
  },

  optionGroups: [
    {
      id: 'size',
      label: '출력물 선택 (사이즈)',
      type: 'button',
      required: true,
      options: [
        // A3과 B4 가격 동일
        { label: 'A3 (297x420mm)', value: 'a3', price: 0, default: true },
        { label: 'B4 (257x364mm)', value: 'b4', price: 0 },
      ],
    },
    {
      id: 'paper',
      label: '용지 선택',
      type: 'button',
      required: true,
      options: [
        // 용지 종류별 가격 차이 없음, 무게에 따라 차이
        { label: '스노우 120g', value: 'snow-120', price: 0, default: true },
        { label: '스노우 150g', value: 'snow-150', price: 110, priceType: 'fixed' },   // 4,015 - 3,905
        { label: '스노우 200g', value: 'snow-200', price: 330, priceType: 'fixed' },   // 4,235 - 3,905
        { label: '스노우 250g', value: 'snow-250', price: 550, priceType: 'fixed' },   // 4,455 - 3,905
        { label: '아트지 120g', value: 'art-120', price: 0 },
        { label: '아트지 150g', value: 'art-150', price: 110, priceType: 'fixed' },
        { label: '아트지 200g', value: 'art-200', price: 330, priceType: 'fixed' },
        { label: '아트지 250g', value: 'art-250', price: 550, priceType: 'fixed' },
        { label: '모조지 120g', value: 'mojo-120', price: 0 },
        { label: '모조지 150g', value: 'mojo-150', price: 110, priceType: 'fixed' },
        { label: '모조지 180g', value: 'mojo-180', price: 330, priceType: 'fixed' },
        { label: '모조지 220g', value: 'mojo-220', price: 550, priceType: 'fixed' },
      ],
    },
    {
      id: 'finishing',
      label: '후가공 선택',
      type: 'button',
      required: true,
      options: [
        { label: '선택안해요', value: 'none', price: 0, default: true },
        { label: '금박', value: 'gold-foil', price: 8250, priceType: 'fixed' },
        { label: '은박', value: 'silver-foil', price: 8250, priceType: 'fixed' },
        { label: '바니시', value: 'varnish', price: 8250, priceType: 'fixed' },
      ],
    },
    {
      id: 'coating',
      label: '코팅면 선택',
      type: 'button',
      required: true,
      options: [
        { label: '코팅안해요', value: 'none', price: 0, default: true },
        { label: '단면무광코팅', value: 'single-matte', price: 3630, priceType: 'fixed' },
        { label: '양면무광코팅', value: 'double-matte', price: 7150, priceType: 'fixed' },
      ],
    },
  ],

  designOptions: PRINT_DESIGN_OPTIONS,

  specs: [
    { label: '사이즈', value: 'A3 (297x420mm) / B4 (257x364mm)' },
    { label: '인쇄', value: '디지털(소량) 단면 풀컬러' },
    { label: '용지', value: '스노우/아트지/모조지 (120g~250g)' },
  ],
  deliveryInfo: '오후 1시 이전 입금확인+데이터접수 완료 시, 3~4일 이내 발송',
  notes: [
    '10장 단위 주문 (10~2,000장)',
    'A3과 B4 가격 동일',
    '같은 무게에서 용지 종류별 가격 차이 없음',
  ],
};

// ─── 4. 디지털인쇄-스티커 ───

const digitalSticker: ProductConfig = {
  id: 'digital-sticker',
  slug: 'digital-sticker',
  name: '디지털인쇄-스티커',
  categoryId: 'print',
  categoryName: '인쇄물',
  subcategory: '스티커',
  description: 'A5/A4/A3 아트지 스티커, 반컷팅/개별재단 선택 가능. 소량 맞춤 스티커.',
  thumbnail: 'https://picsum.photos/seed/sticker-d/400/400.webp',
  pricingMode: 'quantity',

  // 전 사이즈/수량 동일 기본가 2,200원
  quantityPriceTable: {
    tiers: [
      [1, 2200],
      [2, 4400],
      [3, 6600],
      [4, 8800],
    ],
  },

  sizeInput: { enabled: false },
  quantityInput: {
    enabled: true,
    min: 1,
    max: 4,
    presets: [1, 2, 3, 4],
    label: '인쇄량 (장)',
  },

  optionGroups: [
    {
      id: 'size',
      label: '출력물 선택 (사이즈)',
      type: 'button',
      required: true,
      options: [
        // 전 사이즈 동일가
        { label: 'A5 (148x210mm)', value: 'a5', price: 0, default: true },
        { label: 'A4 (210x297mm)', value: 'a4', price: 0 },
        { label: 'A3 (297x420mm)', value: 'a3', price: 0 },
      ],
    },
    {
      id: 'cutting',
      label: '반컷팅 선택',
      type: 'button',
      required: true,
      options: [
        { label: '정사각컷팅', value: 'square', price: 0, default: true },
        { label: '귀돌이컷팅', value: 'round-corner', price: 0 },
        { label: '디자인컷팅', value: 'design-cut', price: 220, priceType: 'fixed' },
      ],
    },
    {
      id: 'individual-cut',
      label: '개별재단 선택',
      type: 'button',
      required: false,
      options: [
        { label: '개별재단 사용안해요', value: 'none', price: 0, default: true },
        { label: '개별재단 사용합니다', value: 'yes', price: 0 },
      ],
    },
  ],

  designOptions: PRINT_DESIGN_OPTIONS,

  specs: [
    { label: '사이즈', value: 'A5 / A4 / A3 선택' },
    { label: '소재', value: '아트지 스티커' },
    { label: '반컷팅', value: '정사각/귀돌이/디자인 컷팅' },
  ],
  deliveryInfo: '오후 1시 이전 입금확인+데이터접수 완료 시, 3~4일 이내 발송',
  notes: [
    '1~4장 소량 주문 전용',
    '전 사이즈 동일 가격 (2,200원/장)',
    '디자인컷팅 선택 시 +220원 추가',
  ],
};

// ─── 5. 디지털메뉴판-단면 ───

const digitalMenuSingle: ProductConfig = {
  id: 'digital-menu-single',
  slug: 'digital-menu-single',
  name: '디지털메뉴판-단면',
  categoryId: 'print',
  categoryName: '인쇄물',
  subcategory: '메뉴판',
  description: 'A3/A4/08절/16절 사이즈, 스노우 300g, 후가공/코팅/오시 선택 가능.',
  thumbnail: 'https://picsum.photos/seed/menu-s/400/400.webp',
  pricingMode: 'quantity',

  // A3 300g 기준 수량별 가격 (10장 단위)
  // 공식: 2,090 + 22 * 수량
  quantityPriceTable: {
    tiers: [
      [10, 4290],
      [20, 6490],
      [30, 8690],
      [40, 10890],
      [50, 13090],
      [60, 15290],
      [70, 17490],
      [80, 19690],
      [90, 21890],
      [100, 24090],
    ],
  },

  sizeInput: { enabled: false },
  quantityInput: {
    enabled: true,
    min: 10,
    max: 100,
    presets: [10, 20, 30, 50, 100],
    label: '인쇄량',
  },

  optionGroups: [
    {
      id: 'size',
      label: '출력물 선택 (사이즈)',
      type: 'button',
      required: true,
      options: [
        { label: 'A3 단면 (스노우 300g)', value: 'a3', price: 0, default: true },
        { label: 'A4 단면 (스노우 300g)', value: 'a4', price: -1100, priceType: 'fixed' },  // 3,190 - 4,290
        { label: '08절 단면 (스노우 300g)', value: '08', price: 0 },                         // 4,290 동일
        { label: '16절 단면 (스노우 300g)', value: '16', price: -1100, priceType: 'fixed' }, // 3,190 - 4,290
      ],
    },
    {
      id: 'finishing',
      label: '후가공 선택',
      type: 'button',
      required: true,
      options: [
        { label: '선택안해요', value: 'none', price: 0, default: true },
        { label: '금박', value: 'gold-foil', price: 12870, priceType: 'fixed' },
        { label: '은박', value: 'silver-foil', price: 12870, priceType: 'fixed' },
        { label: '바니시', value: 'varnish', price: 12870, priceType: 'fixed' },
      ],
    },
    {
      id: 'osi',
      label: '오시 선택',
      type: 'button',
      required: false,
      options: [
        { label: '오시 없음', value: 'none', price: 0, default: true },
        { label: '오시 1줄', value: '1', price: 0 },
        { label: '오시 2줄', value: '2', price: 0 },
        { label: '오시 3줄', value: '3', price: 0 },
        { label: '오시 4줄', value: '4', price: 0 },
      ],
    },
    {
      id: 'coating',
      label: '코팅면 선택',
      type: 'button',
      required: true,
      options: [
        { label: '코팅안해요', value: 'none', price: 0, default: true },
        { label: '단면무광코팅', value: 'single-matte', price: 4400, priceType: 'fixed' },
      ],
    },
    {
      id: 'corner',
      label: '귀돌이 선택',
      type: 'button',
      required: false,
      options: [
        { label: '신청안해요', value: 'none', price: 0, default: true },
        { label: '신청합니다', value: 'round', price: 0 },
      ],
    },
  ],

  designOptions: PRINT_DESIGN_OPTIONS,

  specs: [
    { label: '사이즈', value: 'A3 / A4 / 08절 / 16절 선택' },
    { label: '인쇄', value: '디지털(소량) 단면 풀컬러' },
    { label: '용지', value: '스노우 백색 300g' },
  ],
  deliveryInfo: '오후 1시 이전 입금확인+데이터접수 완료 시, 3~4일 이내 발송',
  notes: [
    '10장 단위 주문 (10~100장)',
    'A3과 08절은 동일 가격, A4와 16절은 동일 가격',
    '오시 줄 수에 따른 추가 비용 없음',
  ],
};

// ─── 카테고리 내보내기 ───

export const printCategory: CategoryConfig = {
  id: 'print',
  name: '인쇄물',
  icon: 'print',
  description: '명함, 전단지, 포스터, 스티커, 메뉴판 등 디지털 인쇄물 전문 제작',
  order: 10,
  products: [
    digitalNamecardSingle,
    digitalFlyerSingle,
    digitalPosterSingle,
    digitalSticker,
    digitalMenuSingle,
  ],
};

/** 제품 ID로 빠르게 조회하는 맵 */
export const printProductMap = new Map<string, ProductConfig>(
  printCategory.products.map((p) => [p.id, p])
);

/** slug로 제품 조회 */
export function getPrintProductBySlug(slug: string): ProductConfig | undefined {
  return printCategory.products.find((p) => p.slug === slug);
}

/** 전체 인쇄물 제품 목록 */
export const printProducts = printCategory.products;
