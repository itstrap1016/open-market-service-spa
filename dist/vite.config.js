import { defineConfig } from "vite";

export default defineConfig({
  root: ".", // 프로젝트 루트 디렉토리
  build: {
    outDir: "dist", // 빌드 결과물 디렉토리
    rollupOptions: {
      input: "./index.html", // 진입점 파일
    },
  },
  server: {
    port: 3000, // 개발 서버 포트
    open: true, // 브라우저 자동 열기
    historyApiFallback: true, // SPA 라우팅 지원
    watch: {
      usePolling: true, // 파일 변경 감지를 위한 폴링 활성화
      interval: 100,
    },
    hmr: {
      overlay: true, // 브라우저에서 HMR 에러를 오버레이로 표시
      protocol: "ws", // WebSocket 프로토콜 사용
      host: "localhost", // HMR 서버 호스트
      port: 3000, // HMR 서버 포트
    },
  },
});
