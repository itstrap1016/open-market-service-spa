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
  },
});
