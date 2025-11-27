import React, { useState, useEffect } from 'react';
import {
  Search,
  ShoppingCart,
  Filter,
  Star,
  CheckCircle,
  FileText,
  Download,
  Briefcase,
  ChevronRight,
  X,
  Layout,
  Menu,
  User,
  Shield,
  MessageCircle,
  Clock,
  ThumbsUp,
  Plus,
  Lock,
  Users,
  AlertTriangle,
  ArrowRight,
  DollarSign,
  Bell,
} from 'lucide-react';

// --- Mock Data ---
const PRODUCTS = [
  {
    id: 1,
    title: '중소기업 월간 재무 결산 자동화 엑셀',
    category: '재무/회계',
    industry: '일반 법인',
    price: 45000,
    consultingPrice: 50000,
    author: '김회계사',
    authorRole: '10년차 CPA',
    authorBio:
      '빅4 회계법인 감사본부 출신으로, 현재 중소기업 30곳의 자문을 맡고 있습니다.',
    rating: 4.9,
    reviews: 128,
    isBestSeller: true,
    type: 'Excel',
    securityType: 'Hidden Sheet & Meta Data',
    description:
      '더존/세무사랑 데이터를 복사해 넣으면 월간 손익계산서와 대시보드가 자동 생성되는 엑셀 템플릿입니다.',
    features: [
      '매출/매입 자동 분류',
      '현금흐름표 자동 생성',
      '경영진 보고용 대시보드 시트 포함',
      '계정과목 매핑 가이드',
    ],
    reviewsList: [
      {
        user: '박대리',
        company: '제조업',
        comment: '매달 3일 걸리던 결산이 3시간으로 줄었습니다.',
        rating: 5,
      },
    ],
  },
  {
    id: 2,
    title: '임상시험 증례기록서(CRF) 표준 가이드라인',
    category: '의료/제약',
    industry: '바이오',
    price: 89000,
    consultingPrice: 100000,
    author: '박CRA',
    authorRole: '글로벌 제약사 임상 팀장',
    authorBio: '15년차 CRA/CRM으로 다수의 글로벌 임상 3상을 리딩했습니다.',
    rating: 5.0,
    reviews: 42,
    isBestSeller: false,
    type: 'Word/PDF',
    securityType: 'Invisible Watermark',
    description:
      '임상 1상/2상 진행 시 필수적인 CRF 작성 표준 가이드와 실제 승인된 프로토콜 예시가 포함되어 있습니다.',
    features: [
      'CDISC 표준 준수 항목',
      '데이터 매니지먼트 플랜(DMP) 초안',
      'IRB 제출용 체크리스트',
    ],
    reviewsList: [
      {
        user: '김연구원',
        company: '바이오벤처',
        comment: '시행착오를 1년은 줄여줍니다.',
        rating: 5,
      },
    ],
  },
  {
    id: 3,
    title: 'SaaS B2B 콜드메일 시퀀스 & CRM 세팅',
    category: '영업/마케팅',
    industry: 'IT/SW',
    price: 55000,
    consultingPrice: 70000,
    author: '최영업',
    authorRole: '실리콘밸리 스타트업 Biz Dev',
    authorBio:
      '맨땅에 헤딩하며 얻은 노하우입니다. 실제 응답률 8% 달성 스크립트.',
    rating: 4.8,
    reviews: 215,
    isBestSeller: true,
    type: 'Notion',
    securityType: 'Access Log Tracking',
    description:
      '오픈율 40% 이상을 기록한 콜드메일 5단계 시퀀스와 노션 CRM 연동 템플릿입니다.',
    features: [
      '타겟 페르소나별 메일 스크립트',
      '노션-슬랙 자동 알림 설정 가이드',
      '팔로업 트래킹 보드',
    ],
    reviewsList: [
      {
        user: '정대표',
        company: 'SaaS',
        comment: '미팅 2건 바로 잡혔습니다.',
        rating: 5,
      },
    ],
  },
  {
    id: 4,
    title: '건설 현장 안전관리 일일 점검표 & 리포트',
    category: '건설/엔지니어링',
    industry: '건설',
    price: 30000,
    consultingPrice: 40000,
    author: '이현장',
    authorRole: '대기업 건설 안전관리자',
    authorBio: '현장 안전관리 20년 경력. 중대재해처벌법 대응 최적화.',
    rating: 4.7,
    reviews: 89,
    isBestSeller: false,
    type: 'PDF/Excel',
    securityType: 'Digital Fingerprint',
    description:
      '중대재해처벌법 대응을 위한 필수 현장 안전 점검 리스트와 모바일 작성 최적화 양식입니다.',
    features: [
      '공종별 위험성 평가표',
      'TBM 일지 양식',
      '법적 필수 보존 서류 목록',
    ],
    reviewsList: [],
  },
  {
    id: 5,
    title: 'UX 리서치 사용자 인터뷰 스크립트 & 동의서',
    category: '기획/디자인',
    industry: 'IT/서비스',
    price: 25000,
    consultingPrice: 30000,
    author: '정UX',
    authorRole: '유니콘 기업 리드 리서처',
    authorBio:
      '300명 이상의 유저 인터뷰를 진행하며 다듬은 질문 설계를 공유합니다.',
    rating: 4.9,
    reviews: 310,
    isBestSeller: true,
    type: 'Word',
    securityType: 'Author Signature',
    description:
      '심층 인터뷰(IDI)를 위한 구조화된 질문지와 개인정보 수집 동의서 법률 검토 완료 버전입니다.',
    features: [
      '아이스브레이킹부터 마무리까지 질문 설계',
      '비대면 인터뷰 가이드',
      '녹취록 정리 템플릿',
    ],
    reviewsList: [],
  },
  {
    id: 6,
    title: '프랜차이즈 카페 발주/재고 관리 자동화 시트',
    category: 'F&B/자영업',
    industry: '외식업',
    price: 39000,
    consultingPrice: 45000,
    author: '한점장',
    authorRole: '프랜차이즈 슈퍼바이저 출신',
    authorBio:
      "점주님들이 가장 힘들어하는 '재고 빵꾸'와 '과다 발주'를 해결하기 위해 만들었습니다.",
    rating: 4.8,
    reviews: 156,
    isBestSeller: false,
    type: 'Google Sheets',
    securityType: 'Hidden Formula',
    description:
      '일일 판매량 입력 시 적정 발주량을 추천해주고 원가율(COGS)을 실시간으로 계산해주는 시트입니다.',
    features: [
      '날씨/요일별 수요 예측 수식',
      '유통기한 관리 알림',
      '폐기율 분석 대시보드',
    ],
    reviewsList: [],
  },
];

const CATEGORIES = [
  '전체',
  '재무/회계',
  '의료/제약',
  '영업/마케팅',
  '건설/엔지니어링',
  '기획/디자인',
  'F&B/자영업',
];

// --- Toast Component ---
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-[60] animate-in slide-in-from-right duration-300">
      <div
        className={`flex items-center gap-3 px-4 py-3 rounded-lg shadow-xl border ${
          type === 'success'
            ? 'bg-white border-green-500 text-green-700'
            : 'bg-slate-800 text-white'
        }`}
      >
        {type === 'success' ? (
          <CheckCircle className="w-5 h-5" />
        ) : (
          <Bell className="w-5 h-5" />
        )}
        <span className="font-bold text-sm">{message}</span>
      </div>
    </div>
  );
};

// --- Product Card Component ---
const ProductCard = ({ product, onClick, onAddToCart }) => (
  <div
    className="bg-white rounded-xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col group cursor-pointer h-full"
    onClick={() => onClick(product)}
  >
    <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
      <div
        className={`absolute inset-0 bg-gradient-to-br from-slate-50 to-slate-200 group-hover:scale-105 transition-transform duration-500`}
      />
      {product.isBestSeller && (
        <div className="absolute top-3 left-3 bg-slate-900 text-white text-[10px] font-bold px-2 py-1 rounded-full shadow-lg z-20">
          BEST SELLER
        </div>
      )}
      <div className="z-10 text-center p-4">
        <FileText className="w-12 h-12 text-blue-600 mx-auto mb-2 opacity-80" />
        <span className="text-xs font-bold text-slate-500 uppercase tracking-wider bg-white/80 px-2 py-1 rounded-full backdrop-blur-sm shadow-sm border border-slate-100">
          {product.type}
        </span>
      </div>
    </div>
    <div className="p-5 flex-1 flex flex-col">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-semibold text-blue-600 bg-blue-50 px-2 py-1 rounded">
          {product.industry}
        </span>
        <div className="flex items-center text-amber-500 text-xs font-bold">
          <Star className="w-3 h-3 fill-current mr-1" />
          {product.rating}{' '}
          <span className="text-slate-400 font-normal ml-1">
            ({product.reviews})
          </span>
        </div>
      </div>
      <h3 className="text-lg font-bold text-slate-800 mb-2 leading-tight group-hover:text-blue-700 transition-colors">
        {product.title}
      </h3>
      <p className="text-sm text-slate-500 mb-4 line-clamp-2 flex-1">
        {product.description}
      </p>

      <div className="flex items-center gap-2 mb-4 pt-4 border-t border-slate-100">
        <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center text-xs font-bold text-slate-600 border border-white shadow-sm">
          {product.author[0]}
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1">
            <span className="text-xs font-bold text-slate-700">
              {product.author}
            </span>
            <Shield className="w-3 h-3 text-green-500" />
          </div>
          <span className="text-[10px] text-slate-400 truncate max-w-[140px]">
            {product.authorRole}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between mt-auto">
        <span className="text-xl font-bold text-slate-900">
          {product.price.toLocaleString()}원
        </span>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onAddToCart(product);
          }}
          className="p-2 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-600 hover:text-white transition-colors"
        >
          <ShoppingCart className="w-5 h-5" />
        </button>
      </div>
    </div>
  </div>
);

// --- Dashboard (My Library) Component ---
const Dashboard = ({ purchasedItems }) => (
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
    <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
      <Briefcase className="w-6 h-6 text-blue-600" /> 내 라이브러리 (구매한
      템플릿)
    </h2>

    {purchasedItems.length === 0 ? (
      <div className="text-center py-20 bg-white rounded-2xl border border-slate-200 border-dashed">
        <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <FileText className="w-8 h-8 text-slate-300" />
        </div>
        <h3 className="text-lg font-bold text-slate-700">
          아직 구매한 템플릿이 없습니다.
        </h3>
        <p className="text-slate-500 mb-6">
          전문가의 노하우를 구매하여 업무 시간을 단축해보세요.
        </p>
        <button className="text-blue-600 font-bold hover:underline">
          템플릿 둘러보기
        </button>
      </div>
    ) : (
      <div className="space-y-4">
        {purchasedItems.map((item, idx) => (
          <div
            key={idx}
            className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="flex gap-4">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <FileText className="w-8 h-8" />
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold text-slate-500 bg-slate-100 px-2 py-0.5 rounded">
                    {item.category}
                  </span>
                  <span className="text-xs text-green-600 flex items-center gap-1 font-medium">
                    <CheckCircle className="w-3 h-3" /> 결제 완료
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 text-lg">
                  {item.title}
                </h3>
                <p className="text-sm text-slate-500">
                  By {item.author} | 보안 타입: {item.securityType}
                </p>
                {item.includeConsulting && (
                  <div className="mt-2 text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded w-fit flex items-center gap-1">
                    <User className="w-3 h-3" /> 1:1 컨설팅 신청 가능 상태
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 min-w-[200px]">
              {item.includeConsulting && (
                <button className="px-4 py-2 border border-slate-200 text-slate-700 font-bold rounded-lg hover:bg-slate-50 text-sm">
                  컨설팅 일정 예약
                </button>
              )}
              <button className="px-4 py-2 bg-slate-900 text-white font-bold rounded-lg hover:bg-slate-800 text-sm flex items-center justify-center gap-2">
                <Download className="w-4 h-4" /> 다운로드
              </button>
            </div>
          </div>
        ))}
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start gap-3 text-sm text-yellow-800">
          <AlertTriangle className="w-5 h-5 flex-shrink-0 mt-0.5" />
          <p>
            <strong>보안 주의:</strong> 다운로드된 파일에는 구매자(
            {purchasedItems[0]?.buyerEmail || 'user@email.com'})의 식별 정보가
            포함된 워터마크가 적용됩니다. 무단 배포 시 추적될 수 있습니다.
          </p>
        </div>
      </div>
    )}
  </div>
);

// --- Expert Landing Page ---
const ExpertLanding = ({ onStart }) => (
  <div className="min-h-screen bg-white">
    <div className="bg-slate-900 text-white py-20 px-4 text-center">
      <h1 className="text-4xl md:text-5xl font-extrabold mb-6">
        당신의 '업무 근육'을 팝니다.
      </h1>
      <p className="text-slate-400 text-lg max-w-2xl mx-auto mb-10">
        매일 반복해서 사용하는 그 양식, 누군가에게는 수백만 원의 가치가
        있습니다.
        <br />
        ProTemplate에서 당신의 지식을 자산으로 만드세요.
      </p>
      <button
        onClick={onStart}
        className="bg-blue-600 hover:bg-blue-500 text-white font-bold py-4 px-10 rounded-xl transition-all hover:scale-105 shadow-lg shadow-blue-900/50"
      >
        전문가 등록 시작하기
      </button>
    </div>

    <div className="max-w-7xl mx-auto px-4 py-20">
      <div className="grid md:grid-cols-3 gap-10">
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
            <DollarSign className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3">평균 수익 월 250만원</h3>
          <p className="text-slate-500">
            상위 10% 판매자는 월 500만원 이상의
            <br />
            추가 수익을 창출하고 있습니다.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
            <Lock className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3">강력한 저작권 보호</h3>
          <p className="text-slate-500">
            자체 워터마크 기술과 DRM으로
            <br />
            당신의 지식 자산을 안전하게 보호합니다.
          </p>
        </div>
        <div className="text-center p-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mx-auto mb-6">
            <Layout className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold mb-3">간편한 상품화</h3>
          <p className="text-slate-500">
            복잡한 상세페이지 디자인 없이,
            <br />
            템플릿 파일만 있으면 바로 판매 가능합니다.
          </p>
        </div>
      </div>

      <div className="bg-slate-50 rounded-3xl p-10 mt-10 text-center border border-slate-100">
        <h2 className="text-2xl font-bold mb-6">지금 등록 가능한 카테고리</h2>
        <div className="flex flex-wrap justify-center gap-3">
          {[
            '재무 엑셀',
            '계약서 양식',
            '디자인 시스템',
            '마케팅 기획서',
            '개발 코드',
            '사업계획서',
          ].map((tag) => (
            <span
              key={tag}
              className="px-4 py-2 bg-white border border-slate-200 rounded-full text-slate-600 font-bold text-sm"
            >
              # {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

// --- Modal, CartSidebar components are same as before but simplified props for brevity in this single file ---
// (Assuming these are essential, I will include them fully to ensure the code is runnable and complete)

const Modal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [includeConsulting, setIncludeConsulting] = useState(false);
  const [isTeamLicense, setIsTeamLicense] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab('details');
      setIncludeConsulting(false);
      setIsTeamLicense(false);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const teamLicensePrice = Math.round(product.price * 2.5);
  const finalPrice =
    (isTeamLicense ? teamLicensePrice : product.price) +
    (includeConsulting ? product.consultingPrice : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200 flex flex-col">
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-100 flex justify-between items-center flex-shrink-0">
          <h2 className="text-lg font-bold text-slate-800 truncate pr-4">
            {product.title}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full transition-colors"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="overflow-y-auto flex-1 p-6">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3 bg-slate-100 rounded-xl h-48 flex items-center justify-center flex-col text-slate-400 border border-slate-200 relative overflow-hidden group">
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20 transform -rotate-12 select-none">
                <span className="text-3xl font-extrabold text-slate-500 whitespace-nowrap">
                  PREVIEW WATERMARK
                </span>
              </div>
              <FileText className="w-16 h-16 mb-4 text-blue-500 opacity-50 z-10" />
              <span className="font-semibold text-sm z-10">
                미리보기 이미지
              </span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">
                  {product.category}
                </span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">
                  {product.type}
                </span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-4">
                {product.title}
              </h1>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">
                {product.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded-lg border border-slate-100">
                <Lock className="w-3.5 h-3.5 text-blue-500" />
                <span className="font-medium">
                  보안: {product.securityType} 적용됨
                </span>
              </div>
            </div>
          </div>
          <div className="flex border-b border-slate-200 mb-6 sticky top-0 bg-white z-10 pt-2">
            {['details', 'reviews', 'author'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-3 text-sm font-bold border-b-2 transition-colors capitalize ${
                  activeTab === tab
                    ? 'border-blue-600 text-blue-600'
                    : 'border-transparent text-slate-500 hover:text-slate-700'
                }`}
              >
                {tab === 'details'
                  ? '상세 정보'
                  : tab === 'reviews'
                  ? `리뷰 (${product.reviews})`
                  : '판매자 프로필'}
              </button>
            ))}
          </div>
          <div className="min-h-[200px]">
            {activeTab === 'details' && (
              <div className="animate-in fade-in">
                <div className="bg-slate-50 p-5 rounded-xl border border-slate-100 mb-6">
                  <h4 className="font-bold text-slate-800 text-sm mb-3">
                    이 템플릿의 핵심 기능:
                  </h4>
                  <ul className="space-y-3">
                    {product.features.map((feature, idx) => (
                      <li
                        key={idx}
                        className="flex items-start text-sm text-slate-700"
                      >
                        <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {activeTab === 'reviews' && (
              <div className="animate-in fade-in space-y-4">
                {product.reviewsList.map((review, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-4">
                    <div className="flex justify-between items-start mb-1">
                      <span className="font-bold text-slate-800 text-sm">
                        {review.user}{' '}
                        <span className="text-slate-400 font-normal">
                          | {review.company}
                        </span>
                      </span>
                      <div className="flex text-amber-500">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current" />
                        ))}
                      </div>
                    </div>
                    <p className="text-sm text-slate-600 bg-slate-50 p-3 rounded-lg mt-2">
                      "{review.comment}"
                    </p>
                  </div>
                ))}
              </div>
            )}
            {activeTab === 'author' && (
              <div className="animate-in fade-in flex items-start gap-4">
                <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold text-xl flex-shrink-0">
                  {product.author[0]}
                </div>
                <div>
                  <h3 className="font-bold text-lg text-slate-900">
                    {product.author}
                  </h3>
                  <p className="text-slate-500 text-sm mb-3">
                    {product.authorRole}
                  </p>
                  <p className="text-sm text-slate-700 bg-slate-50 p-4 rounded-xl border border-slate-100">
                    {product.authorBio}
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="space-y-3 mb-4">
            <div
              className={`rounded-xl border transition-all cursor-pointer p-3 flex items-center justify-between group ${
                isTeamLicense
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
              onClick={() => setIsTeamLicense(!isTeamLicense)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    isTeamLicense
                      ? 'bg-purple-600 border-purple-600'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {isTeamLicense && (
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <div>
                  <span
                    className={`font-bold text-sm block ${
                      isTeamLicense ? 'text-purple-900' : 'text-slate-700'
                    }`}
                  >
                    팀 라이선스 적용 (5인)
                  </span>
                </div>
              </div>
              <span
                className={`font-bold ${
                  isTeamLicense ? 'text-purple-700' : 'text-slate-400'
                }`}
              >
                +{(teamLicensePrice - product.price).toLocaleString()}원
              </span>
            </div>
            <div
              className={`rounded-xl border transition-all cursor-pointer p-3 flex items-center justify-between group ${
                includeConsulting
                  ? 'border-blue-500 bg-blue-50'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
              onClick={() => setIncludeConsulting(!includeConsulting)}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-5 h-5 rounded border flex items-center justify-center transition-colors ${
                    includeConsulting
                      ? 'bg-blue-600 border-blue-600'
                      : 'border-slate-300 bg-white'
                  }`}
                >
                  {includeConsulting && (
                    <CheckCircle className="w-3.5 h-3.5 text-white" />
                  )}
                </div>
                <div>
                  <span
                    className={`font-bold text-sm block ${
                      includeConsulting ? 'text-blue-800' : 'text-slate-700'
                    }`}
                  >
                    저자 1:1 컨설팅 (30분)
                  </span>
                </div>
              </div>
              <span
                className={`font-bold ${
                  includeConsulting ? 'text-blue-700' : 'text-slate-400'
                }`}
              >
                +{product.consultingPrice.toLocaleString()}원
              </span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col">
              <span className="text-xs text-slate-500">총 결제금액</span>
              <span className="text-2xl font-bold text-slate-900">
                {finalPrice.toLocaleString()}원
              </span>
            </div>
            <button
              onClick={() => {
                onAddToCart({
                  ...product,
                  includeConsulting,
                  isTeamLicense,
                  finalPrice,
                });
                onClose();
              }}
              className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg"
            >
              <Download className="w-5 h-5" /> 구매하기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSidebar = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
  const [agreed, setAgreed] = useState(false);
  const total = cart.reduce((sum, item) => sum + item.finalPrice, 0);

  useEffect(() => {
    if (!isOpen || cart.length === 0) setAgreed(false);
  }, [isOpen, cart]);

  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/20 z-40 backdrop-blur-sm"
          onClick={onClose}
        />
      )}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-sm bg-white z-50 shadow-2xl transform transition-transform duration-300 ease-in-out ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white sticky top-0 z-10">
          <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800">
            <ShoppingCart className="w-5 h-5" /> 장바구니{' '}
            <span className="text-blue-600 text-sm font-bold bg-blue-50 px-2 py-0.5 rounded-full">
              {cart.length}
            </span>
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-full"
          >
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        <div className="p-5 overflow-y-auto h-[calc(100vh-280px)] bg-slate-50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <ShoppingCart className="w-12 h-12 opacity-20 mb-2" />
              <p>장바구니가 비어있습니다.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item, idx) => (
                <li
                  key={`${item.id}-${idx}`}
                  className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative"
                >
                  <h4 className="text-sm font-bold text-slate-800 truncate mb-1">
                    {item.title}
                  </h4>
                  <div className="flex gap-2 mb-2">
                    {item.isTeamLicense && (
                      <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">
                        팀 라이선스
                      </span>
                    )}
                    {item.includeConsulting && (
                      <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">
                        1:1 컨설팅
                      </span>
                    )}
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-slate-900">
                      {item.finalPrice.toLocaleString()}원
                    </span>
                    <button
                      onClick={() => onRemove(idx)}
                      className="text-xs text-red-500 underline"
                    >
                      삭제
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-5 bg-white border-t border-slate-200 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="flex justify-between items-center mb-4">
            <span className="font-bold text-slate-800">총 결제금액</span>
            <span className="text-2xl font-bold text-slate-900">
              {total.toLocaleString()}원
            </span>
          </div>
          {cart.length > 0 && (
            <div className="flex items-start gap-2 p-3 bg-slate-50 rounded-lg border border-slate-100 mb-4">
              <input
                type="checkbox"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5"
              />
              <label className="text-xs text-slate-600">
                본 콘텐츠에는{' '}
                <span className="font-bold text-slate-800">식별 워터마크</span>
                가 포함되며 무단 배포 시 법적 책임에 동의합니다.
              </label>
            </div>
          )}
          <button
            disabled={!agreed || cart.length === 0}
            onClick={onCheckout}
            className={`w-full font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg ${
              agreed
                ? 'bg-slate-900 hover:bg-slate-800 text-white'
                : 'bg-slate-200 text-slate-400 cursor-not-allowed'
            }`}
          >
            <CheckCircle className="w-5 h-5" /> 결제하기
          </button>
        </div>
      </div>
    </>
  );
};

// --- Main Application ---
export default function ProTemplateApp() {
  const [view, setView] = useState('home'); // home, dashboard, expert
  const [selectedCategory, setSelectedCategory] = useState('전체');
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState([]);
  const [purchasedItems, setPurchasedItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Computed Values
  const filteredProducts = PRODUCTS.filter((product) => {
    const matchesCategory =
      selectedCategory === '전체' || product.category === selectedCategory;
    const matchesSearch =
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Actions
  const showToast = (message, type = 'success') => setToast({ message, type });

  const addToCart = (productWithOption) => {
    setCart([...cart, productWithOption]);
    setIsCartOpen(true);
    showToast('장바구니에 상품이 담겼습니다.');
  };

  const removeFromCart = (indexToRemove) => {
    setCart(cart.filter((_, idx) => idx !== indexToRemove));
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    // Simulate API Call for Payment
    setTimeout(() => {
      setPurchasedItems([...purchasedItems, ...cart]);
      setCart([]);
      setView('dashboard');
      showToast('결제가 성공적으로 완료되었습니다.', 'success');
    }, 1000);
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}

      {/* Navigation */}
      <nav className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => {
              setView('home');
              window.scrollTo(0, 0);
            }}
          >
            <div className="bg-slate-900 text-white p-1.5 rounded-lg">
              <Layout className="w-6 h-6" />
            </div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">
              ProTemplate
            </span>
          </div>

          <div className="hidden md:flex flex-1 max-w-md mx-8 relative">
            <input
              type="text"
              placeholder="직무, 산업, 템플릿 검색..."
              className="w-full pl-10 pr-4 py-2.5 rounded-full border border-slate-200 bg-slate-100 focus:bg-white focus:ring-2 focus:ring-slate-900 outline-none transition-all text-sm"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Search className="absolute left-3.5 top-3 w-4 h-4 text-slate-400" />
          </div>

          <div className="flex items-center gap-3">
            {view !== 'expert' && (
              <button
                onClick={() => setView('expert')}
                className="hidden md:flex items-center px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                전문가 등록
              </button>
            )}
            {view !== 'dashboard' ? (
              <button
                onClick={() => setView('dashboard')}
                className="hidden md:flex items-center px-4 py-2 text-sm font-bold text-slate-600 hover:text-slate-900 hover:bg-slate-100 rounded-full transition-colors"
              >
                내 라이브러리
              </button>
            ) : (
              <div className="hidden md:flex items-center gap-2 px-4 py-2 bg-blue-50 text-blue-700 rounded-full text-sm font-bold">
                <User className="w-4 h-4" /> User
              </div>
            )}

            <div className="h-6 w-px bg-slate-200 hidden md:block"></div>
            <button
              className="relative p-2.5 hover:bg-slate-100 rounded-full transition-colors"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6 text-slate-600" />
              {cart.length > 0 && (
                <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cart.length}
                </span>
              )}
            </button>
            <button className="md:hidden p-2">
              <Menu className="w-6 h-6 text-slate-600" />
            </button>
          </div>
        </div>
      </nav>

      {/* View Switcher */}
      {view === 'home' && (
        <>
          {/* Hero Section */}
          <div className="bg-white border-b border-slate-200 overflow-hidden relative">
            <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-50 pointer-events-none"></div>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-24 text-center relative z-10">
              <span className="inline-flex items-center gap-1 py-1 px-3 rounded-full bg-blue-50 text-blue-700 text-xs font-bold mb-6 border border-blue-100 animate-in slide-in-from-bottom-2">
                <CheckCircle className="w-3 h-3" /> 검증된 전문가들의 실무
                노하우
              </span>
              <h1 className="text-4xl md:text-6xl font-extrabold text-slate-900 mb-6 tracking-tight leading-[1.1] animate-in slide-in-from-bottom-4">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
                  전문가의 시간
                </span>
                을<br className="hidden md:block" /> 가장 저렴하게 구매하세요.
              </h1>
              <p className="text-slate-500 max-w-2xl mx-auto mb-10 text-lg md:text-xl leading-relaxed animate-in slide-in-from-bottom-5">
                수백 시간의 시행착오가 담긴 문서, 템플릿, 워크플로우를 단 몇
                만원에 소유하세요.
              </p>
            </div>
          </div>

          {/* Main Content */}
          <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
              <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
                <button
                  onClick={() => setSelectedCategory('전체')}
                  className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                    selectedCategory === '전체'
                      ? 'bg-slate-900 text-white border-slate-900'
                      : 'bg-white text-slate-500 border-slate-200'
                  }`}
                >
                  전체 보기
                </button>
                {CATEGORIES.filter((c) => c !== '전체').map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`whitespace-nowrap px-4 py-2 rounded-full text-sm font-bold transition-all border ${
                      selectedCategory === category
                        ? 'bg-slate-900 text-white border-slate-900'
                        : 'bg-white text-slate-500 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-10">
              {filteredProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={openProductModal}
                  onAddToCart={addToCart}
                />
              ))}
            </div>
          </main>
        </>
      )}

      {view === 'dashboard' && <Dashboard purchasedItems={purchasedItems} />}

      {view === 'expert' && (
        <ExpertLanding
          onStart={() =>
            showToast('전문가 등록 페이지로 이동합니다. (데모)', 'info')
          }
        />
      )}

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 py-16 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center md:text-left">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div>
              <h2 className="text-white text-xl font-bold mb-2">ProTemplate</h2>
              <p className="text-sm">전문 지식의 가치를 정당하게 거래합니다.</p>
            </div>
            <div className="flex gap-6 text-sm">
              <a href="#" className="hover:text-white">
                이용약관
              </a>
              <a href="#" className="hover:text-white">
                개인정보처리방침
              </a>
              <a href="#" className="hover:text-white">
                사업자정보확인
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <Modal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAddToCart={addToCart}
      />
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cart={cart}
        onRemove={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
}
