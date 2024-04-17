/*
build시 module 에러 등 파일 삭제한 게 없는데 파일이 없어졌다는 에러시
rm -rf .next node_modules/.cache
rm -rf package-lock.json
rm -Rf node_modules

위 3개 순서대로 시행 후 다시 npm 설치하기

npm i
*/

/*
schema.prisma 관련 업데이트 후 아래 명령어 시행하기

먼저 /prisma/migrations에 있는 파일 삭제
npx prisma migrate dev --preview-feature 명령어 시행
y누르고 이름은 전꺼에 +1 (ex. 삭제한 파일이 db2였다면 db3)

좀 더 좋은 방법이 있을 것 같긴 한데.. 찾는 중..

*/
