---
title: "[번역] Singleton in Android"
date: 2019-10-29
tags:
  - Android
  - programming
  - 안드로이드
  - 싱글톤
  - singleton
  - java
---


원문 : https://medium.com/@programmerr47/singletons-in-android-63ddf972a7e7

싱글톤패턴에 대한 글과 또 그 해악에 관한 논란은 많다. <br>
모든 글이 특정한 작은 문제에 대해 언급한다. 메모리 누수나 멀티 프로세싱에 관한. 하지만 모든 주제를 다루는 글은 찾지 못했다. 그래서 이 글에서 모든 이슈 혹은 대부분의 이슈 대해 다뤄본다.  
그리고 나의 안드로이드, 자바, 프로그래밍에 관한 지식으로 최선을 다해 이 글을 작성해보았기 때문에 독자뿐만 아니라 나에게도 큰 도움이 되었다. 

## So, what if I have simple Singleton (싱글톤이란 무엇인가)

아래의 코드를 보자

```java
public class CarelessSingleton{
    public static final CarelessSingleton instance = new CarelessSingleton();
private Object someState;
    
    private CarelessSingleton() {} 
    public void setState(Object state) {
        this.someState = state;
    }
    public Object getState() {
        return someState;
    }
}
```

‘lazy initialisation’와 ‘multithreading’ 측면을 제외해도 두가지 문제점이 있다.

모든 곳에서 변경가능한 싱글톤을 생성하였다. 이는 안드로이드문제가 아닌 아키텍쳐문제로 볼 수 있다. 물론 "어디서 값을 수정하는지 알고 있다." "고작 두군데 밖에 없다" 등등으로 얘기할 수 있다. 하지만 여전히 싱글톤은 글로벌 변수를 다루고 있다. 게다가 두번째 세번째 인스턴스를 만들 수 없고 하나의 인스턴스만 있다. 

losing state 문제, 싱글톤에서 다루는 state 가 application 에서 바뀔 수도 있음
안드로이드에서는 수정가능한 싱글톤이 더 문제가 될 수 있는게 state safe 하지 않다는 것이다. 싱글톤이 어플리케이션에서 바꿀 수 있는 state를 생성한다면 쉽게 state를 잃어버리게 된다.


간단한 어플리케이션을 예로 들어보자. 레이아웃 파일을 보면

```xml
<?xml version="1.0" encoding="utf-8"?>
<FrameLayout
    xmlns:android="http://schemas.android.com/apk/res/android"
    android:layout_width="match_parent"
    android:layout_height="match_parent">
    <TextView
        android:id="@+id/test_text"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="center"
        android:text="0"/>
    <Button
        android:id="@+id/test_button"
        android:layout_width="wrap_content"
        android:layout_height="wrap_content"
        android:layout_gravity="bottom|center_horizontal"
        android:layout_marginBottom="16dp"
        android:text="Set global 5" />
</FrameLayout>
```

그리고 activity:

```java
public class MainActivity extends AppCompatActivity {
    private TextView textView;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        
        textView = (TextView) findViewById(R.id.test_text);
        displayState();
        findViewById(R.id.test_button)
            .setOnClickListener(new View.OnClickListener() 
                @Override
                public void onClick(View view) {
                    CarelessSingleton.instance.setState(5);
                    displayState();
                }
            });
    }
    private void displayState() {
        Object state = CarelessSingleton.instance.getState();
        textView.setText(String.valueOf(state));
    }
}
```

스크린 중앙에는 0 이 뜰것이고 버튼을 클릭하면 5가 될것이다. 앱을 회전시킬 수도 있다. 혹은 홈버튼을 누르고 앱아이콘을 실행할 수 있다. 모든게 일반적인 동작이다. 여전히 화면가운데에 5가 있다. 하지만 다른 앱을 실행하면 어떨까? 게임을 플레이한다든가 이메일을 쓴다든가 하고 다시 앱으로 돌아오면? 5 대신 0이 떠있나?

## 문제점
기기를 사용하는 동안 시스템은 메모리 사용때문에 일정시간 이상 사용되지 않은 앱을 kill 한다. 그리고 다시 앱으로 돌아오면 시스텝에서 새로 실행을 하게 되고 상태를 다시 불러온다. 물론 싱글톤은 저장되지 않고 다시 불러오지도 않는다. 왜냐하면 kill 될 수 있는지 알 수 없으니깐


## 솔루션

확실한 해결책은 없어 보인다. 모든 Activity, Fragment, Service 에서 싱글톤은 바뀔 수 있으니. 저장하는 방법으로 해결할 수 있어보인다. 간단한 해결책 두개가 있는데 완벽하지 않다. 미리 말해두지만 이러한 싱글톤 문제의 해결책은 아키텍쳐의 문제 때문에 완벽하지 않다.


첫번째 꼼수는 싱글톤에서 onSaveInstanceState 와 비슷하게 savestate ( Bundle state ) / restorestate(Bundle state) 를 사용하는 방법

```java
public void saveState(Bundle state) {
    state.putInt(SINGLETON_STATE, getState());
}
public void restoreState(Bundle state) {
    setState(state.getInt(SINGLETON_STATE));
}
```

하지만 이러한 접근은 큰 단점이 있다. 어디서 state 를 저장할지를 정해야한다는 것이다. 사실 activity, view, fragment 들 중 결정할 수 있다. 예를 들어 싱글톤 state 를 activity 에서 변경하고 종료했다고 치면 백그라운드 서비스에서 한번이상 state 를 변경할수도 있다. 그러고 나서 앱이 시스템에 의해 종료되고 재시작하면 싱글톤의 마지막 state 는 불러올 수 없게 된다. 그리고 당연히 state 를 저장하고 불러오는 많은 양의 boilerplate 코드를 모든 activity, view, fragment 등등에 작성해야한다. 

이 방법의 조금 개선된 버젼 : bundle 말고 다른 방법으로 싱글톤의 state 를 저장한다. 예를 들어 SharedPreferences, Stream 혹은 클래스나 인터페이스 등. 그렇게 되면 파라미터 없는 메서드를 만들 수 있고 싱글톤이 스스로 저장하는 로직을 가진다. 따라서 save/restore 를 모든 곳에서 할 있다. 하지만 역시 boilerplate 코드가 많아진다.


두번째 꼼수. 싱글톤 setSate 에 저장기능을 넣어서 자동저장되게 할 수 있다. 싱글톤 초기화 'restore' 에서 자동으로 로드될것이다.

첫번째 꼼수와는 다르게 많은 코드가 생기는것을 막아준다. 하지만 영구적으로 저장되는 단점이 있다. 예를들어 setState 가 루프안에서 돌면 성능저하가 일어난다.

클라이언트에서 자동저장 기능을 키거나 끄는 식으로 두가지 방법을 섞어 쓸 수 있다. 

## 우리가 알게 된 것

위의 예는 naive 한 방법으로 제대로 관리하지 않으면 싱글톤이 제대로 동작하지 않을 수 있다. 싱글톤은 항상 여기저기에서 쓸 수 있고 저장할 필요가 있다는것을 명심하라.


## Context를 저장하는 싱글톤


아래의 코드를 보면:

```java
public class ContextSingleton {
    private static ContextSingleton instance;
    
    public static void init(Context context) {
        if (instance == null) {
            instance = new ContextSingleton(context);
        }
    }
    
    public static ContextSingleton getInstance() {
        return instance;
    }
    
    private final Context context;
    
    private ContextSingleton(Context context) {
        this.context = context;
    }
    
    public Context getContext() {
        return context;
    }
}
```

"이 코드에 무슨 문제가 있지?"라고 생각할 수도 있다. "변경 불가능한 인스턴스가 있는데 문제가 없지 않을까?" 

멀티쓰레딩 환경은 일단 생각하지말자. activity 가 실행될때 ContextSingleton.init(this) 을 통해 싱글톤을 초기화 한다. 그리고 두번째 activity 가 실행되고 세번째 activity 실행되고 네번째 ... 반복되면 메모리가 고갈된다. 


## 문제점

안드로이드에서는 service, 리소스 혹은 파일 등에 접근할때 사용되는 Context 라는 클래스가 사용된다. 그래서 Context 를 사용하는 싱글톤 객체가 매우 유용하게 보인다. 

하지만 이는 함정이다. 물론 많은 라이브러리에서 Context를 레퍼런스하는 싱글톤을 제공하고 있다. 허나 이는 application context 이다. local context 가 아니라는 점

Application context 와 Activity context 는 둘다 Context 클래스의 instance 이다. 하지만 Application context 는 application lifecycle 을 따르고 acitivity context 는 activity lifecycle을 따른다. Application context 는 어플리케이션이 종료될때 destroy 되고 activity context 는 activity 가 종료될때 destroy 된다.

싱글톤은 어플리케이션 전체에 존재한다. 그래서 어플리케이션이 종료될때 종료된다. 만약 싱글톤안에 있는 Acitivity context가 다른 acitivity 에서 실행되고 어플리케이션이 종료된다면 괜찮겠지만 두번째 Acitivity 에서 메모리를 많이 쓴다면 시스템은 첫번째 acitivity 를 종료시키려 할 것이다. 하지만 싱글톤의 레퍼런스를 가지고 있어서 실패할 것이다. 그리고 OOM exception 을 받게 될 것이다. 


## 솔루션

요약하자면 app context 를 제외한 context 를 싱글톤에 넣지마라 그리고 다음과 같이 초기화 코드를 변경하는 것을 추천한다.

```java
public static void init(Context context) {
    if (instance == null) {
        context = context.getApplicationContext();
        instance = new ContextSingleton(context);
    }	
}
```

좀 더 설명하자면 원한다면 이 싱글톤에 activity context 를 넘길 수 있다. 하지만 acitivity 가 종료되거나 다른 activity 로 바꾸거나 새로운 activity 를 시작하면 레퍼런스를 정리할 필요가 있다는 걸 명심하라. 골치아픈 일이기 때문에 싱글톤으로 context 를 넘기지 않는 것을 강력하게 추천한다. 하지면 굳이 context를 싱글톤으로 넘기길 원한다면 application context 를 넘겨라. 만약 local context 를 넘겨야한다는 것을 100% 확신한다면 (예를들어 백그라운드로 비트맵 연산을 해서 view 에 출력을 해야할 때) GC 가 동작할 수 있게 WeakReference 를 사용하라


## 배우게 된 것들

싱글톤에 context 를 넘길 때 두번 생각하라. 올바르게 context 를 사용하고 있는지 확신이 필요하다. local context 를 사용할 거면 메모리 누수를 방지하기위해 객체의 사용이 끝나고 GC 가 수집할 수 있도록 release reference 하는 코드를 추가하라

## 싱글톤을 Activity나 Remote Servcie 안에서 사용하고 싶을 때

activity, fragment, UI component 등은 application 프로세스안에 있기 때문에 안된다. Remote Service 는 remote 프로세스 안에 있기 때문에 안된다. AIDL를 사용하는 수 밖에 없다.(IPC 통신)

예를들어 activity 끼리나 local service 에서는 global static state 를 만들고 공유할 수 있다. ( 나쁜예, 하지만 싱글톤에서 자주 일어난다.) 각각의 프로세스들이 각각의 클래스 로더를 가지고 있기 때문에 activity 나 remote service 에서는 그럴 수 없다. 

이 경우 두개의 싱글톤 instance 를 가진다. 하나는 application 하나는 remote process.

## 솔루션

프로세스간에 싱글톤을 쓰고 싶다면 제발 싱글톤 잊어버리고 AIDL, broadcast, intent 등을 사용하라. 멀티프로세싱에서 사용되는 싱글톤이란 없다. 싱글톤은 싱글프로세스에서 실행되는 것이다.  remote process 와 싱글톤이 앱에 있다면 하나의 프로세스에서 사용하라

## immutable singleton 의 경우

바꿀 수 없는 싱글톤(제약사항과 함께)은 안드로이드에서 싱글 인스턴스를 만들기 위한 적절한 옵션이다. 왜냐하면 instance 를 한번 생성해서 바뀌지 않기 때문이다. 앱을 다시 시작해도 마찬가지

물론, 몇몇의 문제에 대해서는 좋은 해결방법이지만 앞에서 언급했듯이 immutable 싱글톤에 local context 를 넘겨준다면 망한다. 

Immutable Singletons 의 좋은 사용방법은 Enumeration 이라는 ‘extension’ 을 붙이는 것이다.  Enums 은 미리 정의된 인스턴스의 숫자, 하지만 싱글톤과는 다르게 클래스에서 2, 3, 10 개의 인스턴스가 될 수 있다. 예를들어

```java
public static final String CONST_1 = “const 1”;
public static final String CONST_2 = “const 2”;
public static final String CONST_3 = “const 3”;
```

static final 로 상수선언하는 것 대신에 이렇게 정의할 수 있다.

```java
public enum CONSTANTS {
    CONST_1, CONST_2, CONST_3
}
```

이런 접근은 타입정의된 상수값을 얻을 수 있고 다른 곳에서 사용할 때 유효성 검사를 생략할 수 있다.

### 문제점

사실 성능이슈나 메모리 이슈가 크게 문제되지는 않는다. 하지만 구조적인 문제가 있다. 만약 immutable singleton 이 있다면 반드시 필요한 것인지 다시 생각해보자.

### 솔루션

세가지 타입의 immutable singleton 을 떠올릴 수 있다.


1. state 없고 함수만 있는 싱글톤. 사용할 때 Something.INSTANCE.computeSomething(SomethingOther other)’ 이런 식으로 사용하게 된다. 이런 경우 싱글톤이 아닌 빈생성자와 static 메서드만 있는 ‘Utility’ 클래스 같은 것으로 바꾸길 권한다. 그래서 ‘SomeUtil.computeSomething(SomethingOther other)’ 형식으로 사용하게 되면 'INSTANCE' 라는 단어를 줄일 수 있다. 그리고 'SomethingOther' 클래스가 라이브러리 클래스가 아니고 직접 작성한 클래스라면 그냥 ‘other.computeSomething()’ 로 사용할 수 있게 'computeSomething’ 메서드를 그 클래스 안에 작성하는 것을 고려해 보는것도 좋다. 

2. 초기 state ( context 말고) 와 함수로 이루어진 싱글톤. 마찬가지로 private 생성자에 있는 초기 state 와 static 메서드로 이루어진 ‘Utility’ 클래스로 대체될 수 있다. 

3. applicate context 와 함수로 이루어진 싱글톤. 앱과 상호작용하는 라이브러리에서 많이 등장한다. 앱에서 비슷한걸 사용하고 싶으면 생성자가 있는 클래스(싱글톤이 아닌)를 만들어 application context 를 생성자 파라미터로 넣고 이를 Application의 onCreate 에서 호출하는 것을 고려하라. 그래서 Application 클래스의 static 필드에 저장하고 static getter 등으로 접근할 수 있게 ( 아래에서 상세히 설명 예정)


## 싱글톤 올바르게 쓰는법

이 글의 의도는 이미 나와있다. 싱글톤 쓰지마라


1. 전역 state 사용한다. OOP에 맞지 않다.

2. state를 잃어버릴 수 있다.

3. context 누수가 생길 수 있다.

4. test 하기 힘듬 ( init state 를 불러오거나 지우는 stateful 싱글톤이 필요)

5. 멀티프로세싱앱에서는 싱글톤이 싱글톤이 아님

6. 어디서나 실행가능해서 유지보수하기 힘들다.

7. 멀티쓰레드 환경에서 예상못한 동작

8. 확장성 부족

지금부터 싱글톤 쓰지 않겠다. 전역 state 가 필요하면 single instance 를 쓸 것이다. single instance 개념은 싱글톤이랑 다르다. single instance 는 전역 state 를 제공하기 위해 만들어진다.( OOP 에서 일반적이지 않지만 Android 에서는 일반적이다) 하지만 여전히 클래스에서는 여러개의 instance 를 만들 수 있다. 그래서 클래스를 테스트하거나 자잘한 작업들을 처리하기 위한 local instance를 만들기 좋다. 또한 로직을 확장하는 것도


클래스의 전역 instance 를 만들기 위해 application class 를 상속받고 onCreate 메서드에서 초기화 시켜준다. 이제 global instance 의 static getter 를 사용할 수 있다.

```java
public class MyApplication extends Application {
    private static Something something;

    public void onCreate() {
        super.onCreate();
        something = new Something();/new Something(getApplicationContext())/new Something(InitState state);
    }

    public static Something getSomething() {
        return something.
    }

}
```


‘getSomething()’ 을 호출해서 global instance 에 접근할 수 있다. 

## 결론

싱글톤은 나쁘고 사용을 피해야한다. 특히 안드로이드에서는 정말 글로별 변수가 필요하다면 application 생성할 때 global instance 를 만들어서 사용하는 것이 좋다.

## further works
[Working with permissions in Android](
https://medium.com/@programmerr47/working-with-permissions-in-android-bbba823be785)

[Save state with Delegates](
https://medium.com/@programmerr47/save-state-with-delegates-d3c7d3a6a474)

[Refactor your BaseFragment class](
https://medium.com/@programmerr47/refactor-your-basefragment-class-d6f721decc85)

