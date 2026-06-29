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
    code: `public class Test {
    public static void main(String... args) {
        System.out.println(args.length);
    }
}`,
    options: [
      "Chương trình compile được.",
      "main(String... args) có thể là entry point hợp lệ.",
      "String... tương đương String[] ở mức tham số method.",
      "Nếu chạy không truyền argument thì output là 0.",
      "Chương trình lỗi vì main bắt buộc phải viết chính xác String[] args.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Varargs String... có signature tương đương String[]. Đây là main hợp lệ.",
  },
  {
    id: 2,
    title: "Câu 2: Xét đoạn code sau",
    code: `class A {
    static final void f() {
        System.out.println("A");
    }
}

class B extends A {
    static void f() {
        System.out.println("B");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Static method có thể bị hide, nhưng không được hide nếu method cha là final.",
      "B.f() đang cố hide A.f().",
      "Nếu bỏ final ở A.f() thì đoạn code có thể compile.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "final method không được override hoặc hide. Static method của class con cùng signature với static method cha là hiding.",
  },
  {
    id: 3,
    title: "Câu 3: Xét đoạn code sau",
    code: `class A {
    private static void f() {
        System.out.print("A ");
    }

    static void call() {
        f();
    }
}

class B extends A {
    static void f() {
        System.out.print("B ");
    }
}

public class Test {
    public static void main(String[] args) {
        B.call();
        B.f();
    }
}`,
    options: [
      "Output là A B.",
      "A.f() là private nên không bị B.f() hide theo nghĩa kế thừa.",
      "call() thuộc A và gọi private static f() của A.",
      "Chương trình lỗi biên dịch vì B không được khai báo f().",
    ],
    correct: [0, 1, 2],
    explanation:
      "Private static method không được kế thừa. B.f() là method riêng. B.call() gọi A.call(), trong đó f() là A.f().",
  },
  {
    id: 4,
    title: "Câu 4: Xét đoạn code sau",
    code: `abstract class A {
    A() {
        System.out.print("A ");
    }
}

class B extends A {
    B() {
        System.out.print("B ");
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A B.",
      "Abstract class vẫn có thể có constructor.",
      "Không thể gọi constructor của abstract class trong quá trình tạo object class con.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Không thể new A() trực tiếp, nhưng constructor của A vẫn chạy khi tạo object của class con B.",
  },
  {
    id: 5,
    title: "Câu 5: Xét đoạn code sau",
    code: `class A {
    A() {
        this(1);
    }

    A(int x) {
        this();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Hai constructor gọi vòng lặp lẫn nhau.",
      "Đây là lỗi recursive constructor invocation.",
      "Chương trình compile được nhưng khi chạy sẽ StackOverflowError.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Compiler phát hiện constructor gọi đệ quy vòng tròn nên lỗi biên dịch.",
  },
  {
    id: 6,
    title: "Câu 6: Xét đoạn code sau",
    code: `class A {
    final int x;

    {
        x = 10;
    }

    A() {
    }

    A(int n) {
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(new A(5).x);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 10.",
      "Instance initializer có thể gán giá trị cho blank final field.",
      "Constructor A(int n) bắt buộc phải gán lại x.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Instance initializer chạy trước constructor body, nên final field x đã được gán đúng một lần.",
  },
  {
    id: 7,
    title: "Câu 7: Xét đoạn code sau",
    code: `public class Test {
    int x = getY();
    int y = 10;

    int getY() {
        return y + 1;
    }

    public static void main(String[] args) {
        Test t = new Test();

        System.out.println(t.x);
        System.out.println(t.y);
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in 10.",
      "Khi x được khởi tạo, y vẫn đang là 0.",
      "Method getY() không được phép truy cập field y khai báo phía sau.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Field được khởi tạo theo thứ tự khai báo. Khi x chạy initializer, y chưa được gán 10 nên đang là default 0.",
  },
  {
    id: 8,
    title: "Câu 8: Xét đoạn code sau",
    code: `public class Test {
    static int x = getY();
    static int y = 5;

    static int getY() {
        return y;
    }

    public static void main(String[] args) {
        System.out.println(x);
        System.out.println(y);
    }
}`,
    options: [
      "Dòng đầu in 0.",
      "Dòng thứ hai in 5.",
      "Khi getY() chạy để khởi tạo x, y vẫn đang là default value.",
      "Đây là illegal forward reference.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Gọi method getY() hợp lệ. Trong lúc x được tính, y chưa chạy initializer nên đang là 0.",
  },
  {
    id: 9,
    title: "Câu 9: Xét đoạn code sau",
    code: `class A {
}

enum E extends A {
    X
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Enum không được extends class một cách tường minh.",
      "Enum ngầm kế thừa java.lang.Enum.",
      "Enum không bao giờ được implement interface.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Enum không thể extends class khác vì nó ngầm extends java.lang.Enum, nhưng enum vẫn có thể implements interface.",
  },
  {
    id: 10,
    title: "Câu 10: Xét đoạn code sau",
    code: `interface I {
    void f();
}

enum E implements I {
    A, B;

    public void f() {
        System.out.println(name());
    }
}

public class Test {
    public static void main(String[] args) {
        E.A.f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A.",
      "Enum có thể implements interface.",
      "Method f() phải public vì đang implement method của interface.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Enum là một dạng class đặc biệt nên có thể implement interface. Interface method là public.",
  },
  {
    id: 11,
    title: "Câu 11: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Runnable r = new Runnable() {
            public void run() {
                System.out.println("run");
            }

            void extra() {
                System.out.println("extra");
            }
        };

        r.extra();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Object anonymous class thật sự có method extra().",
      "Biến r có kiểu compile-time là Runnable nên không gọi được extra().",
      "Nếu gọi r.run() thì có thể compile.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Anonymous object có extra(), nhưng reference r có kiểu Runnable, mà Runnable không khai báo extra().",
  },
  {
    id: 12,
    title: "Câu 12: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        int[] a = {1};

        class L {
            void f() {
                System.out.println(a[0]);
            }
        }

        a[0] = 9;

        new L().f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 9.",
      "Biến a vẫn effectively final vì bản thân biến a không bị gán lại.",
      "Sửa a[0] làm biến a mất effectively final.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Local class capture reference a. Biến a không bị gán lại, nên vẫn effectively final. Object/mảng bên trong vẫn sửa được.",
  },
  {
    id: 13,
    title: "Câu 13: Xét đoạn code sau",
    code: `class Outer {
    private static int x = 7;

    static class Nested {
        void print() {
            System.out.println(x);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        new Outer.Nested().print();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 7.",
      "Static nested class có thể truy cập private static member của outer class.",
      "Cần tạo new Outer() trước rồi mới tạo được Outer.Nested.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Static nested class thuộc Outer nhưng không cần instance Outer. Nó vẫn truy cập được private static member.",
  },
  {
    id: 14,
    title: "Câu 14: Xét đoạn code sau",
    code: `class Outer {
    int x = 1;

    class Inner {
        void inc() {
            x++;
        }
    }
}

public class Test {
    public static void main(String[] args) {
        Outer o = new Outer();
        Outer.Inner i = o.new Inner();

        i.inc();
        i.inc();

        System.out.println(o.x);
    }
}`,
    options: [
      "Output là 3.",
      "Inner là non-static inner class nên gắn với object Outer cụ thể.",
      "i.inc() sửa field x của object o.",
      "Mỗi lần gọi inc() tạo một Outer mới.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Inner được tạo từ o nên có enclosing instance là o. inc() sửa x của o.",
  },
  {
    id: 15,
    title: "Câu 15: Xét đoạn code sau",
    code: `class Box<T extends Number> {
    T value;
}

public class Test {
    public static void main(String[] args) {
        Box<Integer> a = new Box<>();
        Box<Double> b = new Box<>();
        Box<String> c = new Box<>();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Box<Integer> hợp lệ.",
      "Box<Double> hợp lệ.",
      "Box<String> không hợp lệ vì String không extends Number.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "T bị ràng buộc bởi T extends Number, nên chỉ nhận Number hoặc subclass của Number.",
  },
  {
    id: 16,
    title: "Câu 16: Xét đoạn code sau",
    code: `class Box<T> {
    static <T> T id(T value) {
        return value;
    }
}

public class Test {
    public static void main(String[] args) {
        String s = Box.id("A");
        Integer i = Box.id(1);

        System.out.println(s + i);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A1.",
      "Generic type T của static method là T riêng, không phải T của class Box<T>.",
      "Static method không bao giờ được khai báo generic.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Static generic method có thể tự khai báo type parameter riêng.",
  },
  {
    id: 17,
    title: "Câu 17: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<? super Number> list = new ArrayList<Object>();

        list.add(1);
        list.add(2.5);

        Object a = list.get(0);
        Number b = list.get(0);

        System.out.println(a);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "list.add(1) hợp lệ.",
      "list.add(2.5) hợp lệ.",
      "Object a = list.get(0) hợp lệ.",
      "Number b = list.get(0) không hợp lệ.",
    ],
    correct: [0, 1, 2, 3, 4],
    explanation:
      "? super Number cho phép thêm Number và subclass của Number. Nhưng khi đọc ra chỉ chắc chắn là Object.",
  },
  {
    id: 18,
    title: "Câu 18: Xét đoạn code sau",
    code: `import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<?>[] a = new List<?>[1];

        List<String>[] b = new List<String>[1];
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "List<?>[] a = new List<?>[1] hợp lệ.",
      "List<String>[] b = new List<String>[1] không hợp lệ.",
      "Java cho phép tạo generic array với kiểu cụ thể như List<String>.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Mảng của unbounded wildcard List<?> có thể tạo, nhưng mảng của parameterized type cụ thể List<String> thì không.",
  },
  {
    id: 19,
    title: "Câu 19: Xét đoạn code sau",
    code: `import java.util.Arrays;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        int[] a = {1, 2, 3};

        List<int[]> list = Arrays.asList(a);

        System.out.println(list.size());
        System.out.println(list.get(0)[1]);
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in 2.",
      "Arrays.asList(a) với a là int[] tạo List có một phần tử là chính mảng int[].",
      "Dòng đầu in 3 vì a có 3 phần tử int.",
    ],
    correct: [0, 1, 2],
    explanation:
      "int[] là một object. Arrays.asList(a) nhận một object int[] nên tạo list kích thước 1.",
  },
  {
    id: 20,
    title: "Câu 20: Xét đoạn code sau",
    code: `public class Test {
    static void f(Object... xs) {
        if (xs == null) {
            System.out.print("null ");
        } else {
            System.out.print(xs.length + " ");
        }
    }

    public static void main(String[] args) {
        f(null);
        f((Object) null);
    }
}`,
    options: [
      "Output là null 1.",
      "f(null) truyền null như một Object[].",
      "f((Object) null) tạo varargs array có một phần tử null.",
      "f(null) và f((Object) null) hoàn toàn giống nhau.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Với varargs Object..., null có thể được hiểu là null Object[]. Ép sang Object khiến nó là một phần tử của varargs array.",
  },
  {
    id: 21,
    title: "Câu 21: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Number[] nums = new Integer[2];

        nums[0] = 1;
        nums[1] = 2.5;

        System.out.println(nums[0]);
    }
}`,
    options: [
      "Chương trình compile được.",
      "nums[0] = 1 hợp lệ.",
      "nums[1] = 2.5 gây ArrayStoreException.",
      "Integer[] có thể gán cho Number[] vì array trong Java covariant.",
      "Dòng cuối vẫn được in ra.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Mảng thật là Integer[]. Gán Integer hợp lệ, gán Double vào Integer[] qua Number[] gây ArrayStoreException trước dòng cuối.",
  },
  {
    id: 22,
    title: "Câu 22: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        int[][] a = {
            {1, 2},
            {3, 4}
        };

        int[][] b = a.clone();

        b[0][0] = 9;
        b[1] = new int[] {7, 8};

        System.out.println(a[0][0]);
        System.out.println(a[1][0]);
        System.out.println(b[1][0]);
    }
}`,
    options: [
      "Dòng đầu in 9.",
      "Dòng thứ hai in 3.",
      "Dòng thứ ba in 7.",
      "clone() của mảng 2 chiều clone sâu tất cả mảng con.",
    ],
    correct: [0, 1, 2],
    explanation:
      "clone() của mảng object là shallow copy. Mảng ngoài mới, nhưng các mảng con ban đầu vẫn dùng chung.",
  },
  {
    id: 23,
    title: "Câu 23: Xét đoạn code sau",
    code: `import java.util.Objects;

public class Test {
    public static void main(String[] args) {
        String s = null;

        System.out.println(Objects.equals(s, "A"));
        System.out.println(s.equals("A"));
        System.out.println("DONE");
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai gây NullPointerException.",
      "DONE không được in ra.",
      "Objects.equals xử lý được null an toàn.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Objects.equals an toàn với null. Gọi s.equals(...) khi s là null gây NullPointerException.",
  },
  {
    id: 24,
    title: "Câu 24: Xét đoạn code sau",
    code: `public class Test {
    static Test t = new Test();

    static int x = 5;

    int y = x;

    Test() {
        System.out.print(y + " ");
    }

    public static void main(String[] args) {
        System.out.println(x);
    }
}`,
    options: [
      "Output là 0 5.",
      "Khi static field t được khởi tạo, static field x vẫn đang là default 0.",
      "Instance field y nhận giá trị 0 khi new Test() chạy trong static initialization.",
      "Output là 5 5.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Static fields có default value trước, sau đó initializer chạy theo thứ tự. t được tạo trước khi x được gán 5.",
  },
  {
    id: 25,
    title: "Câu 25: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) throws Exception {
        Object o = new Object();

        Object c = o.clone();

        System.out.println(c);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "clone() trong Object có access protected.",
      "Không thể gọi o.clone() từ class Test như vậy.",
      "Mọi object đều có thể clone công khai bằng o.clone().",
    ],
    correct: [0, 1, 2],
    explanation:
      "Object.clone() là protected, không phải public API có thể gọi tùy ý từ bên ngoài.",
  },
  {
    id: 26,
    title: "Câu 26: Xét đoạn code sau",
    code: `class A {
    A() {
        System.out.print("A ");
        throw new RuntimeException();
    }
}

class B extends A {
    {
        System.out.print("I ");
    }

    B() {
        System.out.print("B ");
    }
}

public class Test {
    public static void main(String[] args) {
        try {
            new B();
        } catch (RuntimeException e) {
            System.out.print("C");
        }
    }
}`,
    options: [
      "Output là A C.",
      "Instance initializer của B không chạy.",
      "Constructor body của B không chạy.",
      "Nếu constructor A ném exception, quá trình tạo phần B bị dừng.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Constructor cha A chạy trước. Khi A ném exception, initializer và constructor body của B không chạy.",
  },
  {
    id: 27,
    title: "Câu 27: Xét đoạn code sau",
    code: `import java.io.IOException;

class A {
    A() throws IOException {
    }
}

class B extends A {
    B() {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Constructor B() ngầm gọi super().",
      "Constructor A() khai báo throws IOException.",
      "B() phải catch hoặc khai báo throws IOException.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Constructor con phải xử lý checked exception có thể phát sinh từ constructor cha.",
  },
  {
    id: 28,
    title: "Câu 28: Xét đoạn code sau",
    code: `public class Test {
    static void f(Object o) {
        System.out.print("Object ");
    }

    static void f(Object[] o) {
        System.out.print("Object[] ");
    }

    public static void main(String[] args) {
        String[] s = null;

        f(s);
        f((Object) s);
    }
}`,
    options: [
      "Output là Object[] Object.",
      "f(s) chọn f(Object[]) vì String[] là subtype của Object[].",
      "f((Object) s) chọn f(Object).",
      "f(s) bị ambiguous.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Overload xét kiểu compile-time. String[] phù hợp hơn với Object[], còn cast sang Object khiến chọn f(Object).",
  },
  {
    id: 29,
    title: "Câu 29: Xét đoạn code sau",
    code: `import java.io.Serializable;

public class Test {
    static void f(Serializable s) {
        System.out.println("Serializable");
    }

    static void f(Comparable<?> c) {
        System.out.println("Comparable");
    }

    public static void main(String[] args) {
        f("abc");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "String implement cả Serializable và Comparable.",
      "Lời gọi f(\"abc\") bị ambiguous.",
      "Compiler tự chọn Serializable vì được khai báo trước.",
    ],
    correct: [0, 1, 2],
    explanation:
      "String khớp với cả hai overload. Serializable và Comparable không cái nào cụ thể hơn cái kia.",
  },
  {
    id: 30,
    title: "Câu 30: Xét đoạn code sau",
    code: `class Outer {
    enum E {
        A
    }
}

public class Test {
    public static void main(String[] args) {
        Outer.E e = Outer.E.A;

        System.out.println(e);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A.",
      "Nested enum là static ngầm.",
      "Phải tạo new Outer() mới truy cập được Outer.E.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Enum lồng trong class là static ngầm, nên truy cập qua Outer.E.",
  },
  {
    id: 31,
    title: "Câu 31: Xét đoạn code sau",
    code: `interface I {
    class A {
        static int x = 1;
    }
}

public class Test {
    public static void main(String[] args) {
        I.A a = new I.A();

        System.out.println(I.A.x);
        System.out.println(a instanceof I.A);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Dòng đầu in 1.",
      "Dòng thứ hai in true.",
      "Nested class trong interface là static ngầm.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Type khai báo trong interface mặc định là public static.",
  },
  {
    id: 32,
    title: "Câu 32: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        System.out.println(list instanceof ArrayList<String>);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không được dùng parameterized type cụ thể như ArrayList<String> trong instanceof.",
      "Có thể dùng list instanceof ArrayList<?>.",
      "Output là true.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Do type erasure, instanceof với generic type cụ thể không hợp lệ. Wildcard reifiable như ArrayList<?> thì dùng được.",
  },
  {
    id: 33,
    title: "Câu 33: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Integer x = null;

        switch (x) {
            case 1:
                System.out.println("A");
                break;
            default:
                System.out.println("D");
        }
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có NullPointerException khi chạy.",
      "default không được chạy.",
      "switch trên Integer null an toàn và chạy default.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Switch trên Integer cần unbox giá trị. Unbox null gây NullPointerException trước khi xét case/default.",
  },
  {
    id: 34,
    title: "Câu 34: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Boolean b = null;

        if (b) {
            System.out.println("A");
        } else {
            System.out.println("B");
        }
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có NullPointerException khi chạy.",
      "b cần unbox thành boolean trong điều kiện if.",
      "Output là B vì null được xem là false.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Điều kiện if cần boolean primitive. Boolean null bị unbox sẽ gây NullPointerException.",
  },
  {
    id: 35,
    title: "Câu 35: Xét đoạn code sau",
    code: `public class Test {
    static int x = 1;

    static int f() {
        try {
            return x;
        } finally {
            x = 2;
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
        System.out.println(x);
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in 2.",
      "Giá trị return được chuẩn bị trước khi finally đổi x.",
      "finally không chạy vì try đã return.",
    ],
    correct: [0, 1, 2],
    explanation:
      "try chuẩn bị return giá trị x là 1, sau đó finally chạy đổi x thành 2, rồi method trả về 1.",
  },
  {
    id: 36,
    title: "Câu 36: Xét đoạn code sau",
    code: `class A {
    static {
        System.out.print("init ");
        if (true) {
            throw new RuntimeException();
        }
    }
}

public class Test {
    public static void main(String[] args) {
        try {
            new A();
        } catch (Throwable e) {
            System.out.print(e.getClass().getSimpleName() + " ");
        }

        try {
            new A();
        } catch (Throwable e) {
            System.out.print(e.getClass().getSimpleName());
        }
    }
}`,
    options: [
      "Lần đầu dùng A gây ExceptionInInitializerError.",
      "Lần thứ hai dùng A thường gây NoClassDefFoundError.",
      "Output có init một lần.",
      "RuntimeException trong static initializer thoát ra trực tiếp, không bị wrap.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Exception trong static initializer bị wrap thành ExceptionInInitializerError. Sau khi initialization thất bại, lần dùng sau thường là NoClassDefFoundError.",
  },
  {
    id: 37,
    title: "Câu 37: Xét đoạn code sau",
    code: `class A {
    A copy() {
        System.out.print("A ");
        return new A();
    }
}

class B extends A {
    B copy() {
        System.out.print("B ");
        return new B();
    }
}

public class Test {
    public static void main(String[] args) {
        A a = new B();

        A r = a.copy();

        System.out.println(r instanceof B);
    }
}`,
    options: [
      "Output là B true.",
      "a.copy() gọi B.copy() vì dynamic dispatch.",
      "B.copy() có covariant return type hợp lệ.",
      "Output là A false vì biến a có kiểu A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Instance method dispatch theo object thật B. B.copy() trả về B, là subtype của A.",
  },
  {
    id: 38,
    title: "Câu 38: Xét đoạn code sau",
    code: `abstract class A {
    abstract void f();
}

public class Test {
    public static void main(String[] args) {
        A a = new A() {
            void f() {
                System.out.println("X");
            }
        };

        a.f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là X.",
      "Có thể tạo anonymous subclass của abstract class nếu implement đủ abstract method.",
      "new A() luôn luôn lỗi dù có anonymous class body phía sau.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Đây không phải tạo trực tiếp A, mà là tạo anonymous subclass của A và implement f().",
  },
  {
    id: 39,
    title: "Câu 39: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Object o = new String("x") {
        };

        System.out.println(o);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "String là final class.",
      "Không thể tạo anonymous subclass của final class.",
      "Output là x.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Anonymous class body sau new String(...) nghĩa là tạo subclass của String, nhưng String là final.",
  },
  {
    id: 40,
    title: "Câu 40: Xét đoạn code sau",
    code: `class A<T> {
    void f(T t) {
        System.out.println("A");
    }
}

class B extends A<String> {
    void f(String s) {
        System.out.println("B");
    }
}

public class Test {
    public static void main(String[] args) {
        A raw = new B();

        raw.f(123);
    }
}`,
    options: [
      "Chương trình compile được nhưng có warning liên quan raw type.",
      "Có ClassCastException khi chạy.",
      "Do generic bridge/cast, Integer 123 không thể dùng như String cho B.f(String).",
      "Output là B.",
      "Raw type có thể làm mất an toàn kiểu generic.",
    ],
    correct: [0, 1, 2, 4],
    explanation:
      "Dùng raw type làm compiler mất kiểm tra generic. Runtime vẫn cần cast về String khi gọi method thực tế của B, nên Integer gây ClassCastException.",
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

  const answeredCount = useMemo(
    () => questions.filter((q) => (selected[q.id] ?? []).length > 0).length,
    [selected]
  );

  const score = useMemo(
    () =>
      questions.reduce((total, q) => {
        const userAnswer = selected[q.id] ?? [];
        return total + (sameSet(userAnswer, q.correct) ? 1 : 0);
      }, 0),
    [selected]
  );

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
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-teal-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề luyện Java OOP số 9 - 40 câu mới
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
                <div className="mt-2 text-teal-300">
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
                      <p className="text-sm font-semibold text-teal-400">
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
                                  ? "border-teal-500/70 bg-teal-500/10"
                                  : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-teal-400"
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
                      <p className="text-sm font-bold text-teal-300">
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
                          ? "border-teal-500/60 bg-teal-500/15 text-teal-200"
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
                  className="w-full rounded-2xl bg-teal-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-teal-300"
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
                    <span className="font-bold text-teal-300">
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