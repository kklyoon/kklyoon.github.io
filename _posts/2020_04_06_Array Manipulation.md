---
title: "[Algorithm][hackerrank] Array Manipulation"
date: 2020-04-06
tags:
  - 알고리즘
  - algorithm
  - hackerrank
---

원문 : https://www.hackerrank.com/challenges/crush/problem

배열의 길이, 배열의 구간별 가중치값들이 더해졌을 때 가장 높은 값을 가지고 있는 구간의 값을 출력하는 문제

```
a b k
1 5 3
4 8 7
6 9 1
````
a, b 는 구간을 나타내고 k 는 가중치 값을 나타낸다.
-> 1 5 3 은 1에서 5까지의 구간에 3을 더하라 

```
index->	 1 2 3  4  5 6 7 8 9 10
	      [0,0,0, 0, 0,0,0,0,0, 0]
	      [3,3,3, 3, 3,0,0,0,0, 0]
	      [3,3,3,10,10,7,7,7,0, 0]
	      [3,3,3,10,10,8,8,8,1, 0]
  ```
각 라인에 따라 구간 값을 더하면 위와 같이 된다.

따라서 처음으로 드는 생각은 위와 같은 과정으로 로직을 짜게 된다.

각 라인을 반복문으로 돌면서 해당 구간을 따라가며 값을 더해주면 당연히 O(n<sup>2</sup>)시간이 걸리게 된다.

시간을 줄일려면 다른 방법을 사용하면 되는데 일단 n+1 사이즈 배열을 선언하고

구간별 값을 시작지점에 더하고 끝지점+1 에 구간별 값을 빼준다.

반복문이 끝나고 배열의 값을 n 까지 모두 더하면 가장 큰 구간의 값을 찾을수 있다. 

```c++
long arrayManipulation(int n, vector<vector<int>> queries) {
    vector<long> output(n+1,0);
    long max = 0;
    long x = 0;
    for(int i = 0 ; i < queries.size(); i++){
        vector<int> per = queries[i];
        int a = per[0]; int b = per[1]; int k = per[2];
        output[a-1] += k;
        if(b + 1 <= n) output[b] -= k;
        
    }
    for(int i = 0 ; i < n ; i++){
        x += output[i];
        if(max < x) max = x;
    }
    return max;
}
```

구간별 값은 구간에만 해당되고 구간이 끝나면 다시 빼는 생각을 해야 나올 수 있는 발상
