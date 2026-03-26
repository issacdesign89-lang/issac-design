/**
 * 사인물 카테고리 제품 데이터
 * 실사박사 가격 역공학 기반 5개 주요 제품 정의
 * 포함: 폼보드, 포맥스, 아크릴현판, 등신대, 고무자석
 */

import type { ProductConfig, CategoryConfig } from './types';
import { COMMON_DESIGN_OPTIONS } from './types';

// ─── 1. 폼보드 ───
// 면적 기반, 두께(5T/8T/10T), 출력방식(SD/HP/UV), 후가공, 테이프, 받침대
const FOAM_BOARD: ProductConfig = {
  id: 'sign-foam-board',
  slug: 'foam-board',
  name: '폼보드',
  categoryId: 'sign',
  categoryName: '사인물',
  subcategory: '폼보드',
  description: '가볍고 경제적인 실내 POP·전시 사인물. 3종 두께, 다양한 출력 방식 선택 가능.',
  thumbnail: 'https://picsum.photos/seed/foam-board/400/400.webp',
  pricingMode: 'area',
  // 단가 테이블: 5T + R2000단면 기준 (사이즈별 가격에서 역산)
  // 30x30=11,000 / 50x50=12,100 / 60x90=12,650 / 100x100=14,850
  // 최소가격 약 11,000원 적용 (소면적)
  areaPriceTable: {
    tiers: [
      [0.3, 122000],   // ~0.3㎡ 이하: 높은 단가 (최소가격 보장)
      [0.5, 48400],    // ~0.5㎡
      [1.0, 14850],    // ~1.0㎡
      [2.0, 13200],    // ~2.0㎡
      [5.0, 12000],    // ~5.0㎡
      [999, 11000],    // 대면적
    ],
    minArea: 0.09, // 최소 면적 0.09㎡ (30x30cm)
  },
  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 10,
    maxWidth: 300,
    minHeight: 10,
    maxHeight: 300,
  },
  quantityInput: {
    enabled: true,
    min: 1,
    max: 100,
  },
  optionGroups: [
    {
      id: 'thickness',
      label: '폼보드 두께',
      type: 'button',
      required: true,
      options: [
        // 3T와 5T는 동일가격이므로 추가단가 0
        { label: '5T', value: '5t', price: 0, default: true },
        { label: '8T', value: '8t', price: 6050, priceType: 'fixed' },
        { label: '10T', value: '10t', price: 6050, priceType: 'fixed' },
      ],
    },
    {
      id: 'print-type',
      label: '출력 방식',
      type: 'select',
      required: true,
      options: [
        { label: 'R2000 단면 (일반품질)', value: 'r2000-single', price: 0, default: true },
        { label: 'UV 단면', value: 'uv-single', price: 6600, priceType: 'fixed' },
        { label: '유포지 단면합지', value: 'yupo-single', price: 1100, priceType: 'fixed' },
        { label: 'R2000 양면', value: 'r2000-double', price: 8800, priceType: 'fixed' },
        { label: 'UV 양면', value: 'uv-double', price: 4400, priceType: 'fixed' },
        { label: '유포지 양면합지', value: 'yupo-double', price: 13200, priceType: 'fixed' },
      ],
    },
    {
      id: 'printer',
      label: '출력기 등급',
      type: 'button',
      required: true,
      options: [
        { label: 'STANDARD (일반)', value: 'sd', price: 0, default: true },
        { label: 'HP (고급)', value: 'hp', price: 1100, priceType: 'fixed' },
        { label: 'EPSON (명품)', value: 'epson', price: 2200, priceType: 'fixed' },
      ],
    },
    {
      id: 'finishing',
      label: '후가공',
      type: 'button',
      required: true,
      options: [
        { label: '미선택', value: 'none', price: 0, default: true },
        { label: '사각재단', value: 'square-cut', price: 550, priceType: 'fixed' },
        { label: '모양컷팅', value: 'shape-cut', price: 1100, priceType: 'fixed' },
      ],
    },
    {
      id: 'tape',
      label: '테이프 (양면)',
      type: 'select',
      required: false,
      options: [
        { label: '사용안함', value: 'none', price: 0, default: true },
        { label: '25 x 25cm', value: '25x25', price: 1650, priceType: 'fixed' },
        { label: '35 x 35cm', value: '35x35', price: 2200, priceType: 'fixed' },
        { label: '50 x 50cm', value: '50x50', price: 2750, priceType: 'fixed' },
        { label: '100 x 50cm', value: '100x50', price: 5500, priceType: 'fixed' },
      ],
    },
    {
      id: 'stand',
      label: '받침대',
      type: 'select',
      required: false,
      options: [
        { label: '사용안함', value: 'none', price: 0, default: true },
        { label: '등신대 철재받침대 (소) 70cm', value: 'steel-s', price: 7040, priceType: 'fixed' },
        { label: '등신대 철재받침대 (중) 120cm', value: 'steel-m', price: 7370, priceType: 'fixed' },
        { label: '등신대 철재받침대 (대) 150cm', value: 'steel-l', price: 7700, priceType: 'fixed' },
        { label: '미니 종이받침대 (소) 90x140mm', value: 'paper-s', price: 1100, priceType: 'fixed' },
        { label: '미니 종이받침대 (대) 120x260mm', value: 'paper-l', price: 1100, priceType: 'fixed' },
      ],
    },
  ],
  designOptions: COMMON_DESIGN_OPTIONS,
  specs: [
    { label: '소재', value: '폼보드 (발포 우레탄 보드)' },
    { label: '두께', value: '5T / 8T / 10T' },
    { label: '최대 사이즈', value: '300cm x 300cm' },
    { label: '용도', value: '실내 POP, 전시, 안내판, 포토존' },
  ],
  deliveryInfo: '3~5 영업일 (당일 출고 가능 상품 있음)',
  notes: [
    '면적이 작아도 최소 가격(약 11,000원)이 적용됩니다.',
    '양면 출력 시 앞뒤 동일 이미지 또는 다른 이미지 가능.',
    '대형 사이즈는 분할 접합으로 제작될 수 있습니다.',
  ],
};

// ─── 2. 포맥스 ───
// 면적 기반, 6종 두께(1T~10T), 방수 가능
const FOMAX: ProductConfig = {
  id: 'sign-fomax',
  slug: 'fomax',
  name: '포맥스',
  categoryId: 'sign',
  categoryName: '사인물',
  subcategory: '포맥스',
  description: '내구성 강한 PVC 발포보드. 실내외 겸용, 방수 가능. 6종 두께 선택.',
  thumbnail: 'https://picsum.photos/seed/fomax/400/400.webp',
  pricingMode: 'area',
  // 단가 테이블: 5T + R2000단면 기준
  // 30x30=19,580 / 50x50=25,740 / 60x90=28,820 / 100x100=41,140
  areaPriceTable: {
    tiers: [
      [0.3, 217500],   // 소면적 높은 단가 (최소가격 보장)
      [0.5, 103000],   // ~0.5㎡
      [1.0, 41140],    // ~1.0㎡
      [2.0, 35000],    // ~2.0㎡
      [5.0, 30000],    // ~5.0㎡
      [999, 28000],    // 대면적
    ],
    minArea: 0.09,
  },
  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 10,
    maxWidth: 300,
    minHeight: 10,
    maxHeight: 300,
  },
  quantityInput: {
    enabled: true,
    min: 1,
    max: 100,
  },
  optionGroups: [
    {
      id: 'thickness',
      label: '포맥스 두께',
      type: 'button',
      required: true,
      options: [
        // 5T 기준, 두께별 차등 (60x90 기준 단가차 역산)
        { label: '1T', value: '1t', price: -12100, priceType: 'fixed' },
        { label: '2T', value: '2t', price: -8140, priceType: 'fixed' },
        { label: '3T', value: '3t', price: -6050, priceType: 'fixed' },
        { label: '5T', value: '5t', price: 0, default: true },
        { label: '8T', value: '8t', price: 10010, priceType: 'fixed' },
        { label: '10T', value: '10t', price: 18040, priceType: 'fixed' },
      ],
    },
    {
      id: 'print-type',
      label: '출력물',
      type: 'select',
      required: true,
      options: [
        { label: 'R2000 단면', value: 'r2000-single', price: 0, default: true },
        { label: 'UV 단면', value: 'uv-single', price: 9240, priceType: 'fixed' },
        { label: '유포지 단면합지', value: 'yupo-single', price: 1540, priceType: 'fixed' },
        { label: 'R2000 양면', value: 'r2000-double', price: 12320, priceType: 'fixed' },
        { label: 'UV 양면', value: 'uv-double', price: 6160, priceType: 'fixed' },
        { label: '유포지 양면합지', value: 'yupo-double', price: 18480, priceType: 'fixed' },
      ],
    },
    {
      id: 'finishing',
      label: '후가공',
      type: 'button',
      required: true,
      options: [
        { label: '미선택', value: 'none', price: 0, default: true },
        { label: '사각재단', value: 'square-cut', price: 550, priceType: 'fixed' },
        { label: '모양컷팅', value: 'shape-cut', price: 1100, priceType: 'fixed' },
      ],
    },
    {
      id: 'tape',
      label: '테이프 (양면)',
      type: 'select',
      required: false,
      options: [
        { label: '사용안함', value: 'none', price: 0, default: true },
        { label: '25 x 25cm', value: '25x25', price: 1650, priceType: 'fixed' },
        { label: '35 x 35cm', value: '35x35', price: 2200, priceType: 'fixed' },
        { label: '50 x 50cm', value: '50x50', price: 2750, priceType: 'fixed' },
        { label: '100 x 50cm', value: '100x50', price: 5500, priceType: 'fixed' },
      ],
    },
    {
      id: 'stand',
      label: '받침대',
      type: 'select',
      required: false,
      options: [
        { label: '사용안함', value: 'none', price: 0, default: true },
        { label: '등신대 철재받침대 (소) 70cm', value: 'steel-s', price: 7040, priceType: 'fixed' },
        { label: '등신대 철재받침대 (중) 120cm', value: 'steel-m', price: 7370, priceType: 'fixed' },
        { label: '등신대 철재받침대 (대) 150cm', value: 'steel-l', price: 7700, priceType: 'fixed' },
        { label: '미니 종이받침대 (소) 90x140mm', value: 'paper-s', price: 1100, priceType: 'fixed' },
        { label: '미니 종이받침대 (대) 120x260mm', value: 'paper-l', price: 1100, priceType: 'fixed' },
      ],
    },
  ],
  designOptions: COMMON_DESIGN_OPTIONS,
  specs: [
    { label: '소재', value: '포맥스 (PVC 발포보드)' },
    { label: '두께', value: '1T / 2T / 3T / 5T / 8T / 10T' },
    { label: '최대 사이즈', value: '300cm x 300cm' },
    { label: '방수', value: '가능 (실외 사용 OK)' },
    { label: '용도', value: '실내외 안내판, 간판, 현판, 사인물' },
  ],
  deliveryInfo: '3~5 영업일',
  notes: [
    '포맥스는 PVC 소재로 방수가 가능해 실외 사용에 적합합니다.',
    '두께가 두꺼울수록 가격이 상승합니다 (1T~10T 약 2.8배 차이).',
    '면적이 작아도 최소 가격이 적용됩니다.',
  ],
};

// ─── 3. 아크릴현판 ───
// 고정 사이즈 27규격, 칼라판(실버/골드/로즈골드), 장식다보
const ACRYLIC_SIGN: ProductConfig = {
  id: 'sign-acrylic',
  slug: 'acrylic-sign',
  name: '아크릴현판',
  categoryId: 'sign',
  categoryName: '사인물',
  subcategory: '아크릴현판',
  description: '고급 투명 아크릴 + 포맥스 조합 현판. 칼라판·장식다보 선택 가능.',
  thumbnail: 'https://picsum.photos/seed/acrylic-sign/400/400.webp',
  pricingMode: 'fixed',
  basePrice: 0, // 사이즈 선택에 따라 결정
  sizeInput: {
    enabled: false, // 고정 사이즈 상품
  },
  quantityInput: {
    enabled: true,
    min: 1,
    max: 50,
  },
  optionGroups: [
    {
      id: 'sign-type',
      label: '현판 종류',
      type: 'button',
      required: true,
      options: [
        { label: '포멕스', value: 'fomax', price: 0, default: true },
        { label: '아크릴+포멕스', value: 'acrylic-fomax', price: 0 },
        { label: '아크릴+메탈판', value: 'acrylic-metal', price: 0 },
      ],
    },
    {
      id: 'size',
      label: '사이즈',
      type: 'select',
      required: true,
      options: [
        // 포멕스 기본가 (sign-type에 따라 추가금 적용 구조)
        // 여기서는 아크릴+포멕스 기준 가격을 basePrice로 사용
        { label: '300mm x 200mm', value: '300x200', price: 23100, priceType: 'fixed', default: true },
        { label: '350mm x 230mm', value: '350x230', price: 26400, priceType: 'fixed' },
        { label: '400mm x 260mm', value: '400x260', price: 29700, priceType: 'fixed' },
        { label: '450mm x 300mm', value: '450x300', price: 33000, priceType: 'fixed' },
        { label: '500mm x 330mm', value: '500x330', price: 36300, priceType: 'fixed' },
        { label: '550mm x 360mm', value: '550x360', price: 39600, priceType: 'fixed' },
        { label: '600mm x 400mm', value: '600x400', price: 42900, priceType: 'fixed' },
        { label: '650mm x 450mm', value: '650x450', price: 46200, priceType: 'fixed' },
      ],
    },
    {
      id: 'color-plate',
      label: '칼라판',
      type: 'button',
      required: true,
      options: [
        // 칼라판별 가격 차이 없음
        { label: '실버', value: 'silver', price: 0, default: true },
        { label: '골드', value: 'gold', price: 0 },
        { label: '로즈골드', value: 'rose-gold', price: 0 },
      ],
    },
    {
      id: 'dabo',
      label: '장식품',
      type: 'button',
      required: true,
      options: [
        { label: '다보없음', value: 'none', price: 0, default: true },
        { label: '장식다보', value: 'decorative', price: 2200, priceType: 'fixed' },
        { label: '피스다보', value: 'screw', price: -4400, priceType: 'fixed' },
      ],
    },
  ],
  designOptions: COMMON_DESIGN_OPTIONS,
  specs: [
    { label: '소재', value: '투명 아크릴 + 포맥스 / 메탈판' },
    { label: '인쇄', value: 'UV 출력 (단면/양면)' },
    { label: '규격', value: '8종 고정 사이즈 (300x200 ~ 650x450mm)' },
    { label: '용도', value: '사무실 현판, 상호 간판, 인테리어 사인' },
  ],
  deliveryInfo: '5~7 영업일',
  notes: [
    '아크릴+메탈판 조합은 프리미엄 등급으로 별도 단가가 적용됩니다.',
    '칼라판(실버/골드/로즈골드)은 가격 차이 없이 선택 가능합니다.',
    '장식다보 설치 시 벽면 타공이 필요합니다.',
  ],
};

// ─── 4. 등신대 ───
// 면적 기반, 폼보드/포맥스 5T
const LIFE_SIZE_CUTOUT: ProductConfig = {
  id: 'sign-life-size',
  slug: 'life-size-cutout',
  name: '등신대',
  categoryId: 'sign',
  categoryName: '사인물',
  subcategory: '등신대',
  description: '인물·캐릭터 실물 크기 입체 사인물. 폼보드/포맥스 5T 모양컷팅.',
  thumbnail: 'https://picsum.photos/seed/life-size/400/400.webp',
  pricingMode: 'area',
  // 단가 테이블: 폼보드5T-UV + 셀프교정 기준
  // 60x90=24,750 / 60x180=37,950 / 80x180=56,980 / 120x180=69,300
  areaPriceTable: {
    tiers: [
      [0.5, 50000],    // ~0.5㎡
      [1.0, 35200],    // ~1.0㎡
      [1.5, 32100],    // ~1.5㎡
      [2.0, 30000],    // ~2.0㎡
      [3.0, 28600],    // ~3.0㎡
      [999, 27000],    // 대면적
    ],
    minArea: 0.54, // 최소 면적 (60x90cm)
  },
  sizeInput: {
    enabled: true,
    widthLabel: '가로',
    heightLabel: '세로',
    unit: 'cm',
    minWidth: 30,
    maxWidth: 200,
    minHeight: 30,
    maxHeight: 250,
  },
  quantityInput: {
    enabled: true,
    min: 1,
    max: 50,
  },
  optionGroups: [
    {
      id: 'material',
      label: '출력물 (소재)',
      type: 'button',
      required: true,
      options: [
        { label: '폼보드 5T - UV인쇄', value: 'foam-uv', price: 0, default: true },
        { label: '폼보드 5T - 유포지합지', value: 'foam-yupo', price: 4180, priceType: 'fixed' },
        { label: '포맥스 5T - UV인쇄', value: 'fomax-uv', price: 10450, priceType: 'fixed' },
        { label: '포맥스 5T - 유포지합지', value: 'fomax-yupo', price: 14630, priceType: 'fixed' },
      ],
    },
    {
      id: 'stand',
      label: '받침대',
      type: 'select',
      required: false,
      options: [
        { label: '사용안함', value: 'none', price: 0, default: true },
        { label: '등신대 철재받침대 (소) 70cm', value: 'steel-s', price: 7040, priceType: 'fixed' },
        { label: '등신대 철재받침대 (중) 120cm', value: 'steel-m', price: 7370, priceType: 'fixed' },
        { label: '등신대 철재받침대 (대) 150cm', value: 'steel-l', price: 7700, priceType: 'fixed' },
      ],
    },
  ],
  // 등신대는 디자인 추가 금액이 다름 (22,000/33,000/44,000)
  designOptions: [
    { label: '셀프 교정', value: 'self-proof', price: 0, description: '고객이 직접 교정' },
    { label: '완성 파일 접수', value: 'complete-file', price: 0, description: '완성된 인쇄 파일 제출' },
    { label: '셀프 디자인', value: 'self-design', price: 0, description: '온라인 에디터로 직접 디자인' },
    { label: '일반 디자인', value: 'basic-design', price: 22000, description: '단면 / 시안 수정 3회' },
    { label: '고급 디자인', value: 'premium-design', price: 33000, description: '단면 / 시안 수정 3회' },
    { label: '명품 디자인', value: 'luxury-design', price: 44000, description: '단면 / 시안 수정 3회' },
  ],
  specs: [
    { label: '소재', value: '폼보드 5T / 포맥스 5T' },
    { label: '인쇄', value: 'UV인쇄 또는 유포지합지' },
    { label: '기본 사이즈', value: '60cm x 180cm' },
    { label: '컷팅', value: '모양컷팅 (인물 윤곽)' },
    { label: '용도', value: '행사, 전시, 이벤트, 포토존' },
  ],
  deliveryInfo: '5~7 영업일',
  notes: [
    '등신대는 모양컷팅이 기본 포함되어 있습니다.',
    '등신대 디자인 추가 금액은 일반 상품과 다릅니다 (22,000/33,000/44,000원).',
    '포맥스 소재는 실외에서도 사용 가능합니다.',
    '철재받침대 선택 시 자립형으로 사용 가능합니다.',
  ],
};

// ─── 5. 고무자석 ───
// 고정 사이즈 10규격
const RUBBER_MAGNET: ProductConfig = {
  id: 'sign-rubber-magnet',
  slug: 'rubber-magnet',
  name: '고무자석',
  categoryId: 'sign',
  categoryName: '사인물',
  subcategory: '고무자석',
  description: '차량용·냉장고용 고무자석 사인. UV/솔벤트 인쇄, 시트지 코팅 합지.',
  thumbnail: 'https://picsum.photos/seed/rubber-magnet/400/400.webp',
  pricingMode: 'fixed',
  basePrice: 0, // 사이즈 옵션에서 결정
  sizeInput: {
    enabled: false, // 고정 사이즈 상품
  },
  quantityInput: {
    enabled: true,
    min: 1,
    max: 100,
  },
  optionGroups: [
    {
      id: 'size',
      label: '사이즈',
      type: 'select',
      required: true,
      options: [
        { label: '50cm x 19cm', value: '50x19', price: 17160, priceType: 'fixed', default: true },
        { label: '50cm x 24cm', value: '50x24', price: 17930, priceType: 'fixed' },
        { label: '50cm x 29cm', value: '50x29', price: 18590, priceType: 'fixed' },
        { label: '50cm x 35cm', value: '50x35', price: 19360, priceType: 'fixed' },
        { label: '65cm x 29cm', value: '65x29', price: 20020, priceType: 'fixed' },
        { label: '65cm x 35cm', value: '65x35', price: 20790, priceType: 'fixed' },
        { label: '95cm x 35cm', value: '95x35', price: 21450, priceType: 'fixed' },
        { label: '95cm x 40cm', value: '95x40', price: 28600, priceType: 'fixed' },
        { label: '115cm x 35cm', value: '115x35', price: 31460, priceType: 'fixed' },
        { label: '115cm x 40cm', value: '115x40', price: 34320, priceType: 'fixed' },
      ],
    },
    {
      id: 'coating',
      label: '사인물 코팅',
      type: 'button',
      required: true,
      options: [
        { label: '시트지+무광코팅+합지', value: 'matte', price: 0, default: true },
        { label: '시트지+유광코팅+합지', value: 'glossy', price: 1320, priceType: 'fixed' },
      ],
    },
    {
      id: 'finishing',
      label: '후가공',
      type: 'button',
      required: true,
      options: [
        { label: '사각재단', value: 'square-cut', price: 0, default: true },
        { label: '모양컷팅', value: 'shape-cut', price: 1100, priceType: 'fixed' },
      ],
    },
  ],
  designOptions: COMMON_DESIGN_OPTIONS,
  specs: [
    { label: '소재', value: '고무자석 + 시트지 코팅 합지' },
    { label: '인쇄', value: 'UV / 솔벤트 (가격 동일)' },
    { label: '규격', value: '10종 고정 사이즈 (50x19 ~ 115x40cm)' },
    { label: '용도', value: '차량 부착용, 냉장고 부착용, 이동식 사인' },
  ],
  deliveryInfo: '3~5 영업일',
  notes: [
    'UV와 솔벤트 인쇄 모두 가격이 동일합니다.',
    '차량 부착 시 자석으로 탈부착이 자유롭습니다.',
    '모양컷팅 선택 시 원하는 형태로 재단 가능합니다.',
  ],
};

// ─── 카테고리 내보내기 ───

export const SIGN_PRODUCTS: ProductConfig[] = [
  FOAM_BOARD,
  FOMAX,
  ACRYLIC_SIGN,
  LIFE_SIZE_CUTOUT,
  RUBBER_MAGNET,
];

export const SIGN_CATEGORY: CategoryConfig = {
  id: 'sign',
  name: '사인물',
  icon: 'sign',
  description: '폼보드, 포맥스, 아크릴현판, 등신대, 고무자석 등 실내외 사인물 제작',
  order: 3,
  products: SIGN_PRODUCTS,
};

export default SIGN_PRODUCTS;
