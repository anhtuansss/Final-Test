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
    code: `class A {
    A() {
        f();
    }

    private void f() {
        System.out.println("A");
    }
}

class B extends A {
    void f() {
        System.out.println("B");
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A.",
      "B.f() không override A.f() vì A.f() là private.",
      "Output là B.",
    ],
    correct: [0, 1, 2],
    explanation:
      "private method không được kế thừa/override. Constructor A gọi private f() của chính A.",
  },
  {
    id: 2,
    title: "Câu 2: Xét đoạn code sau",
    code: `class A {
    {
        System.out.print("I ");
    }

    A() {
        this(1);
        System.out.print("A0 ");
    }

    A(int x) {
        System.out.print("A1 ");
    }
}

public class Test {
    public static void main(String[] args) {
        new A();
    }
}`,
    options: [
      "Output là I A1 A0.",
      "Instance initializer chỉ chạy một lần khi tạo object.",
      "Constructor A() gọi constructor A(int x).",
      "Output là I A0 A1.",
    ],
    correct: [0, 1, 2],
    explanation:
      "A() gọi this(1). Instance initializer chạy một lần trước body của constructor được gọi, sau đó A1 rồi quay lại A0.",
  },
  {
    id: 3,
    title: "Câu 3: Xét đoạn code sau",
    code: `class A {
    static {
        System.out.print("A ");
    }
}

class B extends A {
    static final int X = 1;

    static {
        System.out.print("B ");
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(B.X);
    }
}`,
    options: [
      "Output chỉ là 1.",
      "Static block của A không chạy.",
      "Static block của B không chạy.",
      "Truy cập compile-time constant không bắt buộc initialize class.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "B.X là static final int được gán bằng constant expression, nên được inline và không kích hoạt class initialization.",
  },
  {
    id: 4,
    title: "Câu 4: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        final int x;

        for (int i = 0; i < 1; i++) {
            x = 1;
        }

        System.out.println(x);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Compiler không coi vòng for này chắc chắn chạy.",
      "x có thể bị xem là chưa definite assignment.",
      "Nếu thay bằng do { x = 1; } while (false); thì có thể compile.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Dù người đọc biết i < 1 là true ban đầu, definite assignment của Java không đảm bảo biến được gán qua vòng for như vậy.",
  },
  {
    id: 5,
    title: "Câu 5: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        int x;

        do {
            x = 1;
        } while (false);

        System.out.println(x);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 1.",
      "Thân do-while chạy ít nhất một lần.",
      "Chương trình lỗi biên dịch vì x chưa được khởi tạo.",
    ],
    correct: [0, 1, 2],
    explanation:
      "do-while luôn chạy body trước khi kiểm tra điều kiện, nên compiler biết x được gán.",
  },
  {
    id: 6,
    title: "Câu 6: Xét đoạn code sau",
    code: `public class Test {
    static void f(int x) {
        System.out.println("int");
    }

    static void f(Integer x) {
        System.out.println("Integer");
    }

    public static void main(String[] args) {
        Integer x = null;
        f(x);
    }
}`,
    options: [
      "Output là Integer.",
      "Không có NullPointerException.",
      "Overload chọn f(Integer) vì x có kiểu compile-time là Integer.",
      "f(int) được chọn rồi unbox null nên lỗi.",
    ],
    correct: [0, 1, 2],
    explanation:
      "f(Integer) là match chính xác hơn, nên không cần unbox null.",
  },
  {
    id: 7,
    title: "Câu 7: Xét đoạn code sau",
    code: `interface A {
    void run();
}

interface B {
    void run();
}

public class Test {
    static void f(A a) {
        System.out.println("A");
    }

    static void f(B b) {
        System.out.println("B");
    }

    public static void main(String[] args) {
        f(() -> {});
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Lambda có thể khớp với cả A và B.",
      "Lời gọi f(() -> {}) bị ambiguous.",
      "Compiler tự chọn interface được khai báo trước.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Hai overload đều nhận functional interface tương thích với lambda không tham số, nên compiler không chọn được.",
  },
  {
    id: 8,
    title: "Câu 8: Xét đoạn code sau",
    code: `public class Test {
    int x = 1;

    void m() {
        int x = 2;

        Runnable r = () -> System.out.println(this.x);

        r.run();
    }

    public static void main(String[] args) {
        new Test().m();
    }
}`,
    options: [
      "Output là 1.",
      "Trong lambda, this là object Test bao ngoài.",
      "Biến local x = 2 không được dùng trong biểu thức this.x.",
      "Output là 2.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Lambda không tạo this riêng. this.x trỏ tới field x của object Test.",
  },
  {
    id: 9,
    title: "Câu 9: Xét đoạn code sau",
    code: `public class Test {
    int x = 1;

    void m() {
        Runnable r = new Runnable() {
            int x = 2;

            public void run() {
                System.out.println(this.x);
            }
        };

        r.run();
    }

    public static void main(String[] args) {
        new Test().m();
    }
}`,
    options: [
      "Output là 2.",
      "Anonymous class có this riêng.",
      "this.x trong run() là field x của anonymous object.",
      "Output là 1.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Anonymous class tạo object riêng, nên this bên trong run() là object anonymous đó.",
  },
  {
    id: 10,
    title: "Câu 10: Xét đoạn code sau",
    code: `interface I {
    String toString();
}

class A implements I {
}

public class Test {
    public static void main(String[] args) {
        I i = new A();

        System.out.println(i.toString() != null);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là true.",
      "Object.toString() có thể thỏa mãn method toString() trong interface I.",
      "A bắt buộc phải tự viết lại toString().",
    ],
    correct: [0, 1, 2],
    explanation:
      "Mọi class đều kế thừa public toString() từ Object, nên A đã có implementation phù hợp.",
  },
  {
    id: 11,
    title: "Câu 11: Xét đoạn code sau",
    code: `interface I {
    default String toString() {
        return "I";
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Interface không được khai báo default method override-equivalent với public method của Object.",
      "toString() là public method của Object.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Interface không được cung cấp default implementation cho method tương ứng với public method của Object như toString.",
  },
  {
    id: 12,
    title: "Câu 12: Xét đoạn code sau",
    code: `abstract class A {
    public abstract void f();
}

interface I {
    default void f() {
        System.out.println("I");
    }
}

class B extends A implements I {
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "B vẫn phải implement f().",
      "Abstract method từ class A không được tự động thỏa mãn bởi default method của interface I.",
      "Nếu B tự viết public void f() thì có thể compile.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Method abstract trong superclass buộc class con cụ thể phải implement, default method của interface không tự thắng được.",
  },
  {
    id: 13,
    title: "Câu 13: Xét đoạn code sau",
    code: `public class Test {
    static <T> T pick(T a, T b) {
        return a;
    }

    public static void main(String[] args) {
        Object o = pick("A", 1);

        System.out.println(o.getClass().getSimpleName());
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là String.",
      "Runtime object được return là đối số đầu tiên.",
      "Nếu viết String s = pick(\"A\", 1); thì không hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "pick trả về chính object đầu tiên là String. Với target Object thì compile được; target String thì không vì đối số thứ hai là Integer.",
  },
  {
    id: 14,
    title: "Câu 14: Xét đoạn code sau",
    code: `public class Test {
    static <T extends Number> void f(T x) {
        System.out.println(x);
    }

    public static void main(String[] args) {
        f(1);
        f(2.0);
        f("A");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "f(1) riêng nó là hợp lệ.",
      "f(2.0) riêng nó là hợp lệ.",
      "f(\"A\") không hợp lệ vì String không extends Number.",
      "Chương trình in 1 rồi 2.0 rồi A.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Generic bound T extends Number chỉ nhận Number hoặc subclass của Number. String không hợp lệ.",
  },
  {
    id: 15,
    title: "Câu 15: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<? super Number> list = new ArrayList<Object>();

        list.add(1);
        list.add(2.5);

        Object o = list.get(0);
        Number n = list.get(0);

        System.out.println(o);
    }
}`,
    options: [
      "list.add(1) hợp lệ.",
      "list.add(2.5) hợp lệ.",
      "Object o = list.get(0) hợp lệ.",
      "Number n = list.get(0) lỗi biên dịch.",
      "Chương trình lỗi biên dịch vì có một dòng sai.",
    ],
    correct: [0, 1, 2, 3, 4],
    explanation:
      "? super Number cho phép thêm Number/subclass, nhưng khi đọc ra chỉ chắc chắn là Object.",
  },
  {
    id: 16,
    title: "Câu 16: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<StringBuilder> list = new ArrayList<>();

        list.add(new StringBuilder("B"));
        list.add(new StringBuilder("A"));

        Collections.sort(list);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "StringBuilder không implement Comparable<StringBuilder>.",
      "Có thể sort nếu truyền Comparator phù hợp.",
      "Chương trình sort được tự nhiên theo nội dung StringBuilder.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Collections.sort(list) yêu cầu phần tử có natural ordering, tức Comparable phù hợp. StringBuilder không có.",
  },
  {
    id: 17,
    title: "Câu 17: Xét đoạn code sau",
    code: `import java.util.TreeSet;

public class Test {
    public static void main(String[] args) {
        TreeSet<String> set = new TreeSet<>(
            (a, b) -> Character.compare(a.charAt(0), b.charAt(0))
        );

        set.add("ab");
        set.add("ac");
        set.add("ba");

        System.out.println(set.size());
        System.out.println(set.contains("ax"));
        System.out.println(set.contains("ca"));
    }
}`,
    options: [
      "Dòng đầu in 2.",
      "Dòng thứ hai in true.",
      "Dòng thứ ba in false.",
      "Comparator chỉ so sánh ký tự đầu tiên.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "\"ab\" và \"ac\" được comparator xem là bằng nhau vì cùng ký tự đầu 'a'. TreeSet dùng comparator để xác định trùng.",
  },
  {
    id: 18,
    title: "Câu 18: Xét đoạn code sau",
    code: `import java.util.HashMap;

public class Test {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<>();

        System.out.println(map.put(null, "A"));
        System.out.println(map.put(null, "B"));
        System.out.println(map.get(null));
        System.out.println(map.size());
    }
}`,
    options: [
      "Dòng đầu in null.",
      "Dòng thứ hai in A.",
      "Dòng thứ ba in B.",
      "Dòng thứ tư in 1.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "HashMap cho phép một null key. put trả về value cũ của key đó nếu có.",
  },
  {
    id: 19,
    title: "Câu 19: Xét đoạn code sau",
    code: `import java.util.ArrayDeque;

public class Test {
    public static void main(String[] args) {
        ArrayDeque<String> q = new ArrayDeque<>();

        q.add("A");
        q.add(null);

        System.out.println("DONE");
    }
}`,
    options: [
      "Chương trình compile được.",
      "q.add(null) gây NullPointerException.",
      "DONE không được in ra.",
      "ArrayDeque cho phép thêm null như HashMap.",
    ],
    correct: [0, 1, 2],
    explanation:
      "ArrayDeque không cho phép phần tử null.",
  },
  {
    id: 20,
    title: "Câu 20: Xét đoạn code sau",
    code: `enum Op {
    PLUS {
        int apply(int a, int b) {
            return a + b;
        }
    },
    TIMES {
        int apply(int a, int b) {
            return a * b;
        }
    };

    abstract int apply(int a, int b);
}

public class Test {
    public static void main(String[] args) {
        System.out.println(Op.PLUS.apply(2, 3));
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 5.",
      "Enum constant có thể có class body riêng.",
      "Mỗi constant ở đây implement abstract method apply.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Enum có thể khai báo abstract method và từng constant có class body để implement method đó.",
  },
  {
    id: 21,
    title: "Câu 21: Xét đoạn code sau",
    code: `enum E {
    A, B
}

public class Test {
    public static void main(String[] args) {
        E e = E.A;

        switch (e) {
            case E.A:
                System.out.println("A");
                break;
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Trong switch enum, case label phải viết A thay vì E.A.",
      "Đổi case E.A thành case A sẽ sửa được lỗi này.",
      "Output là A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Case label của enum trong switch dùng tên constant không kèm tên enum.",
  },
  {
    id: 22,
    title: "Câu 22: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        int n = 2;

        final int a = 1;

        final int b;
        b = 2;

        switch (n) {
            case a:
                System.out.println("A");
                break;
            case b:
                System.out.println("B");
                break;
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "case a hợp lệ.",
      "case b không hợp lệ vì b không phải constant variable.",
      "final biến được gán sau khai báo không phải compile-time constant trong trường hợp này.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Case label cần constant expression. final int a = 1 là constant variable, còn b được gán sau nên không phải.",
  },
  {
    id: 23,
    title: "Câu 23: Xét đoạn code sau",
    code: `class R implements AutoCloseable {
    String name;

    R(String name) {
        this.name = name;
    }

    public void close() {
        System.out.print("close" + name + " ");
        throw new RuntimeException(name);
    }
}

public class Test {
    public static void main(String[] args) {
        try (R a = new R("A"); R b = new R("B")) {
            System.out.print("try ");
        } catch (RuntimeException e) {
            System.out.print(e.getMessage() + " ");
            System.out.print(e.getSuppressed().length);
        }
    }
}`,
    options: [
      "Output có try closeB closeA.",
      "Exception chính có message là B.",
      "Số suppressed exception là 1.",
      "Exception từ closeA bị suppressed.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Resource đóng ngược thứ tự. closeB ném exception chính, closeA ném sau nên bị suppressed.",
  },
  {
    id: 24,
    title: "Câu 24: Xét đoạn code sau",
    code: `class R implements AutoCloseable {
    String name;

    R(String name, boolean fail) {
        this.name = name;
        System.out.print("open" + name + " ");

        if (fail) {
            throw new RuntimeException("open" + name);
        }
    }

    public void close() {
        System.out.print("close" + name + " ");
        throw new RuntimeException("close" + name);
    }
}

public class Test {
    public static void main(String[] args) {
        try (R a = new R("A", false); R b = new R("B", true)) {
            System.out.print("try ");
        } catch (RuntimeException e) {
            System.out.print(e.getMessage() + " ");
            System.out.print(e.getSuppressed().length);
        }
    }
}`,
    options: [
      "Output có openA openB closeA.",
      "Exception chính có message là openB.",
      "Số suppressed exception là 1.",
      "Block try không chạy.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Resource b lỗi khi khởi tạo, nên try body không chạy. Resource a đã mở nên bị đóng; exception từ closeA bị suppressed.",
  },
  {
    id: 25,
    title: "Câu 25: Xét đoạn code sau",
    code: `import java.io.Closeable;

class R implements Closeable {
    public void close() throws Exception {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Closeable.close() khai báo throws IOException.",
      "R.close() không được throws Exception vì Exception rộng hơn IOException.",
      "Nếu đổi throws Exception thành throws java.io.IOException thì có thể hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Khi implement/override, checked exception không được rộng hơn method gốc.",
  },
  {
    id: 26,
    title: "Câu 26: Xét đoạn code sau",
    code: `import java.io.IOException;

class A {
    void f() throws Exception {
    }
}

class B extends A {
    void f() throws IOException {
        System.out.println("OK");
    }
}

public class Test {
    public static void main(String[] args) throws Exception {
        new B().f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là OK.",
      "IOException là checked exception hẹp hơn Exception.",
      "Override bắt buộc phải throws đúng Exception, không được throws IOException.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Override được phép khai báo checked exception hẹp hơn method cha.",
  },
  {
    id: 27,
    title: "Câu 27: Xét đoạn code sau",
    code: `class A {
    protected A f() {
        return this;
    }
}

class B extends A {
    public B f() {
        return this;
    }
}

public class Test {
    public static void main(String[] args) {
        A a = new B();

        System.out.println(a.f() instanceof B);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là true.",
      "protected được override bằng public là hợp lệ.",
      "B là covariant return type hợp lệ vì B extends A.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Override được tăng visibility và được dùng return type là subtype.",
  },
  {
    id: 28,
    title: "Câu 28: Xét đoạn code sau",
    code: `public class Test {
    static void f(Object o) {
        System.out.print("O ");
    }

    static void f(Object... o) {
        if (o == null) {
            System.out.print("VN ");
        } else {
            System.out.print("V" + o.length + " ");
        }
    }

    public static void main(String[] args) {
        f();
        f("x");
        f((Object[]) null);
    }
}`,
    options: [
      "Output là V0 O VN.",
      "f() gọi method varargs với mảng rỗng.",
      "f(\"x\") chọn f(Object) vì fixed-arity được xét trước varargs.",
      "f((Object[]) null) chọn method varargs và tham số mảng là null.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Không đối số thì chỉ varargs khớp. Một Object cụ thể chọn fixed-arity. Cast Object[] null khớp trực tiếp với varargs array.",
  },
  {
    id: 29,
    title: "Câu 29: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Integer x = 1;
        x += 2;

        System.out.println(x);

        Integer y = null;
        y += 1;

        System.out.println("DONE");
    }
}`,
    options: [
      "Dòng đầu in 3.",
      "x += 2 có unbox rồi box lại.",
      "y += 1 gây NullPointerException.",
      "DONE không được in ra.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Compound assignment với wrapper cần unboxing. Unbox null gây NullPointerException.",
  },
  {
    id: 30,
    title: "Câu 30: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Boolean b = null;

        System.out.println(b == Boolean.FALSE);
        System.out.println(b == false);
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai gây NullPointerException.",
      "Dòng đầu là so sánh reference giữa hai Boolean.",
      "Dòng thứ hai cần unbox b thành boolean.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "b == Boolean.FALSE so reference nên an toàn. b == false cần unbox null nên lỗi.",
  },
  {
    id: 31,
    title: "Câu 31: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        String s = null;

        if (s != null && s.length() > 0) {
            System.out.print("A ");
        } else {
            System.out.print("B ");
        }

        if (s == null || s.length() == 0) {
            System.out.print("C ");
        }
    }
}`,
    options: [
      "Output là B C.",
      "Không có NullPointerException.",
      "&& là short-circuit.",
      "|| là short-circuit.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Ở điều kiện đầu, vế trái false nên không gọi length(). Ở điều kiện sau, vế trái true nên không gọi length().",
  },
  {
    id: 32,
    title: "Câu 32: Xét đoạn code sau",
    code: `interface I {
    void f() throws Exception;
}

class A implements I {
    public void f() {
        System.out.println("A");
    }
}

public class Test {
    public static void main(String[] args) {
        I i = new A();

        i.f();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "A.f() được phép không throws Exception.",
      "Gọi i.f() qua biến kiểu I vẫn phải xử lý Exception.",
      "Thêm throws Exception vào main sẽ sửa được lỗi.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Method implement được phép throws ít hơn. Nhưng compile-time type I khai báo f() throws Exception, nên caller phải xử lý.",
  },
  {
    id: 33,
    title: "Câu 33: Xét đoạn code sau",
    code: `class A {
    void f() {
        System.out.println("A");
    }
}

class B extends A {
    static void g() {
        super.f();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không dùng được super trong static context.",
      "static method không có this.",
      "Nếu g() là instance method thì super.f() có thể hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "super cần object hiện tại. static method không gắn với object cụ thể.",
  },
  {
    id: 34,
    title: "Câu 34: Xét đoạn code sau",
    code: `abstract class A {
    abstract synchronized void f();
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "abstract method không thể đồng thời là synchronized.",
      "synchronized cần method body/runtime lock, còn abstract không có body.",
      "Bỏ synchronized thì abstract void f(); có thể hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "abstract method không có thân để đồng bộ hóa, nên không đi cùng synchronized.",
  },
  {
    id: 35,
    title: "Câu 35: Xét đoạn code sau",
    code: `class A {
    int x;

    A(int x) {
        x = x;
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(new A(5).x);
    }
}`,
    options: [
      "Output là 0.",
      "x = x đang gán parameter x cho chính nó.",
      "Muốn gán field thì cần this.x = x.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Parameter x shadow field x. Dòng x = x không động tới field, nên field giữ default value 0.",
  },
  {
    id: 36,
    title: "Câu 36: Xét đoạn code sau",
    code: `class A {
    int id;

    A(int id) {
        this.id = id;
    }

    public boolean equals(Object o) {
        return o != null
            && o.getClass() == getClass()
            && ((A) o).id == id;
    }
}

class B extends A {
    B(int id) {
        super(id);
    }
}

public class Test {
    public static void main(String[] args) {
        A a = new A(1);
        A b = new B(1);

        System.out.println(a.equals(b));
        System.out.println(b.equals(a));
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in false.",
      "equals dùng getClass() nên A và B không được xem là cùng loại.",
      "B kế thừa equals từ A.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "getClass() yêu cầu hai object có đúng cùng runtime class. A và B khác class nên cả hai lần đều false.",
  },
  {
    id: 37,
    title: "Câu 37: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        int x = 2;

        switch (x) {
            default:
                System.out.print("D");
            case 1:
                System.out.print("A");
            case 2:
                System.out.print("B");
        }
    }
}`,
    options: [
      "Output là B.",
      "default không chạy nếu đã có case khớp.",
      "Vị trí của default không làm nó tự chạy trước case 2.",
      "Output là DAB.",
    ],
    correct: [0, 1, 2],
    explanation:
      "switch tìm case 2 và bắt đầu chạy từ đó. default chỉ dùng khi không có case nào khớp.",
  },
  {
    id: 38,
    title: "Câu 38: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            try {
                continue;
            } finally {
                System.out.print(i);
            }
        }

        System.out.print("D");
    }
}`,
    options: [
      "Output là 012D.",
      "finally chạy trước khi continue thật sự chuyển vòng lặp.",
      "Vòng lặp chạy 3 lần.",
      "Output chỉ là D.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Mỗi lần continue được chuẩn bị, finally vẫn chạy trước. Sau 3 lần in 0,1,2 rồi in D.",
  },
  {
    id: 39,
    title: "Câu 39: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        for (int i = 0; i < 3; i++) {
            try {
                break;
            } finally {
                System.out.print("F");
            }
        }

        System.out.print("D");
    }
}`,
    options: [
      "Output là FD.",
      "finally chạy trước khi break thoát vòng lặp.",
      "Vòng lặp chỉ vào thân một lần.",
      "Output là D.",
    ],
    correct: [0, 1, 2],
    explanation:
      "break được thực hiện sau khi finally chạy, nên in F rồi thoát vòng lặp và in D.",
  },
  {
    id: 40,
    title: "Câu 40: Xét đoạn code sau",
    code: `class A {
    static {
        System.out.print("A ");
    }

    A() {
        System.out.print("a ");
    }
}

class B extends A {
    static {
        System.out.print("B ");
    }

    B() {
        System.out.print("b ");
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Output là A B a b.",
      "Superclass A được initialize trước subclass B.",
      "Constructor A chạy trước constructor B.",
      "Output là B A b a.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Khi tạo B, Java initialize A trước, rồi B, sau đó chạy constructor A rồi constructor B.",
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
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-orange-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề luyện Java OOP số 10 - Final 40 câu
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
                <div className="mt-2 text-orange-300">
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
                      <p className="text-sm font-semibold text-orange-400">
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
                              ? "border-orange-500/70 bg-orange-500/10"
                              : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-orange-400"
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
                      <p className="text-sm font-bold text-orange-300">
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
                        ? "border-orange-500/60 bg-orange-500/15 text-orange-200"
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
                  className="w-full rounded-2xl bg-orange-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-orange-300"
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
                    <span className="font-bold text-orange-300">
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