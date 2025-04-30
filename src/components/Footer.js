const Footer = () => {
  return `
      <footer>
        <section class="links-sns">
            <h2 class="sr-only">링크 주소</h2>
            <ul class="links-list">
                <li>
                    <a href="#">
                      호두샵 소개
                    </a>
                </li>
                <li>
                    <a href="#">
                      이용약관
                    </a>
                </li>
                <li>
                    <a href="#">
                      개인정보처리방침
                    </a>
                </li>
                <li>
                    <a href="#">
                      전자금융거래약관
                    </a>
                </li>
                <li>
                    <a href="#">
                      청소년보호정책
                    </a>
                </li>
                <li>
                    <a href="#">
                      제휴문의
                    </a>
                </li>
            </ul>
            <ul class="sns-list">
                <li class="instagram-link">
                    <a href="#" aria-label="인스타그램 페이지로 이동">
                    </a>
                </li>
                 <li class="facebook-link">
                    <a href="#" aria-label="페이스북 페이지로 이동">
                    </a>
                </li>
                <li class="youtube-link">
                    <a href="#" aria-label="유튜브 페이지로 이동">
                    </a>
                </li>
            </ul>
        </section>
        <section class="address">
            <h2 class="sr-only">회사 주소</h2>
            <p>
                <span>(주)HODU SHOP</span><br/>
                제주특별자치도 제주시 동광고 137 제주코딩베이스캠프 <br/>
                사업자 번호 : 000-0000-0000 | 통신판매업<br/>
                대표 : 김호두<br/>
            </p>
        </section>
      </footer>
    `;
};

export default Footer;
