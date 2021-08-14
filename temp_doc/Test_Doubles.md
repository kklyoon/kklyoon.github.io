테스트 타입

Fake : "동작하는" 클래스를 구현하여 테스트, 테스트에 적합하지만 production 에는 맞지 않는다.
Mock : 호출된 메서드를 추적하는 테스트. 올바른 호출 여부에 따라 pass/failure 가 나뉨
Stub : 로직이 없고 리턴값만 있는 테스트. 
Dummy: 전달은 되지만 실제 사용되지 않는 테스트, 예를들면 사용하지 않는 파라미터같은
Spy : 몇가지 추가된 정보를 추적하는 테스트, 예를들면 SpyTaskRepository를 만든다면 addTask 메서드가 몇번 불렸는지 추적하는 것

대부분 일반적으로 Fake 와 Mock 으로 테스트


Integration test : class 간의 반응을 테스트
