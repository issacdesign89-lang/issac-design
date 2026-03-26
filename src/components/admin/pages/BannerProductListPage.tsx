import { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabaseBrowser as supabase } from '../../../lib/supabase-browser';
import { SearchInput, Pagination, ConfirmModal, EmptyState, Toggle } from '../ui';
import toast from 'react-hot-toast';
import { Plus, Trash2, Edit } from 'lucide-react';

const PAGE_SIZE = 20;

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

interface BannerProduct {
  id: string;
  slug: string;
  name: string;
  category_id: string;
  price: string;
  thumbnail: string;
  is_visible: boolean;
  created_at: string;
  options: any;
}

export default function BannerProductListPage() {
  const navigate = useNavigate();
  const [products, setProducts] = useState<BannerProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [deleteTarget, setDeleteTarget] = useState<BannerProduct | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    let query = supabase
      .from('products')
      .select('id, slug, name, category_id, price, thumbnail, is_visible, created_at, options', { count: 'exact' })
      .in('category_id', BANNER_CATEGORIES.map(c => c.id));

    if (search) query = query.ilike('name', `%${search}%`);
    if (categoryFilter) query = query.eq('category_id', categoryFilter);

    query = query.order('created_at', { ascending: false });
    const from = (page - 1) * PAGE_SIZE;
    query = query.range(from, from + PAGE_SIZE - 1);

    const { data, count, error } = await query;
    if (error) toast.error('목록을 불러올 수 없습니다');
    else {
      setProducts((data as BannerProduct[]) ?? []);
      setTotal(count ?? 0);
    }
    setLoading(false);
  }, [search, categoryFilter, page]);

  // 배너 카테고리 DB 동기화 (없으면 생성 — FK 위반 방지) → 완료 후 상품 조회
  useEffect(() => {
    let cancelled = false;
    const init = async () => {
      try {
        const rows = BANNER_CATEGORIES.map((c, i) => ({
          id: c.id, name: c.name, order_index: 100 + i, is_visible: true,
        }));
        await supabase.from('product_categories').upsert(rows as any[], { onConflict: 'id' });
      } catch { /* 카테고리 동기화 실패해도 상품 조회는 진행 */ }
      if (!cancelled) fetchProducts();
    };
    init();
    return () => { cancelled = true; };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => { if (search || categoryFilter || page > 1) fetchProducts(); }, [fetchProducts]);
  useEffect(() => { setPage(1); }, [search, categoryFilter]);

  const handleDelete = async () => {
    if (!deleteTarget) return;
    const { error } = await supabase.from('products').delete().eq('id', deleteTarget.id);
    if (error) toast.error('삭제 실패');
    else { toast.success('삭제 완료'); fetchProducts(); }
    setDeleteTarget(null);
  };

  const handleToggle = async (id: string, visible: boolean) => {
    await supabase.from('products').update({ is_visible: visible }).eq('id', id);
    setProducts(prev => prev.map(p => p.id === id ? { ...p, is_visible: visible } : p));
  };

  const getCatName = (id: string) => BANNER_CATEGORIES.find(c => c.id === id)?.name || id;

  return (
    <div>
      <div className="admin-page-header">
        <h1 className="admin-page-title">배너 상품 관리</h1>
        <button className="admin-btn admin-btn-primary" onClick={() => navigate('/banner-products/new')}>
          <Plus size={16} /> 상품 등록
        </button>
      </div>

      <div className="admin-toolbar">
        <SearchInput value={search} onChange={setSearch} placeholder="상품명 검색..." />
        <select
          className="admin-select"
          value={categoryFilter}
          onChange={e => setCategoryFilter(e.target.value)}
        >
          <option value="">전체 카테고리</option>
          {BANNER_CATEGORIES.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>
      </div>

      {loading ? (
        <div className="admin-spinner" />
      ) : products.length === 0 ? (
        <EmptyState title="등록된 배너 상품이 없습니다" />
      ) : (
        <div className="admin-card" style={{ overflow: 'auto' }}>
          <table className="admin-table">
            <thead>
              <tr>
                <th style={{ width: 60 }}>이미지</th>
                <th>상품명</th>
                <th style={{ width: 120 }}>카테고리</th>
                <th style={{ width: 100 }}>소분류</th>
                <th style={{ width: 100 }}>가격</th>
                <th style={{ width: 80 }}>노출</th>
                <th style={{ width: 120 }}>관리</th>
              </tr>
            </thead>
            <tbody>
              {products.map(p => (
                <tr key={p.id}>
                  <td>
                    {p.thumbnail ? (
                      <img src={p.thumbnail} alt="" style={{ width: 48, height: 48, objectFit: 'cover', borderRadius: 4 }} />
                    ) : (
                      <div style={{ width: 48, height: 48, background: '#f0f0f0', borderRadius: 4 }} />
                    )}
                  </td>
                  <td>
                    <strong style={{ cursor: 'pointer', color: '#1A4D2E' }} onClick={() => navigate(`/banner-products/${p.id}`)}>
                      {p.name}
                    </strong>
                  </td>
                  <td><span className="admin-badge">{getCatName(p.category_id)}</span></td>
                  <td style={{ fontSize: 13, color: '#666' }}>{(p.options as any)?.subcategory || '-'}</td>
                  <td>{p.price || '미정'}</td>
                  <td>
                    <Toggle checked={p.is_visible} onChange={v => handleToggle(p.id, v)} />
                  </td>
                  <td>
                    <div style={{ display: 'flex', gap: 4 }}>
                      <button className="admin-btn-icon" title="수정" onClick={() => navigate(`/banner-products/${p.id}`)}>
                        <Edit size={15} />
                      </button>
                      <button className="admin-btn-icon admin-btn-danger" title="삭제" onClick={() => setDeleteTarget(p)}>
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <Pagination currentPage={page} totalPages={Math.ceil(total / PAGE_SIZE)} onPageChange={setPage} />

      <ConfirmModal
        isOpen={!!deleteTarget}
        title="상품 삭제"
        message={`"${deleteTarget?.name}" 상품을 삭제하시겠습니까?`}
        onConfirm={handleDelete}
        onCancel={() => setDeleteTarget(null)}
      />
    </div>
  );
}
