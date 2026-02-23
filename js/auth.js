// ═══════════════════════════════════════════════════════
//  Trex.so - Authentication Helper
//  모든 페이지에서 사용 가능한 인증 관련 함수
// ═══════════════════════════════════════════════════════

// 현재 로그인한 사용자 정보 가져오기
function getCurrentUser() {
  const userJson = localStorage.getItem('user');
  return userJson ? JSON.parse(userJson) : null;
}

// 로그인 여부 확인
function isLoggedIn() {
  return getCurrentUser() !== null;
}

// 로그아웃
function logout() {
  localStorage.removeItem('user');
  window.location.href = 'index.html';
}

// 로그인 필수 페이지 체크
function requireLogin() {
  if (!isLoggedIn()) {
    alert('로그인이 필요한 서비스입니다.');
    window.location.href = 'login.html';
    return false;
  }
  return true;
}

// 사용자 프로필 업데이트
async function updateUserProfile(userId, updates) {
  try {
    const response = await fetch(`tables/users/${userId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    
    if (response.ok) {
      // 로컬 스토리지 업데이트
      const currentUser = getCurrentUser();
      const updatedUser = { ...currentUser, ...updates };
      localStorage.setItem('user', JSON.stringify(updatedUser));
      return { success: true };
    } else {
      throw new Error('프로필 업데이트 실패');
    }
  } catch (error) {
    console.error('Update error:', error);
    return { success: false, error: error.message };
  }
}

// 헤더에 사용자 정보 표시
function renderUserInHeader(targetId = 'authButtons', keepCart = false) {
  const user = getCurrentUser();
  const targetDiv = document.getElementById(targetId);
  
  if (!targetDiv) return;
  
  if (user) {
    // 로그인 상태
    const cartButton = keepCart ? `
      <button id="cartButton" class="relative bg-blue-600 text-white px-4 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
        <i class="fa-solid fa-shopping-cart mr-2"></i>장바구니
        <span id="cartCount" class="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold">0</span>
      </button>
    ` : '';
    
    // 관리자 메뉴
    const adminButton = user.isAdmin ? `
      <a href="admin.html" class="bg-red-500 text-white px-4 py-2 rounded-full font-semibold hover:bg-red-600 transition text-sm">
        <i class="fa-solid fa-shield-alt mr-1"></i>관리자
      </a>
    ` : '';
    
    targetDiv.innerHTML = `
      <div class="flex items-center space-x-4">
        ${cartButton}
        ${adminButton}
        <a href="profile.html" class="flex items-center space-x-2 text-gray-700 hover:text-blue-600 transition">
          <div class="w-8 h-8 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
            ${(user.nickname || 'U').charAt(0).toUpperCase()}
          </div>
          <span class="font-semibold hidden md:inline">${user.nickname}님</span>
        </a>
        <button onclick="logout()" class="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-full font-semibold transition text-sm">
          <i class="fa-solid fa-sign-out-alt mr-1"></i>로그아웃
        </button>
      </div>
    `;
  } else {
    // 비로그인 상태
    targetDiv.innerHTML = `
      <a href="login.html" class="bg-blue-600 text-white px-5 py-2 rounded-full font-semibold hover:bg-blue-700 transition">
        <i class="fa-solid fa-sign-in-alt mr-2"></i>로그인
      </a>
    `;
  }
}
