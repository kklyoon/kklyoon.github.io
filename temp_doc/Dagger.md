@Inject  : Dagger 에서 어떻게 인스턴스를 생성할지 알려주는 annotation, 인스턴스 타입, 생성자 파라미터를 알 수 있게 됨, Constructor 를 호출하여 의존성을 주입받는 포인트 선언

@Inject constructor, @Module, @Provides, @Binds : 의존성을 생성하는 Constructor 호출 포인트 선언

View class 같은건 onCreate() 등에서 초기화 되니 @Inject 를 사용할 수 없다.

@Component : 인터페이스에 사용 Dagger에서 Container 를 만들어준다. 컴파일 타임에 그래프 생성에 필요한 정보를 Dagger에 제공함. abstract 혹은 interface 이다. 

@Module : 특정 타입에 대한 인스턴스 제공 -> 의존성을 제공하는 클래스. 의존성은 @Provides, @Binds 로 지정

@Provides : Dagger 가 Dagger Module 안에서 어떻게 인스턴스를 제공해야할지 정함, Dagger 그래프에 함수의 리턴타입을 추가한다. @Binds 가 더 적은 코드를 생성하므로 추천. 의존성을 제공하는 메서드. 직접 만든 클래스가 아닐경우 사용

@Binds : 인터페이스 제공시 어떤 구현체가 필요한지 정의, abstract 함수로 구현, 하나의 파라미터를 가짐

Context 는 안드로이드 시스템에서 이미 제공하므로 의존성 그래프를 만들 때 넘겨줄 수 있음 -> @BindInstance 사용

@BindInstance 는 필요할때 언제든지 인스턴스를 넘겨주는 역할. 의존성 그래프 바깥에서 생성된 객체를 주입하는데 사용

@Component.Factory 는 컴포넌트 타입 리턴함

Scope 규칙
    같은 scope 로 지정된 곳에서만 쓸 수 있다.
    Component 가 scope annotation 으로 지정되면 타입만 제공가능
    subcomponent 는 부모 Component 에서 사용된 scope annotation 을 사용할 수 없다. 
    Scope 를 지정하지 않으면 매번 새로 생성

Fragment 에서는 onAttach() 에서 inject
Activity 에서는 onCreate() 에서 가장 처음에 inject


Codelab 실습
https://developer.android.com/codelabs/android-dagger
