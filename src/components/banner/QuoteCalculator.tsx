/**
 * QuoteCalculator — 실사박사 스타일 실시간 견적 계산기
 * Design: Industrial-luxury — dark sidebar + crisp calculation area
 */
import { useState, useEffect, useMemo, useCallback } from 'react';
import type { ProductConfig, QuoteSelection, QuoteResult, OptionGroup } from '../../data/pricing/types';
import { calculateQuote, formatKRW, formatArea } from '../../data/pricing/calculator';

interface Props {
  product: ProductConfig;
}

export default function QuoteCalculator({ product }: Props) {
  const [selection, setSelection] = useState<QuoteSelection>(() => {
    const defaults: Record<string, string | number> = {};
    for (const group of product.optionGroups) {
      const def = group.options.find((o) => o.default);
      if (def) defaults[group.id] = def.value;
      else if (group.options.length > 0) defaults[group.id] = group.options[0].value;
    }
    return {
      productId: product.id,
      width: product.sizeInput.minWidth ?? 100,
      height: product.sizeInput.minHeight ?? 100,
      quantity: product.quantityInput.min ?? 1,
      selectedOptions: defaults,
      selectedDesign: product.designOptions[0]?.value ?? 'self-proof',
    };
  });

  const [animatedTotal, setAnimatedTotal] = useState(0);

  const quote = useMemo<QuoteResult>(
    () => calculateQuote(product, selection),
    [product, selection]
  );

  // Animate total price
  useEffect(() => {
    const target = quote.total;
    const start = animatedTotal;
    const diff = target - start;
    if (diff === 0) return;
    const duration = 400;
    const startTime = performance.now();
    let raf: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setAnimatedTotal(Math.round(start + diff * ease));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [quote.total]);

  const updateOption = useCallback((groupId: string, value: string | number) => {
    setSelection((prev) => ({
      ...prev,
      selectedOptions: { ...prev.selectedOptions, [groupId]: value },
    }));
  }, []);

  const updateSize = useCallback((field: 'width' | 'height', val: number) => {
    setSelection((prev) => ({ ...prev, [field]: val }));
  }, []);

  const updateQuantity = useCallback((val: number) => {
    setSelection((prev) => ({ ...prev, quantity: Math.max(1, val) }));
  }, []);

  const updateDesign = useCallback((val: string) => {
    setSelection((prev) => ({ ...prev, selectedDesign: val }));
  }, []);

  return (
    <div className="qc-root">
      <div className="qc-main">
        {/* ── Left: Options ── */}
        <div className="qc-options">
          <div className="qc-product-header">
            <span className="qc-badge">{product.categoryName}</span>
            <h2 className="qc-product-name">{product.name}</h2>
            {product.description && <p className="qc-desc">{product.description}</p>}
          </div>

          {/* Size Input */}
          {product.sizeInput.enabled && (
            <fieldset className="qc-fieldset">
              <legend>사이즈 입력</legend>
              <div className="qc-size-row">
                <label className="qc-size-field">
                  <span>{product.sizeInput.widthLabel ?? '가로'}</span>
                  <div className="qc-input-wrap">
                    <input
                      type="number"
                      value={selection.width || ''}
                      onChange={(e) => updateSize('width', Number(e.target.value))}
                      min={product.sizeInput.minWidth}
                      max={product.sizeInput.maxWidth}
                      placeholder="가로"
                    />
                    <span className="qc-unit">{product.sizeInput.unit ?? 'cm'}</span>
                  </div>
                </label>
                <span className="qc-size-x">×</span>
                <label className="qc-size-field">
                  <span>{product.sizeInput.heightLabel ?? '세로'}</span>
                  <div className="qc-input-wrap">
                    <input
                      type="number"
                      value={selection.height || ''}
                      onChange={(e) => updateSize('height', Number(e.target.value))}
                      min={product.sizeInput.minHeight}
                      max={product.sizeInput.maxHeight}
                      placeholder="세로"
                    />
                    <span className="qc-unit">{product.sizeInput.unit ?? 'cm'}</span>
                  </div>
                </label>
              </div>
              {quote.area !== undefined && quote.area > 0 && (
                <div className="qc-area-info">
                  계산 면적: <strong>{formatArea(quote.area)}</strong>
                  {product.sizeInput.maxRollWidth && (
                    <span className="qc-roll-note">
                      (원단폭 {product.sizeInput.maxRollWidth}cm 초과 시 분할출력)
                    </span>
                  )}
                </div>
              )}
            </fieldset>
          )}

          {/* Option Groups */}
          {product.optionGroups.map((group) => (
            <OptionGroupSelector
              key={group.id}
              group={group}
              selected={selection.selectedOptions[group.id]}
              onSelect={(val) => updateOption(group.id, val)}
            />
          ))}

          {/* Design Options */}
          <fieldset className="qc-fieldset">
            <legend>디자인 선택</legend>
            <div className="qc-design-grid">
              {product.designOptions.map((d) => (
                <button
                  key={d.value}
                  className={`qc-design-btn ${selection.selectedDesign === d.value ? 'active' : ''}`}
                  onClick={() => updateDesign(d.value)}
                >
                  <span className="qc-design-label">{d.label}</span>
                  {d.price > 0 && (
                    <span className="qc-design-price">+{formatKRW(d.price)}</span>
                  )}
                  {d.price === 0 && <span className="qc-design-free">무료</span>}
                  {d.description && <span className="qc-design-desc">{d.description}</span>}
                </button>
              ))}
            </div>
            <p className="qc-design-note">디자인 수정 3회 초과 시 1회당 5,500원 추가</p>
          </fieldset>

          {/* Quantity */}
          {product.quantityInput.enabled && (
            <fieldset className="qc-fieldset">
              <legend>{product.quantityInput.label ?? '수량'}</legend>
              {product.quantityInput.presets ? (
                <div className="qc-qty-presets">
                  {product.quantityInput.presets.map((q) => (
                    <button
                      key={q}
                      className={`qc-qty-btn ${selection.quantity === q ? 'active' : ''}`}
                      onClick={() => updateQuantity(q)}
                    >
                      {q}{product.quantityInput.label === '인쇄량' ? '장' : '개'}
                    </button>
                  ))}
                </div>
              ) : (
                <div className="qc-input-wrap qc-qty-input">
                  <button className="qc-qty-minus" onClick={() => updateQuantity(selection.quantity - 1)}>−</button>
                  <input
                    type="number"
                    value={selection.quantity}
                    onChange={(e) => updateQuantity(Number(e.target.value))}
                    min={product.quantityInput.min ?? 1}
                    max={product.quantityInput.max}
                  />
                  <button className="qc-qty-plus" onClick={() => updateQuantity(selection.quantity + 1)}>+</button>
                </div>
              )}
            </fieldset>
          )}
        </div>

        {/* ── Right: Price Summary (Sticky) ── */}
        <aside className="qc-summary">
          <div className="qc-summary-inner">
            <div className="qc-summary-header">
              <h3>견적서</h3>
              <span className="qc-summary-badge">실시간</span>
            </div>

            <div className="qc-summary-product">
              <strong>{product.name}</strong>
              {quote.area !== undefined && quote.area > 0 && (
                <span className="qc-summary-area">{formatArea(quote.area)}</span>
              )}
            </div>

            <div className="qc-cost-lines">
              <div className="qc-cost-line">
                <span>기본 출력 비용</span>
                <span>{formatKRW(quote.baseCost)}</span>
              </div>

              {quote.optionCosts.map((c, i) => (
                <div key={i} className="qc-cost-line qc-cost-option">
                  <span>{c.label}</span>
                  <span className={c.amount < 0 ? 'qc-discount' : ''}>
                    {c.amount >= 0 ? '+' : ''}{formatKRW(c.amount)}
                  </span>
                </div>
              ))}

              {quote.designCost > 0 && (
                <div className="qc-cost-line qc-cost-option">
                  <span>디자인</span>
                  <span>+{formatKRW(quote.designCost)}</span>
                </div>
              )}

              {quote.quantity > 1 && product.pricingMode !== 'quantity' && (
                <div className="qc-cost-line qc-cost-qty">
                  <span>수량</span>
                  <span>× {quote.quantity}개</span>
                </div>
              )}
            </div>

            <div className="qc-divider" />

            <div className="qc-cost-line qc-subtotal">
              <span>공급가액</span>
              <span>{formatKRW(quote.subtotal)}</span>
            </div>
            <div className="qc-cost-line qc-vat">
              <span>부가세 (10%)</span>
              <span>{formatKRW(quote.vat)}</span>
            </div>

            <div className="qc-total-block">
              <div className="qc-total-label">총 견적금액</div>
              <div className="qc-total-amount">{formatKRW(animatedTotal)}</div>
            </div>

            <div className="qc-actions">
              <button className="qc-btn-cart">장바구니 담기</button>
              <button className="qc-btn-order">바로 주문하기</button>
            </div>

            {product.notes && product.notes.length > 0 && (
              <div className="qc-notes">
                {product.notes.map((n, i) => (
                  <p key={i}>※ {n}</p>
                ))}
              </div>
            )}
          </div>
        </aside>
      </div>

      <style>{styles}</style>
    </div>
  );
}

// ─── Option Group Sub-component ───

function OptionGroupSelector({
  group,
  selected,
  onSelect,
}: {
  group: OptionGroup;
  selected: string | number | undefined;
  onSelect: (value: string | number) => void;
}) {
  if (group.type === 'button') {
    return (
      <fieldset className="qc-fieldset">
        <legend>{group.label}</legend>
        <div className="qc-btn-group">
          {group.options.map((opt) => (
            <button
              key={String(opt.value)}
              className={`qc-opt-btn ${String(selected) === String(opt.value) ? 'active' : ''}`}
              onClick={() => onSelect(opt.value)}
            >
              <span>{opt.label}</span>
              {opt.price !== 0 && (
                <span className="qc-opt-price">
                  {opt.price > 0 ? '+' : ''}{formatKRW(opt.price)}
                  {opt.priceType === 'perSqm' ? '/㎡' : ''}
                </span>
              )}
            </button>
          ))}
        </div>
      </fieldset>
    );
  }

  return (
    <fieldset className="qc-fieldset">
      <legend>{group.label} {group.required && <span className="qc-req">필수</span>}</legend>
      <div className="qc-select-wrap">
        <select
          value={String(selected ?? '')}
          onChange={(e) => onSelect(e.target.value)}
        >
          {group.options.map((opt) => (
            <option key={String(opt.value)} value={String(opt.value)}>
              {opt.label}
              {opt.price !== 0
                ? ` (${opt.price > 0 ? '+' : ''}${opt.price.toLocaleString()}원${opt.priceType === 'perSqm' ? '/㎡' : ''})`
                : ''}
            </option>
          ))}
        </select>
        <svg className="qc-select-arrow" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z" />
        </svg>
      </div>
    </fieldset>
  );
}

// ─── Styles ───

const styles = `
/* ── Root ── */
.qc-root {
  --qc-bg: #fafaf9;
  --qc-surface: #ffffff;
  --qc-border: #e7e5e4;
  --qc-text: #1c1917;
  --qc-text-sub: #57534e;
  --qc-text-muted: #a8a29e;
  --qc-accent: #1A4D2E;
  --qc-accent-light: #edf5f0;
  --qc-accent-hover: #154025;
  --qc-gold: #b8860b;
  --qc-gold-light: #fdf8ef;
  --qc-danger: #dc2626;
  --qc-radius: 8px;
  --qc-shadow: 0 1px 3px rgba(0,0,0,.06), 0 1px 2px rgba(0,0,0,.04);
  --qc-shadow-lg: 0 10px 25px rgba(0,0,0,.08);
  font-family: 'Pretendard', -apple-system, BlinkMacSystemFont, system-ui, sans-serif;
}

.qc-main {
  display: grid;
  grid-template-columns: 1fr 380px;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  padding: 32px 20px;
  align-items: start;
}

/* ── Options Panel ── */
.qc-options {
  display: flex;
  flex-direction: column;
  gap: 0;
}

.qc-product-header {
  margin-bottom: 28px;
}

.qc-badge {
  display: inline-block;
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  letter-spacing: .03em;
  color: var(--qc-accent);
  background: var(--qc-accent-light);
  border-radius: 4px;
  margin-bottom: 8px;
}

.qc-product-name {
  font-size: 26px;
  font-weight: 800;
  color: var(--qc-text);
  margin: 0 0 6px;
  letter-spacing: -.02em;
  line-height: 1.2;
}

.qc-desc {
  font-size: 14px;
  color: var(--qc-text-sub);
  margin: 0;
  line-height: 1.6;
}

/* ── Fieldset ── */
.qc-fieldset {
  border: none;
  padding: 0;
  margin: 0 0 24px;
}

.qc-fieldset legend {
  font-size: 13px;
  font-weight: 700;
  color: var(--qc-text);
  text-transform: uppercase;
  letter-spacing: .06em;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  gap: 6px;
}

.qc-req {
  font-size: 10px;
  color: var(--qc-danger);
  font-weight: 600;
}

/* ── Size Input ── */
.qc-size-row {
  display: flex;
  align-items: end;
  gap: 12px;
}

.qc-size-field {
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.qc-size-field > span {
  font-size: 12px;
  color: var(--qc-text-sub);
  font-weight: 500;
}

.qc-size-x {
  font-size: 18px;
  color: var(--qc-text-muted);
  padding-bottom: 8px;
  font-weight: 300;
}

.qc-input-wrap {
  display: flex;
  align-items: center;
  background: var(--qc-surface);
  border: 1.5px solid var(--qc-border);
  border-radius: var(--qc-radius);
  overflow: hidden;
  transition: border-color .2s;
}

.qc-input-wrap:focus-within {
  border-color: var(--qc-accent);
  box-shadow: 0 0 0 3px rgba(26,77,46,.1);
}

.qc-input-wrap input {
  flex: 1;
  border: none;
  padding: 10px 12px;
  font-size: 15px;
  font-weight: 600;
  color: var(--qc-text);
  background: transparent;
  outline: none;
  min-width: 0;
  font-family: inherit;
}

.qc-input-wrap input::-webkit-inner-spin-button { opacity: 0; }

.qc-unit {
  padding: 0 12px;
  font-size: 13px;
  color: var(--qc-text-muted);
  font-weight: 500;
  background: var(--qc-bg);
  border-left: 1px solid var(--qc-border);
  height: 100%;
  display: flex;
  align-items: center;
  padding-block: 10px;
}

.qc-area-info {
  margin-top: 8px;
  font-size: 13px;
  color: var(--qc-accent);
  font-weight: 500;
}

.qc-roll-note {
  color: var(--qc-text-muted);
  font-weight: 400;
  margin-left: 8px;
}

/* ── Select ── */
.qc-select-wrap {
  position: relative;
}

.qc-select-wrap select {
  width: 100%;
  appearance: none;
  padding: 10px 40px 10px 14px;
  font-size: 14px;
  font-weight: 500;
  color: var(--qc-text);
  background: var(--qc-surface);
  border: 1.5px solid var(--qc-border);
  border-radius: var(--qc-radius);
  cursor: pointer;
  font-family: inherit;
  transition: border-color .2s;
}

.qc-select-wrap select:focus {
  outline: none;
  border-color: var(--qc-accent);
  box-shadow: 0 0 0 3px rgba(26,77,46,.1);
}

.qc-select-arrow {
  position: absolute;
  right: 12px;
  top: 50%;
  transform: translateY(-50%);
  width: 16px;
  height: 16px;
  color: var(--qc-text-muted);
  pointer-events: none;
}

/* ── Button Group ── */
.qc-btn-group {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.qc-opt-btn {
  padding: 8px 16px;
  font-size: 13px;
  font-weight: 500;
  color: var(--qc-text-sub);
  background: var(--qc-surface);
  border: 1.5px solid var(--qc-border);
  border-radius: var(--qc-radius);
  cursor: pointer;
  transition: all .2s;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  font-family: inherit;
}

.qc-opt-btn:hover {
  border-color: var(--qc-accent);
  color: var(--qc-accent);
}

.qc-opt-btn.active {
  background: var(--qc-accent);
  border-color: var(--qc-accent);
  color: #fff;
}

.qc-opt-price {
  font-size: 11px;
  opacity: .7;
}

/* ── Design Grid ── */
.qc-design-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
}

.qc-design-btn {
  padding: 12px 8px;
  background: var(--qc-surface);
  border: 1.5px solid var(--qc-border);
  border-radius: var(--qc-radius);
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  transition: all .2s;
  font-family: inherit;
}

.qc-design-btn:hover {
  border-color: var(--qc-accent);
}

.qc-design-btn.active {
  border-color: var(--qc-accent);
  background: var(--qc-accent-light);
}

.qc-design-label {
  font-size: 13px;
  font-weight: 600;
  color: var(--qc-text);
}

.qc-design-price {
  font-size: 11px;
  color: var(--qc-gold);
  font-weight: 600;
}

.qc-design-free {
  font-size: 11px;
  color: var(--qc-accent);
  font-weight: 500;
}

.qc-design-desc {
  font-size: 10px;
  color: var(--qc-text-muted);
}

.qc-design-note {
  font-size: 11px;
  color: var(--qc-text-muted);
  margin: 8px 0 0;
}

/* ── Quantity ── */
.qc-qty-presets {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
}

.qc-qty-btn {
  padding: 7px 14px;
  font-size: 13px;
  font-weight: 500;
  background: var(--qc-surface);
  border: 1.5px solid var(--qc-border);
  border-radius: var(--qc-radius);
  cursor: pointer;
  transition: all .2s;
  font-family: inherit;
  color: var(--qc-text-sub);
}

.qc-qty-btn:hover { border-color: var(--qc-accent); }
.qc-qty-btn.active { background: var(--qc-accent); border-color: var(--qc-accent); color: #fff; }

.qc-qty-input {
  max-width: 180px;
}

.qc-qty-minus, .qc-qty-plus {
  width: 38px;
  height: 38px;
  border: none;
  background: var(--qc-bg);
  color: var(--qc-text);
  font-size: 18px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background .15s;
  font-family: inherit;
}

.qc-qty-minus:hover, .qc-qty-plus:hover { background: var(--qc-border); }

/* ── Summary Panel ── */
.qc-summary {
  position: sticky;
  top: 100px;
}

.qc-summary-inner {
  background: var(--qc-surface);
  border: 1.5px solid var(--qc-border);
  border-radius: 12px;
  padding: 24px;
  box-shadow: var(--qc-shadow-lg);
}

.qc-summary-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 16px;
}

.qc-summary-header h3 {
  font-size: 16px;
  font-weight: 800;
  color: var(--qc-text);
  margin: 0;
  letter-spacing: -.01em;
}

.qc-summary-badge {
  font-size: 10px;
  font-weight: 600;
  color: #16a34a;
  background: #dcfce7;
  padding: 2px 8px;
  border-radius: 10px;
  letter-spacing: .04em;
}

.qc-summary-product {
  padding: 12px 0;
  border-bottom: 1px solid var(--qc-border);
  margin-bottom: 16px;
}

.qc-summary-product strong {
  font-size: 14px;
  color: var(--qc-text);
  display: block;
}

.qc-summary-area {
  font-size: 12px;
  color: var(--qc-accent);
  font-weight: 500;
}

/* ── Cost Lines ── */
.qc-cost-lines {
  display: flex;
  flex-direction: column;
  gap: 8px;
  margin-bottom: 16px;
}

.qc-cost-line {
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
}

.qc-cost-line span:first-child {
  color: var(--qc-text-sub);
}

.qc-cost-line span:last-child {
  font-weight: 600;
  color: var(--qc-text);
  font-variant-numeric: tabular-nums;
}

.qc-cost-option span:first-child {
  font-size: 12px;
  color: var(--qc-text-muted);
}

.qc-cost-option span:last-child {
  font-size: 12px;
  color: var(--qc-gold);
}

.qc-discount { color: var(--qc-accent) !important; }

.qc-divider {
  height: 1px;
  background: var(--qc-border);
  margin: 12px 0;
}

.qc-subtotal span:last-child,
.qc-vat span:last-child {
  font-size: 13px;
}

/* ── Total ── */
.qc-total-block {
  background: linear-gradient(135deg, #1A4D2E 0%, #2d6a3f 100%);
  border-radius: 10px;
  padding: 20px;
  margin: 16px 0;
  text-align: center;
}

.qc-total-label {
  font-size: 12px;
  color: rgba(255,255,255,.7);
  font-weight: 500;
  margin-bottom: 4px;
  letter-spacing: .04em;
}

.qc-total-amount {
  font-size: 28px;
  font-weight: 800;
  color: #fff;
  letter-spacing: -.02em;
  font-variant-numeric: tabular-nums;
}

/* ── Actions ── */
.qc-actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.qc-btn-cart, .qc-btn-order {
  width: 100%;
  padding: 13px;
  font-size: 14px;
  font-weight: 700;
  border-radius: var(--qc-radius);
  cursor: pointer;
  transition: all .2s;
  border: none;
  font-family: inherit;
  letter-spacing: -.01em;
}

.qc-btn-cart {
  background: var(--qc-surface);
  color: var(--qc-accent);
  border: 1.5px solid var(--qc-accent);
}

.qc-btn-cart:hover {
  background: var(--qc-accent-light);
}

.qc-btn-order {
  background: var(--qc-accent);
  color: #fff;
}

.qc-btn-order:hover {
  background: var(--qc-accent-hover);
}

/* ── Notes ── */
.qc-notes {
  margin-top: 16px;
  padding-top: 12px;
  border-top: 1px solid var(--qc-border);
}

.qc-notes p {
  font-size: 11px;
  color: var(--qc-text-muted);
  margin: 0 0 4px;
  line-height: 1.5;
}

/* ── Responsive ── */
@media (max-width: 900px) {
  .qc-main {
    grid-template-columns: 1fr;
  }
  .qc-summary {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 100;
    padding: 0;
  }
  .qc-summary-inner {
    border-radius: 16px 16px 0 0;
    box-shadow: 0 -4px 20px rgba(0,0,0,.12);
    max-height: 60vh;
    overflow-y: auto;
  }
  .qc-design-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 480px) {
  .qc-size-row {
    flex-direction: column;
    gap: 8px;
  }
  .qc-size-x { display: none; }
  .qc-design-grid {
    grid-template-columns: 1fr 1fr;
  }
}
`;
