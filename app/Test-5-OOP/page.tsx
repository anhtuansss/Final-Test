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
    title: "Câu 1: Gán trong điều kiện if",
    code: `public class Test {
    public static void main(String[] args) {
        boolean b = false;

        if (b = true) {
            System.out.println("A");
        }

        System.out.println(b);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A rồi true.",
      "b = true là phép gán, đồng thời biểu thức có giá trị true.",
      "Chương trình lỗi biên dịch vì trong if không được dùng phép gán.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Trong Java, if cần biểu thức boolean. Phép gán b = true trả về giá trị boolean true, nên hợp lệ.",
  },
  {
    id: 2,
    title: "Câu 2: Thứ tự tính toán với i++ và ++i",
    code: `public class Test {
    public static void main(String[] args) {
        int i = 1;

        int j = i++ + ++i + i++;

        System.out.println(i);
        System.out.println(j);
    }
}`,
    options: [
      "Dòng đầu in 4.",
      "Dòng thứ hai in 7.",
      "Biểu thức được tính từ trái sang phải.",
      "Dòng thứ hai in 6.",
    ],
    correct: [0, 1, 2],
    explanation:
      "i++ trả 1 rồi i thành 2; ++i làm i thành 3 rồi trả 3; i++ trả 3 rồi i thành 4. j = 1 + 3 + 3 = 7.",
  },
  {
    id: 3,
    title: "Câu 3: Thứ tự đánh giá vế trái phép gán",
    code: `public class Test {
    public static void main(String[] args) {
        int[] a = {10, 20, 30};
        int i = 0;

        a[i] = i = 2;

        System.out.println(i);
        System.out.println(a[0]);
        System.out.println(a[2]);
    }
}`,
    options: [
      "Dòng đầu in 2.",
      "Dòng thứ hai in 2.",
      "Dòng thứ ba in 30.",
      "a[2] bị gán thành 2.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Vế trái a[i] được xác định index trước, khi đó i vẫn là 0. Sau đó RHS i = 2 chạy, rồi giá trị 2 được gán vào a[0].",
  },
  {
    id: 4,
    title: "Câu 4: Overload với char",
    code: `public class Test {
    static void f(char x) {
        System.out.println("char");
    }

    static void f(int x) {
        System.out.println("int");
    }

    public static void main(String[] args) {
        char c = 'A';

        f(c);
        f(c + 1);
    }
}`,
    options: [
      "Dòng f(c) gọi f(char).",
      "Dòng f(c + 1) gọi f(int).",
      "Dòng f(c + 1) gọi f(char).",
      "Biểu thức c + 1 có kiểu int.",
    ],
    correct: [0, 1, 3],
    explanation:
      "char truyền trực tiếp thì match f(char). Nhưng char tham gia phép cộng số học sẽ được promote lên int.",
  },
  {
    id: 5,
    title: "Câu 5: char widening",
    code: `public class Test {
    static void f(int x) {
        System.out.println("int");
    }

    static void f(long x) {
        System.out.println("long");
    }

    public static void main(String[] args) {
        f('A');
    }
}`,
    options: [
      "Output là int.",
      "Output là long.",
      "char có thể widening sang int.",
      "char không thể truyền vào method nhận int.",
    ],
    correct: [0, 2],
    explanation:
      "char có thể widening sang int hoặc long, nhưng int gần hơn nên f(int) được chọn.",
  },
  {
    id: 6,
    title: "Câu 6: null với Object và int[]",
    code: `public class Test {
    static void f(Object o) {
        System.out.println("Object");
    }

    static void f(int[] a) {
        System.out.println("int[]");
    }

    public static void main(String[] args) {
        f(null);
    }
}`,
    options: [
      "Output là int[].",
      "Output là Object.",
      "int[] là reference type nên null gán được.",
      "int[] cụ thể hơn Object.",
    ],
    correct: [0, 2, 3],
    explanation:
      "null khớp với cả Object và int[]. Vì int[] là subtype của Object, overload cụ thể hơn là f(int[]).",
  },
  {
    id: 7,
    title: "Câu 7: Truy cập static field kế thừa",
    code: `class A {
    static int x = init("A");

    static int init(String s) {
        System.out.print(s + " ");
        return 1;
    }
}

class B extends A {
    static int y = init("B");
}

public class Test {
    public static void main(String[] args) {
        System.out.print(B.x);
    }
}`,
    options: [
      "Output có A.",
      "Output không có B.",
      "B.x đang truy cập field x được khai báo trong A.",
      "Truy cập B.x bắt buộc làm class B chạy static initializer.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Field x được khai báo trong A. Truy cập static field kế thừa qua B.x chỉ cần initialize class khai báo field là A, không nhất thiết initialize B.",
  },
  {
    id: 8,
    title: "Câu 8: Truy cập static field của class con",
    code: `class A {
    static int x = init("A");

    static int init(String s) {
        System.out.print(s + " ");
        return 1;
    }
}

class B extends A {
    static int y = init("B");
}

public class Test {
    public static void main(String[] args) {
        System.out.print(B.y);
    }
}`,
    options: [
      "Output có A.",
      "Output có B.",
      "Class A được initialize trước class B.",
      "Output không có A vì chỉ truy cập B.y.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Khi initialize class con B, superclass A phải được initialize trước.",
  },
  {
    id: 9,
    title: "Câu 9: Class literal",
    code: `class A {
    static {
        System.out.print("A ");
    }
}

public class Test {
    public static void main(String[] args) {
        Class<?> c = A.class;
        System.out.print("OK");
    }
}`,
    options: [
      "Output là OK.",
      "Static block của A không chạy chỉ vì lấy A.class.",
      "Output là A OK.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Lấy class literal A.class không kích hoạt class initialization của A.",
  },
  {
    id: 10,
    title: "Câu 10: Tạo mảng object",
    code: `class A {
    static {
        System.out.print("A ");
    }
}

public class Test {
    public static void main(String[] args) {
        A[] arr = new A[2];

        System.out.println(arr[0]);
        System.out.println("DONE");
    }
}`,
    options: [
      "Static block của A không chạy.",
      "Dòng đầu in null.",
      "DONE được in ra.",
      "Tạo new A[2] sẽ tạo luôn 2 object A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "new A[2] chỉ tạo mảng chứa reference, không tạo object A. Các phần tử mặc định là null.",
  },
  {
    id: 11,
    title: "Câu 11: Gọi static method kế thừa qua class con",
    code: `class A {
    static {
        System.out.print("A ");
    }

    static void f() {
        System.out.print("f");
    }
}

class B extends A {
    static {
        System.out.print("B ");
    }
}

public class Test {
    public static void main(String[] args) {
        B.f();
    }
}`,
    options: [
      "Output là A f.",
      "Static block của B không chạy.",
      "Output là A B f.",
      "Method f được khai báo trong A.",
    ],
    correct: [0, 1, 3],
    explanation:
      "B.f() gọi static method được khai báo trong A, nên chỉ A cần initialize.",
  },
  {
    id: 12,
    title: "Câu 12: Static field hiding và null reference",
    code: `class A {
    static int x = 1;
}

class B extends A {
    static int x = 2;
}

public class Test {
    public static void main(String[] args) {
        A a = null;
        B b = null;

        System.out.println(a.x);
        System.out.println(b.x);
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in 2.",
      "Không có NullPointerException.",
      "Static field được quyết định theo kiểu tham chiếu.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Static field thuộc class, không thuộc object. a.x xét theo kiểu A, b.x xét theo kiểu B.",
  },
  {
    id: 13,
    title: "Câu 13: super và field hiding",
    code: `class A {
    int x = 1;
}

class B extends A {
    int x = 2;

    void print() {
        System.out.println(x);
        System.out.println(super.x);
    }
}

public class Test {
    public static void main(String[] args) {
        new B().print();
    }
}`,
    options: [
      "Dòng đầu in 2.",
      "Dòng thứ hai in 1.",
      "super.x truy cập field x của A.",
      "Field x của B override field x của A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Field không override, chỉ hide. Trong B, x là field của B, còn super.x là field của A.",
  },
  {
    id: 14,
    title: "Câu 14: return trong constructor",
    code: `class A {
    A() {
        System.out.print("A ");
        return;
    }
}

public class Test {
    public static void main(String[] args) {
        new A();
        System.out.print("OK");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A OK.",
      "return; trong constructor là hợp lệ.",
      "Constructor bắt buộc không được có bất kỳ return nào.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Constructor không có return type, nhưng return; để thoát sớm vẫn hợp lệ.",
  },
  {
    id: 15,
    title: "Câu 15: return giá trị trong constructor",
    code: `class A {
    A() {
        return 1;
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Constructor không được return kèm giá trị.",
      "Constructor trả về object nên return 1 hợp lệ.",
      "Nếu đổi thành return; thì có thể hợp lệ.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Constructor không có kiểu trả về, nên không được return giá trị.",
  },
  {
    id: 16,
    title: "Câu 16: Instance field forward reference",
    code: `public class Test {
    int a = b + 1;
    int b = 2;

    public static void main(String[] args) {
        Test t = new Test();
        System.out.println(t.a);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Dòng int a = b + 1; là illegal forward reference.",
      "Chương trình in 1.",
      "Dùng simple name b trước khi b được khai báo trong field initializer là không hợp lệ.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Trong initializer của field, tham chiếu field khai báo phía sau bằng simple name có thể gây illegal forward reference.",
  },
  {
    id: 17,
    title: "Câu 17: Field khai báo sau nhưng dùng trong method",
    code: `public class Test {
    void f() {
        System.out.println(b);
    }

    int b = 2;

    public static void main(String[] args) {
        new Test().f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 2.",
      "Method body có thể tham chiếu field khai báo phía sau trong class.",
      "Dòng System.out.println(b) là illegal forward reference.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Thứ tự khai báo field không cấm method truy cập field đó. Illegal forward reference chủ yếu xảy ra trong initializer.",
  },
  {
    id: 18,
    title: "Câu 18: Modifier của local variable",
    code: `public class Test {
    public static void main(String[] args) {
        public int x = 1;
        System.out.println(x);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Local variable không được khai báo public.",
      "Local variable có thể dùng final.",
      "Output là 1.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Biến local trong method không dùng access modifier như public/private/protected. Modifier thường dùng được là final.",
  },
  {
    id: 19,
    title: "Câu 19: Blank final local variable",
    code: `public class Test {
    public static void main(String[] args) {
        final int x;

        x = 1;
        x = 2;

        System.out.println(x);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "final local variable chỉ được gán một lần.",
      "Dòng x = 1 hợp lệ.",
      "Dòng x = 2 không hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Blank final local variable có thể gán sau khi khai báo, nhưng chỉ được gán đúng một lần.",
  },
  {
    id: 20,
    title: "Câu 20: this trong inner class",
    code: `class Outer {
    int x = 1;

    class Inner {
        int x = 2;

        void f() {
            int x = 3;

            System.out.println(x);
            System.out.println(this.x);
            System.out.println(Outer.this.x);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        new Outer().new Inner().f();
    }
}`,
    options: [
      "Output là 3, 2, 1.",
      "this.x trong Inner là field x của Inner.",
      "Outer.this.x truy cập field x của Outer.",
      "Biến local x bị bỏ qua vì field x ưu tiên hơn local variable.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Tên x gần nhất là local variable. this.x là field của Inner, còn Outer.this.x là field của Outer.",
  },
  {
    id: 21,
    title: "Câu 21: Outer.this trong static nested class",
    code: `class Outer {
    int x = 1;

    static class Inner {
        void f() {
            System.out.println(Outer.this.x);
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Static nested class không gắn với một object Outer cụ thể.",
      "Outer.this chỉ dùng được trong non-static inner class.",
      "Output là 1.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Static nested class không có enclosing instance của Outer, nên không dùng được Outer.this.",
  },
  {
    id: 22,
    title: "Câu 22: protected ở package khác",
    code: `// File p1/A.java
package p1;

public class A {
    protected int x = 1;
}

// File p2/B.java
package p2;

import p1.A;

public class B extends A {
    void f(A a, B b) {
        System.out.println(this.x);
        System.out.println(b.x);
        System.out.println(a.x);
    }
}`,
    options: [
      "Dòng this.x hợp lệ.",
      "Dòng b.x hợp lệ.",
      "Dòng a.x lỗi biên dịch.",
      "Ở package khác, subclass được truy cập protected member qua reference kiểu subclass phù hợp, không tùy tiện qua A.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Trong package khác, protected member của superclass được subclass truy cập qua this hoặc qua reference có kiểu subclass, không qua một biến A bất kỳ.",
  },
  {
    id: 23,
    title: "Câu 23: Package-private class ở package khác",
    code: `// File p1/A.java
package p1;

class A {
}

// File p2/Test.java
package p2;

import p1.A;

public class Test {
    A a;
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Class A không public nên không truy cập được từ package p2.",
      "import p1.A hợp lệ dù A package-private.",
      "Nếu class A được khai báo public thì phần truy cập này có thể hợp lệ.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Top-level class không public chỉ truy cập được trong cùng package.",
  },
  {
    id: 24,
    title: "Câu 24: abstract static method",
    code: `abstract class A {
    abstract static void f();
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "static method không thể là abstract.",
      "abstract method cần override động, còn static method không đa hình theo runtime object.",
      "Nếu bỏ static thì abstract void f(); có thể hợp lệ trong abstract class.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "abstract yêu cầu class con override, nhưng static method thuộc class và bị hide, không override theo runtime object.",
  },
  {
    id: 25,
    title: "Câu 25: Static method không implement interface method",
    code: `interface I {
    void f();
}

class A {
    static void f() {
    }
}

class B extends A implements I {
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Static method f() trong A không thể implement instance method f() của I.",
      "B vẫn phải có instance method public void f().",
      "Vì B kế thừa A.f() nên đã implement xong I.f().",
    ],
    correct: [0, 1, 2],
    explanation:
      "Interface method f() là instance method public abstract. Static method trong class cha không thể thay thế nó.",
  },
  {
    id: 26,
    title: "Câu 26: Unbounded wildcard",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<?> list = new ArrayList<String>();

        list.add("A");
        list.add(null);

        Object o = list.get(0);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Dòng list.add(\"A\") không hợp lệ.",
      "Dòng list.add(null) hợp lệ nếu bỏ dòng lỗi phía trên.",
      "Đọc phần tử từ List<?> ra Object là hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Với List<?>, compiler không biết list thật chứa kiểu gì, nên không cho add giá trị cụ thể ngoài null. Đọc ra thì đảm bảo là Object.",
  },
  {
    id: 27,
    title: "Câu 27: Mutable key trong HashMap",
    code: `import java.util.HashMap;

class Key {
    int x;

    Key(int x) {
        this.x = x;
    }

    public boolean equals(Object o) {
        return o instanceof Key && ((Key) o).x == x;
    }

    public int hashCode() {
        return x;
    }
}

public class Test {
    public static void main(String[] args) {
        HashMap<Key, String> map = new HashMap<>();

        Key k = new Key(1);
        map.put(k, "A");

        k.x = 2;

        System.out.println(map.get(k));
        System.out.println(map.containsKey(new Key(1)));
    }
}`,
    options: [
      "Dòng đầu thường in null.",
      "Dòng thứ hai in false.",
      "Đổi field tham gia hashCode sau khi put vào HashMap làm key khó tìm lại.",
      "HashMap tự cập nhật lại bucket khi field trong key thay đổi.",
    ],
    correct: [0, 1, 2],
    explanation:
      "HashMap dùng hashCode để định vị bucket. Sau khi key bị mutate, hashCode thay đổi, nên lookup bằng key đó có thể không tìm lại được entry cũ.",
  },
  {
    id: 28,
    title: "Câu 28: TreeSet và comparator",
    code: `import java.util.TreeSet;

public class Test {
    public static void main(String[] args) {
        TreeSet<String> set = new TreeSet<>(
            (a, b) -> a.length() - b.length()
        );

        set.add("a");
        set.add("b");
        set.add("cc");

        System.out.println(set.size());
        System.out.println(set.contains("b"));
    }
}`,
    options: [
      "Dòng đầu in 2.",
      "Dòng thứ hai in true.",
      "\"a\" và \"b\" được comparator xem là bằng nhau.",
      "TreeSet chỉ dùng equals, không quan tâm comparator.",
    ],
    correct: [0, 1, 2],
    explanation:
      "TreeSet dùng comparator để xác định thứ tự và sự trùng. \"a\" và \"b\" cùng độ dài nên compare trả 0, được xem như trùng.",
  },
  {
    id: 29,
    title: "Câu 29: Integer và Long",
    code: `public class Test {
    public static void main(String[] args) {
        Integer i = 1;
        Long l = 1L;

        System.out.println(i.equals(l));
        System.out.println(i == l);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Dòng i == l không hợp lệ vì Integer và Long là hai kiểu wrapper khác nhau.",
      "Nếu chỉ xét i.equals(l), kết quả là false.",
      "Integer.equals chỉ trả true khi object kia cũng là Integer cùng giá trị.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Integer và Long là hai reference type không so sánh trực tiếp bằng == được. equals của Integer cũng không coi Long(1) là bằng Integer(1).",
  },
  {
    id: 30,
    title: "Câu 30: Double NaN với equals",
    code: `public class Test {
    public static void main(String[] args) {
        Double a = Double.NaN;
        Double b = Double.NaN;

        System.out.println(a.equals(b));
        System.out.println(a.doubleValue() == b.doubleValue());
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in false.",
      "Double.equals xem hai giá trị NaN là bằng nhau.",
      "Toán tử == trên primitive double xem NaN bằng chính nó.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Double.equals có quy tắc riêng khiến NaN equals NaN là true. Nhưng so sánh primitive double bằng == thì NaN không bằng bất kỳ giá trị nào.",
  },
  {
    id: 31,
    title: "Câu 31: 0.0 và -0.0",
    code: `public class Test {
    public static void main(String[] args) {
        double x = 0.0;
        double y = -0.0;

        Double a = x;
        Double b = y;

        System.out.println(x == y);
        System.out.println(a.equals(b));
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in false.",
      "Primitive double coi 0.0 và -0.0 bằng nhau với ==.",
      "Double.equals phân biệt 0.0 và -0.0.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Với primitive, 0.0 == -0.0 là true. Nhưng Double.equals dựa trên biểu diễn bit nên phân biệt hai giá trị này.",
  },
  {
    id: 32,
    title: "Câu 32: Exception khi close resource",
    code: `class R implements AutoCloseable {
    public void close() {
        System.out.print("close ");
        throw new RuntimeException("C");
    }
}

public class Test {
    public static void main(String[] args) {
        try (R r = new R()) {
            System.out.print("try ");
        } catch (RuntimeException e) {
            System.out.print(e.getMessage());
        }
    }
}`,
    options: [
      "Output là try close C.",
      "close() được gọi sau khi block try chạy xong.",
      "Exception từ close() được catch bởi catch RuntimeException.",
      "Vì try không ném lỗi nên close() sẽ không được gọi.",
    ],
    correct: [0, 1, 2],
    explanation:
      "try-with-resources luôn gọi close() sau block try. Nếu close ném RuntimeException, catch bên ngoài có thể bắt được.",
  },
  {
    id: 33,
    title: "Câu 33: Resource thứ hai lỗi khi khởi tạo",
    code: `class R implements AutoCloseable {
    String name;

    R(String name, boolean fail) {
        this.name = name;
        System.out.print("open" + name + " ");

        if (fail) {
            throw new RuntimeException(name);
        }
    }

    public void close() {
        System.out.print("close" + name + " ");
    }
}

public class Test {
    public static void main(String[] args) {
        try (R a = new R("A", false); R b = new R("B", true)) {
            System.out.print("try ");
        } catch (RuntimeException e) {
            System.out.print("catch" + e.getMessage());
        }
    }
}`,
    options: [
      "Output là openA openB closeA catchB.",
      "Resource a đã mở nên sẽ được close khi b khởi tạo lỗi.",
      "Block try không chạy.",
      "closeB được in ra.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Nếu resource sau khởi tạo lỗi, các resource đã mở trước đó vẫn được đóng theo thứ tự ngược lại.",
  },
  {
    id: 34,
    title: "Câu 34: Catch subclass sau superclass",
    code: `public class Test {
    public static void main(String[] args) {
        try {
            throw new RuntimeException();
        } catch (Exception e) {
            System.out.println("Exception");
        } catch (RuntimeException e) {
            System.out.println("Runtime");
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "catch RuntimeException bị unreachable.",
      "RuntimeException là subclass của Exception.",
      "Chương trình in Exception rồi Runtime.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Exception catch trước đã bắt được RuntimeException, nên catch RuntimeException phía sau không thể đạt tới.",
  },
  {
    id: 35,
    title: "Câu 35: Throwable không được catch hết bằng Exception",
    code: `class A {
    static void f() throws Throwable {
        throw new Throwable();
    }
}

public class Test {
    public static void main(String[] args) {
        try {
            A.f();
        } catch (Exception e) {
            System.out.println("Exception");
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Throwable rộng hơn Exception.",
      "catch Exception không bắt được mọi Throwable.",
      "Có thể sửa bằng catch (Throwable e) hoặc khai báo main throws Throwable.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Throwable là superclass của Exception và Error. Method f() khai báo throws Throwable, nên catch Exception chưa đủ.",
  },
  {
    id: 36,
    title: "Câu 36: Override với checked exception hẹp hơn",
    code: `import java.io.IOException;

class A {
    void f() throws Exception {
    }
}

class B extends A {
    void f() throws IOException {
    }
}`,
    options: [
      "Chương trình compile được.",
      "IOException là subclass của Exception.",
      "Override được phép khai báo checked exception hẹp hơn.",
      "B.f() bắt buộc phải throws đúng Exception, không được throws IOException.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Override không được ném checked exception rộng hơn, nhưng được ném hẹp hơn hoặc không ném.",
  },
  {
    id: 37,
    title: "Câu 37: AutoCloseable close throws checked exception",
    code: `class R implements AutoCloseable {
    public void close() throws Exception {
    }
}

public class Test {
    public static void main(String[] args) {
        try (R r = new R()) {
            System.out.println("try");
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "close() khai báo throws Exception nên try-with-resources có thể phát sinh checked exception.",
      "main phải catch hoặc throws Exception.",
      "Vì close() rỗng nên compiler biết chắc không có exception.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Compiler xét theo khai báo throws của close(), không xét thân method rỗng hay không.",
  },
  {
    id: 38,
    title: "Câu 38: enum ordinal và name",
    code: `enum E {
    B, A
}

public class Test {
    public static void main(String[] args) {
        System.out.println(E.A.ordinal());
        System.out.println(E.A.name());
        System.out.println(E.B.compareTo(E.A));
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in A.",
      "Dòng thứ ba in -1.",
      "ordinal phụ thuộc vào thứ tự khai báo enum constant.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Enum constant được đánh số từ 0 theo thứ tự khai báo. B có ordinal 0, A có ordinal 1, nên B.compareTo(A) là -1.",
  },
  {
    id: 39,
    title: "Câu 39: Constructor của enum",
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
      "Enum constants được khởi tạo khi enum E được dùng lần đầu.",
      "Constructor enum chạy cho A và B.",
      "Chỉ constructor của A chạy vì chỉ dùng E.A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Khi E được initialize, toàn bộ enum constants được tạo theo thứ tự khai báo, nên constructor chạy cho A rồi B.",
  },
  {
    id: 40,
    title: "Câu 40: Anonymous class và instance initializer",
    code: `public class Test {
    public static void main(String[] args) {
        Object o = new Object() {
            {
                System.out.print("I ");
            }

            public String toString() {
                return "T";
            }
        };

        System.out.print(o);
    }
}`,
    options: [
      "Output là I T.",
      "Instance initializer của anonymous class chạy khi object được tạo.",
      "System.out.print(o) gọi toString().",
      "Anonymous class không thể override method.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Anonymous class vẫn là class con, có thể có instance initializer và override method như toString().",
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
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-indigo-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề luyện Java OOP số 5 - 40 câu
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
                <div className="mt-2 text-indigo-300">
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
                      <p className="text-sm font-semibold text-indigo-400">
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
                              ? "border-indigo-500/70 bg-indigo-500/10"
                              : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-indigo-400"
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
                      <p className="text-sm font-bold text-indigo-300">
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
                        ? "border-indigo-500/60 bg-indigo-500/15 text-indigo-200"
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
                  className="w-full rounded-2xl bg-indigo-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-indigo-300"
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
                    <span className="font-bold text-indigo-300">
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