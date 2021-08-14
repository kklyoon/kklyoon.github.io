
```kotlin
class Solution {
    fun solution(priorities: IntArray, location: Int): Int {
            var printerQueue = ArrayDeque<Pair<Int,Int>>()
        priorities.forEachIndexed{index, i ->
            printerQueue.offer(Pair(index,i))
        }

        var count = 0
        while (!printerQueue.isEmpty()){
            var first = printerQueue.poll()

            if(printerQueue.filter { first.second < it.second }.size > 0){
                printerQueue.offer(first)
            }else{
                count++
                if(first.first == location) return count
            }
        }
        return 0
    }
}
```

class Solution {
    fun solution(arrangement: String): Int {
        var answer: Int = 0
        val stack = Stack<Char>()
        val str = arrangement.replace("()", "-")

        str.forEach {
            when (it) {
                '-' -> {
                    answer += stack.size
                }
                '(' -> {
                    stack.push(it)
                }
                ')' -> {
                    stack.pop()
                    answer += 1
                }
              }
        }
        return answer
    }
}

class Solution {
    fun solution(clothes: Array<Array<String>>) = clothes
        .groupBy { it[1] }.values   // group by type of clothes, keep only names of clothes
        .map { it.size + 1 }        // number of things to wear in a group (including wearing nothing)
        .reduce(Int::times)         // combine
        .minus(1)                   // remove the case where the spy wears nothing
}

class Solution {
    fun solution(bridge_length: Int, weight: Int, truck_weights: IntArray): Int {
        var answer = 0
        val ready_queue : Queue<Int> = LinkedList(truck_weights.toList())
        val bridge_queue : Queue<Int> = LinkedList(List(bridge_length){0})
        
        while(bridge_queue.isNotEmpty()){
            answer++
            bridge_queue.poll()
            if(ready_queue.isNotEmpty()){
                if(bridge_queue.sum() + ready_queue.peek() <= weight){
                    bridge_queue.add(ready_queue.poll())
                }
                else {
                    bridge_queue.add(0)
                }
            }
        }
        return answer
    }
}


fun solution(progresses: IntArray, speeds: IntArray): IntArray {
        val answer : MutableList<Int> = arrayListOf()
        val days = progresses

        for(i in 0 until progresses.size){
            days[i] = ((100 - progresses[i])/speeds[i])
        }

        var max = days[0]
        var releaseCount = 1

        for(i in 1 until days.size){
            if(max < days[i]){
                answer.add(releaseCount)
                releaseCount = 1
                max = days[i]
            }else{
                releaseCount ++
            }
        }

        answer.add(releaseCount)

        return answer.toIntArray()
    }

    fun solution(progresses: IntArray, speeds: IntArray): IntArray {
        var answer = intArrayOf()

        var lastDay = 0
        var cnt = 0
        progresses
                .mapIndexed {idx, progress -> Pair(progress, speeds[idx].toDouble())}
                .map { (100 - it.first) / it.second }
                .map { Math.ceil(it) }
                .map { it.toInt() }
                .asSequence()
                .forEach { curDay ->
                    if (lastDay >= curDay) {
                        cnt++
                    } else {
                        if (lastDay != 0)
                            answer = answer.plus(cnt)
                        lastDay = curDay
                        cnt = 1
                    }
                }
        answer = answer.plus(cnt)

        return answer
    }



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

import java.util.*

class Solution {
    fun solution(jobs: Array<IntArray>): Int {
        var jobList = jobs.map { it[0] to it[1]}.sortedBy { it.first }
        var sortedTime: PriorityQueue<Pair<Int, Int>> = PriorityQueue(compareBy { it.second })
        var current = 0
        var sum = 0
        while (!jobList.isEmpty() || !sortedTime.isEmpty()) {
            val c = jobList.takeWhile { it.first <= current }
            sortedTime.addAll(c)
            jobList = jobList.drop(c.size)
            if (sortedTime.isEmpty()) {
                current = jobList.first().first
            } else {
                val j = sortedTime.poll()
                current += j.second
                sum += current - j.first
            }
        }

        return sum / jobs.size
    }
}

class Solution {
        fun solution(array: IntArray, commands: Array<IntArray>): IntArray {
            return commands.map { command ->
                array.slice(IntRange(command[0] - 1, command[1] - 1)).sorted()[command[2] - 1]
            }
                .toIntArray()
            }
    }

 fun solution(numbers: IntArray): String {
        var answer = ""        
        numbers.sortedWith(Comparator({num1: Int, num2: Int -> "$num2$num1".compareTo("$num1$num2")})).forEach { answer += it }
        if ("(0*)".toRegex().replace(answer, "").isEmpty()) {
            answer = "0"
        }
        return answer
    }

    fun solution(citations: IntArray): Int {
        val result = citations.sortedArrayDescending()
        for (i in 0 until result.size) {
            if (result[i] < i + 1) {
                return i
            }
        }

        return citations.size
    }

class Solution {
    fun solution(baseball: Array<IntArray>) =
        (123..987)
                .filter { !it.toString().contains('0') && it.toString().toSet().size === 3 }
                .filter { check(it, baseball) }.size

    fun check(candidate: Int, baseball: Array<IntArray>) =
            baseball.all { (question, strikes, balls) ->
                question.toString().foldIndexed(Pair(0, 0)) { index, acc, c ->
                    when (c) {
                        candidate.toString()[index] -> Pair(acc.first + 1, acc.second)
                        in candidate.toString() -> Pair(acc.first, acc.second + 1)
                        else -> acc
                    }
                } == Pair(strikes, balls)
            }
}

class Solution {
    fun solution(brown: Int, red: Int): IntArray {
        return (1..red)
            .filter { red % it == 0 }
            .first { brown == (red / it * 2) + (it * 2) + 4 }
            .let { intArrayOf(red / it + 2, it + 2) }
    }
}

class Solution {
        fun solution(n: Int, lost: IntArray, reserve: IntArray): Int {

            var answer = n
            var lostSet = lost.toSet() - reserve.toSet()
            var reserveSet = (reserve.toSet() - lost.toSet()) as MutableSet

            for (i in lostSet) {
                when {
                    i + 1 in reserveSet -> reserveSet.remove(i + 1)
                    i - 1 in reserveSet -> reserveSet.remove(i - 1)
                    else -> answer--
                }
            }
            return answer
        }
}

class Solution {
        fun solution(name: String): Int {
            var answer = 0
            var exp = name.length - 1
            for (i in 0 until name.length) {
                val c = name[i]
                answer += if ('Z' - c + 1 > c - 'A') c - 'A' else 'Z' - c + 1
                if (c == 'A') {
                    var nextIdx = i + 1
                    var countA = 0
                    while (nextIdx < name.length && name[nextIdx] == 'A') {
                        countA++
                        nextIdx++
                    }
                    val tmp = (i - 1) * 2 + (name.length - 1 - i - countA)
                    if (exp > tmp) exp = tmp
                }
            }

            answer += exp
            return answer
        }
    }


class Solution {
    private val primeSet = hashSetOf<Int>()

    fun solution(numbers: String): Int {
        var answer = 0

        val arr = numbers.toCharArray()

        for (i in 1..arr.size) {
            perm(arr, 0, arr.size, i)
        }

        return primeSet.size
    }

    fun isPrime(num: Int): Boolean {
        if (num == 0) return false
        if (num == 1) return false
        if (num == 2) return true

        for (i in 2 until num) {
            if (num % i == 0) {
                return false
            }
        }

        return true
    }

    fun perm(arr: CharArray, depth: Int, n: Int, k: Int) {
        if (depth == k) {
            val text = StringBuilder()

            for (i in 0 until k) {
                if (i == k - 1) {
                    text.append(arr[i])
                } else {
                    text.append(arr[i])
                }
            }

            val num = text.toString().toInt()

            if (isPrime(num)) {
                primeSet.add(num)
            }

            return
        }

        for (i in depth until n) {
            swap(arr, i, depth)
            perm(arr, depth + 1, n, k)
            swap(arr, i, depth)
        }
    }


    fun swap(arr: CharArray, i: Int, j: Int) {
        val temp = arr[i]
        arr[i] = arr[j]
        arr[j] = temp
    }
}

fun main(LukArToDo: Array<String>){
  val word="WORD" //if you have beta version of SL you can change this line to : val word=readLine()!!
  val list=word.toCharArray(). toMutableList()
  val permList=permute(list)
  val distPerList=permList.distinct()
  println("There are ${distPerList.size} permutations of $word :\n")
  for(perm in distPerList) 
     println(perm.joinToString(""))
}
fun <String> permute(list:List <String>):List<List<String>>{
  if(list.size==1) return listOf(list)
  val perms=mutableListOf<List <String>>()
  val sub=list[0]
  for(perm in permute(list.drop(1)))
   for (i in 0..perm.size){
     val newPerm=perm.toMutableList()
     newPerm.add(i,sub)
     perms.add(newPerm)
   }
  return perms
}
