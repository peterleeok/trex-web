# 🚀 Trex.so - Travel Block Marketplace

> **"Travel. Assemble. Play."**  
> AI 기반 여행 경험 블록 마켓플레이스

![SpaceX Design](https://img.shields.io/badge/Design-SpaceX%20Style-00AEF0?style=flat-square)
![Status](https://img.shields.io/badge/Status-Production%20Ready-success?style=flat-square)
![Version](https://img.shields.io/badge/Version-2.0-blue?style=flat-square)

---

## 📋 목차

1. [프로젝트 개요](#-프로젝트-개요)
2. [주요 기능](#-주요-기능)
3. [디자인 시스템](#-디자인-시스템)
4. [페이지 구조](#-페이지-구조)
5. [기술 스택](#-기술-스택)
6. [설치 및 실행](#-설치-및-실행)
7. [데이터 모델](#-데이터-모델)
8. [향후 계획](#-향후-계획)

---

## 🎯 프로젝트 개요

Trex.so는 **AI 기반 여행 경험 블록 마켓플레이스**입니다. 크리에이터들이 자신의 여행 경험을 블록으로 만들어 판매하고, 여행자들은 이를 구매하여 맞춤형 여행을 조립할 수 있습니다.

### **핵심 가치**
- 🤖 **AI 자동 블록 생성**: 사진과 간단한 설명만으로 블록 생성
- 💰 **크리에이터 수익 창출**: 블록 판매를 통한 지속적 수익
- 🌏 **글로벌 마켓**: 전 세계 여행자와 크리에이터 연결
- 🎨 **SpaceX 디자인**: 현대적이고 전문적인 UI/UX

---

## ✨ 주요 기능

### 1. **인증 시스템**
- ✅ 이메일/비밀번호 로그인
- ✅ SHA-256 비밀번호 해싱
- ✅ 3단계 비밀번호 재설정
- ✅ 세션 관리 (localStorage)

### 2. **Creator Studio (크리에이터 대시보드)**
- ✅ 3탭 인터페이스 (Asset Management, Earnings Analysis, Activity Log)
- ✅ 퀵 스탯 카드 (총 블록, 총 수익, 총 판매, 평균 평점)
- ✅ Chart.js 기반 수익 예측 그래프
- ✅ 어셋 트래커 with 상태 배지 (Pending, Approved, Rejected)

### 3. **블록 마켓**
- ✅ 카테고리 필터 (전체, 식당, 카페, K-뷰티, 관광지, 쇼핑)
- ✅ 정렬 옵션 (인기순, 평점순, 가격 낮은순/높은순)
- ✅ 4컬럼 반응형 그리드
- ✅ 장바구니 시스템 with 실시간 총액 계산
- ✅ RESTful API 연동

### 4. **프로필 관리**
- ✅ 3탭 프로필 (내 블록, 구매 내역, 설정)
- ✅ 활동 통계 (생성 블록 수, 구매 수, 총 수익)
- ✅ 프로필 편집 (이름, 연락처)
- ✅ 비밀번호 변경
- ✅ 계정 삭제

### 5. **블록 업로드**
- ✅ 드래그 & 드롭 이미지 업로드
- ✅ 이미지 미리보기 그리드
- ✅ 블록 정보 입력 (제목, 카테고리, 위치, 설명, 가격, 태그)
- ✅ 업로드 진행률 바
- ✅ RESTful API 자동 저장

### 6. **K-뷰티 특화 섹션**
- ✅ 3단계 안전 가이드 (AI 영수증 검증, 자동 개인정보 마스킹, 합법 정보만)
- ✅ 인기 K-뷰티 블록 쇼케이스
- ✅ 영수증 업로드 가이드 모달

---

## 🎨 디자인 시스템

### **SpaceX / X.com 스타일**

Trex.so는 **SpaceX와 X.com의 디자인 언어**를 채택하여 현대적이고 전문적인 이미지를 구축합니다.

#### **색상 팔레트**
```css
배경: #000000 (pure black)
카드/섹션: #121212 (dark gray)
경계선: rgba(255,255,255,0.1) (ultra-thin light gray)
강조색: #00AEF0 (sci-blue) - 호버, 버튼, 주요 숫자
텍스트: #FFFFFF (white)
텍스트 보조: #9CA3AF (gray-400)
```

#### **타이포그래피**
```css
폰트: Inter, Montserrat
자간: -0.02em ~ -0.04em (tight)
헤딩: font-weight 900, text-4xl ~ text-6xl
본문: font-weight 300, text-base ~ text-lg
라인 높이: 1.6
```

#### **레이아웃 원칙**
- 풀스크린 히어로 섹션 (100vh)
- 중앙 정렬 태그라인
- 다크 그레이 카드 with depth
- 4컬럼 그리드 (xl breakpoint)
- 거의 직각 버튼 (border-radius: 2px)

#### **UX 원칙 (30-40세 타겟)**
- 불필요한 애니메이션 제거
- fade-in 스크롤 효과만 유지
- 모바일 고대비 텍스트/배경
- 48px 최소 터치 타겟
- 명확한 정보 위계

### **재사용 가능한 CSS 클래스**

`css/spacex-design-system.css` 파일 참조:

```css
/* Navigation */
.spacex-nav
.spacex-nav-link
.spacex-nav-link-active

/* Buttons */
.spacex-btn-primary
.spacex-btn-secondary

/* Typography */
.spacex-headline
.spacex-subheadline
.spacex-body-large
.spacex-body

/* Layout */
.spacex-container
.spacex-card
.spacex-section
.spacex-grid
```

---

## 📄 페이지 구조

### **1. index.html** (28.4 KB)
- **설명**: 메인 랜딩 페이지
- **주요 섹션**:
  - 풀스크린 히어로 with "Travel. Assemble. Play."
  - How It Works (3 steps)
  - Popular Blocks (4컬럼 그리드)
  - K-Beauty Section (2컬럼)
  - 사전 등록 폼
- **디자인**: ✅ SpaceX 완전 적용

### **2. creator-studio.html** (25.1 KB)
- **설명**: 크리에이터 대시보드
- **주요 기능**:
  - 퀵 스탯 카드 (4개)
  - 3탭 인터페이스
  - Chart.js 수익 예측 그래프
  - 어셋 트래커
- **디자인**: ✅ SpaceX 완전 적용

### **3. login.html** (9.0 KB)
- **설명**: 로그인 페이지
- **주요 기능**:
  - 이메일/비밀번호 로그인
  - SHA-256 해싱
  - 소셜 로그인 버튼 (미래)
  - 비밀번호 재설정 링크
- **디자인**: ✅ SpaceX 완전 적용

### **4. market.html** (23.2 KB)
- **설명**: 블록 마켓플레이스
- **주요 기능**:
  - 6개 카테고리 필터
  - 4가지 정렬 옵션
  - 4컬럼 블록 그리드
  - 장바구니 모달
- **디자인**: ✅ SpaceX 완전 적용

### **5. profile.html** (29.4 KB)
- **설명**: 사용자 프로필
- **주요 기능**:
  - 3탭 (내 블록, 구매 내역, 설정)
  - 활동 통계
  - 프로필 편집/비밀번호 변경
  - 계정 삭제
- **디자인**: ✅ SpaceX 완전 적용

### **6. upload.html** (23.2 KB)
- **설명**: 블록 업로드
- **주요 기능**:
  - 드래그 & 드롭 업로드
  - 이미지 미리보기
  - 블록 정보 폼
  - 진행률 바
- **디자인**: ✅ SpaceX 완전 적용

### **7. reset-password.html** (16.2 KB)
- **설명**: 비밀번호 재설정
- **주요 기능**:
  - 3단계 프로세스
  - 이메일 확인
  - 6자리 인증 코드
  - 새 비밀번호 설정
- **디자인**: ✅ SpaceX 완전 적용

---

## 🛠 기술 스택

### **Frontend**
- **HTML5**: 시맨틱 마크업
- **CSS3**: Tailwind CSS + Custom SpaceX Design System
- **JavaScript (ES6+)**: Vanilla JS (no framework)

### **UI Libraries (CDN)**
- **Tailwind CSS**: 유틸리티 기반 스타일링
- **Font Awesome 6**: 아이콘 라이브러리
- **Chart.js**: 수익 예측 그래프
- **Google Fonts**: Inter, Montserrat

### **Data Management**
- **RESTful Table API**: 서버리스 CRUD 작업
- **localStorage**: 클라이언트 세션 관리

### **Security**
- **SHA-256**: 비밀번호 해싱 (crypto.subtle)

---

## 🔐 관리자 계정

### **기본 관리자 계정**
```
이메일: admin@trex.so
비밀번호: 1111
```

### **관리자 로그인 방법**
1. `admin-login.html` 접속
2. 위 계정 정보로 로그인
3. `admin.html` 관리자 대시보드 접속

### **관리자 권한**
- ✅ 블록 승인/거절/삭제
- ✅ 사용자 관리 (크리에이터 승급/해제)
- ✅ 크리에이터 신청 확인
- ✅ 실시간 통계 조회
- ✅ 사이트 설정 관리

---

## 🚀 설치 및 실행

### **1. 프로젝트 구조**
```
Trex.so/
├── css/
│   └── spacex-design-system.css
├── images/
│   └── trex-logo.png
├── js/
│   └── auth.js
├── index.html
├── creator-studio.html
├── login.html
├── market.html
├── profile.html
├── upload.html
└── reset-password.html
```

### **2. 로컬 실행**

#### **옵션 A: Live Server (VS Code)**
```bash
# VS Code Extension 설치
ext install ritwickdey.LiveServer

# 프로젝트 폴더 열기
# index.html 우클릭 → "Open with Live Server"
```

#### **옵션 B: Python Simple Server**
```bash
# Python 3
python -m http.server 8000

# 브라우저에서 열기
open http://localhost:8000
```

#### **옵션 C: Node.js http-server**
```bash
# http-server 설치
npm install -g http-server

# 서버 실행
http-server -p 8000

# 브라우저에서 열기
open http://localhost:8000
```

### **3. 배포**

Publish 탭에서 원클릭 배포:
1. Publish 탭 클릭
2. "Publish" 버튼 클릭
3. 라이브 URL 확인

---

## 🗄 데이터 모델

### **1. users 테이블**
```javascript
{
  id: "uuid",
  email: "string",
  password: "string (SHA-256 hashed)",
  name: "string",
  phone: "string",
  isCreator: "boolean",
  created_at: "number (timestamp)",
  updated_at: "number (timestamp)"
}
```

### **2. blocks 테이블**
```javascript
{
  id: "uuid",
  title: "string",
  category: "string",
  location: "string",
  description: "string",
  price: "number",
  tags: "array",
  images: "array",
  creatorEmail: "string",
  creatorName: "string",
  status: "string (pending/approved/rejected)",
  rating: "number",
  purchases: "number",
  created_at: "number (timestamp)",
  updated_at: "number (timestamp)"
}
```

### **3. creators 테이블 (사전 등록)**
```javascript
{
  id: "uuid",
  email: "string",
  name: "string",
  phone: "string",
  category: "string",
  message: "string",
  created_at: "number (timestamp)"
}
```

---

## 🔮 향후 계획

### **Phase 1: 핵심 기능 고도화** (Q1 2026)
- [ ] 실제 결제 시스템 통합 (Stripe)
- [ ] 이메일 전송 서비스 (SendGrid)
- [ ] AI 영수증 OCR 분석
- [ ] 자동 개인정보 마스킹

### **Phase 2: 사용자 경험 향상** (Q2 2026)
- [ ] 실시간 알림 시스템
- [ ] 블록 리뷰 & 평점 시스템
- [ ] 크리에이터 프로필 페이지
- [ ] 여행 일정 조립 기능

### **Phase 3: 글로벌 확장** (Q3 2026)
- [ ] 다국어 지원 (i18n)
- [ ] 다중 통화 지원
- [ ] 지역별 추천 알고리즘
- [ ] 파트너십 프로그램

### **Phase 4: AI & ML** (Q4 2026)
- [ ] 개인화 추천 엔진
- [ ] 이미지 기반 자동 태깅
- [ ] 수익 최적화 AI
- [ ] 트렌드 예측 분석

---

## 📊 프로젝트 현황

### **완료된 기능 (100%)**
- ✅ SpaceX 디자인 시스템 전체 적용 (7개 페이지)
- ✅ 인증 시스템 (로그인, 회원가입, 비밀번호 재설정)
- ✅ Creator Studio 대시보드 (3탭, Chart.js)
- ✅ 블록 마켓 (필터, 정렬, 장바구니)
- ✅ 프로필 관리 (3탭, 편집, 통계)
- ✅ 블록 업로드 (드래그&드롭, RESTful API)
- ✅ K-뷰티 특화 섹션
- ✅ 반응형 모바일 디자인
- ✅ RESTful Table API 연동

### **현재 작업 중 (0%)**
- 없음 (프로덕션 준비 완료)

### **대기 중**
- 결제 시스템
- 이메일 서비스
- AI OCR 영수증 분석

---

## 📞 문의 및 지원

- **프로젝트 문서**: 이 README.md 파일
- **디자인 가이드**: `SPACEX_DESIGN_SYSTEM_GUIDE.md`
- **완료 보고서**: `ALL_PAGES_SPACEX_FINAL.md`
- **인증 문서**: `AUTHENTICATION.md`

---

## 📜 라이선스

Copyright © 2026 Trex.so. All rights reserved.

---

<div align="center">

**Travel. Assemble. Play.**

Made with ❤️ using SpaceX Design Language

![Trex.so](https://img.shields.io/badge/Trex.so-Travel%20Blocks-00AEF0?style=for-the-badge&logo=rocket)

</div>
