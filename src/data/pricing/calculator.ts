/**
 * 견적 계산 엔진
 * 실사박사 가격 공식 역공학 기반 클라이언트사이드 계산기
 */

import type {
  ProductConfig,
  QuoteSelection,
  QuoteResult,
  AreaPriceTable,
  QuantityPriceTable,
} from './types';

// ─── 면적 계산 ───

/** cm → ㎡ 변환 (5cm 단위 올림 처리) */
export function calculateArea(widthCm: number, heightCm: number): number {
  const w = Math.ceil(widthCm / 5) * 5;
  const h = Math.ceil(heightCm / 5) * 5;
  return (w * h) / 10000; // cm² → ㎡
}

/** 면적 기반 기본 단가 조회 */
function getAreaBasePrice(area: number, table: AreaPriceTable): number {
  const minArea = table.minArea ?? 1;
  const effectiveArea = Math.max(area, minArea);

  // 티어에서 해당 면적의 ㎡당 단가 찾기
  let pricePerSqm = table.tiers[table.tiers.length - 1][1]; // 최대 티어 기본값

  for (const [maxSqm, price] of table.tiers) {
    if (effectiveArea <= maxSqm) {
      pricePerSqm = price;
      break;
    }
  }

  return Math.round(pricePerSqm * effectiveArea);
}

// ─── 수량 기반 단가 조회 ───

function getQuantityBasePrice(quantity: number, table: QuantityPriceTable): number {
  // 정확한 수량 매칭
  for (const [qty, price] of table.tiers) {
    if (quantity === qty) return price;
  }

  // 범위 내 보간 (가장 가까운 하한)
  let prevQty = table.tiers[0][0];
  let prevPrice = table.tiers[0][1];

  for (const [qty, price] of table.tiers) {
    if (quantity < qty) {
      // 이전 티어의 단가로 계산
      const unitPrice = prevPrice / prevQty;
      return Math.round(unitPrice * quantity);
    }
    prevQty = qty;
    prevPrice = price;
  }

  // 최대 티어 초과: 마지막 단가 적용
  const lastTier = table.tiers[table.tiers.length - 1];
  const unitPrice = lastTier[1] / lastTier[0];
  return Math.round(unitPrice * quantity);
}

// ─── 메인 계산 함수 ───

export function calculateQuote(
  product: ProductConfig,
  selection: QuoteSelection
): QuoteResult {
  const { pricingMode, optionGroups, designOptions } = product;
  const { width = 0, height = 0, quantity = 1, selectedOptions, selectedDesign } = selection;

  let baseCost = 0;
  const optionCosts: { label: string; amount: number }[] = [];
  let area: number | undefined;

  // ─── 1. 기본 가격 계산 ───

  switch (pricingMode) {
    case 'area': {
      area = calculateArea(width, height);
      if (product.areaPriceTable) {
        baseCost = getAreaBasePrice(area, product.areaPriceTable);
      }
      break;
    }
    case 'fixed': {
      baseCost = product.basePrice ?? 0;
      break;
    }
    case 'quantity': {
      if (product.quantityPriceTable) {
        baseCost = getQuantityBasePrice(quantity, product.quantityPriceTable);
      }
      break;
    }
  }

  // ─── 2. 옵션별 추가 금액 ───

  for (const group of optionGroups) {
    const selectedValue = selectedOptions[group.id];
    if (selectedValue === undefined) continue;

    const option = group.options.find(
      (o) => String(o.value) === String(selectedValue)
    );
    if (!option || option.price === 0) continue;

    let optionAmount = 0;
    const priceType = option.priceType ?? (pricingMode === 'area' ? 'perSqm' : 'fixed');

    switch (priceType) {
      case 'perSqm':
        optionAmount = Math.round(option.price * (area ?? 1));
        break;
      case 'fixed':
        optionAmount = option.price;
        break;
      case 'perUnit':
        optionAmount = option.price * quantity;
        break;
    }

    if (optionAmount !== 0) {
      optionCosts.push({ label: `${group.label}: ${option.label}`, amount: optionAmount });
    }
  }

  // ─── 3. 디자인 비용 ───

  const designDef = designOptions.find((d) => d.value === selectedDesign);
  const designCost = designDef?.price ?? 0;

  // ─── 4. 합계 ───

  const optionTotal = optionCosts.reduce((sum, c) => sum + c.amount, 0);

  // 면적/고정 모드에서는 수량 곱하기
  let subtotal: number;
  if (pricingMode === 'quantity') {
    subtotal = baseCost + optionTotal + designCost;
  } else {
    subtotal = (baseCost + optionTotal) * quantity + designCost;
  }

  const vat = Math.round(subtotal * 0.1);
  const total = subtotal + vat;

  return {
    baseCost,
    optionCosts,
    designCost,
    subtotal,
    vat,
    total,
    area,
    quantity,
  };
}

// ─── 유틸리티 ───

/** 숫자를 한국 원화 포맷으로 */
export function formatKRW(amount: number): string {
  return new Intl.NumberFormat('ko-KR').format(amount) + '원';
}

/** ㎡ 포맷 */
export function formatArea(sqm: number): string {
  return sqm.toFixed(2) + '㎡';
}
