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
    title: "Câu 1: Khối try-catch nào đúng cú pháp Java?",
    code: `// Xét các dạng sau:
try {
}

try {
} catch (Exception e) {
}

try {
} finally {
}

try {
} catch (Exception e) {
} finally {
}`,
    options: [
      "try { } đứng một mình là hợp lệ.",
      "try { } catch (Exception e) { } là hợp lệ.",
      "try { } finally { } là hợp lệ.",
      "try { } catch (Exception e) { } finally { } là hợp lệ.",
      "finally có thể viết finally (Exception e).",
      "catch có thể viết catch { } không cần tham số.",
    ],
    correct: [1, 2, 3],
    explanation:
      "Trong Java, try phải đi kèm ít nhất một catch hoặc finally. catch bắt buộc có tham số, finally không có tham số.",
  },
  {
    id: 2,
    title: "Câu 2: Definite assignment của biến local",
    code: `public class Test {
    public static void main(String[] args) {
        int x;
        if (true) {
            x = 10;
        }
        System.out.println(x);

        boolean b = true;
        int y;
        if (b) {
            y = 20;
        }
        System.out.println(y);
    }
}`,
    options: [
      "Chương trình compile được và in ra 10 rồi 20.",
      "Dòng System.out.println(x) hợp lệ.",
      "Dòng System.out.println(y) gây lỗi biên dịch.",
      "Vì b được gán true nên compiler chắc chắn if (b) luôn chạy.",
    ],
    correct: [1, 2],
    explanation:
      "Compiler biết if (true) luôn chạy, nhưng không coi biến thường boolean b = true là hằng compile-time để đảm bảo y được gán.",
  },
  {
    id: 3,
    title: "Câu 3: byte và phép cộng",
    code: `public class Test {
    public static void main(String[] args) {
        byte b = 1;
        b = b + 1;
        b += 1;
        System.out.println(b);
    }
}`,
    options: [
      "Dòng b = b + 1 gây lỗi biên dịch.",
      "Nếu bỏ dòng b = b + 1 thì b += 1 compile được.",
      "Biểu thức b + 1 có kiểu byte.",
      "Muốn gán b = b + 1 thì cần ép kiểu: b = (byte)(b + 1).",
    ],
    correct: [0, 1, 3],
    explanation:
      "byte + int được nâng lên int. Phép += có ép kiểu ngầm, còn phép = thường thì không.",
  },
  {
    id: 4,
    title: "Câu 4: Nối chuỗi và số",
    code: `public class Test {
    public static void main(String[] args) {
        System.out.println(1 + 2 + "A");
        System.out.println("A" + 1 + 2);
    }
}`,
    options: [
      "Dòng đầu in ra 3A.",
      "Dòng thứ hai in ra A12.",
      "Dòng đầu in ra 12A.",
      "Toán tử + được xử lý từ trái sang phải khi cùng độ ưu tiên.",
    ],
    correct: [0, 1, 3],
    explanation:
      "1 + 2 tính số trước thành 3, rồi nối chuỗi. Khi bắt đầu bằng chuỗi, các phần sau bị nối chuỗi lần lượt.",
  },
  {
    id: 5,
    title: "Câu 5: String pool và new String",
    code: `public class Test {
    public static void main(String[] args) {
        String a = "hi";
        String b = "hi";
        String c = new String("hi");

        System.out.println(a == b);
        System.out.println(a == c);
        System.out.println(a.equals(c));
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in true.",
      "Dòng thứ ba in true.",
      "new String(\"hi\") tạo object String mới.",
    ],
    correct: [0, 2, 3],
    explanation:
      "String literal cùng nội dung dùng chung pool. new String tạo object mới. equals so sánh nội dung.",
  },
  {
    id: 6,
    title: "Câu 6: String immutable",
    code: `public class Test {
    public static void main(String[] args) {
        String s = "abc";
        s.toUpperCase();
        System.out.println(s);

        s = s.concat("d");
        System.out.println(s);
    }
}`,
    options: [
      "Dòng đầu in abc.",
      "Dòng đầu in ABC.",
      "Dòng thứ hai in abcd.",
      "String là immutable nên toUpperCase() không sửa trực tiếp s.",
    ],
    correct: [0, 2, 3],
    explanation:
      "Các method của String trả về String mới, không sửa object ban đầu.",
  },
  {
    id: 7,
    title: "Câu 7: && và &",
    code: `public class Test {
    public static void main(String[] args) {
        int x = 0;

        if (x != 0 && 10 / x > 1) {
            System.out.println("A");
        }

        if (x != 0 & 10 / x > 1) {
            System.out.println("B");
        }

        System.out.println("END");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Không in A.",
      "Có ArithmeticException ở điều kiện if thứ hai.",
      "END không được in ra.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "&& short-circuit nên không chia cho 0. & vẫn xét cả hai vế nên gây ArithmeticException.",
  },
  {
    id: 8,
    title: "Câu 8: Mảng một chiều",
    code: `public class Test {
    public static void main(String[] args) {
        int[] a = new int[3];

        System.out.println(a[0]);
        System.out.println(a[3]);
        System.out.println("DONE");
    }
}`,
    options: [
      "Dòng a[0] in ra 0.",
      "Dòng a[3] gây ArrayIndexOutOfBoundsException.",
      "Chương trình compile được.",
      "a.length() là cú pháp đúng để lấy độ dài mảng.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Mảng int có default value 0. Index hợp lệ là 0 đến length - 1. Mảng dùng a.length, không phải a.length().",
  },
  {
    id: 9,
    title: "Câu 9: Mảng hai chiều lệch",
    code: `public class Test {
    public static void main(String[] args) {
        int[][] a = new int[2][];

        a[0] = new int[1];

        System.out.println(a[0][0]);
        System.out.println(a[1][0]);
    }
}`,
    options: [
      "Dòng đầu in ra 0.",
      "Dòng a[1][0] gây NullPointerException.",
      "a[1] đang là null.",
      "Dòng a[1][0] gây lỗi biên dịch.",
    ],
    correct: [0, 1, 2],
    explanation:
      "new int[2][] chỉ tạo mảng ngoài. Các mảng con mặc định là null nếu chưa khởi tạo.",
  },
  {
    id: 10,
    title: "Câu 10: Java pass-by-value",
    code: `class Box {
    int v;
}

public class Test {
    static void changeInt(int x) {
        x = 9;
    }

    static void changeBox(Box b) {
        b.v = 9;
    }

    public static void main(String[] args) {
        int a = 1;
        Box box = new Box();
        box.v = 1;

        changeInt(a);
        changeBox(box);

        System.out.println(a + " " + box.v);
    }
}`,
    options: [
      "Output là 1 9.",
      "Output là 9 9.",
      "Java truyền tham trị.",
      "changeBox nhận bản copy của reference nhưng vẫn trỏ tới cùng object.",
    ],
    correct: [0, 2, 3],
    explanation:
      "Primitive không đổi. Reference cũng được truyền theo giá trị, nhưng bản copy reference vẫn trỏ đến cùng object nên sửa field được.",
  },
  {
    id: 11,
    title: "Câu 11: Gán lại reference trong method",
    code: `class Box {
    int v;
}

public class Test {
    static void change(Box b) {
        b = new Box();
        b.v = 9;
    }

    public static void main(String[] args) {
        Box box = new Box();
        box.v = 1;

        change(box);

        System.out.println(box.v);
    }
}`,
    options: [
      "Output là 1.",
      "Output là 9.",
      "b = new Box() chỉ đổi bản copy của reference.",
      "Object ban đầu mà box trỏ tới không bị sửa field v.",
    ],
    correct: [0, 2, 3],
    explanation:
      "Gán b sang object mới không làm biến box ở main đổi theo.",
  },
  {
    id: 12,
    title: "Câu 12: Default constructor",
    code: `class A {
    A(int x) {
    }
}

public class Test {
    public static void main(String[] args) {
        A a = new A();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "A không có constructor rỗng A().",
      "Compiler vẫn tự thêm A() vì class A chưa viết constructor rỗng.",
      "new A() sẽ gọi A(int x) với x mặc định là 0.",
    ],
    correct: [0, 1],
    explanation:
      "Khi class đã tự khai báo constructor, compiler không tự thêm constructor rỗng nữa.",
  },
  {
    id: 13,
    title: "Câu 13: Constructor cha và con",
    code: `class A {
    A() {
        System.out.println("A");
    }
}

class B extends A {
    B() {
        System.out.println("B");
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Output là A rồi B.",
      "Constructor B ngầm gọi super() trước.",
      "Constructor B chạy trước constructor A.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Nếu không viết gì, constructor con tự gọi super() ở dòng đầu tiên.",
  },
  {
    id: 14,
    title: "Câu 14: Cha không có constructor rỗng",
    code: `class A {
    A(int x) {
    }
}

class B extends A {
    B() {
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "B() ngầm gọi super(), nhưng A không có A().",
      "Chương trình chạy bình thường vì A(int x) nhận x mặc định.",
      "Thêm super(1); vào B() sẽ sửa được lỗi này.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Constructor con phải gọi được một constructor hợp lệ của cha.",
  },
  {
    id: 15,
    title: "Câu 15: this() trong constructor",
    code: `class A {
    A() {
        System.out.println("A");
    }

    A(int x) {
        System.out.println(x);
        this();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "this() phải là câu lệnh đầu tiên trong constructor.",
      "this() có thể đứng sau System.out.println(x).",
      "Nếu chuyển this() lên đầu constructor A(int x) thì phần này hợp lệ.",
    ],
    correct: [0, 1, 3],
    explanation:
      "this(...) hoặc super(...) nếu xuất hiện trong constructor thì bắt buộc phải là dòng đầu tiên.",
  },
  {
    id: 16,
    title: "Câu 16: Thứ tự khởi tạo",
    code: `class A {
    static {
        System.out.println("S");
    }

    int x = p("F");

    {
        p("I");
    }

    A() {
        p("C");
    }

    int p(String s) {
        System.out.println(s);
        return 0;
    }

    public static void main(String[] args) {
        new A();
        new A();
    }
}`,
    options: [
      "S chỉ in một lần.",
      "Output là S F I C F I C.",
      "Static block chạy trước mỗi lần tạo object.",
      "Field initializer chạy trước instance initializer theo thứ tự xuất hiện trong class.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Static block chạy khi class được load. Mỗi object chạy field initializer, instance block rồi constructor.",
  },
  {
    id: 17,
    title: "Câu 17: Gọi static qua null",
    code: `class A {
    static void f() {
        System.out.println("static");
    }

    void g() {
        System.out.println("instance");
    }
}

public class Test {
    public static void main(String[] args) {
        A a = null;
        a.f();
        a.g();
    }
}`,
    options: [
      "Dòng a.f() compile được.",
      "Dòng a.f() in static.",
      "Dòng a.g() in instance.",
      "Dòng a.g() gây NullPointerException.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Static method thuộc class nên gọi qua null vẫn compile và chạy. Instance method cần object thật.",
  },
  {
    id: 18,
    title: "Câu 18: Static method truy cập field instance",
    code: `class A {
    int x = 10;

    static void f() {
        System.out.println(x);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "static method tự có this nên truy cập được x.",
      "Không thể truy cập trực tiếp field instance x từ static method.",
      "Đổi x thành static int x = 10; thì lỗi này biến mất.",
    ],
    correct: [0, 2, 3],
    explanation:
      "static method không gắn với object cụ thể nên không có this.",
  },
  {
    id: 19,
    title: "Câu 19: Field hiding và method overriding",
    code: `class A {
    int x = 1;

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
        A obj = new B();

        System.out.println(obj.x);
        obj.f();
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in 2.",
      "Dòng đầu in 2 vì object thật là B.",
      "Field không đa hình, instance method thì đa hình.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Field xét theo kiểu tham chiếu A. Method instance override xét theo object thật B.",
  },
  {
    id: 20,
    title: "Câu 20: Static method hiding",
    code: `class A {
    static void f() {
        System.out.println("A");
    }
}

class B extends A {
    static void f() {
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
      "Output là A.",
      "static method không override theo runtime object.",
      "Output là B vì object thật là B.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Static method bị hide, không override. Lời gọi được quyết định theo kiểu tham chiếu A.",
  },
  {
    id: 21,
    title: "Câu 21: Overload và override",
    code: `class A {
    void f(Object o) {
        System.out.println("A Object");
    }
}

class B extends A {
    void f(String s) {
        System.out.println("B String");
    }
}

public class Test {
    public static void main(String[] args) {
        A obj = new B();
        obj.f("hi");
    }
}`,
    options: [
      "Output là A Object.",
      "Output là B String.",
      "B.f(String) là overload, không phải override A.f(Object).",
      "Compiler chọn method dựa trên kiểu tham chiếu A trước.",
    ],
    correct: [0, 2, 3],
    explanation:
      "Vì biến obj có kiểu A, compiler chỉ thấy f(Object). Không có override f(Object) trong B.",
  },
  {
    id: 22,
    title: "Câu 22: Overload resolution",
    code: `public class Test {
    static void f(long x) {
        System.out.println("long");
    }

    static void f(float x) {
        System.out.println("float");
    }

    public static void main(String[] args) {
        f(1);
    }
}`,
    options: [
      "Output là long.",
      "Output là float.",
      "int sang long được ưu tiên hơn int sang float.",
      "Nếu gọi f(1.0) thì lỗi biên dịch vì 1.0 là double.",
    ],
    correct: [0, 2, 3],
    explanation:
      "1 là int. byte -> short -> int -> long -> float -> double nên int -> long được ưu tiên hơn int -> float trong trường hợp này.",
  },
  {
    id: 23,
    title: "Câu 23: Override và access modifier",
    code: `class A {
    public void f() {
    }
}

class B extends A {
    protected void f() {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không được giảm visibility khi override.",
      "protected rộng hơn public.",
      "Đổi protected thành public thì hợp lệ.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Override không được làm quyền truy cập hẹp hơn method ở class cha.",
  },
  {
    id: 24,
    title: "Câu 24: Covariant return type",
    code: `class Animal {
}

class Dog extends Animal {
}

class A {
    Animal f() {
        return new Animal();
    }
}

class B extends A {
    Dog f() {
        return new Dog();
    }
}`,
    options: [
      "Chương trình compile được.",
      "B.f() override hợp lệ.",
      "Return type khi override bắt buộc phải giống hệt 100%.",
      "Dog là kiểu trả về covariant vì Dog là con của Animal.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Java cho phép override trả về kiểu con của kiểu trả về ban đầu.",
  },
  {
    id: 25,
    title: "Câu 25: Override và checked exception",
    code: `import java.io.IOException;

class A {
    void f() throws IOException {
    }
}

class B extends A {
    void f() throws Exception {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Method override không được throws checked exception rộng hơn.",
      "Exception hẹp hơn IOException.",
      "Nếu B.f() không throws gì thì hợp lệ.",
    ],
    correct: [0, 1, 3],
    explanation:
      "IOException là con của Exception. Override không được ném checked exception rộng hơn method cha.",
  },
  {
    id: 26,
    title: "Câu 26: Thứ tự catch",
    code: `import java.io.IOException;

public class Test {
    public static void main(String[] args) {
        try {
            throw new IOException();
        } catch (Exception e) {
            System.out.println("Exception");
        } catch (IOException e) {
            System.out.println("IOException");
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "catch IOException bị unreachable.",
      "Chương trình in Exception rồi IOException.",
      "Đặt catch IOException trước catch Exception sẽ sửa được lỗi.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Phải catch exception con trước exception cha.",
  },
  {
    id: 27,
    title: "Câu 27: finally có return",
    code: `public class Test {
    static int f() {
        try {
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
      "return trong finally đè return trong try.",
      "Output là 1.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 3],
    explanation:
      "finally vẫn chạy trước khi method kết thúc. Nếu finally return, nó đè kết quả return trước đó.",
  },
  {
    id: 28,
    title: "Câu 28: try-catch-finally sau exception",
    code: `public class Test {
    public static void main(String[] args) {
        try {
            System.out.println("A");
            int x = 1 / 0;
            System.out.println("X");
        } catch (ArithmeticException e) {
            System.out.println("B");
        } finally {
            System.out.println("C");
        }

        System.out.println("D");
    }
}`,
    options: [
      "Output có A.",
      "Output có X.",
      "Output có B và C.",
      "Output cuối cùng có D.",
    ],
    correct: [0, 2, 3],
    explanation:
      "Exception xảy ra trước khi in X. catch xử lý lỗi, finally chạy, sau đó chương trình tiếp tục in D.",
  },
  {
    id: 29,
    title: "Câu 29: throw checked exception",
    code: `public class Test {
    static void f() {
        throw new Exception();
    }

    public static void main(String[] args) {
        f();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Exception là checked exception.",
      "throw new Exception() không cần try-catch hoặc throws.",
      "Thêm throws Exception vào f() có thể sửa lỗi ở f().",
    ],
    correct: [0, 1, 3],
    explanation:
      "Checked exception phải được catch hoặc khai báo throws.",
  },
  {
    id: 30,
    title: "Câu 30: RuntimeException",
    code: `public class Test {
    static void f() {
        throw new RuntimeException("x");
    }

    public static void main(String[] args) {
        f();
        System.out.println("DONE");
    }
}`,
    options: [
      "Chương trình compile được.",
      "RuntimeException không bắt buộc phải khai báo throws.",
      "DONE không được in ra.",
      "Chương trình lỗi biên dịch vì thiếu throws RuntimeException.",
    ],
    correct: [0, 1, 2],
    explanation:
      "RuntimeException là unchecked exception. Chạy đến f() thì ném lỗi, dòng sau không chạy.",
  },
  {
    id: 31,
    title: "Câu 31: Abstract method",
    code: `abstract class A {
    abstract void f();

    void g() {
        System.out.println("g");
    }
}

class B extends A {
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "B phải implement f() hoặc chính B phải abstract.",
      "B kế thừa g() nên không cần quan tâm f().",
      "Thêm abstract vào class B sẽ sửa được lỗi này.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Class cụ thể kế thừa abstract class phải implement toàn bộ abstract method chưa được cài đặt.",
  },
  {
    id: 32,
    title: "Câu 32: Interface field và method",
    code: `interface I {
    int X = 1;
    void f();
}

class A implements I {
    public void f() {
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(I.X);
    }
}`,
    options: [
      "Chương trình compile được.",
      "I.X mặc định là public static final.",
      "Method f() trong class A phải public.",
      "Có thể gán I.X = 2 trong main.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Field trong interface mặc định public static final. Method abstract trong interface là public, nên implementation phải public.",
  },
  {
    id: 33,
    title: "Câu 33: Implement interface sai visibility",
    code: `interface I {
    void f();
}

class A implements I {
    void f() {
        System.out.println("A");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "void f() trong A có access package-private, hẹp hơn public.",
      "Interface method mặc định là private.",
      "Không cần public khi implement interface.",
    ],
    correct: [0, 1],
    explanation:
      "Method trong interface mặc định public abstract. Khi implement không được giảm visibility.",
  },
  {
    id: 34,
    title: "Câu 34: final reference",
    code: `public class Test {
    public static void main(String[] args) {
        final int[] a = {1};

        a[0] = 2;
        a = new int[] {3};

        System.out.println(a[0]);
    }
}`,
    options: [
      "Dòng a[0] = 2 hợp lệ.",
      "Dòng a = new int[] {3} lỗi biên dịch.",
      "final làm cho nội dung array không thể thay đổi.",
      "final reference không được trỏ sang object khác.",
    ],
    correct: [0, 1, 3],
    explanation:
      "final với reference chỉ cấm gán lại reference, không làm object bên trong immutable.",
  },
  {
    id: 35,
    title: "Câu 35: Unboxing null",
    code: `public class Test {
    public static void main(String[] args) {
        Integer x = null;
        int y = x;

        System.out.println(y);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có NullPointerException khi unboxing.",
      "Dòng int y = x cần gọi x.intValue() ngầm.",
      "Output là 0 vì Integer default là 0.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Unboxing null tương đương gọi method trên null nên gây NullPointerException.",
  },
  {
    id: 36,
    title: "Câu 36: Integer cache và object mới",
    code: `public class Test {
    public static void main(String[] args) {
        Integer a = 127;
        Integer b = 127;

        Integer c = new Integer(127);
        Integer d = new Integer(127);

        System.out.println(a == b);
        System.out.println(c == d);
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in false.",
      "Dòng thứ hai in true vì cùng giá trị 127.",
      "new Integer(127) tạo object riêng.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Autoboxing 127 dùng Integer cache. new Integer tạo object mới nên so sánh == là false.",
  },
  {
    id: 37,
    title: "Câu 37: ArrayList remove",
    code: `import java.util.ArrayList;

public class Test {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>();

        list.add(1);
        list.add(2);
        list.add(3);

        list.remove(1);
        System.out.println(list);

        list.remove(Integer.valueOf(1));
        System.out.println(list);
    }
}`,
    options: [
      "Sau list.remove(1), list là [1, 3].",
      "list.remove(1) gọi remove theo index.",
      "Sau list.remove(Integer.valueOf(1)), list là [1, 2, 3].",
      "remove(Integer.valueOf(1)) xóa object có giá trị 1.",
    ],
    correct: [0, 1, 3],
    explanation:
      "remove(int index) ưu tiên khi truyền số nguyên. Muốn xóa theo value Integer thì dùng Integer.valueOf.",
  },
  {
    id: 38,
    title: "Câu 38: switch fall-through",
    code: `public class Test {
    public static void main(String[] args) {
        int x = 2;

        switch (x) {
            case 1:
                System.out.print("A");
            case 2:
                System.out.print("B");
            case 3:
                System.out.print("C");
                break;
            default:
                System.out.print("D");
        }
    }
}`,
    options: [
      "Output là BC.",
      "case 2 không có break nên rơi xuống case 3.",
      "default vẫn chạy sau case 3.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 3],
    explanation:
      "switch vào case 2, in B, rơi xuống case 3, in C, gặp break nên thoát.",
  },
  {
    id: 39,
    title: "Câu 39: Scope của biến trong for",
    code: `public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            System.out.println(i);
        }

        System.out.println(i);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Biến i chỉ tồn tại trong vòng for.",
      "Chương trình in 0 1 2 rồi 3.",
      "Biến i sau vòng for vẫn dùng được trong main.",
    ],
    correct: [0, 1],
    explanation:
      "Biến khai báo trong phần init của for chỉ có scope bên trong vòng for.",
  },
  {
    id: 40,
    title: "Câu 40: private method và overriding",
    code: `class A {
    private void f() {
        System.out.println("A");
    }

    void call() {
        f();
    }
}

class B extends A {
    private void f() {
        System.out.println("B");
    }
}

public class Test {
    public static void main(String[] args) {
        B b = new B();
        b.call();
    }
}`,
    options: [
      "Output là A.",
      "A.f() không bị override vì nó là private.",
      "Output là B.",
      "call() là method kế thừa từ A và gọi f() của A.",
    ],
    correct: [0, 1, 3],
    explanation:
      "private method không được kế thừa/override. call() trong A gọi private f() của chính A.",
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
                Đề luyện trắc nghiệm Java OOP - 40 câu
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