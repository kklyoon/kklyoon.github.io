---
title: "[번역] Context? 무슨 Context?"
date: 2019-11-05
tags:
  - 안드로이드
  - Android
  - Context
---


원문 : https://possiblemobile.com/2013/06/context/

## Android/Context이란 무엇인가
Context 는 Android 에서 가장 많이(그리고 가장 잘못) 쓰이는 클래스이다.

Context 는 의도치 않게 만들어 쓰기 쉽다. 리소스 로딩, 새 Activity 실행, 시스템 서비스 가져오기, 저장소 파일 경로얻기, View 만들기 등 모든 동작에 Context 가 필요하다. ( 이 밖에도 많이 쓰인다.)
이 글에서는 Context 가 어떻게 동작하는지 보여주고 안드로이드 앱에서 좀더 효율적으로 사용할 수 있는 팁들을 알아볼 것이다.

### Context Types

모든 Context instances 가 똑같이 만들어 지지는 않는다. 그리고 Android component 에 따라 접근할 수 있는 Context 가 조금 다르다.
 
Application - 앱 프로세스에서 싱글톤으로 동작하는 instance 이다. Activity와 Service 에서 getApplication()와 같은 메서드로 접근한다. Context 를 상속받는 객체에서는 getApplicationContext() 로 접근 가능하다. 프로세스 어디에서 어떻게 접근해도 같은 instance 를 받게 된다.

Activity/Service - 같은 API로 구현된 ContextWrapper 에서 상속된다. 하지만 base context 라고 하는 내부 Context instance 에서 모든 메서드 콜을 대신한다. 프레임워크에서 새 Activity 나 Service instance 를 만들면, ContextImpl instance 또한 생성하여 두 component 를 wrapping 한다. 각각의 Activity, Service 와 해당 base context 는 각각 unique 한 instance 로 생성된다.

BroadcastReceiver - 자체로는 Context 가 아니다. 하지만 프레임워크에서 새로운 broadcast 이벤트가 들어오면 onReceive()에 Context 로 전달한다. 이 Instance 는 두개의 중요한 함수(  registerReceiver(), bindService() ) 이 비활성화된 ReceiverRestrictedContext 이다. 이 두 함수는 BroadcastReceiver.onReceive() 에서는 쓸 수 없다. broadcast 를 처리할 때 마다 Context 는 새 Instance 로 처리한다.

ContentProvider - 컨텍스트는 아니지만 getContext()를 통해 액세스할 수 있는 컨텍스 트를 생성했을 때 제공된다. ContentProvider 가 호출된 곳에서 로컬로 실행되면(즉, 같은 application process) 같은 Application singleton 으로 리턴된다. 하지만 두개의 프로세스에서 각각 실행될때는 provider가 실행되는 패키지를 나타내는 instance 로 생성된다.


## Saved References

다룰 첫번째 이슈는 저장된 instance 를 벗어나는 lifecycle 에 있는 객체나 클래스의 Context 를 참조할 때.

For example, creating a custom singleton that requires a Context to load resources or access a ContentProvider, and saving a reference to the current Activity or Service in that singleton.
예를 들어, Context를 사용하여 resource 를 불러오거나 ContentProvider 에 접근하는 커스텀 singleton을 만들 때, 그리고 현재의 Activity 나 Service 의 참조를 singleton 에다 저장하게 되면

### Bad Singleton

```java
public class CustomManager {
    private static CustomManager sInstance;
 
    public static CustomManager getInstance(Context context) {
        if (sInstance == null) {
            sInstance = new CustomManager(context);
        }
 
        return sInstance;
    }
 
    private Context mContext;
 
    private CustomManager(Context context) {
        mContext = context;
    }
}
```

위 코드의 문제는 Context 가 어디서 왔는지도 모르고, Context 가  Activity 나 Service인 경우에는 참조를 들고 있는 것이 안전하지 않다는 것이다. singleton 이 클래스 내부에서 하나의 static 참조로 관리되기 때문에 일어나는 문제이다. 이렇게 되면 singleton 으로 참조되는 모든 객체들은 GC 가 동작하지 않게 된다. 이 Context 가 Activity 라면 activity 안에 있는 모든 view 와 큰 메모리를 차지하는 객체 등이 남아 있어 메모리 누수를 유발한다.


이를 방지하기 위해, singleton 은 항상 application context 를 참조하게 구현되어야 한다.

```java
public class CustomManager {
    private static CustomManager sInstance;
 
    public static CustomManager getInstance(Context context) {
        if (sInstance == null) {
            //Always pass in the Application Context
            sInstance = new CustomManager(context.getApplicationContext());
        }
 
        return sInstance;
    }
 
    private Context mContext;
 
    private CustomManager(Context context) {
        mContext = context;
    }
}
```

이제 Context 가 어디에서 왔는지 신경쓸 필요가 없다. application context 자체가 singleton 이기 때문에 다른 static 참조 해도 메모리 누수가 발생하지 않는다. 
메모리 누수가 발생하는 또 다른 좋은 예는 Background 실행 중인 Thread 또는 pending 핸들러 내부에서 컨텍스트에 대한 참조를 저장하는 것이다. 

그렇다면 항상 application context 를 참조할 수 있을까? 메모리 누수에 대해 걱정할 필요가 없나? 답은 서두에서 언급한바와 같이 Context 는 항상 똑같지 않다는 것이다.


### Context Capabilities


안전하게 Context 객체를 처리하는 방법은 context 가 어디에서 왔는지에 달렸다.
아래표를 보면 application 이 Context 를 받을 때의 일반적인 위치를 알 수 있다. 

|                         |Application| Activity	| Service	| ContentProvider	| BroadcastReceiver|
|-------------------------|-----------|-------------|-----------|-------------------|------------------|
|Show a Dialog 				|	NO		|YES		|NO			|NO					| NO               |
|Start an Activity 			|	NO<sup>1</sup>	|YES		|NO<sup>1</sup>		|NO<sup>1</sup>				| NO<sup>1</sup>|
|Layout Inflation 			|	NO<sup>2</sup>	|YES		|NO<sup>2</sup>		|NO<sup>2</sup>				| NO<sup>2</sup>|
|Start a Service 			|	YES		|YES		|YES		|YES				| YES|
|Bind to a Service 			|	YES		|YES		|YES		|YES				| NO|
|Send a Broadcast 			|	YES		|YES		|YES		|YES				| YES|
|Register BroadcastReceiver  |	YES		|YES		|YES		|YES				| NO<sup>3</sup>|
|Load Resource Values		|   YES		|YES		|YES		|YES				| YES|

1. Application 이 여기에서 Activity 를 시작할 수는 있다. 그러나 새 task 생성 필요. 특정 상황에서만 해당됨, 하지만 application 에서 편법으로 back stack 동작을 만들 수 있지만 추천하지는 않고 다른 방법을 찾기를 권장한다
2. 가능은 하지만 inflate 가 application 에 정의된 것이 아닌 시스템 기본 테마을 기반으로 이루어짐
3. Android 4.2 이상에서 receiver 가 sticky broadcast 의 현재 값을 얻을 때 사용된 뒤 null 일때 가능 



### User Interface

앞서 나온 표에서 확인한 바와 같이 모든 context가 똑같이 처리될 수는 없다. 이는 UI와 밀접한 관련이 있다. 실제로 UI와 관련된 모든 작업을 처리할 수 있는 것은 Activity이다. 다른 instance는 모든 카테고리에서 비슷하다.

다행히 이 세 가지 동작은 application 이 activity 의 범위 밖에서는 실제로 할 수 있는 것이 없다는 것을 의미한다. 이는 framework 디자인의 목표와 비슷하다.
application context 를 참조하는 dialog 를 만들었을 때 혹은 application context 에서 activity 를 시작하면 exception 을 던지고 crash 된다. 잘못된 동작이라는 뜻이다.

또 다른 문제는 layout 을 inflate 할 때 발생한다. 마지막 layout 조각의 inflation 을 읽을 때, 알 수 없는 프로세스가 숨겨진 동작을 하는 것을 이미 알고 있을 것이다. 올바른 context 사용이 이런 동작과 연관되어 있다. 프레임워크에서는 application context 에서 LayoutInflater 가  완벽하게 view hierarchy 를 만들어내고 에러를 출력하지는 않지만 프로세스는 앱에서 정의된 테마나 스타일을 고려하지 않는다. __이는 Activity 가 manifest 에서 정의된 테마를 사용하는 유일한 Context 이기 때문이다. Context 를 잘못 사용하게 되면 시스템 기본 테마를 사용하는 instance 가 만들어지고 기대했던 것과 다르게 출력된다.__


### The Intersection of these Rules (다른 관점) 

필연적으로 두가지 룰이 출동된다는 결론에 도달할 것이다. long-term reference 가 저장되어야 하는 application 이 있고 UI의 동작 때문에 저장되어야 하는 Activity 가 있다. 만약 그렇다면 이는 framework 가 의도하는 정석적인 디자인이 아니기 때문에 다시 설계하기를 추천한다.

### The Rule of Thumb (경험에서 나온 결정)
 
__대부분의 경우 작업하고 있는 component에 있는 Context를 사용하자 그러면 component의 lifecycle 안에서 Context를 안전하게 참조할 수 있다. Activity 나 Service 밖에 있는 객체의 context 의 참조를 저장하는 경우, 일시적으로라도 해당 참조를 application context로 바꾸길 추천한다.__

