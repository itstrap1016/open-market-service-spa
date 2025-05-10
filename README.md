# 오픈 마켓 서비스

## 1. 목표와 기능

### 1.1 목표

- 사용자가 상품을 검색하고 구매할 수 있는 전자상거래 플랫폼
- 판매자는 상품을 등록하고 관리할 수 있으며, 구매자는 상품을 검색하고 구매할 수 있음.
- 간단하고 직관적인 UI/UX 제공.

- API를 통해 로그인, 회원가입 절차를 Javascript로 구현.
- 비회원, 구매 회원, 판매 회원에게 보여지는 UI를 다르게 렌더링.

### 1.2 기능

- **메인 페이지**
  - 헤더
    - 비회원: 장바구니, 로그인 제공
    - 구매회원: 장바구니, 마이페이지 제공
    - 판매회원: 마이페이지, 판매자센터 제공
- **회원가입 및 로그인**:
  - Javascript로 검증 처리
  - 구매자와 판매자 유형별 회원가입.
  - 로그인 상태 확인 및 리다이렉트 처리.
- **상세 페이지**:
  - 비회원: 바로 구매, 장바구니 클릭시 로그인 유도 다일로그 처리
  - 구매회원: 모든 기능 정상 동작
  - 판매회원: 바로 구매, 장바구니, 상품 수량 -, + 버튼 비활성화

## 2. 개발 환경 및 배포 URL

### 2.1 프론트엔드

- **HTML**, **CSS**, **JavaScript** (SPA로 구현)
- **Swiper.js**: 슬라이더 컴포넌트 구현.
- **Vercel**: 정적 파일 배포.

### 2.2 백엔드

- RESTful API와 통신 (백엔드 API는 별도로 제공됨).

### 2.3 배포

- **Vercel**: 정적 파일 배포 및 클라이언트 측 라우팅 지원.

### 2.4 배포 URL

- https://open-market-service-spa-23bp.vercel.app/
- 테스트용 계정 - 판매자
  ```
  id : buyer1
  pw : weniv1234
  ```
- 테스트용 계정 - 구매자
  ```
  id : seller1
  pw : weniv1234
  ```

### 2.5 URL 구조

| App  | URL            | Note                       |
| ---- | -------------- | -------------------------- |
| main | '/'            | 홈화면                     |
| main | '/login'       | 로그인 화면                |
| main | '/signup'      | 회원가입 화면              |
| main | '/product/:id' | 제품상세 화면              |
| main | '404 page'     | 404페이지(Vercel에서 처리) |

## 3. 프로젝트 구조

## 3. 프로젝트 구조

```plaintext
📦 open-market-service
┣ 📂 src                     # 소스 코드 디렉토리
┃ ┣ 📂 components            # UI 컴포넌트 (Header, Footer, Swiper 등)
┃ ┃ ┣ 📜 Header.js           # 헤더 컴포넌트
┃ ┃ ┣ 📜 Footer.js           # 푸터 컴포넌트
┃ ┃ ┗ 📜 SwiperComponent.js  # 슬라이더 컴포넌트
┃ ┣ 📂 pages                 # 각 페이지 (Home, Login, SignUp 등)
┃ ┃ ┣ 📜 Home.js             # 메인 페이지
┃ ┃ ┣ 📜 Login.js            # 로그인 페이지
┃ ┃ ┣ 📜 SignUp.js           # 회원가입 페이지
┃ ┃ ┗ 📜 ProductDetail.js    # 상품 상세 페이지
┃ ┣ 📂 services              # 비즈니스 로직 (회원가입, 로그인 등)
┃ ┃ ┣ 📜 signupProcess.js    # 회원가입 관련 로직
┃ ┃ ┗ 📜 auth.js             # 인증 관련 로직
┃ ┣ 📂 api                   # API 호출 관련 코드
┃ ┃ ┗ 📜 signupApi.js        # 회원가입 API 호출
┃ ┣ 📂 utils                 # 유틸리티 함수
┃ ┃ ┗ 📜 utils.js            # 공통 유틸리티 함수
┃ ┣ 📂 css                   # 스타일 파일
┃ ┃ ┗ 📜 style.css           # 메인 스타일 파일
┃ ┗ 📜 app.js                # 라우팅 및 초기화 로직
┣ 📂 public                  # 정적 파일 (이미지, 아이콘 등)
┃ ┗ 📜 favicon.ico           # 파비콘 파일
┣ 📂 dist                    # 빌드 결과물
┃ ┗ 📜 (빌드된 정적 파일)
┣ 📜 [index.html](http://_vscodecontentref_/0)              # 메인 HTML 파일
┣ 📜 [package.json](http://_vscodecontentref_/1)            # 프로젝트 설정 및 의존성
┗ 📜 [vercel.json](http://_vscodecontentref_/2)             # Vercel 설정 파일
```

## 4. 설치 및 실행 방법

### 로컬 실행

1. **프로젝트 클론**:

   ```bash
   git clone <repository-url>
   cd open-market-service
   ```

2. **의존설 설치 및 로컬 서버 실행**

   ```bash
   npm install
   npm run dev
   ```

## 5. 개발하며 느낀점

- **순수 JavaScript로 SPA 개발**:

  - 라우팅 시스템을 직접 설계하고 구현하면서 SPA의 동작 원리를 체감할 수 있었습니다.

- **복잡한 로직 관리**:

  - 컴포넌트 기반으로 코드를 분리하고, 비즈니스 로직과 UI 로직을 분리하여 유지보수성을 높이려고 노력했습니다.

- **JavaScript의 한계와 가능성**:

  - 프레임워크 없이 순수 JavaScript로 개발하다 보니, React나 Vue.js 같은 프레임워크가 제공하는 편리한 기능(예: 상태 관리, 컴포넌트 라이프사이클 관리 등)의 필요성을 느꼈습니다.
  - 하지만, 순수 JavaScript만으로도 충분히 SPA를 구현할 수 있다는 자신감을 얻었습니다.

- **Copilot(AI) 활용**:

  - Copilot을 활용하여 반복적인 작업을 자동화하고, 코드 작성 속도를 높일 수 있었습니다.
  - 하지만 Copilot의 제안을 무조건 수용하기보다는, 제안된 코드를 검토하고 수정하는 과정을 통해 더 나은 코드를 작성하려고 노력했습니다.
  - Copilot을 어떻게 더 잘 활용할 수 있을지 고민했습니다.

```

```
