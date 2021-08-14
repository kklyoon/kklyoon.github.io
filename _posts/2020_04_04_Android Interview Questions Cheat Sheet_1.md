---
title: "[Android][번역 및 요약] Android Interview Questions Cheat Sheet — Part I"
date: 2020-04-04
tags:
  - Android
  - 안드로이드
  - 면접문제
  - 면접
  - InterView
  - 번역
---


1. What is Application?

안드로이드에서 어플리케이션 클래스는 액티비티나 서비스를 모두 포함하는 기본 클래스이다. 어플리케이션 클래스나 어플리케이션의 서브 클래스는 어플리케이션이나 패키지가 만들어질 때 다른 클래스보다 먼저 만들어지게 된다.

2. What is Context?

A Context is a handle to the system; it provides services like resolving resources, obtaining access to databases and preferences, and so on. An Android app has activities. Context is like a handle to the environment your application is currently running in.

컨텍스트는 시스템 핸들이다; 리소스에 접근하거나 데이터베이스, preferences 등에 접근할 수 있게 한다. 안드로이드 앱은 액티비티를 가지고 있다. 컨텍스트는 현재 동작하고 있는 어플리케이션의 환경에 접근할 수 있는 핸들이다.

- Application Context: This context is tied to the lifecycle of an application. The application context can be used where you need a context whose lifecycle is separate from the current context or when you are passing a context beyond the scope of an activity. 
 
- Application Context: 어플리케이션의 라이프사이클에 묶여있는 컨텍스트. 어플리케이션 컨텍스트는 현재의 컨텍스트와 라이프사이클이 분리되어 있는 컨텍스트에서 사용되거나 엑티비티의 스코프를 넘길때 사용된다.
  
- Activity Context: This context is available in an activity. This context is tied to the lifecycle of an activity. The activity context should be used when you are passing the context in the scope of an activity or you need the context whose lifecycle is attached to the current context. 
  
- Activity Context: 엑티비티에서 사용되는 컨텍스트. 엑티비티의 라이프 사이클에 따른다. 엑티비티 컨텍스트는 엑티비티 스코프 안에 있거나 현제 컨텍스트의 라이프사이클에 붙어 있는 컨텍스트에서 사용되어야 한다. 


3. Why bytecode cannot be run in Android?
Android uses DVM (Dalvik Virtual Machine ) rather using JVM(Java Virtual Machine).
JVM 이 아니라 DVM 을 사용
자바의 경우 컴파일언어이지만 바이트코드를 VM에서 다시 기계어로 변환하는 인터프리터 언어의 특징도 가짐
JVM 자바 바이크 코드를 실행 class 파일을 만들어서 실행, 스택기반, 많은 메모리 필요
DVM 안드로이드 전용 class 파일을 dex파일로 만들고 리소스, 라이브러리를 포함시켜 apk 를 만든다. 레지스터기반이라 빠르다. JIT 컴파일러 사용, 별도의 메모리 캐시 필요
ART DVM 보다 퍼포먼스 좋음. 어플이 설치되는 시점에 바이트코드를 기계어로 번환한다. 설치시간이 오래걸린다는 단점이 있지만 런타임에서 빠르다. 


4. Explain the build process in Android:
First step involves compiling the resources folder (/res) using the aapt (android asset packaging tool) tool. These are compiled to a single class file called R.java. This is a class that just contains constants.
Second step involves the java source code being compiled to .class files by javac, and then the class files are converted to Dalvik bytecode by the “dx” tool, which is included in the sdk ‘tools’. The output is classes.dex.
The final step involves the android apkbuilder which takes all the input and builds the apk (android packaging key) file.

aapt 가 /res 플더 빌드. R.java 로 만듬.
.class 파일 생성, "dx" 툴로 Dalvik 바이트코드 생성 -> classes.dex 파일생성 -> apkbuilder 가 apk 파일 생성

7. What is the Android Application Architecture?
Android application architecture has the following components:
Services − It will perform background functionalities
Intent − It will perform the inter connection between activities and the data passing mechanism
Resource Externalization − strings and graphics
Notification − light, sound, icon, notification, dialog box and toast
Content Providers − It will share the data between applications

서비스 : 백그라운드 기능 담당
Itent : acitivity 사이에 데이터 전달
Notification : 소리, 빛, 아이콘, 푸시, toast, dialog box 등 담당
Content Provider : 어플리케이션 사이의 데이터 공유

1. Lifecycle of an Activity
OnCreate(): This is when the view is first created. This is normally where we create views, get data from bundles etc.
OnCreate(): view 가 처음 만들어지는곳, bundle 데이터도 받아옴
OnStart(): Called when the activity is becoming visible to the user. Followed by onResume() if the activity comes to the foreground, or onStop() if it becomes hidden.
OnStart(): activity 가 화면에 보여지는곳. 다시 실행되는 거면 onStop() 다음에 실행
OnResume(): Called when the activity will start interacting with the user. At this point your activity is at the top of the activity stack, with user input going to it.
OnResume(): 유저의 입력을 받을 수 있는 상태. 이 시점은 activity stack 의 가장 위에 있음
OnPause(): Called as part of the activity lifecycle when an activity is going into the background, but has not (yet) been killed.
OnPause(): background 로 가려할 때, 아직 종료된 것은 아님
OnStop(): Called when you are no longer visible to the user.
OnStop(): 화면에서 보이지 않을 때 
OnDestroy(): Called when the activity is finishing
OnDestroy(): activity 종료
OnRestart(): Called after your activity has been stopped, prior to it being started again
OnRestart(): stop 이후 다시 시작할 때


1.  What’s the difference between onCreate() and onStart()?
The onCreate() method is called once during the Activity lifecycle, either when the application starts, or when the Activity has been destroyed and then recreated, for example during a configuration change.
The onStart() method is called whenever the Activity becomes visible to the user, typically after onCreate() or onRestart().

onCreate() 은 lifecyle 중 한번만 불린다. 화면 회전할 때도 destory 이후에 불림
onStart() 는 화면에 보일 때, onCreate()이나 onRestart() 이후에 불린다.

11. Scenario in which only onDestroy is called for an activity without onPause() and onStop()?
onPause() 나 onStop() 없이 onDestory() 가 불리는 경우가 있나?
-> onCreate() 에서 finish()를 호출하는 경우 바로 onDestroy() 가 불림
If finish() is called in the OnCreate method of an activity, the system will invoke onDestroy() method directly.


1.  Why would you do the setContentView() in onCreate() of Activity class?
As onCreate() of an Activity is called only once, this is the point where most initialisation should go. It is inefficient to set the content in onResume() or onStart() (which are called multiple times) as the setContentView() is a heavy operation.
-> onCreate() 은 한번 불리기 때문에 초기화 하는 로직을 한번 태워줘야한다. setContentView() 무거운 연산이기 때문에 다른데보다 onCreate() 에서 호출해줘야한다.


13. onSavedInstanceState() and onRestoreInstanceState() in activity?
OnRestoreInstanceState() - When activity is recreated after it was previously destroyed, we can recover the saved state from the Bundle that the system passes to the activity. Both the onCreate() and onRestoreInstanceState() callback methods receive the same Bundle that contains the instance state information. But because the onCreate() method is called whether the system is creating a new instance of your activity or recreating a previous one, you must check whether the state Bundle is null before you attempt to read it. If it is null, then the system is creating a new instance of the activity, instead of restoring a previous one that was destroyed.
onSaveInstanceState() - is a method used to store data before pausing the activity.
OnRestoreInstanceState() : activity 가 종료되었다 다시 생성될 때, 저장한 데이터를 Bundle 로 시스템에서 넘겨준다. onCreate() 받는것과 같은 Bundle 이지만 onCreate() 에서는 null 체크를 해줘야함 
onSaveInstanceState() : pause 이후에 불려 데이터 저장

14. Launch modes in Android?
Standard: It creates a new instance of an activity in the task from which it was started. Multiple instances of the activity can be created and multiple instances can be added to the same or different tasks. 
Eg: Suppose there is an activity stack of A -> B -> C. 
Now if we launch B again with the launch mode as “standard”, the new stack will be A -> B -> C -> B.

SingleTop: It is the same as the standard, except if there is a previous instance of the activity that exists in the top of the stack, then it will not create a new instance but rather send the intent to the existing instance of the activity.
Eg: Suppose there is an activity stack of A -> B. 
Now if we launch C with the launch mode as “singleTop”, the new stack will be A -> B -> C as usual. 
Now if there is an activity stack of A -> B -> C. 
If we launch C again with the launch mode as “singleTop”, the new stack will still be A -> B -> C.

SingleTask: A new task will always be created and a new instance will be pushed to the task as the root one. So if the activity is already in the task, the intent will be redirected to onNewIntent() else a new instance will be created. At a time only one instance of activity will exist.
Eg: Suppose there is an activity stack of A -> B -> C -> D. 
Now if we launch D with the launch mode as “singleTask”, the new stack will be A -> B -> C -> D as usual.
Now if there is an activity stack of A -> B -> C -> D. 
If we launch activity B again with the launch mode as “singleTask”, the new activity stack will be A -> B. Activities C and D will be destroyed.

SingleInstance: Same as single task but the system does not launch any activities in the same task as this activity. If new activities are launched, they are done so in a separate task.
Eg: Suppose there is an activity stack of A -> B -> C -> D. If we launch activity B again with the launch mode as “singleInstance”, the new activity stack will be: 
Task1 — A -> B -> C
Task2 — D

Standard : activity 의 새 instance 를 생성. 여러개가 생성됨
ex) activity 가 A -> B -> C 로 생성되었고 다시 B를 생성하면 A -> B -> C -> B

SingleTop: Stardard 와 같지만 맨위에 있는 activity 를 또 생성하면 stack 에 있는 것을 재활용하고 새로 생성하지는 않는다. 스택의 취상위 acitivity 와 비교
ex) A -> B -> C 일 때 C 를 실행하면 A -> B -> C 가 됨

SingleTask : 새로운 Task 를 만들어 루트에 둔다. 스택의 최상위 activity 와 비교하지 않는다. 다시 호출되면 Activity 를 재활용, 다른 Activity 호출시 위에 쌓임

SingleInstance : 항상 새로운 task 생성 singletask 와 차이는 하나의 task 에 하나의 Activity 만 존재

15.  How does the activity respond when the user rotates the screen?
When the screen is rotated, the current instance of activity is destroyed a new instance of the Activity is created in the new orientation. The onRestart() method is invoked first when a screen is rotated. The other lifecycle methods get invoked in the similar flow as they were when the activity was first created.

화면회전이 일어나면 현재 Acitivity 는 destroy 되고 새로 생성. onRestart() 메서드가 실행됨. 다른 순서는 같음

16. How to prevent the data from reloading and resetting when the screen is rotated?
The most basic approach would be to use a combination of ViewModels and onSaveInstanceState() . So how we do we that?
viewModel과 onSavedInstanceState() 를 활용하면 된다.

Basics of ViewModel: A ViewModel is LifeCycle-Aware. In other words, a ViewModel will not be destroyed if its owner is destroyed for a configuration change (e.g. rotation). The new instance of the owner will just re-connected to the existing ViewModel. So if you rotate an Activity three times, you have just created three different Activity instances, but you only have one ViewModel.
So the common practice is to store data in the ViewModel class (since it persists data during configuration changes) and use OnSaveInstanceState to store small amounts of UI data.

ViewModel 은 별도의 LifeCycle을 가짐. 화면회전같은 이벤트에 destroy 되지 않음. 새로운 인스턴스가 생성되어 기존의 ViewModel 에 재연결된다. 기기를 세번 회전시키면 매번 새로운 인스턴스가 생성되지만 ViewModel은 그대로이다. 그래서 일반적인 데이터는 ViewModel 에 저장하고 OnSavedInstanceState를 사용하여 약간의 UI 데이터를 저장한다. 

For instance, let’s say we have a search screen and the user has entered a query in the Edittext. This results in a list of items being displayed in the RecyclerView. Now if the screen is rotated, the ideal way to prevent resetting of data would be to store the list of search items in the ViewModel and the query text user has entered in the OnSaveInstanceState method of the activity.

예를 들어 EditText 를 사용하는 검색화면이 있다고 치면. RecyclerView 에 표시되는 item 들은 ViewModel 에 저장하고 사용자가 입력한 검색어 같은것은 OnSaveInstanceState 를 사용해서 저장하자.


17. Mention two ways to clear the back stack of Activities when a new Activity is called using intent
The first approach is to use a FLAG_ACTIVITY_CLEAR_TOP flag. The second way is by using FLAG_ACTIVITY_CLEAR_TASK and FLAG_ACTIVITY_NEW_TASK in conjunction.

intent 를 사용하여 새로운 Activity 를 호출할때 Activity 의 back stack 을 비우는 두가지 방법은 FLAG_ACTIVITY_CLEAR_TOP 사용하는법과 FLAG_ACTIVITY_CLEAR_TASK 와 FLAG_ACTIVITY_NEW_TASK를 같이 사용하는 법이 있다. 


18.  What’s the difference between FLAG_ACTIVITY_CLEAR_TASK and FLAG_ACTIVITY_CLEAR_TOP?
FLAG_ACTIVITY_CLEAR_TASK is used to clear all the activities from the task including any existing instances of the class invoked. The Activity launched by intent becomes the new root of the otherwise empty task list. This flag has to be used in conjunction with FLAG_ ACTIVITY_NEW_TASK.
FLAG_ACTIVITY_CLEAR_TOP on the other hand, if set and if an old instance of this Activity exists in the task list then barring that all the other activities are removed and that old activity becomes the root of the task list. Else if there’s no instance of that activity then a new instance of it is made the root of the task list. Using FLAG_ACTIVITY_NEW_TASK in conjunction is a good practice, though not necessary.

FLAG_ACTIVITY_CLEAR_TASK 는 task 의 모든 acitivity 제거 후 빈 task를 만듬 FLAG_ACTIVITY_NEW_TASK 와 같이 사용.
FLAG_ACTIVITY_CLEAR_TOP 은 Activity 가 존재하면 다른 Acitivty 모두 제거 후 남겨둠. 존재하지 않으면 task root 에 새로 생성. 역시 FLAG_ACTIVITY_NEW_TASK 과 같이 사용하길 권장

19. Describe content providers
A ContentProvider provides data from one application to another, when requested. It manages access to a structured set of data. It provides mechanisms for defining data security. ContentProvider is the standard interface that connects data in one process with code running in another process.
When you want to access data in a ContentProvider, you must instead use the ContentResolver object in your application’s Context to communicate with the provider as a client. The provider object receives data requests from clients, performs the requested action, and returns the results.

ContentProvider은 요청이 있으면 어플리케이션이 다른 어플리케이션에 데이터를 제공한다. 

20. Access data using Content Provider:
Start by making sure your Android application has the necessary read access permissions. Then, get access to the ContentResolver object by calling getContentResolver() on the Context object, and retrieving the data by constructing a query using ContentResolver.query().
The ContentResolver.query() method returns a Cursor, so you can retrieve data from each column using Cursor methods.

read 권한 체크, Context 객체에 getContentResolver()로 접근, ContentResolver.query() 로 데이터 가져옴. Cursor 를 리턴받아 Cursor 메서드로 데이터 받아옴

21. Describe services
A Service is an application component that can perform long-running operations in the background, and it doesn't provide a user interface. It can run in the background, even when the user is not interacting with your application. These are the three different types of services:
Foreground Service: A foreground service performs some operation that is noticeable to the user. For example, we can use a foreground service to play an audio track. A Notification must be displayed to the user.
Background Service: A background service performs an operation that isn’t directly noticed by the user. In Android API level 26 and above, there are restrictions to using background services and it is recommended to use WorkManager in these cases.
Bound Service: A service is bound when an application component binds to it by calling bindService(). A bound service offers a client-server interface that allows components to interact with the service, send requests, receive results. A bound service runs only as long as another application component is bound to it.

백그라운드에서 오래실행되는 작업 담당. UI가 없음. 사용자 입력이 없어도 동작. 세가지 타입의 Service 가 있음
Foreground Service: 유저가 볼 수 있는 Service. 예를 들어 음원 재생이나. Notification 같은 
Background Service: 유저가 바로 알 수 없는 Service. API 26 이상에서는 WorkManager를 사용하는 것을 권장. 
Bound Service: bindService() 로 실행되는 Service. component 들과 연동되는 Service. send requests, receive results. application component 가 bound 할때만 동작


22. Difference between Service & Intent Service
Service is the base class for Android services that can be extended to create any service. A class that directly extends Service runs on the main thread so it will block the UI (if there is one) and should therefore either be used only for short tasks or should make use of other threads for longer tasks.
IntentService is a subclass of Service that handles asynchronous requests (expressed as “Intents”) on demand. Clients send requests through startService(Intent) calls. The service is started as needed, handles each Intent in turn using a worker thread, and stops itself when it runs out of work.

Service 와 Intent Service 차이점. 
Service 는 메인스레드에서 실행. 긴 동작을 위해서는 다른 스레드를 생성해서 사용
IntentService 비동기 동작하는 Service 의 서브클래스. 워커 스레드 사용 동작 끝나면 알아서 종료


23. Difference between AsyncTasks & Threads?
Thread should be used to separate long running operations from main thread so that performance is improved. But it can’t be cancelled elegantly and it can’t handle configuration changes of Android. You can’t update UI from Thread.
AsyncTask can be used to handle work items shorter than 5ms in duration. With AsyncTask, you can update UI unlike java Thread. But many long running tasks will choke the performance.

AsyncTasks 와 Thread 의 차이점?
스레드는 메인 스레드와 별도로 긴시간 동작이 필요할때 사용. Thead 자체에서 UI 를 변경할 수는 없음.
AsyncTask sms 5ms 이하의 동작을 수행할 때. UI 업데이트가능 긴동작은 성능저하를 발생시킴


24. Difference between Service, Intent Service, AsyncTask & Threads
Android service is a component that is used to perform operations on the background such as playing music. It doesn’t has any UI (user interface). The service runs in the background indefinitely even if application is destroyed.
AsyncTask allows you to perform asynchronous work on your user interface. It performs the blocking operations in a worker thread and then publishes the results on the UI thread, without requiring you to handle threads and/or handlers yourself.
IntentService is a base class for Services that handle asynchronous requests (expressed as Intents) on demand. Clients send requests through startService(Intent) calls; the service is started as needed, handles each Intent in turn using a worker thread, and stops itself when it runs out of work.
A thread is a single sequential flow of control within a program. Threads can be thought of as mini-processes running within a main process.


25. What are Handlers?
Handlers are objects for managing threads. It receives messages and writes code on how to handle the message. They run outside of the activity’s lifecycle, so they need to be cleaned up properly or else you will have thread leaks.
Handlers allow communicating between the background thread and the main thread.
A Handler class is preferred when we need to perform a background task repeatedly after every x seconds/minutes.

스레드를 관리하기 위한 객체. 메세지를 수신함. Activity lifecycle 밖에서 동작. 

26. What is a Job Scheduling?
Job Scheduling api, as the name suggests, allows to schedule jobs while letting the system optimize based on memory, power, and connectivity conditions. The JobScheduler supports batch scheduling of jobs. The Android system can combine jobs so that battery consumption is reduced. JobManager makes handling uploads easier as it handles automatically the unreliability of the network. It also survives application restarts. Some scenarios:
Tasks that should be done once the device is connect to a power supply
Tasks that require network access or a Wi-Fi connection.
Task that are not critical or user facing
Tasks that should be running on a regular basis as batch where the timing is not critical
You can click on this link to learn more about Job Schedulers.

27. What is the relationship between the life cycle of an AsyncTask and an Activity? What problems can this result in? How can these problems be avoided?
An AsyncTask is not tied to the life cycle of the Activity that contains it. So, for example, if you start an AsyncTask inside an Activity and the user rotates the device, the Activity will be destroyed (and a new Activity instance will be created) but the AsyncTask will not die but instead goes on living until it completes.
Then, when the AsyncTask does complete, rather than updating the UI of the new Activity, it updates the former instance of the Activity (i.e., the one in which it was created but that is not displayed anymore!). This can lead to an Exception (of the type java.lang.IllegalArgumentException: View not attached to window manager if you use, for instance, findViewById to retrieve a view inside the Activity).
There’s also the potential for this to result in a memory leak since the AsyncTask maintains a reference to the Activity, which prevents the Activity from being garbage collected as long as the AsyncTask remains alive.
For these reasons, using AsyncTasks for long-running background tasks is generally a bad idea . Rather, for long-running background tasks, a different mechanism (such as a service) should be employed.
Note: AsyncTasks by default run on a single thread using a serial executor, meaning it has only 1 thread and each task runs one after the other.


28. What is the onTrimMemory() method?
onTrimMemory(): Called when the operating system has determined that it is a good time for a process to trim unneeded memory from its process. This will happen for example when it goes in the background and there is not enough memory to keep as many background processes running as desired.
Android can reclaim memory for from your app in several ways or kill your app entirely if necessary to free up memory for critical tasks. To help balance the system memory and avoid the system’s need to kill your app process, you can implement the ComponentCallbacks2 interface in your Activity classes. The provided onTrimMemory() callback method allows your app to listen for memory related events when your app is in either the foreground or the background, and then release objects in response to app lifecycle or system events that indicate the system needs to reclaim memory. Reference

29. Android Bound Service
A bound service is a service that allows other android components (like activity) to bind to it and send and receive data. A bound service is a service that can be used not only by components running in the same process as local service, but activities and services, running in different processes, can bind to it and send and receive data.
When implementing a bound service we have to extend Service class but we have to override onBind method too. This method returns an object that implements IBinder, that can be used to interact with the service.
Implementing Android bound service with Android Messenger
Service based on Messenger can communicate with other components in different processes, known as Inter Process Communication (IPC), without using AIDL.
A service handler: this component handles incoming requests from clients that interact with the service itself.
A Messenger: this class is used to create an object implementing IBinder interface so that a client can interact with the service.
Example Implementation: Link

30. AIDL vs Messenger Queue
As Ariq Ahmad mentioned in the response, Messenger Queue builds us a queue and the data/messages are passed between 2 or more processes sequential. But in case of AIDL the messages are passed in parallel.
AIDL is for the purpose when you’ve to go application level communication for data and control sharing, a scenario depicting it can be : An app requires list of all contacts from Contacts app (content part lies here) plus it also wants to show the call’s duration and you can also disconnect it from that app (control part lies here).
In Messenger queues you’re more IN the application and working on threads and processes to manage the queue having messages so no Outside services interference here.
Messenger is needed if you want to bind a remote service (e.g. running in another process).

31. What is a ThreadPool? And is it more effective than using several separate Threads?
Creating and destroying threads has a high CPU usage, so when we need to perform lots of small, simple tasks concurrently, the overhead of creating our own threads can take up a significant portion of the CPU cycles and severely affect the final response time. ThreadPool consists of a task queue and a group of worker threads, which allows it to run multiple parallel instances of a task.


32. Difference between Serializable and Parcelable?
Serialization is the process of converting an object into a stream of bytes in order to store an object into memory, so that it can be recreated at a later time, while still keeping the object’s original state and data.
How to disallow serialization? We can declare the variable as transient.
Serializable is a standard Java interface. Parcelable is an Android specific interface where you implement the serialization yourself. It was created to be far more efficient than Serializable (The problem with this approach is that reflection is used and it is a slow process. This mechanism also tends to create a lot of temporary objects and cause quite a bit of garbage collection.).

1.  How would you update the UI of an activity from a background service?
We need to register a LocalBroadcastReceiver in the activity. And send a broadcast with the data using intents from the background service. As long as the activity is in the foreground, the UI will be updated from the background. Ensure to unregister the broadcast receiver in the onStop() method of the activity to avoid memory leaks. We can also register a Handler and pass data using Handlers. You can find more details on how to implement here.

35. What is an intent?
Intents are messages that can be used to pass information to the various components of android. For instance, launch an activity, open a webview etc. Two types of intents-
Implicit: Implicit intent is when you call system default intent like send email, send SMS, dial number.
Explicit: Explicit intent is when you call an application activity from another activity of the same application.


36. What is a Sticky Intent?
Sticky Intents allows communication between a function and a service. sendStickyBroadcast() performs a sendBroadcast(Intent) known as sticky, i.e. the Intent you are sending stays around after the broadcast is complete, so that others can quickly retrieve that data through the return value of registerReceiver(BroadcastReceiver, IntentFilter). For example, if you take an intent for ACTION_BATTERY_CHANGED to get battery change events: When you call registerReceiver() for that action — even with a null BroadcastReceiver — you get the Intent that was last Broadcast for that action. Hence, you can use this to find the state of the battery without necessarily registering for all future state changes in the battery.

37. What is a Pending Intent?
If you want someone to perform any Intent operation at future point of time on behalf of you, then we will use Pending Intent.

38. What is an Action?
Description of the intent. For instance, ACTION_CALL — used to perform calls

39. What are intent Filters?
Specifies the type of intent that the activity/service can respond to.

40. Describe fragments:
Fragment is a UI entity attached to Activity. Fragments can be reused by attaching in different activities. Activity can have multiple fragments attached to it. Fragment must be attached to an activity and its lifecycle will depend on its host activity.

41. Describe fragment lifecycle
onAttach() : The fragment instance is associated with an activity instance.The fragment and the activity is not fully initialized. Typically you get in this method a reference to the activity which uses the fragment for further initialization work.
onCreate() : The system calls this method when creating the fragment. You should initialize essential components of the fragment that you want to retain when the fragment is paused or stopped, then resumed.
onCreateView() : The system calls this callback when it’s time for the fragment to draw its user interface for the first time. To draw a UI for your fragment, you must return a View component from this method that is the root of your fragment’s layout. You can return null if the fragment does not provide a UI.
onActivityCreated() : The onActivityCreated() is called after the onCreateView() method when the host activity is created. Activity and fragment instance have been created as well as the view hierarchy of the activity. At this point, view can be accessed with the findViewById() method. example. In this method you can instantiate objects which require a Context object
onStart() : The onStart() method is called once the fragment gets visible.
onResume() : Fragment becomes active.
onPause() : The system calls this method as the first indication that the user is leaving the fragment. This is usually where you should commit any changes that should be persisted beyond the current user session.
onStop() : Fragment going to be stopped by calling onStop()
onDestroyView() : Fragment view will destroy after call this method
onDestroy() :called to do final clean up of the fragment’s state but Not guaranteed to be called by the Android platform.

42. What is the difference between fragments & activities. Explain the relationship between the two.
An Activity is an application component that provides a screen, with which users can interact in order to do something whereas a Fragment represents a behavior or a portion of user interface in an Activity (with its own lifecycle and input events, and which can be added or removed at will).
43. When should you use a fragment rather than an activity?
When there are ui components that are going to be used across multiple activities.
When there are multiple views that can be displayed side by side (viewPager tabs)
When you have data that needs to be persisted across Activity restarts (such as retained fragments)
44. Difference between adding/replacing fragment in backstack?
replace removes the existing fragment and adds a new fragment. This means when you press back button the fragment that got replaced will be created with its onCreateView being invoked.
add retains the existing fragments and adds a new fragment that means existing fragment will be active and they wont be in ‘paused’ state hence when a back button is pressed onCreateView is not called for the existing fragment(the fragment which was there before new fragment was added).
In terms of fragment’s life cycle events onPause, onResume, onCreateView and other life cycle events will be invoked in case of replace but they wont be invoked in case of add.
45. Why is it recommended to use only the default constructor to create a Fragment?
The reason why you should be passing parameters through bundle is because when the system restores a fragment (e.g on config change), it will automatically restore your bundle. This way you are guaranteed to restore the state of the fragment correctly to the same state the fragment was initialised with.
46. You’re replacing one Fragment with another — how do you ensure that the user can return to the previous Fragment, by pressing the Back button?
We need to save each Fragment transaction to the backstack, by calling addToBackStack() before you commit() that transaction
47. Callbacks invoked during addition of a fragment to back stack and while popping back from back stack:
addOnBackStackChangedListener is called when fragment is added or removed from the backstack. Checkout this link for reference.
48. What are retained fragments?
By default, Fragments are destroyed and recreated along with their parent Activity’s when a configuration change occurs. Calling setRetainInstance(true) allows us to bypass this destroy-and-recreate cycle, signaling the system to retain the current instance of the fragment when the activity is recreated.
49. Difference between FragmentPagerAdapter vs FragmentStatePagerAdapter?
FragmentPagerAdapter: the fragment of each page the user visits will be stored in memory, although the view will be destroyed. So when the page is visible again, the view will be recreated but the fragment instance is not recreated. This can result in a significant amount of memory being used. FragmentPagerAdapter should be used when we need to store the whole fragment in memory. FragmentPagerAdapter calls detach(Fragment) on the transaction instead of remove(Fragment).
FragmentStatePagerAdapter: the fragment instance is destroyed when it is not visible to the User, except the saved state of the fragment. This results in using only a small amount of Memory and can be useful for handling larger data sets. Should be used when we have to use dynamic fragments, like fragments with widgets, as their data could be stored in the savedInstanceState.Also it won’t affect the performance even if there are large number of fragments.
50. What is Toast in Android?
Android Toast can be used to display information for the short period of time. A toast contains message to be displayed quickly and disappears after sometime.
51. What are Loaders in Android?
Loader API was introduced in API level 11 and is used to load data from a data source to display in an activity or fragment. Loaders persist and cache results across configuration changes to prevent duplicate queries.
Checkout the Sample Implementation.
52. What is the difference between Dialog & DialogFragment?
A fragment that displays a dialog window, floating on top of its activity’s window. This fragment contains a Dialog object, which it displays as appropriate based on the fragment’s state. Dialogs are entirely dependent on Activities. If the screen is rotated, the dialog is dismissed. Dialog fragments take care of orientation, configuration changes as well.
53. Difference between margin & padding?
Padding will be space added inside the container, for instance, if it is a button, padding will be added inside the button. Margin will be space added outside the container.
54. What is View Group? How are they different from Views?
View: View objects are the basic building blocks of User Interface(UI) elements in Android. View is a simple rectangle box which responds to the user’s actions. Examples are EditText, Button, CheckBox etc. View refers to the android.view.View class, which is the base class of all UI classes.
ViewGroup: ViewGroup is the invisible container. It holds View and ViewGroup. For example, LinearLayout is the ViewGroup that contains Button(View), and other Layouts also. ViewGroup is the base class for Layouts.
55. What is the difference between a regular .png and a nine-patch image?
It is one of a resizable bitmap resource which is being used as backgrounds or other images on the device. The NinePatch class allows drawing a bitmap in nine sections. The four corners are unscaled; the middle of the image is scaled in both axes, the four edges are scaled into one axis.
56. Difference between RelativeLayout and LinearLayout?
Linear Layout — Arranges elements either vertically or horizontally. i.e. in a row or column.
Relative Layout — Arranges elements relative to parent or other elements.
57. What is ConstraintLayout?
It allows you to create large and complex layouts with a flat view hierarchy (no nested view groups). It’s similar to RelativeLayout in that all views are laid out according to relationships between sibling views and the parent layout, but it’s more flexible than RelativeLayout and easier to use with Android Studio’s Layout Editor.
Checkout the Sample Implementation and you can read more about how to implement a simple app with ConstraintLayout here, by yours truly :)
58. When might you use a FrameLayout?
Frame Layouts are designed to contain a single item, making them an efficient choice when you need to display a single View.
If you add multiple Views to a FrameLayout then it’ll stack them one above the other, so FrameLayouts are also useful if you need overlapping Views, for example if you’re implementing an overlay or a HUD element.
59. What is Adapters?
An adapter responsible for converting each data entry into a View that can then be added to the AdapterView (ListView/RecyclerView).
60. How to support different screen sizes?
Create a flexible layout — The best way to create a responsive layout for different screen sizes is to use ConstraintLayout as the base layout in your UI. ConstraintLayout allows you to specify the position and size for each view according to spatial relationships with other views in the layout. This way, all the views can move and stretch together as the screen size changes.
Create stretchable nine-patch bitmaps
Avoid hard-coded layout sizes — Use wrap_content or match_parent. Create alternative layouts — The app should provide alternative layouts to optimise the UI design for certain screen sizes. For eg: different UI for tablets
Use the smallest width qualifier — For example, you can create a layout named main_activity that’s optimised for handsets and tablets by creating different versions of the file in directories as follows:
res/layout/main_activity.xml — For handsets (smaller than 600dp available width)
res/layout-sw600dp/main_activity.xml — For 7” tablets (600dp wide and bigger).
The smallest width qualifier specifies the smallest of the screen’s two sides, regardless of the device’s current orientation, so it’s a simple way to specify the overall screen size available for your layout.
61. Outline the process of creating custom Views:
Create a class that Subclass a view
Create a res/values/attrs.xml file and declare the attributes you want to use with your custom View.
In your View class, add a constructor method, instantiate the Paint object, and retrieve your custom attributes.
Override either onSizeChanged() or onMeasure().
Draw your View by overriding onDraw().
Checkout the Sample Implementation
62. Briefly describe some ways that you can optimize View usage
Checking for excessive overdraw: install your app on an Android device, and then enable the “Debug GPU Overview” option.
Flattening your view hierarchy: inspect your view hierarchy using Android Studio’s ‘Hierarchy Viewer’ tool.
Measuring how long it takes each View to complete the measure, layout, and draw phases. You can also use Hierarchy Viewer to identify any parts of the rendering pipeline that you need to optimise.
63. Bitmap pooling in android?
Bitmap pooling is a simple technique, that aims to reuse bitmaps instead of creating new ones every time. When you need a bitmap, you check a bitmap stack to see if there are any bitmaps available. If there are not bitmaps available you create a new bitmap otherwise you pop a bitmap from the stack and reuse it. Then when you are done with the bitmap, you can put it on a stack.
Find more info here
64. How to load bitmap to memory?
Checkout this article on it. I couldn’t have explained it better myself.
65. What are the permission protection levels in Android?
Normal — A lower-risk permission that gives requesting applications access to isolated application-level features, with minimal risk to other applications, the system, or the user. The system automatically grants this type of permission to a requesting application at installation, without asking for the user’s explicit approval.
Dangerous — A higher-risk permission. Any dangerous permissions requested by an application may be displayed to the user and require confirmation before proceeding, or some other approach may be taken to avoid the user automatically allowing the use of such facilities.
Signature — A permission that the system grants only if the requesting application is signed with the same certificate as the application that declared the permission. If the certificates match, the system automatically grants the permission without notifying the user or asking for the user’s explicit approval.
SignatureOrSystem — A permission that the system grants only to applications that are in the Android system image or that are signed with the same certificate as the application that declared the permission.
66. What is an Application Not Responding (ANR) error, and how can you prevent them from occurring in an app?
An ANR dialog appears when your UI has been unresponsive for more than 5 seconds, usually because you’ve blocked the main thread. To avoid encountering ANR errors, you should move as much work off the main thread as possible.

### Reference

https://android.jlelse.eu/android-interview-questions-cheat-sheet-96ea01c88def
