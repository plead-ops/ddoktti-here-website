# 똑띠왔어요 웹사이트

공개 소개·개인정보처리방침·이용약관 사이트입니다.

- 홈페이지: https://ddoktti-here.plead.co.kr/
- 개인정보처리방침: https://ddoktti-here.plead.co.kr/privacy
- 이용약관: https://ddoktti-here.plead.co.kr/terms
- 앱 저장소: https://github.com/plead-ops/ddoktti-here

## 개발

Node.js 24 이상에서 `npm ci`, `npm run build`, `npm start`를 실행한 뒤 http://localhost:3000 에 접속합니다. `npm run check`로 구문을 검사합니다.

`build.mjs`가 홈페이지와 `content/*.md` 정책 문서를 HTML로 만들고, `public/`의 로컬 캐릭터·스타일을 복사합니다. 브라우저 JavaScript, 광고, 분석 스크립트, 외부 폰트, 쿠키를 사용하지 않습니다. 정책 변경 시 앱 저장소의 PRIVACY.md / TERMS.md에도 동일 내용을 반영하세요.

## 배포

Dockerfile을 사용하는 Dokploy Application입니다. `main` push가 GitHub 연동으로 자동 배포됩니다. 컨테이너는 비관리자 계정으로 3000번 포트에서 정적 파일을 제공합니다. 영구 데이터 볼륨이나 앱 비밀키가 필요하지 않습니다.

현재 인프라는 앞단 프록시에서 TLS를 처리합니다. Dokploy 도메인은 내부 HTTP, Swarm endpoint는 dnsrr를 사용합니다. 외부 HTTP는 기존 프록시에서 HTTPS로 전환됩니다. `/healthz`는 상태 확인 주소입니다.

## Google 공개 검증

사이트 게시와 Google 검증 승인은 별개입니다. 프로젝트 소유자/편집자의 Google Search Console 계정으로 `plead.co.kr` 소유권을 확인하고 Google Auth Platform에서 승인된 도메인과 위 URL을 등록해야 합니다. 반려 안내에 따라 소유권 확인 후 24시간을 기다려 재신청하세요. Calendar 권한에 필요한 데이터 액세스 검증도 별도로 완료해야 합니다.

운영 주체와 문의 창구는 현재 공개 앱 문서에 맞춰 플리드 및 GitHub Issues로 표시합니다. 정식 운영·개인정보 문의 연락처가 확정되면 정책과 사이트에 함께 반영하세요.
