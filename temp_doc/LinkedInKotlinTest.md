Which line of code shows how to display a nullable string's length and shows 0 instead of null?

1. println(b?.length ?:0)
2. println(b== null? 0: b.length)
3. println(b!!.length ?:0)
4. println(b?.length ?? 0)

-> 3

When the Airplane class is instantiated, id displays Aircraft = null, now Aircraft = C130. Why?

```kotlin

abstract class Aircraft{
    init { println("Aircraft = ${getName()}")}
    abstract fun getName(): String
}

class Airplane(private val name: String): Aircraft(){
    override fun getName(): String = name
}

```

1. The code needs to pass the parameter to the vase class's primary constructor. Since it doesn't it receives a null
2. A superclass is initialized before its subclass. Therefore name has not been set before it is rendered.
3. Abstract functions always return null.
4. Classes are initialized in the same order they are in the file, therefore Aircraft should appear after Airplane

-> 2


You would like to know each time a class property is update. Which code snippet show a built-in delegated property that can accomplish this?

1. Delegates.ovservable()
2. Delegates.observer()
3. Delegates.rx()
4. Delegates.watcher()

-> 1

This code does not print any output to the console. What is wrong?

```kotlin
firstName?.let{
    println("Greetings $firstName!")    
}
```

1. firstName is equal to an empty string.
2. A null pointer exception is thrown.
3. firstName is equal to Boolean false.
4. firstName is equal to null.

->4

How do you fill in the blank below to display all of the even numbers from 1 to 10 with the least amound of code?

```kotlin
for( ____ ){
        println("There are $count butterflies.")
    }
```

1. var count=2; count <= 10; count+=2
2. count in 1..10 % 2
3. count in 2..10 step 2
4. count in 1..10

->3

What value is printed by println()?

```kotlin
val set = setOf("apple", "peer", "orange", "apple")
println(set.count())
```

1. 5
2. 3
1. 4
4. 4

->2

Kotlin interfaces and abstract classes are very similar. What is one thing abstract classes can do that interface cannot?

1. Only abstract classes can store state.
2. Only abstract classes are inheritable by subclasses.
3. Only abstract classes can have abstract methods.
4. Only abstract classes can inherit from multiple superclasses.

->1

How can you retrieve the value of the property codeName without referring to it by name or using destructuring?

```kotlin
data class Project(var codeName: String, var version: String);
fun main(){
    val proj = Project("Chili Pepper", "2.1.0")
}
```

1. proj[1]
2. proj.0
3. proj.component1()
4. proj[0]

->3

An error is generated when you try to compile the following bit of code. How should you change the call to printStudents to fix the error?

```kotlin
fun main() {
    val students = arrayOf("Abel", "Bill", "Cindy", "Darle")
    printStudents(students)
}
fun printStudents(vararg students: String){
    for(student in students) println(student)
}
```

1. printStudents(students!!)
2. printStudents(students.toList())
3. printStudents(students[])
4. printStudents(*students)

->4

Which line converts the string binaryStr, which contains only 0s and 1s, to an integer representing its deciaml value?

```kotlin
val binaryStr = "000011111"
```

1. val myInt = binaryStr.toInt("0b")
2. val myInt = binaryStr.toInt()
3. val myInt = toInt(binaryStr)
4. val myInt = binaryStr.toInt(2)

->4

What is the ouput of this code?

```kotlin
val quote = "The eagle has landed"
println("The length of the quote is $quote.length")
```

1. The length of the quote is The eagle has landed.
2. The length of the quote is 21
3. A compilation error is displayed
4. The length of the quote is The eagle has landed..length

->4

Your function is passed a parameter obj of type Any. Which code snippet shows a way to retrieve the original type of obj, including package information?

1. obj::class.simpleName
2. obj.typeInfo()
3. obj.classInfo()
4. obj::class

->1

You have written a function, sort() that should accept only collections that implement the Comparable interface. How can you restrict the function?

```kotlin
fun sort(list: List<T>): List<T> {
    return list.sorted()
}
```

1. Add<T-> Comparable<T>> between the fun keyword and the function name.
2. Add Comparable<T> between the fun keyword and the function name.
3. Add<T: Comparable<T>> between the fun keyword and the function name.
4. Add<T where Comparable<T>> between the fun keyword and the function name.

->3

You have a data class Product that has two properties, name and price. Which line correctly shows how to destructrue the class into immutable variables?

```kotlin
data class Product(var name: String, var price: Int)

fun main(){
    val product = Product("Ram chips", 79)
}
```

1. val [name, cost] = product
2. val (name, cost) = product
3. var (name, cost) = product
4. var [name, cost] = product

->2

You have started a long-running coroutine whose job you have assigned to a variable named task. If the need arose, how could you abort the coroutine?

```kotlin
val task = launch{

}
```

1. job.stop()
2. task.abort()
3. task.join()
4. task.cancel()


->4