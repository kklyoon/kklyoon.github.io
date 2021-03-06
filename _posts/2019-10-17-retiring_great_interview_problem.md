---
title: "[번역] 훌륭한 인터뷰 문제를 떠나보내며"
date: 2019-10-17
tags:
  - interview
  - programming
  - 개발자 면접
  - 면접
  - 개발자
---

이 글은 
[원문 : https://thenoisychannel.com/2011/08/08/retiring-a-great-interview-problem](https://thenoisychannel.com/2011/08/08/retiring-a-great-interview-problem) 의 글을 의역 및 정리한 것이다. 

## 서론

인터뷰를 하는데에 만능해결책이 있는건 아니다. IQ 테스트와 같은 방법은 개발자를 채용하는데 좋은 방법이 아니다. 기껏해야 하나의 능력에 대한 테스트밖에 안된다. 최악의 경우 후보자가 비슷한 문제를 본적이 있는지 혹은 통찰력이 있는지에 대한 헛수고밖에 안된다. 코딩 문제는 평가하는제 더 좋은 방법이긴 하지만 전통적인 인터뷰는 ( 전화상이 됐든 온사이트가 됐든) 차선의 방법일 뿐이다. 물론 코딩문제가 문제 해결력이나 해결방법을 코드로 바꾸는 능력을 평가할 수 있는것도 아니다.

이러한 문제점을 보완하기위해 몇년동안 Endeca, Google, LinkedIn 에서 해왔던 방법들을 소개하겠다. 일단 그 문제들을 설명하고 포스트의 끝에 왜 그것이 효과적이었는지 설명하겠다.


## 문제

"word break" 문제라고 칭하겠다.

input string 과 dictionary 가 주어지고
dictionary 에 있는 단어들을 공백으로 구분하여라
예를들어 "applepie" 와 dictionary 가 주어지면 "apple pie" 로 출력하라

일부러 이 문제에 대한 조건을 모호하거나 적게 제시해서 후보자에게 질문할 수 있는 기회를 줬다.



Q: 만약 입력 string 이 이미 dictionary 에 있는 단어면 어떻게 되나? </br>
A: single word 는 예외 케이스이다.  

Q: 단어가 두개라고 가정해도 되나? </br>
A: 안된다. 하지만 그렇게 시작하면 더 쉬울것이다.

Q: dictionary 에 없으면 어떻게 하나 </br>
A: null 을 리턴하거나 비슷하게 처리하라

Q: 비슷한 단어나 스펠체크도 해야하나 </br>
A: 정확하기 dictionary 에 있는 단어만 고려하라

Q: 정답이 여러개이면 어떻게 하나 </br>
A: 하나만 출력하라

Q: trie, suffix tree, Fibonacci heap 등을 생각하고 있다. </br>
A: dictionary 를 구현할 필요는 없다. 그냥 적절한 구현을 생각해보라

Q: dictionary 에서 제공되는 명령어가 있나? </br>
A: string 읽기만 제공한다.

Q: dictionary 의 크기는 얼마나 큰가? </br>
A: input string 보다는 훨씬 크다고 가정하라. 하지만 메모리는 충분하다.

후보자가 어떻게 문제의 조건을 설정하는지 보면 후보자의 자료구조와 알고리즘에 대한 이해뿐만이 아니라 커뮤니케이션 스킬과 디테일에 대한 태도를 볼 수 있다. 

## A FizzBuzz Solution

문제의 조건이 정해지고 문제 풀이로 넘어가면. 어떤 후보자들은 input string 을 두 단어로 가정하고 간단한 알고리즘을 작성한다. 나는 이걸 FizzBuzz 문제라 부르고, 유능한 소프트웨어 엔지니어라면 그들이 쓸 수 있는 언어를 사용해서 아래와 같은 코드를 작성할 수 있을 것으로 기대한다.

(Fizz-Buzz 문제 : 
1 부터 100 까지 출력하는 프로그램을 만든다. 3의 배수에는 "Fizz"를 출력한다. 5의 배수에는 "Buzz" 를 출력한다.  3과 5의 공배수인 숫자에는 "FizzBuzz" 를 출력한다.
대부분의 좋은 프로그래머들은 몇분안에 코드를 작성할 수 있어야 한다. 그런데 대부분의 학부 졸업생들은 못한다. senior 개발자들도 10~15분 이상걸리는 걸 봤다.)

자바코드
```java
String SegmentString(String input, Set<String> dict) {
  int len = input.length();
  for (int i = 1; i < len; i++) {
    String prefix = input.substring(0, i);
    if (dict.contains(prefix)) {
      String suffix = input.substring(i, len);
      if (dict.contains(suffix)) {
        return prefix + " " + suffix;
      }
    }
  }
  return null;
}
```

나는 위와 같은 코드도 작성하지 못하는 지원자들을 인터뷰한 적이 있다. (구글 전화인터뷰를 통과한 사람을 포함해서). Jeff Atwood 가 말한대로 FizzBuzz 문제는 프로그램 못하는 지원자들을 인터뷰하는데 낭비하는 시간을 막아줄 수 있다.


## A General Solution (일반적인 방법)

물론 좀더 흥미로운 문제는 input string 의 word 갯수가 몇개가 되도 상관없는 경우이다. 많은 방법이 있지만 가장 정석적인 방법은 recursive backtracking 이다. 다음과 같다.

```java
String SegmentString(String input, Set<String> dict) {
  if (dict.contains(input)) return input;
  int len = input.length();
  for (int i = 1; i < len; i++) {
    String prefix = input.substring(0, i);
    if (dict.contains(prefix)) {
      String suffix = input.substring(i, len);
      String segSuffix = SegmentString(suffix, dict);
      if (segSuffix != null) {
        return prefix + " " + segSuffix;
      }
    }
  }
  return null;
}
```

많은 소프트웨어 엔지니어 후보자들이 위와 같은 코드 혹은 비슷한 (스택을 사용한다든가) 코드를 30분안에 작성하지 못한다. 그들 중 많은 수가 유능하다고 생각은 하지만 머신러닝이나 대규모 검색 기능을 만드는 회사에 그들을 고용하지는 않을 것이다.


## Analyzing the Running Time (실행시간 분석)

후보자가 위와 같은 코드를 작성했다고 해도 아직 남은 것이다. input 크기 n 에 대한 Worst case bigO notation 을 물어봐야 한다. 후보자들은 O(n) 혹은 O(n!) 등의 답을 얘기한다.

그 때 난 다음과 같은 힌트를 준다.

"a", "aa", "aaa", ..., i.e., 같이 글자 'a' 로 구성되어 있는 dictionary 라고 가정해보라 input string n-1 번째에서 'b' 다음에 'a' 가 온다면 어떻게 되는가?

Hopefully the candidate can figure out that the recursive backtracking solution will explore every possible segmentation of this input string, which reduces the analysis to determine the number of possible segmentations. I leave it as an exercise to the reader (with this hint) to determine that this number is O(2n).

후보자가 recursive backtracking solution 이 모든 가능한 segmentation 을 탐색하여 O(2<sup>n</sup>) 이 된다는 힌트를 남기고 풀이는 독자들의 숙제로 남기겠다. (hint : powerset 에 대한 개념, 멱집합 : 집합의 모든 부분집합의 집합)

## An Efficient Solution (효율적인 방법)


후보자가 여기까지 왔다면 O(2<sup>n</sup>) 보다 좋은 방법이 있는지 물어볼 것이다. 그럼 대부분은 이것이 순서가 있는 문제라고 알아차린다. 그리고 똑똑한 사람은 DP 나 memoization 을 적용할 방법을 찾게 된다. 

```java
Map<String, String> memoized;

String SegmentString(String input, Set<String> dict) {
  if (dict.contains(input)) return input;
  if (memoized.containsKey(input) {
    return memoized.get(input);
  }
  int len = input.length();
  for (int i = 1; i < len; i++) {
    String prefix = input.substring(0, i);
    if (dict.contains(prefix)) {
      String suffix = input.substring(i, len);
      String segSuffix = SegmentString(suffix, dict);
      if (segSuffix != null) {
        memoized.put(input, prefix + " " + segSuffix);
        return prefix + " " + segSuffix;
		}
	}
	memoized.put(input, null);
	return null;
}
```


마찬가지로 후보자는 worst-case 분석이 가능해야한다. 요점은 SegmentString 이 input string 에 따라 불린다는것 그리고 그 땐 O(n) 가 나온다는 것이다. 위와 같은 경우 substring 연산이 일정하다는 가정하에 O(n<sup>2</sup>) 가 나온다는 것을 결과로 남기고 풀이는 독자에게 맡기겠다. 


## Why I Love This Problem (이 문제를 좋아하는 이유)

이 문제를 좋아하는 이유는 여러가지가 있다. 몇가지를 나열하자면

- 실제로 소프트웨어를 개발하다보면 나올 수 있는 문제이다. 

- 특화된 지식이 필요없는 문제이다. string, set, maps, recursion, dp 나 memoixation 의 간단한 응용. 학부생의 지식으로 커버할 수 있는 것들이다. 

- 코드가 45분간의 면접시간에 사용할 수 있을 만큼 짧지만 깊이가 있다. 특별한 도구가 필요하지 않다.

- 도전적인 문제이다. 하지만 운으로 풀 수 있는 문제가 아니다. 게다가 문제에 대한 분석과 CS 기본지식의 응용이 요구된다. 

- 문제를 해결하는 후보자의 능력이 모아니면 도가 아니다. 최악의 후보자는 fizzbuzz 문제도 45분동안 풀 수 없다. 문제를 좀 더 어렵게 내도 최적의 정답은 10분이면 도출 가능하다. e.g.) dictionary 가 아주 크면 메모리에서 어떻게 다룰 것인가? 대부분의 후보자는 어떻게든 해결책을 만들어 낸다. 


## Happy Retirement 

불행하게도, 이 좋은 문제도 이제 유행이 지났다. Glassdoor 에 누가 이 문제를 포스팅한 것을 발견했다. 

면접용 좋은 문제를 찾는 것은 어렵다 그리고 비밀유지하기도 어렵다. 이상적인 면접 질문은 한정된 개념를 개선하는 것이다. 난 동료들고 이러한 접근으로 일하고 있다. 

그 동안 word break 문제를 경험한 모두에게 도움이 되길 바란다. 어떤 문제도 완벽하지 않으며 어떠한 문제도 후보자가 적합한지에 대한 완벽한 척도가 될 수는 없다. 그래도 이 문제는 꽤 쓸만하고 많은 사람이 놓칠 수 있을만한 것이다. 


