# YoutubeTS

**데모 사이트**: [https://youtubets.azurewebsites.net/](https://youtubets.azurewebsites.net/)

이 프로젝트는 TypeScript와 Expressjs를 사용하여 간단한 동영상 스트리밍 사이트를 코딩한 것입니다. 본 프로젝트는 [nomadcoders/WeTube](https://github.com/nomadcoders/WeTube)와 [microsoft/TypeScript-Node-Starter](https://github.com/microsoft/TypeScript-Node-Starter)의 소스코드를 참고하였음을 밝히며 멋진 소스코드를 공유해주신 Nomad Coders와 Microsoft에게 감사의 말씀을 올립니다.

## 프로젝트 구조

| 이름                | 설명                                                                                                        |
| ------------------- | ----------------------------------------------------------------------------------------------------------- |
| **src**             | dist 폴더에 빌드될, 개발자가 실제로 코딩한 모든 소스코드들이 있습니다.                                      |
| **src/config**      | Multer와 Passport를 사용하는데 필요한 모든 설정이 있습니다.                                                 |
| **src/controllers** | HTTPS 요청에 응답하는 함수들이 정의된 컨트롤러들이 있습니다.                                                |
| **src/routes**      | 컨트롤러를 서버와 연결해주는 라우터들이 있습니다.                                                           |
| **src/models**      | MongoDB에서 사용될 모델들이 Mongoose 스키마 형식으로 정의되어 있습니다.                                     |
| **src/public**      | 클라이언트 사이드에서 사용하기 위해 코딩한 모든 소스코드가 있습니다.                                        |
| **src/types**       | DefinitelyTyped에 없는, TypeScript 개발에 추가로 필요한 타입 선언이 정의되어있는 .d.ts 코드가 있습니다.     |
| **src**/server.ts   | Express 앱의 시작점입니다.                                                                                  |
| **views**           | 클라이언트에서 렌더링되는 앱의 화면을 Pug를 사용해서 정의한 코드가 있습니다.                                |
| .babelrc            | Babel 설정 파일입니다.                                                                                      |
| .env.example        | Database URL, Session Secret, Storage Key 등 앱에 필요한 중요 정보들의 샘플 형식이 저장되어있는 파일입니다. |
| .eslintrc.json      | Eslint 설정 파일입니다.                                                                                     |
| clean.ts           | 소스코드를 빌드하기 전에 dist 폴더를 삭제하는 코드이며 빌드하기 전에 자동으로 실행됩니다.                   |
| tsconfig.json      | TypeScript 컴파일러 설정 파일입니다.                                                                        |
| webpack.config.ts  | Webpack 설정 파일입니다.                                                                                    |

## NPM 스크립트

| Npm 스크립트   | 설명                                                                                                            |
| -------------- | --------------------------------------------------------------------------------------------------------------- |
| `start`        | Node로 앱의 시작점인 `dist/server.js` 파일을 실행합니다. `npm start` 명령어로 실행할 수 있습니다.               |
| `watch:node`   | 소스코드가 수정되면 자동으로 재시작할 수 있도록 nodemon으로 Node를 실행합니다.                                  |
| `clean`        | dist 폴더와 그 내용물을 전부 삭제하는 코드를 실행합니다.                                                        |
| `build`        | 작성한 소스코드를 빌드하는 작업(`build:assets`, `build:server`)을 전부 실행합니다.                              |
| `watch`        | 모든 Watch 작업 (Webpack, TypeScript, Node)를 전부 실행합니다.                                                  |
| `build:server` | TypeScript로 코딩된 모든 `.ts` 서버 파일을 웹서버에서 사용할 수 있는 `.js` 파일로 `dist` 폴더에 빌드합니다.     |
| `watch:server` | `build:server`와 같지만 TypeScript 서버 코드를 관찰하고 수정될 시 자동으로 다시 빌드합니다.                     |
| `build:assets` | `.scss` 파일과 `.ts` 파일과 같이 클라이언트 사이드에서 사용할 코드들을 정적 파일인 `.css`와 `.js`로 빌드합니다. |
| `watch:assets` | `build:assets`와 같지만 클라이언트 코드를 관찰하고 수정될 시 자동으로 다시 빌드합니다.                          |
