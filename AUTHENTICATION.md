# Trex.sale - 회원 시스템 가이드

## 📊 회원 데이터베이스 구조

### **users 테이블**

```
┌─────────────────┬──────────┬────────────────────────────────┐
│ 필드명          │ 타입     │ 설명                           │
├─────────────────┼──────────┼────────────────────────────────┤
│ id              │ text     │ 사용자 고유 ID (자동 생성)     │
│ email           │ text     │ 이메일 (로그인 ID)             │
│ password        │ text     │ 비밀번호 해시 (SHA-256)        │
│ nickname        │ text     │ 닉네임                         │
│ profile_image   │ text     │ 프로필 이미지 URL              │
│ user_type       │ text     │ creator/traveler/both          │
│ created_at      │ datetime │ 가입일                         │
│ last_login      │ datetime │ 마지막 로그인                  │
│ status          │ text     │ active/suspended/deleted       │
└─────────────────┴──────────┴────────────────────────────────┘
```

## 🔐 보안 처리

### **비밀번호 해시**
```javascript
// SHA-256 해시 사용
const hashedPassword = await crypto.subtle.digest('SHA-256', password);
```

⚠️ **프로덕션 권장사항**: 
- 서버 사이드에서 `bcrypt` 사용
- Salt 추가
- 최소 10 라운드 해싱

### **세션 관리**
```javascript
// 로그인 시 로컬 스토리지에 저장
localStorage.setItem('trex_user', JSON.stringify(userData));

// 로그아웃 시 삭제
localStorage.removeItem('trex_user');
```

## 📝 회원가입 프로세스

### 1. 사용자 입력
- 이메일
- 비밀번호 (6자 이상)
- 비밀번호 확인
- 닉네임
- 회원 유형 선택

### 2. 유효성 검사
```javascript
// 비밀번호 일치 확인
if (password !== passwordConfirm) {
  showToast('비밀번호가 일치하지 않습니다', 'error');
  return;
}
```

### 3. 데이터베이스 저장
```javascript
const response = await fetch('tables/users', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({
    email: email,
    password: hashedPassword,
    nickname: nickname,
    user_type: userType,
    created_at: new Date().toISOString(),
    status: 'active'
  })
});
```

## 🔑 로그인 프로세스

### 1. 이메일로 사용자 조회
```javascript
const response = await fetch(`tables/users?search=${email}`);
const data = await response.json();
```

### 2. 비밀번호 검증
```javascript
const user = data.data.find(u => u.email === email);
if (user && user.password === hashedPassword) {
  // 로그인 성공
}
```

### 3. 세션 저장
```javascript
localStorage.setItem('trex_user', JSON.stringify({
  id: user.id,
  email: user.email,
  nickname: user.nickname,
  userType: user.user_type
}));
```

### 4. 마지막 로그인 시간 업데이트
```javascript
await fetch(`tables/users/${user.id}`, {
  method: 'PATCH',
  body: JSON.stringify({
    last_login: new Date().toISOString()
  })
});
```

## 🛡️ 인증 헬퍼 함수 (auth.js)

### **현재 사용자 정보 가져오기**
```javascript
const user = getCurrentUser();
// { id, email, nickname, userType }
```

### **로그인 확인**
```javascript
if (isLoggedIn()) {
  // 로그인 상태
} else {
  // 비로그인 상태
}
```

### **로그인 필수 체크**
```javascript
function requireLogin() {
  if (!isLoggedIn()) {
    alert('로그인이 필요한 서비스입니다.');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}
```

### **로그아웃**
```javascript
logout(); // 세션 삭제 후 login.html로 이동
```

## 📄 페이지별 적용 방법

### 1. HTML에 auth.js 추가
```html
<script src="js/auth.js"></script>
```

### 2. 헤더에 사용자 정보 표시
```html
<!-- 헤더에 추가 -->
<div class="header-actions"></div>

<script>
// 페이지 로드 시 자동으로 렌더링
document.addEventListener('DOMContentLoaded', () => {
  renderUserInHeader();
});
</script>
```

### 3. 로그인 필수 페이지
```javascript
// upload.html 등에서 사용
document.addEventListener('DOMContentLoaded', () => {
  if (!requireLogin()) return;
  
  // 로그인한 사용자만 접근 가능한 코드
});
```

## 🔄 회원 정보 업데이트

### **프로필 업데이트**
```javascript
const result = await updateUserProfile(user.id, {
  nickname: '새닉네임',
  profile_image: 'https://...'
});

if (result.success) {
  showToast('프로필이 업데이트되었습니다', 'success');
}
```

## 📊 RESTful API 엔드포인트

### **회원가입**
```
POST /tables/users
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "hashed...",
  "nickname": "닉네임",
  "user_type": "creator",
  "status": "active"
}
```

### **사용자 조회**
```
GET /tables/users?search=user@example.com
```

### **사용자 정보 업데이트**
```
PATCH /tables/users/{user_id}
Content-Type: application/json

{
  "last_login": "2026-02-20T10:00:00Z",
  "nickname": "새닉네임"
}
```

### **사용자 삭제 (소프트 삭제)**
```
PATCH /tables/users/{user_id}
Content-Type: application/json

{
  "status": "deleted"
}
```

## 🎯 사용 예시

### **블록 생성 시 크리에이터 정보 자동 입력**
```javascript
const user = getCurrentUser();
if (user) {
  document.getElementById('creatorName').value = user.nickname;
}
```

### **구매 시 사용자 정보 저장**
```javascript
const user = getCurrentUser();
await fetch('tables/trips', {
  method: 'POST',
  body: JSON.stringify({
    user_id: user.id,
    user_email: user.email,
    // ...
  })
});
```

## 🔒 보안 권장사항

### ✅ 구현된 사항
- 비밀번호 해시 (SHA-256)
- 클라이언트 세션 관리
- 로그인 상태 검증

### ⚠️ 프로덕션 추가 필요
1. **서버 사이드 인증**
   - JWT 토큰 발급
   - Refresh Token
   - HTTPS 필수

2. **비밀번호 정책**
   - 최소 8자 이상
   - 대소문자, 숫자, 특수문자 조합
   - bcrypt 해싱 (서버)

3. **추가 보안**
   - 이메일 인증
   - 2FA (Two-Factor Authentication)
   - CAPTCHA
   - Rate Limiting

4. **GDPR 준수**
   - 개인정보 동의
   - 데이터 삭제 권리
   - 데이터 내보내기

## 📱 모바일 대응

```css
/* 반응형 로그인 페이지 */
@media (max-width: 640px) {
  .max-w-md { max-width: 100%; }
  .px-8 { padding-left: 1rem; padding-right: 1rem; }
}
```

## 🚀 다음 단계

1. **소셜 로그인**
   - Google OAuth
   - Kakao Login
   - Naver Login

2. **프로필 페이지**
   - 내 정보 수정
   - 프로필 이미지 업로드
   - 활동 내역

3. **비밀번호 찾기**
   - 이메일 인증
   - 임시 비밀번호 발급

4. **관리자 기능**
   - 회원 관리
   - 정지/복구
   - 통계

---

**제작일**: 2026-02-20  
**버전**: 1.0.0  
**문의**: support@trex.sale
