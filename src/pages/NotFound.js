const NotFound = () => {
  return `
    <section class="not-found-page">
      <h2 class="sr-only">404 페이지</h2>
      <div class="img-section">
      </div>
      <div class="txt">
        <h3>페이지를 찾을 수 없습니다.</h3>
        <p>페이지가 존재하지 않거나 사용할 수 없는 페이지입니다.
        웹 주소가 올바른지 확인해 주세요.</p>
        <div class="btns-list">
            <a class="primary-btn" href="/">메인으로</a>
            <button class="secondary-btn" onclick="window.history.back()">이전 페이지</button>
        </div>
      </div>
    </section>
  `;
};

export default NotFound;
