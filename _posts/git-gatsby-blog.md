---
title: Github 과 gatsby를 사용하여 블로그 만들기 (웹알못 주의))
date: 2019-04-01
tags:
  - blog
  - first 
  - github
  - gatsby
  - netlify
  - gitpage
  - 웹알못
---


웹알못의 블로그 구축 시작

github에 블로그를 만들 수 있다고 해서 찾아보던 중

gatsby라는 것을 발견

마크업을 지원하고 플러그인도 많다고 함

구글링을 통해 https://junhobaik.github.io/create-gatsby-blog/ 의 내용을 따라하고

어찌어찌 블로그는 생성했고 Disqus도 붙이고 했으나

포스팅을 작성할 때 마다 빌드하고 배포하는 번거로움이 (-_-)

자동으로 배포하는 Netlify(https://app.netlify.com/) 라는 서비스가 있다고는 하는데 

나름 세팅하고 deploy 를 돌려봤는데
```
Failed to get remote.origin.url (task must either be run in a git repository with a configured origin remote or must be configured with the "repo" option).
```
라는 에러 메세지가 뜬다. 아마도 추측컨데 빌드된 결과가 master 브랜치에 push 되어야 하는데 쓰기 권한이 없나보다. github 쪽 세팅에는  `Read and write access to checks, commit statuses, and pull requests` 라고 되어 있는데 뭐가 문제인지 모르겠다. 


아직 React 가 뭔지, node.js 가 뭔지 모르겠다. 웹프레임워크는 왜 이리 뭐가 많은지....

-----

(추가) 

https://www.netlify.com/docs/cli/

netlify 주소로는 deploy 가 됨

-----

(추가)

github action 을 이용해서 자동 배포가 가능하다고 함 (아직 beta 라고 함)

[GithubAction](https://github.com/features/actions) 신청한사람을 베타유저로 넣어준다고 하니 일단 신청하고 기다리는 중 


## Reference

https://blog.cometkim.kr/posts/%EB%82%98%EB%A7%8C%EC%9D%98-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EA%B0%9C%EB%B0%9C%ED%95%98%EA%B8%B0/0-%ED%94%8C%EB%9E%AB%ED%8F%BC-%EC%84%A0%EC%A0%95/

https://anpigon.github.io/blog/kr/@anpigon/netlify-gatsby--1545785934223/

https://junhobaik.github.io/create-gatsby-blog/

https://medium.com/@changjoopark/travis-ci%EB%A5%BC-%EC%9D%B4%EC%9A%A9%ED%95%9C-github-pages-hexo-%EB%B8%94%EB%A1%9C%EA%B7%B8-%EC%9E%90%EB%8F%99-%EB%B0%B0%ED%8F%AC%ED%95%98%EA%B8%B0-6a222a2013e6



