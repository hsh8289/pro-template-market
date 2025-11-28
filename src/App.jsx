import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, CheckCircle, FileText, Download, Briefcase, X, Layout, Menu, User, Shield, Lock, DollarSign, Bell, ChevronRight, Upload, BarChart3, HelpCircle, Settings, LogOut, MessageCircle, ChevronDown, Trash2, CreditCard } from 'lucide-react';

// --- Mock Data ---
const PRODUCTS = [
  {
    id: 1,
    title: "중소기업 월간 재무 결산 자동화 엑셀",
    category: "재무/회계",
    price: 45000,
    consultingPrice: 50000,
    author: "김회계사",
    rating: 4.9,
    reviews: 128,
    isBestSeller: true,
    type: "Excel",
    description: "더존/세무사랑 데이터를 복사해 넣으면 월간 손익계산서와 대시보드가 자동 생성되는 엑셀 템플릿입니다.",
    features: ["매출/매입 자동 분류", "현금흐름표 자동 생성", "경영진 보고용 대시보드 시트 포함", "계정과목 매핑 가이드"],
    authorBio: "빅4 회계법인 감사본부 출신으로, 현재 중소기업 30곳의 자문을 맡고 있습니다."
  },
  {
    id: 2,
    title: "임상시험 증례기록서(CRF) 표준 가이드라인",
    category: "의료/제약",
    price: 89000,
    consultingPrice: 100000,
    author: "박CRA",
    rating: 5.0,
    reviews: 42,
    type: "Word",
    description: "임상 1상/2상 진행 시 필수적인 CRF 작성 표준 가이드와 실제 승인된 프로토콜 예시가 포함되어 있습니다.",
    features: ["CDISC 표준 준수 항목", "데이터 매니지먼트 플랜(DMP) 초안", "IRB 제출용 체크리스트"],
    authorBio: "15년차 CRA/CRM으로 다수의 글로벌 임상 3상을 리딩했습니다."
  },
  {
    id: 3,
    title: "SaaS B2B 콜드메일 시퀀스 & CRM 세팅",
    category: "영업/마케팅",
    price: 55000,
    consultingPrice: 70000,
    author: "최영업",
    rating: 4.8,
    reviews: 215,
    isBestSeller: true,
    type: "Notion",
    description: "오픈율 40% 이상을 기록한 콜드메일 5단계 시퀀스와 노션 CRM 연동 템플릿입니다.",
    features: ["타겟 페르소나별 메일 스크립트", "노션-슬랙 자동 알림 설정 가이드", "팔로업 트래킹 보드"],
    authorBio: "맨땅에 헤딩하며 얻은 노하우입니다. 실제 응답률 8% 달성 스크립트."
  },
   {
    id: 4,
    title: "건설 현장 안전관리 일일 점검표",
    category: "건설",
    price: 30000,
    consultingPrice: 40000,
    author: "이현장",
    rating: 4.7,
    reviews: 89,
    type: "PDF",
    description: "중대재해처벌법 대응을 위한 필수 현장 안전 점검 리스트와 모바일 작성 최적화 양식입니다.",
    features: ["공종별 위험성 평가표", "TBM 일지 양식", "법적 필수 보존 서류 목록"],
    authorBio: "현장 안전관리 20년 경력. 중대재해처벌법 대응 최적화."
  },
];

const NOTICES = [
  { id: 1, title: "[공지] 3월 신규 전문가 등록 프로모션 안내 (수수료 0%)", date: "2024.03.01" },
  { id: 2, title: "[업데이트] 엑셀 파일 매크로 보안 설정 가이드", date: "2024.02.28" },
  { id: 3, title: "세금계산서 발행 프로세스 변경 안내", date: "2024.02.15" },
];

const FAQS = [
  { q: "구매한 파일은 어디서 다운로드하나요?", a: "구매 후 우측 상단 '내 라이브러리' 메뉴 혹은 가입하신 이메일로 발송된 링크를 통해 다운로드 가능합니다." },
  { q: "세금계산서 발행이 가능한가요?", a: "네, 가능합니다. 결제 단계에서 '사업자 증빙'을 선택하고 사업자 번호를 입력해주시면 익일 국세청으로 전송됩니다." },
  { q: "템플릿 수정 후 재판매해도 되나요?", a: "불가합니다. 구매하신 템플릿은 구매자 본인(또는 소속 팀)의 업무 목적으로만 사용 가능하며, 재판매 및 무단 배포는 저작권법 위반입니다." },
  { q: "전문가 등록 심사는 얼마나 걸리나요?", a: "신청 후 영업일 기준 약 3~5일이 소요됩니다. 포트폴리오 및 재직 증명 서류 검토 후 승인 여부를 알려드립니다." },
];

// --- Toast Component (Notification) ---
const Toast = ({ message, type, onClose }) => {
  useEffect(() => {
    const timer = setTimeout(onClose, 3000);
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className="fixed top-20 right-4 z-[100] animate-in slide-in-from-right duration-300">
      <div className={`flex items-center gap-3 px-6 py-4 rounded-xl shadow-2xl border ${type === 'success' ? 'bg-slate-900 text-white border-slate-800' : 'bg-white text-slate-800 border-slate-200'}`}>
        {type === 'success' ? <CheckCircle className="w-5 h-5 text-green-400" /> : <Bell className="w-5 h-5 text-blue-600" />}
        <span className="font-bold text-sm">{message}</span>
      </div>
    </div>
  );
};

// --- Sub Components ---

const ProductModal = ({ product, isOpen, onClose, onAddToCart }) => {
  const [activeTab, setActiveTab] = useState("details");
  const [includeConsulting, setIncludeConsulting] = useState(false);
  const [isTeamLicense, setIsTeamLicense] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setActiveTab("details");
      setIncludeConsulting(false);
      setIsTeamLicense(false);
    }
  }, [isOpen]);

  if (!isOpen || !product) return null;

  const teamLicensePrice = Math.round(product.price * 2.5);
  const finalPrice = (isTeamLicense ? teamLicensePrice : product.price) + (includeConsulting ? product.consultingPrice : 0);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-hidden shadow-2xl flex flex-col relative animate-in zoom-in-95">
        {/* Header */}
        <div className="sticky top-0 bg-white z-10 px-6 py-4 border-b border-slate-100 flex justify-between items-center">
          <h2 className="text-lg font-bold text-slate-800 truncate pr-4">{product.title}</h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full transition-colors">
            <X className="w-5 h-5 text-slate-500" />
          </button>
        </div>
        
        {/* Scrollable Content */}
        <div className="overflow-y-auto flex-1 p-6 custom-scrollbar">
          <div className="flex flex-col md:flex-row gap-6 mb-8">
            <div className="w-full md:w-1/3 bg-slate-100 rounded-xl h-48 flex items-center justify-center flex-col text-slate-400 border border-slate-200">
               <FileText className="w-16 h-16 mb-4 text-blue-500 opacity-50" />
               <span className="font-semibold text-sm">미리보기</span>
            </div>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <span className="px-2 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded">{product.category}</span>
                <span className="px-2 py-1 bg-slate-100 text-slate-600 text-xs font-bold rounded">{product.type}</span>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 mb-4">{product.title}</h1>
              <p className="text-slate-600 leading-relaxed text-sm mb-4">{product.description}</p>
              
              <div className="flex border-b border-slate-200 mb-4">
                {["details", "author"].map(tab => (
                  <button 
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`px-4 py-2 text-sm font-bold border-b-2 transition-colors capitalize ${activeTab === tab ? "border-blue-600 text-blue-600" : "border-transparent text-slate-500 hover:text-slate-700"}`}
                  >
                    {tab === 'details' ? '상세 정보' : '판매자 프로필'}
                  </button>
                ))}
              </div>

              {activeTab === 'details' ? (
                <ul className="space-y-2">
                  {product.features?.map((feature, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-700">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              ) : (
                <div className="bg-slate-50 p-4 rounded-xl border border-slate-100">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center font-bold text-blue-700">{product.author[0]}</div>
                    <div>
                      <p className="font-bold text-slate-900">{product.author}</p>
                      <p className="text-xs text-slate-500">인증된 전문가 <Shield className="w-3 h-3 inline text-green-500"/></p>
                    </div>
                  </div>
                  <p className="text-sm text-slate-600">{product.authorBio}</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-slate-200 p-4 shadow-lg">
          <div className="space-y-3 mb-4">
             <div className={`rounded-xl border transition-all cursor-pointer p-3 flex items-center justify-between hover:bg-slate-50 ${isTeamLicense ? 'border-purple-500 bg-purple-50' : 'border-slate-200'}`} onClick={() => setIsTeamLicense(!isTeamLicense)}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${isTeamLicense ? 'bg-purple-600 border-purple-600' : 'border-slate-300 bg-white'}`}>{isTeamLicense && <CheckCircle className="w-3.5 h-3.5 text-white" />}</div>
                <span className="font-bold text-sm text-slate-700">팀 라이선스 적용 (5인)</span>
              </div>
              <span className="font-bold text-purple-700">+{ (teamLicensePrice - product.price).toLocaleString()}원</span>
            </div>
            <div className={`rounded-xl border transition-all cursor-pointer p-3 flex items-center justify-between hover:bg-slate-50 ${includeConsulting ? 'border-blue-500 bg-blue-50' : 'border-slate-200'}`} onClick={() => setIncludeConsulting(!includeConsulting)}>
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded border flex items-center justify-center ${includeConsulting ? 'bg-blue-600 border-blue-600' : 'border-slate-300 bg-white'}`}>{includeConsulting && <CheckCircle className="w-3.5 h-3.5 text-white" />}</div>
                <span className="font-bold text-sm text-slate-700">저자 1:1 컨설팅 (30분)</span>
              </div>
              <span className="font-bold text-blue-700">+{product.consultingPrice.toLocaleString()}원</span>
            </div>
          </div>
          <div className="flex items-center justify-between gap-4">
            <div className="flex flex-col"><span className="text-xs text-slate-500">총 결제금액</span><span className="text-2xl font-bold text-slate-900">{finalPrice.toLocaleString()}원</span></div>
            <button onClick={() => { onAddToCart({ ...product, includeConsulting, isTeamLicense, finalPrice }); onClose(); }} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold py-3 px-6 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-lg">
              <ShoppingCart className="w-5 h-5" /> 장바구니 담기
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CartSidebar = ({ isOpen, onClose, cart, onRemove, onCheckout }) => {
  if (!isOpen) return null;
  const total = cart.reduce((sum, item) => sum + item.finalPrice, 0);

  return (
    <>
      <div className="fixed inset-0 bg-black/20 z-50 backdrop-blur-sm" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-full max-w-sm bg-white z-[60] shadow-2xl animate-in slide-in-from-right duration-300 flex flex-col">
        <div className="p-5 border-b border-slate-100 flex justify-between items-center bg-white">
          <h2 className="font-bold text-lg flex items-center gap-2 text-slate-800"><ShoppingCart className="w-5 h-5" /> 장바구니 <span className="text-blue-600 text-sm font-bold bg-blue-50 px-2 py-0.5 rounded-full">{cart.length}</span></h2>
          <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-full"><X className="w-5 h-5 text-slate-500" /></button>
        </div>
        <div className="flex-1 overflow-y-auto p-5 bg-slate-50">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-slate-400">
              <ShoppingCart className="w-12 h-12 opacity-20 mb-2" />
              <p>장바구니가 비어있습니다.</p>
            </div>
          ) : (
            <ul className="space-y-4">
              {cart.map((item, idx) => (
                <li key={`${item.id}-${idx}`} className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative group">
                  <h4 className="text-sm font-bold text-slate-800 truncate mb-1 pr-6">{item.title}</h4>
                  <div className="flex flex-wrap gap-1 mb-2">
                    {item.isTeamLicense && <span className="text-[10px] font-bold text-purple-600 bg-purple-50 px-2 py-0.5 rounded">팀 라이선스</span>}
                    {item.includeConsulting && <span className="text-[10px] font-bold text-blue-600 bg-blue-50 px-2 py-0.5 rounded">1:1 컨설팅</span>}
                  </div>
                  <div className="flex justify-between items-end">
                    <span className="font-bold text-slate-900">{item.finalPrice.toLocaleString()}원</span>
                  </div>
                  <button onClick={() => onRemove(idx)} className="absolute top-4 right-4 text-slate-300 hover:text-red-500 transition-colors p-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-5 bg-white border-t border-slate-200 shadow-lg">
           <div className="flex justify-between items-center mb-6"><span className="font-bold text-slate-800">총 결제금액</span><span className="text-2xl font-bold text-slate-900">{total.toLocaleString()}원</span></div>
           <button onClick={onCheckout} disabled={cart.length === 0} className="w-full bg-slate-900 hover:bg-slate-800 disabled:bg-slate-300 text-white font-bold py-4 rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg">
            <CreditCard className="w-5 h-5" /> 결제하기
          </button>
        </div>
      </div>
    </>
  );
};

// --- Pages ---

const LoginPage = ({ onLogin, loading }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="text-center mb-8">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-slate-900 rounded-xl text-white mb-4">
          <Layout className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-bold text-slate-900">ProTemplate 로그인</h1>
        <p className="text-slate-500 mt-2">전문가들의 지식 마켓에 오신 것을 환영합니다.</p>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">이메일</label>
          <input type="email" placeholder="user@example.com" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-1">비밀번호</label>
          <input type="password" placeholder="••••••••" className="w-full px-4 py-3 rounded-lg border border-slate-200 focus:ring-2 focus:ring-slate-900 outline-none transition-all" />
        </div>
        <button onClick={onLogin} disabled={loading} className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200 flex justify-center items-center gap-2">
          {loading ? (
             <>
               <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></span> 로그인 중...
             </>
          ) : "로그인하기"}
        </button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">또는</span></div>
        </div>
        <button onClick={() => alert("데모 버전입니다. 이메일 로그인을 이용해주세요.")} className="w-full bg-[#FAE100] text-[#371D1E] font-bold py-3.5 rounded-lg hover:bg-[#FCE620] transition-all flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5 fill-current" /> 카카오로 3초 만에 시작하기
        </button>
      </div>
      <p className="text-center text-sm text-slate-400 mt-6">
        아직 계정이 없으신가요? <span className="text-blue-600 font-bold cursor-pointer hover:underline">회원가입</span>
      </p>
    </div>
  </div>
);

const SellerDashboard = ({ showToast }) => (
  <div className="bg-slate-50 min-h-screen pb-20 animate-in fade-in">
    <div className="bg-white border-b border-slate-200 sticky top-16 z-10 px-6 py-4 flex justify-between items-center shadow-sm">
      <h2 className="text-lg font-bold flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-600"/> 판매자 센터</h2>
      <button onClick={() => showToast("템플릿 등록 페이지로 이동합니다 (데모)", "info")} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors shadow-lg shadow-blue-200 active:scale-95">
        <Upload className="w-4 h-4" /> 새 템플릿 등록
      </button>
    </div>
    
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        {[
          { label: "이번 달 수익", value: "2,450,000원", icon: DollarSign, color: "text-green-600", bg: "bg-green-50" },
          { label: "총 판매량", value: "128건", icon: Download, color: "text-blue-600", bg: "bg-blue-50" },
          { label: "평균 평점", value: "4.9점", icon: Star, color: "text-amber-500", bg: "bg-amber-50" },
          { label: "단골 고객", value: "34명", icon: Users, color: "text-purple-600", bg: "bg-purple-50" },
        ].map((stat, idx) => (
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow cursor-pointer" onClick={() => showToast(`${stat.label} 상세 통계를 불러옵니다`, "info")}>
            <div className="flex justify-between items-start mb-4">
              <div className={`p-3 rounded-lg ${stat.bg} ${stat.color}`}>
                <stat.icon className="w-6 h-6" />
              </div>
              <span className="text-xs font-bold text-slate-400 bg-slate-50 px-2 py-1 rounded">+12% (전월대비)</span>
            </div>
            <p className="text-sm text-slate-500 mb-1">{stat.label}</p>
            <h3 className="text-2xl font-bold text-slate-900">{stat.value}</h3>
          </div>
        ))}
      </div>

      {/* Chart Simulation */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
          <BarChart3 className="w-5 h-5 text-slate-400" /> 매출 추이 (최근 6개월)
        </h3>
        <div className="h-64 flex items-end justify-between gap-4 px-4 pb-4 border-b border-slate-100">
          {[40, 65, 45, 80, 55, 90].map((h, i) => (
            <div key={i} onClick={() => showToast(`${i+10}월 매출 상세 내역입니다.`, "info")} className="w-full bg-blue-50 rounded-t-lg relative group cursor-pointer hover:bg-blue-100 transition-colors" style={{ height: `${h}%` }}>
              <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-slate-900 text-white text-xs font-bold px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {h * 5}만원
              </div>
            </div>
          ))}
        </div>
        <div className="flex justify-between px-4 mt-2 text-xs text-slate-400 font-bold">
          <span>10월</span><span>11월</span><span>12월</span><span>1월</span><span>2월</span><span>3월</span>
        </div>
      </div>

      {/* Product Management */}
      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 flex justify-between items-center">
           <h3 className="font-bold text-slate-900">등록된 상품 관리</h3>
           <button onClick={() => showToast("전체 상품 목록으로 이동", "info")} className="text-sm text-slate-500 hover:text-blue-600 font-medium">전체 보기</button>
        </div>
        <table className="w-full text-sm text-left">
          <thead className="bg-slate-50 text-slate-500 font-medium">
            <tr>
              <th className="px-6 py-4">상품명</th>
              <th className="px-6 py-4">가격</th>
              <th className="px-6 py-4">상태</th>
              <th className="px-6 py-4">관리</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {PRODUCTS.slice(0, 3).map(p => (
              <tr key={p.id} className="hover:bg-slate-50/50 transition-colors">
                <td className="px-6 py-4 font-medium text-slate-900">{p.title}</td>
                <td className="px-6 py-4">{p.price.toLocaleString()}원</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">판매중</span></td>
                <td className="px-6 py-4">
                  <button onClick={() => showToast(`[${p.title}] 수정 화면으로 이동`, "info")} className="text-blue-600 hover:underline font-medium mr-3">수정</button>
                  <button onClick={() => showToast(`[${p.title}] 판매를 중지했습니다`, "success")} className="text-slate-400 hover:text-red-500 font-medium">중지</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

const SupportPage = ({ showToast }) => {
  const [activeFaq, setActiveFaq] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredFaqs = FAQS.filter(f => f.q.includes(searchQuery) || f.a.includes(searchQuery));

  return (
    <div className="max-w-4xl mx-auto px-4 py-12 animate-in fade-in">
      <div className="text-center mb-12">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">무엇을 도와드릴까요?</h1>
        <div className="relative max-w-lg mx-auto">
          <input 
            type="text" 
            placeholder="궁금한 내용을 검색해보세요 (예: 환불, 세금계산서)" 
            className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-slate-900 outline-none transition-all"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-8 mb-12">
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm h-fit">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-blue-600" /> 공지사항</h3>
          <ul className="space-y-1">
            {NOTICES.map(notice => (
              <li key={notice.id} onClick={() => showToast("공지사항 상세 내용은 준비중입니다.", "info")} className="flex justify-between items-start cursor-pointer hover:bg-slate-50 p-3 rounded-lg -mx-2 transition-colors group">
                <span className="text-slate-700 text-sm line-clamp-1 group-hover:text-blue-600 font-medium">{notice.title}</span>
                <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{notice.date}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-green-600" /> 자주 묻는 질문</h3>
          <ul className="space-y-2 text-sm text-slate-600">
            {filteredFaqs.length > 0 ? filteredFaqs.map((faq, idx) => (
              <li key={idx} className="border-b border-slate-50 last:border-0 pb-2 last:pb-0">
                <button 
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)} 
                  className="w-full flex items-center justify-between text-left py-2 hover:text-blue-600 font-medium transition-colors"
                >
                  <span className="pr-4">Q. {faq.q}</span>
                  <ChevronDown className={`w-4 h-4 text-slate-300 transition-transform ${activeFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {activeFaq === idx && (
                  <div className="bg-slate-50 p-3 rounded-lg mt-1 text-slate-500 text-xs leading-relaxed animate-in slide-in-from-top-1">
                    {faq.a}
                  </div>
                )}
              </li>
            )) : (
              <li className="text-center py-4 text-slate-400">검색 결과가 없습니다.</li>
            )}
          </ul>
        </div>
      </div>
      
      <div className="text-center">
         <p className="text-slate-500 mb-4">원하는 답변을 찾지 못하셨나요?</p>
         <button onClick={() => showToast("1:1 문의하기 창을 엽니다", "info")} className="bg-white border border-slate-200 text-slate-700 font-bold py-3 px-8 rounded-full hover:bg-slate-50 hover:border-slate-300 transition-all shadow-sm">
           1:1 문의하기
         </button>
      </div>
    </div>
  );
};

// --- Main App ---
export default function ProTemplateApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [view, setView] = useState("home"); // login, home, seller, support
  const [cart, setCart] = useState([]);
  const [toast, setToast] = useState(null);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Actions
  const showToast = (message, type = 'success') => setToast({ message, type });

  const handleLogin = () => {
    setIsLoginLoading(true);
    setTimeout(() => {
      setIsLoggedIn(true);
      setIsLoginLoading(false);
      setView("home");
      showToast("환영합니다! 김대표님", "success");
    }, 1000);
  };

  const handleLogout = () => {
    if(window.confirm("로그아웃 하시겠습니까?")) {
      setIsLoggedIn(false);
      setView("home");
      setCart([]);
    }
  };

  const addToCart = (productWithOption) => {
    setCart([...cart, productWithOption]);
    setIsCartOpen(true);
    showToast("장바구니에 상품이 담겼습니다.", "success");
  };

  const removeFromCart = (idx) => {
    const newCart = cart.filter((_, i) => i !== idx);
    setCart(newCart);
  };

  const handleCheckout = () => {
    if(window.confirm(`총 ${cart.length}건의 상품을 결제하시겠습니까?`)) {
      setIsCartOpen(false);
      showToast("결제가 성공적으로 완료되었습니다.", "success");
      setCart([]); // Cart Clear simulation
    }
  };

  const openProductModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} loading={isLoginLoading} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}

      {/* Header */}
      <nav className="sticky top-0 z-30 bg-white border-b border-slate-200 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView("home")}>
            <div className="bg-slate-900 text-white p-1.5 rounded-lg"><Layout className="w-6 h-6" /></div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">ProTemplate</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => setView("home")} className={`transition-colors hover:text-slate-900 ${view === 'home' ? 'text-blue-600 font-bold' : ''}`}>마켓플레이스</button>
            <button onClick={() => setView("seller")} className={`transition-colors hover:text-slate-900 ${view === 'seller' ? 'text-blue-600 font-bold' : ''}`}>판매자 센터</button>
            <button onClick={() => setView("support")} className={`transition-colors hover:text-slate-900 ${view === 'support' ? 'text-blue-600 font-bold' : ''}`}>고객센터</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors" onClick={() => showToast("내 정보 수정 페이지는 준비중입니다.", "info")}>
              <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center text-white"><User className="w-3 h-3"/></div>
              <span>김대표님</span>
            </div>
            <button onClick={() => setIsCartOpen(true)} className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-slate-600" />
              {cart.length > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-in zoom-in">{cart.length}</span>}
            </button>
             <button onClick={handleLogout} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full transition-colors" title="로그아웃">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      {view === "home" && (
        <main className="max-w-7xl mx-auto px-4 py-12 animate-in fade-in">
           <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">전문가의 지식을 탐색하세요</h1>
              <p className="text-slate-500">검증된 템플릿으로 업무 시간을 획기적으로 단축할 수 있습니다.</p>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {PRODUCTS.map(product => (
               <div key={product.id} onClick={() => openProductModal(product)} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer group h-full flex flex-col">
                  <div className="h-40 bg-slate-100 flex items-center justify-center relative overflow-hidden">
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-full border border-slate-100 z-10">{product.type}</div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"/>
                    <FileText className="w-12 h-12 text-blue-600 opacity-80 group-hover:scale-110 transition-transform duration-500" />
                  </div>
                  <div className="p-5 flex-1 flex flex-col">
                    <div className="text-xs font-bold text-blue-600 mb-1">{product.category}</div>
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-1 group-hover:text-blue-600 transition-colors">{product.title}</h3>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-slate-50">
                       <span className="font-bold text-lg">{product.price.toLocaleString()}원</span>
                       <div className="flex items-center text-amber-500 text-xs font-bold"><Star className="w-3 h-3 fill-current mr-1"/>{product.rating}</div>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </main>
      )}

      {view === "seller" && <SellerDashboard showToast={showToast} />}
      {view === "support" && <SupportPage showToast={showToast} />}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-12 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-slate-900 text-lg mb-4">ProTemplate</h4>
            <p className="mb-4 max-w-sm">우리는 지식의 가치를 믿습니다. 누구나 자신의 노하우를 판매하고, 필요한 지식을 가장 쉽고 빠르게 얻을 수 있는 세상을 만듭니다.</p>
            <div className="flex gap-4">
              <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">B</button>
              <button className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer transition-colors">I</button>
            </div>
          </div>
          <div>
            <h4 className="font-bold text-slate-900 mb-4">회사 정보</h4>
            <ul className="space-y-2">
              <li>대표이사: 홍길동 | 사업자등록번호: 123-45-67890</li>
              <li>주소: 서울특별시 강남구 테헤란로 123</li>
              <li>통신판매업신고: 2024-서울강남-00000</li>
              <li>이메일: help@protemplate.com</li>
            </ul>
          </div>
          <div>
             <h4 className="font-bold text-slate-900 mb-4">고객 지원</h4>
             <ul className="space-y-2">
               <li className="hover:text-blue-600 cursor-pointer transition-colors">이용약관</li>
               <li className="font-bold text-slate-800 cursor-pointer hover:text-blue-600 transition-colors">개인정보처리방침</li>
               <li className="hover:text-blue-600 cursor-pointer transition-colors">환불 정책</li>
               <li className="hover:text-blue-600 cursor-pointer transition-colors">제휴 문의</li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-100 text-center text-xs">
          © 2024 ProTemplate Inc. All rights reserved.
        </div>
      </footer>

      {/* Global Components */}
      <ProductModal 
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