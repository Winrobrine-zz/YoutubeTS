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
| **src/public**      | 클라이언트 사이드에서 사용할 정적 파일들이 있습니다.                                                        |
| **src/types**       | DefinitelyTyped에 없는, TypeScript 개발에 추가로 필요한 타입 선언이 정의되어있는 .d.ts 코드가 있습니다.     |
| **src**/server.ts   | Express 앱의 시작점입니다.                                                                                  |
| **views**           | 클라이언트에서 렌더링되는 앱의 화면을 Pug를 사용해서 정의한 코드가 있습니다.                                |
| .babelrc            | Babel 설정 파일입니다.                                                                                      |
| .env.example        | Database URL, Session Secret, Storage Key 등 앱에 필요한 중요 정보들의 샘플 형식이 저장되어있는 파일입니다. |
| .eslintrc.json      | Eslint 설정 파일입니다.                                                                                     |
| .clean.ts           | 소스코드를 빌드하기 전에 dist 폴더를 삭제하는 코드이며 빌드하기 전에 자동으로 실행됩니다.                   |
| .tsconfig.json      | TypeScript 컴파일러 설정 파일입니다.                                                                        |
| .webpack.config.ts  | Webpack 설정 파일입니다.                                                                                    |
