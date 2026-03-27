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

// 소분류별 기본 템플릿 — 선택 시 자동 채움
interface ProductTemplate {
  name: string;
  price: string;
  base_price: number;
  description: string;
  specs: Record<string, string>;
  option_groups: { group: string; items: { label: string; price: number; priceType?: 'fixed' | 'perSqm' | 'perUnit' }[] }[];
  delivery_options: { label: string; info: string }[];
  pricing_mode: 'area' | 'fixed' | 'quantity';
  use_common_design: boolean;
  quantity_enabled: boolean;
  quantity_label: string;
  quantity_min: number;
  quantity_max: number;
  notes: string[];
}

const PRODUCT_TEMPLATES: Record<string, ProductTemplate> = {
  // 배너거치대
  '실외거치대': { name: '실외 배너거치대', price: '45,000원', base_price: 45000, description: '야외 행사·매장 앞 홍보에 최적화된 배너 거치대. 견고한 철제 프레임과 안정적인 베이스.', specs: { '사이즈': '600×1800mm', '재질': '스틸 프레임 + 철판 베이스', '무게': '약 5.2kg' }, option_groups: [{ group: '거치대', items: [{ label: '대형 (600×1800)', price: 45000 }, { label: '중형 (500×1500)', price: 38000 }, { label: '소형 (400×1200)', price: 32000 }] }, { group: '출력물', items: [{ label: '선택안함', price: 0 }, { label: '단면 출력', price: 8000 }, { label: '양면 출력', price: 14000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 4,000원~' }, { label: '착불택배', info: '수량별 차등' }, { label: '방문수령', info: '서울 강남 사무실' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '실내거치대': { name: '실내 배너거치대', price: '35,000원', base_price: 35000, description: '실내 전시·매장 내부 홍보용 배너 거치대. 가볍고 이동이 편리합니다.', specs: { '사이즈': '500×1500mm', '재질': '알루미늄 프레임', '무게': '약 2.5kg' }, option_groups: [{ group: '거치대', items: [{ label: '대형 (500×1500)', price: 35000 }, { label: '소형 (400×1200)', price: 28000 }] }, { group: '출력물', items: [{ label: '선택안함', price: 0 }, { label: '단면 출력', price: 8000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 4,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  // 현수막
  '일반현수막': { name: '일반현수막 (맞춤사이즈)', price: '15,000원', base_price: 15000, description: '맞춤 사이즈로 제작하는 일반현수막. 실내외 겸용, 고해상도 디지털 인쇄.', specs: { '사이즈': '맞춤 제작 (가로×세로)', '재질': '터폴린 (방수)', '인쇄': '디지털 솔벤 인쇄', '마감': '열재단 + 아일렛' }, option_groups: [{ group: '사이즈', items: [{ label: '90×300cm', price: 15000 }, { label: '90×600cm', price: 25000 }, { label: '120×300cm', price: 20000 }, { label: '120×600cm', price: 32000 }] }, { group: '마감', items: [{ label: '아일렛 (기본)', price: 0 }, { label: '봉주머니 마감', price: 3000 }, { label: '벨크로 마감', price: 5000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 4,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '장폭현수막': { name: '장폭현수막 (대형)', price: '25,000원', base_price: 25000, description: '건물 외벽, 공사현장, 대형 행사에 적합한 초대형 현수막. 최대 폭 5m까지 이음 없이 제작.', specs: { '사이즈': '맞춤 제작 (최대 폭 5m)', '재질': '터폴린 (방수)', '인쇄': '솔벤 대형 프린터', '마감': '열재단 + 아일렛' }, option_groups: [{ group: '사이즈', items: [{ label: '200×500cm', price: 25000 }, { label: '200×800cm', price: 40000 }, { label: '300×1000cm', price: 65000 }] }, { group: '마감', items: [{ label: '아일렛 (기본)', price: 0 }, { label: '봉주머니 마감', price: 5000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 5,000원~ (대형 추가비용)' }, { label: '착불택배', info: '수량·사이즈별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '솔벤현수막': { name: '솔벤현수막 (고내구성)', price: '18,000원', base_price: 18000, description: '솔벤 잉크 인쇄 현수막. 자외선·비·바람에 강한 고내구성. 장기 야외 설치에 최적.', specs: { '사이즈': '맞춤 제작', '재질': '터폴린 (13oz 고강도)', '인쇄': '솔벤 잉크 (내후성 우수)', '내구연한': '야외 6개월~1년' }, option_groups: [{ group: '사이즈', items: [{ label: '90×300cm', price: 18000 }, { label: '90×600cm', price: 30000 }, { label: '120×300cm', price: 24000 }] }, { group: '마감', items: [{ label: '아일렛 (기본)', price: 0 }, { label: '봉주머니 마감', price: 3000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 4,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '라텍스현수막': { name: '라텍스현수막 (친환경)', price: '22,000원', base_price: 22000, description: '라텍스 잉크 기반 친환경 현수막. 무취, 고해상도. 전시회·실내 행사에 추천.', specs: { '사이즈': '맞춤 제작', '재질': '라텍스 전용 원단', '인쇄': '라텍스 잉크 (무취·친환경)', '특징': '무취, 고해상도' }, option_groups: [{ group: '사이즈', items: [{ label: '90×300cm', price: 22000 }, { label: '90×600cm', price: 36000 }, { label: '120×300cm', price: 28000 }] }, { group: '마감', items: [{ label: '아일렛 (기본)', price: 0 }, { label: '봉주머니 마감', price: 3000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 4,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '테이블현수막': { name: '테이블현수막', price: '35,000원', base_price: 35000, description: '전시회·박람회·접수대용 테이블 커버 현수막. 브랜드 홍보에 효과적.', specs: { '사이즈': '180×60×72cm (6인용 기준)', '재질': '고급 폴리에스터', '인쇄': '승화전사 인쇄', '마감': '봉제 마감' }, option_groups: [{ group: '사이즈', items: [{ label: '4인용 (120×60cm)', price: 35000 }, { label: '6인용 (180×60cm)', price: 45000 }, { label: '8인용 (240×60cm)', price: 55000 }] }, { group: '형태', items: [{ label: '전면형 (앞면만)', price: 0 }, { label: '3면형 (앞+양옆)', price: 15000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 5,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '열전사메쉬': { name: '열전사메쉬 현수막', price: '20,000원', base_price: 20000, description: '바람이 통하는 메쉬 소재 현수막. 건물 외벽·펜스 등 바람이 강한 곳에 적합.', specs: { '사이즈': '맞춤 제작', '재질': '메쉬 원단 (통풍)', '인쇄': '열전사 인쇄', '특징': '통풍성, 바람 저항 최소화' }, option_groups: [{ group: '사이즈', items: [{ label: '90×300cm', price: 20000 }, { label: '90×600cm', price: 33000 }, { label: '120×300cm', price: 26000 }] }, { group: '마감', items: [{ label: '아일렛 (기본)', price: 0 }, { label: '봉주머니 마감', price: 4000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 4,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '텐트천': { name: '텐트천 현수막', price: '28,000원', base_price: 28000, description: '텐트 천막용 현수막. 방수 처리되어 야외 사용에 적합.', specs: { '사이즈': '맞춤 제작', '재질': '텐트천 (옥스포드)', '인쇄': '승화전사 인쇄', '특징': '방수, 자외선 차단' }, option_groups: [{ group: '사이즈', items: [{ label: '200×200cm', price: 28000 }, { label: '200×300cm', price: 38000 }, { label: '300×300cm', price: 50000 }] }, { group: '마감', items: [{ label: '벨크로 (기본)', price: 0 }, { label: '지퍼 마감', price: 8000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 5,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '부직포': { name: '부직포 현수막', price: '12,000원', base_price: 12000, description: '가볍고 경제적인 실내용 현수막. 행사·이벤트·축하 현수막에 적합.', specs: { '사이즈': '맞춤 제작', '재질': '부직포 원단', '인쇄': '디지털 인쇄', '특징': '가볍고 경제적, 실내용 권장' }, option_groups: [{ group: '사이즈', items: [{ label: '90×300cm', price: 12000 }, { label: '90×600cm', price: 20000 }, { label: '120×300cm', price: 16000 }] }, { group: '마감', items: [{ label: '아일렛 (기본)', price: 0 }, { label: '봉주머니 마감', price: 2000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 3,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  // 대량현수막
  '게릴라현수막': { name: '게릴라현수막', price: '3,000원', base_price: 3000, description: '대량 제작 전문 소형 현수막. 전봇대·난간 부착용. 소량~대량 모두 가능.', specs: { '사이즈': '50×70cm (기본)', '재질': '터폴린 (경량)', '인쇄': '디지털 솔벤', '최소수량': '10장~' }, option_groups: [{ group: '사이즈', items: [{ label: '50×70cm', price: 3000 }, { label: '60×90cm', price: 4000 }, { label: '70×100cm', price: 5000 }] }, { group: '마감', items: [{ label: '열재단 (기본)', price: 0 }, { label: '아일렛 추가', price: 500 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 5,000원~ (수량별)' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '족자현수막': { name: '족자현수막', price: '8,000원', base_price: 8000, description: '족자봉 포함 걸이형 현수막. 실내 벽면에 간편 설치. 매장·학원·사무실 적합.', specs: { '사이즈': '60×180cm (기본)', '재질': '실사 출력물 + 족자봉', '인쇄': '고해상도 디지털', '마감': '상하 족자봉 + 걸이 끈' }, option_groups: [{ group: '사이즈', items: [{ label: '60×160cm', price: 8000 }, { label: '60×180cm', price: 10000 }, { label: '80×200cm', price: 15000 }] }, { group: '봉 종류', items: [{ label: '플라스틱봉 (기본)', price: 0 }, { label: '알루미늄봉', price: 3000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 3,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '게시대현수막': { name: '게시대현수막', price: '15,000원', base_price: 15000, description: '아파트·마을 게시판 전용 현수막. 게시대 규격에 맞춘 사이즈 제작.', specs: { '사이즈': '90×60cm (게시판 규격)', '재질': '터폴린 (방수)', '인쇄': '디지털 솔벤', '마감': '열재단 + 아일렛(4개)' }, option_groups: [{ group: '사이즈', items: [{ label: '90×60cm (표준)', price: 15000 }, { label: '120×80cm (대형)', price: 22000 }, { label: '60×40cm (소형)', price: 10000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 4,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '어깨띠': { name: '어깨띠 (홍보용)', price: '5,000원', base_price: 5000, description: '선거·캠페인·행사용 어깨띠. 원단에 문구 인쇄하여 제작.', specs: { '사이즈': '150×20cm (기본)', '재질': '폴리에스터 원단', '인쇄': '승화전사 인쇄', '마감': '봉제 마감 + 핀' }, option_groups: [{ group: '사이즈', items: [{ label: '150×20cm (기본)', price: 5000 }, { label: '160×25cm (대형)', price: 7000 }] }, { group: '별매품', items: [{ label: '선택안함', price: 0 }, { label: '안전핀 (2개)', price: 500 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 3,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  // 윈드배너
  '윈드배너F형': { name: '윈드배너 F형', price: '38,000원', base_price: 38000, description: 'F형 윈드배너 거치대 + 철판 베이스 세트. 깃발 형태의 날렵한 디자인.', specs: { '총 높이': '2,100mm~3,400mm', '베이스': '철판 베이스', '구성품': '폴대 + 철판 베이스' }, option_groups: [{ group: '거치대', items: [{ label: 'F형 (소형)+철판', price: 38000 }, { label: 'F형 (중형)+철판', price: 48000 }, { label: 'F형 (대형)+철판', price: 58000 }] }, { group: '출력물', items: [{ label: '선택안함', price: 0 }, { label: '단면 출력', price: 15000 }, { label: '양면 출력', price: 25000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 8,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '윈드배너S형': { name: '윈드배너 S형', price: '42,000원', base_price: 42000, description: 'S형 윈드배너 거치대. 물결 곡선 형태로 시선을 사로잡는 디자인.', specs: { '총 높이': '2,100mm~3,400mm', '베이스': '철판 베이스', '구성품': '폴대 + 철판 베이스' }, option_groups: [{ group: '거치대', items: [{ label: 'S형 (소형)+철판', price: 42000 }, { label: 'S형 (중형)+철판', price: 52000 }, { label: 'S형 (대형)+철판', price: 62000 }] }, { group: '출력물', items: [{ label: '선택안함', price: 0 }, { label: '단면 출력', price: 15000 }] }], delivery_options: [{ label: '선불택배', info: '로젠택배 8,000원~' }, { label: '착불택배', info: '수량별 차등' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  // 입간판
  'A형입간판': { name: 'A형 입간판', price: '55,000원', base_price: 55000, description: '양면 포스터 교체형 A형 입간판. 매장 앞 메뉴판, 안내판.', specs: { '사이즈': 'A1 (594×841mm)', '재질': '알루미늄 프레임', '무게': '약 4.8kg' }, option_groups: [{ group: '사이즈', items: [{ label: 'A1 사이즈', price: 55000 }, { label: 'A2 사이즈', price: 42000 }] }, { group: '출력물', items: [{ label: '선택안함', price: 0 }, { label: '양면 포스터', price: 12000 }] }], delivery_options: [{ label: '선불택배', info: '택배비 5,000원~' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '물통입간판': { name: '물통 입간판', price: '65,000원', base_price: 65000, description: '물통 베이스 입간판. 바람에 강하고 안정적. 매장·행사장 앞 홍보용.', specs: { '사이즈': '500×700mm', '재질': '철제 프레임 + 물통 베이스', '무게': '약 8kg (물 충전 시)' }, option_groups: [{ group: '사이즈', items: [{ label: '500×700mm', price: 65000 }, { label: '600×900mm', price: 80000 }] }, { group: '출력물', items: [{ label: '선택안함', price: 0 }, { label: '양면 출력', price: 15000 }] }], delivery_options: [{ label: '선불택배', info: '택배비 6,000원~' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  // 실사출력
  '접착용': { name: '실사출력 (접착용)', price: '8,000원', base_price: 8000, description: '접착형 실사출력. 유리면·벽면 등에 부착 가능. 평당 가격.', specs: { '해상도': '1440dpi', '재질': '접착 시트지', '단위': '평당 (㎡)' }, option_groups: [{ group: '재질', items: [{ label: '일반 접착시트', price: 8000 }, { label: '고급 접착시트', price: 12000 }, { label: '탈부착 접착시트', price: 15000 }] }, { group: '라미네이팅', items: [{ label: '선택안함', price: 0 }, { label: '유광', price: 3000 }, { label: '무광', price: 3000 }] }], delivery_options: [{ label: '선불택배', info: '택배비 4,000원~' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '비접착용': { name: '실사출력 (비접착용)', price: '7,000원', base_price: 7000, description: '비접착형 실사출력. 포스터·현수막·POP 등에 활용.', specs: { '해상도': '1440dpi', '재질': '비접착 시트', '단위': '평당 (㎡)' }, option_groups: [{ group: '재질', items: [{ label: '일반 시트', price: 7000 }, { label: '고급 시트', price: 10000 }] }], delivery_options: [{ label: '선불택배', info: '택배비 4,000원~' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  // 족자봉·롤블라인드
  '족자봉': { name: '족자봉 (기본형)', price: '12,000원', base_price: 12000, description: '기본형 족자봉 세트. 포스터·현수막 걸이 전시용.', specs: { '길이': '600mm / 900mm / 1200mm', '재질': '알루미늄' }, option_groups: [{ group: '사이즈', items: [{ label: '600mm', price: 12000 }, { label: '900mm', price: 15000 }, { label: '1200mm', price: 18000 }] }, { group: '출력물', items: [{ label: '선택안함', price: 0 }, { label: '출력물 포함', price: 8000 }] }], delivery_options: [{ label: '선불택배', info: '택배비 3,000원~' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
  '롤블라인드': { name: '롤블라인드', price: '35,000원', base_price: 35000, description: '실사출력 롤블라인드. 창문·파티션용.', specs: { '사이즈': '맞춤 제작', '재질': '롤블라인드 원단', '구동': '체인식' }, option_groups: [{ group: '사이즈', items: [{ label: '900×1800mm', price: 35000 }, { label: '1200×1800mm', price: 45000 }] }], delivery_options: [{ label: '선불택배', info: '택배비 5,000원~' }], pricing_mode: 'fixed', use_common_design: true, quantity_enabled: true, quantity_label: '수량', quantity_min: 1, quantity_max: 100, notes: [] },
};

interface OptionItem {
  label: string;
  price: number;
  priceType?: 'fixed' | 'perSqm' | 'perUnit';
}

interface OptionGroup {
  group: string;
  items: OptionItem[];
}

interface DeliveryOption {
  label: string;
  info: string;
}

interface CustomDesignOption {
  label: string;
  price: number;
  description: string;
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
  images: string[];
  option_groups: OptionGroup[];
  delivery_options: DeliveryOption[];
  deadline_courier: string;
  deadline_pickup: string;
  specs: Record<string, string>;
  is_visible: boolean;
  // 1. 가격 계산 모드
  pricing_mode: 'area' | 'fixed' | 'quantity';
  // 2. 사이즈 입력 설정
  size_enabled: boolean;
  size_width_label: string;
  size_height_label: string;
  size_unit: 'cm' | 'mm';
  size_min_width: number;
  size_max_width: number;
  size_min_height: number;
  size_max_height: number;
  size_max_roll_width: number;
  // 3. 면적 단가 테이블
  area_price_tiers: [number, number][];
  // 4. 수량 단가 테이블
  quantity_price_tiers: [number, number][];
  // 6. 디자인 옵션
  use_common_design: boolean;
  custom_design_options: CustomDesignOption[];
  // 7. 수량 입력 설정
  quantity_enabled: boolean;
  quantity_label: string;
  quantity_min: number;
  quantity_max: number;
  quantity_presets: string;
  // 8. 안내사항
  notes: string[];
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
    // 새 필드 기본값
    pricing_mode: 'fixed',
    size_enabled: false,
    size_width_label: '가로',
    size_height_label: '세로',
    size_unit: 'cm',
    size_min_width: 0,
    size_max_width: 0,
    size_min_height: 0,
    size_max_height: 0,
    size_max_roll_width: 0,
    area_price_tiers: [],
    quantity_price_tiers: [],
    use_common_design: true,
    custom_design_options: [],
    quantity_enabled: true,
    quantity_label: '수량',
    quantity_min: 1,
    quantity_max: 100,
    quantity_presets: '',
    notes: [],
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
      const sizeConfig = opts.size_config || {};
      const designOpts = opts.design_options || {};
      const quantityConfig = opts.quantity_config || {};

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
        // 새 필드 역매핑
        pricing_mode: opts.pricing_mode || 'fixed',
        size_enabled: sizeConfig.enabled ?? false,
        size_width_label: sizeConfig.widthLabel || '가로',
        size_height_label: sizeConfig.heightLabel || '세로',
        size_unit: sizeConfig.unit || 'cm',
        size_min_width: sizeConfig.minWidth ?? 0,
        size_max_width: sizeConfig.maxWidth ?? 0,
        size_min_height: sizeConfig.minHeight ?? 0,
        size_max_height: sizeConfig.maxHeight ?? 0,
        size_max_roll_width: sizeConfig.maxRollWidth ?? 0,
        area_price_tiers: Array.isArray(opts.area_price_tiers) ? opts.area_price_tiers : [],
        quantity_price_tiers: Array.isArray(opts.quantity_price_tiers) ? opts.quantity_price_tiers : [],
        use_common_design: designOpts.useCommon ?? true,
        custom_design_options: Array.isArray(designOpts.custom) ? designOpts.custom : [],
        quantity_enabled: quantityConfig.enabled ?? true,
        quantity_label: quantityConfig.label || '수량',
        quantity_min: quantityConfig.min ?? 1,
        quantity_max: quantityConfig.max ?? 100,
        quantity_presets: Array.isArray(quantityConfig.presets) ? quantityConfig.presets.join(',') : '',
        notes: Array.isArray(opts.notes) ? opts.notes : [],
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

  // 소분류 선택 시 템플릿 자동 채움
  const applyTemplate = (subcategory: string) => {
    const tpl = PRODUCT_TEMPLATES[subcategory];
    if (!tpl) return;
    setForm(prev => ({
      ...prev,
      subcategory,
      name: tpl.name,
      slug: toSlug(tpl.name),
      price: tpl.price,
      base_price: tpl.base_price,
      description: tpl.description,
      specs: tpl.specs,
      option_groups: tpl.option_groups,
      delivery_options: tpl.delivery_options,
      pricing_mode: tpl.pricing_mode,
      use_common_design: tpl.use_common_design,
      quantity_enabled: tpl.quantity_enabled,
      quantity_label: tpl.quantity_label,
      quantity_min: tpl.quantity_min,
      quantity_max: tpl.quantity_max,
      notes: tpl.notes,
    }));
    setSlugManual(false);
    toast.success(`"${subcategory}" 템플릿이 적용되었습니다. 내용을 수정 후 저장하세요.`);
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
  const updateOptionItem = (gi: number, ii: number, field: 'label' | 'price' | 'priceType', val: string | number) => {
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

  // Area price tier helpers
  const addAreaTier = () => {
    updateField('area_price_tiers', [...form.area_price_tiers, [0, 0] as [number, number]]);
  };
  const removeAreaTier = (i: number) => {
    updateField('area_price_tiers', form.area_price_tiers.filter((_, idx) => idx !== i));
  };
  const updateAreaTier = (i: number, col: 0 | 1, val: number) => {
    const tiers = form.area_price_tiers.map((t, idx) => idx === i ? (col === 0 ? [val, t[1]] : [t[0], val]) as [number, number] : t);
    updateField('area_price_tiers', tiers);
  };

  // Quantity price tier helpers
  const addQuantityTier = () => {
    updateField('quantity_price_tiers', [...form.quantity_price_tiers, [0, 0] as [number, number]]);
  };
  const removeQuantityTier = (i: number) => {
    updateField('quantity_price_tiers', form.quantity_price_tiers.filter((_, idx) => idx !== i));
  };
  const updateQuantityTier = (i: number, col: 0 | 1, val: number) => {
    const tiers = form.quantity_price_tiers.map((t, idx) => idx === i ? (col === 0 ? [val, t[1]] : [t[0], val]) as [number, number] : t);
    updateField('quantity_price_tiers', tiers);
  };

  // Custom design option helpers
  const addCustomDesign = () => {
    updateField('custom_design_options', [...form.custom_design_options, { label: '', price: 0, description: '' }]);
  };
  const removeCustomDesign = (i: number) => {
    updateField('custom_design_options', form.custom_design_options.filter((_, idx) => idx !== i));
  };
  const updateCustomDesign = (i: number, field: keyof CustomDesignOption, val: string | number) => {
    updateField('custom_design_options', form.custom_design_options.map((d, idx) => idx === i ? { ...d, [field]: val } : d));
  };

  // Notes helpers
  const addNote = () => {
    updateField('notes', [...form.notes, '']);
  };
  const removeNote = (i: number) => {
    updateField('notes', form.notes.filter((_, idx) => idx !== i));
  };
  const updateNote = (i: number, val: string) => {
    updateField('notes', form.notes.map((n, idx) => idx === i ? val : n));
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
        // 새 필드 매핑
        pricing_mode: form.pricing_mode,
        size_config: {
          enabled: form.size_enabled,
          widthLabel: form.size_width_label,
          heightLabel: form.size_height_label,
          unit: form.size_unit,
          minWidth: form.size_min_width,
          maxWidth: form.size_max_width,
          minHeight: form.size_min_height,
          maxHeight: form.size_max_height,
          maxRollWidth: form.size_max_roll_width,
        },
        area_price_tiers: form.area_price_tiers,
        quantity_price_tiers: form.quantity_price_tiers,
        design_options: {
          useCommon: form.use_common_design,
          custom: form.custom_design_options,
        },
        quantity_config: {
          enabled: form.quantity_enabled,
          label: form.quantity_label,
          min: form.quantity_min,
          max: form.quantity_max,
          presets: form.quantity_presets ? form.quantity_presets.split(',').map(s => Number(s.trim())).filter(n => !isNaN(n)) : [],
        },
        notes: form.notes.filter(n => n.trim() !== ''),
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
              <FormField label="소분류" description={isNew && form.category_id ? '선택 시 기본 템플릿이 자동 적용됩니다' : undefined}>
                {form.category_id && SUBCATEGORY_MAP[form.category_id] ? (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <select
                      className="admin-select"
                      value={SUBCATEGORY_MAP[form.category_id].includes(form.subcategory) ? form.subcategory : ''}
                      onChange={e => {
                        const val = e.target.value;
                        if (isNew && val && PRODUCT_TEMPLATES[val]) {
                          applyTemplate(val);
                        } else {
                          updateField('subcategory', val);
                        }
                      }}
                    >
                      <option value="">선택하세요</option>
                      {SUBCATEGORY_MAP[form.category_id].map(sub => (
                        <option key={sub} value={sub}>{sub}{PRODUCT_TEMPLATES[sub] ? ' ✦' : ''}</option>
                      ))}
                    </select>
                    {!SUBCATEGORY_MAP[form.category_id].includes(form.subcategory) && form.subcategory && (
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

            {/* 1. 가격 계산 모드 */}
            <div className="ed-section">
              <h3 className="ed-section-title" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>가격 계산 모드</h3>
              <div style={{ display: 'flex', gap: 16 }}>
                {([
                  { value: 'area', label: '면적 기반 (㎡ 단가)' },
                  { value: 'fixed', label: '고정가' },
                  { value: 'quantity', label: '수량 기반' },
                ] as const).map(opt => (
                  <label key={opt.value} style={{ display: 'flex', alignItems: 'center', gap: 6, cursor: 'pointer', padding: '8px 12px', border: form.pricing_mode === opt.value ? '2px solid #2563eb' : '1px solid #e0e0e0', borderRadius: 6, background: form.pricing_mode === opt.value ? '#eff6ff' : '#fff' }}>
                    <input type="radio" name="pricing_mode" value={opt.value} checked={form.pricing_mode === opt.value} onChange={() => updateField('pricing_mode', opt.value)} />
                    {opt.label}
                  </label>
                ))}
              </div>
            </div>

            {/* 2. 사이즈 입력 설정 (area 모드일 때만) */}
            {form.pricing_mode === 'area' && (
              <div className="ed-section" style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
                <h3 className="ed-section-title" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>사이즈 입력 설정</h3>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16 }}>
                  <input type="checkbox" checked={form.size_enabled} onChange={e => updateField('size_enabled', e.target.checked)} />
                  사이즈 입력 활성화
                </label>
                {form.size_enabled && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                      <FormField label="가로 라벨">
                        <input className="admin-input" value={form.size_width_label} onChange={e => updateField('size_width_label', e.target.value)} />
                      </FormField>
                      <FormField label="세로 라벨">
                        <input className="admin-input" value={form.size_height_label} onChange={e => updateField('size_height_label', e.target.value)} />
                      </FormField>
                      <FormField label="단위">
                        <select className="admin-select" value={form.size_unit} onChange={e => updateField('size_unit', e.target.value as 'cm' | 'mm')}>
                          <option value="cm">cm</option>
                          <option value="mm">mm</option>
                        </select>
                      </FormField>
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 12 }}>
                      <FormField label="최소 가로">
                        <input className="admin-input" type="number" value={form.size_min_width} onChange={e => updateField('size_min_width', Number(e.target.value))} />
                      </FormField>
                      <FormField label="최대 가로">
                        <input className="admin-input" type="number" value={form.size_max_width} onChange={e => updateField('size_max_width', Number(e.target.value))} />
                      </FormField>
                      <FormField label="최소 세로">
                        <input className="admin-input" type="number" value={form.size_min_height} onChange={e => updateField('size_min_height', Number(e.target.value))} />
                      </FormField>
                      <FormField label="최대 세로">
                        <input className="admin-input" type="number" value={form.size_max_height} onChange={e => updateField('size_max_height', Number(e.target.value))} />
                      </FormField>
                      <FormField label="원단폭 제한 (cm)">
                        <input className="admin-input" type="number" value={form.size_max_roll_width} onChange={e => updateField('size_max_roll_width', Number(e.target.value))} />
                      </FormField>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 3. 면적 단가 테이블 (area 모드일 때만) */}
            {form.pricing_mode === 'area' && (
              <div className="ed-section" style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
                <h3 className="ed-section-title" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>면적 단가 테이블</h3>
                <p style={{ fontSize: 13, color: '#999', marginBottom: 12 }}>면적 구간별 단가를 설정합니다. 예: 1㎡ 이하 9,900원/㎡, 2㎡ 이하 9,350원/㎡</p>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee' }}>최대 면적 (㎡)</th>
                      <th style={{ textAlign: 'right', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee', width: 160 }}>㎡당 단가 (원)</th>
                      <th style={{ width: 40, borderBottom: '1px solid #eee' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.area_price_tiers.map((tier, i) => (
                      <tr key={i}>
                        <td style={{ padding: '4px 8px' }}>
                          <input className="admin-input" type="number" value={tier[0]} onChange={e => updateAreaTier(i, 0, Number(e.target.value))} placeholder="㎡" />
                        </td>
                        <td style={{ padding: '4px 8px' }}>
                          <input className="admin-input" type="number" value={tier[1]} onChange={e => updateAreaTier(i, 1, Number(e.target.value))} style={{ textAlign: 'right' }} placeholder="원" />
                        </td>
                        <td style={{ padding: '4px 0' }}>
                          <button className="admin-btn-icon" onClick={() => removeAreaTier(i)} title="삭제"><X size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="admin-btn admin-btn-sm" onClick={addAreaTier} style={{ marginTop: 8 }}>
                  <Plus size={14} /> 구간 추가
                </button>
              </div>
            )}

            {/* 4. 수량 단가 테이블 (quantity 모드일 때만) */}
            {form.pricing_mode === 'quantity' && (
              <div className="ed-section" style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
                <h3 className="ed-section-title" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>수량 단가 테이블</h3>
                <p style={{ fontSize: 13, color: '#999', marginBottom: 12 }}>수량별 총 가격을 설정합니다. 예: 100개 2,750원, 200개 5,500원</p>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee' }}>수량</th>
                      <th style={{ textAlign: 'right', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee', width: 160 }}>총 가격 (원)</th>
                      <th style={{ width: 40, borderBottom: '1px solid #eee' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {form.quantity_price_tiers.map((tier, i) => (
                      <tr key={i}>
                        <td style={{ padding: '4px 8px' }}>
                          <input className="admin-input" type="number" value={tier[0]} onChange={e => updateQuantityTier(i, 0, Number(e.target.value))} placeholder="수량" />
                        </td>
                        <td style={{ padding: '4px 8px' }}>
                          <input className="admin-input" type="number" value={tier[1]} onChange={e => updateQuantityTier(i, 1, Number(e.target.value))} style={{ textAlign: 'right' }} placeholder="원" />
                        </td>
                        <td style={{ padding: '4px 0' }}>
                          <button className="admin-btn-icon" onClick={() => removeQuantityTier(i)} title="삭제"><X size={14} /></button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <button className="admin-btn admin-btn-sm" onClick={addQuantityTier} style={{ marginTop: 8 }}>
                  <Plus size={14} /> 수량 구간 추가
                </button>
              </div>
            )}

            {/* 7. 수량 입력 설정 (quantity 또는 fixed 모드일 때) */}
            {(form.pricing_mode === 'quantity' || form.pricing_mode === 'fixed') && (
              <div className="ed-section" style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
                <h3 className="ed-section-title" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>수량 입력 설정</h3>
                <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16 }}>
                  <input type="checkbox" checked={form.quantity_enabled} onChange={e => updateField('quantity_enabled', e.target.checked)} />
                  수량 입력 활성화
                </label>
                {form.quantity_enabled && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 2fr', gap: 12 }}>
                      <FormField label="라벨">
                        <input className="admin-input" value={form.quantity_label} onChange={e => updateField('quantity_label', e.target.value)} placeholder="수량" />
                      </FormField>
                      <FormField label="최소">
                        <input className="admin-input" type="number" value={form.quantity_min} onChange={e => updateField('quantity_min', Number(e.target.value))} />
                      </FormField>
                      <FormField label="최대">
                        <input className="admin-input" type="number" value={form.quantity_max} onChange={e => updateField('quantity_max', Number(e.target.value))} />
                      </FormField>
                      <FormField label="프리셋 (쉼표 구분)" description="예: 100,200,300,500,1000">
                        <input className="admin-input" value={form.quantity_presets} onChange={e => updateField('quantity_presets', e.target.value)} placeholder="100,200,300,500,1000" />
                      </FormField>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 기존 옵션 그룹 (5. priceType 드롭다운 추가) */}
            <div className="ed-section">
              <h3 className="ed-section-title" style={{ fontSize: 15, fontWeight: 700, marginBottom: 8 }}>옵션 그룹</h3>
              <p style={{ fontSize: 13, color: '#999', marginBottom: 16 }}>옵션 그룹별로 선택 항목과 가격을 설정합니다. 고객이 옵션을 선택하면 가격이 자동 계산됩니다.</p>
            </div>

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
                      <th style={{ textAlign: 'center', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee', width: 120 }}>가격 유형</th>
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
                        <td style={{ padding: '4px 8px' }}>
                          <select className="admin-select" value={item.priceType || 'fixed'} onChange={e => updateOptionItem(gi, ii, 'priceType', e.target.value)} style={{ fontSize: 13 }}>
                            <option value="fixed">고정가</option>
                            <option value="perSqm">㎡당</option>
                            <option value="perUnit">개당</option>
                          </select>
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

            {/* 6. 디자인 옵션 */}
            <div className="ed-section" style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
              <h3 className="ed-section-title" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>디자인 옵션</h3>
              <label style={{ display: 'flex', alignItems: 'center', gap: 8, cursor: 'pointer', marginBottom: 16 }}>
                <input type="checkbox" checked={form.use_common_design} onChange={e => updateField('use_common_design', e.target.checked)} />
                공통 디자인 옵션 사용 (셀프 교정, 완성 파일, 셀프/일반/고급/명품 디자인)
              </label>
              {form.use_common_design ? (
                <div style={{ fontSize: 13, color: '#666', padding: '8px 12px', background: '#f9fafb', borderRadius: 6 }}>
                  <p style={{ fontWeight: 600, marginBottom: 6 }}>기본 6가지 디자인 옵션이 자동 적용됩니다:</p>
                  <ul style={{ margin: 0, paddingLeft: 18, lineHeight: 1.8 }}>
                    <li>셀프 교정 (0원) -- 고객이 직접 교정</li>
                    <li>완성 파일 접수 (0원) -- 완성된 인쇄 파일 제출</li>
                    <li>셀프 디자인 (0원) -- 온라인 에디터로 직접 디자인</li>
                    <li>일반 디자인 (33,000원) -- 단면 / 시안 수정 3회</li>
                    <li>고급 디자인 (55,000원) -- 단면 / 시안 수정 3회</li>
                    <li>명품 디자인 (77,000원) -- 단면 / 시안 수정 3회</li>
                  </ul>
                </div>
              ) : (
                <div>
                  <p style={{ fontSize: 13, color: '#999', marginBottom: 12 }}>커스텀 디자인 옵션을 직접 설정합니다.</p>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ textAlign: 'left', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee' }}>라벨</th>
                        <th style={{ textAlign: 'right', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee', width: 120 }}>가격 (원)</th>
                        <th style={{ textAlign: 'left', padding: '6px 8px', fontSize: 12, color: '#999', borderBottom: '1px solid #eee' }}>설명</th>
                        <th style={{ width: 40, borderBottom: '1px solid #eee' }}></th>
                      </tr>
                    </thead>
                    <tbody>
                      {form.custom_design_options.map((opt, i) => (
                        <tr key={i}>
                          <td style={{ padding: '4px 8px' }}>
                            <input className="admin-input" value={opt.label} onChange={e => updateCustomDesign(i, 'label', e.target.value)} placeholder="디자인 옵션명" />
                          </td>
                          <td style={{ padding: '4px 8px' }}>
                            <input className="admin-input" type="number" value={opt.price} onChange={e => updateCustomDesign(i, 'price', Number(e.target.value))} style={{ textAlign: 'right' }} />
                          </td>
                          <td style={{ padding: '4px 8px' }}>
                            <input className="admin-input" value={opt.description} onChange={e => updateCustomDesign(i, 'description', e.target.value)} placeholder="설명" />
                          </td>
                          <td style={{ padding: '4px 0' }}>
                            <button className="admin-btn-icon" onClick={() => removeCustomDesign(i)} title="삭제"><X size={14} /></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  <button className="admin-btn admin-btn-sm" onClick={addCustomDesign} style={{ marginTop: 8 }}>
                    <Plus size={14} /> 디자인 옵션 추가
                  </button>
                </div>
              )}
            </div>
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

            {/* 8. 안내사항 */}
            <div className="ed-section" style={{ border: '1px solid #e0e0e0', borderRadius: 8, padding: 16 }}>
              <h3 className="ed-section-title" style={{ fontSize: 15, fontWeight: 700, marginBottom: 12 }}>안내사항</h3>
              <p style={{ fontSize: 13, color: '#999', marginBottom: 12 }}>상품 상세페이지에 표시될 안내사항을 입력합니다. 각 항목이 하나의 안내 문구로 표시됩니다.</p>
              {form.notes.map((note, i) => (
                <div key={i} style={{ display: 'flex', gap: 8, marginBottom: 8 }}>
                  <input className="admin-input" value={note} onChange={e => updateNote(i, e.target.value)} placeholder="안내사항을 입력하세요" style={{ flex: 1 }} />
                  <button className="admin-btn-icon" onClick={() => removeNote(i)} title="삭제"><X size={14} /></button>
                </div>
              ))}
              <button className="admin-btn admin-btn-sm" onClick={addNote}>
                <Plus size={14} /> 항목 추가
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
