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
    code: `final class A {
}

class B extends A {
}

public class Test {
    public static void main(String[] args) {
        System.out.println("OK");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Class final không thể bị kế thừa.",
      "Nếu bỏ final khỏi A thì B extends A có thể hợp lệ.",
      "Chương trình in OK.",
    ],
    correct: [0, 1, 2],
    explanation:
      "final class không cho phép class khác extends. Code lỗi trước khi xét main.",
  },
  {
    id: 2,
    title: "Câu 2: Xét đoạn code sau",
    code: `abstract class A {
    abstract final void f();
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "abstract method cần class con override.",
      "final method không cho class con override.",
      "Một method không thể vừa abstract vừa final.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "abstract yêu cầu override, còn final cấm override. Hai modifier này mâu thuẫn nhau trên method.",
  },
  {
    id: 3,
    title: "Câu 3: Xét đoạn code sau",
    code: `class A {
    private A() {
    }
}

class B extends A {
}

public class Test {
    public static void main(String[] args) {
        new B();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Constructor mặc định của B ngầm gọi super().",
      "A() là private nên B không gọi được.",
      "Vì A và B cùng file nên B gọi được private constructor của A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "private chỉ truy cập được trong chính class A. Constructor mặc định của B cần gọi super(), nhưng A() private nên lỗi.",
  },
  {
    id: 4,
    title: "Câu 4: Xét đoạn code sau",
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
      "Chương trình compile được nhưng chạy StackOverflowError.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Compiler phát hiện constructor gọi đệ quy vòng tròn nên lỗi biên dịch.",
  },
  {
    id: 5,
    title: "Câu 5: Xét đoạn code sau",
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
      "Instance initializer chạy trong quá trình tạo object, trước constructor body. x đã được gán đúng một lần.",
  },
  {
    id: 6,
    title: "Câu 6: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        final int x;

        if (args.length > 0) {
            x = 1;
        } else {
            x = 2;
        }

        System.out.println(x);
    }
}`,
    options: [
      "Chương trình compile được.",
      "x được gán đúng một lần trên mọi nhánh.",
      "x có thể in ra 1 hoặc 2 tùy args.length.",
      "final local variable bắt buộc phải gán ngay tại dòng khai báo.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Blank final local variable có thể gán sau, miễn là compiler thấy mọi đường đi đều gán đúng một lần.",
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
      "Khi x được khởi tạo, y vẫn đang có giá trị mặc định 0.",
      "Method getY() không được phép truy cập field y khai báo phía sau.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Field được khởi tạo theo thứ tự khai báo. Khi initializer của x chạy, y chưa được gán 10 nên còn default 0.",
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
    code: `public class Test {
    public static void main(String[] args) {
        String s = "abc";

        System.out.println(s instanceof StringBuilder);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "String và StringBuilder là hai kiểu không thể ép qua lại trong trường hợp này.",
      "Dòng instanceof in false.",
      "Vì s là reference type nên instanceof với mọi class đều compile được.",
    ],
    correct: [0, 1],
    explanation:
      "Với kiểu compile-time là String, kiểm tra instanceof StringBuilder là inconvertible type nên lỗi biên dịch.",
  },
  {
    id: 10,
    title: "Câu 10: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Object o = "abc";

        System.out.println(o instanceof StringBuilder);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là false.",
      "Vì o có kiểu Object nên kiểm tra instanceof StringBuilder hợp lệ.",
      "Có ClassCastException khi chạy.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Object có thể trỏ tới nhiều kiểu object khác nhau nên instanceof StringBuilder compile được. Object thật là String nên kết quả false.",
  },
  {
    id: 11,
    title: "Câu 11: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        String s = "abc";

        StringBuilder sb = (StringBuilder) s;

        System.out.println(sb);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không thể cast trực tiếp String sang StringBuilder.",
      "Có ClassCastException khi chạy.",
      "Cast này tạo ra một StringBuilder mới từ nội dung của s.",
    ],
    correct: [0, 1],
    explanation:
      "String và StringBuilder là hai kiểu class không có quan hệ kế thừa phù hợp, nên cast trực tiếp bị lỗi biên dịch.",
  },
  {
    id: 12,
    title: "Câu 12: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Object o = "abc";

        StringBuilder sb = (StringBuilder) o;

        System.out.println(sb);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có ClassCastException khi chạy.",
      "Object thật đang là String, không phải StringBuilder.",
      "Cast qua Object luôn thành công.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Compiler cho phép cast từ Object xuống StringBuilder, nhưng runtime kiểm tra object thật và phát hiện đó là String.",
  },
  {
    id: 13,
    title: "Câu 13: Xét đoạn code sau",
    code: `interface I {
    void f();

    boolean equals(Object o);
}

public class Test {
    public static void main(String[] args) {
        I i = () -> System.out.println("X");

        i.f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là X.",
      "I vẫn được xem là functional interface.",
      "Method equals(Object) tương ứng với method public của Object nên không làm mất tính functional interface.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Các method public của Object như equals(Object) không được tính là abstract method riêng khi xác định functional interface.",
  },
  {
    id: 14,
    title: "Câu 14: Xét đoạn code sau",
    code: `interface I {
    default void f() {
        System.out.println("I");
    }
}

class A implements I {
    void f() {
        System.out.println("A");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Method f() trong interface là public.",
      "A.f() đang giảm visibility xuống package-private.",
      "Đổi void f() thành public void f() sẽ sửa được lỗi.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Default method trong interface vẫn là public. Class implement không được giảm visibility.",
  },
  {
    id: 15,
    title: "Câu 15: Xét đoạn code sau",
    code: `interface I {
    void f();
}

class A {
    void f() {
        System.out.println("A");
    }
}

class B extends A implements I {
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "A.f() là package-private nên không thể implement public method I.f().",
      "B cần có public void f().",
      "B đã implement I.f() thành công nhờ kế thừa A.f().",
    ],
    correct: [0, 1, 2],
    explanation:
      "Interface method là public. Method kế thừa từ A có access yếu hơn public nên không thỏa mãn I.f().",
  },
  {
    id: 16,
    title: "Câu 16: Xét đoạn code sau",
    code: `interface I {
    void f();
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
        I obj = new B();

        obj.f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A.",
      "public method f() trong A có thể thỏa mãn I.f().",
      "B bắt buộc phải override f() dù đã kế thừa public f() từ A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "B kế thừa public f() từ A, và method đó thỏa mãn yêu cầu của interface I.",
  },
  {
    id: 17,
    title: "Câu 17: Xét đoạn code sau",
    code: `interface I {
    default void f() {
        System.out.print("I");
    }
}

interface J extends I {
    default void f() {
        I.super.f();
        System.out.print("J");
    }
}

class C implements J {
}

public class Test {
    public static void main(String[] args) {
        new C().f();
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là IJ.",
      "I.super.f() gọi default method f() của I.",
      "C bắt buộc phải override f(), nếu không sẽ lỗi biên dịch.",
    ],
    correct: [0, 1, 2],
    explanation:
      "J đã override default method của I. C implement J và kế thừa default method đó.",
  },
  {
    id: 18,
    title: "Câu 18: Xét đoạn code sau",
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
      "Tên X bị ambiguous trong class C.",
      "Có thể viết I.X hoặc J.X để phân biệt.",
      "Compiler tự chọn X của interface được implements trước.",
    ],
    correct: [0, 1, 2],
    explanation:
      "C implement hai interface cùng có hằng X. Gọi X trực tiếp bị mơ hồ, phải dùng I.X hoặc J.X.",
  },
  {
    id: 19,
    title: "Câu 19: Xét đoạn code sau",
    code: `interface I {
    int f();
}

interface J {
    long f();
}

class C implements I, J {
    public int f() {
        return 1;
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không thể implement cùng lúc hai method chỉ khác return type int và long.",
      "Return type primitive không có covariant return.",
      "C.f() implement được cả I.f() và J.f().",
    ],
    correct: [0, 1, 2],
    explanation:
      "Hai interface yêu cầu cùng signature f() nhưng return type không tương thích. int không thể thay thế long.",
  },
  {
    id: 20,
    title: "Câu 20: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        try {
            System.out.print("T ");
            throw new AssertionError("E");
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
      "AssertionError không bị bắt bởi catch (Exception e).",
    ],
    correct: [0, 1, 4],
    explanation:
      "AssertionError là Error, không phải Exception. catch Exception không bắt được, nhưng finally vẫn chạy trước khi lỗi thoát ra.",
  },
  {
    id: 21,
    title: "Câu 21: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        try {
            System.out.print("T ");
            throw new AssertionError("E");
        } catch (Throwable e) {
            System.out.print("C ");
        } finally {
            System.out.print("F ");
        }

        System.out.print("D");
    }
}`,
    options: [
      "Output là T C F D.",
      "catch Throwable bắt được AssertionError.",
      "finally vẫn chạy sau catch.",
      "Chương trình bị dừng trước khi in D.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Throwable là cha của cả Exception và Error, nên bắt được AssertionError. Sau catch và finally, chương trình tiếp tục in D.",
  },
  {
    id: 22,
    title: "Câu 22: Xét đoạn code sau",
    code: `public class Test {
    static String f() {
        StringBuilder sb = new StringBuilder("A");

        try {
            return sb.toString();
        } finally {
            sb.append("B");
        }
    }

    public static void main(String[] args) {
        System.out.println(f());
    }
}`,
    options: [
      "Output là A.",
      "Output là AB.",
      "Biểu thức return sb.toString() được tính trước khi finally chạy.",
      "finally có sửa StringBuilder nhưng không sửa String đã tạo ra để return.",
    ],
    correct: [0, 2, 3],
    explanation:
      "sb.toString() tạo ra String A trước. finally sửa StringBuilder sau đó, nhưng giá trị return đã là String riêng.",
  },
  {
    id: 23,
    title: "Câu 23: Xét đoạn code sau",
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
            System.out.println(e.getMessage());
            System.out.println(e.getErrorCode());
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "e.getMessage() hợp lệ.",
      "e.getErrorCode() không hợp lệ vì IOException không có method này.",
      "Trong multi-catch, biến e chỉ dùng được các method an toàn với kiểu chung phù hợp.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "IOException và SQLException cùng có getMessage từ Throwable, nhưng getErrorCode chỉ có ở SQLException.",
  },
  {
    id: 24,
    title: "Câu 24: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        ArrayList<String> list = new ArrayList<>(Arrays.asList("A", "B", "C"));

        List<String> sub = list.subList(0, 2);

        sub.set(0, "X");
        sub.remove(1);

        System.out.println(list);
        System.out.println(sub);
    }
}`,
    options: [
      "Dòng đầu in [X, C].",
      "Dòng thứ hai in [X].",
      "subList là view liên kết với list gốc.",
      "Sửa sub không ảnh hưởng list gốc.",
    ],
    correct: [0, 1, 2],
    explanation:
      "subList là view của list gốc. set/remove qua sub ảnh hưởng trực tiếp tới list.",
  },
  {
    id: 25,
    title: "Câu 25: Xét đoạn code sau",
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
      "view phản ánh thay đổi từ base.",
      "view.add(\"B\") gây UnsupportedOperationException.",
      "Dòng cuối in [A, B].",
    ],
    correct: [0, 1, 2],
    explanation:
      "unmodifiableList tạo view không cho sửa qua view, nhưng vẫn phản ánh thay đổi của list gốc.",
  },
  {
    id: 26,
    title: "Câu 26: Xét đoạn code sau",
    code: `import java.util.HashMap;

public class Test {
    public static void main(String[] args) {
        HashMap<String, String> map = new HashMap<>();

        System.out.println(map.put("a", "1"));
        System.out.println(map.put("a", "2"));
        System.out.println(map.get("a"));
    }
}`,
    options: [
      "Dòng đầu in null.",
      "Dòng thứ hai in 1.",
      "Dòng thứ ba in 2.",
      "put luôn trả về giá trị mới được thêm vào.",
    ],
    correct: [0, 1, 2],
    explanation:
      "HashMap.put trả về value cũ gắn với key đó, hoặc null nếu trước đó chưa có.",
  },
  {
    id: 27,
    title: "Câu 27: Xét đoạn code sau",
    code: `import java.util.HashSet;

class P {
    int x;

    P(int x) {
        this.x = x;
    }

    public boolean equals(Object o) {
        return o instanceof P && ((P) o).x == x;
    }

    public int hashCode() {
        return x;
    }
}

public class Test {
    public static void main(String[] args) {
        HashSet<P> set = new HashSet<>();

        set.add(new P(1));
        set.add(new P(1));

        System.out.println(set.size());
    }
}`,
    options: [
      "Output là 1.",
      "Hai object P(1) được xem là bằng nhau.",
      "equals và hashCode nhất quán trong trường hợp này.",
      "Output là 2 vì hai lần new luôn là hai phần tử khác nhau.",
    ],
    correct: [0, 1, 2],
    explanation:
      "HashSet dùng hashCode và equals. Hai object có cùng x, hashCode cùng x và equals true nên chỉ giữ một phần tử.",
  },
  {
    id: 28,
    title: "Câu 28: Xét đoạn code sau",
    code: `import java.util.TreeSet;

public class Test {
    public static void main(String[] args) {
        TreeSet<Object> set = new TreeSet<>();

        set.add(new Object());

        System.out.println("A");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có ClassCastException khi chạy.",
      "Object không implement Comparable.",
      "Dòng A được in ra bình thường.",
    ],
    correct: [0, 1, 2],
    explanation:
      "TreeSet cần so sánh phần tử theo Comparable hoặc Comparator. Object thường không Comparable nên runtime lỗi.",
  },
  {
    id: 29,
    title: "Câu 29: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 2, 3));

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) == 2) {
                list.remove(i);
            }
        }

        System.out.println(list);
    }
}`,
    options: [
      "Output là [1, 2, 3].",
      "Một số 2 bị bỏ sót do index dịch trái sau remove.",
      "Output là [1, 3].",
      "Chương trình lỗi ConcurrentModificationException.",
    ],
    correct: [0, 1],
    explanation:
      "Sau khi remove phần tử 2 đầu tiên ở index 1, phần tử 2 thứ hai dịch về index 1 nhưng i tăng lên 2 nên bị bỏ qua.",
  },
  {
    id: 30,
    title: "Câu 30: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Boolean a = true;
        Boolean b = true;
        Boolean c = new Boolean(true);

        System.out.println(a == b);
        System.out.println(a == c);
        System.out.println(a.equals(c));
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in false.",
      "Dòng thứ ba in true.",
      "new Boolean(true) tạo object riêng.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Autoboxing Boolean dùng Boolean.TRUE/FALSE. new Boolean(true) tạo object mới, nhưng equals vẫn so sánh giá trị.",
  },
  {
    id: 31,
    title: "Câu 31: Xét đoạn code sau",
    code: `public class Test {
    public static void main(String[] args) {
        Integer a = 1000;
        int b = 1000;

        Integer c = 1000;
        Integer d = 1000;

        System.out.println(a == b);
        System.out.println(c == d);
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai thường in false.",
      "Ở dòng đầu, a bị unbox thành int để so sánh.",
      "Dòng đầu cũng phụ thuộc Integer cache giống dòng thứ hai.",
    ],
    correct: [0, 1, 2],
    explanation:
      "So sánh wrapper với primitive làm wrapper bị unbox. Còn c == d là so reference giữa hai Integer object.",
  },
  {
    id: 32,
    title: "Câu 32: Xét đoạn code sau",
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
      "l.equals(i) nhận i được box thành Integer nên không bằng Long.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "== giữa Long wrapper và int primitive làm Long unbox. equals thì Long không xem Integer(1) là bằng Long(1).",
  },
  {
    id: 33,
    title: "Câu 33: Xét đoạn code sau",
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
      "Đối số x có kiểu Integer nên f(Integer) là match chính xác. Không cần unbox.",
  },
  {
    id: 34,
    title: "Câu 34: Xét đoạn code sau",
    code: `public class Test {
    static void f(int x) {
        System.out.println(x);
    }

    public static void main(String[] args) {
        Integer x = null;

        f(x);

        System.out.println("DONE");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có NullPointerException khi gọi f(x).",
      "x cần bị unbox thành int trước khi truyền vào f.",
      "DONE được in ra.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Chỉ có f(int), nên Integer x phải unbox. Unbox null gây NullPointerException trước khi vào method.",
  },
  {
    id: 35,
    title: "Câu 35: Xét đoạn code sau",
    code: `public class Test {
    static void f(int... x) {
        System.out.println(x == null);
    }

    public static void main(String[] args) {
        f(null);
        f();
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in false.",
      "f(null) truyền null làm tham số int[].",
      "f() tạo mảng int rỗng cho varargs.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Varargs int... thực chất là int[]. f(null) truyền null, còn f() tạo mảng rỗng.",
  },
  {
    id: 36,
    title: "Câu 36: Xét đoạn code sau",
    code: `public class Test {
    static void f(int... x) {
        x[0] = 9;
    }

    public static void main(String[] args) {
        int[] a = {1};

        f(a);

        System.out.println(a[0]);
    }
}`,
    options: [
      "Output là 9.",
      "Khi truyền int[] vào varargs, method nhận chính mảng đó.",
      "f(a) luôn copy mảng mới trước khi truyền.",
      "x[0] = 9 ảnh hưởng đến a[0].",
    ],
    correct: [0, 1, 3],
    explanation:
      "Nếu truyền sẵn array cho varargs, array đó được dùng trực tiếp, không tự copy.",
  },
  {
    id: 37,
    title: "Câu 37: Xét đoạn code sau",
    code: `class Box<T> {
    static T value;
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không được dùng type parameter T của class trong static field.",
      "T thuộc về từng instance generic, còn static thuộc về class.",
      "Mỗi Box<String> và Box<Integer> có static value riêng nên hợp lệ.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Type parameter T của class không dùng được trong static context vì static member không thuộc riêng từng T.",
  },
  {
    id: 38,
    title: "Câu 38: Xét đoạn code sau",
    code: `class Box<T> {
    T[] arr = new T[10];
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Java không cho tạo generic array trực tiếp bằng new T[10].",
      "Do type erasure, runtime không biết T thật là gì để tạo mảng.",
      "new T[10] luôn hợp lệ vì T là reference type.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Generic bị erase, nên không thể tạo mảng trực tiếp của type parameter T.",
  },
  {
    id: 39,
    title: "Câu 39: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<Integer> ints = new ArrayList<>();

        List<String> strings = (List<String>) (List<?>) ints;

        strings.add("A");

        Integer x = ints.get(0);

        System.out.println(x);
    }
}`,
    options: [
      "Chương trình compile được nhưng có unchecked warning.",
      "Có ClassCastException khi lấy Integer x = ints.get(0).",
      "strings và ints trỏ tới cùng một ArrayList.",
      "Generic cast tạo một ArrayList mới độc lập.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Do type erasure, cast qua List<?> compile được nhưng không tạo list mới. String được thêm vào list mà ints cũng trỏ tới, khi lấy ra Integer thì lỗi cast.",
  },
  {
    id: 40,
    title: "Câu 40: Xét đoạn code sau",
    code: `import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<Integer> src = new ArrayList<>();

        src.add(1);
        src.add(2);

        List<Integer> dest = new ArrayList<>();

        Collections.copy(dest, src);

        System.out.println(dest);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có IndexOutOfBoundsException khi chạy.",
      "Collections.copy yêu cầu dest đã có size đủ lớn.",
      "dest tự động được mở rộng để chứa toàn bộ src.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Collections.copy không tự add phần tử vào dest. Nó set vào các index có sẵn, nên dest phải có size >= src.size().",
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
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-violet-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề luyện Java OOP số 8 - 40 câu mới
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
                <div className="mt-2 text-violet-300">
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
                      <p className="text-sm font-semibold text-violet-400">
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
                              ? "border-violet-500/70 bg-violet-500/10"
                              : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-violet-400"
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
                      <p className="text-sm font-bold text-violet-300">
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
                        ? "border-violet-500/60 bg-violet-500/15 text-violet-200"
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
                  className="w-full rounded-2xl bg-violet-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-violet-300"
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
                    <span className="font-bold text-violet-300">
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