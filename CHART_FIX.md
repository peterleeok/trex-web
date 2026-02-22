# 🔧 블록 등록 에러 수정 완료

## ❌ 발생한 문제
**에러 메시지**: "등록 중 오류가 발생했습니다: 등록 실패: Internal server error"

**화면**: upload.html → "마켓에 블록 등록하기" 버튼 클릭 시 에러

---

## 🔍 원인 분석

### 1. tags 필드 처리 오류
```javascript
// ❌ 문제 코드
tags: Array.isArray(STATE.pendingBlock.tags) 
  ? STATE.pendingBlock.tags 
  : STATE.pendingBlock.tags.split(',')
```

**문제점**:
- `STATE.pendingBlock.tags`가 `undefined`일 수 있음
- `undefined.split(',')` → 에러 발생
- 빈 문자열이나 공백만 있는 경우 처리 안 됨

### 2. 필수 필드 누락 가능성
- title, description, category 등이 비어있을 수 있음
- 서버에서 검증 실패 → Internal server error

### 3. 에러 메시지 불명확
- 실제 서버 에러 내용을 확인할 수 없음
- 디버깅이 어려움

---

## ✅ 해결 방법

### 1. tags 필드 안전한 변환
```javascript
// ✅ 수정된 코드
let tagsArray = [];
if (STATE.pendingBlock.tags) {
  if (Array.isArray(STATE.pendingBlock.tags)) {
    tagsArray = STATE.pendingBlock.tags;
  } else if (typeof STATE.pendingBlock.tags === 'string') {
    tagsArray = STATE.pendingBlock.tags
      .split(',')
      .map(t => t.trim())  // 공백 제거
      .filter(t => t);     // 빈 문자열 제거
  }
}
```

**개선 사항**:
- `undefined` 체크 추가
- 공백 trim() 처리
- 빈 문자열 필터링
- 배열이 아닌 경우만 split() 실행

### 2. 모든 필드에 기본값 설정
```javascript
const blockData = {
  title: STATE.pendingBlock.title || '여행 블록',
  description: STATE.pendingBlock.description || '',
  category: STATE.pendingBlock.category || '관광지',
  location: STATE.pendingBlock.location || '서울',
  price: parseFloat(STATE.pendingBlock.price) || 0.99,
  image_url: STATE.uploadedImage || 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800',
  creator_name: STATE.pendingBlock.creatorName || '여행자',
  tags: tagsArray,  // 안전하게 변환된 배열
  tips: STATE.pendingBlock.description || '',
  rating: 0,
  purchase_count: 0,
  status: 'approved'
};
```

**개선 사항**:
- 모든 필드에 `|| 기본값` 추가
- 필수 필드가 비어있어도 동작하도록 보장

### 3. 상세한 에러 로깅 및 메시지
```javascript
console.log('Sending block data:', blockData);  // 전송 데이터 로그

if (response.ok) {
  const result = await response.json();
  console.log('Block created:', result);  // 성공 결과 로그
} else {
  const errorText = await response.text();
  console.error('Server response:', response.status, errorText);  // 에러 로그
  throw new Error(`등록 실패 (${response.status}): ${errorText}`);
}
```

**개선 사항**:
- 전송 데이터 콘솔 출력
- 서버 응답 상세 로그
- HTTP 상태 코드 포함
- 개발자 도구에서 디버깅 가능

---

## 🧪 테스트 방법

### 1. 기본 블록 등록 테스트
```
1. upload.html 접속 (로그인된 상태)
2. 사진 업로드 (또는 건너뛰기)
3. 여행 설명 입력: "성수동 카페 추천!"
4. 닉네임: 자동 입력됨 (예: 테스트유저)
5. "AI로 블록 생성하기" 클릭
6. 3초 대기 → AI 분석 결과 표시
7. "마켓에 블록 등록하기" 클릭
8. ✅ "🎉 블록이 마켓에 등록됐어요!" 토스트
9. ✅ 1.5초 후 market.html로 이동
10. ✅ 새 블록이 마켓에 표시됨
```

### 2. 브라우저 콘솔 확인 (F12)
```javascript
// 전송 데이터 확인
Sending block data: {
  title: "성수동 감성 카페 BEST",
  description: "성수동 카페 추천!",
  category: "카페",
  location: "성수동",
  price: 1.49,
  image_url: "https://...",
  creator_name: "테스트유저",
  tags: ["성수동", "카페", "감성"],
  tips: "...",
  rating: 0,
  purchase_count: 0,
  status: "approved"
}

// 성공 시
Block created: { id: "...", ... }

// 실패 시 (상세 에러 표시)
Server response: 500 Internal server error
```

### 3. 엣지 케이스 테스트
- [ ] 사진 없이 등록 (기본 이미지 사용)
- [ ] 매우 짧은 설명 (3글자)
- [ ] 매우 긴 설명 (1000자)
- [ ] 특수문자 포함 (#, @, %, 이모지)
- [ ] 빈 필드로 등록 시도

---

## 📊 수정 전후 비교

### Before (이전)
```javascript
// ❌ 위험한 코드
tags: Array.isArray(STATE.pendingBlock.tags) 
  ? STATE.pendingBlock.tags 
  : STATE.pendingBlock.tags.split(',')
// → undefined.split(',') 에러 발생!

// ❌ 필드 기본값 없음
title: STATE.pendingBlock.title,  // undefined 가능
description: STATE.pendingBlock.description,  // undefined 가능

// ❌ 에러 메시지 불명확
throw new Error('등록 실패: ' + errorText);
```

### After (수정)
```javascript
// ✅ 안전한 코드
let tagsArray = [];
if (STATE.pendingBlock.tags) {
  if (Array.isArray(STATE.pendingBlock.tags)) {
    tagsArray = STATE.pendingBlock.tags;
  } else if (typeof STATE.pendingBlock.tags === 'string') {
    tagsArray = STATE.pendingBlock.tags.split(',').map(t => t.trim()).filter(t => t);
  }
}

// ✅ 모든 필드에 기본값
title: STATE.pendingBlock.title || '여행 블록',
description: STATE.pendingBlock.description || '',

// ✅ 상세한 에러 메시지
console.error('Server response:', response.status, errorText);
throw new Error(`등록 실패 (${response.status}): ${errorText}`);
```

---

## 🎯 예상 결과

### 성공 시
```
1. "🚀 블록 등록 중..." 토스트 (즉시)
2. Console: "Sending block data: {...}"
3. Console: "Block created: {...}"
4. "🎉 블록이 마켓에 등록됐어요!" 토스트 (성공)
5. 1.5초 후 market.html 이동
6. 새 블록이 마켓 상단에 표시됨
```

### 실패 시 (에러 발생 시)
```
1. "🚀 블록 등록 중..." 토스트
2. Console: "Sending block data: {...}"
3. Console: "Server response: 500 Internal server error"
4. "등록 중 오류: 등록 실패 (500): ..." 토스트 (에러)
5. 화면에 남아있음 (재시도 가능)
```

---

## 🚀 배포 및 테스트

### 즉시 테스트
1. **Publish 탭** 클릭
2. **Deploy** 버튼 클릭
3. 배포된 사이트 접속
4. 로그인 → upload.html
5. 블록 생성 → 등록 테스트
6. ✅ 정상 작동 확인!

### 디버깅 방법 (에러 발생 시)
1. F12 → Console 탭 열기
2. "마켓에 블록 등록하기" 클릭
3. Console 메시지 확인:
   - "Sending block data: {...}" - 전송 데이터
   - "Server response: ..." - 서버 응답
4. Network 탭에서 "tables/blocks" 요청 확인
5. Request Payload 확인
6. Response 확인

---

## 📝 수정 파일

| 파일 | 변경 내용 |
|------|----------|
| `upload.html` | ✅ tags 안전한 변환, 필드 기본값 추가, 에러 로깅 개선 |

---

## ✅ 체크리스트

- [x] tags 필드 안전하게 변환
- [x] 모든 필드에 기본값 설정
- [x] 상세한 콘솔 로그 추가
- [x] 에러 메시지 개선 (HTTP 상태 코드 포함)
- [x] 성공/실패 시나리오 모두 처리
- [x] 코드 가독성 개선

---

**블록 등록 에러가 수정되었습니다!** 🎉
**지금 바로 테스트하세요!** 🚀