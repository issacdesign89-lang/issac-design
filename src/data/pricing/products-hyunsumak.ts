/**
 * 현수막 카테고리 - 제품 설정 데이터
 * 실사박사 가격 분석 기반 역공학 데이터
 *
 * 포함 제품:
 * 1. 일반현수막 (면적 기반, SD/HP, 후가공 14종, 벨크로)
 * 2. 솔벤트현수막 (면적 기반, SD/ES/HP)
 * 3. 방염현수막 (면적 기반, 방염 인증)
 * 4. 텐트천현수막 (면적 기반, 텐트천 소재)
 * 5. 족자현수막 (고정 사이즈 기반)
 */

import type { ProductConfig, CategoryConfig } from './types';
import { COMMON_DESIGN_OPTIONS } from './types';

// ─── 공통 후가공 옵션 (14종) ───

/** 일반현수막용 후가공 - 추가 단가 (고정 금액) */
const FINISHING_OPTIONS_NORMAL = [
  { label: '열칼재단', value: 'heat-cut', price: 0, default: true },
  { label: '나무미싱', value: 'wood-sewing', price: 0 },
  { label: '사방고리', value: 'four-rings', price: 0 },
  { label: '사방구멍', value: 'four-holes', price: 0 },
  { label: '사방고리+로프', value: 'four-rings-rope', price: 2200 },
  { label: '사방구멍+로프', value: 'four-holes-rope', price: 2200 },
  { label: '사방구멍+큐방', value: 'four-holes-cube', price: 2200 },
  { label: '로프미싱-4mm', value: 'rope-sewing-4mm', price: 6600 },
  { label: '로프미싱-5mm', value: 'rope-sewing-5mm', price: 7920 },
  { label: '로프미싱-6mm', value: 'rope-sewing-6mm', price: 13200 },
  { label: '원형나무+로프(90cm이하)', value: 'circle-wood-rope-90', price: 0 },
  { label: '일반나무+로프(90cm이하)', value: 'wood-rope-90', price: 3300 },
  { label: '타공나무+로프(180cm이하)', value: 'perforated-wood-rope-180', price: 4400 },
  { label: '일반나무+로프(180cm이하)', value: 'wood-rope-180', price: 4400 },
];

/** 솔벤트현수막용 후가공 */
const FINISHING_OPTIONS_SOLVENT = [
  { label: '열칼재단', value: 'heat-cut', price: 0, default: true },
  { label: '나무미싱', value: 'wood-sewing', price: 0 },
  { label: '사방고리', value: 'four-rings', price: 550 },
  { label: '사방구멍', value: 'four-holes', price: 550 },
  { label: '사방고리+로프', value: 'four-rings-rope', price: 1650 },
  { label: '사방구멍+로프', value: 'four-holes-rope', price: 1650 },
  { label: '사방구멍+큐방', value: 'four-holes-cube', price: 2200 },
  { label: '로프미싱-4mm', value: 'rope-sewing-4mm', price: 6600 },
  { label: '로프미싱-5mm', value: 'rope-sewing-5mm', price: 7920 },
  { label: '로프미싱-6mm', value: 'rope-sewing-6mm', price: 13200 },
  { label: '원형나무+로프(90cm이하)', value: 'circle-wood-rope-90', price: 0 },
  { label: '일반나무+로프(90cm이하)', value: 'wood-rope-90', price: 2200 },
  { label: '타공나무+로프(180cm이하)', value: 'perforated-wood-rope-180', price: 3300 },
  { label: '일반나무+로프(180cm이하)', value: 'wood-rope-180', price: 3300 },
];

/** 방염현수막용 후가공 */
const FINISHING_OPTIONS_FIREPROOF = [
  { label: '열칼재단', value: 'heat-cut', price: 0, default: true },
  { label: '나무미싱', value: 'wood-sewing', price: 0 },
  { label: '사방고리', value: 'four-rings', price: 1100 },
  { label: '사방구멍', value: 'four-holes', price: 1100 },
  { label: '사방고리+로프', value: 'four-rings-rope', price: 2200 },
  { label: '사방구멍+로프', value: 'four-holes-rope', price: 2200 },
  { label: '사방구멍+큐방', value: 'four-holes-cube', price: 2200 },
  { label: '로프미싱-4mm', value: 'rope-sewing-4mm', price: 6600 },
  { label: '로프미싱-5mm', value: 'rope-sewing-5mm', price: 7920 },
  { label: '로프미싱-6mm', value: 'rope-sewing-6mm', price: 13200 },
  { label: '원형나무+로프(90cm이하)', value: 'circle-wood-rope-90', price: 0 },
  { label: '일반나무+로프(90cm이하)', value: 'wood-rope-90', price: 3300 },
  { label: '타공나무+로프(180cm이하)', value: 'perforated-wood-rope-180', price: 4400 },
  { label: '일반나무+로프(180cm이하)', value: 'wood-rope-180', price: 4400 },
];

/** 텐트천현수막용 후가공 (일반과 동일 패턴) */
const FINISHING_OPTIONS_TENT = FINISHING_OPTIONS_NORMAL;

// ─── 공통 벨크로 옵션 ───

const VELCRO_OPTIONS = [
  { label: '사용안함', value: 'none', price: 0, default: true },
  { label: '벨크로 붙이기', value: 'velcro-attach', price: 3300 },
  { label: '벨크로 박음질', value: 'velcro-sewing', price: 4400 },
];

// ─── 공통 디자인 옵션 (고정 금액) ───
// types.ts의 COMMON_DESIGN_OPTIONS 사용 (22,000 / 44,000 / 66,000)
// 실사박사 분석 결과: 일반 +22,000 / 고급 +44,000 / 명품 +66,000 (고정)
// COMMON_DESIGN_OPTIONS의 값(33,000 / 55,000 / 77,000)과 차이가 있으나
// COMMON_DESIGN_OPTIONS를 공통 기준으로 사용 (사이트 자체 가격 정책)

// ─── 1. 일반현수막 ───

const normalHyunsumak: ProductConfig = {
  id: 'hyunsumak-normal',
  slug: 'hyunsumak-normal',
  name: '일반현수막',
  categoryId: 'banner-cloth',
  categoryName: '현수막',
  subcategory: '일반현수막',
  description:
    '가장 많이 사용되는 표준 현수막. SD(일반품질) / HP(명품품질) 출력기 선택 가능. 최대 원단폭 180cm, 초과 시 연결미싱 처리.',
  thumbnail: 'https://picsum.photos/seed/hyunsumak-normal/400/400.webp',
  pricingMode: 'area',

  /**
   * 면적 기반 단가 테이블 (대형 기준, SD 출력)
   * 분석 데이터: 100x100cm = 8,250원 → 8,250원/m2
   * 대면적 할인: 1000x300cm = 99,000원 → 3,300원/m2
   *
   * 티어 구성:
   * - 1㎡ 이하: 8,250원/㎡ (최소 면적 0.5㎡ 적용)
   * - 3㎡ 이하: 5,500원/㎡
   * - 6㎡ 이하: 5,500원/㎡
   * - 10㎡ 이하: 4,400원/㎡
   * - 30㎡ 이하: 3,300원/㎡
   */
  areaPriceTable: {
    tiers: [
      [0.5, 14740], // 0.5㎡ 이하: 최소 금액 구간 (7,370원 기준)
      [1, 8250],    // ~1㎡: 8,250원/㎡
      [3, 5500],    // ~3㎡: 5,500원/㎡
      [6, 5500],    // ~6㎡: 5,500원/㎡
      [10, 4400],   // ~10㎡: 4,400원/㎡
      [30, 3300],   // ~30㎡: 3,300원/㎡
    ],
    minArea: 0.5, // 최소 면적 0.5㎡
  },

  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 50,
    maxWidth: 10000,
    minHeight: 50,
    maxHeight: 10000,
    maxRollWidth: 180, // 원단폭 180cm 초과 시 분할출력
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 999,
    label: '수량',
  },

  optionGroups: [
    {
      id: 'printer',
      label: '출력기 선택',
      type: 'button',
      required: true,
      options: [
        { label: '일반품질 SD', value: 'sd', price: 0, default: true },
        {
          label: '명품품질 HP',
          value: 'hp',
          price: 2200,
          priceType: 'perSqm',
        },
      ],
    },
    {
      id: 'roll-width',
      label: '출력폭 선택',
      type: 'button',
      required: true,
      options: [
        {
          label: '소형원단 (180cm)',
          value: 'small-180',
          price: 0,
          default: true,
        },
        {
          label: '대형원단 (320cm)',
          value: 'large-320',
          price: 0,
        },
      ],
    },
    {
      id: 'finishing',
      label: '후가공 선택',
      type: 'select',
      required: true,
      options: FINISHING_OPTIONS_NORMAL.map((o) => ({
        ...o,
        priceType: 'fixed' as const,
      })),
    },
    {
      id: 'velcro',
      label: '벨크로 선택',
      type: 'button',
      required: true,
      options: VELCRO_OPTIONS.map((o) => ({
        ...o,
        priceType: 'fixed' as const,
      })),
    },
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '소재', value: '고품질 현수막천' },
    { label: '출력방식', value: '고해상도 디지털 인쇄' },
    { label: '원단폭', value: '최대 180cm (초과 시 연결미싱)' },
    { label: '최소 주문', value: '1장부터' },
  ],

  deliveryInfo: '제작 후 1~2일 이내 출고 (수량에 따라 변동)',

  notes: [
    '180cm 초과 시 연결미싱으로 분할 출력됩니다.',
    '10장 이상 주문 시 약 42.9% 대량 할인이 적용됩니다.',
    '100장 이상 주문 시 약 50% 대량 할인이 적용됩니다.',
    '크기는 5cm 단위로 올림 처리됩니다.',
  ],
};

// ─── 2. 솔벤트현수막 ───

const solventHyunsumak: ProductConfig = {
  id: 'hyunsumak-solvent',
  slug: 'hyunsumak-solvent',
  name: '솔벤트현수막',
  categoryId: 'banner-cloth',
  categoryName: '현수막',
  subcategory: '솔벤현수막',
  description:
    '솔벤트 잉크를 사용한 내구성 높은 현수막. 야외 장기 게시에 적합. SD(일반)/ES(명품) 출력기 선택 가능.',
  thumbnail: 'https://picsum.photos/seed/hyunsumak-solvent/400/400.webp',
  pricingMode: 'area',

  /**
   * 솔벤트 현수막 단가 테이블
   * 분석 데이터 (세로 90cm, SD, 소형원단 180cm 기준):
   * 100cm: 8,800원 → 약 9,778원/m2 (0.9m2)
   * 500cm: 24,200원 → 약 5,378원/m2 (4.5m2)
   * 1000cm: 41,250원 → 약 4,583원/m2 (9m2)
   *
   * 100x100cm = 8,800원/m2 기준
   */
  areaPriceTable: {
    tiers: [
      [0.5, 17600], // 0.5㎡ 이하: 최소 금액 구간
      [1, 8800],    // ~1㎡: 8,800원/㎡
      [3, 5700],    // ~3㎡
      [6, 5380],    // ~6㎡
      [10, 4580],   // ~10㎡
      [30, 4200],   // ~30㎡
    ],
    minArea: 0.5,
  },

  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 50,
    maxWidth: 10000,
    minHeight: 50,
    maxHeight: 10000,
    maxRollWidth: 180,
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 999,
    label: '수량',
  },

  optionGroups: [
    {
      id: 'printer',
      label: '출력기 선택',
      type: 'button',
      required: true,
      options: [
        { label: '일반품질 SD', value: 'sd', price: 0, default: true },
        {
          label: '명품품질 ES',
          value: 'es',
          price: 1220,
          priceType: 'perSqm',
        },
      ],
    },
    {
      id: 'roll-width',
      label: '출력폭 선택',
      type: 'button',
      required: true,
      options: [
        { label: '소형원단 (150cm)', value: 'small-150', price: 0 },
        {
          label: '소형원단 (180cm)',
          value: 'small-180',
          price: 0,
          default: true,
        },
        { label: '대형원단 (320cm)', value: 'large-320', price: 0 },
      ],
    },
    {
      id: 'finishing',
      label: '후가공 선택',
      type: 'select',
      required: true,
      options: FINISHING_OPTIONS_SOLVENT.map((o) => ({
        ...o,
        priceType: 'fixed' as const,
      })),
    },
    {
      id: 'velcro',
      label: '벨크로 선택',
      type: 'button',
      required: true,
      options: VELCRO_OPTIONS.map((o) => ({
        ...o,
        priceType: 'fixed' as const,
      })),
    },
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '소재', value: '고품질 현수막천 (솔벤트 잉크)' },
    { label: '출력방식', value: '솔벤트 인쇄 (내구성 강화)' },
    { label: '원단폭', value: '150cm / 180cm / 320cm 선택' },
    { label: '적합 용도', value: '야외 장기 게시, 옥외 광고' },
  ],

  deliveryInfo: '제작 후 1~2일 이내 출고',

  notes: [
    '솔벤트 잉크는 야외 내구성이 뛰어나 장기 게시에 적합합니다.',
    '출력폭에 따라 원단폭이 다르며, 초과 시 분할 출력됩니다.',
    '크기는 5cm 단위로 올림 처리됩니다.',
  ],
};

// ─── 3. 방염현수막 ───

const fireproofHyunsumak: ProductConfig = {
  id: 'hyunsumak-fireproof',
  slug: 'hyunsumak-fireproof',
  name: '방염현수막',
  categoryId: 'banner-cloth',
  categoryName: '현수막',
  subcategory: '방염현수막',
  description:
    '방염 인증 소재를 사용한 현수막. 실내 행사장, 공공기관, 다중이용시설 등 방염 의무 설치 장소에 필수.',
  thumbnail: 'https://picsum.photos/seed/hyunsumak-fireproof/400/400.webp',
  pricingMode: 'area',

  /**
   * 방염 현수막 단가 테이블
   * 분석 데이터 (세로 90cm, SD 180cm폭 기준):
   * 100cm: 11,000원 → 12,222원/m2
   * 500cm: 52,800원 → 11,733원/m2
   * 1000cm: 99,000원 → 11,000원/m2
   *
   * 거의 선형 비례 구조, 약 11,000~12,200원/m2
   */
  areaPriceTable: {
    tiers: [
      [0.5, 22000],  // 최소 금액 구간
      [1, 12200],    // ~1㎡: 12,200원/㎡
      [3, 11900],    // ~3㎡
      [6, 11700],    // ~6㎡
      [10, 11200],   // ~10㎡
      [30, 11000],   // ~30㎡
    ],
    minArea: 0.5,
  },

  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 50,
    maxWidth: 10000,
    minHeight: 50,
    maxHeight: 10000,
    maxRollWidth: 180,
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 999,
    label: '수량',
  },

  optionGroups: [
    {
      id: 'printer',
      label: '출력기 선택 (원단폭)',
      type: 'button',
      required: true,
      options: [
        {
          label: 'SD (180cm폭)',
          value: 'sd-180',
          price: 0,
          default: true,
        },
        { label: 'SD (250cm폭)', value: 'sd-250', price: 0 },
      ],
    },
    {
      id: 'finishing',
      label: '후가공 선택',
      type: 'select',
      required: true,
      options: FINISHING_OPTIONS_FIREPROOF.map((o) => ({
        ...o,
        priceType: 'fixed' as const,
      })),
    },
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '소재', value: '방염 인증 현수막천' },
    { label: '인증', value: '방염 성능 인증 (소방법 준수)' },
    { label: '출력방식', value: 'SD 디지털 인쇄' },
    { label: '원단폭', value: '180cm / 250cm 선택' },
    { label: '적합 용도', value: '실내 행사장, 공공기관, 다중이용시설' },
  ],

  deliveryInfo: '제작 후 2~3일 이내 출고 (방염 처리 포함)',

  notes: [
    '방염 인증서가 함께 발급됩니다.',
    '다중이용시설(공공기관, 행사장 등)에서는 방염현수막 사용이 의무입니다.',
    '출력기가 모두 SD 품질이며, 원단폭(180cm/250cm)으로 구분됩니다.',
    '크기는 5cm 단위로 올림 처리됩니다.',
  ],
};

// ─── 4. 텐트천현수막 ───

const tentHyunsumak: ProductConfig = {
  id: 'hyunsumak-tent',
  slug: 'hyunsumak-tent',
  name: '텐트천현수막',
  categoryId: 'banner-cloth',
  categoryName: '현수막',
  subcategory: '텐트천',
  description:
    '텐트천 소재를 사용한 고급 현수막. 고급스러운 질감과 내구성을 겸비. SD(180cm)/HP(150cm) 출력기 선택 가능.',
  thumbnail: 'https://picsum.photos/seed/hyunsumak-tent/400/400.webp',
  pricingMode: 'area',

  /**
   * 텐트천 현수막 단가 테이블
   * 분석 데이터 (세로 90cm, SD 기준):
   * 100cm: 11,000원 → 12,222원/m2
   * 500cm: 33,000원 → 7,333원/m2
   * 1000cm: 66,000원 → 7,333원/m2
   *
   * 100x100cm = 11,000원/m2 기준
   */
  areaPriceTable: {
    tiers: [
      [0.5, 22000],  // 최소 금액 구간
      [1, 11000],    // ~1㎡: 11,000원/㎡
      [3, 8800],     // ~3㎡
      [6, 7330],     // ~6㎡
      [10, 7330],    // ~10㎡
      [30, 7000],    // ~30㎡
    ],
    minArea: 0.5,
  },

  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 50,
    maxWidth: 10000,
    minHeight: 50,
    maxHeight: 10000,
    maxRollWidth: 180,
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 999,
    label: '수량',
  },

  optionGroups: [
    {
      id: 'printer',
      label: '출력기 선택',
      type: 'button',
      required: true,
      options: [
        { label: 'SD (180cm폭)', value: 'sd', price: 0, default: true },
        {
          label: 'HP (150cm폭)',
          value: 'hp',
          price: 1220,
          priceType: 'perSqm',
        },
      ],
    },
    {
      id: 'finishing',
      label: '후가공 선택',
      type: 'select',
      required: true,
      options: FINISHING_OPTIONS_TENT.map((o) => ({
        ...o,
        priceType: 'fixed' as const,
      })),
    },
    {
      id: 'velcro',
      label: '벨크로 선택',
      type: 'button',
      required: true,
      options: VELCRO_OPTIONS.map((o) => ({
        ...o,
        priceType: 'fixed' as const,
      })),
    },
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '소재', value: '텐트천 (고급 소재)' },
    { label: '출력방식', value: 'SD / HP 디지털 인쇄' },
    { label: '원단폭', value: 'SD 180cm / HP 150cm' },
    { label: '적합 용도', value: '고급 행사, 전시, 매장 인테리어' },
  ],

  deliveryInfo: '제작 후 2~3일 이내 출고',

  notes: [
    '텐트천은 일반 현수막천 대비 질감이 고급스럽습니다.',
    'HP 출력기는 원단폭 150cm로 SD(180cm)보다 좁습니다.',
    '크기는 5cm 단위로 올림 처리됩니다.',
  ],
};

// ─── 5. 족자현수막 (고정 사이즈) ───

const jokjaHyunsumak: ProductConfig = {
  id: 'hyunsumak-jokja',
  slug: 'hyunsumak-jokja',
  name: '족자현수막',
  categoryId: 'banner-cloth',
  categoryName: '현수막',
  subcategory: '족자현수막',
  description:
    '족자봉이 포함된 고정 사이즈 현수막. 70x100cm / 90x120cm 2가지 규격. 실내 행사, 현관 등에 최적.',
  thumbnail: 'https://picsum.photos/seed/hyunsumak-jokja/400/400.webp',
  pricingMode: 'fixed',

  /**
   * 족자현수막은 고정 사이즈 기반 (fixed 모드)
   * 사이즈 선택에 따라 basePrice가 결정됨
   * - 70x100cm (SD): 기본 가격
   * - 90x120cm (SD): 기본 가격
   *
   * 실사박사에서 정확한 가격이 API에서 0으로 반환 (사이즈 버튼 클릭 시 내부 설정 필요)
   * 유사 제품 단가 기반 추정: 70x100cm ≈ 11,000원, 90x120cm ≈ 15,000원
   */
  basePrice: 11000, // 70x100cm SD 기본가

  sizeInput: {
    enabled: false, // 고정 사이즈이므로 자유 입력 비활성화
  },

  quantityInput: {
    enabled: true,
    min: 1,
    max: 999,
    label: '수량',
  },

  optionGroups: [
    {
      id: 'size',
      label: '사이즈 선택',
      type: 'button',
      required: true,
      options: [
        {
          label: '70 x 100cm',
          value: '70x100',
          price: 11000,
          priceType: 'fixed',
          default: true,
        },
        {
          label: '90 x 120cm',
          value: '90x120',
          price: 15000,
          priceType: 'fixed',
        },
      ],
    },
    {
      id: 'printer',
      label: '출력기 선택',
      type: 'button',
      required: true,
      options: [
        { label: '일반품질 SD', value: 'sd', price: 0, default: true },
        {
          label: '고급품질 HP',
          value: 'hp',
          price: 2200,
          priceType: 'fixed',
        },
      ],
    },
    {
      id: 'finishing',
      label: '후가공 선택',
      type: 'select',
      required: true,
      options: [
        { label: '열칼재단', value: 'heat-cut', price: 0, priceType: 'fixed' as const, default: true },
        { label: '나무미싱', value: 'wood-sewing', price: 0, priceType: 'fixed' as const },
        { label: '사방고리', value: 'four-rings', price: 0, priceType: 'fixed' as const },
        { label: '사방구멍', value: 'four-holes', price: 0, priceType: 'fixed' as const },
        { label: '사방고리+로프', value: 'four-rings-rope', price: 2200, priceType: 'fixed' as const },
        { label: '사방구멍+로프', value: 'four-holes-rope', price: 2200, priceType: 'fixed' as const },
        { label: '사방구멍+큐방', value: 'four-holes-cube', price: 2200, priceType: 'fixed' as const },
        { label: '로프미싱-4mm', value: 'rope-sewing-4mm', price: 6600, priceType: 'fixed' as const },
      ],
    },
    {
      id: 'assembly',
      label: '끈연결 선택',
      type: 'button',
      required: true,
      options: [
        {
          label: '전체조립',
          value: 'full',
          price: 0,
          priceType: 'fixed',
          default: true,
        },
        {
          label: '부분조립',
          value: 'partial',
          price: 0,
          priceType: 'fixed',
        },
      ],
    },
  ],

  designOptions: COMMON_DESIGN_OPTIONS,

  specs: [
    { label: '소재', value: '고품질 현수막천 + 족자봉' },
    { label: '규격', value: '70x100cm / 90x120cm' },
    { label: '출력방식', value: 'SD / HP 디지털 인쇄' },
    { label: '구성', value: '현수막 + 족자봉 + 끈 (조립 완료)' },
    { label: '적합 용도', value: '실내 행사, 현관, 입구 안내' },
  ],

  deliveryInfo: '제작 후 2~3일 이내 출고 (조립 포함)',

  notes: [
    '족자봉과 끈이 포함된 완제품으로 배송됩니다.',
    '고정 사이즈(70x100cm, 90x120cm)만 주문 가능합니다.',
    '사이즈 선택에 따라 기본 가격이 변경됩니다.',
  ],
};

// ─── 카테고리 Export ───

/** 현수막 카테고리 전체 설정 */
export const hyunsumakCategory: CategoryConfig = {
  id: 'banner-cloth',
  name: '현수막',
  icon: 'banner',
  description: '일반, 솔벤트, 방염, 텐트천, 족자 현수막 등 다양한 현수막 제작',
  order: 3,
  products: [
    normalHyunsumak,
    solventHyunsumak,
    fireproofHyunsumak,
    tentHyunsumak,
    jokjaHyunsumak,
  ],
};

/** 개별 제품 export */
export const HYUNSUMAK_PRODUCTS: ProductConfig[] = hyunsumakCategory.products;

/** 제품 ID로 검색 */
export function getHyunsumakProduct(id: string): ProductConfig | undefined {
  return HYUNSUMAK_PRODUCTS.find((p) => p.id === id);
}

/** 기본 제품 (일반현수막) */
export const DEFAULT_HYUNSUMAK = normalHyunsumak;
