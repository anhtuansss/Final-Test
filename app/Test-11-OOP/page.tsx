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
        System.out.println(x);
        System.out.println(b.x);
        System.out.println(a.x);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Dòng System.out.println(x) hợp lệ.",
      "Dòng System.out.println(b.x) hợp lệ.",
      "Dòng System.out.println(a.x) lỗi biên dịch.",
      "Ở package khác, subclass được truy cập protected member qua mọi biến kiểu A.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Trong package khác, subclass truy cập protected member qua this hoặc reference kiểu subclass phù hợp. Không được truy cập bừa qua biến kiểu superclass A.",
  },
  {
    id: 2,
    title: "Câu 2: Xét đoạn code sau",
    code: `// File p1/A.java
package p1;

public class A {
    void f() {
        System.out.println("A");
    }

    public void call() {
        f();
    }
}

// File p2/B.java
package p2;

import p1.A;

public class B extends A {
    public void f() {
        System.out.println("B");
    }
}

// File p2/Test.java
package p2;

import p1.A;

public class Test {
    public static void main(String[] args) {
        A obj = new B();
        obj.call();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A.",
      "B.f() không override A.f() vì A.f() là package-private ở package khác.",
      "Output là B.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Method package-private không được kế thừa sang package khác. B.f() là method mới, không override A.f(). A.call() gọi A.f().",
  },
  {
    id: 3,
    title: "Câu 3: Xét đoạn code sau",
    code: `class A {
    static {
        System.out.print("AS ");
    }

    {
        System.out.print("AI ");
    }

    A() {
        System.out.print("AC ");
    }
}

class B extends A {
    static {
        System.out.print("BS ");
    }

    {
        System.out.print("BI ");
    }

    B() {
        System.out.print("BC ");
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
        System.out.print("| ");
        new B();
    }
}`,
    options: [
      "Output là AS BS AI AC BI BC | AI AC BI BC.",
      "Static block chỉ chạy một lần.",
      "Instance block chạy mỗi lần tạo object.",
      "Constructor cha chạy trước constructor con.",
      "Static block của B chạy trước static block của A.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Class cha initialize trước class con. Khi tạo object: instance initializer cha, constructor cha, instance initializer con, constructor con.",
  },
  {
    id: 4,
    title: "Câu 4: Xét đoạn code sau",
    code: `class A {
    A() {
        print();
    }

    void print() {
        System.out.println("A");
    }
}

class B extends A {
    String name = "B";

    void print() {
        System.out.println(name.length());
    }
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có NullPointerException khi chạy.",
      "Constructor A gọi B.print().",
      "Khi B.print() chạy, field name của B chưa được gán \"B\".",
      "Output là 1.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Constructor cha gọi method bị override ở con. Lúc đó field của con chưa chạy initializer, name vẫn là null nên length() gây NullPointerException.",
  },
  {
    id: 5,
    title: "Câu 5: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        final int x;

        if (args.length > 0) {
            x = 1;
        }

        if (args.length == 0) {
            x = 2;
        }

        System.out.println(x);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Compiler không chứng minh hai if này là hai nhánh phủ hết và loại trừ nhau.",
      "Biến final x có thể bị xem là gán không chắc chắn hoặc gán nhiều lần.",
      "Nếu viết if ... else ... gán x ở cả hai nhánh thì dễ compile hơn.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Definite assignment của Java không suy luận sâu kiểu args.length > 0 và args.length == 0 là hai trường hợp bù nhau.",
  },
  {
    id: 6,
    title: "Câu 6: Xét đoạn code sau",
    code: `public class Test {
    static void f(Integer x) {
        System.out.println("Integer");
    }

    static void f(Long x) {
        System.out.println("Long");
    }

    public static void main(String[] args) {
        f(null);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Lời gọi f(null) bị ambiguous.",
      "null khớp được với Integer.",
      "null khớp được với Long.",
      "Compiler chọn Integer vì Integer phổ biến hơn.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Integer và Long không có quan hệ cha-con trực tiếp, nên null khớp cả hai nhưng không chọn được method cụ thể hơn.",
  },
  {
    id: 7,
    title: "Câu 7: Xét đoạn code sau",
    code: `public class Test {
    static void f(byte x) {
        System.out.println("byte");
    }

    static void f(short x) {
        System.out.println("short");
    }

    static void f(int x) {
        System.out.println("int");
    }

    public static void main(String[] args) {
        f('A');
    }
}`,
    options: [
      "Output là int.",
      "char có thể widening sang int.",
      "char không widening sang byte hoặc short.",
      "Output là short.",
    ],
    correct: [0, 1, 2],
    explanation:
      "char có thể widening sang int, long, float, double. Không widening sang byte/short.",
  },
  {
    id: 8,
    title: "Câu 8: Xét đoạn code sau",
    code: `public class Test {
    static void f(Object o) {
        System.out.println("Object");
    }

    static void f(int... x) {
        System.out.println("varargs");
    }

    public static void main(String[] args) {
        f(1);
    }
}`,
    options: [
      "Output là Object.",
      "f(Object) dùng boxing từ int sang Integer rồi widening reference sang Object.",
      "Fixed-arity method được ưu tiên trước varargs.",
      "Output là varargs.",
    ],
    correct: [0, 1, 2],
    explanation:
      "f(Object) là fixed-arity applicable bằng boxing + widening reference. Varargs xét sau nên không được chọn.",
  },
  {
    id: 9,
    title: "Câu 9: Xét đoạn code sau",
    code: `public class Test {
    static void f(int[] a) {
        System.out.println("int[]");
    }

    static void f(Integer[] a) {
        System.out.println("Integer[]");
    }

    public static void main(String[] args) {
        f(null);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Lời gọi f(null) bị ambiguous.",
      "int[] và Integer[] đều là reference type.",
      "Compiler chọn Integer[] vì Integer là wrapper của int.",
    ],
    correct: [0, 1, 2],
    explanation:
      "int[] và Integer[] là hai kiểu mảng reference khác nhau, không kiểu nào cụ thể hơn kiểu kia.",
  },
  {
    id: 10,
    title: "Câu 10: Xét đoạn code sau",
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
        A a = new A();
        a.f();

        I i = a;
        i.f();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "a.f() không bắt buộc xử lý Exception.",
      "i.f() bắt buộc xử lý hoặc khai báo Exception vì kiểu compile-time là I.",
      "A.f() được phép không throws Exception khi implement I.f().",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Method override/implement được phép throws ít hơn. Nhưng khi gọi qua biến kiểu I, compiler xét khai báo I.f() throws Exception.",
  },
  {
    id: 11,
    title: "Câu 11: Xét đoạn code sau",
    code: `import java.io.IOException;

public class Test {
    public static void main(String[] args) {
        try {
            throw new RuntimeException();
        } catch (IOException e) {
            System.out.println("IO");
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "IOException là checked exception.",
      "try block không thể ném IOException.",
      "catch IOException vẫn hợp lệ vì RuntimeException có thể biến thành IOException.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Checked exception chỉ được catch nếu try block có thể ném exception đó. RuntimeException không làm catch IOException hợp lệ.",
  },
  {
    id: 12,
    title: "Câu 12: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        try {
            System.out.print("T ");
            throw new StackOverflowError();
        } catch (Exception e) {
            System.out.print("C ");
        } finally {
            System.out.print("F ");
        }

        System.out.print("D");
    }
}`,
    options: [
      "Output có T.",
      "Output có F.",
      "Output có C.",
      "Output có D.",
      "catch Exception không bắt được StackOverflowError.",
    ],
    correct: [0, 1, 4],
    explanation:
      "StackOverflowError là Error, không phải Exception. finally vẫn chạy, nhưng sau đó lỗi thoát ra nên D không được in.",
  },
  {
    id: 13,
    title: "Câu 13: Xét đoạn code sau",
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
            throw new RuntimeException("try");
        } catch (RuntimeException e) {
            System.out.print(e.getMessage() + " ");
            System.out.print(e.getSuppressed().length);
        }
    }
}`,
    options: [
      "Output có try closeB closeA.",
      "Exception chính có message là try.",
      "Có 2 suppressed exceptions.",
      "Exception từ closeB và closeA bị suppressed.",
      "Exception chính có message là B.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Exception trong try là exception chính. Khi đóng resource, closeB và closeA đều ném exception nên bị suppressed.",
  },
  {
    id: 14,
    title: "Câu 14: Xét đoạn code sau",
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
      "Dòng đầu in finally.",
      "Dòng thứ hai in 0.",
      "Exception trong finally thay thế exception trong try.",
      "Exception try tự động nằm trong suppressed list.",
    ],
    correct: [0, 1, 2],
    explanation:
      "finally ném exception mới sẽ che exception cũ. Suppressed tự động chủ yếu trong try-with-resources, không phải finally thường.",
  },
  {
    id: 15,
    title: "Câu 15: Xét đoạn code sau",
    code: `class A {
    static {
        System.out.print("init ");
        if (System.currentTimeMillis() > 0) {
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
      "Output có init một lần.",
      "Lần đầu thường bắt được ExceptionInInitializerError.",
      "Lần thứ hai thường bắt được NoClassDefFoundError.",
      "RuntimeException trong static initializer luôn thoát ra trực tiếp, không bị wrap.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Lỗi khi initialize class bị wrap thành ExceptionInInitializerError. Sau khi class init thất bại, lần dùng tiếp theo thường gây NoClassDefFoundError.",
  },
  {
    id: 16,
    title: "Câu 16: Xét đoạn code sau",
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
      "Chương trình lỗi biên dịch.",
      "Number n = nums.get(0) hợp lệ.",
      "nums.add(2) không hợp lệ.",
      "nums.add(null) hợp lệ nếu bỏ dòng sai phía trên.",
      "List<? extends Number> cho phép add mọi Number.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "? extends Number đọc ra được Number, nhưng không thêm được giá trị cụ thể vì list thật có thể là List<Integer>, List<Double>, v.v.",
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
      "? super Number cho phép add Number hoặc subclass của Number. Nhưng khi đọc ra chỉ chắc chắn là Object.",
  },
  {
    id: 18,
    title: "Câu 18: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List raw = new ArrayList<String>();

        raw.add(123);

        List<String> list = raw;

        String s = list.get(0);

        System.out.println(s);
    }
}`,
    options: [
      "Chương trình compile được nhưng có unchecked warning.",
      "Có ClassCastException khi chạy.",
      "Raw type có thể phá an toàn kiểu generic.",
      "Output là 123.",
    ],
    correct: [0, 1, 2],
    explanation:
      "raw type cho phép thêm Integer vào list đáng lẽ là String. Khi lấy qua List<String>, runtime cast sang String và lỗi.",
  },
  {
    id: 19,
    title: "Câu 19: Xét đoạn code sau",
    code: `import java.util.List;

class Test {
    void f(List<String> list) {
    }

    void f(List<Integer> list) {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Hai method có cùng erasure.",
      "Sau type erasure, cả hai gần như thành f(List list).",
      "Generic type String và Integer vẫn được giữ nguyên ở runtime để overload.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Generic bị erase, nên hai method này trùng signature sau erasure.",
  },
  {
    id: 20,
    title: "Câu 20: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    static <T> void add(List<T> list, T item) {
        list.add(item);
    }

    public static void main(String[] args) {
        List<Number> nums = new ArrayList<>();

        add(nums, 1);
        add(nums, 2.5);

        System.out.println(nums);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là [1, 2.5].",
      "T có thể được suy luận là Number trong các lời gọi này.",
      "Không thể thêm Integer hoặc Double vào List<Number>.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Integer và Double đều là subtype của Number, nên thêm vào List<Number> là hợp lệ.",
  },
  {
    id: 21,
    title: "Câu 21: Xét đoạn code sau",
    code: `class Box<T> {
    static T value;
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không được dùng type parameter T của class trong static field.",
      "T thuộc về từng tham số hóa generic, còn static thuộc về class.",
      "Mỗi Box<String> và Box<Integer> có static value riêng nên hợp lệ.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Static member không gắn với từng T cụ thể. Type parameter của class không dùng được trong static context.",
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
      "HashMap tự cập nhật bucket khi key.id thay đổi.",
      "Dùng object mutable làm key có thể gây bug logic.",
    ],
    correct: [0, 1, 3],
    explanation:
      "HashMap không biết key đã bị mutate. hashCode đổi khiến lookup đi nhầm bucket.",
  },
  {
    id: 23,
    title: "Câu 23: Xét đoạn code sau",
    code: `import java.util.HashSet;

class P {
    int x;

    P(int x) {
        this.x = x;
    }

    public boolean equals(P p) {
        return p != null && p.x == x;
    }

    public int hashCode() {
        return x;
    }
}

public class Test {
    public static void main(String[] args) {
        HashSet<P> set = new HashSet<>();

        set.add(new P(1));

        System.out.println(set.contains(new P(1)));
    }
}`,
    options: [
      "Output là false.",
      "equals(P p) không override equals(Object o).",
      "HashSet dùng equals(Object), không dùng equals(P) như một override.",
      "Vì hashCode giống nhau nên contains chắc chắn true.",
    ],
    correct: [0, 1, 2],
    explanation:
      "equals đúng để override phải là equals(Object). Ở đây equals(P) chỉ là overload.",
  },
  {
    id: 24,
    title: "Câu 24: Xét đoạn code sau",
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
        System.out.println(set.contains("x"));
    }
}`,
    options: [
      "Dòng đầu in 2.",
      "Dòng thứ hai in true.",
      "\"a\", \"b\", \"x\" đều được comparator xem là bằng nhau theo độ dài.",
      "TreeSet chỉ dùng equals, không quan tâm comparator.",
    ],
    correct: [0, 1, 2],
    explanation:
      "TreeSet dùng comparator để xác định trùng. Các chuỗi dài 1 được xem như cùng một phần tử.",
  },
  {
    id: 25,
    title: "Câu 25: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));

        List<Integer> sub = list.subList(0, 2);

        list.add(4);

        System.out.println(sub.size());
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có ConcurrentModificationException khi truy cập sub.",
      "subList là view liên kết với list gốc.",
      "Sửa cấu trúc list gốc sau khi tạo subList có thể làm subList không còn dùng an toàn.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "subList là view. Structural modification ở list gốc ngoài view có thể làm thao tác trên subList gây ConcurrentModificationException.",
  },
  {
    id: 26,
    title: "Câu 26: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<String> base = new ArrayList<>();
        List<String> view = Collections.unmodifiableList(base);

        base.add("A");

        System.out.println(view);

        view.add("B");

        System.out.println(base);
    }
}`,
    options: [
      "Dòng đầu in [A].",
      "view phản ánh thay đổi của base.",
      "view.add(\"B\") gây UnsupportedOperationException.",
      "Dòng cuối in [A, B].",
    ],
    correct: [0, 1, 2],
    explanation:
      "unmodifiableList là view không cho sửa qua view, nhưng vẫn phản ánh thay đổi từ list gốc.",
  },
  {
    id: 27,
    title: "Câu 27: Xét đoạn code sau",
    code: `import java.util.Arrays;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        String[] arr = {"A", "B"};

        List<String> list = Arrays.asList(arr);

        arr[0] = "X";
        list.set(1, "Y");

        System.out.println(list);
        System.out.println(Arrays.toString(arr));

        list.add("Z");
    }
}`,
    options: [
      "Dòng đầu in [X, Y].",
      "Dòng thứ hai in [X, Y].",
      "Arrays.asList tạo list backed bởi array.",
      "list.add(\"Z\") gây UnsupportedOperationException.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "List từ Arrays.asList có kích thước cố định và backed bởi array. set được, add/remove thì lỗi.",
  },
  {
    id: 28,
    title: "Câu 28: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;

public class Test {
    public static void main(String[] args) {
        ArrayList<Integer> src = new ArrayList<>(Arrays.asList(1, 2));
        ArrayList<Integer> dest = new ArrayList<>(Arrays.asList(0, 0, 0));

        Collections.copy(dest, src);

        System.out.println(dest);
    }
}`,
    options: [
      "Output là [1, 2, 0].",
      "Collections.copy ghi đè các phần tử đầu của dest.",
      "dest phải có size ít nhất bằng src.size().",
      "Collections.copy tự xóa phần tử thừa của dest.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Collections.copy dùng set vào dest, không tự thay đổi size của dest.",
  },
  {
    id: 29,
    title: "Câu 29: Xét đoạn code sau",
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
      "Capture yêu cầu biến local không bị gán lại. Sửa nội dung mảng không phải gán lại biến a.",
  },
  {
    id: 30,
    title: "Câu 30: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        int x = 1;

        Runnable r = () -> System.out.println(x);

        x = 2;

        r.run();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Biến local được lambda capture phải final hoặc effectively final.",
      "Dòng x = 2 làm x không còn effectively final.",
      "Output là 2.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Lambda chỉ capture được biến local final/effectively final. Gán lại x sau đó làm code lỗi biên dịch.",
  },
  {
    id: 31,
    title: "Câu 31: Xét đoạn code sau",
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
      "Trong lambda, this là object Test bên ngoài.",
      "this.x truy cập field x, không phải biến local x.",
      "Output là 2.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Lambda không tạo this riêng. this.x là field của object Test hiện tại.",
  },
  {
    id: 32,
    title: "Câu 32: Xét đoạn code sau",
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
      "Anonymous class tạo object riêng, nên this bên trong nó trỏ tới object anonymous.",
  },
  {
    id: 33,
    title: "Câu 33: Xét đoạn code sau",
    code: `class Outer {
    int x = 1;

    class Inner {
        void print() {
            System.out.println(x);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        Outer.Inner in = new Outer.Inner();

        in.print();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Inner là non-static inner class nên cần object Outer cụ thể.",
      "Cách tạo đúng có thể là new Outer().new Inner().",
      "new Outer.Inner() hợp lệ với non-static inner class.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Non-static inner class gắn với một instance Outer, nên phải tạo qua object Outer.",
  },
  {
    id: 34,
    title: "Câu 34: Xét đoạn code sau",
    code: `class Outer {
    private int x = 7;

    static class Nested {
        void print(Outer o) {
            System.out.println(o.x);
        }
    }
}

public class Test {
    public static void main(String[] args) {
        new Outer.Nested().print(new Outer());
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 7.",
      "Static nested class không có Outer.this nhưng vẫn có thể truy cập private member qua object Outer cụ thể.",
      "Static nested class không bao giờ được truy cập private member của outer class.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Static nested class không có enclosing instance, nhưng vẫn nằm trong phạm vi class Outer nên truy cập được private member nếu có object.",
  },
  {
    id: 35,
    title: "Câu 35: Xét đoạn code sau",
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
      "Đổi case E.A thành case A sẽ sửa lỗi.",
      "Output là A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Trong switch với enum, case dùng tên constant không kèm tên enum.",
  },
  {
    id: 36,
    title: "Câu 36: Xét đoạn code sau",
    code: `interface Op {
    int apply(int a, int b);
}

enum Calc implements Op {
    PLUS {
        public int apply(int a, int b) {
            return a + b;
        }
    },
    TIMES {
        public int apply(int a, int b) {
            return a * b;
        }
    }
}

public class Test {
    public static void main(String[] args) {
        System.out.println(Calc.TIMES.apply(2, 3));
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 6.",
      "Enum có thể implement interface.",
      "Enum constant có thể có class body riêng.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Enum là class đặc biệt, có thể implement interface và từng constant có thể override method riêng.",
  },
  {
    id: 37,
    title: "Câu 37: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Boolean b = null;

        if (b != null & b) {
            System.out.println("A");
        } else {
            System.out.println("B");
        }
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có NullPointerException khi chạy.",
      "Toán tử & với boolean không short-circuit.",
      "Nếu đổi & thành && thì sẽ không gọi vế b khi b == null.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "& đánh giá cả hai vế. Vế b cần unbox Boolean null thành boolean nên gây NullPointerException.",
  },
  {
    id: 38,
    title: "Câu 38: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Integer i = null;

        int x = true ? i : 0;

        System.out.println(x);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có NullPointerException khi chạy.",
      "Nhánh được chọn là i nên cần unbox null sang int.",
      "Output là 0.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Toán tử ?: ở đây có kết quả kiểu int. Integer i phải unbox, nhưng i là null nên lỗi.",
  },
  {
    id: 39,
    title: "Câu 39: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Long l = 1L;
        int i = 1;

        System.out.println(l == i);
        System.out.println(l.equals(i));
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in false.",
      "Ở dòng đầu, Long bị unbox thành long rồi so sánh số.",
      "Ở dòng thứ hai, i được box thành Integer nên Long.equals trả false.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "== giữa wrapper và primitive gây unboxing. equals thì Long không coi Integer(1) là bằng Long(1).",
  },
  {
    id: 40,
    title: "Câu 40: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        short s = 1;

        s += 1;
        s = s + 1;

        System.out.println(s);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "s += 1 hợp lệ vì compound assignment có ép kiểu ngầm.",
      "s = s + 1 lỗi vì s + 1 có kiểu int.",
      "Chương trình in 3.",
    ],
    correct: [0, 1, 2],
    explanation:
      "short tham gia phép cộng sẽ promote lên int. Compound assignment tự ép kiểu về short, còn phép gán thường thì không.",
  },
  {
    id: 41,
    title: "Câu 41: Xét đoạn code sau",
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
      "switch trên Integer cần unbox.",
      "default được chạy và in D.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Integer null bị unbox khi switch, gây NullPointerException trước khi xét case/default.",
  },
  {
    id: 42,
    title: "Câu 42: Xét đoạn code sau",
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
      "switch nhảy thẳng tới case 2. default chỉ chạy khi không có case nào khớp.",
  },
  {
    id: 43,
    title: "Câu 43: Xét đoạn code sau",
    code: `public class Test {
    static int f() {
        for (int i = 0; i < 3; i++) {
            try {
                continue;
            } finally {
                return i;
            }
        }

        return 9;
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
    options: [
      "Output là 0.",
      "return trong finally đè continue.",
      "Vòng lặp chỉ chạy lần i = 0 rồi method return.",
      "Output là 9.",
    ],
    correct: [0, 1, 2],
    explanation:
      "continue đang chuẩn bị chạy, nhưng finally return i nên method kết thúc ngay với i = 0.",
  },
  {
    id: 44,
    title: "Câu 44: Xét đoạn code sau",
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
      "Mảng thật là Integer[]. Gán Integer hợp lệ, nhưng gán Double vào Integer[] gây ArrayStoreException trước dòng cuối.",
  },
  {
    id: 45,
    title: "Câu 45: Xét đoạn code sau",
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
      "Dòng đầu in 1.",
      "Dòng Object[] b = (Object[]) o gây ClassCastException.",
      "int[] là Object nhưng không phải Object[].",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Primitive array như int[] là object, nhưng không phải mảng các Object.",
  },
  {
    id: 46,
    title: "Câu 46: Xét đoạn code sau",
    code: `class Box {
    int v;
}

class Holder implements Cloneable {
    Box box = new Box();

    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

public class Test {
    public static void main(String[] args) throws Exception {
        Holder h1 = new Holder();
        h1.box.v = 1;

        Holder h2 = (Holder) h1.clone();

        h2.box.v = 9;

        System.out.println(h1.box.v);
        System.out.println(h1 == h2);
        System.out.println(h1.box == h2.box);
    }
}`,
    options: [
      "Dòng đầu in 9.",
      "Dòng thứ hai in false.",
      "Dòng thứ ba in true.",
      "super.clone() mặc định clone sâu object lồng bên trong.",
    ],
    correct: [0, 1, 2],
    explanation:
      "clone mặc định là shallow copy. h1 và h2 khác object Holder, nhưng cùng trỏ tới Box bên trong.",
  },
  {
    id: 47,
    title: "Câu 47: Xét đoạn code sau",
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
      "Parameter x shadow field x. Dòng x = x không đụng tới field, nên field giữ default value 0.",
  },
  {
    id: 48,
    title: "Câu 48: Xét đoạn code sau",
    code: `interface I {
    int X = 1;
}

interface J {
    int X = 2;
}

class C implements I, J {
    void f() {
        System.out.println(X);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Tên X bị ambiguous trong C.",
      "Có thể viết I.X hoặc J.X để phân biệt.",
      "Compiler tự chọn X của interface đứng trước.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Hai interface cùng có field X. Gọi X trực tiếp trong class implement cả hai là mơ hồ.",
  },
  {
    id: 49,
    title: "Câu 49: Xét đoạn code sau",
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
      "Output là A.",
      "Method từ class/superclass thắng default method từ interface.",
      "B bắt buộc phải override f() vì có xung đột.",
      "Output là I.",
    ],
    correct: [0, 1],
    explanation:
      "Quy tắc class wins: method từ class cha được ưu tiên hơn default method của interface.",
  },
  {
    id: 50,
    title: "Câu 50: Xét đoạn code sau",
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
      "Override bắt buộc return type giống hệt, nên code lỗi.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Override được tăng visibility và được dùng return type là subtype của return type method cha.",
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
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-red-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề tổng ôn Java OOP - 50 câu cuối
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
                <div className="mt-2 text-red-300">
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
                      <p className="text-sm font-semibold text-red-400">
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
                              ? "border-red-500/70 bg-red-500/10"
                              : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-red-400"
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
                      <p className="text-sm font-bold text-red-300">
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
                        ? "border-red-500/60 bg-red-500/15 text-red-200"
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
                  className="w-full rounded-2xl bg-red-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-red-300"
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
                    <span className="font-bold text-red-300">
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