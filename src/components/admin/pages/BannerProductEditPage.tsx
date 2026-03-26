import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabaseBrowser as supabase } from '../../../lib/supabase-browser';
import { FormField, TabNav, ImageUploader, ImageListEditor, KeyValueEditor } from '../ui';
import toast from 'react-hot-toast';
import { ArrowLeft, Save, Trash2, Plus, X } from 'lucide-react';

const BANNER_CATEGORIES = [
  { id: 'banner-stand', name: '배너거치대' },
  { id: 'banner-print', name: '배너출력물' },
  { id: 'banner-cloth', name: '현수막' },
  { id: 'banner-cloth-bulk', name: '대량현수막' },
  { id: 'wind-banner', name: '윈드배너' },
  { id: 'sign-board', name: '입간판' },
  { id: 'sign-board-print', name: '입간판출력물' },
  { id: 'print-output', name: '실사출력' },
  { id: 'scroll-blind', name: '족자봉·롤블라인드' },
  { id: 'custom-payment', name: '고객맞춤결제' },
];

const SUBCATEGORY_MAP: Record<string, string[]> = {
  'banner-stand': ['실외거치대', '실내거치대', '철제거치대', '자이언트폴', '미니배너', '특수배너', '부속품'],
  'banner-print': ['배너출력물', '자이언트폴 출력물', '미니배너 출력물', '특수배너 출력물'],
  'banner-cloth': ['일반현수막', '장폭현수막', '솔벤현수막', '라텍스현수막', '테이블현수막', '열전사메쉬', '텐트천', '부직포', '부속품'],
  'banner-cloth-bulk': ['게릴라현수막', '족자현수막', '게시대현수막', '어깨띠'],
  'wind-banner': ['윈드배너F형', '윈드배너S형', '윈드배너H형', '부속품', 'F형 출력물', 'S형 출력물', 'H형 출력물'],
  'sign-board': ['A형입간판', '물통입간판', '사인스탠드', '부속품'],
  'sign-board-print': ['A형입간판 출력물', '물통입간판 출력물', '사인스탠드 출력물'],
  'print-output': ['접착용', '비접착용', '시트커팅', '차량용자석', 'POP·보드', '등신대'],
  'scroll-blind': ['족자봉', '롤블라인드', '부속품'],
  'custom-payment': ['고객맞춤결제', '디자인비결제', '배송비결제'],
};

const TABS = [
  { key: 'basic', label: '기본 정보' },
  { key: 'options', label: '옵션·가격' },
  { key: 'images', label: '상세 이미지' },
  { key: 'specs', label: '사양·배송' },
];

interface OptionItem {
  label: string;
  price: number;
}

interface OptionGroup {
  group: string;
  items: OptionItem[];
}

interface DeliveryOption {
  label: string;
  info: string;
}

interface BannerForm {
  name: string;
  slug: string;
  category_id: string;
  subcategory: string;
  price: string;
  base_price: number;
  description: string;
  thumbnail: string;
  images: string[];           // 상세 설명 이미지
  option_groups: OptionGroup[];
  delivery_options: DeliveryOption[];
  deadline_courier: string;
  deadline_pickup: string;
  specs: Record<string, string>;
  is_visible: boolean;
}

function toSlug(name: string): string {
  return name.toLowerCase().replace(/[^a-z0-9가-힣\s-]/g, '').replace(/\s+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '');
}

function createEmptyForm(): BannerForm {
  return {
    name: '', slug: '', category_id: '', subcategory: '',
    price: '', base_price: 0, description: '', thumbnail: '',
    images: [],
    option_groups: [
      { group: '거치대', items: [{ label: '', price: 0 }] },
      { group: '출력물', items: [{ label: '선택안함', price: 0 }] },
      { group: '별매품', items: [{ label: '선택안함', price: 0 }] },
    ],
    delivery_options: [{ label: '선불택배', info: '택배비 4,000원~' }],
    deadline_courier: '오전 11시',
    deadline_pickup: '오후 4시',
    specs: {},
    is_visible: true,
  };
}

export default function BannerProductEditPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const isNew = id === 'new';

  const [form, setForm] = useState<BannerForm>(createEmptyForm());
  const [tab, setTab] = useState('basic');
  const [loading, setLoading] = useState(!isNew);
  const [saving, setSaving] = useState(false);
  const [slugManual, setSlugManual] = useState(false);

  // Load existing product
  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data, error } = await supabase.from('products').select('*').eq('id', id!).single();
      if (error || !data) { toast.error('상품을 찾을 수 없습니다'); navigate('/banner-products'); return; }

      const opts = (data.options as any) || {};
      setForm({
        name: data.name || '',
        slug: data.slug || '',
        category_id: data.category_id || '',
        subcategory: opts.subcategory || '',
        price: data.price || '',
        base_price: opts.base_price || 0,
        description: data.description || '',
        thumbnail: data.thumbnail || '',
        images: Array.isArray(data.images) ? (data.images as string[]) : [],
        option_groups: Array.isArray(opts.option_groups) ? opts.option_groups : createEmptyForm().option_groups,
        delivery_options: Array.isArray(opts.delivery_options) ? opts.delivery_options : createEmptyForm().delivery_options,
        deadline_courier: opts.deadline_courier || '오전 11시',
        deadline_pickup: opts.deadline_pickup || '오후 4시',
        specs: typeof data.specs === 'object' && data.specs !== null ? (data.specs as Record<string, string>) : {},
        is_visible: data.is_visible ?? true,
      });
      setSlugManual(true);
      setLoading(false);
    })();
  }, [id, isNew, navigate]);

  const updateField = <K extends keyof BannerForm>(key: K, value: BannerForm[K]) => {
    setForm(prev => {
      const next = { ...prev, [key]: value };
      if (key === 'name' && !slugManual) next.slug = toSlug(value as string);
      return next;
    });
  };

  // Option group helpers
  const addOptionItem = (gi: number) => {
    const groups = [...form.option_groups];
    groups[gi] = { ...groups[gi], items: [...groups[gi].items, { label: '', price: 0 }] };
    updateField('option_groups', groups);
  };
  const removeOptionItem = (gi: number, ii: number) => {
    const groups = [...form.option_groups];
    groups[gi] = { ...groups[gi], items: groups[gi].items.filter((_, i) => i !== ii) };
    updateField('option_groups', groups);
  };
  const updateOptionItem = (gi: number, ii: number, field: 'label' | 'price', val: string | number) => {
    const groups = [...form.option_groups];
    groups[gi] = { ...groups[gi], items: groups[gi].items.map((item, i) => i === ii ? { ...item, [field]: val } : item) };
    updateField('option_groups', groups);
  };
  const addOptionGroup = () => {
    updateField('option_groups', [...form.option_groups, { group: '새 옵션', items: [{ label: '', price: 0 }] }]);
  };
  const removeOptionGroup = (gi: number) => {
    updateField('option_groups', form.option_groups.filter((_, i) => i !== gi));
  };
  const updateGroupName = (gi: number, name: string) => {
    const groups = [...form.option_groups];
    groups[gi] = { ...groups[gi], group: name };
    updateField('option_groups', groups);
  };

  // Delivery helpers
  const addDelivery = () => {
    updateField('delivery_options', [...form.delivery_options, { label: '', info: '' }]);
  };
  const removeDelivery = (i: number) => {
    updateField('delivery_options', form.delivery_options.filter((_, idx) => idx !== i));
  };
  const updateDelivery = (i: number, field: 'label' | 'info', val: string) => {
    updateField('delivery_options', form.delivery_options.map((d, idx) => idx === i ? { ...d, [field]: val } : d));
  };

  // Save
  const handleSave = async () => {
    if (!form.name.trim()) { toast.error('상품명을 입력하세요'); return; }
    if (!form.slug.trim()) { toast.error('슬러그를 입력하세요'); return; }
    if (!form.category_id) { toast.error('카테고리를 선택하세요'); return; }

    setSaving(true);

    // slug 중복 검사 (신규 등록 시)
    if (isNew) {
      const { data: existing } = await supabase.from('products').select('id').eq('slug', form.slug).maybeSingle();
      if (existing) {
        toast.error('이미 사용 중인 슬러그입니다: ' + form.slug);
        setSaving(false);
        return;
      }
    }

    // 카테고리 존재 보장 (FK 제약 방지)
    const catIdx = BANNER_CATEGORIES.findIndex(c => c.id === form.category_id);
    const catName = catIdx >= 0 ? BANNER_CATEGORIES[catIdx].name : form.category_id;
    const catOrder = catIdx >= 0 ? 100 + catIdx : 200;
    const { error: catError } = await supabase.from('product_categories').upsert({
      id: form.category_id,
      name: catName,
      order_index: catOrder,
      is_visible: true,
    } as any, { onConflict: 'id' });
    if (catError) {
      toast.error('카테고리 생성 실패: ' + catError.message);
      setSaving(false);
      return;
    }

    const now = new Date().toISOString();
    const payload = {
      name: form.name,
      slug: form.slug,
      category_id: form.category_id,
      price: form.price,
      description: form.description,
      thumbnail: form.thumbnail,
      images: form.images,
      specs: form.specs,
      is_visible: form.is_visible,
      updated_at: now,
      options: {
        subcategory: form.subcategory,
        base_price: form.base_price,
        option_groups: form.option_groups,
        delivery_options: form.delivery_options,
        deadline_courier: form.deadline_courier,
        deadline_pickup: form.deadline_pickup,
      },
    };

    let error;
    if (isNew) {
      ({ error } = await supabase.from('products').insert({ ...payload, id: crypto.randomUUID(), created_at: now } as any));
    } else {
      ({ error } = await supabase.from('products').update(payload as any).eq('id', id!));
    }

    if (error) {
      toast.error('저장 실패: ' + error.message);
    } else {
      toast.success(isNew ? '등록 완료' : '수정 완료');
      if (isNew) navigate('/banner-products');
    }
    setSaving(false);
  };

  if (loading) return <div className="admin-spinner" />;

  return (
    <div>
      <div className="admin-page-header">
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <button className="admin-btn-icon" onClick={() => navigate('/banner-products')}><ArrowLeft size={18} /></button>
          <h1 className="admin-page-title">{isNew ? '배너 상품 등록' : '배너 상품 수정'}</h1>
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <button className="admin-btn admin-btn-primary" onClick={handleSave} disabled={saving}>
            <Save size={16} /> {saving ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>

      <TabNav tabs={TABS} activeTab={tab} onChange={setTab} />

      <div className="admin-card" style={{ padding: 24 }}>
        {/* === 기본 정보 === */}
        {tab === 'basic' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <FormField label="상품명" required>
              <input className="admin-input" value={form.name} onChange={e => updateField('name', e.target.value)} placeholder="예: 윈드배너 F형 (소형)" />
            </FormField>

            <FormField label="슬러그 (URL)">
              <input className="admin-input" value={form.slug} onChange={e => { setSlugManual(true); updateField('slug', e.target.value); }} placeholder="wind-banner-f-s" />
            </FormField>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label="카테고리" required>
                <select className="admin-select" value={form.category_id} onChange={e => { updateField('category_id', e.target.value); updateField('subcategory', ''); }}>
                  <option value="">선택하세요</option>
                  {BANNER_CATEGORIES.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                </select>
              </FormField>
              <FormField label="소분류">
                {form.category_id && SUBCATEGORY_MAP[form.category_id] ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <select
                      className="admin-select"
                      value={SUBCATEGORY_MAP[form.category_id].includes(form.subcategory) ? form.subcategory : ''}
                      onChange={e => updateField('subcategory', e.target.value)}
                    >
                      <option value="">선택하세요</option>
                      {SUBCATEGORY_MAP[form.category_id].map(sub => (
                        <option key={sub} value={sub}>{sub}</option>
                      ))}
                    </select>
                    {!SUBCATEGORY_MAP[form.category_id].includes(form.subcategory) && (
                      <input
                        className="admin-input"
                        value={form.subcategory}
                        onChange={e => updateField('subcategory', e.target.value)}
                        placeholder="또는 직접 입력"
                      />
                    )}
                  </div>
                ) : (
                  <input className="admin-input" value={form.subcategory} onChange={e => updateField('subcategory', e.target.value)} placeholder="카테고리를 먼저 선택하세요" />
                )}
              </FormField>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
              <FormField label="표시 가격">
                <input className="admin-input" value={form.price} onChange={e => updateField('price', e.target.value)} placeholder="38,000원" />
              </FormField>
              <FormField label="기본 가격 (숫자)">
                <input className="admin-input" type="number" value={form.base_price} onChange={e => updateField('base_price', Number(e.target.value))} />
              </FormField>
            </div>

            <FormField label="상품 설명">
              <textarea className="admin-textarea" rows={4} value={form.description} onChange={e => updateField('description', e.target.value)} placeholder="상품에 대한 간단한 설명" />
            </FormField>

            <FormField label="대표 이미지">
              <ImageUploader value={form.thumbnail} onChange={v => updateField('thumbnail', v)} folder="banner" />
            </FormField>

            <FormField label="노출">
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer' }}>
                <input type="checkbox" checked={form.is_visible} onChange={e => updateField('is_visible', e.target.checked)} />
                사이트에 노출
              </label>
            </FormField>
          </div>
        )}

        {/* === 옵션·가격 === */}
        {tab === 'options' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <p style={{ fontSize: 13, color: '#999' }}>옵션 그룹별로 선택 항목과 가격을 설정합니다. 고객이 옵션을 선택하면 가격이 자동 계산됩니다.</p>

            {form.option_groups.map((group, gi) => (
              <div key={gi} style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                  <input
                    className="admin-input"
                    value={group.group}
                    onChange={e => updateGroupName(gi, e.target.value)}
                    style={{ fontWeight: 700, maxWidth: 200 }}
                  />
                  <button className="admin-btn-icon admin-btn-danger" onClick={() => removeOptionGroup(gi)} title="그룹 삭제">
                    <Trash2 size={14} />
                  </button>
                </div>

                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee' }}>항목명</th>
                      <th style={{ textAlign: 'right', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee', width: 120 }}>가격 (원)</th>
                      <th style={{ width: 40, borderBottom: '1px solid #eee' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {group.items.map((item, ii) => (
                      <tr key={ii}>
                        <td style={{ padding: '4px 8px' }}>
                          <input className="admin-input" value={item.label} onChange={e => updateOptionItem(gi, ii, 'label', e.target.value)} placeholder="항목명" />
                        </td>
                        <td style={{ padding: '4px 8px' }}>
                          <input className="admin-input" type="number" value={item.price} onChange={e => updateOptionItem(gi, ii, 'price', Number(e.target.value))} style={{ textAlign: 'right' }} />
                        </td>
                        <td style={{ padding: '4px 0' }}>
                          <button className="admin-btn-icon" onClick={() => removeOptionItem(gi, ii)} title="삭제"><X size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="admin-btn admin-btn-sm" onClick={() => addOptionItem(gi)} style={{ marginTop: 8 }}>
                  <Plus size={14} /> 항목 추가
                </button>
              </div>
            ))}

            <button className="admin-btn" onClick={addOptionGroup}>
              <Plus size={16} /> 옵션 그룹 추가
            </button>
          </div>
        )}

        {/* === 상세 이미지 === */}
        {tab === 'images' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            <p style={{ fontSize: 13, color: '#999' }}>상품 상세페이지 하단에 표시될 설명 이미지를 등록합니다. 드래그로 순서 변경 가능합니다.</p>
            <ImageListEditor images={form.images} onChange={v => updateField('images', v)} folder="banner-detail" />
          </div>
        )}

        {/* === 사양·배송 === */}
        {tab === 'specs' && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>상품 사양</h3>
              <KeyValueEditor entries={form.specs} onChange={v => updateField('specs', v)} keyLabel="항목" valueLabel="내용" />
            </div>

            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>배송 옵션</h3>
              {form.delivery_options.map((d, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input className="admin-input" value={d.label} onChange={e => updateDelivery(i, 'label', e.target.value)} placeholder="배송 방법" style={{ flex: 1 }} />
                  <input className="admin-input" value={d.info} onChange={e => updateDelivery(i, 'info', e.target.value)} placeholder="배송 안내" style={{ flex: 2 }} />
                  <button className="admin-btn-icon" onClick={() => removeDelivery(i)}><X size={14} /></button>
                </div>
              ))}
              <button className="admin-btn admin-btn-sm" onClick={addDelivery}><Plus size={14} /> 배송 옵션 추가</button>
            </div>

            <div>
              <h3 style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>당일출고 마감시간</h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                <FormField label="택배">
                  <input className="admin-input" value={form.deadline_courier} onChange={e => updateField('deadline_courier', e.target.value)} />
                </FormField>
                <FormField label="방문수령">
                  <input className="admin-input" value={form.deadline_pickup} onChange={e => updateField('deadline_pickup', e.target.value)} />
                </FormField>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
