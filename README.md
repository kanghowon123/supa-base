작업 순서 메모하기

**1. 넥스트js 설치 후 기본 세팅**

**2. 샤드씨엔 설치 (shadcn)**

- https://ui.shadcn.com/
- Get Started
- next.js
- `pnpm dlx shadcn@latest init`
  (components.json 파일이 생김)
- `pnpm dlx shadcn@latest add button` 버튼 설치 해서 테스트 하기
  (src/components/ui 안에 button.tsx 생김)
  (src/lib 폴더 생김)
- 버튼 컴포넌트 테스트 결과 잘 나옴

**3. 폰트 설치 후 전역으로 세팅하기**

- https://noonnu.cc/font_page/1704
  (바뀐 티가 많이 나는 폰트로 적용해 보기)
- app/font 폴더 생성
- 다운로드 받은 파일을 font폴더에 넣어주기
- app/layout.tsx에 `import localFont from "next/font/local";` 추가하기
  (자동완성이 안되니까 from 경로는 외워 두자)
- 나머지 코드 작성하고 `{griun.variable}` variable를 사용 함으로 globals.css에 전역으로 작성해주기

**4. app/layout.tsx에서 header와 footer 만들기**

**5. app/post - /post/write, /post/list 글 쓰기, 글 목록 페이지 만들기**

/post/write 글 쓰기 페이지 먼저 만들어보자

```tsx
const [title, setTitle] = useState<string>("");
const [content, setContent] = useState<string>("");
```

- 제목(input)과 내용(textarea)을 저장하는 용도로 사용한다

```tsx
const [posts, setPosts] = useState<Post[]>([]);
```

- 게시글을 담는 배열 상태
- 타입스크립트로 배열임을 명시

```tsx
const postId = posts[posts.length - 1]?.id || 0;
```

- 현재 글 배열의 마지막 글의 id를 가져옴
- 배열이 비어있으면 0으로 초기화

```tsx
setPosts((post) => [
  ...post,
  {
    id: postId + 1,
    title,
    content,
  },
]);
```

- 기존 게시글 배열(post)을 펼쳐서 새로운 게시글 추가
- 새 게시글 객체 생성: id, title, content

```tsx
<div>{JSON.stringify(posts)}</div>
```

- 현재 작성된 게시글 배열을 JSON 문자열로 화면에 표시

6. supabase 세팅하기

- https://supabase.com/
- 테이블에 데이터 추가하기
- .env 파일 생성 후 supabase에서 제공한 url,key 값 저장하기
- `URL=https://xxxx.xxx.xx` 띄어쓰기와 ""나 ;를 넣지 않기
  .env 와 .env.local의 차이점
- .env 와 .env.local이 있으면 .env.local이 우선권을 가지
- .env는 기본/공통 환경 변수를 담는데 사용함
- .env.local은 개인 환경 변수를 담는데 사용

슈퍼베이스 사용하기
/post/wirite

```tsx
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;
const supabase = createClient(supabaseUrl, supabaseKey);
```

- !는 “이 값은 절대 undefined가 아니다!”라고 컴파일러에게 알려주는 역할

버튼 비동기로 수정하고 기존 만들어준 id값이랑 담아주던 posts 배열 삭제

```tsx
const { error } = await supabase.from("post").insert({
  title,
  content,
});
```

`supabase.from("post")`

- Supabase는 테이블 단위로 작업함
- 여기서 `"post"`는 DB 안에 있는 테이블 이름
- 즉, `"post"` 테이블에 데이터를 조작하겠다는 의미

`.insert({ title, content })`

- `.insert()`는 새 레코드(row)를 추가하는 함수
- 안에 넣는 객체가 바로 컬럼(column)과 값(value) 매핑
