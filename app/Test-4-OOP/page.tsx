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
    title: "Câu 1: Tên file và public class",
    code: `// Giả sử đoạn code này nằm trong file Test.java

public class Main {
    public static void main(String[] args) {
        System.out.println("Hello");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Tên file phải trùng với tên public top-level class.",
      "Nếu bỏ public khỏi class Main thì file Test.java có thể compile.",
      "JVM tự đổi tên class Main thành Test khi chạy.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Một public top-level class phải nằm trong file có cùng tên. File Test.java không thể chứa public class Main.",
  },
  {
    id: 2,
    title: "Câu 2: Nhiều public class trong một file",
    code: `// Giả sử file tên Test.java

public class Test {
}

public class A {
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Một file .java không được có hai public top-level class.",
      "Hai public class cùng package thì được đặt chung một file.",
      "Nếu bỏ public khỏi class A thì lỗi này có thể được sửa.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Một source file chỉ có thể có tối đa một public top-level class, và tên file phải trùng với class public đó.",
  },
  {
    id: 3,
    title: "Câu 3: Modifier của top-level class",
    code: `private class A {
}

public class Test {
    public static void main(String[] args) {
        System.out.println("OK");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Top-level class không được khai báo private.",
      "Top-level class cũng không được khai báo protected.",
      "private class A hợp lệ vì A không có main.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Top-level class chỉ có thể là public hoặc package-private, ngoài các modifier như abstract/final.",
  },
  {
    id: 4,
    title: "Câu 4: Vị trí import",
    code: `class A {
}

import java.util.ArrayList;

public class Test {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();
        System.out.println(list.size());
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "import phải đứng trước các khai báo type top-level.",
      "import có thể đặt sau class nếu class đó không dùng import.",
      "Nếu chuyển import lên đầu file thì đoạn code này có thể compile.",
    ],
    correct: [0, 1, 3],
    explanation:
      "package nếu có phải đứng đầu, sau đó là import, rồi mới đến các class/interface/enum top-level.",
  },
  {
    id: 5,
    title: "Câu 5: Method trùng tên class",
    code: `class A {
    void A() {
        System.out.println("method");
    }
}

public class Test {
    public static void main(String[] args) {
        A a = new A();
        a.A();
    }
}`,
    options: [
      "Chương trình compile được.",
      "void A() là constructor của class A.",
      "Compiler tự tạo constructor rỗng cho A.",
      "Output là method.",
    ],
    correct: [0, 2, 3],
    explanation:
      "Constructor không có kiểu trả về. void A() là method thường, nên class A vẫn có default constructor rỗng.",
  },
  {
    id: 6,
    title: "Câu 6: Private constructor trong cùng class",
    code: `public class Test {
    private Test() {
        System.out.println("C");
    }

    public static void main(String[] args) {
        new Test();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là C.",
      "Private constructor không thể được gọi ở bất cứ đâu, kể cả trong chính class đó.",
      "main nằm trong class Test nên gọi được private constructor của Test.",
    ],
    correct: [0, 1, 3],
    explanation:
      "private chỉ chặn truy cập từ bên ngoài class. Bên trong chính class đó vẫn gọi được constructor private.",
  },
  {
    id: 7,
    title: "Câu 7: Blank final và constructor chain",
    code: `class A {
    final int x;

    A() {
        x = 1;
    }

    A(int n) {
        this();
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(new A(5).x);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 1.",
      "Constructor A(int n) bắt buộc phải gán lại x.",
      "this() gọi constructor A(), trong đó x đã được gán.",
    ],
    correct: [0, 1, 3],
    explanation:
      "blank final field phải được gán đúng một lần trên mỗi đường constructor. A(int) gọi A(), nên x đã được gán.",
  },
  {
    id: 8,
    title: "Câu 8: Blank final chưa được gán",
    code: `class A {
    final int x;

    A() {
        x = 1;
    }

    A(int n) {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Constructor A(int n) không gán giá trị cho final field x.",
      "final int x tự có default value 0 nên không cần gán.",
      "Mọi constructor phải đảm bảo x được gán đúng một lần.",
    ],
    correct: [0, 1, 3],
    explanation:
      "blank final field không được để mặc định. Mỗi constructor phải đảm bảo field đó được gán.",
  },
  {
    id: 9,
    title: "Câu 9: Blank final bị gán hai lần",
    code: `class A {
    final int x;

    A() {
        this(1);
        x = 2;
    }

    A(int n) {
        x = n;
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "x đã được gán trong constructor A(int n).",
      "final field có thể gán nhiều lần miễn là trong constructor.",
      "Sau khi this(1) chạy xong, không được gán lại x.",
    ],
    correct: [0, 1, 3],
    explanation:
      "final field chỉ được gán một lần. Constructor A() gọi A(int), nơi x đã được gán, nên gán tiếp x = 2 là sai.",
  },
  {
    id: 10,
    title: "Câu 10: static final gán trong static block",
    code: `public class Test {
    static final int X;

    static {
        X = 5;
    }

    public static void main(String[] args) {
        System.out.println(X);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 5.",
      "static final field bắt buộc phải gán ngay tại dòng khai báo.",
      "static block có thể dùng để gán giá trị cho blank static final field.",
    ],
    correct: [0, 1, 3],
    explanation:
      "blank static final field có thể được gán trong static initializer, miễn là được gán đúng một lần.",
  },
  {
    id: 11,
    title: "Câu 11: Forward reference bằng simple name",
    code: `public class Test {
    static int a = b + 1;
    static int b = 2;

    public static void main(String[] args) {
        System.out.println(a + " " + b);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Dòng static int a = b + 1; là illegal forward reference.",
      "Chương trình in 1 2.",
      "Dùng simple name b trước khi field b được khai báo trong initializer là không hợp lệ.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Trong field initializer, tham chiếu field khai báo phía sau bằng simple name có thể gây illegal forward reference.",
  },
  {
    id: 12,
    title: "Câu 12: Forward reference qua tên class",
    code: `public class Test {
    static int a = Test.b + 1;
    static int b = 2;

    public static void main(String[] args) {
        System.out.println(a + " " + b);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 1 2.",
      "Khi tính a, b vẫn đang có giá trị mặc định 0.",
      "Test.b + 1 cũng bị illegal forward reference giống b + 1.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Dùng qualified name Test.b tránh lỗi illegal forward reference. Khi a được tính, b còn giá trị mặc định 0.",
  },
  {
    id: 13,
    title: "Câu 13: Forward reference qua this",
    code: `public class Test {
    int a = this.b + 1;
    int b = 2;

    public static void main(String[] args) {
        Test t = new Test();
        System.out.println(t.a + " " + t.b);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 1 2.",
      "Khi tính a, b vẫn đang có giá trị mặc định 0.",
      "this.b bị illegal forward reference.",
    ],
    correct: [0, 1, 2],
    explanation:
      "this.b là qualified access nên hợp lệ. Field b chưa chạy initializer nên đang là 0 khi a được tính.",
  },
  {
    id: 14,
    title: "Câu 14: static local variable",
    code: `public class Test {
    public static void main(String[] args) {
        static int x = 1;
        System.out.println(x);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Java không cho khai báo static local variable trong method.",
      "static chỉ dùng được cho field, method, nested class, initializer phù hợp.",
      "Output là 1.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Local variable trong method không được có modifier static.",
  },
  {
    id: 15,
    title: "Câu 15: this trong static method",
    code: `public class Test {
    int x = 1;

    static void f() {
        System.out.println(this.x);
    }

    public static void main(String[] args) {
        f();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "static method không có this.",
      "this.x có thể dùng trong static method nếu class có field x.",
      "Muốn truy cập x thì cần một object cụ thể, ví dụ new Test().x.",
    ],
    correct: [0, 1, 3],
    explanation:
      "this chỉ tồn tại trong ngữ cảnh instance. static method không gắn với object cụ thể.",
  },
  {
    id: 16,
    title: "Câu 16: super với static helper",
    code: `class A {
    A(int x) {
        System.out.println(x);
    }
}

class B extends A {
    B() {
        super(g());
    }

    static int g() {
        return 7;
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 7.",
      "super(g()) hợp lệ vì g() là static method.",
      "Nếu g() là instance method thì lời gọi này sẽ không hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Trước khi constructor cha chạy xong, chưa được dùng this ngầm. static method không cần this nên có thể gọi trong super(...).",
  },
  {
    id: 17,
    title: "Câu 17: Field trong interface",
    code: `interface I {
    int X;
}

public class Test {
    public static void main(String[] args) {
        System.out.println(I.X);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Field trong interface mặc định là public static final.",
      "Vì X là final nên phải được khởi tạo.",
      "X tự có default value 0 nên hợp lệ.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Field trong interface là public static final, nên phải được gán giá trị ngay.",
  },
  {
    id: 18,
    title: "Câu 18: private field trong interface",
    code: `interface I {
    private int X = 1;
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Field trong interface không được khai báo private.",
      "Field trong interface mặc định là public static final.",
      "private int X = 1 hợp lệ vì X không cần truy cập từ ngoài.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Interface field chỉ có thể là public static final. private không hợp lệ với field trong interface.",
  },
  {
    id: 19,
    title: "Câu 19: Abstract class implement interface",
    code: `interface I {
    void f();
}

abstract class A implements I {
}`,
    options: [
      "Chương trình compile được.",
      "A được phép không implement f() vì A là abstract class.",
      "A bắt buộc phải implement f() dù là abstract.",
      "Nếu A không abstract thì sẽ lỗi biên dịch.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Abstract class có thể để lại abstract method chưa implement. Class cụ thể thì không được.",
  },
  {
    id: 20,
    title: "Câu 20: Concrete class kế thừa abstract class",
    code: `interface I {
    void f();
}

abstract class A implements I {
}

class B extends A {
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "B là class cụ thể nên phải implement f().",
      "B có thể không implement f() vì A đã implements I.",
      "Thêm abstract vào class B có thể sửa lỗi.",
    ],
    correct: [0, 1, 3],
    explanation:
      "A chưa implement f(), nên B nếu là class cụ thể phải implement. Nếu B cũng abstract thì có thể chưa implement.",
  },
  {
    id: 21,
    title: "Câu 21: Default method và abstract method cùng signature",
    code: `interface I {
    default void f() {
        System.out.println("I");
    }
}

interface J {
    void f();
}

class C implements I, J {
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "C phải override f() để giải quyết yêu cầu từ J.",
      "Default method trong I tự động thỏa mãn J trong trường hợp này.",
      "Nếu C override f() thì có thể compile.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Khi có default method từ một interface và abstract method cùng signature từ interface khác, class implement cần tự override.",
  },
  {
    id: 22,
    title: "Câu 22: Override tăng visibility",
    code: `class A {
    void f() {
        System.out.println("A");
    }
}

class B extends A {
    protected void f() {
        System.out.println("B");
    }
}

public class Test {
    public static void main(String[] args) {
        A obj = new B();
        obj.f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là B.",
      "protected rộng hơn package-private trong trường hợp override.",
      "Không được override package-private method bằng protected method.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Override được phép giữ nguyên hoặc tăng visibility. package-private lên protected là hợp lệ.",
  },
  {
    id: 23,
    title: "Câu 23: Overload null với Integer và int varargs",
    code: `public class Test {
    static void f(Integer x) {
        System.out.println("Integer");
    }

    static void f(int... x) {
        System.out.println("int...");
    }

    public static void main(String[] args) {
        f(null);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Lời gọi f(null) bị ambiguous.",
      "null có thể khớp với Integer.",
      "null cũng có thể khớp với int[] của varargs.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "int... tương đương int[] ở signature. null khớp với Integer và int[], hai kiểu này không cụ thể hơn nhau nên ambiguous.",
  },
  {
    id: 24,
    title: "Câu 24: Widening rồi boxing",
    code: `public class Test {
    static void f(Long x) {
        System.out.println("Long");
    }

    public static void main(String[] args) {
        f(1);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Java không tự chuyển int -> long rồi boxing thành Long trong method invocation này.",
      "Chương trình in Long.",
      "Nếu gọi f(1L) thì có thể compile.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Java cho phép widening hoặc boxing, nhưng không tự kết hợp widening primitive rồi boxing trong lời gọi method như int -> long -> Long.",
  },
  {
    id: 25,
    title: "Câu 25: Compound assignment với double",
    code: `public class Test {
    public static void main(String[] args) {
        int x = 5;

        x /= 2.0;

        System.out.println(x);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 2.",
      "x /= 2.0 tương đương gần với x = (int)(x / 2.0).",
      "Chương trình lỗi biên dịch vì 2.0 là double.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Compound assignment có ép kiểu ngầm về kiểu của biến bên trái. 5 / 2.0 = 2.5, ép về int thành 2.",
  },
  {
    id: 26,
    title: "Câu 26: Narrowing constant",
    code: `public class Test {
    public static void main(String[] args) {
        final int x = 100;
        byte a = x;

        int y = 100;
        byte b = y;

        System.out.println(a + b);
    }
}`,
    options: [
      "Dòng byte a = x; hợp lệ.",
      "Dòng byte b = y; lỗi biên dịch.",
      "final int x = 100 là constant variable nằm trong range của byte.",
      "Nếu y cũng là final int y = 100; thì byte b = y; có thể hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Constant int nằm trong range có thể gán hẹp cho byte. Biến int thường thì không.",
  },
  {
    id: 27,
    title: "Câu 27: Array initializer sau khai báo",
    code: `public class Test {
    public static void main(String[] args) {
        int[] a;

        a = {1, 2, 3};

        System.out.println(a.length);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Array initializer dạng {1, 2, 3} chỉ dùng trực tiếp lúc khai báo biến.",
      "Có thể sửa thành a = new int[] {1, 2, 3};.",
      "Output là 3.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Sau khi đã khai báo biến, muốn gán mảng mới phải dùng new int[] { ... }.",
  },
  {
    id: 28,
    title: "Câu 28: Primitive array và Object[]",
    code: `public class Test {
    public static void main(String[] args) {
        Object o = new int[2];

        Object[] arr = new int[2];

        System.out.println(o);
        System.out.println(arr.length);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "int[] là một Object.",
      "int[] không phải là Object[].",
      "Dòng Object o = new int[2]; hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Mảng primitive như int[] là object, nhưng không phải mảng các Object. Vì vậy không gán được cho Object[].",
  },
  {
    id: 29,
    title: "Câu 29: Cast primitive array",
    code: `public class Test {
    public static void main(String[] args) {
        Object o = new int[] {1, 2};

        int[] a = (int[]) o;
        System.out.println(a[0]);

        Object[] b = (Object[]) o;
        System.out.println(b.length);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Dòng System.out.println(a[0]) in 1.",
      "Dòng Object[] b = (Object[]) o; gây ClassCastException khi chạy.",
      "Object thật là int[], nên cast về int[] hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Object o thật sự trỏ tới int[], nên cast về int[] được. Nhưng int[] không phải Object[], nên cast sang Object[] lỗi runtime.",
  },
  {
    id: 30,
    title: "Câu 30: println(null)",
    code: `public class Test {
    public static void main(String[] args) {
        System.out.println(null);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Lời gọi println(null) bị ambiguous.",
      "null có thể khớp với println(String).",
      "null cũng có thể khớp với println(char[]).",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "PrintStream có nhiều overload println nhận reference type. Với null, compiler không chọn được giữa String và char[].",
  },
  {
    id: 31,
    title: "Câu 31: println với null ép kiểu",
    code: `public class Test {
    public static void main(String[] args) {
        System.out.println((String) null);
        System.out.println((Object) null);
        System.out.println((char[]) null);

        System.out.println("DONE");
    }
}`,
    options: [
      "Hai dòng đầu in null.",
      "Dòng println((char[]) null) gây NullPointerException.",
      "DONE không được in ra.",
      "Chương trình lỗi biên dịch vì không được cast null.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Cast null sang String/Object hợp lệ và in ra null. println(char[]) cố xử lý mảng char null nên gây NullPointerException.",
  },
  {
    id: 32,
    title: "Câu 32: throw null",
    code: `public class Test {
    static void f() {
        throw null;
    }

    public static void main(String[] args) {
        f();
        System.out.println("DONE");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Khi chạy, throw null gây NullPointerException.",
      "DONE không được in ra.",
      "throw null là lỗi biên dịch vì null không phải Throwable.",
    ],
    correct: [0, 1, 2],
    explanation:
      "throw null compile được, nhưng khi runtime cố ném null thì Java tạo NullPointerException.",
  },
  {
    id: 33,
    title: "Câu 33: Constructor throws checked exception",
    code: `class A {
    A() throws Exception {
    }
}

public class Test {
    public static void main(String[] args) {
        new A();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Constructor được phép khai báo throws Exception.",
      "Caller của new A() phải catch hoặc khai báo throws.",
      "Vì constructor không có return type nên không được throws.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Constructor có thể throws checked exception. Nhưng nơi gọi constructor phải xử lý hoặc khai báo tiếp.",
  },
  {
    id: 34,
    title: "Câu 34: main throws Exception",
    code: `public class Test {
    public static void main(String[] args) throws Exception {
        System.out.println("A");
        throw new Exception("X");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Dòng A được in ra trước.",
      "Sau đó chương trình kết thúc bằng uncaught Exception.",
      "main không được khai báo throws Exception.",
    ],
    correct: [0, 1, 2],
    explanation:
      "main có thể khai báo throws Exception. Nếu exception không được bắt, chương trình kết thúc với uncaught exception.",
  },
  {
    id: 35,
    title: "Câu 35: Checked exception trong static initializer",
    code: `public class Test {
    static {
        if (System.currentTimeMillis() > 0) {
            throw new Exception();
        }
    }

    public static void main(String[] args) {
        System.out.println("OK");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "static initializer không thể khai báo throws Exception.",
      "Checked exception trong static initializer phải được xử lý bên trong block.",
      "Chương trình compile và luôn in OK.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Checked exception không được thoát trực tiếp khỏi static initializer vì block này không thể khai báo throws.",
  },
  {
    id: 36,
    title: "Câu 36: Checked exception trong instance initializer",
    code: `class A {
    {
        if (System.currentTimeMillis() > 0) {
            throw new Exception("init");
        }
    }

    A() throws Exception {
    }
}

public class Test {
    public static void main(String[] args) throws Exception {
        new A();
        System.out.println("DONE");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Checked exception từ instance initializer có thể được constructor khai báo throws.",
      "DONE không được in ra khi exception trong initializer xảy ra.",
      "Nếu constructor A() không khai báo throws Exception thì đoạn code sẽ lỗi biên dịch.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Instance initializer thuộc quá trình chạy constructor. Checked exception từ đó phải được constructor xử lý hoặc khai báo.",
  },
  {
    id: 37,
    title: "Câu 37: String constant concat và intern",
    code: `public class Test {
    public static void main(String[] args) {
        String a = "ab";
        String b = "a" + "b";
        String c = new String("ab").intern();

        System.out.println(a == b);
        System.out.println(a == c);
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in true.",
      "\"a\" + \"b\" là compile-time constant.",
      "intern() trả về reference trong String pool.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Chuỗi literal ghép từ constant được đưa vào pool. intern() cũng trả về bản trong pool.",
  },
  {
    id: 38,
    title: "Câu 38: String concat với biến thường và final",
    code: `public class Test {
    public static void main(String[] args) {
        String a = "ab";

        String x = "a";
        final String y = "a";

        String b = x + "b";
        String c = y + "b";

        System.out.println(a == b);
        System.out.println(a == c);
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in true.",
      "x + \"b\" không phải compile-time constant vì x không final.",
      "y + \"b\" là compile-time constant vì y là final String được gán bằng literal.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Biến final String gán bằng literal có thể tham gia constant expression. Biến thường thì không.",
  },
  {
    id: 39,
    title: "Câu 39: substring và charAt",
    code: `public class Test {
    public static void main(String[] args) {
        String s = "abc";

        System.out.println(s.substring(1, 1).length());
        System.out.println(s.charAt(3));
        System.out.println("DONE");
    }
}`,
    options: [
      "Dòng đầu in 0.",
      "substring(1, 1) trả về chuỗi rỗng.",
      "s.charAt(3) gây StringIndexOutOfBoundsException.",
      "DONE được in ra.",
    ],
    correct: [0, 1, 2],
    explanation:
      "substring với begin == end hợp lệ và trả chuỗi rỗng. charAt(3) vượt index vì index hợp lệ là 0,1,2.",
  },
  {
    id: 40,
    title: "Câu 40: enum valueOf",
    code: `enum E {
    A, B
}

public class Test {
    public static void main(String[] args) {
        System.out.println(E.valueOf("A"));
        System.out.println(E.valueOf("C"));
        System.out.println("DONE");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Dòng đầu in A.",
      "E.valueOf(\"C\") gây IllegalArgumentException.",
      "DONE không được in ra.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "valueOf nhận đúng tên enum constant. A tồn tại nên in A, C không tồn tại nên ném IllegalArgumentException.",
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
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-lime-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề luyện Java OOP số 4 - 40 câu
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
                <div className="mt-2 text-lime-300">
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
                      <p className="text-sm font-semibold text-lime-400">
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
                              ? "border-lime-500/70 bg-lime-500/10"
                              : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-lime-400"
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
                      <p className="text-sm font-bold text-lime-300">
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
                        ? "border-lime-500/60 bg-lime-500/15 text-lime-200"
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
                  className="w-full rounded-2xl bg-lime-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-lime-300"
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
                    <span className="font-bold text-lime-300">
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