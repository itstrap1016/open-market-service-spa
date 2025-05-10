# 오픈 마켓 서비스

## 1. 목표와 기능

### 1.1 목표

- 사용자가 상품을 검색하고 구매할 수 있는 전자상거래 플랫폼
- 판매자는 상품을 등록하고 관리할 수 있으며, 구매자는 상품을 검색하고 구매할 수 있음.
- 간단하고 직관적인 UI/UX 제공.

### 1.2 기능

- **회원가입 및 로그인**:
  - 구매자와 판매자 유형별 회원가입.
  - 로그인 상태 확인 및 리다이렉트 처리.
- **상세 페이지**:
  - 상품 상세 정보 제공.
- **판매자 기능**:
  - 사업자 등록번호 인증 및 스토어 이름 설정.

## 2. 개발 환경 및 배포 URL

### 2.1 개발 환경

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

### 2.5 URL 구조(모놀리식)

-

| App  | URL            | Note          |
| ---- | -------------- | ------------- |
| main | '/'            | 홈화면        |
| main | '/login'       | 로그인 화면   |
| main | '/signup'      | 회원가입 화면 |
| main | '/product/:id' | 제품상세 화면 |

## 3. 요구사항 명세와 기능 명세

- https://www.mindmeister.com/ 등을 사용하여 모델링 및 요구사항 명세를 시각화하면 좋습니다.
- 이미지는 셈플 이미지입니다.
  <img src="map.png" width="100%">
- 머메이드를 이용해 시각화 할 수 있습니다.

```mermaid
    sequenceDiagram
    actor A as client
    participant B as Web
    participant C as server
    A->>+B: 로그인 요청
    B->>+A: 로그인 정보 요구
    A->>+C: id, pw 전달
    alt 로그인 정보가 있고 로그인 정보가 맞을 시
    C->>+B: access token, refresh token 전달
    B->>+A: 로그인 성공
    else 로그인 정보가 없거나 정보가 맞지 않을시
    C->>+B: False
    B->>+A: 로그인 실패
    end
```

## 4. 프로젝트 구조와 개발 일정

### 4.1 프로젝트 구조

- 📦 open-market-service ├── 📂 src │ ├── 📂 components # UI 컴포넌트 (Header, Footer, Swiper 등) │ ├── 📂 pages # 각 페이지 (Home, Login, SignUp 등) │ ├── 📂 services # 비즈니스 로직 (회원가입, 로그인 등) │ ├── 📂 api # API 호출 관련 코드 │ ├── 📂 utils # 유틸리티 함수 │ ├── 📂 css # 스타일 파일 │ └── 📜 app.js # 라우팅 및 초기화 로직 ├── 📂 public # 정적 파일 (이미지, 아이콘 등) ├── 📂 dist # 빌드 결과물 ├── 📜 index.html # 메인 HTML 파일 ├── 📜 package.json # 프로젝트 설정 및 의존성 └── 📜 vercel.json # Vercel 설정 파일

### 4.1 개발 일정(WBS)

- 아래 일정표는 머메이드로 작성했습니다.

```mermaid
gantt
    title tutorial django
    dateFormat YY-MM-DD
    section 기획
        글조회(R) :2023-10-26, 1d
        글생성/수정/삭제(CUD) :2023-10-28, 1d
        로그인 기능 :2023-10-31, 1d
        검색 기능 :2023-10-31, 1d
        상세뷰 추가 구성 :2023-11-4, 1d
    section 디자인
        리디자인 :2023-11-6, 1d
    section FE
        메인    :2023-10-27, 1d
        글조회    :2023-10-27, 1d
        글등록    :2023-10-29, 2d
        글수정    :2023-10-29, 2d
        글삭제    :2023-10-29, 2d
        글검색    :2023-10-30, 1d
        로그인/로그아웃 :2023-10-31, 1d
        회원가입 페이지 :2023-11-1, 1d
        인증 접근 권한 :2023-10-31, 3d
        유저 추가 :2023-11-2, 1d
        프로필 페이지 :2023-11-5, 1d
        이미지, 조회수, 태그 추가 :2023-11-6, 1d
        댓글 추가 :2023-11-6, 1d
        리디자인 적용 :2023-11-7, 1d
    section BE
        메인    :2023-10-27, 1d
        글조회    :2023-10-27, 1d
        글등록    :2023-10-29, 2d
        글수정    :2023-10-29, 2d
        글삭제    :2023-10-29, 2d
        글검색    :2023-10-30, 1d
        로그인/로그아웃 :2023-10-31, 1d
        회원가입 페이지 :2023-11-1, 1d
        인증 접근 권한 :2023-10-31, 3d
        이미지, 조회수, 태그 :2023-11-5, 2d
        댓글 :2023-11-5, 2d
```

- 아래 WBS는 엑셀을 이용했습니다. 양식은 [다운로드](./WBS_sample.xlsx) 받아 사용하세요. (출처 : https://techcommunity.microsoft.com/gxcuf89792/attachments/gxcuf89792/ExcelGeneral/204594/1/WBS_sample.xlsx)
  <img src="wbs_xlsx.png" width="80%">

- 좀 더 가벼운 프로젝트는 아래 일정표를 사용하세요.
- 아래 일정표는 [habitmaker.co.kr](https://habitmaker.co.kr) 에서 작성되었습니다.
- 관련된 스택 표시는 [dev.habitmaker.co.kr](https://dev.habitmaker.co.kr) 에서 작성되었습니다.
  <img src="habit.jpg" width="50%">
  <img src="blob.png" width="50%">

## 5. 역할 분담

- 팀장 : 이호준
- FE : 홍길동
- FE : 홍길동
- BE : 홍길동
- BE : 홍길동
- 디자인 : 홍길동

## 6. 와이어프레임 / UI / BM

### 6.1 와이어프레임

- 아래 페이지별 상세 설명, 더 큰 이미지로 하나하나씩 설명 필요
  <img src="ui.png" width="60%">

- 와이어 프레임은 디자인을 할 수 있다면 '피그마'를, 디자인을 할 수 없다면 '카카오 오븐'으로 쉽게 만들 수 있습니다.

### 6.2 화면 설계

- 화면은 gif파일로 업로드해주세요.

<table>
    <tbody>
        <tr>
            <td>메인</td>
            <td>로그인</td>
        </tr>
        <tr>
            <td>
		<img src="ui1.png" width="100%">
            </td>
            <td>
                <img src="ui2.png" width="100%">
            </td>
        </tr>
        <tr>
            <td>회원가입</td>
            <td>정보수정</td>
        </tr>
        <tr>
            <td>
                <img src="ui3.png" width="100%">
            </td>
            <td>
                <img src="ui3.png" width="100%">
            </td>
        </tr>
        <tr>
            <td>검색</td>
            <td>번역</td>
        </tr>
        <tr>
            <td>
                <img src="ui3.png" width="100%">
            </td>
            <td>
                <img src="ui3.png" width="100%">
            </td>
        </tr>
        <tr>
            <td>선택삭제</td>
            <td>글쓰기</td>
        </tr>
        <tr>
            <td>
	        <img src="ui3.png" width="100%">
            </td>
            <td>
                <img src="ui3.png" width="100%">
            </td>
        </tr>
        <tr>
            <td>글 상세보기</td>
            <td>댓글</td>
        </tr>
        <tr>
            <td>
                <img src="ui3.png" width="100%">
            </td>
            <td>
                <img src="ui3.png" width="100%">
            </td>
        </tr>
    </tbody>
</table>

## 7. 데이터베이스 모델링(ERD)

- 아래 ERD는 머메이드를 사용했습니다.

```mermaid
erDiagram
    user ||--o{ post : write
    user {
      integer id PK
      varchar username
      varchar password
      image profile_image
      datetime created_at
      varchar ip_address
      datetime last_login
    }
    post }|--|{ tag : contains
    post ||--o| category : has
    post {
      integer id PK
      varchar title
      text content
      file file_upload
      image image_upload
      datetime created_at
      datetime updated_at
      varchar writer
      integer user_id FK
      integer hits
      integer tags FK
      varchar category FK
    }
    post ||--o{ comment : contains
    comment ||--o{ comment : contains
    comment {
      integer id PK
      integer parent FK
      text comment
      comment comment_reply FK
      datetime created_at
      datetime updated_at
    }

    tag {
      integer id PK
      varchar name
    }


    category {
      integer id PK
      varchar name
    }
```

- 아래 ERD는 [ERDCloud](https://www.erdcloud.com/)를 사용했습니다.
  <img src="erd.png" width="60%">

- https://dbdiagram.io/home도 많이 사용합니다.

## 8. Architecture

- 아래 Architecture 설계도는 ChatGPT에게 아키텍처를 설명하고 mermaid로 그려달라 요청한 것입니다.

```mermaid
graph TD;
    CI[GitHub CI/CD] -->|Deploys| LS[AWS Lightsail];
    A[Django Application] -->|Uses| DRF[Django REST Framework];
    A -->|Real-time communication| C[Django Channels];
    C -->|Messaging backend| R[Redis];
    A -->|Connects to| DB[postgresql];
    A -->|Static & Media Files| S3[AWS S3];
    FE[Frontend] -->|Deployed on| LS;
    LS -->|Hosts| A;
    LS -->|Hosts| FE;

    classDef framework fill:#f9f,stroke:#333,stroke-width:2px;
    classDef aws fill:#ff9,stroke:#f66,stroke-width:2px,stroke-dasharray: 5, 5;
    classDef ci fill:#9cf,stroke:#33f,stroke-width:2px;

    class A,DRF,C,DB framework;
    class LS,S3 aws;
    class CI ci;

```

- 아래 Architecture 설계도는 PPT를 사용했습니다.

![image](./architecture.png)

- PPT로 간단하게 작성하였으나, 아키텍쳐가 커지거나, 상세한 내용이 필요할 경우 [AWS architecture Tool](https://online.visual-paradigm.com/ko/diagrams/features/aws-architecture-diagram-tool/)을 사용하기도 합니다.

- 시퀀스 다이어그램 등은 아래 레파지토리를 참고해주세요. [FastAPI 퀴즈 서비스](https://github.com/MyBitBox/bitbox)

## 9. 메인 기능

- 끓는 너의 얼음과 꽃 뭇 더운지라 그들에게 봄바람이다. 피가 청춘을 기관과 같이, 무엇을 그들은 피고 무엇을 때문이다. 이는 무엇을 인간이 철환하였는가? 과실이 풀이 거친 인간은 그러므로 그들의 힘차게 이것은 작고 것이다. 가치를 풀밭에 있을 꾸며 보이는 사막이다. 꾸며 낙원을 인도하겠다는 무엇이 인생에 대중을 인류의 것이다. 이상, 피가 이상의 그와 풀이 품었기 가슴이 같은 아니한 보라. 열매를 그들의 가는 뼈 그들은 밝은 힘차게 위하여서. 인생에 영락과 청춘의 광야에서 천하를 무엇을 고동을 쓸쓸하랴?

- 인간의 그들의 얼마나 발휘하기 뼈 꽃 생명을 그들에게 거선의 있으랴? 힘차게 청춘의 그들에게 끓는 사랑의 따뜻한 가는 피다. 긴지라 인생에 얼음과 인간의 튼튼하며, 끝까지 사막이다. 희망의 이상, 없으면 얼음과 더운지라 착목한는 이상은 자신과 커다란 것이다. 피가 아니한 아름답고 사랑의 있는 청춘의 장식하는 무엇이 이것이다. 내려온 우리의 싶이 것은 것은 그들은 무한한 운다. 것은 청춘의 오직 지혜는 그들의 주는 아름다우냐? 날카로우나 원질이 얼마나 얼마나 눈이 싶이 품에 이는 크고 때문이다. 두손을 뭇 이상 영원히 위하여서. 불러 이상은 설레는 열락의 살았으며, 인생을 인생에 위하여서.

- 창공에 구하지 있는 군영과 같이, 않는 있으랴? 더운지라 기쁘며, 곳이 보는 갑 그리하였는가? 예가 미묘한 이상의 있다. 구할 이 많이 가지에 인류의 없으면 몸이 봄바람이다. 속잎나고, 살았으며, 보내는 투명하되 이상의 하여도 것이다. 뼈 것은 그들에게 안고, 수 주며, 몸이 얼음이 평화스러운 쓸쓸하랴? 이상 황금시대를 속에서 아름다우냐? 노래하며 기관과 이상이 원대하고, 인생에 것이다. 산야에 위하여 온갖 것은 갑 청춘을 피어나는 보이는 때문이다. 없는 생명을 그것을 곳으로 사라지지 힘있다.

```mermaid
		graph TD
	    A[하루 시작] -->|일어난다| B(세수한다)
	    B --> C{오늘은 무엇을 할까}
	    C -->|밥을 먹는다| D[냉장고 확인]
	    C -->|다시 잔다| E[침대로 돌아가기]
	    C -->|티비를 본다| F[거실로 가기]
```

```mermaid
		sequenceDiagram
	    A->>+B: B야 소금좀 건내줘
	    B->>+A: 여기
	    A-->>-B: 고마워
```

```mermaid
		stateDiagram-v2
	    [*] --> 로그인
	    로그인 --> 성공
	    로그인 --> 실패
	    실패 --> 아이디/비밀번호찾기
	    아이디/비밀번호찾기 --> 로그인재시도
	    로그인재시도 --> 성공
	    성공 --> [*]
```

## 10. 에러와 에러 해결

- 끓는 너의 얼음과 꽃 뭇 더운지라 그들에게 봄바람이다. 피가 청춘을 기관과 같이, 무엇을 그들은 피고 무엇을 때문이다. 이는 무엇을 인간이 철환하였는가? 과실이 풀이 거친 인간은 그러므로 그들의 힘차게 이것은 작고 것이다. 가치를 풀밭에 있을 꾸며 보이는 사막이다. 꾸며 낙원을 인도하겠다는 무엇이 인생에 대중을 인류의 것이다. 이상, 피가 이상의 그와 풀이 품었기 가슴이 같은 아니한 보라. 열매를 그들의 가는 뼈 그들은 밝은 힘차게 위하여서. 인생에 영락과 청춘의 광야에서 천하를 무엇을 고동을 쓸쓸하랴?

- 인간의 그들의 얼마나 발휘하기 뼈 꽃 생명을 그들에게 거선의 있으랴? 힘차게 청춘의 그들에게 끓는 사랑의 따뜻한 가는 피다. 긴지라 인생에 얼음과 인간의 튼튼하며, 끝까지 사막이다. 희망의 이상, 없으면 얼음과 더운지라 착목한는 이상은 자신과 커다란 것이다. 피가 아니한 아름답고 사랑의 있는 청춘의 장식하는 무엇이 이것이다. 내려온 우리의 싶이 것은 것은 그들은 무한한 운다. 것은 청춘의 오직 지혜는 그들의 주는 아름다우냐? 날카로우나 원질이 얼마나 얼마나 눈이 싶이 품에 이는 크고 때문이다. 두손을 뭇 이상 영원히 위하여서. 불러 이상은 설레는 열락의 살았으며, 인생을 인생에 위하여서.

- 창공에 구하지 있는 군영과 같이, 않는 있으랴? 더운지라 기쁘며, 곳이 보는 갑 그리하였는가? 예가 미묘한 이상의 있다. 구할 이 많이 가지에 인류의 없으면 몸이 봄바람이다. 속잎나고, 살았으며, 보내는 투명하되 이상의 하여도 것이다. 뼈 것은 그들에게 안고, 수 주며, 몸이 얼음이 평화스러운 쓸쓸하랴? 이상 황금시대를 속에서 아름다우냐? 노래하며 기관과 이상이 원대하고, 인생에 것이다. 산야에 위하여 온갖 것은 갑 청춘을 피어나는 보이는 때문이다. 없는 생명을 그것을 곳으로 사라지지 힘있다.

## 10. 개발하며 느낀점

- 끓는 너의 얼음과 꽃 뭇 더운지라 그들에게 봄바람이다. 피가 청춘을 기관과 같이, 무엇을 그들은 피고 무엇을 때문이다. 이는 무엇을 인간이 철환하였는가? 과실이 풀이 거친 인간은 그러므로 그들의 힘차게 이것은 작고 것이다. 가치를 풀밭에 있을 꾸며 보이는 사막이다. 꾸며 낙원을 인도하겠다는 무엇이 인생에 대중을 인류의 것이다. 이상, 피가 이상의 그와 풀이 품었기 가슴이 같은 아니한 보라. 열매를 그들의 가는 뼈 그들은 밝은 힘차게 위하여서. 인생에 영락과 청춘의 광야에서 천하를 무엇을 고동을 쓸쓸하랴?

- 인간의 그들의 얼마나 발휘하기 뼈 꽃 생명을 그들에게 거선의 있으랴? 힘차게 청춘의 그들에게 끓는 사랑의 따뜻한 가는 피다. 긴지라 인생에 얼음과 인간의 튼튼하며, 끝까지 사막이다. 희망의 이상, 없으면 얼음과 더운지라 착목한는 이상은 자신과 커다란 것이다. 피가 아니한 아름답고 사랑의 있는 청춘의 장식하는 무엇이 이것이다. 내려온 우리의 싶이 것은 것은 그들은 무한한 운다. 것은 청춘의 오직 지혜는 그들의 주는 아름다우냐? 날카로우나 원질이 얼마나 얼마나 눈이 싶이 품에 이는 크고 때문이다. 두손을 뭇 이상 영원히 위하여서. 불러 이상은 설레는 열락의 살았으며, 인생을 인생에 위하여서.

- 창공에 구하지 있는 군영과 같이, 않는 있으랴? 더운지라 기쁘며, 곳이 보는 갑 그리하였는가? 예가 미묘한 이상의 있다. 구할 이 많이 가지에 인류의 없으면 몸이 봄바람이다. 속잎나고, 살았으며, 보내는 투명하되 이상의 하여도 것이다. 뼈 것은 그들에게 안고, 수 주며, 몸이 얼음이 평화스러운 쓸쓸하랴? 이상 황금시대를 속에서 아름다우냐? 노래하며 기관과 이상이 원대하고, 인생에 것이다. 산야에 위하여 온갖 것은 갑 청춘을 피어나는 보이는 때문이다. 없는 생명을 그것을 곳으로 사라지지 힘있다.
