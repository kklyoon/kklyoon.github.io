---
title: "[Algorithm][프로그래머스] 디스크 컨트롤러"
date: 2020-04-08
tags:
  - 알고리즘
  - algorithm
  - hackerrank
  - Programmers
  - 프로그래머스
---


## 디스크 컨트롤러(lv.3)

[문제 링크](https://programmers.co.kr/learn/courses/30/lessons/42627)

clock 을 선언하여 시간을 잰다. min타임에 최대값 1000 을 넣어 반복할때마다 1000으로 초기화 해준다. 

jobs 를 하나씩 뽑아서 clock 이하 중 최소작업시간에 해당되는 job 을 현재 작업으로 할당한다. 

할당되는 조건을 만족하지 못하면 clock 을 증가시키고 반복문을 다음으로 넘긴다.

할당이 된 경우 jobs 에 할당된 job 을 지우고 해당 job 의 작업시간을 clock 에 더해준다. 

모든 job 의 작업시간을 다 더한 후 job 수로 나누면 결과값 완성

-> Priority Queue 를 쓰지 않아 시간이 오래걸림, 다음 clock 으로 바로 넘어가지 않고 더하면서 반복문을 돌고 있으므로 올래걸림

```c++
int solution(vector<vector<int>> jobs) {
    int answer = 0;
    int clock = 0;
    int sum = 0;        
    int minDist = 1000;
    int currentJobIndex = -1;
    int size = jobs.size();    
    while(jobs.size() > 0){
        for(int i = 0 ; i < jobs.size() ; i++){
            vector<int> job = jobs[i];
            if(job[0] <= clock && job[1] <= minDist){                
                minDist = job[1];
                currentJobIndex = i;
            }                
        }        
        if(currentJobIndex == -1 )
        {
            clock++;
            continue;
        }
        vector<int> job = jobs[currentJobIndex];
        jobs.erase(jobs.begin() + currentJobIndex);
        clock += job[1];        
        sum += (clock - job[0]);        // endtime - requesttime        
        currentJobIndex = -1;
        minDist = 1000;
    }    
    answer = sum/size;    
    
    return answer;
}
```

**다른방법**

우선순위 큐를 사용하여 구하는것이 수행시간을 줄이는데 도움이 됨

1. Priority Queue 를 이용하돼 어떠한 값을 top 둘것인가 비교연산자를 만들어줌, 작업시간이 가장 작은 것을 top 에 두는 큐 만들기
2. 현재 시간에 들어올 수 있는 job을 검사하여 들어올 수 있으면 모두 priority Queue 에 넣어주기
3. Queue 에 있는 것을 꺼내어 작업시간 계산, 다음 시간 계산 or Queue 가 비어 있으면 다음 작업시간계산해서 더해주고 다시 1번으로


```c++
struct minCmp{
    bool operator()(vector<int> a, vector<int> b){
        return a.at(1)>b.at(1);
    }
};

int solution(vector<vector<int>> jobs) {
    int i = 0;
    priority_queue<vector<int>, vector<vector<int>>, minCmp> pq;
    long long result = 0;
    sort(jobs.begin(), jobs.end());
    long long clock = jobs[0][0];
    while(i < jobs.size() || !pq.empty()){
        while( jobs.size() > i && jobs[i][0] <= clock){
            pq.push(jobs[i++]);
        }
        if(!pq.empty()){
            clock += pq.top()[1];
            result += clock - pq.top()[0];
            pq.pop();
        } else {
            clock = jobs[i][0];
        }
    }
    return result/jobs.size();
}
```
## reference

아래 사이트에 동일한 문제가 있다.

https://www.hackerrank.com/challenges/minimum-average-waiting-time/problem

다른점은 테스트 케이스가 매우 크므로 long long 타입으로 처리해야한다.(이것때문에 로직이 틀린줄 알고 몇시간 삽질한건 비밀....)