---
title: "github action 사용하기 (gatsby 자동 배포)"
date: 2020-03-27
tags:
  - git
  - github
  - githubaction
  - action
  - gatsby
  - npm
---

블로그 포스팅하는데 글 작성 후  ```npm run deploy```  명령을 쳐야 하는게 번거로웠다. 더불어 그때그때 commit, push 등을 해줘야한다는 것도.....

깃헙 action 이 나온지 좀 됐지만 세팅해야지 해야지 하다가 오늘에야 세팅

검색해보니 누가 스크립트를 이미 만들어 놓은것이 있어서 쉽게 해결되었다.

https://github.com/marketplace/actions/gatsby-publish


[Personnal Access Token](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line)을 세팅 (권한을 뭐뭐 줘야하는지 헷갈리긴하는데 일단 repo, write:package, read:package, admin:org, user, workflow 이렇게 줬는데 잘 동작했다. 하지만 이렇게 까지는 필요없고 read, write 권한만 있으면 되지 않을까 생각함)하고 해당 repo 세팅에서 Secrets 으로 만들어줘야 한다.

Actions 메뉴에서 다음과 같이 Workflow 를 만들어주면 끝

```
name: Publish

on:
  push:
    branches: [ develop ]

jobs:
  build:
    runs-on: ubuntu-latest

    # Steps represent a sequence of tasks that will be executed as part of the job
    steps:
    - uses: actions/checkout@v1
    - uses: enriikke/gatsby-gh-pages-action@v2
      with:
        access-token: ${{ secrets.ACCESS_TOKEN}}
```

이제 develop 브랜치에 push만 하면 자동으로 빌드되어 배포됨. 자동화하니 편하다.

