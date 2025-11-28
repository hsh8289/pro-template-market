import React, { useState, useEffect } from 'react';
import { Search, ShoppingCart, Star, CheckCircle, FileText, Download, Briefcase, X, Layout, Menu, User, Shield, Lock, DollarSign, Bell, ChevronRight, Upload, BarChart3, HelpCircle, Settings, LogOut, MessageCircle } from 'lucide-react';

// --- Mock Data ---
const PRODUCTS = [
  {
    id: 1,
    title: "중소기업 월간 재무 결산 자동화 엑셀",
    category: "재무/회계",
    price: 45000,
    author: "김회계사",
    rating: 4.9,
    reviews: 128,
    isBestSeller: true,
    type: "Excel",
    description: "더존/세무사랑 데이터를 복사해 넣으면 월간 손익계산서와 대시보드가 자동 생성되는 엑셀 템플릿입니다.",
  },
  {
    id: 2,
    title: "임상시험 증례기록서(CRF) 표준 가이드라인",
    category: "의료/제약",
    price: 89000,
    author: "박CRA",
    rating: 5.0,
    reviews: 42,
    type: "Word",
    description: "임상 1상/2상 진행 시 필수적인 CRF 작성 표준 가이드와 실제 승인된 프로토콜 예시가 포함되어 있습니다.",
  },
  {
    id: 3,
    title: "SaaS B2B 콜드메일 시퀀스 & CRM 세팅",
    category: "영업/마케팅",
    price: 55000,
    author: "최영업",
    rating: 4.8,
    reviews: 215,
    isBestSeller: true,
    type: "Notion",
    description: "오픈율 40% 이상을 기록한 콜드메일 5단계 시퀀스와 노션 CRM 연동 템플릿입니다.",
  },
   {
    id: 4,
    title: "건설 현장 안전관리 일일 점검표",
    category: "건설",
    price: 30000,
    author: "이현장",
    rating: 4.7,
    reviews: 89,
    type: "PDF",
    description: "중대재해처벌법 대응을 위한 필수 현장 안전 점검 리스트와 모바일 작성 최적화 양식입니다.",
  },
];

const NOTICES = [
  { id: 1, title: "[공지] 3월 신규 전문가 등록 프로모션 안내 (수수료 0%)", date: "2024.03.01" },
  { id: 2, title: "[업데이트] 엑셀 파일 매크로 보안 설정 가이드", date: "2024.02.28" },
  { id: 3, title: "세금계산서 발행 프로세스 변경 안내", date: "2024.02.15" },
];

// --- Components ---

// 1. Login Page
const LoginPage = ({ onLogin }) => (
  <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
    <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md border border-slate-100">
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
        <button onClick={onLogin} className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-lg hover:bg-slate-800 transition-all shadow-lg shadow-slate-200">
          로그인하기
        </button>
        <div className="relative my-6">
          <div className="absolute inset-0 flex items-center"><div className="w-full border-t border-slate-200"></div></div>
          <div className="relative flex justify-center text-sm"><span className="px-2 bg-white text-slate-500">또는</span></div>
        </div>
        <button className="w-full bg-[#FAE100] text-[#371D1E] font-bold py-3.5 rounded-lg hover:bg-[#FCE620] transition-all flex items-center justify-center gap-2">
          <MessageCircle className="w-5 h-5 fill-current" /> 카카오로 3초 만에 시작하기
        </button>
      </div>
      <p className="text-center text-sm text-slate-400 mt-6">
        아직 계정이 없으신가요? <span className="text-blue-600 font-bold cursor-pointer hover:underline">회원가입</span>
      </p>
    </div>
  </div>
);

// 2. Seller Dashboard (New!)
const SellerDashboard = () => (
  <div className="bg-slate-50 min-h-screen pb-20">
    <div className="bg-white border-b border-slate-200 sticky top-0 z-10 px-6 py-4 flex justify-between items-center">
      <h2 className="text-lg font-bold flex items-center gap-2"><Briefcase className="w-5 h-5 text-blue-600"/> 판매자 센터</h2>
      <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-blue-700 transition-colors">
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
          <div key={idx} className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
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
            <div key={i} className="w-full bg-blue-50 rounded-t-lg relative group cursor-pointer hover:bg-blue-100 transition-colors" style={{ height: `${h}%` }}>
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
           <button className="text-sm text-slate-500 hover:text-blue-600 font-medium">전체 보기</button>
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
              <tr key={p.id} className="hover:bg-slate-50/50">
                <td className="px-6 py-4 font-medium text-slate-900">{p.title}</td>
                <td className="px-6 py-4">{p.price.toLocaleString()}원</td>
                <td className="px-6 py-4"><span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">판매중</span></td>
                <td className="px-6 py-4">
                  <button className="text-blue-600 hover:underline font-medium mr-3">수정</button>
                  <button className="text-slate-400 hover:text-red-500 font-medium">중지</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  </div>
);

// 3. Support/Community Page (New!)
const SupportPage = () => (
  <div className="max-w-4xl mx-auto px-4 py-12">
    <div className="text-center mb-12">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">무엇을 도와드릴까요?</h1>
      <div className="relative max-w-lg mx-auto">
        <input type="text" placeholder="궁금한 내용을 검색해보세요 (예: 환불, 세금계산서)" className="w-full pl-12 pr-4 py-3 rounded-full border border-slate-200 shadow-sm focus:ring-2 focus:ring-slate-900 outline-none" />
        <Search className="absolute left-4 top-3.5 w-5 h-5 text-slate-400" />
      </div>
    </div>

    <div className="grid md:grid-cols-2 gap-8 mb-12">
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><Bell className="w-5 h-5 text-blue-600" /> 공지사항</h3>
        <ul className="space-y-3">
          {NOTICES.map(notice => (
            <li key={notice.id} className="flex justify-between items-start cursor-pointer hover:bg-slate-50 p-2 rounded -mx-2 transition-colors">
              <span className="text-slate-700 text-sm line-clamp-1">{notice.title}</span>
              <span className="text-xs text-slate-400 whitespace-nowrap ml-2">{notice.date}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
        <h3 className="font-bold text-lg mb-4 flex items-center gap-2"><HelpCircle className="w-5 h-5 text-green-600" /> 자주 묻는 질문</h3>
        <ul className="space-y-3 text-sm text-slate-600">
          <li className="cursor-pointer hover:text-blue-600 flex items-center justify-between">
            Q. 구매한 파일은 어디서 다운로드하나요? <ChevronRight className="w-4 h-4 text-slate-300" />
          </li>
          <li className="cursor-pointer hover:text-blue-600 flex items-center justify-between">
            Q. 세금계산서 발행이 가능한가요? <ChevronRight className="w-4 h-4 text-slate-300" />
          </li>
          <li className="cursor-pointer hover:text-blue-600 flex items-center justify-between">
            Q. 템플릿 수정 후 재판매해도 되나요? <ChevronRight className="w-4 h-4 text-slate-300" />
          </li>
          <li className="cursor-pointer hover:text-blue-600 flex items-center justify-between">
            Q. 전문가 등록 심사는 얼마나 걸리나요? <ChevronRight className="w-4 h-4 text-slate-300" />
          </li>
        </ul>
      </div>
    </div>
  </div>
);

// --- Main App ---
export default function ProTemplateApp() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [view, setView] = useState("home"); // login, home, seller, support
  const [cart, setCart] = useState([]);

  // Login Handler (Simulated)
  const handleLogin = () => {
    setIsLoggedIn(true);
    setView("home");
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <nav className="sticky top-0 z-30 bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => setView("home")}>
            <div className="bg-slate-900 text-white p-1.5 rounded-lg"><Layout className="w-6 h-6" /></div>
            <span className="text-xl font-extrabold tracking-tight text-slate-900">ProTemplate</span>
          </div>
          
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-600">
            <button onClick={() => setView("home")} className={`hover:text-slate-900 ${view === 'home' ? 'text-blue-600 font-bold' : ''}`}>마켓플레이스</button>
            <button onClick={() => setView("seller")} className={`hover:text-slate-900 ${view === 'seller' ? 'text-blue-600 font-bold' : ''}`}>판매자 센터</button>
            <button onClick={() => setView("support")} className={`hover:text-slate-900 ${view === 'support' ? 'text-blue-600 font-bold' : ''}`}>고객센터</button>
          </div>

          <div className="flex items-center gap-4">
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-100 rounded-full text-xs font-bold text-slate-600 cursor-pointer hover:bg-slate-200 transition-colors">
              <div className="w-6 h-6 bg-slate-300 rounded-full flex items-center justify-center text-white"><User className="w-3 h-3"/></div>
              <span>김대표님</span>
            </div>
            <button className="relative p-2 hover:bg-slate-100 rounded-full transition-colors">
              <ShoppingCart className="w-6 h-6 text-slate-600" />
              {cart.length > 0 && <span className="absolute top-1 right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">{cart.length}</span>}
            </button>
             <button onClick={() => setIsLoggedIn(false)} className="p-2 hover:bg-red-50 text-slate-400 hover:text-red-500 rounded-full" title="로그아웃">
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </nav>

      {/* Content Area */}
      {view === "home" && (
        <main className="max-w-7xl mx-auto px-4 py-12">
           <div className="text-center mb-16">
              <h1 className="text-4xl font-extrabold text-slate-900 mb-4">전문가의 지식을 탐색하세요</h1>
              <p className="text-slate-500">검증된 템플릿으로 업무 시간을 획기적으로 단축할 수 있습니다.</p>
           </div>
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
             {PRODUCTS.map(product => (
               <div key={product.id} className="bg-white rounded-xl border border-slate-200 overflow-hidden hover:shadow-lg transition-all cursor-pointer group">
                  <div className="h-40 bg-slate-100 flex items-center justify-center relative">
                    <div className="absolute top-3 left-3 bg-white/90 backdrop-blur text-[10px] font-bold px-2 py-1 rounded-full border border-slate-100">{product.type}</div>
                    <FileText className="w-12 h-12 text-blue-600 opacity-80 group-hover:scale-110 transition-transform" />
                  </div>
                  <div className="p-5">
                    <div className="text-xs font-bold text-blue-600 mb-1">{product.category}</div>
                    <h3 className="font-bold text-slate-900 mb-2 line-clamp-1">{product.title}</h3>
                    <div className="flex items-center justify-between mt-4">
                       <span className="font-bold text-lg">{product.price.toLocaleString()}원</span>
                       <div className="flex items-center text-amber-500 text-xs font-bold"><Star className="w-3 h-3 fill-current mr-1"/>{product.rating}</div>
                    </div>
                  </div>
               </div>
             ))}
           </div>
        </main>
      )}

      {view === "seller" && <SellerDashboard />}
      {view === "support" && <SupportPage />}

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 mt-20 py-12 text-sm text-slate-500">
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-2">
            <h4 className="font-bold text-slate-900 text-lg mb-4">ProTemplate</h4>
            <p className="mb-4 max-w-sm">우리는 지식의 가치를 믿습니다. 누구나 자신의 노하우를 판매하고, 필요한 지식을 가장 쉽고 빠르게 얻을 수 있는 세상을 만듭니다.</p>
            <div className="flex gap-4">
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer">Blog</div>
              <div className="w-8 h-8 bg-slate-100 rounded-full flex items-center justify-center hover:bg-slate-200 cursor-pointer">Insta</div>
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
               <li className="hover:text-blue-600 cursor-pointer">이용약관</li>
               <li className="font-bold text-slate-800 cursor-pointer">개인정보처리방침</li>
               <li className="hover:text-blue-600 cursor-pointer">환불 정책</li>
               <li className="hover:text-blue-600 cursor-pointer">제휴 문의</li>
             </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-100 text-center text-xs">
          © 2024 ProTemplate Inc. All rights reserved.
        </div>
      </footer>
    </div>
  );
}