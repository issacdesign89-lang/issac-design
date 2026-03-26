/**
 * 만물상 카테고리 제품 데이터
 * 실사박사 가격 역공학 기반 — 에어간판, 단체T(30수), 라운드
 *
 * 가격 출처: docs/실사박사-분석/06-만물상/가격계산-공식.md
 */

import type { CategoryConfig, ProductConfig } from './types';

// ─── 에어간판 디자인 옵션 (단가가 배너와 다름) ───

const AIR_SIGN_DESIGN_OPTIONS = [
  { label: '셀프 교정', value: 'self-proof', price: 0, description: '고객이 직접 교정' },
  { label: '완성 파일 접수', value: 'complete-file', price: 0, description: '완성된 인쇄 파일 제출' },
  { label: '셀프 디자인', value: 'self-design', price: 0, description: '온라인 에디터로 직접 디자인' },
  { label: '일반 디자인', value: 'basic-design', price: 55000, description: '단면 / 시안 수정 3회' },
  { label: '고급 디자인', value: 'premium-design', price: 77000, description: '단면 / 시안 수정 3회' },
  { label: '명품 디자인', value: 'luxury-design', price: 99000, description: '단면 / 시안 수정 3회' },
];

// ─── 의류 디자인 옵션 (단체T/라운드 공통) ───

const APPAREL_DESIGN_OPTIONS = [
  { label: '셀프 교정', value: 'self-proof', price: 0, description: '고객이 직접 교정' },
  { label: '완성 파일 접수', value: 'complete-file', price: 0, description: '완성된 인쇄 파일 제출' },
  { label: '셀프 디자인', value: 'self-design', price: 0, description: '온라인 에디터로 직접 디자인' },
  { label: '일반 디자인', value: 'basic-design', price: 11000, description: '시안 수정 3회' },
  { label: '고급 디자인', value: 'premium-design', price: 22000, description: '시안 수정 3회' },
  { label: '명품 디자인', value: 'luxury-design', price: 33000, description: '시안 수정 3회' },
];

// ============================================================
// 1. 에어간판
// ============================================================
// 가격모드: fixed (사이즈별 고정가, 수량할인 없음)
// 기본가 = 사이즈별 고정가 + 캐릭터 + 전기선 + 손타카 + 디자인
// 총 금액 = 기본가 * 수량

export const airSign: ProductConfig = {
  id: 'misc-air-sign',
  slug: 'air-sign',
  name: '에어간판',
  categoryId: 'misc',
  categoryName: '만물상',
  description: '에어탑 + 열전사 출력물 + LED 조명 완제품 에어간판. 사이즈별 가격, 캐릭터/전기선/손타카 옵션.',
  thumbnail: 'https://picsum.photos/seed/air-sign/400/400.webp',
  pricingMode: 'fixed',
  // 기본가: 80x200 완제품 기준 148,500원 (옵션으로 사이즈 선택)
  basePrice: 148500,
  sizeInput: { enabled: false },
  quantityInput: { enabled: true, min: 1, max: 100 },
  optionGroups: [
    // --- 제품 유형 선택 ---
    {
      id: 'product-type',
      label: '제품 유형',
      type: 'button',
      required: true,
      options: [
        { label: '완제품 (에어탑+출력+LED)', value: 'complete', price: 0, default: true },
        { label: '출력물만', value: 'print-only', price: -93500, priceType: 'fixed' },
      ],
    },
    // --- 사이즈 선택 ---
    {
      id: 'size',
      label: '사이즈 선택',
      type: 'button',
      required: true,
      options: [
        { label: '80x200cm', value: '200', price: 0, priceType: 'fixed', default: true },
        { label: '80x250cm', value: '250', price: 5500, priceType: 'fixed' },
        { label: '80x300cm', value: '300', price: 11000, priceType: 'fixed' },
        { label: '80x350cm', value: '350', price: 16500, priceType: 'fixed' },
      ],
    },
    // --- 캐릭터 선택 ---
    {
      id: 'character',
      label: '캐릭터 선택',
      type: 'button',
      required: true,
      options: [
        { label: '사용안함', value: 'none', price: 0, priceType: 'fixed', default: true },
        { label: '손가락 평면캐릭터', value: 'finger', price: 22000, priceType: 'fixed' },
        { label: '주문형 평면캐릭터', value: 'custom', price: 33000, priceType: 'fixed' },
      ],
    },
    // --- 전기선 선택 ---
    {
      id: 'cable',
      label: '전기선 길이',
      type: 'select',
      required: true,
      options: [
        { label: '7m (기본)', value: '7', price: 0, priceType: 'fixed', default: true },
        { label: '8m', value: '8', price: 1100, priceType: 'fixed' },
        { label: '9m', value: '9', price: 2200, priceType: 'fixed' },
        { label: '10m', value: '10', price: 3300, priceType: 'fixed' },
        { label: '11m', value: '11', price: 4400, priceType: 'fixed' },
        { label: '12m', value: '12', price: 5500, priceType: 'fixed' },
        { label: '13m', value: '13', price: 6600, priceType: 'fixed' },
        { label: '14m', value: '14', price: 7700, priceType: 'fixed' },
        { label: '15m', value: '15', price: 8800, priceType: 'fixed' },
        { label: '16m', value: '16', price: 9900, priceType: 'fixed' },
        { label: '17m', value: '17', price: 11000, priceType: 'fixed' },
        { label: '18m', value: '18', price: 12100, priceType: 'fixed' },
        { label: '19m', value: '19', price: 13200, priceType: 'fixed' },
        { label: '20m', value: '20', price: 14300, priceType: 'fixed' },
        { label: '21m', value: '21', price: 15400, priceType: 'fixed' },
        { label: '22m', value: '22', price: 16500, priceType: 'fixed' },
      ],
    },
    // --- 손타카 선택 ---
    {
      id: 'stapler',
      label: '손타카 (타카핀 100개 포함)',
      type: 'button',
      required: true,
      options: [
        { label: '구입안함', value: 'none', price: 0, priceType: 'fixed', default: true },
        { label: '포함', value: 'include', price: 11000, priceType: 'fixed' },
      ],
    },
  ],
  designOptions: AIR_SIGN_DESIGN_OPTIONS,
  specs: [
    { label: '출력기', value: '열전사 STANDARD' },
    { label: '조명', value: '절전형 LED' },
    { label: '소재', value: '에어탑 + 열전사 출력물' },
  ],
  deliveryInfo: '제작 후 2~3일 이내 발송 (주문제작 상품)',
  notes: [
    '에어간판은 주문제작 상품으로 교환/반품이 불가합니다.',
    '전기선은 기본 7m이며, 추가 1m당 1,100원입니다.',
    '출력물만 구매 시 에어탑/LED/프레임은 포함되지 않습니다.',
  ],
};

// ============================================================
// 2. 단체T인쇄 (30수)
// ============================================================
// 가격모드: quantity (수량 기반, 수량할인 없음 - 고정 단가)
// 기본 인쇄단가: 5,500원/면 (30수 기본 반팔)
// 1장 가격 = (기본인쇄단가 + 원단추가금) * 인쇄면수 * 사이즈배율 + 디자인비
// 총 금액 = 1장 가격 * 수량
//
// quantityPriceTable: 면당 5,500원 고정이므로 수량x단가로 산출
// 옵션으로 인쇄면(앞/뒤/양면), 스타일B, 사이즈 추가금 처리

export const groupTee30: ProductConfig = {
  id: 'misc-group-tee-30',
  slug: 'group-tee-30',
  name: '단체T인쇄 (30수)',
  categoryId: 'misc',
  categoryName: '만물상',
  description: '30수 면 단체 티셔츠 인쇄. 반팔/긴팔, 앞면/뒷면/양면 인쇄, 사이즈별 가격.',
  thumbnail: 'https://picsum.photos/seed/group-tee/400/400.webp',
  pricingMode: 'quantity',
  // 1장당 5,500원 (기본 반팔 1면 인쇄, S~L) — 수량할인 없음
  quantityPriceTable: {
    tiers: [
      [1, 5500],
      [5, 27500],
      [10, 55000],
      [30, 165000],
      [50, 275000],
      [100, 550000],
      [300, 1650000],
    ],
  },
  sizeInput: { enabled: false },
  quantityInput: {
    enabled: true,
    min: 1,
    max: 500,
    presets: [1, 5, 10, 30, 50, 100],
    label: '주문 수량',
  },
  optionGroups: [
    // --- 스타일A: 반팔/긴팔 ---
    {
      id: 'style-a',
      label: '스타일 선택 A',
      type: 'button',
      required: true,
      options: [
        { label: '반팔', value: 'short', price: 0, priceType: 'perUnit', default: true },
        { label: '긴팔', value: 'long', price: 0, priceType: 'perUnit' },
        { label: '맨투맨', value: 'sweatshirt', price: 0, priceType: 'perUnit' },
        { label: '후드티', value: 'hoodie', price: 0, priceType: 'perUnit' },
      ],
    },
    // --- 스타일B: 원단 종류 ---
    {
      id: 'style-b',
      label: '원단 선택',
      type: 'select',
      required: true,
      options: [
        { label: '기본 30수', value: 'basic-30', price: 0, priceType: 'perUnit', default: true },
        { label: '코마 라운드', value: 'coma-round', price: 3630, priceType: 'perUnit' },
        { label: '카우스 에리티', value: 'cows-eri', price: 6380, priceType: 'perUnit' },
        { label: '쿨론형광 라운드', value: 'cool-round', price: 6930, priceType: 'perUnit' },
        { label: '쿨론형광 에리티', value: 'cool-eri', price: 9240, priceType: 'perUnit' },
      ],
    },
    // --- 인쇄면 선택 ---
    {
      id: 'print-side',
      label: '인쇄면 선택',
      type: 'button',
      required: true,
      options: [
        { label: '앞면 단면', value: 'front', price: 0, priceType: 'perUnit', default: true },
        { label: '뒷면 단면', value: 'back', price: 0, priceType: 'perUnit' },
        { label: '양면 (앞+뒤)', value: 'both', price: 5500, priceType: 'perUnit' },
      ],
    },
    // --- 원단색 선택 (가격 차이 없음) ---
    {
      id: 'fabric-color',
      label: '원단색',
      type: 'select',
      required: true,
      options: [
        { label: '백색', value: 'white', price: 0, default: true },
        { label: '검정', value: 'black', price: 0 },
        { label: '네이비', value: 'navy', price: 0 },
        { label: '차콜', value: 'charcoal', price: 0 },
        { label: '멜란지', value: 'melange', price: 0 },
        { label: '레드', value: 'red', price: 0 },
        { label: '로얄블루', value: 'royal-blue', price: 0 },
        { label: '딥그린', value: 'deep-green', price: 0 },
        { label: '오렌지', value: 'orange', price: 0 },
        { label: '핑크', value: 'pink', price: 0 },
      ],
    },
    // --- 사이즈 선택 (XL+10%, 2XL+30%, 3XL+50%) ---
    {
      id: 'clothing-size',
      label: '옷 사이즈',
      type: 'button',
      required: true,
      options: [
        { label: 'S (85)', value: 'S', price: 0, priceType: 'perUnit', default: true },
        { label: 'M (90)', value: 'M', price: 0, priceType: 'perUnit' },
        { label: 'L (95)', value: 'L', price: 0, priceType: 'perUnit' },
        { label: 'XL (100)', value: 'XL', price: 550, priceType: 'perUnit' },
        { label: '2XL (105)', value: '2XL', price: 1650, priceType: 'perUnit' },
        { label: '3XL (110)', value: '3XL', price: 2750, priceType: 'perUnit' },
      ],
    },
  ],
  designOptions: APPAREL_DESIGN_OPTIONS,
  specs: [
    { label: '원단', value: '30수 면 (기본)' },
    { label: '인쇄방식', value: '열전사 인쇄' },
    { label: '인쇄 위치', value: '복부중앙, 가슴좌/우, 하단좌/우 선택' },
  ],
  deliveryInfo: '제작 후 3~5일 이내 발송',
  notes: [
    '사이즈 추가금: XL +10%, 2XL +30%, 3XL +50%',
    '양면 인쇄 = 단면 가격의 2배',
    '인쇄 위치(복부중앙/가슴좌측 등)에 따른 가격 차이 없음',
    '원단색에 따른 가격 차이 없음 (28가지 색상 동일가)',
    '수량 할인 없음 (고정 단가)',
  ],
};

// ============================================================
// 3. 라운드
// ============================================================
// 가격모드: quantity (수량 기반, 수량 구간별 할인 적용)
// 기본가 = (원단가 + 인쇄비) * 사이즈배율
// 수량 할인: 1~4장 정가, 5~9장 -20.5%, 10장+ -34.2%
//
// 30수코마 기준: 원단가 5,060원 + 인쇄비 11,000원/면 = 16,060원 (1면, S, 1장)
// quantityPriceTable은 30수코마/1면/S 기준

export const roundTee: ProductConfig = {
  id: 'misc-round-tee',
  slug: 'round-tee',
  name: '라운드',
  categoryId: 'misc',
  categoryName: '만물상',
  description: '라운드 티셔츠 인쇄. 최대 4면 인쇄 지원, 원단/스타일별 가격, 수량 할인 적용.',
  thumbnail: 'https://picsum.photos/seed/round-tee/400/400.webp',
  pricingMode: 'quantity',
  // 30수코마 반팔 1면 S 기준 수량별 총가격
  // 1~4장: 16,060원/장, 5~9장: 12,760원/장(-20.5%), 10장+: 10,560원/장(-34.2%)
  quantityPriceTable: {
    tiers: [
      [1, 16060],
      [4, 64240],     // 16,060 * 4
      [5, 63800],     // 12,760 * 5
      [9, 114840],    // 12,760 * 9
      [10, 105600],   // 10,560 * 10
      [30, 316800],   // 10,560 * 30
      [50, 528000],   // 10,560 * 50
      [100, 1056000], // 10,560 * 100
    ],
  },
  sizeInput: { enabled: false },
  quantityInput: {
    enabled: true,
    min: 1,
    max: 500,
    presets: [1, 5, 10, 30, 50, 100],
    label: '주문 수량',
  },
  optionGroups: [
    // --- 스타일A: 반팔/긴팔 ---
    {
      id: 'style-a',
      label: '스타일 선택',
      type: 'button',
      required: true,
      options: [
        { label: '반팔셔츠', value: 'short', price: 0, priceType: 'perUnit', default: true },
        { label: '긴팔셔츠', value: 'long', price: 0, priceType: 'perUnit' },
      ],
    },
    // --- 스타일B: 원단 종류 ---
    // 원단가(인쇄 없음 기본가)가 다름. 기본 반팔=0원, 30수코마=5,060원 등
    // quantityPriceTable은 30수코마 기준이므로 다른 원단은 차액을 옵션으로 처리
    {
      id: 'fabric',
      label: '원단 선택',
      type: 'select',
      required: true,
      options: [
        { label: '30수코마', value: '30-coma', price: 0, priceType: 'perUnit', default: true },
        { label: '에어로쿨론', value: 'aero-cool', price: 990, priceType: 'perUnit' },
        { label: '20수코마', value: '20-coma', price: 2970, priceType: 'perUnit' },
      ],
    },
    // --- 인쇄면 선택 (최대 4면: 앞/뒤/좌소매/우소매) ---
    // 기본: 앞면 1면(11,000원 포함). 추가 면당 11,000원
    {
      id: 'print-front',
      label: '앞면 인쇄',
      type: 'button',
      required: true,
      options: [
        { label: '인쇄함', value: 'yes', price: 0, priceType: 'perUnit', default: true },
        { label: '인쇄안함', value: 'no', price: -11000, priceType: 'perUnit' },
      ],
    },
    {
      id: 'print-back',
      label: '뒷면 인쇄',
      type: 'button',
      required: true,
      options: [
        { label: '인쇄안함', value: 'no', price: 0, priceType: 'perUnit', default: true },
        { label: '인쇄함', value: 'yes', price: 11000, priceType: 'perUnit' },
      ],
    },
    {
      id: 'print-left',
      label: '좌측소매 인쇄',
      type: 'button',
      required: true,
      options: [
        { label: '인쇄안함', value: 'no', price: 0, priceType: 'perUnit', default: true },
        { label: '인쇄함', value: 'yes', price: 11000, priceType: 'perUnit' },
      ],
    },
    {
      id: 'print-right',
      label: '우측소매 인쇄',
      type: 'button',
      required: true,
      options: [
        { label: '인쇄안함', value: 'no', price: 0, priceType: 'perUnit', default: true },
        { label: '인쇄함', value: 'yes', price: 11000, priceType: 'perUnit' },
      ],
    },
    // --- 원단색 선택 (가격 차이 없음) ---
    {
      id: 'fabric-color',
      label: '원단색',
      type: 'select',
      required: true,
      options: [
        { label: '백색', value: 'white', price: 0, default: true },
        { label: '검정', value: 'black', price: 0 },
        { label: '네이비', value: 'navy', price: 0 },
        { label: '차콜', value: 'charcoal', price: 0 },
        { label: '멜란지', value: 'melange', price: 0 },
        { label: '레드', value: 'red', price: 0 },
        { label: '로얄블루', value: 'royal-blue', price: 0 },
        { label: '딥그린', value: 'deep-green', price: 0 },
      ],
    },
    // --- 사이즈 선택 (XL+10%, 2XL+30%, 3XL+50%) ---
    // 30수코마 1면 기준: 16,060원 * 배율
    // XL: +1,650원, 2XL: +4,840원, 3XL: +8,030원
    {
      id: 'clothing-size',
      label: '옷 사이즈',
      type: 'button',
      required: true,
      options: [
        { label: 'S (85)', value: 'S', price: 0, priceType: 'perUnit', default: true },
        { label: 'M (90)', value: 'M', price: 0, priceType: 'perUnit' },
        { label: 'L (95)', value: 'L', price: 0, priceType: 'perUnit' },
        { label: 'XL (100)', value: 'XL', price: 1650, priceType: 'perUnit' },
        { label: '2XL (105)', value: '2XL', price: 4840, priceType: 'perUnit' },
        { label: '3XL (110)', value: '3XL', price: 8030, priceType: 'perUnit' },
      ],
    },
  ],
  designOptions: APPAREL_DESIGN_OPTIONS,
  specs: [
    { label: '기본 원단', value: '30수코마' },
    { label: '인쇄방식', value: '열전사 인쇄' },
    { label: '최대 인쇄면', value: '4면 (앞/뒤/좌소매/우소매)' },
    { label: '인쇄비', value: '11,000원/면 (원단 무관)' },
  ],
  deliveryInfo: '제작 후 3~5일 이내 발송',
  notes: [
    '수량 할인: 5장부터 -20.5%, 10장부터 -34.2%',
    '인쇄비 11,000원/면은 원단 종류와 무관하게 동일',
    '사이즈 추가금: XL ~+10%, 2XL ~+30%, 3XL ~+50%',
    '원단색에 따른 가격 차이 없음',
  ],
};

// ─── 만물상 카테고리 export ───

export const miscCategory: CategoryConfig = {
  id: 'misc',
  name: '만물상',
  icon: 'misc',
  description: '에어간판, 단체T인쇄, 라운드 등 다양한 맞춤 제작 상품',
  order: 6,
  products: [airSign, groupTee30, roundTee],
};

/** 만물상 전체 상품 목록 */
export const miscProducts: ProductConfig[] = [airSign, groupTee30, roundTee];

/** slug으로 상품 찾기 */
export function getMiscProductBySlug(slug: string): ProductConfig | undefined {
  return miscProducts.find((p) => p.slug === slug);
}
