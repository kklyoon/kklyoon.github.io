---
title: "[Algorithm] Pots of gold game"
date: 2020-11-16
tags:
  - algorithm
  - 알고리즘
  - kotlin
  - careercup
---

[원문](https://www.careercup.com/question?id=15422849)

```
Pots of gold game: Two players A & B. There are pots of gold arranged in a line, each containing some gold coins (the players can see how many coins are there in each gold pot - perfect information). They get alternating turns in which the player can pick a pot from one of the ends of the line. The winner is the player which has a higher number of coins at the end. The objective is to "maximize" the number of coins collected by A, assuming B also plays optimally. A starts the game. 

The idea is to find an optimal strategy that makes A win knowing that B is playing optimally as well. How would you do that? 

At the end I was asked to code this strategy!
```

단순히 큰 값 두개씩 고른다고 생각하면 안되는 문제

A와 B 모두 자신에게 가장 유리한 값을 고른다는 조건이 관건이다.

- A가 왼쪽을 고른것 + min(B가 다음 왼쪽을 고른것, B가 오른쪽을 고른것)
- A가 오른쪽을 고른것 + min(B가 왼쪽을 고른것, B가 다음 오른쪽을 고른것)

을 각각 구한뒤에 큰값을 고르면 된다.

```kotlin
import kotlin.math.*


fun sol(arr: IntArray, start: Int, end: Int): Int{
    if(start>end) return 0

    val l = arr[start] + min(sol(arr, start+2, end), sol(arr, start+1, end-1))
    val r = arr[end] + min(sol(arr, start+1, end - 1), sol(arr, start, end-2))
    return max(l,r)
}

```