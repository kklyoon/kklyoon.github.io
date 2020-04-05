---
title: "[Algorithm][hackerrank] Between Two Sets"
date: 2020-04-06
tags:
  - 알고리즘
  - algorithm
  - hackerrank
---


원문 : https://www.hackerrank.com/challenges/between-two-sets/problem

You will be given two arrays of integers and asked to determine all integers that satisfy the following two conditions:

The elements of the first array are all factors of the integer being considered
The integer being considered is a factor of all elements of the second array
These numbers are referred to as being between the two arrays. You must determine how many such numbers exist.

Function Description

Complete the getTotalX function in the editor below. It should return the number of integers that are betwen the sets.

getTotalX has the following parameter(s):

a: an array of integers
b: an array of integers

요약하자면 배열 a의 공배수의 집합
배열 b의 공약수의 집합
이 둘의 공집합의 원소의 갯수를 출력하는 문제 (번역이 잘 안되서 한참을 다시 읽어봄)

배열을 따로 만들어서 해결해야하나 라는 고민이 먼저 들지만 포럼에서 결론을 내놓았다.

결과값에서 요구하는게 아니라면 다르게 접근할수도 있겠구나 생각함

```c++
// 최대 공약수
 int gcd(int a, int b){
     while(b!=0){
         int r = a%b;
         a = b;
         b = r;
     }
     return a;
 }
// 배열에서의 최대 공약수
 int gcd(vector<int> input){
     int result = input[0];
     for(int i = 1 ; i < input.size(); i++){
         result = gcd(result, input[i]);
     }
     return result;
 }
// 최소 공배수
 int lcm(int a, int b){
     return a*b/ gcd(a,b);
 }
 // 배열에서의 최소 공배수
 int lcm(vector<int> input){
     int result = input[0];
     for(int i = 1 ; i < input.size(); i++){
         result = lcm(result, input[i]);
     }
     return result;
 }

int getTotalX(vector<int> a, vector<int> b) {
    int f = lcm(a);     // 배열 a의 최소 공배수를 구한다.
    int l = gcd(b);     // 배열 b의 최대 공약수를 구한다.
    int count = 0;
    for(int i = f, j = 2; i <= l; i= f*j, j++){   // 반복문 시작에 배열 a의 최소 공배수를 넣고 최소 공배수를 *2, *3 식으로 곱하면서 배열 b의 최대 공약수에 도달할때까지 반복
        if(l%i==0) count++;       // 반복하는 동안 배열 b의 최대 공약수를 나눌 수 있으면 카운트
    }
    return count;
}
```
