/**
 * 게시대 카테고리 제품 데이터
 * 실사박사 가격 역공학 기반 — 주요 5개 상품
 *
 * 가격 구조: 본체가격(고정) + 출력물가격(고정) + 코팅 + 포장 + 형광색 + 디자인비
 * 모든 가격은 60cm x 180cm 기본 사이즈, 1개 기준
 */

import type { CategoryConfig, ProductConfig } from './types';
import { COMMON_DESIGN_OPTIONS } from './types';

// ─── 공통 옵션 (게시대 카테고리 전체 공유) ───

/** 코팅 옵션 — 페트지 류 출력물에만 적용 */
const COATING_OPTIONS = [
  { label: '무광 쿨 코팅 (내구력 강함)', value: 'cool-matte', price: 0, priceType: 'fixed' as const, default: true },
  { label: '유광 쿨 코팅 (내구력 강함)', value: 'cool-gloss', price: 1100, priceType: 'fixed' as const },
  { label: '무광 핫 코팅 (내구력 약함)', value: 'hot-matte', price: -220, priceType: 'fixed' as const },
  { label: '유광 핫 코팅 (내구력 약함)', value: 'hot-gloss', price: -220, priceType: 'fixed' as const },
];

/** 포장 옵션 */
const PACKAGING_OPTIONS = [
  { label: '개별포장 안함', value: 'none', price: 0, priceType: 'fixed' as const, default: true },
  { label: '개별포장 신청', value: 'individual', price: 1100, priceType: 'fixed' as const },
];

/** 형광색 옵션 */
const FLUORESCENT_OPTIONS = [
  { label: '형광색 선택 안해요', value: 'none', price: 0, priceType: 'fixed' as const, default: true },
  { label: '형광색 선택 합니다', value: 'yes', price: 12100, priceType: 'fixed' as const },
];

// ─── 공통 출력물 15종 (실내/실외 게시대 공통, 60x180 1장 기준) ───

const PRINT_OUTPUT_OPTIONS_15 = [
  { label: 'SD 일반 단면 백색페트지', value: 'sd-pet-white', price: 6050, priceType: 'fixed' as const, default: true },
  { label: 'HP 고급 단면 백색페트지', value: 'hp-pet-white', price: 6600, priceType: 'fixed' as const },
  { label: 'ES 명품 단면 백색페트지', value: 'es-pet-white', price: 8800, priceType: 'fixed' as const },
  { label: 'SD UV 단면 백색페트지', value: 'sd-uv-pet-white', price: 6050, priceType: 'fixed' as const },
  { label: 'SD UV 배면 투명페트지', value: 'sd-uv-pet-clear-back', price: 11000, priceType: 'fixed' as const },
  { label: 'SD UV 양면 투명페트지', value: 'sd-uv-pet-clear-both', price: 12100, priceType: 'fixed' as const },
  { label: 'SD 솔벤트 단면 백색메쉬천', value: 'sd-mesh-white', price: 9900, priceType: 'fixed' as const },
  { label: 'HP 라텍스 배면 투명페트지', value: 'hp-pet-clear-back', price: 12100, priceType: 'fixed' as const },
  { label: 'HP 라텍스 양면 투명페트지', value: 'hp-pet-clear-both', price: 13200, priceType: 'fixed' as const },
  { label: 'SD UV 단면 백색메쉬천', value: 'sd-uv-mesh-white', price: 9900, priceType: 'fixed' as const },
  { label: 'SD 솔벤트 단면 백색현수막', value: 'sd-banner-white', price: 6050, priceType: 'fixed' as const },
  { label: 'SD UV 단면 백색현수막', value: 'sd-uv-banner-white', price: 6050, priceType: 'fixed' as const },
  { label: 'SD 솔벤트 단면 백색텐트천', value: 'sd-tent-white', price: 12100, priceType: 'fixed' as const },
  { label: 'SD UV 단면 백색텐트천', value: 'sd-uv-tent-white', price: 12100, priceType: 'fixed' as const },
  { label: '출력물 사용안함', value: 'none', price: 0, priceType: 'fixed' as const },
];

// ═══════════════════════════════════════════════════════════════
// 1. 실내게시대-단면
// ═══════════════════════════════════════════════════════════════

const indoorStandSingle: ProductConfig = {
  id: 'stand-indoor-single',
  slug: 'stand-indoor-single',
  name: '실내게시대-단면',
  categoryId: 'stand',
  categoryName: '게시대',
  subcategory: '실내게시대',
  description: '실내용 배너 게시대 + 출력물 세트. 게시대 7종, 출력물 15종 조합 가능.',
  thumbnail: 'https://picsum.photos/seed/stand-indoor/400/400.webp',
  pricingMode: 'fixed',
  // 기본가격 0: 본체가격 + 출력물가격은 모두 옵션으로 선택
  basePrice: 0,
  sizeInput: { enabled: false },
  quantityInput: { enabled: true, min: 1, max: 100, label: '수량' },
  optionGroups: [
    {
      id: 'stand-type',
      label: '게시대 종류',
      type: 'select',
      required: true,
      options: [
        { label: '명품 배너게시대', value: 'luxury', price: 9900, priceType: 'fixed', default: true },
        { label: '스텐 배너게시대', value: 'stainless', price: 9350, priceType: 'fixed' },
        { label: '포인트 배너게시대', value: 'point', price: 8250, priceType: 'fixed' },
        { label: '뉴그레이 배너게시대', value: 'new-gray', price: 6380, priceType: 'fixed' },
        { label: '뉴화이트 배너게시대', value: 'new-white', price: 6380, priceType: 'fixed' },
        { label: '원터치퀵 배너게시대', value: 'one-touch', price: 6050, priceType: 'fixed' },
        { label: '하프 배너게시대', value: 'half', price: 4290, priceType: 'fixed' },
        { label: '게시대 사용안함', value: 'none', price: 0, priceType: 'fixed' },
      ],
    },
    {
      id: 'print-output',
      label: '출력물 종류',
      type: 'select',
      required: true,
      options: PRINT_OUTPUT_OPTIONS_15,
    },
    {
      id: 'fluorescent',
      label: '형광색',
      type: 'button',
      required: false,
      options: FLUORESCENT_OPTIONS,
    },
    {
      id: 'coating',
      label: '코팅',
      type: 'button',
      required: false,
      options: COATING_OPTIONS,
    },
    {
      id: 'packaging',
      label: '포장',
      type: 'button',
      required: false,
      options: PACKAGING_OPTIONS,
    },
  ],
  designOptions: COMMON_DESIGN_OPTIONS,
  specs: [
    { label: '기본 사이즈', value: '60cm x 180cm' },
    { label: '상품 코드', value: 'it_id: 1572574086' },
  ],
  deliveryInfo: '결제 후 1~3일 이내 출고 (공휴일 제외)',
  notes: [
    '게시대와 출력물은 별도 선택 후 합산됩니다.',
    '10개 이상 주문 시 약 3.4%, 100개 이상 시 약 6.9% 할인 적용 (별도 문의).',
    '코팅은 페트지 류 출력물에만 적용됩니다.',
  ],
};

// ═══════════════════════════════════════════════════════════════
// 2. 실외게시대-단면
// ═══════════════════════════════════════════════════════════════

const outdoorStandSingle: ProductConfig = {
  id: 'stand-outdoor-single',
  slug: 'stand-outdoor-single',
  name: '실외게시대-단면',
  categoryId: 'stand',
  categoryName: '게시대',
  subcategory: '실외게시대',
  description: '실외 내구성 강화 배너 게시대. 바람·비에 강한 견고한 구조.',
  thumbnail: 'https://picsum.photos/seed/stand-outdoor/400/400.webp',
  pricingMode: 'fixed',
  // 기본가격 0: 본체가격 + 출력물가격은 모두 옵션으로 선택
  basePrice: 0,
  sizeInput: { enabled: false },
  quantityInput: { enabled: true, min: 1, max: 100, label: '수량' },
  optionGroups: [
    {
      id: 'stand-type',
      label: '게시대 종류',
      type: 'select',
      required: true,
      options: [
        { label: '단면 디피 배너게시대', value: 'dipi', price: 16830, priceType: 'fixed', default: true },
        { label: '단면 드림 배너게시대', value: 'dream', price: 15290, priceType: 'fixed' },
        { label: '단면 에코 배너게시대', value: 'eco', price: 13640, priceType: 'fixed' },
        { label: '단면 심플 배너게시대', value: 'simple', price: 12650, priceType: 'fixed' },
        { label: '단면 원탑 배너게시대', value: 'one-top', price: 12540, priceType: 'fixed' },
        { label: '게시대 사용안함', value: 'none', price: 0, priceType: 'fixed' },
      ],
    },
    {
      id: 'print-output',
      label: '출력물 종류',
      type: 'select',
      required: true,
      options: PRINT_OUTPUT_OPTIONS_15,
    },
    {
      id: 'fluorescent',
      label: '형광색',
      type: 'button',
      required: false,
      options: FLUORESCENT_OPTIONS,
    },
    {
      id: 'coating',
      label: '코팅',
      type: 'button',
      required: false,
      options: COATING_OPTIONS,
    },
    {
      id: 'packaging',
      label: '포장',
      type: 'button',
      required: false,
      options: PACKAGING_OPTIONS,
    },
  ],
  designOptions: COMMON_DESIGN_OPTIONS,
  specs: [
    { label: '기본 사이즈', value: '60cm x 180cm' },
    { label: '상품 코드', value: 'it_id: 1572574093' },
  ],
  deliveryInfo: '결제 후 1~3일 이내 출고 (공휴일 제외)',
  notes: [
    '실외 환경에 최적화된 내구성 게시대입니다.',
    '게시대와 출력물은 별도 선택 후 합산됩니다.',
    '코팅은 페트지 류 출력물에만 적용됩니다.',
  ],
};

// ═══════════════════════════════════════════════════════════════
// 3. 실외게시대-양면
// ═══════════════════════════════════════════════════════════════

const outdoorStandDouble: ProductConfig = {
  id: 'stand-outdoor-double',
  slug: 'stand-outdoor-double',
  name: '실외게시대-양면',
  categoryId: 'stand',
  categoryName: '게시대',
  subcategory: '실외게시대',
  description: '양면 출력으로 양방향 노출. 출력물 2장(앞/뒤) 포함.',
  thumbnail: 'https://picsum.photos/seed/stand-outdoor-double/400/400.webp',
  pricingMode: 'fixed',
  // 기본가격 0: 본체가격 + 출력물가격은 모두 옵션으로 선택
  basePrice: 0,
  sizeInput: { enabled: false },
  quantityInput: { enabled: true, min: 1, max: 100, label: '수량' },
  optionGroups: [
    {
      id: 'stand-type',
      label: '게시대 종류',
      type: 'select',
      required: true,
      options: [
        { label: '양면 디피 배너게시대', value: 'dipi', price: 17930, priceType: 'fixed', default: true },
        { label: '양면 드림 배너게시대', value: 'dream', price: 16390, priceType: 'fixed' },
        { label: '양면 에코 배너게시대', value: 'eco', price: 14850, priceType: 'fixed' },
        { label: '양면 심플 배너게시대', value: 'simple', price: 13750, priceType: 'fixed' },
        { label: '양면 원탑 배너게시대', value: 'one-top', price: 13640, priceType: 'fixed' },
        { label: '게시대 사용안함', value: 'none', price: 0, priceType: 'fixed' },
      ],
    },
    {
      id: 'print-output',
      label: '출력물 종류 (양면 2장)',
      type: 'select',
      required: true,
      options: [
        // 양면 가격 = 단면 x 2
        { label: 'SD 일반 양면 백색페트지 2장', value: 'sd-pet-white', price: 12100, priceType: 'fixed', default: true },
        { label: 'HP 고급 양면 백색페트지 2장', value: 'hp-pet-white', price: 13200, priceType: 'fixed' },
        { label: 'ES 명품 양면 백색페트지 2장', value: 'es-pet-white', price: 17600, priceType: 'fixed' },
        { label: 'SD UV 양면 백색페트지 2장', value: 'sd-uv-pet-white', price: 12100, priceType: 'fixed' },
        { label: 'SD UV 양면 투명페트지 2장', value: 'sd-uv-pet-clear', price: 24200, priceType: 'fixed' },
        { label: 'SD 솔벤트 양면 백색메쉬천 2장', value: 'sd-mesh-white', price: 19800, priceType: 'fixed' },
        { label: 'HP 라텍스 양면 투명페트지 2장', value: 'hp-pet-clear', price: 26400, priceType: 'fixed' },
        { label: 'SD UV 양면 백색메쉬천 2장', value: 'sd-uv-mesh-white', price: 19800, priceType: 'fixed' },
        { label: 'SD 솔벤트 양면 백색현수막 2장', value: 'sd-banner-white', price: 12100, priceType: 'fixed' },
        { label: 'SD UV 양면 백색현수막 2장', value: 'sd-uv-banner-white', price: 12100, priceType: 'fixed' },
        { label: 'SD 솔벤트 양면 백색텐트천 2장', value: 'sd-tent-white', price: 24200, priceType: 'fixed' },
        { label: 'SD UV 양면 백색텐트천 2장', value: 'sd-uv-tent-white', price: 24200, priceType: 'fixed' },
        { label: '출력물 사용안함', value: 'none', price: 0, priceType: 'fixed' },
      ],
    },
    {
      id: 'coating',
      label: '코팅',
      type: 'button',
      required: false,
      options: COATING_OPTIONS,
    },
    {
      id: 'fluorescent',
      label: '형광색',
      type: 'button',
      required: false,
      options: FLUORESCENT_OPTIONS,
    },
    {
      id: 'packaging',
      label: '포장',
      type: 'button',
      required: false,
      options: PACKAGING_OPTIONS,
    },
  ],
  designOptions: COMMON_DESIGN_OPTIONS,
  specs: [
    { label: '기본 사이즈', value: '60cm x 180cm' },
    { label: '출력 면', value: '양면 (2장 포함)' },
    { label: '상품 코드', value: 'it_id: 1572574100' },
  ],
  deliveryInfo: '결제 후 1~3일 이내 출고 (공휴일 제외)',
  notes: [
    '양면 출력물(2장) 가격이 포함됩니다.',
    '양면 출력물 가격 = 단면 가격 x 2',
    '게시대와 출력물은 별도 선택 후 합산됩니다.',
  ],
};

// ═══════════════════════════════════════════════════════════════
// 4. 철판형 철재게시대
// ═══════════════════════════════════════════════════════════════

const steelPlateStand: ProductConfig = {
  id: 'stand-steel-plate',
  slug: 'stand-steel-plate',
  name: '철판형 철재게시대',
  categoryId: 'stand',
  categoryName: '게시대',
  subcategory: '철재게시대',
  description: 'A형 철판 게시대. 자석시트/고무자석 출력물 교체 가능. 3가지 사이즈.',
  thumbnail: 'https://picsum.photos/seed/stand-steel/400/400.webp',
  pricingMode: 'fixed',
  // 기본가격 0: 본체가격 + 출력물가격은 모두 옵션으로 선택
  basePrice: 0,
  sizeInput: { enabled: false },
  quantityInput: { enabled: true, min: 1, max: 50, label: '수량' },
  optionGroups: [
    {
      id: 'stand-type',
      label: '게시대 종류 (사이즈)',
      type: 'select',
      required: true,
      options: [
        { label: 'A형철판게시대-대 (40x90cm)', value: 'large', price: 44000, priceType: 'fixed', default: true },
        { label: 'A형철판게시대-중 (35x75cm)', value: 'medium', price: 37400, priceType: 'fixed' },
        { label: 'A형철판게시대-소 (30x60cm)', value: 'small', price: 31900, priceType: 'fixed' },
        { label: '게시대 사용안함', value: 'none', price: 0, priceType: 'fixed' },
      ],
    },
    {
      id: 'plate-color',
      label: '철판 색상',
      type: 'button',
      required: true,
      options: [
        { label: '흑색칼라', value: 'black', price: 0, priceType: 'fixed', default: true },
        { label: '백색칼라', value: 'white', price: 0, priceType: 'fixed' },
      ],
    },
    {
      id: 'print-output',
      label: '출력물 종류',
      type: 'select',
      required: true,
      options: [
        // 대(38x78) 기준 가격
        { label: '단면 자석시트 1장 (대)', value: 'magnet-sheet-single-l', price: 14300, priceType: 'fixed', default: true },
        { label: '양면 자석시트 2장 (대)', value: 'magnet-sheet-double-l', price: 28600, priceType: 'fixed' },
        { label: '단면 고무자석 1장 (대)', value: 'rubber-magnet-single-l', price: 15400, priceType: 'fixed' },
        { label: '양면 고무자석 2장 (대)', value: 'rubber-magnet-double-l', price: 30800, priceType: 'fixed' },
        { label: '단면 자석시트 1장 (중)', value: 'magnet-sheet-single-m', price: 12100, priceType: 'fixed' },
        { label: '양면 자석시트 2장 (중)', value: 'magnet-sheet-double-m', price: 24200, priceType: 'fixed' },
        { label: '단면 고무자석 1장 (중)', value: 'rubber-magnet-single-m', price: 13200, priceType: 'fixed' },
        { label: '양면 고무자석 2장 (중)', value: 'rubber-magnet-double-m', price: 26400, priceType: 'fixed' },
        { label: '단면 자석시트 1장 (소)', value: 'magnet-sheet-single-s', price: 9900, priceType: 'fixed' },
        { label: '양면 자석시트 2장 (소)', value: 'magnet-sheet-double-s', price: 19800, priceType: 'fixed' },
        { label: '단면 고무자석 1장 (소)', value: 'rubber-magnet-single-s', price: 11000, priceType: 'fixed' },
        { label: '양면 고무자석 2장 (소)', value: 'rubber-magnet-double-s', price: 22000, priceType: 'fixed' },
        { label: '출력물 사용안함', value: 'none', price: 0, priceType: 'fixed' },
      ],
    },
    {
      id: 'fluorescent',
      label: '형광색',
      type: 'button',
      required: false,
      options: FLUORESCENT_OPTIONS,
    },
    {
      id: 'packaging',
      label: '포장',
      type: 'button',
      required: false,
      options: PACKAGING_OPTIONS,
    },
  ],
  designOptions: COMMON_DESIGN_OPTIONS,
  specs: [
    { label: '사이즈(대)', value: '40cm x 90cm (출력면 38x78cm)' },
    { label: '사이즈(중)', value: '35cm x 75cm (출력면 33x63cm)' },
    { label: '사이즈(소)', value: '30cm x 60cm (출력면 28x48cm)' },
    { label: '상품 코드', value: 'it_id: 1721281835' },
  ],
  deliveryInfo: '결제 후 2~5일 이내 출고 (공휴일 제외)',
  notes: [
    '철판 게시대는 자석시트/고무자석으로 출력물 교체가 간편합니다.',
    '게시대 사이즈와 출력물 사이즈를 맞춰 선택해주세요.',
    '색상(흑색/백색)은 가격 차이가 없습니다.',
  ],
};

// ═══════════════════════════════════════════════════════════════
// 5. 플라잉배너
// ═══════════════════════════════════════════════════════════════

const flyingBanner: ProductConfig = {
  id: 'stand-flying-banner',
  slug: 'stand-flying-banner',
  name: '플라잉배너',
  categoryId: 'stand',
  categoryName: '게시대',
  subcategory: '플라잉배너',
  description: 'S형·F형·H형 플라잉배너. 게시대 + 받침대 + 열전사 출력물 세트.',
  thumbnail: 'https://picsum.photos/seed/stand-flying/400/400.webp',
  pricingMode: 'fixed',
  // 기본가격 0: 게시대 + 받침대 + 출력물은 모두 옵션으로 선택
  basePrice: 0,
  sizeInput: { enabled: false },
  quantityInput: { enabled: true, min: 1, max: 50, label: '수량' },
  optionGroups: [
    {
      id: 'stand-type',
      label: '게시대 종류',
      type: 'select',
      required: true,
      options: [
        { label: 'S형 플라잉배너 (70x290cm)', value: 's-type', price: 40260, priceType: 'fixed', default: true },
        { label: 'F형 플라잉배너 (110x270cm)', value: 'f-type', price: 41800, priceType: 'fixed' },
        { label: 'H형 플라잉배너 (75x300cm)', value: 'h-type', price: 53350, priceType: 'fixed' },
        { label: '게시대 사용안함', value: 'none', price: 0, priceType: 'fixed' },
      ],
    },
    {
      id: 'base-type',
      label: '받침대 종류',
      type: 'button',
      required: true,
      options: [
        { label: '십자 받침대', value: 'cross', price: 0, priceType: 'fixed', default: true },
        { label: '철판 받침대', value: 'iron-plate', price: 1210, priceType: 'fixed' },
        { label: '물통 받침대', value: 'water-tank', price: 220, priceType: 'fixed' },
      ],
    },
    {
      id: 'print-output',
      label: '출력물 종류',
      type: 'select',
      required: true,
      options: [
        { label: '열전사 깃발 1장', value: 'heat-transfer', price: 39490, priceType: 'fixed', default: true },
        { label: 'SD 단면 현수막깃발 1장', value: 'sd-banner-single', price: 22000, priceType: 'fixed' },
        { label: 'SD 양면 현수막깃발 2장', value: 'sd-banner-double', price: 44000, priceType: 'fixed' },
        { label: '출력물 사용안함', value: 'none', price: 0, priceType: 'fixed' },
      ],
    },
    {
      id: 'packaging',
      label: '포장',
      type: 'button',
      required: false,
      options: PACKAGING_OPTIONS,
    },
  ],
  designOptions: COMMON_DESIGN_OPTIONS,
  specs: [
    { label: 'S형 사이즈', value: '70cm x 290cm' },
    { label: 'F형 사이즈', value: '110cm x 270cm' },
    { label: 'H형 사이즈', value: '75cm x 300cm' },
    { label: '상품 코드', value: 'it_id: 1579594364' },
  ],
  deliveryInfo: '결제 후 2~5일 이내 출고 (공휴일 제외)',
  notes: [
    '게시대 + 받침대 + 출력물 3가지를 각각 선택합니다.',
    '받침대 종류에 따라 추가 금액이 발생합니다.',
    '열전사 깃발은 양면 투과 인쇄로 바람에 강합니다.',
  ],
};

// ─── 카테고리 export ───

export const standCategory: CategoryConfig = {
  id: 'stand',
  name: '게시대',
  icon: 'stand',
  description: '실내외 배너 게시대, 철재게시대, 플라잉배너 등 다양한 게시대 견적',
  order: 4,
  products: [
    indoorStandSingle,
    outdoorStandSingle,
    outdoorStandDouble,
    steelPlateStand,
    flyingBanner,
  ],
};

/** 전체 게시대 상품 목록 */
export const standProducts: ProductConfig[] = standCategory.products;

/** slug 기반 상품 검색 */
export function getStandProductBySlug(slug: string): ProductConfig | undefined {
  return standProducts.find((p) => p.slug === slug);
}

/** id 기반 상품 검색 */
export function getStandProductById(id: string): ProductConfig | undefined {
  return standProducts.find((p) => p.id === id);
}
