## Getting Started

First, install the dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
# or
bun install
```

run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

build시 module 에러 등 파일 삭제한 게 없는데 파일이 없어졌다는 에러시 :
rm -rf .next node_modules/.cache
rm -rf package-lock.json
rm -Rf node_modules
위 3개 순서대로 시행 후 다시 npm 설치하기
npm i

schema.prisma 관련 업데이트 후 아래 명령어 시행하기 :
npx prisma migrate dev --name <새로운 이름>
npx prisma db push
npx prisma generate
이전의 migration 파일은 굳이 삭제할 필요 없음
