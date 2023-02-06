---
title: C++ and MPI
description: 'audio intro and list, lemmesee'
topics: ['C++', 'MPI']
color: 'blue darken-4'
---

# C++

### tricky trickeries
- `set` objects are const! if need to edit an element of a set, you have to delete+insert again. really.
- if a class contains a pointer, when copied with the default behavior, the pointer is copied but that means it points to the same data. If needed, overload `operator=` / copy constructor
- object you insert in a set/map require `operator<` to be present (if map, for the key)
  - so if they're eg objects identified by id or string, overload it with
    `bool operator<(const Obj& o) const 
            {   return this->id < o.id;   }`
  - vectors have (lexicographical) ordering! (`operator<`, etc.) - so they can be used as keys without overloading.
  - `unordered_*` instead need `operator==`
- **explicit**: in constructors, use to prevent implicit type-conversion.

<br>

### `<random>`
<md-code>
std::default_random_engine <rr>generator</rr>(seed);
std::uniform_real_distribution&lt;double&gt; <gg>distribution</gg>(-1,1); <cc>// ~U(-1,1)</cc>
double <uu>x</uu> = <gg>distribution</gg>(<rr>generator</rr>); <cc>// x random uniform between -1 and 1<cc>
</md-code> 

<br>

### cast (convert types)
<md-code>
unsigned <gg>intnumber</gg> = 5;
double d = 4. + <bold>static_cast&lt;</bold>double<bold>&gt;</bold>(<gg>intnumber</gg>)</span>;
</md-code>

<br>

### number in argv? **string2integer**
<md-code>
unsigned num = std::<bold>stoi(</bold>argv[1]<bold>);</bold>
</md-code>
inverse:
<md-code>
std::string str = std::<bold>to_string(</bold>num<bold>)</bold>;
</md-code>
 
<br>

### file
- copy file content to vector
<md-code>
std::vector&lt;double&gt; <rr>v</rr>;
std::ifstream <gg>f</gg>(vector_file_name);
<rr>v</rr>.read(<gg>f</gg>);
<gg>f</gg>.close();
</md-code>

- read file piece by piece (`istringstream` / `getline`):
<md-code>
<cc>// simple example with a function that splits string into a vector of words</cc>
<pp>vector&lt;string&gt;</pp> split(const string& s, char <gg>d</gg>=’,’) {
	string <bb>word</bb>;
	vector&lt;string&gt; <pp>v</pp>;
	std::istringstream <rr>iss</rr>(s);
	while(std::getline(<rr>iss</rr>, <bb>word</bb>, <gg>d</gg>))
		<pp>v</pp>.push_back(<bb>word</bb>);
	return <pp>v</pp>;
}
</md-code> 
 
<br> 

### operator overload
<md-code>
class Matrix {
	…
public:
    <cc>// setter/mutator (nonconst) + getter/inspector (const) -> always coupled!</cc>
	double<bold>&</bold> operator() (size_t i, size_t j);
	double operator() (size_t i, size_t j) <bold>const</bold>;
    <cc>// product object * scalar</cc>
	Matrix <bold>operator* (</bold>double scalar<bold>)</bold> const;
}
<cc>// product object * object: must be declared outside class!</cc>
Matrix <bold>operator* (</bold>const Matrix& M1, const Matrix& M2<bold>)</bold>;
</md-code>


* if an operator receives as input objects of the same class (eg. `operator*` between two classes) it must be declared outside the class itself (right below), i.e. as an **helper function**, not a member function.
* When overriding `operator<` (eg for sets, maps), remember to also check the `==` case! (in which you would likely want to order by another class member)

 


<br>

 
### init vars

- **vector**
<md-code>
std::vector&lt;string&gt; <bold>v{</bold>'a','b','b'<bold>}</bold>; <cc>// ['a','b','b'] </cc>
std::vector&lt;string&gt; <bold>v(</bold>3,'x'<bold>)</bold>; <cc>// ['x','x','x'] </cc>
std::vector&lt;string&gt; <bold>v(</bold>3<bold>)</bold>; <cc>// it's long 3 but slots uninitialized </cc>
std::vector&lt;string&gt; <bold>v2(</bold>v.cbegin(),v.cend()<bold>)</bold>; <cc>// copy of v </cc>
</md-code>

- **string**: must specify what to fill in, cannot just tell size.
<md-code>
std::string <bold>s(</bold>5,<oo>'x'</oo><bold>)</bold>; <cc>// 'xxxxx'</cc>
std::string <bold>s(</bold><oo>'abcde'</oo><bold>)</bold>; <cc>// 'abcde'</cc>
std::string <bold>s2(</bold>s,2<bold>)</bold>; <cc>// 'c' (only the third char!! there's no rep like vectors)</cc>
std::string <bold>s3(</bold>s,0,3<bold>)</bold>; <cc>// 'abc' (first 3 chars of s)</cc>
std::string s4 = <bold>s2 + s3</bold>; <cc>// 'cabc' (string join like python yay!)</cc>
</md-code>

- **map** empty init:
<md-code>
<bold>myMap[</bold>key<bold>]</bold>;  <cc>// equivalent to myMap[key] = std::map&lt;T1,T2&gt;();</cc>
</md-code>

- **make pair**: two alternatives (first is more precise with types)
<md-code>
myMap.insert(<bold>std::pair&lt;</bold><rr>int</rr>, <oo>myClass</oo><bold>&gt;(</bold><rr>num</rr>,<oo>T</oo><bold>)</bold>);
myMap.insert(<bold>std::make_pair(</bold><rr>num</rr>, <oo>T</oo><bold>)</bold>);
</md-code>

- **class**: 
<md-code>
<cc>// init by constructor:</cc>
Post <bold>newpost(</bold>date,content<bold>)</bold>;
<cc>// call constructor from another constructor:</cc>
Matrix::<gg>Matrix(</gg>..r, ..c<gg>)</gg> : rows(r), cols(c) {};
Matrix::<bb>Matrix(</bb>..r, ..c, ..<pp>d</pp><bb>)</bb> : <gg>Matrix(</gg>r,c<gg>)**,</gg> data(<pp>d</pp>) {};
<cc>// in a class method, create a class copy of itself:</cc>
Matrix M2 = <bold>*this</bold>;
</md-code>
 

<br>

 ### init set of strings / convert vector to set
[#TODO check] (splitWords() (same as split()) is given in "utilities.h", returns vector of strings)
<md-code>
<pp>vector&lt;</pp>string<pp>&gt;</pp> <pp>v</pp>( split(text,' ') );
<gg>set&lt;</gg>string<gg>&gt;</gg> <bb>words(</bb><pp>v</pp>.cbegin(), <pp>v</pp>.cend()<bb>)</bb>;
<cc>// or by copy:</cc>
<bb>words</bb> = <gg>set&lt;</gg>string<gg>&gt;(</gg><pp>v</pp>.cbegin(), <pp>v</pp>.cend()<gg>)</gg>;
</md-code>
 

<br>


### static variable
- A static variable preserves its value even when out of scope! Like God variables. It cannot be re-initialized. Useful for (very)global counters!

<md-code>
int <gg>fun()</gg> <rr>{</rr>
    <bold>static</bold> int count = 0; <cc>// the variable is declared + initialized to 0 inside the function</cc>
    <bold>count++</bold>; <cc>// but still increases to 1,2,3 every single time you call fun()!</cc>
    return count;
<rr>}</rr>
int main() {
    std::cout << <gg>fun()</gg> << “, “ << <gg>fun()</gg> << “, “ << <gg>fun()</gg> << std::endl;
    return 0;
}
</md-code>

- Output: `1 2 3` (I know right? wow)

<br>

### global counter
<md-code>
<cc>// .h</cc>
class myClass {
    <bold>static</bold> unsigned <gg>counter</gg>;
    ...
}
<cc>// .cpp</cc>
unsigned myClass::<gg>counter</gg> = 1;
</md-code>



<br>

### map rangefor
Remember this! so useful and intuitive
<md-code>
for (const auto& <rr>pair</rr> : <pp>myMap</pp>)
	std::cout << <rr>pair</rr>.first << <oo>" has value "</oo> << <rr>pair</rr>.second << std::endl;
</md-code>
While with iterators it would be:
<md-code>
for (const auto <rr>pairit</rr>=<pp>myMap</pp>.cbegin(); <rr>pairit</rr>!=<pp>myMap</pp>.cend(); <rr>pairit</rr>++)
	std::cout &lt;&lt; <rr>pairit</rr>->first &lt;&lt; <oo>" has value "</oo> &lt;&lt; <rr>pairit</rr>->second &lt;&lt; std::endl;
</md-code>

<br>

### upper/lower_bound
<v-img src="/learn/cpp_upperbound.jpg"></v-img>


<br>

### reserve vs resize
- `.resize()` will modify both capacity and size (extra values get default-init, expensive)
- `.reserve()` will only modify capacity (extra values not initialized)

<br>

### insert vs emplace
TL;DR emplace is much more efficient for containers, since it avoids copying the big boi

<md-code>
std::map&lt;T,U&gt; <pp>myMap</pp>;
<pp>myMap</pp><bold>.insert(</bold> std::make_pair(<gg>t,u</gg>) <bold>)</bold>;
<pp>myMap</pp><bold>.emplace(</bold> <gg>t,u</gg> <bold>)</bold>;
</md-code>

**`.insert()`** - a map is made of pairs, so the usual `.insert()` adds to the container the kind of element it contains (in case of a map, the pair). But with `.insert()` you first create the pair, and then it's copied to the container. If it’s a big object, this might be a problem.

**`.emplace()`** - a more modern and efficient method is to use `.emplace()`, which instead creates already in-place the object: instead of getting a _source_ from which to _copy_ into the container, `.emplace()` takes the parameters that will be forwarded to the constructor of the object stored in the container!

 


<br>

 

### Pointers
**raw pointers**: basic pointer work
<table>
  <tr>
   <td>
<v-img src="/learn/cpp_pointers.jpg"></v-img>
   </td>
   <td> 
    <br> 
<cc>9</cc>:  p points to [0]<br>
    <br> 
<cc>11</cc>:  puts 10 in vector[0]<br>
<cc>12</cc>:  point to next (i.e. [1])<br>
<cc>13</cc>:  puts 20 in vector[1]<br>
<cc>14</cc>:  now p[2] same as v[3] since p points to [1]
    </td>
  </tr>
</table>

<br>

### Shared Pointers
- **what?** Basically a wrapper class over a (raw)pointer with an operator like `*` and `->` overloaded. The objects of the smart pointer class look like normal pointers - but, unlike them, it can deallocate and free destroyed object memory. (no need to call `delete ptr`, out of scope it auto deletes itself+obj, see motivation below) - `unique_ptr<T>`, `shared_ptr<T>`

- **motivation**: when `p` goes out of <span style="color:#f38d8d">scope</span>, it gets deleted together with the object it refers to!
<md-code>
void fun1(T arg) <rr>{</rr>
    shared_ptr&lt;Foo> p = fun2(arg);
<rr>}</rr> <cc>// p goes out of scope, the memory to which p points is automatically <uu>freed</uu></cc></md-code>
 
 ...but NOT if the pointer is returned:

<md-code>
void fun1(T arg) <rr>{</rr>
    shared_ptr&lt;Foo> p = fun2(arg);
    <bold>return p</bold>;
<rr>}</rr> <cc>// p goes out of scope, but the memory to which p points is <uu>not freed</uu></cc></md-code>

- Now that you're motivated (right?), here's all you need to play
<md-code>
    <cc>// Initialize:</cc>
    shared_ptr&lt;T&gt; <gg>sp</gg> = make_shared&lt;T>(7); <cc>//best way (same memory block)</cc>
    <cc>shared_ptr&lt;T&gt; sp(new int(7)); //direct way to initialize, BAD! <a href="https://stackoverflow.com/questions/18301511/stdshared-ptr-initialization-make-sharedfoo-vs-shared-ptrtnew-foo">link</a>)</cc>
    shared_ptr&lt;T&gt; <bb>sp2</bb>(<gg>sp</gg>); <cc>//sp2 copy of sp. Counts of sp goes +1</cc>
    <bb>sp2</bb> = <gg>sp</gg>; <cc>// sp goes +1, but sp2 goes -1 (deleted if reaches 0!)</cc>
    <cc>
    // Other shared_ptr commands:</cc>
    <gg>sp</gg>      	<cc>// true if counts &gt;0 (eg. points to at least 1 object)</cc>
    <gg>sp</gg>.unique() <cc>// true if counts ==1</cc>
    <gg>sp</gg>.swap(<bb>sp2</bb>); <cc>// swap pointers</cc>
    <cc>
    // Add to vector of shared pointers:
    // (useful vectors to just point to data and don't have multiple copies)</cc>
    vector&lt;<bold>shared_ptr&lt;Product&gt;</bold>&gt; <pp>vp</pp>;
    <pp>vp</pp>.push_back( <bold>make_shared&lt;Product&gt;(</bold>constructor params for Product class<bold>)</bold> )
</md-code>
     
- keep in mind that implicit conversion from `int*` to `shared_ptr<int>` (pointer to smartpointer) is <span style="text-decoration:underline;">not possible</span>. -> **so**:
  - use raw pointers if you need to store addresses
  - use smart pointers if you want a new dynamic variable


<br>

### pro knowledge tip
The STL `queue` is a **container adaptor**. That is, it is not a "first-class" container, but instead simply "adapts" one of the sequential first-class containers (by default, the `deque`) for its own purposes. So, the `deque` interface is restricted (i.e., much of it is hidden) so that the required FIFO queue-like behavior is provided.

<br><hr><br>

# MPI

Some more.

