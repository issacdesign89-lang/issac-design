/**
 * 시트지/실사출력물 카테고리 제품 데이터
 * 실사박사 가격 역공학 기반 — 5개 주요 상품
 *
 * 가격 패턴:
 *   ㎡당 단가 = 대량단가 + max(0, (5 - N)) * 550
 *   N = 정수 ㎡ (올림), 대량단가 = 상품별 기본 ㎡ 단가
 *   5㎡ 이상부터 고정 대량단가 적용
 */

import type { CategoryConfig, ProductConfig } from './types';
import { COMMON_DESIGN_OPTIONS } from './types';

// ─── 공통 옵션 빌더 ───

/** 후가공 옵션 (유포지/캘지/시트지/평판출력 공통) */
const COMMON_FINISHING_GROUP = {
  id: 'finishing',
  label: '후가공 선택',
  type: 'button' as const,
  required: false,
  options: [
    { label: '신청안함', value: 'none', price: 0, default: true },
    { label: '사각재단', value: 'square-cut', price: 550, priceType: 'perSqm' as const },
    { label: '모양컷팅', value: 'shape-cut', price: 1100, priceType: 'perSqm' as const },
  ],
};

/** 코팅 옵션 (유포지/캘지 공통 — 무광이 기본) */
const COATING_GROUP_DEFAULT_MATTE = {
  id: 'coating',
  label: '코팅지 선택',
  type: 'button' as const,
  required: true,
  options: [
    { label: '무광쿨코팅', value: 'matte', price: 0, default: true },
    { label: '유광쿨코팅', value: 'glossy', price: 1100, priceType: 'perSqm' as const },
    { label: '배면쿨코팅', value: 'back', price: 8800, priceType: 'perSqm' as const },
    { label: '바닥코팅지', value: 'floor', price: 7700, priceType: 'perSqm' as const },
  ],
};

// ─── 1. 유포지 ───

const yupojiProduct: ProductConfig = {
  id: 'sheet-yupoji',
  slug: 'yupoji',
  name: '유포지',
  categoryId: 'sheet-output',
  categoryName: '시트지/실사출력물',
  subcategory: '실사출력물',
  description: '조명용·비조명·비점착 유포지. SD/HP/ES 출력기 선택, 4종 코팅 지원.',
  thumbnail: 'https://picsum.photos/seed/sheet-yupoji/400/400.webp',
  pricingMode: 'area',

  // 조명용, SD, 무광 기준 단가 테이블
  areaPriceTable: {
    tiers: [
      [1, 9900],   // ~1㎡: 9,900원/㎡
      [2, 9350],   // ~2㎡: 9,350원/㎡
      [3, 8800],   // ~3㎡: 8,800원/㎡
      [4, 8250],   // ~4㎡: 8,250원/㎡
      [Infinity, 7700], // 5㎡+: 7,700원/㎡
    ],
    minArea: 1,
  },

  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 10,
    maxWidth: 100000,
    minHeight: 10,
    maxHeight: 100000,
    maxRollWidth: 145,
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 100,
  },

  optionGroups: [
    {
      id: 'material',
      label: '출력물 선택',
      type: 'button',
      required: true,
      options: [
        { label: '조명용 유포지', value: 'light', price: 0, default: true },
        { label: '비조명 유포지', value: 'non-light', price: 1100, priceType: 'perSqm' },
        { label: '비점착 유포지', value: 'non-adhesive', price: 2200, priceType: 'perSqm' },
      ],
    },
    {
      id: 'printer',
      label: '출력기 선택',
      type: 'button',
      required: true,
      options: [
        { label: 'SD (일반)', value: 'sd', price: 0, default: true },
        { label: 'HP (고급)', value: 'hp', price: 550, priceType: 'perSqm' },
        { label: 'ES (명품)', value: 'es', price: 1100, priceType: 'perSqm' },
      ],
    },
    COATING_GROUP_DEFAULT_MATTE,
    COMMON_FINISHING_GROUP,
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '원단폭', value: '최대 145cm (초과 시 분할출력)' },
    { label: '출력 해상도', value: '1440dpi (SD기준)' },
    { label: '용도', value: '실내외 간판, 라이트박스, 포스터' },
  ],

  deliveryInfo: '제작 후 1~2일 이내 출고, 전국 택배 배송',

  notes: [
    '원단폭 145cm 초과 시 분할출력 후 이음 처리됩니다.',
    '수량 2개 이상 주문 시 수량 할인이 적용됩니다.',
    '디자인 수정 3회 초과 시 1회당 5,500원 추가',
  ],
};

// ─── 2. 캘지 ───

const caljiProduct: ProductConfig = {
  id: 'sheet-calji',
  slug: 'calji',
  name: '캘지',
  categoryId: 'sheet-output',
  categoryName: '시트지/실사출력물',
  subcategory: '실사출력물',
  description: '조명용·비조명 캘지. 유포지 대비 높은 선명도, 동일 출력기·코팅 체계.',
  thumbnail: 'https://picsum.photos/seed/sheet-calji/400/400.webp',
  pricingMode: 'area',

  // 조명용, SD, 무광 기준 단가
  areaPriceTable: {
    tiers: [
      [1, 11000],
      [2, 10450],
      [3, 9900],
      [4, 9350],
      [Infinity, 8800],
    ],
    minArea: 1,
  },

  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 10,
    maxWidth: 100000,
    minHeight: 10,
    maxHeight: 100000,
    maxRollWidth: 145,
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 100,
  },

  optionGroups: [
    {
      id: 'material',
      label: '출력물 선택',
      type: 'button',
      required: true,
      options: [
        { label: '조명용 캘지', value: 'light', price: 0, default: true },
        { label: '비조명 캘지', value: 'non-light', price: 1100, priceType: 'perSqm' },
      ],
    },
    {
      id: 'printer',
      label: '출력기 선택',
      type: 'button',
      required: true,
      options: [
        { label: 'SD (일반)', value: 'sd', price: 0, default: true },
        { label: 'HP (고급)', value: 'hp', price: 550, priceType: 'perSqm' },
        { label: 'ES (명품)', value: 'es', price: 1100, priceType: 'perSqm' },
      ],
    },
    COATING_GROUP_DEFAULT_MATTE,
    COMMON_FINISHING_GROUP,
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '원단폭', value: '최대 145cm (초과 시 분할출력)' },
    { label: '출력 해상도', value: '1440dpi (SD기준)' },
    { label: '용도', value: '실내외 간판, 라이트박스, 고급 포스터' },
  ],

  deliveryInfo: '제작 후 1~2일 이내 출고, 전국 택배 배송',

  notes: [
    '원단폭 145cm 초과 시 분할출력 후 이음 처리됩니다.',
    '디자인 수정 3회 초과 시 1회당 5,500원 추가',
  ],
};

// ─── 3. 시트지 ───

const sheetjiProduct: ProductConfig = {
  id: 'sheet-sheetji',
  slug: 'sheetji',
  name: '시트지',
  categoryId: 'sheet-output',
  categoryName: '시트지/실사출력물',
  subcategory: '시트지',
  description: '18종 시트지 소재. 백색·투명·리무벌·방염·반사 등 다양한 용도.',
  thumbnail: 'https://picsum.photos/seed/sheet-sheetji/400/400.webp',
  pricingMode: 'area',

  // 백색일반, SD, 1Layer, 코팅없음 기준 (유포지 조명용과 동일 구조)
  areaPriceTable: {
    tiers: [
      [1, 9900],
      [2, 9350],
      [3, 8800],
      [4, 8250],
      [Infinity, 7700],
    ],
    minArea: 1,
  },

  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 10,
    maxWidth: 100000,
    minHeight: 10,
    maxHeight: 100000,
    maxRollWidth: 145,
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 100,
  },

  optionGroups: [
    {
      // 18종 시트지 소재 — select(드롭다운)으로 표시
      id: 'material',
      label: '시트지 소재 선택',
      type: 'select',
      required: true,
      options: [
        { label: '백색시트지-일반용 (폭145cm)', value: 'white-general', price: 0, default: true },
        { label: '백색시트지-비조명 (폭145cm)', value: 'white-nonlight', price: 1100, priceType: 'perSqm' },
        { label: '투명시트지-투명용 (폭145cm)', value: 'clear', price: 2200, priceType: 'perSqm' },
        { label: 'P200 리무벌 비조명 (폭120cm)', value: 'p200-removable', price: 2200, priceType: 'perSqm' },
        { label: 'LG-SPM-011G 일반용 (폭145cm)', value: 'lg-011g', price: 1100, priceType: 'perSqm' },
        { label: 'AVERY-3801R 리무벌 (폭120cm)', value: 'avery-3801r', price: 2200, priceType: 'perSqm' },
        { label: 'LG-SPM-013G 리무벌 (폭120cm)', value: 'lg-013g', price: 2200, priceType: 'perSqm' },
        { label: '3M-IJ 1210-10 일반용 (폭130cm)', value: '3m-ij1210', price: 3300, priceType: 'perSqm' },
        { label: 'LG-SPT-031M 조명용 (폭132cm)', value: 'lg-031m', price: 4400, priceType: 'perSqm' },
        { label: '3M-180 C-10 랩핑용 (폭130cm)', value: '3m-180c10', price: 13200, priceType: 'perSqm' },
        { label: '타공시트지-원웨이 (폭132cm)', value: 'perforated', price: 4400, priceType: 'perSqm' },
        { label: '방염시트지-방염용 (폭130cm)', value: 'fireproof', price: 11000, priceType: 'perSqm' },
        { label: '콘크리트시트지-일반용 (폭130cm)', value: 'concrete', price: 8800, priceType: 'perSqm' },
        { label: '알루미늄시트지-일반용 (폭120cm)', value: 'aluminum', price: 25300, priceType: 'perSqm' },
        { label: '안개시트지-불투명 (폭110cm)', value: 'frosted', price: 1100, priceType: 'perSqm' },
        { label: '작업보조용-투명시트지 (폭100cm)', value: 'helper-clear', price: -5500, priceType: 'perSqm' },
        { label: '일반용-반사시트지 (폭120cm)', value: 'reflective', price: 5500, priceType: 'perSqm' },
        { label: '고휘도-반사시트지 (폭120cm)', value: 'high-reflective', price: 7700, priceType: 'perSqm' },
      ],
    },
    {
      id: 'printer',
      label: '출력기 선택',
      type: 'button',
      required: true,
      options: [
        { label: 'SD', value: 'sd', price: 0, default: true },
        { label: 'UV', value: 'uv', price: 0 },
        { label: 'HP 라텍스', value: 'hp-latex', price: 0 },
        { label: 'ES 솔벤트', value: 'es-solvent', price: 1100, priceType: 'perSqm' },
      ],
    },
    {
      id: 'layer',
      label: '레이어 선택',
      type: 'button',
      required: true,
      options: [
        { label: '1Layer', value: '1layer', price: 0, default: true },
        { label: '2Layer', value: '2layer', price: 1650, priceType: 'perSqm' },
        { label: '3Layer', value: '3layer', price: 3300, priceType: 'perSqm' },
      ],
    },
    {
      // 시트지: "코팅안해요"가 기본, 무광 선택 시 +2,200/㎡
      id: 'coating',
      label: '코팅지 선택',
      type: 'button',
      required: true,
      options: [
        { label: '코팅안해요', value: 'none', price: 0, default: true },
        { label: '무광쿨코팅', value: 'matte', price: 2200, priceType: 'perSqm' },
        { label: '유광쿨코팅', value: 'glossy', price: 3300, priceType: 'perSqm' },
        { label: '배면쿨코팅', value: 'back', price: 8800, priceType: 'perSqm' },
        { label: '바닥코팅지', value: 'floor', price: 7700, priceType: 'perSqm' },
      ],
    },
    COMMON_FINISHING_GROUP,
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '소재 종류', value: '18종 (백색·투명·리무벌·방염·반사 등)' },
    { label: '원단폭', value: '소재별 상이 (100~145cm)' },
    { label: '용도', value: '간판, 유리, 차량 래핑, 바닥 등' },
  ],

  deliveryInfo: '제작 후 1~2일 이내 출고, 전국 택배 배송',

  notes: [
    '시트지 소재별 원단폭이 다릅니다. 초과 시 분할출력됩니다.',
    '코팅을 선택하지 않으면 코팅 비용이 부과되지 않습니다.',
    '디자인 수정 3회 초과 시 1회당 5,500원 추가',
  ],
};

// ─── 4. 메쉬 ───

const meshProduct: ProductConfig = {
  id: 'sheet-mesh',
  slug: 'mesh',
  name: '메쉬',
  categoryId: 'sheet-output',
  categoryName: '시트지/실사출력물',
  subcategory: '메쉬',
  description: '솔벤트·유브이·라텍스 출력. 원단폭 137/180/320cm 선택.',
  thumbnail: 'https://picsum.photos/seed/sheet-mesh/400/400.webp',
  pricingMode: 'area',

  // 솔벤트, 비형광, 137폭 기준
  areaPriceTable: {
    tiers: [
      [1, 12650],
      [2, 12100],
      [3, 11550],
      [4, 11000],
      [Infinity, 10450],
    ],
    minArea: 1,
  },

  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 10,
    maxWidth: 100000,
    minHeight: 10,
    maxHeight: 100000,
    maxRollWidth: 137,
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 100,
  },

  optionGroups: [
    {
      id: 'printer',
      label: '출력기 선택',
      type: 'button',
      required: true,
      options: [
        { label: '솔벤트', value: 'solvent', price: 0, default: true },
        { label: '유브이', value: 'uv', price: 1100, priceType: 'perSqm' },
        { label: '라텍스', value: 'latex', price: 2200, priceType: 'perSqm' },
      ],
    },
    {
      id: 'rollWidth',
      label: '출력물(원단폭) 선택',
      type: 'button',
      required: true,
      options: [
        { label: '137폭 이하', value: '137', price: 0, default: true },
        { label: '180폭 이하', value: '180', price: 0 },
        { label: '320폭 이하', value: '320', price: 0 },
      ],
    },
    {
      id: 'cut',
      label: '재단선 선택',
      type: 'button',
      required: false,
      options: [
        { label: '딱재단 안함', value: 'no-cut', price: 0, default: true },
        { label: '딱재단 신청', value: 'exact-cut', price: 0 },
        { label: '고주파 견적', value: 'hf-quote', price: 0 },
      ],
    },
    {
      id: 'finishing',
      label: '후가공 선택',
      type: 'select',
      required: false,
      options: [
        { label: '신청안함', value: 'none', price: 0, default: true },
        { label: '나무미싱', value: 'wood-sewing', price: 0 },
        { label: '사방구멍', value: 'four-holes', price: 0 },
        { label: '사방구멍+로프', value: 'holes-rope', price: 0 },
        { label: '사방구멍+큐방', value: 'holes-cube', price: 0 },
        { label: '원형나무+로프 (90cm이하)', value: 'round-wood-rope-s', price: 0 },
        { label: '일반나무+로프 (90cm이하)', value: 'wood-rope-s', price: 0 },
        { label: '타공나무+로프 (180cm이하)', value: 'perf-wood-rope-m', price: 0 },
        { label: '일반나무+로프 (180cm이하)', value: 'wood-rope-m', price: 0 },
      ],
    },
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '원단폭', value: '137cm / 180cm / 320cm 선택' },
    { label: '소재', value: '메쉬 (통기성 원단)' },
    { label: '용도', value: '건물 외벽, 공사현장 펜스, 대형 현수막' },
  ],

  deliveryInfo: '제작 후 1~2일 이내 출고, 전국 택배 배송',

  notes: [
    '원단폭 선택에 따라 최대 출력 크기가 달라집니다.',
    '후가공(나무/로프 등)은 별도 견적이 필요할 수 있습니다.',
    '디자인 수정 3회 초과 시 1회당 5,500원 추가',
  ],
};

// ─── 5. 평판출력 ───

const flatPrintProduct: ProductConfig = {
  id: 'sheet-flat-print',
  slug: 'flat-print',
  name: '평판출력',
  categoryId: 'sheet-output',
  categoryName: '시트지/실사출력물',
  subcategory: '평판출력',
  description: '고정 ㎡당 단가. UV SD / 라텍스 R2000. 최대 240x120cm, 소재별도 프린팅만.',
  thumbnail: 'https://picsum.photos/seed/sheet-flat/400/400.webp',
  pricingMode: 'area',

  // 라텍스 R2000, UV 단면 1Layer 기준 — 고정 12,100원/㎡
  areaPriceTable: {
    tiers: [
      [Infinity, 12100],
    ],
    minArea: 1,
  },

  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 10,
    maxWidth: 240,
    minHeight: 10,
    maxHeight: 120,
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 100,
  },

  optionGroups: [
    {
      id: 'printer',
      label: '출력기 선택',
      type: 'button',
      required: true,
      options: [
        { label: '평판 UV SD', value: 'uv-sd', price: -2200, priceType: 'perSqm' },
        { label: '평판 라텍스 R2000', value: 'latex-r2000', price: 0, default: true },
      ],
    },
    {
      id: 'layer',
      label: '레이어 선택',
      type: 'select',
      required: true,
      options: [
        { label: 'UV 단면출력 - 1Layer color', value: '1layer-uv', price: 0, default: true },
        { label: 'UV 배면출력 - 2Layer white+color', value: '2layer-uv', price: 3300, priceType: 'perSqm' },
        { label: 'UV 양면출력 - 3Layer color+white+color', value: '3layer-uv', price: 6600, priceType: 'perSqm' },
        { label: 'R2000 단면출력 - 1Layer color', value: '1layer-r2000', price: 0 },
        { label: 'R2000 배면출력 - 2Layer white+color', value: '2layer-r2000', price: 3300, priceType: 'perSqm' },
        { label: 'R2000 양면출력 - 3Layer color+white+color', value: '3layer-r2000', price: 6600, priceType: 'perSqm' },
      ],
    },
    COMMON_FINISHING_GROUP,
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '최대 출력 사이즈', value: '240cm x 120cm' },
    { label: '특징', value: '소재 별도, 프린팅만 제공' },
    { label: '용도', value: '아크릴, 포맥스, 알루미늄 등 평판 소재 직접 인쇄' },
  ],

  deliveryInfo: '제작 후 2~3일 이내 출고, 전국 택배 배송',

  notes: [
    '최대 출력 사이즈 240cm x 120cm입니다.',
    '소재는 별도입니다. 프린팅만 제공됩니다.',
    '면적에 관계없이 고정 단가가 적용됩니다 (할인 없음).',
    '디자인 수정 3회 초과 시 1회당 5,500원 추가',
  ],
};

// ─── 카테고리 내보내기 ───

export const SHEET_OUTPUT_PRODUCTS: ProductConfig[] = [
  yupojiProduct,
  caljiProduct,
  sheetjiProduct,
  meshProduct,
  flatPrintProduct,
];

export const SHEET_OUTPUT_CATEGORY: CategoryConfig = {
  id: 'sheet-output',
  name: '시트지/실사출력물',
  icon: 'print',
  description: '유포지, 캘지, 시트지, 메쉬, 평판출력 — 면적 기반 실시간 견적',
  order: 2,
  products: SHEET_OUTPUT_PRODUCTS,
};

/** slug로 제품 조회 */
export function getSheetProductBySlug(slug: string): ProductConfig | undefined {
  return SHEET_OUTPUT_PRODUCTS.find((p) => p.slug === slug);
}

/** 모든 시트지/실사출력물 slug 목록 */
export function getAllSheetSlugs(): string[] {
  return SHEET_OUTPUT_PRODUCTS.map((p) => p.slug);
}
