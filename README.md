작업 순서 메모하기

1. 넥스트js 설치 후 기본 세팅

2. 샤드씨엔 설치 (shadcn)

- https://ui.shadcn.com/
- Get Started
- next.js
- `pnpm dlx shadcn@latest init`
  (components.json 파일이 생김)
- `pnpm dlx shadcn@latest add button` 버튼 설치 해서 테스트 하기
  (src/components/ui 안에 button.tsx 생김)
  (src/lib 폴더 생김)
- 버튼 컴포넌트 테스트 결과 잘 나옴

3. 폰트 설치 후 전역으로 세팅하기

- https://noonnu.cc/font_page/1704
  (바뀐 티가 많이 나는 폰트로 적용해 보기)
- app/font 폴더 생성
- 다운로드 받은 파일을 font폴더에 넣어주기
- app/layout.tsx에 `import localFont from "next/font/local";` 추가하기
  (자동완성이 안되니까 from 경로는 외워 두자)
- 나머지 코드 작성하고 `{griun.variable}` variable를 사용 함으로 globals.css에 전역으로 작성해주기

4. app/layout.tsx에서 header와 footer 만들기
