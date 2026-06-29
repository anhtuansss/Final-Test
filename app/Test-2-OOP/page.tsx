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
    title: "Câu 1: final boolean và definite assignment",
    code: `public class Test {
    public static void main(String[] args) {
        final boolean a = true;
        int x;
        if (a) {
            x = 1;
        }
        System.out.println(x);

        final boolean b;
        b = true;
        int y;
        if (b) {
            y = 2;
        }
        System.out.println(y);
    }
}`,
    options: [
      "Dòng System.out.println(x) hợp lệ.",
      "Dòng System.out.println(y) gây lỗi biên dịch.",
      "final boolean b; b = true; được xem là constant expression giống final boolean b = true.",
      "Nếu bỏ phần biến y, chương trình in ra 1.",
    ],
    correct: [0, 1, 3],
    explanation:
      "final boolean a = true là constant variable nên compiler biết if luôn chạy. Biến b được gán sau khai báo nên không được coi là constant expression cho definite assignment.",
  },
  {
    id: 2,
    title: "Câu 2: Constructor gọi method bị override",
    code: `class A {
    A() {
        print();
    }

    void print() {
        System.out.println("A");
    }
}

class B extends A {
    int x = 5;

    void print() {
        System.out.println(x);
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Chương trình in ra 0.",
      "Chương trình in ra 5.",
      "Constructor của A gọi method print() đã bị override ở B.",
      "Field x của B được gán 5 trước khi constructor A chạy.",
    ],
    correct: [0, 2],
    explanation:
      "Khi constructor A chạy, object thật là B nên gọi B.print(). Nhưng lúc đó field x của B chưa được khởi tạo, mới có giá trị mặc định 0.",
  },
  {
    id: 3,
    title: "Câu 3: Overload với null",
    code: `public class Test {
    static void f(Object o) {
        System.out.println("Object");
    }

    static void f(String s) {
        System.out.println("String");
    }

    static void f(StringBuilder s) {
        System.out.println("StringBuilder");
    }

    public static void main(String[] args) {
        f(null);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch vì lời gọi f(null) bị ambiguous.",
      "Chương trình in Object.",
      "Chương trình in String vì String cụ thể hơn Object.",
      "Nếu bỏ method f(StringBuilder), lời gọi f(null) sẽ chọn f(String).",
    ],
    correct: [0, 3],
    explanation:
      "String và StringBuilder đều cụ thể hơn Object nhưng không bên nào là con của bên kia, nên f(null) bị ambiguous.",
  },
  {
    id: 4,
    title: "Câu 4: Boxing và varargs",
    code: `public class Test {
    static void f(int... x) {
        System.out.println("varargs");
    }

    static void f(Integer x) {
        System.out.println("Integer");
    }

    public static void main(String[] args) {
        f(1);
        f();
    }
}`,
    options: [
      "f(1) gọi method f(Integer x).",
      "f() gọi method f(int... x).",
      "f(1) gọi method f(int... x) vì int gần hơn Integer.",
      "Chương trình in Integer rồi varargs.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Boxing fixed-arity được ưu tiên hơn varargs. f() chỉ khớp với varargs.",
  },
  {
    id: 5,
    title: "Câu 5: Overload ambiguity với widening",
    code: `public class Test {
    static void f(int x, long y) {
        System.out.println("int long");
    }

    static void f(long x, int y) {
        System.out.println("long int");
    }

    public static void main(String[] args) {
        f(1, 1);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Lời gọi f(1, 1) bị ambiguous.",
      "Chương trình in int long.",
      "Nếu gọi f(1L, 1) thì sẽ chọn f(long x, int y).",
    ],
    correct: [0, 1, 3],
    explanation:
      "f(1,1) có thể match cả int-long và long-int bằng widening một phía, không method nào cụ thể hơn method kia.",
  },
  {
    id: 6,
    title: "Câu 6: Generic type erasure",
    code: `import java.util.List;

class Test {
    void f(List<String> list) {
    }

    void f(List<Integer> list) {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Hai method bị trùng sau type erasure.",
      "List<String> và List<Integer> là hai kiểu runtime khác nhau nên overload được.",
      "Sau erasure, cả hai gần như thành f(List list).",
    ],
    correct: [0, 1, 3],
    explanation:
      "Generic bị erase ở runtime. Hai method có cùng erasure nên không thể overload như vậy.",
  },
  {
    id: 7,
    title: "Câu 7: Raw type và ClassCastException",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<String> list = new ArrayList<>();

        list.add("A");

        List raw = list;
        raw.add(100);

        System.out.println(list.get(0));
        System.out.println(list.get(1));
    }
}`,
    options: [
      "Chương trình compile được.",
      "Chương trình in A trước.",
      "Có ClassCastException khi lấy list.get(1).",
      "Dùng raw type có thể gây unchecked warning nhưng vẫn compile.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Raw type phá an toàn generic. list.get(1) được compiler xem là String, nhưng runtime object thật là Integer.",
  },
  {
    id: 8,
    title: "Câu 8: Generic invariance",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<Integer>();
        List<Number> nums = ints;
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "List<Integer> không phải subtype của List<Number>.",
      "Vì Integer extends Number nên List<Integer> tự động extends List<Number>.",
      "Có thể dùng List<? extends Number> nums = ints; để nhận List<Integer>.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Generic trong Java invariant. List<Integer> không gán được cho List<Number>.",
  },
  {
    id: 9,
    title: "Câu 9: Wildcard extends",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<? extends Number> nums = new ArrayList<Integer>();

        Number n = nums.get(0);

        nums.add(1);
        nums.add(null);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch vì nums.add(1).",
      "Dòng Number n = nums.get(0) hợp lệ về biên dịch.",
      "Dòng nums.add(null) hợp lệ về biên dịch.",
      "List<? extends Number> cho phép thêm Integer vì Integer là Number.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Với ? extends Number, có thể đọc ra Number, nhưng không thể thêm Integer vì compiler không biết list thật sự là List<Integer>, List<Double> hay kiểu con nào khác.",
  },
  {
    id: 10,
    title: "Câu 10: Wildcard super",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<? super Integer> list = new ArrayList<Number>();

        list.add(1);

        Object a = list.get(0);
        Integer b = list.get(0);
    }
}`,
    options: [
      "Dòng list.add(1) hợp lệ.",
      "Dòng Object a = list.get(0) hợp lệ.",
      "Dòng Integer b = list.get(0) gây lỗi biên dịch.",
      "List<? super Integer> đọc ra chắc chắn là Integer.",
    ],
    correct: [0, 1, 2],
    explanation:
      "? super Integer cho phép thêm Integer, nhưng khi đọc ra chỉ đảm bảo là Object.",
  },
  {
    id: 11,
    title: "Câu 11: static final constant và class initialization",
    code: `class A {
    static final int X = 1;

    static {
        System.out.println("A");
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(A.X);
    }
}`,
    options: [
      "Chương trình chỉ in ra 1.",
      "Chương trình in A rồi 1.",
      "Truy cập static final int X là constant variable không nhất thiết làm class A chạy static block.",
      "A.X không compile vì X là final.",
    ],
    correct: [0, 2],
    explanation:
      "static final primitive/String được gán bằng constant expression có thể được inline, nên không kích hoạt class initialization.",
  },
  {
    id: 12,
    title: "Câu 12: static final nhưng không phải constant expression",
    code: `class A {
    static final int X = Integer.valueOf(1);

    static {
        System.out.println("A");
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(A.X);
    }
}`,
    options: [
      "Chương trình in A rồi 1.",
      "Integer.valueOf(1) không phải constant expression.",
      "Chương trình chỉ in 1, không in A.",
      "Truy cập A.X làm class A được initialize.",
    ],
    correct: [0, 1, 3],
    explanation:
      "X là static final nhưng giá trị đến từ method call, không phải constant expression, nên truy cập A.X kích hoạt static block.",
  },
  {
    id: 13,
    title: "Câu 13: Interface field initialization",
    code: `interface I {
    int X = init();

    static int init() {
        System.out.println("I");
        return 1;
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(I.X);
    }
}`,
    options: [
      "Chương trình in I rồi 1.",
      "Truy cập I.X làm interface I được initialize.",
      "Interface không được có static method.",
      "X không phải constant expression vì được gán bằng init().",
    ],
    correct: [0, 1, 3],
    explanation:
      "Field trong interface mặc định public static final, nhưng init() là method call nên X không phải constant expression.",
  },
  {
    id: 14,
    title: "Câu 14: Static initialization tự tham chiếu",
    code: `public class Test {
    static int a = b + 1;
    static int b = a + 1;

    public static void main(String[] args) {
        System.out.println(a + " " + b);
    }
}`,
    options: [
      "Chương trình in 1 2.",
      "Khi khởi tạo a, b đang có giá trị mặc định 0.",
      "Khi khởi tạo b, a đã có giá trị 1.",
      "Chương trình lỗi biên dịch vì b được dùng trước khi khai báo.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Static field có default value trước, sau đó initializer chạy theo thứ tự từ trên xuống.",
  },
  {
    id: 15,
    title: "Câu 15: Dynamic dispatch khi khởi tạo field của cha",
    code: `class A {
    int x = f();

    A() {
        System.out.println("A:" + x);
    }

    int f() {
        return 1;
    }
}

class B extends A {
    int y = 2;

    int f() {
        return y + 10;
    }

    B() {
        System.out.println("B:" + y + " " + x);
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Chương trình in A:10 rồi B:2 10.",
      "Khi A.x được khởi tạo, method B.f() được gọi.",
      "Tại thời điểm B.f() được gọi lần đầu, y vẫn đang là 0.",
      "Chương trình in A:12 rồi B:2 12.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Method instance vẫn dispatch theo object thật. Nhưng lúc A đang khởi tạo, field y của B chưa chạy initializer, nên y vẫn là 0.",
  },
  {
    id: 16,
    title: "Câu 16: Static method và instance method cùng signature",
    code: `class A {
    static void f() {
    }
}

class B extends A {
    void f() {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Instance method không thể override static method.",
      "Đây là overload hợp lệ.",
      "Nếu B.f() cũng là static thì có thể compile.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Không thể dùng instance method để override/hide static method có cùng signature.",
  },
  {
    id: 17,
    title: "Câu 17: private method và @Override",
    code: `class A {
    private void f() {
    }
}

class B extends A {
    @Override
    void f() {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "B.f() không override A.f() vì A.f() là private.",
      "@Override làm compiler kiểm tra thật sự có override hay không.",
      "Nếu bỏ @Override, method f() trong B có thể compile như một method mới.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "private method không được kế thừa nên không thể override. @Override khiến lỗi bị phát hiện rõ.",
  },
  {
    id: 18,
    title: "Câu 18: final method và overload",
    code: `class A {
    final void f(int x) {
        System.out.println("int");
    }
}

class B extends A {
    void f(long x) {
        System.out.println("long");
    }
}

public class Test {
    public static void main(String[] args) {
        B b = new B();

        b.f(1);
        b.f(1L);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Chương trình in int rồi long.",
      "B.f(long) là overload, không phải override A.f(int).",
      "final cấm mọi method cùng tên f trong class con, kể cả khác tham số.",
    ],
    correct: [0, 1, 2],
    explanation:
      "final chỉ cấm override cùng signature. B.f(long) khác tham số nên là overload hợp lệ.",
  },
  {
    id: 19,
    title: "Câu 19: abstract, final, private abstract",
    code: `abstract final class A {
    private abstract void f();
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Một class không thể vừa abstract vừa final.",
      "abstract method không thể là private.",
      "Chỉ cần bỏ final là chương trình compile được.",
    ],
    correct: [0, 1, 2],
    explanation:
      "abstract cần class con kế thừa để hoàn thiện, còn final cấm kế thừa. private abstract cũng vô nghĩa vì class con không thể override private method.",
  },
  {
    id: 20,
    title: "Câu 20: Default method conflict",
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
}

public class Test {
    public static void main(String[] args) {
        new C().f();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "C phải override f() để giải quyết xung đột default method.",
      "Chương trình in I vì I được implements trước.",
      "Nếu C override f(), trong đó có thể gọi I.super.f().",
    ],
    correct: [0, 1, 3],
    explanation:
      "Nếu hai interface có default method cùng signature, class implement phải tự override để chọn/hòa giải.",
  },
  {
    id: 21,
    title: "Câu 21: Static method trong interface",
    code: `interface I {
    static void f() {
        System.out.println("I");
    }
}

class A implements I {
}

public class Test {
    public static void main(String[] args) {
        A.f();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Static method trong interface không được kế thừa vào class implement.",
      "Phải gọi là I.f() thay vì A.f().",
      "Chương trình in I.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Interface static method thuộc về chính interface, không gọi qua class implement.",
  },
  {
    id: 22,
    title: "Câu 22: Class method thắng default method",
    code: `interface I {
    default void f() {
        System.out.println("I");
    }
}

class A {
    public void f() {
        System.out.println("A");
    }
}

class B extends A implements I {
}

public class Test {
    public static void main(String[] args) {
        new B().f();
    }
}`,
    options: [
      "Chương trình in A.",
      "Method từ class cha được ưu tiên hơn default method từ interface.",
      "Chương trình in I vì B implements I.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Quy tắc Java: class wins. Method trong class/superclass thắng default method của interface.",
  },
  {
    id: 23,
    title: "Câu 23: Multi-catch parameter",
    code: `import java.io.IOException;
import java.sql.SQLException;

public class Test {
    public static void main(String[] args) {
        try {
            if (args.length == 0) {
                throw new IOException();
            } else {
                throw new SQLException();
            }
        } catch (IOException | SQLException e) {
            e = new IOException();
            System.out.println(e);
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Biến e trong multi-catch không được gán lại.",
      "Multi-catch parameter được xem như effectively final.",
      "Nếu bỏ dòng e = new IOException(); thì phần catch này có thể compile.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Tham số trong multi-catch không được gán lại. Nó được xử lý như biến final/effectively final.",
  },
  {
    id: 24,
    title: "Câu 24: Thứ tự đóng resource",
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
    id: 25,
    title: "Câu 25: Suppressed exception trong try-with-resources",
    code: `class R implements AutoCloseable {
    public void close() {
        System.out.println("close");
        throw new RuntimeException("close");
    }
}

public class Test {
    public static void main(String[] args) {
        try (R r = new R()) {
            System.out.println("try");
            throw new RuntimeException("try");
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getSuppressed().length);
        }
    }
}`,
    options: [
      "Output có dòng try.",
      "Output có dòng close.",
      "Exception chính có message là try.",
      "e.getSuppressed().length in ra 1.",
      "Exception close thay thế hoàn toàn exception try.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Trong try-with-resources, exception từ close() bị suppressed nếu trong try đã có exception chính.",
  },
  {
    id: 26,
    title: "Câu 26: finally ném exception mới",
    code: `public class Test {
    public static void main(String[] args) {
        try {
            try {
                throw new RuntimeException("try");
            } finally {
                throw new RuntimeException("finally");
            }
        } catch (RuntimeException e) {
            System.out.println(e.getMessage());
            System.out.println(e.getSuppressed().length);
        }
    }
}`,
    options: [
      "Chương trình in finally rồi 0.",
      "Exception trong finally thay thế exception trong try.",
      "Exception try tự động nằm trong suppressed list.",
      "Chương trình in try rồi 1.",
    ],
    correct: [0, 1],
    explanation:
      "finally thường không tạo suppressed exception như try-with-resources. Exception trong finally thay thế exception đang bay ra.",
  },
  {
    id: 27,
    title: "Câu 27: return object rồi finally sửa object",
    code: `public class Test {
    static StringBuilder f() {
        StringBuilder sb = new StringBuilder("A");

        try {
            return sb;
        } finally {
            sb.append("B");
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
    options: [
      "Chương trình in AB.",
      "finally chạy sau khi giá trị return đã được chọn nhưng trước khi method thật sự trả về.",
      "StringBuilder là mutable nên append ảnh hưởng object được return.",
      "Chương trình in A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Reference sb được chọn để return, sau đó finally sửa chính object đó trước khi caller nhận object.",
  },
  {
    id: 28,
    title: "Câu 28: return primitive rồi finally đổi biến local",
    code: `public class Test {
    static int f() {
        int x = 1;

        try {
            return x;
        } finally {
            x = 2;
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
    options: [
      "Chương trình in 1.",
      "finally vẫn chạy.",
      "Gán x = 2 trong finally không đổi giá trị int đã được chuẩn bị để return.",
      "Chương trình in 2.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Với primitive, giá trị return đã được copy ra trước. finally đổi biến local x sau đó không đổi giá trị return.",
  },
  {
    id: 29,
    title: "Câu 29: switch với String null",
    code: `public class Test {
    public static void main(String[] args) {
        String s = null;

        switch (s) {
            case "A":
                System.out.println("A");
                break;
            default:
                System.out.println("D");
        }
    }
}`,
    options: [
      "Chương trình compile được.",
      "Chương trình ném NullPointerException.",
      "default được chạy và in D.",
      "switch trên String null lỗi ở runtime, không phải compile-time.",
    ],
    correct: [0, 1, 3],
    explanation:
      "switch với String hợp lệ, nhưng giá trị switch là null sẽ gây NullPointerException trước khi so case/default.",
  },
  {
    id: 30,
    title: "Câu 30: Duplicate case label",
    code: `public class Test {
    public static void main(String[] args) {
        final int a = 1;
        final int b = 1;

        int x = 1;

        switch (x) {
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
      "case a và case b bị duplicate vì đều là constant 1.",
      "Chương trình in A.",
      "Nếu b không phải final constant, case b cũng sẽ không hợp lệ vì case cần constant expression.",
    ],
    correct: [0, 1, 3],
    explanation:
      "case label phải là constant expression và không được trùng giá trị.",
  },
  {
    id: 31,
    title: "Câu 31: Narrowing constant assignment",
    code: `public class Test {
    public static void main(String[] args) {
        byte a = 127;
        byte b = 128;

        char c = -1;
        char d = 65535;
    }
}`,
    options: [
      "byte a = 127; hợp lệ.",
      "byte b = 128; lỗi biên dịch.",
      "char c = -1; lỗi biên dịch.",
      "char d = 65535; hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Constant int có thể gán hẹp cho byte/char nếu nằm trong range. byte range là -128..127. char range là 0..65535.",
  },
  {
    id: 32,
    title: "Câu 32: Ternary với wrapper numeric",
    code: `public class Test {
    public static void main(String[] args) {
        Object o = true ? Integer.valueOf(1) : Double.valueOf(2.0);

        System.out.println(o);
        System.out.println(o.getClass().getName());
    }
}`,
    options: [
      "Dòng đầu in 1.0.",
      "Dòng thứ hai in java.lang.Double.",
      "o là Integer vì nhánh được chọn là Integer.valueOf(1).",
      "Ternary có thể unbox và numeric promote hai nhánh wrapper số.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Integer và Double trong toán tử ?: bị xử lý theo numeric promotion, kết quả là double rồi box thành Double.",
  },
  {
    id: 33,
    title: "Câu 33: Ternary với null và unboxing",
    code: `public class Test {
    public static void main(String[] args) {
        Integer a = true ? null : 1;
        System.out.println(a);

        int b = true ? null : 1;
        System.out.println(b);
    }
}`,
    options: [
      "Dòng System.out.println(a) in null.",
      "Dòng int b = true ? null : 1; gây NullPointerException khi chạy.",
      "Chương trình lỗi biên dịch vì null không gán được cho Integer.",
      "Dòng System.out.println(b) không được chạy.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Integer a nhận null được. Nhưng int b cần unbox kết quả null sang int nên gây NullPointerException.",
  },
  {
    id: 34,
    title: "Câu 34: NaN comparison",
    code: `public class Test {
    public static void main(String[] args) {
        double x = 0.0 / 0.0;

        System.out.println(x == x);
        System.out.println(x != x);
        System.out.println(Double.isNaN(x));
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in true.",
      "Dòng thứ ba in true.",
      "NaN bằng chính nó khi dùng toán tử ==.",
    ],
    correct: [0, 1, 2],
    explanation:
      "NaN không bằng bất kỳ giá trị nào, kể cả chính nó. Muốn kiểm tra NaN dùng Double.isNaN().",
  },
  {
    id: 35,
    title: "Câu 35: Integer overflow",
    code: `public class Test {
    public static void main(String[] args) {
        int x = Integer.MAX_VALUE;

        System.out.println(x + 1);
        System.out.println(x + 1 == Integer.MIN_VALUE);
    }
}`,
    options: [
      "Dòng đầu in -2147483648.",
      "Dòng thứ hai in true.",
      "Tràn int trong Java tự ném ArithmeticException.",
      "int overflow bị wrap-around theo kiểu 32-bit two's complement.",
    ],
    correct: [0, 1, 3],
    explanation:
      "int overflow không ném exception. Giá trị bị wrap-around.",
  },
  {
    id: 36,
    title: "Câu 36: Array covariance",
    code: `public class Test {
    public static void main(String[] args) {
        String[] s = new String[1];
        Object[] o = s;

        o[0] = new Object();

        System.out.println(s[0]);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Dòng o[0] = new Object(); gây ArrayStoreException khi chạy.",
      "Array trong Java covariant nên String[] có thể gán cho Object[].",
      "Chương trình in ra object vừa gán.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Array covariant nên gán được ở compile-time, nhưng runtime vẫn kiểm tra kiểu thật của mảng là String[].",
  },
  {
    id: 37,
    title: "Câu 37: clone array object là shallow copy",
    code: `class Box {
    int v;

    Box(int v) {
        this.v = v;
    }
}

public class Test {
    public static void main(String[] args) {
        Box[] a = { new Box(1) };
        Box[] b = a.clone();

        b[0].v = 2;
        b[0] = new Box(3);

        System.out.println(a[0].v + " " + b[0].v);
    }
}`,
    options: [
      "Chương trình in 2 3.",
      "a.clone() tạo mảng mới nhưng các phần tử object bên trong vẫn là reference cũ.",
      "Sau b[0].v = 2, object mà a[0] trỏ tới cũng bị đổi.",
      "Sau b[0] = new Box(3), a[0] cũng tự trỏ sang Box mới.",
    ],
    correct: [0, 1, 2],
    explanation:
      "clone của mảng object là shallow copy: mảng mới, nhưng phần tử reference ban đầu vẫn trỏ chung object.",
  },
  {
    id: 38,
    title: "Câu 38: equals overload nhầm override",
    code: `class P {
    int x;

    P(int x) {
        this.x = x;
    }

    public boolean equals(P other) {
        return this.x == other.x;
    }
}

public class Test {
    public static void main(String[] args) {
        P p1 = new P(1);
        Object p2 = new P(1);

        System.out.println(p1.equals(p2));
        System.out.println(p1.equals(new P(1)));
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in true.",
      "equals(P other) không override equals(Object obj).",
      "Vì p2 có kiểu compile-time là Object nên lời gọi đầu chọn equals(Object) kế thừa từ Object.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Method equals đúng để override phải là equals(Object). Ở đây equals(P) chỉ là overload.",
  },
  {
    id: 39,
    title: "Câu 39: enum null",
    code: `enum E {
    A, B
}

public class Test {
    public static void main(String[] args) {
        E e = null;

        System.out.println(e == E.A);
        System.out.println(e.equals(E.A));
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai gây NullPointerException.",
      "So sánh == với enum null là compile được.",
      "e.equals(E.A) an toàn giống e == E.A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "== chỉ so sánh reference nên null == E.A là false. Gọi method equals trên null thì NullPointerException.",
  },
  {
    id: 40,
    title: "Câu 40: Local class và effectively final",
    code: `public class Test {
    public static void main(String[] args) {
        int x = 1;

        class L {
            void f() {
                System.out.println(x);
            }
        }

        x = 2;

        new L().f();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Biến local x được dùng trong local class phải final hoặc effectively final.",
      "Dòng x = 2 làm x không còn effectively final.",
      "Nếu bỏ dòng x = 2, chương trình có thể in 1.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Local/anonymous class chỉ capture được biến local final hoặc effectively final.",
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
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề luyện Java OOP số 2 - 40 câu bẫy
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
                <div className="mt-2 text-fuchsia-300">
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
                      <p className="text-sm font-semibold text-fuchsia-400">
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
                              ? "border-fuchsia-500/70 bg-fuchsia-500/10"
                              : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-fuchsia-400"
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
                      <p className="text-sm font-bold text-fuchsia-300">
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
                        ? "border-fuchsia-500/60 bg-fuchsia-500/15 text-fuchsia-200"
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
                  className="w-full rounded-2xl bg-fuchsia-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-fuchsia-300"
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
                    <span className="font-bold text-fuchsia-300">
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