"use client";

import { useMemo, useState } from "react";

type Question = {
  id: number;
  title: string;
  code: string;
  options: string[];
  correct: number[];
  explanation: string;
};

const questions: Question[] = [
  {
    id: 1,
    title: "Câu 1: Xét đoạn code sau",
    code: `class Counter {
    int count;

    Counter inc() {
        count++;
        return this;
    }
}

public class Test {
    public static void main(String[] args) {
        Counter c = new Counter();

        Counter d = c.inc().inc();

        System.out.println(c.count);
        System.out.println(c == d);
    }
}`,
    options: [
      "Dòng đầu in 2.",
      "Dòng thứ hai in true.",
      "inc() trả về chính object hiện tại.",
      "Mỗi lần gọi inc() tạo một Counter mới.",
    ],
    correct: [0, 1, 2],
    explanation:
      "return this trả về chính object hiện tại. c.inc().inc() gọi hai lần trên cùng object nên count thành 2, d và c cùng trỏ một object.",
  },
  {
    id: 2,
    title: "Câu 2: Xét đoạn code sau",
    code: `class A {
    int x = 1;

    A() {
        f();
    }

    void f() {
        System.out.println(x);
    }
}

class B extends A {
    int x = 2;

    void f() {
        System.out.println(x);
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Output là 0.",
      "Output là 1.",
      "Output là 2.",
      "Constructor A gọi method f() của B.",
      "Khi B.f() chạy trong constructor A, field x của B chưa được khởi tạo bằng 2.",
    ],
    correct: [0, 3, 4],
    explanation:
      "Trong constructor A, dynamic dispatch vẫn xảy ra nên gọi B.f(). Nhưng lúc đó phần field initializer của B chưa chạy, nên B.x vẫn là giá trị mặc định 0.",
  },
  {
    id: 3,
    title: "Câu 3: Xét đoạn code sau",
    code: `class A {
    static void f() {
        System.out.println("A static");
    }

    void g() {
        System.out.println("A instance");
    }
}

class B extends A {
    static void f() {
        System.out.println("B static");
    }

    void g() {
        System.out.println("B instance");
    }
}

public class Test {
    public static void main(String[] args) {
        A obj = new B();

        obj.f();
        obj.g();
    }
}`,
    options: [
      "Dòng obj.f() in A static.",
      "Dòng obj.g() in B instance.",
      "static method được quyết định theo kiểu tham chiếu.",
      "instance method override được quyết định theo object thật.",
      "Dòng obj.f() in B static vì object thật là B.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "static method bị hide, không override động. obj có kiểu A nên obj.f() gọi A.f(). g() là instance method nên dispatch theo object thật B.",
  },
  {
    id: 4,
    title: "Câu 4: Xét đoạn code sau",
    code: `class A {
    private void f() {
        System.out.println("A");
    }

    void call() {
        f();
    }
}

class B extends A {
    void f() {
        System.out.println("B");
    }
}

public class Test {
    public static void main(String[] args) {
        A obj = new B();

        obj.call();
    }
}`,
    options: [
      "Output là A.",
      "Output là B.",
      "private method không bị override.",
      "call() trong A gọi f() private của A.",
      "Chương trình lỗi biên dịch vì B không được khai báo f().",
    ],
    correct: [0, 2, 3],
    explanation:
      "A.f() là private nên không được kế thừa/override. B.f() là method mới. call() thuộc A và gọi private f() của A.",
  },
  {
    id: 5,
    title: "Câu 5: Xét đoạn code sau",
    code: `class A {
    int x = 1;

    static int y = 10;
}

class B extends A {
    int x = 2;

    static int y = 20;
}

public class Test {
    public static void main(String[] args) {
        A obj = new B();

        System.out.println(obj.x);
        System.out.println(obj.y);
        System.out.println(((B) obj).x);
        System.out.println(((B) obj).y);
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in 10.",
      "Dòng thứ ba in 2.",
      "Dòng thứ tư in 20.",
      "Field cũng đa hình giống instance method.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Field không đa hình. Field instance và static field đều được chọn theo kiểu tham chiếu/kiểu biểu thức, không theo object runtime.",
  },
  {
    id: 6,
    title: "Câu 6: Xét đoạn code sau",
    code: `class Parent {
    Parent(int x) {
        System.out.println("P" + x);
    }
}

class Child extends Parent {
    Child() {
        this(5);
        System.out.println("C0");
    }

    Child(int x) {
        super(x);
        System.out.println("C1");
    }
}

public class Test {
    public static void main(String[] args) {
        new Child();
    }
}`,
    options: [
      "Output là P5 C1 C0.",
      "Constructor Child() gọi Child(int).",
      "Constructor Child(int) gọi Parent(int).",
      "this(5) và super(5) có thể cùng xuất hiện trong constructor Child().",
    ],
    correct: [0, 1, 2],
    explanation:
      "Child() gọi this(5), tức Child(int). Child(int) gọi super(x), sau đó in C1, rồi quay lại Child() in C0.",
  },
  {
    id: 7,
    title: "Câu 7: Xét đoạn code sau",
    code: `abstract class A {
    abstract void f();

    void g() {
        System.out.println("g");
    }
}

class B extends A {
    void f() {
        System.out.println("f");
    }
}

public class Test {
    public static void main(String[] args) {
        A obj = new B();

        obj.f();
        obj.g();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là f rồi g.",
      "Có thể tạo object trực tiếp bằng new A().",
      "B phải implement f() vì B không abstract.",
      "A có thể vừa có abstract method vừa có concrete method.",
    ],
    correct: [0, 1, 3, 4],
    explanation:
      "Abstract class có thể chứa cả abstract và concrete method. Class con cụ thể phải implement abstract method còn thiếu.",
  },
  {
    id: 8,
    title: "Câu 8: Xét đoạn code sau",
    code: `interface I {
    void f();

    default void g() {
        System.out.println("I");
    }
}

abstract class A implements I {
    public void f() {
        System.out.println("A");
    }
}

class B extends A {
}

public class Test {
    public static void main(String[] args) {
        I obj = new B();

        obj.f();
        obj.g();
    }
}`,
    options: [
      "Output là A rồi I.",
      "A implement f() hợp lệ vì method được khai báo public.",
      "B kế thừa f() từ A.",
      "B bắt buộc phải override g().",
      "default method trong interface có thể được gọi qua biến kiểu interface.",
    ],
    correct: [0, 1, 2, 4],
    explanation:
      "A đã implement f() public, B kế thừa lại. g() là default method nên B không bắt buộc override.",
  },
  {
    id: 9,
    title: "Câu 9: Xét đoạn code sau",
    code: `interface I {
    default void f() {
        System.out.println("I");
    }
}

interface J {
    default void f() {
        System.out.println("J");
    }
}

class C implements I, J {
    public void f() {
        I.super.f();
        J.super.f();
    }
}

public class Test {
    public static void main(String[] args) {
        new C().f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là I rồi J.",
      "C bắt buộc phải override f() để giải quyết xung đột default method.",
      "I.super.f() là cách gọi default method của interface I.",
      "Nếu C không override f(), compiler tự chọn interface đứng trước.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Hai interface có default method cùng signature gây xung đột. Class implement phải override và có thể gọi I.super.f(), J.super.f().",
  },
  {
    id: 10,
    title: "Câu 10: Xét đoạn code sau",
    code: `interface I {
    static void f() {
        System.out.println("I");
    }
}

class A implements I {
}

public class Test {
    public static void main(String[] args) {
        I.f();
        A.f();
    }
}`,
    options: [
      "Dòng I.f() hợp lệ.",
      "Dòng A.f() lỗi biên dịch.",
      "Static method trong interface không được kế thừa vào class implement.",
      "Nếu chỉ giữ I.f(), chương trình in I.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Static method của interface thuộc về chính interface, không gọi qua class implement.",
  },
  {
    id: 11,
    title: "Câu 11: Xét đoạn code sau",
    code: `class A {
    public Number f() {
        return 1;
    }
}

class B extends A {
    public Integer f() {
        return 2;
    }
}

public class Test {
    public static void main(String[] args) {
        A obj = new B();

        System.out.println(obj.f());
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 2.",
      "Integer là covariant return type hợp lệ vì Integer là subclass của Number.",
      "Return type khi override bắt buộc phải giống hệt, nên code lỗi.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Override cho phép return type là subtype của return type method cha. Runtime gọi B.f() nên in 2.",
  },
  {
    id: 12,
    title: "Câu 12: Xét đoạn code sau",
    code: `class A {
    public int f() {
        return 1;
    }
}

class B extends A {
    public long f() {
        return 2L;
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Primitive return type int không thể được override bằng long.",
      "Đây là overload hợp lệ vì return type khác nhau.",
      "Return type không được dùng một mình để phân biệt overload.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Cùng tên cùng tham số thì đang override. Primitive return type phải tương thích chính xác, không có covariant return cho primitive.",
  },
  {
    id: 13,
    title: "Câu 13: Xét đoạn code sau",
    code: `class A {
    void f(Object o) {
        System.out.println("A Object");
    }
}

class B extends A {
    void f(String s) {
        System.out.println("B String");
    }

    void f(Object o) {
        System.out.println("B Object");
    }
}

public class Test {
    public static void main(String[] args) {
        A obj = new B();

        obj.f("hi");
        obj.f(new Object());
    }
}`,
    options: [
      "Dòng đầu in B Object.",
      "Dòng thứ hai in B Object.",
      "Compiler chọn signature f(Object) dựa trên kiểu A của obj.",
      "Sau đó runtime dispatch đến B.f(Object).",
      "Dòng đầu in B String.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Biến obj có kiểu A nên compiler chỉ xét f(Object). B override f(Object), nên runtime gọi B.f(Object). f(String) không được chọn.",
  },
  {
    id: 14,
    title: "Câu 14: Xét đoạn code sau",
    code: `public class Test {
    static void f(Integer x) {
        System.out.println("Integer");
    }

    static void f(long x) {
        System.out.println("long");
    }

    static void f(int... x) {
        System.out.println("varargs");
    }

    public static void main(String[] args) {
        f(1);
    }
}`,
    options: [
      "Output là long.",
      "Widening được ưu tiên hơn boxing.",
      "Boxing được ưu tiên hơn varargs.",
      "Output là Integer.",
      "Output là varargs.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Trong overload resolution, widening fixed-arity được ưu tiên hơn boxing, và varargs thường xét sau fixed-arity.",
  },
  {
    id: 15,
    title: "Câu 15: Xét đoạn code sau",
    code: `public class Test {
    static void f(String s) {
        System.out.println("String");
    }

    static void f(StringBuilder s) {
        System.out.println("StringBuilder");
    }

    static void f(Object o) {
        System.out.println("Object");
    }

    public static void main(String[] args) {
        f(null);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Lời gọi f(null) bị ambiguous.",
      "String và StringBuilder đều cụ thể hơn Object.",
      "Compiler chọn Object vì Object là cha chung.",
      "Nếu bỏ f(StringBuilder), f(null) sẽ chọn f(String).",
    ],
    correct: [0, 1, 2, 4],
    explanation:
      "null khớp với mọi reference type. String và StringBuilder không có quan hệ subtype với nhau nên ambiguous.",
  },
  {
    id: 16,
    title: "Câu 16: Xét đoạn code sau",
    code: `class Box {
    int v;

    Box(int v) {
        this.v = v;
    }
}

public class Test {
    static void swap(Box a, Box b) {
        Box temp = a;
        a = b;
        b = temp;

        a.v = 100;
    }

    public static void main(String[] args) {
        Box x = new Box(1);
        Box y = new Box(2);

        swap(x, y);

        System.out.println(x.v);
        System.out.println(y.v);
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in 100.",
      "swap không đổi được x và y ở main trỏ tới object nào.",
      "a.v = 100 sửa object ban đầu của y.",
      "Dòng đầu in 100.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "swap chỉ đổi hai biến local a, b. Sau swap trong method, a trỏ tới object của y nên a.v = 100 sửa y.",
  },
  {
    id: 17,
    title: "Câu 17: Xét đoạn code sau",
    code: `class Box {
    int v;

    Box(int v) {
        this.v = v;
    }
}

class Holder {
    Box box;

    Holder(Box box) {
        this.box = box;
    }
}

public class Test {
    public static void main(String[] args) {
        Box b = new Box(1);

        Holder h1 = new Holder(b);
        Holder h2 = new Holder(h1.box);

        h2.box.v = 9;

        System.out.println(h1.box.v);
        System.out.println(h1.box == h2.box);
    }
}`,
    options: [
      "Dòng đầu in 9.",
      "Dòng thứ hai in true.",
      "h1.box và h2.box cùng trỏ một Box.",
      "Constructor Holder tự clone Box.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Constructor chỉ lưu reference được truyền vào, không tự tạo bản sao.",
  },
  {
    id: 18,
    title: "Câu 18: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        StringBuilder a = new StringBuilder("A");
        StringBuilder b = a;

        a.append("B");
        b = new StringBuilder("C");

        System.out.println(a);
        System.out.println(b);
    }
}`,
    options: [
      "Dòng đầu in AB.",
      "Dòng thứ hai in C.",
      "a.append(\"B\") sửa object mà a đang trỏ tới.",
      "b = new StringBuilder(\"C\") làm a cũng trỏ sang C.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Ban đầu a và b cùng trỏ một StringBuilder. append sửa object đó. Sau đó b trỏ sang object mới, a không đổi.",
  },
  {
    id: 19,
    title: "Câu 19: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        String s1 = "ja";
        String s2 = "va";

        String a = "java";
        String b = "ja" + "va";
        String c = s1 + s2;
        String d = c.intern();

        System.out.println(a == b);
        System.out.println(a == c);
        System.out.println(a == d);
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in false.",
      "Dòng thứ ba in true.",
      "\"ja\" + \"va\" là compile-time constant.",
      "s1 + s2 cũng luôn là compile-time constant dù s1, s2 không final.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Literal concat được compile thành constant trong pool. Biến thường concat tạo String runtime mới. intern() trả về bản trong pool.",
  },
  {
    id: 20,
    title: "Câu 20: Xét đoạn code sau",
    code: `import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        int[] a = {1, 2};
        int[] b = {1, 2};
        int[] c = a;

        System.out.println(a == b);
        System.out.println(a == c);
        System.out.println(a.equals(b));
        System.out.println(Arrays.equals(a, b));
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in true.",
      "Dòng thứ ba in false.",
      "Dòng thứ tư in true.",
      "Array override equals để so sánh nội dung.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Array không override equals theo nội dung. a.equals(b) vẫn so reference. Muốn so sánh phần tử dùng Arrays.equals.",
  },
  {
    id: 21,
    title: "Câu 21: Xét đoạn code sau",
    code: `import java.util.HashSet;

class Student {
    int id;

    Student(int id) {
        this.id = id;
    }

    public boolean equals(Object o) {
        return o instanceof Student && ((Student) o).id == id;
    }
}

public class Test {
    public static void main(String[] args) {
        HashSet<Student> set = new HashSet<>();

        set.add(new Student(1));
        set.add(new Student(1));

        System.out.println(set.size());
    }
}`,
    options: [
      "Output có thể là 2.",
      "Student override equals nhưng không override hashCode.",
      "Với HashSet, nếu equals được override thì hashCode cũng nên override tương ứng.",
      "Output chắc chắn là 1 vì equals trả true.",
    ],
    correct: [0, 1, 2],
    explanation:
      "HashSet dùng hashCode để chia bucket. Nếu không override hashCode nhất quán với equals, hai object equals có thể vẫn nằm ở bucket khác nhau.",
  },
  {
    id: 22,
    title: "Câu 22: Xét đoạn code sau",
    code: `import java.util.HashMap;

class Key {
    int id;

    Key(int id) {
        this.id = id;
    }

    public boolean equals(Object o) {
        return o instanceof Key && ((Key) o).id == id;
    }

    public int hashCode() {
        return id;
    }
}

public class Test {
    public static void main(String[] args) {
        HashMap<Key, String> map = new HashMap<>();

        Key k = new Key(1);
        map.put(k, "A");

        k.id = 2;

        System.out.println(map.get(k));
        System.out.println(map.get(new Key(1)));
    }
}`,
    options: [
      "Hai dòng thường in null.",
      "Đổi field tham gia hashCode sau khi put làm key khó tìm lại.",
      "HashMap tự di chuyển entry sang bucket mới khi key.id đổi.",
      "Key mutable có thể gây lỗi logic khi dùng làm key.",
    ],
    correct: [0, 1, 3],
    explanation:
      "HashMap không biết key bên trong bị mutate. hashCode đổi khiến lookup đi sai bucket.",
  },
  {
    id: 23,
    title: "Câu 23: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<>();
        ints.add(1);

        List<? extends Number> nums = ints;

        Number n = nums.get(0);

        nums.add(2);
        nums.add(null);

        System.out.println(n);
    }
}`,
    options: [
      "Dòng Number n = nums.get(0) hợp lệ.",
      "Dòng nums.add(2) lỗi biên dịch.",
      "Dòng nums.add(null) hợp lệ.",
      "Chương trình lỗi biên dịch vì có ít nhất một dòng sai.",
      "List<? extends Number> cho phép thêm mọi Number.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "? extends Number đọc ra được Number, nhưng không thêm được giá trị cụ thể vì list thật có thể là List<Integer>, List<Double>, v.v. null vẫn thêm được.",
  },
  {
    id: 24,
    title: "Câu 24: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<? super Integer> list = new ArrayList<Number>();

        list.add(1);
        list.add(null);

        Object x = list.get(0);
        Integer y = list.get(0);

        System.out.println(x);
    }
}`,
    options: [
      "list.add(1) hợp lệ.",
      "list.add(null) hợp lệ.",
      "Object x = list.get(0) hợp lệ.",
      "Integer y = list.get(0) lỗi biên dịch.",
      "Chương trình lỗi biên dịch vì có dòng sai.",
    ],
    correct: [0, 1, 2, 3, 4],
    explanation:
      "? super Integer cho phép thêm Integer, nhưng khi đọc ra chỉ đảm bảo là Object.",
  },
  {
    id: 25,
    title: "Câu 25: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List raw = new ArrayList<String>();

        raw.add(10);

        List<String> list = raw;

        String s = list.get(0);

        System.out.println(s);
    }
}`,
    options: [
      "Chương trình compile được nhưng có unchecked warning.",
      "Có ClassCastException khi chạy.",
      "Raw type có thể phá an toàn kiểu của generic.",
      "Output là 10.",
    ],
    correct: [0, 1, 2],
    explanation:
      "raw.add(10) đưa Integer vào list. Khi lấy qua List<String>, compiler chèn cast sang String, gây ClassCastException.",
  },
  {
    id: 26,
    title: "Câu 26: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Object[] arr = new String[2];

        arr[0] = "A";
        arr[1] = new StringBuilder("B");

        System.out.println(arr[0]);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Dòng arr[0] = \"A\" hợp lệ.",
      "Dòng arr[1] = new StringBuilder(\"B\") gây ArrayStoreException.",
      "String[] có thể gán cho Object[] vì array trong Java covariant.",
      "Dòng System.out.println(arr[0]) vẫn được in trước khi lỗi xảy ra.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Mảng thật là String[]. Gán String hợp lệ, gán StringBuilder vào String[] qua Object[] gây ArrayStoreException trước khi println chạy.",
  },
  {
    id: 27,
    title: "Câu 27: Xét đoạn code sau",
    code: `public class Test {
    static int f() {
        try {
            System.out.print("T ");
            return 1;
        } catch (Exception e) {
            System.out.print("C ");
            return 2;
        } finally {
            System.out.print("F ");
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
    options: [
      "Output là T F 1.",
      "finally chạy trước khi method thật sự trả về.",
      "return trong try vẫn có hiệu lực vì finally không return.",
      "Output là T 1 F.",
    ],
    correct: [0, 1, 2],
    explanation:
      "try chuẩn bị return 1, finally chạy in F, sau đó method trả về 1.",
  },
  {
    id: 28,
    title: "Câu 28: Xét đoạn code sau",
    code: `public class Test {
    static int f() {
        try {
            throw new RuntimeException("T");
        } catch (RuntimeException e) {
            return 1;
        } finally {
            return 2;
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
    options: [
      "Output là 2.",
      "return trong finally đè return trong catch.",
      "RuntimeException không được catch.",
      "Output là 1.",
    ],
    correct: [0, 1],
    explanation:
      "Exception được catch và catch chuẩn bị return 1, nhưng finally return 2 nên kết quả cuối cùng là 2.",
  },
  {
    id: 29,
    title: "Câu 29: Xét đoạn code sau",
    code: `import java.io.IOException;

public class Test {
    static void f() throws IOException {
        throw new IOException();
    }

    public static void main(String[] args) {
        try {
            f();
        } catch (Exception e) {
            System.out.println("E");
        } catch (IOException e) {
            System.out.println("IO");
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "catch IOException bị unreachable.",
      "IOException là subclass của Exception.",
      "Nếu đổi thứ tự hai catch thì có thể compile.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Exception catch trước đã bắt được IOException, nên catch IOException phía sau không thể chạy.",
  },
  {
    id: 30,
    title: "Câu 30: Xét đoạn code sau",
    code: `class R implements AutoCloseable {
    String name;

    R(String name) {
        this.name = name;
        System.out.print("open" + name + " ");
    }

    public void close() {
        System.out.print("close" + name + " ");
    }
}

public class Test {
    public static void main(String[] args) {
        try (R a = new R("A"); R b = new R("B")) {
            System.out.print("try ");
        }
    }
}`,
    options: [
      "Output là openA openB try closeB closeA.",
      "Resource được đóng theo thứ tự ngược lại với thứ tự mở.",
      "Output là openA openB try closeA closeB.",
      "try-with-resources tự gọi close().",
    ],
    correct: [0, 1, 3],
    explanation:
      "Resource mở từ trái sang phải, đóng từ phải sang trái.",
  },
  {
    id: 31,
    title: "Câu 31: Xét đoạn code sau",
    code: `class A {
}

class B extends A {
}

class C extends A {
}

public class Test {
    public static void main(String[] args) {
        A a = new B();

        System.out.println(a instanceof B);
        System.out.println(a instanceof C);

        C c = (C) a;

        System.out.println(c);
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in false.",
      "Dòng C c = (C) a compile được.",
      "Có ClassCastException khi chạy dòng ép kiểu sang C.",
      "Vì B và C cùng extends A nên object B có thể cast sang C.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "a có kiểu A nên compiler cho downcast sang C, nhưng object thật là B nên runtime cast sang C thất bại.",
  },
  {
    id: 32,
    title: "Câu 32: Xét đoạn code sau",
    code: `interface I {
}

class A implements I {
}

public class Test {
    public static void main(String[] args) {
        Object o = new A();

        System.out.println(o instanceof I);

        I i = (I) o;

        System.out.println(i instanceof A);
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in true.",
      "Cast I i = (I) o hợp lệ ở runtime.",
      "Object new A() vừa là A vừa là I.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "A implements I, nên object A là instance của cả A và I.",
  },
  {
    id: 33,
    title: "Câu 33: Xét đoạn code sau",
    code: `class Outer {
    int x = 1;

    class Inner {
        int x = 2;

        void print() {
            int x = 3;

            System.out.println(x);
            System.out.println(this.x);
            System.out.println(Outer.this.x);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        new Outer().new Inner().print();
    }
}`,
    options: [
      "Output là 3, 2, 1.",
      "this.x trong Inner là field x của Inner.",
      "Outer.this.x là field x của Outer.",
      "Biến local x được ưu tiên khi gọi System.out.println(x).",
      "Inner là static nested class.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Tên gần nhất là local x. this.x thuộc Inner. Outer.this.x thuộc object Outer bao ngoài.",
  },
  {
    id: 34,
    title: "Câu 34: Xét đoạn code sau",
    code: `class Outer {
    private int x = 10;

    static class Nested {
        void print() {
            System.out.println(x);
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Static nested class không có enclosing instance nên không truy cập trực tiếp instance field x.",
      "Có thể sửa bằng cách tạo Outer o = new Outer(); rồi dùng o.x trong Nested.",
      "Nested không được truy cập private member của Outer trong mọi trường hợp.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Static nested class không có Outer.this. Nó vẫn có quyền truy cập private member của Outer nếu có object cụ thể.",
  },
  {
    id: 35,
    title: "Câu 35: Xét đoạn code sau",
    code: `enum Level {
    LOW, MEDIUM, HIGH
}

public class Test {
    public static void main(String[] args) {
        Level a = Level.LOW;
        Level b = Level.valueOf("LOW");

        System.out.println(a == b);
        System.out.println(a.equals(b));
        System.out.println(Level.valueOf("low"));
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in true.",
      "valueOf phân biệt chữ hoa chữ thường.",
      "Dòng Level.valueOf(\"low\") gây IllegalArgumentException.",
      "Enum nên so sánh bằng == là hợp lệ.",
    ],
    correct: [0, 1, 2, 3, 4],
    explanation:
      "Enum constant là singleton nên == hợp lệ. valueOf yêu cầu đúng tên constant, phân biệt hoa thường.",
  },
  {
    id: 36,
    title: "Câu 36: Xét đoạn code sau",
    code: `enum E {
    A, B;

    E() {
        System.out.print(name() + " ");
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.print("M ");
        E e = E.A;
        System.out.print("X");
    }
}`,
    options: [
      "Output là M A B X.",
      "Khi enum E được dùng lần đầu, các constant được khởi tạo theo thứ tự khai báo.",
      "Constructor enum chạy cho cả A và B.",
      "Chỉ constructor của A chạy vì chỉ dùng E.A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Trước khi lấy E.A, enum E được initialize, các enum constant A và B được tạo theo thứ tự.",
  },
  {
    id: 37,
    title: "Câu 37: Xét đoạn code sau",
    code: `class A {
    final void f() {
        System.out.println("A");
    }
}

class B extends A {
    void f(int x) {
        System.out.println("B");
    }
}

public class Test {
    public static void main(String[] args) {
        B b = new B();

        b.f();
        b.f(1);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A rồi B.",
      "B.f(int) là overload, không phải override A.f().",
      "final cấm mọi method cùng tên f trong class con, kể cả khác tham số.",
    ],
    correct: [0, 1, 2],
    explanation:
      "final cấm override cùng signature. B.f(int) khác tham số nên chỉ là overload.",
  },
  {
    id: 38,
    title: "Câu 38: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Integer a = 100;
        Integer b = 100;

        Integer c = 200;
        Integer d = 200;

        System.out.println(a == b);
        System.out.println(c == d);
        System.out.println(c.equals(d));
    }
}`,
    options: [
      "Dòng đầu thường in true.",
      "Dòng thứ hai thường in false.",
      "Dòng thứ ba in true.",
      "Integer cache thường áp dụng cho khoảng -128 đến 127.",
      "Luôn nên dùng == để so sánh giá trị wrapper.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Autoboxing Integer thường cache -128..127. Ngoài khoảng đó, == có thể false. equals so sánh giá trị.",
  },
  {
    id: 39,
    title: "Câu 39: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Double a = Double.NaN;
        Double b = Double.NaN;

        double x = Double.NaN;

        System.out.println(a.equals(b));
        System.out.println(x == x);
        System.out.println(Double.isNaN(x));
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in false.",
      "Dòng thứ ba in true.",
      "NaN không bằng chính nó khi dùng toán tử == trên primitive double.",
      "Double.equals xử lý NaN khác với toán tử == primitive.",
    ],
    correct: [0, 1, 2, 3, 4],
    explanation:
      "Primitive NaN không bằng bất kỳ giá trị nào, kể cả chính nó. Double.equals coi hai NaN là bằng nhau.",
  },
  {
    id: 40,
    title: "Câu 40: Xét đoạn code sau",
    code: `class Box {
    int v;
}

public class Test {
    public static void main(String[] args) {
        Box box = new Box();
        box.v = 1;

        Runnable r = () -> System.out.println(box.v);

        box.v = 5;

        r.run();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 5.",
      "Biến box vẫn effectively final vì không bị gán lại.",
      "Sửa field box.v không làm biến box mất effectively final.",
      "Lambda capture bản sao sâu của object Box tại thời điểm tạo lambda.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Lambda capture reference tới object. Biến box không bị gán lại nên effectively final. Object bên trong vẫn có thể bị sửa.",
  },
];

function sameSet(a: number[], b: number[]) {
  if (a.length !== b.length) return false;

  const x = [...a].sort((m, n) => m - n);
  const y = [...b].sort((m, n) => m - n);

  return x.every((value, index) => value === y[index]);
}

export default function Page() {
  const [selected, setSelected] = useState<Record<number, number[]>>({});
  const [submitted, setSubmitted] = useState(false);

  const answeredCount = useMemo(() => {
    return questions.filter((q) => (selected[q.id] ?? []).length > 0).length;
  }, [selected]);

  const score = useMemo(() => {
    return questions.reduce((total, q) => {
      const userAnswer = selected[q.id] ?? [];
      return total + (sameSet(userAnswer, q.correct) ? 1 : 0);
    }, 0);
  }, [selected]);

  const toggleAnswer = (questionId: number, optionIndex: number) => {
    if (submitted) return;

    setSelected((prev) => {
      const current = prev[questionId] ?? [];
      const exists = current.includes(optionIndex);

      return {
        ...prev,
        [questionId]: exists
          ? current.filter((x) => x !== optionIndex)
          : [...current, optionIndex],
      };
    });
  };

  const resetQuiz = () => {
    setSelected({});
    setSubmitted(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToQuestion = (id: number) => {
    document.getElementById(`q-${id}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  return (
    <main className="min-h-screen bg-slate-950 text-slate-100">
      <div className="mx-auto max-w-7xl px-4 py-6 lg:px-8">
        <header className="mb-6 rounded-3xl border border-slate-800 bg-slate-900/80 p-6 shadow-2xl shadow-black/30">
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-cyan-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề luyện Java OOP số 7 - Tổng hợp 40 câu
              </h1>
              <p className="mt-3 max-w-3xl text-sm leading-6 text-slate-300 md:text-base">
                Mỗi câu có thể có một hoặc nhiều đáp án đúng. Chọn đủ và chính
                xác toàn bộ đáp án đúng mới được tính điểm.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 text-sm">
              <div className="text-slate-400">Tiến độ</div>
              <div className="mt-1 text-2xl font-bold text-white">
                {answeredCount}/{questions.length}
              </div>
              {submitted && (
                <div className="mt-2 text-cyan-300">
                  Điểm: {score}/{questions.length}
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
          <section className="space-y-5">
            {questions.map((q, index) => {
              const userAnswer = selected[q.id] ?? [];
              const isCorrect = sameSet(userAnswer, q.correct);

              return (
                <article
                  id={`q-${q.id}`}
                  key={q.id}
                  className="scroll-mt-6 rounded-3xl border border-slate-800 bg-slate-900 p-5 shadow-xl shadow-black/20"
                >
                  <div className="mb-4 flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                    <div>
                      <p className="text-sm font-semibold text-cyan-400">
                        Câu {index + 1}
                      </p>
                      <h2 className="mt-1 text-lg font-bold text-white">
                        {q.title}
                      </h2>
                    </div>

                    {submitted && (
                      <span
                        className={`w-fit rounded-full px-3 py-1 text-xs font-bold ${
                          isCorrect
                            ? "bg-emerald-500/15 text-emerald-300 ring-1 ring-emerald-500/30"
                            : "bg-rose-500/15 text-rose-300 ring-1 ring-rose-500/30"
                        }`}
                      >
                        {isCorrect ? "Đúng" : "Sai"}
                      </span>
                    )}
                  </div>

                  <pre className="mb-4 overflow-x-auto rounded-2xl border border-slate-800 bg-black p-4 text-sm leading-6 text-slate-100">
                    <code>{q.code}</code>
                  </pre>

                  <div className="space-y-3">
                    {q.options.map((option, optionIndex) => {
                      const checked = userAnswer.includes(optionIndex);
                      const isRightOption = q.correct.includes(optionIndex);
                      const showCorrect = submitted && isRightOption;
                      const showWrong = submitted && checked && !isRightOption;

                      return (
                        <label
                          key={optionIndex}
                          className={`flex cursor-pointer gap-3 rounded-2xl border p-4 transition ${
                            showCorrect
                              ? "border-emerald-500/60 bg-emerald-500/10"
                              : showWrong
                              ? "border-rose-500/60 bg-rose-500/10"
                              : checked
                              ? "border-cyan-500/70 bg-cyan-500/10"
                              : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-cyan-400"
                          />

                          <div>
                            <div className="mb-1 text-xs font-bold text-slate-400">
                              {String.fromCharCode(65 + optionIndex)}
                            </div>
                            <div className="text-sm leading-6 text-slate-100">
                              {option}
                            </div>
                          </div>
                        </label>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className="mt-4 rounded-2xl border border-slate-700 bg-slate-950 p-4">
                      <p className="text-sm font-bold text-cyan-300">
                        Đáp án đúng:{" "}
                        {q.correct
                          .map((x) => String.fromCharCode(65 + x))
                          .join(", ")}
                      </p>
                      <p className="mt-2 text-sm leading-6 text-slate-300">
                        {q.explanation}
                      </p>
                    </div>
                  )}
                </article>
              );
            })}
          </section>

          <aside className="h-fit rounded-3xl border border-slate-800 bg-slate-900 p-5 lg:sticky lg:top-6">
            <h2 className="text-lg font-bold text-white">Bảng điều hướng</h2>

            <div className="mt-4 grid grid-cols-5 gap-2">
              {questions.map((q, index) => {
                const hasAnswer = (selected[q.id] ?? []).length > 0;
                const isCorrect = sameSet(selected[q.id] ?? [], q.correct);

                return (
                  <button
                    key={q.id}
                    onClick={() => scrollToQuestion(q.id)}
                    className={`rounded-xl border py-2 text-sm font-bold transition ${
                      submitted
                        ? isCorrect
                          ? "border-emerald-500/60 bg-emerald-500/15 text-emerald-200"
                          : "border-rose-500/60 bg-rose-500/15 text-rose-200"
                        : hasAnswer
                        ? "border-cyan-500/60 bg-cyan-500/15 text-cyan-200"
                        : "border-slate-700 bg-slate-950 text-slate-400 hover:border-slate-500"
                    }`}
                  >
                    {index + 1}
                  </button>
                );
              })}
            </div>

            <div className="mt-5 space-y-3">
              {!submitted ? (
                <button
                  onClick={() => {
                    setSubmitted(true);
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="w-full rounded-2xl bg-cyan-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-cyan-300"
                >
                  Nộp bài
                </button>
              ) : (
                <button
                  onClick={resetQuiz}
                  className="w-full rounded-2xl bg-white px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-slate-200"
                >
                  Làm lại
                </button>
              )}

              <div className="rounded-2xl border border-slate-800 bg-slate-950 p-4 text-sm leading-6 text-slate-300">
                <p>
                  Đã chọn:{" "}
                  <span className="font-bold text-white">
                    {answeredCount}/{questions.length}
                  </span>
                </p>

                {submitted && (
                  <p>
                    Kết quả:{" "}
                    <span className="font-bold text-cyan-300">
                      {score}/{questions.length}
                    </span>
                  </p>
                )}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}