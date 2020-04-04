---
title: "[Algorithm][LeetCode] find the length of the longest substring without repeating characters"
date: 2020-04-04
tags:
  - 알고리즘
  - algorithm
---

원문 : https://leetcode.com/problems/longest-substring-without-repeating-characters/

Given a string, find the length of the longest substring without repeating characters.

__Example 1:__
```
Input: "abcabcbb"
Output: 3 

Explanation: The answer is "abc", with the length of 3. 
```
__Example 2:__
```
Input: "bbbbb"
Output: 1
Explanation: The answer is "b", with the length of 1.
```
__Example 3:__
```
Input: "pwwkew"
Output: 3
Explanation: The answer is "wke", with the length of 3. Note that the answer must be a substring, "pwke" is a subsequence and not a substring.
```

The idea is simple, I use last[] to record the last position of characters. beginPos and lastPos record the range of the current sub string.

For a character, if the last position of a character is before the beginPos, we increase the sub string, otherwise we start from the last position + 1.
```c++
class Solution {
public:
    int lengthOfLongestSubstring(string s) {
        int last[256];
        int maxSize = 0;        
        int beginPos = 0;
        fill_n(last, 256, -1);
        for (int lastPos = 0; lastPos < s.size(); lastPos++) {
           if (last[s[lastPos]] < beginPos) {   
               // substring 길이 증가
               maxSize = max(maxSize, lastPos-beginPos+1);
           } else {     // 
               beginPos = last[s[lastPos]] + 1;     //substring 다시 시작
           }
           last[s[lastPos]] = lastPos;  // s[lastPos] 의 위치 저장
        }
        
        return maxSize;
    }
};
```  

각 char 의 위치를 저장하면서 substring 의 길이를 업데이트 해준 뒤 가장 긴 substring 길이를 저장한다. <br>
last[s[lastPos]] : s[lastPos] 문자가 있는 마지막 위치, 초기값 -1 <br>
beginPos : substring 시작지점  <br>
s 길이만큼 반복하며 last[] 에 해당 char 가 이전에 어느 위치에 있는지 검사
if 전에 위치가 substring 시작위치보다 앞에 있으면 substring 길이 증가, maxSize 와 비교해서 큰 값 저장
else 전에 위치가 substring 시작 위치와 같거나 뒤에 있으면 substring 끝 시작 위치 다시 저장


`다른코드`
```c++
int lengthOfLongestSubstring(string s) {
        vector<int> dict(256, -1);
        int maxLen = 0, start = -1;
        for (int i = 0; i != s.length(); i++) {
            if (dict[s[i]] > start)
                start = dict[s[i]];
            dict[s[i]] = i;
            maxLen = max(maxLen, i - start);
        }
        return maxLen;
    }
```
