// src/data/banner-categories.ts
// Single source of truth for banner category data

export interface BannerCategory {
  id: string;
  name: string;
  order_index: number;
}

export interface SubcategoryItem {
  label: string;
  href: string;
}

export interface SubcategoryGroup {
  title: string;
  items: { label: string }[];
}

// All banner categories
export const BANNER_CATEGORIES: BannerCategory[] = [
  { id: 'banner-stand', name: '배너거치대', order_index: 1 },
  { id: 'banner-print', name: '배너출력물', order_index: 2 },
  { id: 'banner-cloth', name: '현수막', order_index: 3 },
  { id: 'wind-banner', name: '윈드배너', order_index: 4 },
  { id: 'sign-board', name: '입간판', order_index: 5 },
  { id: 'sign-board-print', name: '입간판출력물', order_index: 5.5 },
  { id: 'print-output', name: '실사출력', order_index: 6 },
  { id: 'scroll-blind', name: '족자봉·롤블라인드', order_index: 7 },
  { id: 'custom-payment', name: '고객맞춤결제', order_index: 8 },
];

// Mega menu subcategories - keyed by category NAME
export const SUBCATEGORY_MAP: Record<string, SubcategoryItem[]> = {
  '배너거치대': [
    { label: '실외거치대', href: '/banner/category/banner-stand?sub=실외거치대' },
    { label: '실내거치대', href: '/banner/category/banner-stand?sub=실내거치대' },
    { label: '철제거치대', href: '/banner/category/banner-stand?sub=철제거치대' },
    { label: '자이언트폴', href: '/banner/category/banner-stand?sub=자이언트폴' },
    { label: '미니배너', href: '/banner/category/banner-stand?sub=미니배너' },
    { label: '특수배너', href: '/banner/category/banner-stand?sub=특수배너' },
    { label: '부속품', href: '/banner/category/banner-stand?sub=부속품' },
  ],
  '배너출력물': [
    { label: '배너출력물', href: '/banner/category/banner-print?sub=배너출력물' },
    { label: '자이언트폴 출력물', href: '/banner/category/banner-print?sub=자이언트폴 출력물' },
    { label: '미니배너 출력물', href: '/banner/category/banner-print?sub=미니배너 출력물' },
    { label: '특수배너 출력물', href: '/banner/category/banner-print?sub=특수배너 출력물' },
  ],
  '현수막': [
    { label: '일반현수막', href: '/banner/category/banner-cloth?sub=일반현수막' },
    { label: '장폭현수막', href: '/banner/category/banner-cloth?sub=장폭현수막' },
    { label: '솔벤현수막', href: '/banner/category/banner-cloth?sub=솔벤현수막' },
    { label: '라텍스현수막', href: '/banner/category/banner-cloth?sub=라텍스현수막' },
    { label: '테이블현수막', href: '/banner/category/banner-cloth?sub=테이블현수막' },
    { label: '열전사메쉬', href: '/banner/category/banner-cloth?sub=열전사메쉬' },
    { label: '텐트천', href: '/banner/category/banner-cloth?sub=텐트천' },
    { label: '부직포', href: '/banner/category/banner-cloth?sub=부직포' },
    { label: '부속품', href: '/banner/category/banner-cloth?sub=부속품' },
    { label: '게릴라현수막', href: '/banner/category/banner-cloth?sub=게릴라현수막' },
    { label: '족자현수막', href: '/banner/category/banner-cloth?sub=족자현수막' },
    { label: '게시대현수막', href: '/banner/category/banner-cloth?sub=게시대현수막' },
    { label: '어깨띠', href: '/banner/category/banner-cloth?sub=어깨띠' },
  ],
  '윈드배너': [
    { label: '윈드배너F형', href: '/banner/category/wind-banner?sub=윈드배너F형' },
    { label: '윈드배너S형', href: '/banner/category/wind-banner?sub=윈드배너S형' },
    { label: '윈드배너H형', href: '/banner/category/wind-banner?sub=윈드배너H형' },
    { label: '부속품', href: '/banner/category/wind-banner?sub=부속품' },
    { label: 'F형 출력물', href: '/banner/category/wind-banner?sub=F형 출력물' },
    { label: 'S형 출력물', href: '/banner/category/wind-banner?sub=S형 출력물' },
    { label: 'H형 출력물', href: '/banner/category/wind-banner?sub=H형 출력물' },
  ],
  '입간판': [
    { label: 'A형입간판', href: '/banner/category/sign-board?sub=A형입간판' },
    { label: '물통입간판', href: '/banner/category/sign-board?sub=물통입간판' },
    { label: '사인스탠드', href: '/banner/category/sign-board?sub=사인스탠드' },
    { label: '부속품', href: '/banner/category/sign-board?sub=부속품' },
  ],
  '입간판출력물': [
    { label: 'A형입간판 출력물', href: '/banner/category/sign-board-print?sub=A형입간판 출력물' },
    { label: '물통입간판 출력물', href: '/banner/category/sign-board-print?sub=물통입간판 출력물' },
    { label: '사인스탠드 출력물', href: '/banner/category/sign-board-print?sub=사인스탠드 출력물' },
  ],
  '실사출력': [
    { label: '접착용', href: '/banner/category/print-output?sub=접착용' },
    { label: '비접착용', href: '/banner/category/print-output?sub=비접착용' },
    { label: '시트커팅', href: '/banner/category/print-output?sub=시트커팅' },
    { label: '차량용자석', href: '/banner/category/print-output?sub=차량용자석' },
    { label: 'POP·보드', href: '/banner/category/print-output?sub=POP·보드' },
    { label: '등신대', href: '/banner/category/print-output?sub=등신대' },
  ],
  '족자봉·롤블라인드': [
    { label: '족자봉', href: '/banner/category/scroll-blind?sub=족자봉' },
    { label: '롤블라인드', href: '/banner/category/scroll-blind?sub=롤블라인드' },
    { label: '부속품', href: '/banner/category/scroll-blind?sub=부속품' },
  ],
  '고객맞춤결제': [
    { label: '고객맞춤결제', href: '/banner/category/custom-payment?sub=고객맞춤결제' },
    { label: '디자인비결제', href: '/banner/category/custom-payment?sub=디자인비결제' },
    { label: '배송비결제', href: '/banner/category/custom-payment?sub=배송비결제' },
  ],
};

// For admin dropdown - keyed by category ID, flat string arrays
export const ADMIN_SUBCATEGORY_MAP: Record<string, string[]> = {
  'banner-stand': ['실외거치대', '실내거치대', '철제거치대', '자이언트폴', '미니배너', '특수배너', '부속품'],
  'banner-print': ['배너출력물', '자이언트폴 출력물', '미니배너 출력물', '특수배너 출력물'],
  'banner-cloth': ['일반현수막', '장폭현수막', '솔벤현수막', '라텍스현수막', '테이블현수막', '열전사메쉬', '텐트천', '부직포', '부속품', '게릴라현수막', '족자현수막', '게시대현수막', '어깨띠'],
  'wind-banner': ['윈드배너F형', '윈드배너S형', '윈드배너H형', '부속품', 'F형 출력물', 'S형 출력물', 'H형 출력물'],
  'sign-board': ['A형입간판', '물통입간판', '사인스탠드', '부속품'],
  'sign-board-print': ['A형입간판 출력물', '물통입간판 출력물', '사인스탠드 출력물'],
  'print-output': ['접착용', '비접착용', '시트커팅', '차량용자석', 'POP·보드', '등신대'],
  'scroll-blind': ['족자봉', '롤블라인드', '부속품'],
  'custom-payment': ['고객맞춤결제', '디자인비결제', '배송비결제'],
};

// Sidebar groups for category page - keyed by category ID
export const SUBCATEGORY_GROUPS: Record<string, SubcategoryGroup[]> = {
  'banner-stand': [
    { title: '배너거치대', items: [{ label: '실외거치대' }, { label: '실내거치대' }, { label: '철제거치대' }, { label: '자이언트폴' }, { label: '미니배너' }, { label: '특수배너' }, { label: '부속품' }] },
  ],
  'banner-print': [
    { title: '배너출력물', items: [{ label: '배너출력물' }, { label: '자이언트폴 출력물' }, { label: '미니배너 출력물' }, { label: '특수배너 출력물' }] },
  ],
  'banner-cloth': [
    { title: '현수막', items: [{ label: '일반현수막' }, { label: '장폭현수막' }, { label: '솔벤현수막' }, { label: '라텍스현수막' }, { label: '테이블현수막' }, { label: '열전사메쉬' }, { label: '텐트천' }, { label: '부직포' }, { label: '부속품' }] },
    { title: '대량현수막', items: [{ label: '게릴라현수막' }, { label: '족자현수막' }, { label: '게시대현수막' }, { label: '어깨띠' }] },
  ],
  'wind-banner': [
    { title: '윈드배너', items: [{ label: '윈드배너F형' }, { label: '윈드배너S형' }, { label: '윈드배너H형' }, { label: '부속품' }] },
  ],
  'sign-board': [
    { title: '입간판', items: [{ label: 'A형입간판' }, { label: '물통입간판' }, { label: '사인스탠드' }, { label: '부속품' }] },
  ],
  'sign-board-print': [
    { title: '입간판출력물', items: [{ label: 'A형입간판 출력물' }, { label: '물통입간판 출력물' }, { label: '사인스탠드 출력물' }] },
  ],
  'print-output': [
    { title: '실사출력', items: [{ label: '접착용' }, { label: '비접착용' }, { label: '시트커팅' }, { label: '차량용자석' }, { label: 'POP·보드' }, { label: '등신대' }] },
  ],
  'scroll-blind': [
    { title: '족자봉·롤블라인드', items: [{ label: '족자봉' }, { label: '롤블라인드' }, { label: '부속품' }] },
  ],
  'custom-payment': [
    { title: '고객맞춤결제', items: [{ label: '고객맞춤결제' }, { label: '디자인비결제' }, { label: '배송비결제' }] },
  ],
};

// Category section grouping (for top tabs on category page)
export const CATEGORY_SECTIONS: Record<string, string[]> = {
  banner: ['banner-stand', 'banner-print', 'banner-cloth', 'wind-banner'],
  print: ['sign-board', 'sign-board-print', 'print-output', 'scroll-blind'],
  payment: ['custom-payment'],
};

export const SECTION_TAB_LABELS: Record<string, string> = {
  'banner-stand': '배너거치대',
  'banner-print': '배너출력물',
  'banner-cloth': '현수막',
  'wind-banner': '윈드배너',
  'sign-board': '입간판',
  'sign-board-print': '입간판출력물',
  'print-output': '실사출력',
  'scroll-blind': '족자봉·롤블라인드',
  'custom-payment': '고객맞춤결제',
};

// Build megaMenuData from categories + subcategory map
export function buildMegaMenuData() {
  return BANNER_CATEGORIES.map(cat => ({
    id: cat.id,
    name: cat.name,
    subcategories: SUBCATEGORY_MAP[cat.name] || [{ label: '전체보기', href: `/banner/category/${cat.id}` }],
  }));
}

// Get category name by ID
export function getCategoryName(id: string): string {
  return BANNER_CATEGORIES.find(c => c.id === id)?.name || id;
}
