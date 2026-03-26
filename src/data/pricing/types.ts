/**
 * 실사박사 스타일 견적 시스템 - 타입 정의
 * 3가지 가격 계산 패턴: area(면적), fixed(고정), quantity(수량)
 */

// ─── 공통 타입 ───

export type PricingMode = 'area' | 'fixed' | 'quantity';

export interface OptionItem {
  label: string;
  value: string | number;
  /** 면적 기반: ㎡당 추가단가 / 고정: 고정가 / 수량: 단가 */
  price: number;
  /** 가격 유형: perSqm(㎡당), fixed(고정), perUnit(개당) */
  priceType?: 'perSqm' | 'fixed' | 'perUnit';
  /** 기본 선택 여부 */
  default?: boolean;
}

export interface OptionGroup {
  id: string;
  label: string;
  type: 'select' | 'radio' | 'button';
  required: boolean;
  options: OptionItem[];
}

export interface SizeInput {
  enabled: boolean;
  widthLabel?: string;
  heightLabel?: string;
  unit?: 'cm' | 'mm';
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  /** 원단폭 제한 (cm) - 초과 시 분할출력 */
  maxRollWidth?: number;
}

export interface QuantityInput {
  enabled: boolean;
  min?: number;
  max?: number;
  presets?: number[];
  label?: string;
}

export interface DesignOption {
  label: string;
  value: string;
  price: number;
  description?: string;
}

// ─── 면적 기반 가격 테이블 ───

export interface AreaPriceTable {
  /** sqm별 기본 단가: [maxSqm, pricePerSqm][] */
  tiers: [number, number][];
  /** 최소 면적 (㎡) - 이하 면적도 이 단가 적용 */
  minArea?: number;
}

// ─── 수량 기반 가격 테이블 ───

export interface QuantityPriceTable {
  /** [수량, 총가격][] */
  tiers: [number, number][];
}

// ─── 상품 정의 ───

export interface ProductConfig {
  id: string;
  slug: string;
  name: string;
  categoryId: string;
  categoryName: string;
  subcategory?: string;
  description: string;
  thumbnail: string;
  pricingMode: PricingMode;
  /** 면적 기반 상품의 단가 테이블 */
  areaPriceTable?: AreaPriceTable;
  /** 수량 기반 상품의 단가 테이블 */
  quantityPriceTable?: QuantityPriceTable;
  /** 기본 가격 (고정가 상품) */
  basePrice?: number;
  sizeInput: SizeInput;
  quantityInput: QuantityInput;
  optionGroups: OptionGroup[];
  designOptions: DesignOption[];
  specs?: { label: string; value: string }[];
  deliveryInfo?: string;
  notes?: string[];
}

// ─── 카테고리 정의 ───

export interface CategoryConfig {
  id: string;
  name: string;
  icon: string;
  description: string;
  order: number;
  products: ProductConfig[];
}

// ─── 견적 결과 ───

export interface QuoteResult {
  /** 기본 출력 가격 */
  baseCost: number;
  /** 옵션 추가 금액 상세 */
  optionCosts: { label: string; amount: number }[];
  /** 디자인 비용 */
  designCost: number;
  /** 소계 (세전) */
  subtotal: number;
  /** 부가세 */
  vat: number;
  /** 총액 */
  total: number;
  /** 면적 (면적 기반) */
  area?: number;
  /** 수량 */
  quantity: number;
}

// ─── 사용자 선택 상태 ───

export interface QuoteSelection {
  productId: string;
  width?: number;
  height?: number;
  quantity: number;
  selectedOptions: Record<string, string | number>;
  selectedDesign: string;
}

// ─── 공통 디자인 옵션 (전 상품 공통) ───

export const COMMON_DESIGN_OPTIONS: DesignOption[] = [
  { label: '셀프 교정', value: 'self-proof', price: 0, description: '고객이 직접 교정' },
  { label: '완성 파일 접수', value: 'complete-file', price: 0, description: '완성된 인쇄 파일 제출' },
  { label: '셀프 디자인', value: 'self-design', price: 0, description: '온라인 에디터로 직접 디자인' },
  { label: '일반 디자인', value: 'basic-design', price: 33000, description: '단면 / 시안 수정 3회' },
  { label: '고급 디자인', value: 'premium-design', price: 55000, description: '단면 / 시안 수정 3회' },
  { label: '명품 디자인', value: 'luxury-design', price: 77000, description: '단면 / 시안 수정 3회' },
];
