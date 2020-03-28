---
title: "[Algorithm] 막대 자르기"
date: 2020-03-27
tags:
  - programming
  - algorithm
  - 알고리즘
  - 막대자르기
---


원본 : https://www.geeksforgeeks.org/cutting-a-rod-dp-13/

## Cutting a Rod | DP-13

다음과 같이 단위 길이당 막대의 가격이 주어졌을 때 n 길이의 막대로 얻을 수 있는 최고가격을 구하라. 예를 들어 길이가 8인 막대가 주어졌을 때 최고 가격은 22이다. ( 길이가 2, 6인 막대로 자름)


|length| 1 |  2 |  3 |  4 |  5 |  6 |  7 |  8  |
|------|---|----|---|-----|---|----|----|-----|
|price    | 1|   5|   8|   9|  10|  17|  17|  20|


단순한 방법으로 접근하면 길이의 모든 조합을 찾아서 가장 높은 가격을 계산한다. 하지만 complexity 가 많이 걸림. DP 방식으로 어떻게 풀 수 있는지 알아보자

__1) 효율적인 구조:__ </br>

각각 다른 위치에서 통나무를 자르고 나서 가격을 계산한뒤 최고 값을 구할 수 있다. 이를 재귀함수로 구현할 수 있다.


cutRod(n) 를 길이가 n 일 때 최고 값이라고 가정하면 점화식은 다음과 같다. 

cutRod(n) = max(price[i] + cutRod(n-i-1)) for all i in {0, 1 .. n-1} <br>
max(i길이의 값 + cutRod(n-i-1)) : price[i] 의 값과 나머지 길이의 가격의 최대 값의 합

__2) 중복문제__</br>


다음과 같이 간단한 재귀함수를 구현할 수 있다.

```C++
int cutRod(int price[], int n) 
{ 
   if (n <= 0) 
     return 0; 
   int max_val = 0; 
  
   // Recursively cut the rod in different pieces and compare different  
   // configurations 
   for (int i = 0; i<n; i++) 
         max_val = max(max_val, price[i] + cutRod(price, n-i-1)); 
  
   return max_val; 
} 
```

막대의 길이가 4라고 가정하면 다음과 같은 재귀트리가 생성된다. 

```
cR() ---> cutRod() 

                             cR(4)
                  /        /           
                 /        /              
             cR(3)       cR(2)     cR(1)   cR(0)
            /  |         /         |
           /   |        /          |  
      cR(2) cR(1) cR(0) cR(1) cR(0) cR(0)
     /        |          |
    /         |          |   
  cR(1) cR(0) cR(0)      cR(0)
   /
 /
CR(0)
```

위의 트리를 참고하면 cR(2) 같은 경우 두번 계산되게 된다. 트리의 depth 가 깊으면 깊을수록 이런 중복된 계산이 많아질 것이다. 따라서 이렇게 계산된 값들은 미리 저장해두는 것이 좋다. 

```C++
int cutRod(int price[], int n) 
{ 
   int val[n+1]; 
   val[0] = 0; 
   int i, j; 
  
   // Build the table val[] in bottom up manner and return the last entry 
   // from the table 
   for (i = 1; i<=n; i++) 
   { 
       int max_val = 0; 
       for (j = 0; j < i; j++) 
         max_val = max(max_val, price[j] + val[i-j-1]); 
       val[i] = max_val; 
   } 
  
   return val[n]; 
} 
```
val[i] 는 i 길이 일때 최대값, 길이는 1부터 시작 <br>

Time Complexity 는 O(n<sup>2</sup>)로 첫번째 방법의 worst case 보다 낫다. 

재귀함수 구현은 다음과 같음
```C++
int cutting_rod_recurv(int price[], int n, int cut)
{
    if( cut == n-1 )
    {
        return price[n-1];
    }

    return std::max( (price[cut] + price[n-1-cut-1]), cutting_rod_recurv(price, n, cut+1) );
}
```




