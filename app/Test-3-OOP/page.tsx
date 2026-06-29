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
    title: "Câu 1: char và compound assignment",
    code: `public class Test {
    public static void main(String[] args) {
        char c = 'A';

        c++;
        c += 2;
        c = c + 1;

        System.out.println(c);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch tại dòng c = c + 1.",
      "Chương trình compile được và in ra E.",
      "Dòng c++ hợp lệ.",
      "Dòng c += 2 hợp lệ vì compound assignment có ép kiểu ngầm.",
      "Biểu thức c + 1 có kiểu char.",
    ],
    correct: [0, 2, 3],
    explanation:
      "char tham gia phép cộng sẽ được nâng lên int. c++ và c += 2 hợp lệ, nhưng c = c + 1 cần ép kiểu tường minh.",
  },
  {
    id: 2,
    title: "Câu 2: Dấu chấm phẩy sau if",
    code: `public class Test {
    public static void main(String[] args) {
        int x = 0;

        if (x == 0);
            System.out.println("A");
        else
            System.out.println("B");
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Chương trình in A.",
      "Dấu ; ngay sau if làm câu lệnh if kết thúc bằng một empty statement.",
      "else vẫn ghép được với if ở trên.",
    ],
    correct: [0, 2],
    explanation:
      "Dấu ; kết thúc if. Sau đó System.out.println là statement độc lập, khiến else bị lẻ và gây lỗi biên dịch.",
  },
  {
    id: 3,
    title: "Câu 3: do-while",
    code: `public class Test {
    public static void main(String[] args) {
        int i = 0;

        do {
            i++;
            System.out.print(i);
        } while (i < 0);

        System.out.print("X");
    }
}`,
    options: [
      "Chương trình in 1X.",
      "Thân do-while chạy ít nhất một lần.",
      "Chương trình không in gì vì điều kiện i < 0 sai từ đầu.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 3],
    explanation:
      "do-while kiểm tra điều kiện sau khi chạy thân vòng lặp, nên i tăng lên 1 rồi in ra trước.",
  },
  {
    id: 4,
    title: "Câu 4: for có thân rỗng",
    code: `public class Test {
    public static void main(String[] args) {
        int count = 0;

        for (int i = 0; i < 3; i++);

        count++;
        System.out.println(count);
    }
}`,
    options: [
      "Chương trình in 1.",
      "Dấu ; sau for làm thân vòng lặp là empty statement.",
      "count++ nằm trong vòng for.",
      "Vòng for vẫn chạy 3 lần nhưng không làm gì trong thân vòng lặp.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Dấu ; ngay sau for là thân vòng lặp rỗng. Sau khi vòng for kết thúc, count++ mới chạy một lần.",
  },
  {
    id: 5,
    title: "Câu 5: labeled break",
    code: `public class Test {
    public static void main(String[] args) {
        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (i + j == 2) {
                    break outer;
                }
                System.out.print(i + "" + j + " ");
            }
        }
    }
}`,
    options: [
      "Output là 00 01 .",
      "break outer thoát khỏi cả hai vòng lặp.",
      "Output có 02.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Khi i = 0, j = 2 thì i + j == 2 nên break outer chạy trước khi in 02.",
  },
  {
    id: 6,
    title: "Câu 6: labeled continue",
    code: `public class Test {
    public static void main(String[] args) {
        outer:
        for (int i = 0; i < 3; i++) {
            for (int j = 0; j < 3; j++) {
                if (j == 1) {
                    continue outer;
                }
                System.out.print(i + "" + j + " ");
            }
        }
    }
}`,
    options: [
      "Output là 00 10 20 .",
      "Khi j == 1, chương trình chuyển sang vòng lặp i tiếp theo.",
      "Output có 01.",
      "continue outer chỉ bỏ qua vòng lặp j hiện tại, không ảnh hưởng vòng i.",
    ],
    correct: [0, 1],
    explanation:
      "continue outer bỏ phần còn lại của vòng trong và tiếp tục vòng ngoài ở lần i kế tiếp.",
  },
  {
    id: 7,
    title: "Câu 7: Missing return",
    code: `public class Test {
    static int f(boolean b) {
        if (b) {
            return 1;
        }
    }

    public static void main(String[] args) {
        System.out.println(f(true));
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Method f thiếu return trên mọi đường đi có thể xảy ra.",
      "Vì main gọi f(true), compiler biết chắc f sẽ return 1.",
      "Thêm return ở cuối method f sẽ sửa được lỗi.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Compiler kiểm tra thân method f độc lập, không dựa vào việc main truyền true.",
  },
  {
    id: 8,
    title: "Câu 8: Unreachable statement",
    code: `public class Test {
    static void f() {
        return;
        System.out.println("X");
    }

    public static void main(String[] args) {
        f();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Dòng System.out.println sau return là unreachable statement.",
      "Chương trình compile được nhưng không in gì.",
      "return trong void method là hợp lệ.",
    ],
    correct: [0, 1, 3],
    explanation:
      "return; trong void method hợp lệ, nhưng statement ngay sau return chắc chắn không thể chạy nên lỗi biên dịch.",
  },
  {
    id: 9,
    title: "Câu 9: Overload với null và array",
    code: `public class Test {
    static void f(int[] a) {
        System.out.println("int[]");
    }

    static void f(double[] a) {
        System.out.println("double[]");
    }

    static void f(Object o) {
        System.out.println("Object");
    }

    public static void main(String[] args) {
        f(null);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch vì lời gọi f(null) bị ambiguous.",
      "Chương trình in Object.",
      "int[] và double[] đều cụ thể hơn Object nhưng không cụ thể hơn nhau.",
      "Nếu chỉ còn f(int[]) và f(Object), lời gọi f(null) sẽ chọn f(int[]).",
    ],
    correct: [0, 2, 3],
    explanation:
      "null khớp với mọi reference type. int[] và double[] không có quan hệ kế thừa trực tiếp với nhau nên ambiguous.",
  },
  {
    id: 10,
    title: "Câu 10: Varargs và array signature",
    code: `public class Test {
    static void f(int[] a) {
    }

    static void f(int... a) {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "int... và int[] tạo cùng method signature.",
      "Đây là overload hợp lệ.",
      "Varargs thực chất được biểu diễn như array ở mức signature.",
    ],
    correct: [0, 1, 3],
    explanation:
      "int... chỉ là cú pháp varargs, signature vẫn tương đương int[].",
  },
  {
    id: 11,
    title: "Câu 11: Widening, boxing, varargs",
    code: `public class Test {
    static void f(long x) {
        System.out.println("long");
    }

    static void f(Integer x) {
        System.out.println("Integer");
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
      "Output là Integer.",
      "Widening được ưu tiên trước boxing trong trường hợp này.",
      "Varargs được xét sau fixed-arity method.",
    ],
    correct: [0, 2, 3],
    explanation:
      "Literal 1 là int. Method f(long) dùng widening fixed-arity nên được chọn trước boxing và varargs.",
  },
  {
    id: 12,
    title: "Câu 12: byte chọn overload nào?",
    code: `public class Test {
    static void f(short x) {
        System.out.println("short");
    }

    static void f(int x) {
        System.out.println("int");
    }

    public static void main(String[] args) {
        byte b = 1;
        f(b);
    }
}`,
    options: [
      "Output là short.",
      "Output là int.",
      "byte có thể widening sang short.",
      "f(short) cụ thể hơn f(int) cho đối số byte.",
    ],
    correct: [0, 2, 3],
    explanation:
      "byte có thể mở rộng sang short hoặc int, nhưng short gần hơn nên method f(short) được chọn.",
  },
  {
    id: 13,
    title: "Câu 13: Redeclare biến local",
    code: `public class Test {
    public static void main(String[] args) {
        int x = 1;

        {
            int x = 2;
            System.out.println(x);
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không được khai báo lại biến local x trong block con khi scope của x ngoài vẫn còn hiệu lực.",
      "Chương trình in 2.",
      "Nếu x bên ngoài là field của class thì có thể khai báo local x trong method.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Local variable không được redeclare trong scope lồng nhau. Field thì có thể bị local variable shadow.",
  },
  {
    id: 14,
    title: "Câu 14: Parameter và local variable cùng tên",
    code: `public class Test {
    static void f(int x) {
        int x = 2;
        System.out.println(x);
    }

    public static void main(String[] args) {
        f(1);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không được khai báo local variable trùng tên với parameter trong cùng method.",
      "Chương trình in 2.",
      "Parameter x cũng là một biến local trong scope của method.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Parameter nằm trong scope của method, nên khai báo int x lần nữa là trùng tên.",
  },
  {
    id: 15,
    title: "Câu 15: Field bị shadow bởi local variable",
    code: `class A {
    int x = 1;

    void f() {
        int x = 2;
        System.out.println(x);
        System.out.println(this.x);
    }
}

public class Test {
    public static void main(String[] args) {
        new A().f();
    }
}`,
    options: [
      "Output là 2 rồi 1.",
      "this.x truy cập field của object hiện tại.",
      "Biến local x làm mất hoàn toàn field x nên this.x cũng là 2.",
      "Chương trình compile được.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Tên x trong method ưu tiên local variable. Muốn truy cập field bị shadow thì dùng this.x.",
  },
  {
    id: 16,
    title: "Câu 16: Static block, instance block, constructor",
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
        new B();
    }
}`,
    options: [
      "Output là AS BS AI AC BI BC AI AC BI BC.",
      "Static block của A chạy trước static block của B.",
      "Instance block của A chạy trước constructor A.",
      "Static block chạy lại mỗi lần new B().",
    ],
    correct: [0, 1, 2],
    explanation:
      "Class cha initialize trước class con. Mỗi lần tạo object thì instance block và constructor chạy lại, static block chỉ chạy một lần.",
  },
  {
    id: 17,
    title: "Câu 17: Gọi instance method trong super(...)",
    code: `class A {
    A(int x) {
    }
}

class B extends A {
    B() {
        super(g());
    }

    int g() {
        return 1;
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không được tham chiếu this ngầm trước khi super constructor chạy xong.",
      "g() là instance method nên cần object hiện tại.",
      "Nếu g() là static method thì lời gọi super(g()) có thể hợp lệ.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Lời gọi super(...) là bước đầu tiên để tạo phần object cha. Instance method cần this, mà this chưa sẵn sàng trước super constructor.",
  },
  {
    id: 18,
    title: "Câu 18: private constructor",
    code: `class A {
    private A() {
    }
}

public class Test {
    public static void main(String[] args) {
        A a = new A();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Constructor A() là private nên class Test không gọi được.",
      "Vì A và Test nằm cùng file nên private constructor vẫn gọi được.",
      "Nếu tạo static factory method bên trong A trả về new A(), bên trong A có thể gọi constructor private.",
    ],
    correct: [0, 1, 3],
    explanation:
      "private chỉ cho phép truy cập trong chính class khai báo, không phải toàn bộ file.",
  },
  {
    id: 19,
    title: "Câu 19: Non-static inner class",
    code: `class Outer {
    class Inner {
    }
}

public class Test {
    public static void main(String[] args) {
        Outer.Inner in = new Outer.Inner();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Inner là non-static inner class nên cần một object Outer cụ thể.",
      "Cách tạo đúng có thể là new Outer().new Inner().",
      "new Outer.Inner() luôn hợp lệ với mọi inner class.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Non-static inner class gắn với một instance của outer class, nên phải tạo qua object Outer.",
  },
  {
    id: 20,
    title: "Câu 20: Static nested class",
    code: `class Outer {
    static class Inner {
        int x = 1;
    }
}

public class Test {
    public static void main(String[] args) {
        Outer.Inner in = new Outer.Inner();
        System.out.println(in.x);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là 1.",
      "Static nested class không cần object Outer để khởi tạo.",
      "Phải viết new Outer().new Inner() thì mới đúng.",
    ],
    correct: [0, 1, 2],
    explanation:
      "static nested class thuộc về class Outer, không cần instance Outer.",
  },
  {
    id: 21,
    title: "Câu 21: instanceof với null",
    code: `public class Test {
    public static void main(String[] args) {
        Object o = null;

        System.out.println(null instanceof String);
        System.out.println(o instanceof Object);
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in false.",
      "instanceof với null không gây NullPointerException.",
      "null instanceof String gây lỗi biên dịch.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Bất kỳ biểu thức null nào kiểm tra instanceof với reference type đều cho kết quả false.",
  },
  {
    id: 22,
    title: "Câu 22: Cast null",
    code: `public class Test {
    public static void main(String[] args) {
        Object o = null;
        String s = (String) o;

        System.out.println(s);
        System.out.println(s.length());
    }
}`,
    options: [
      "Ép kiểu null sang String là hợp lệ.",
      "Dòng System.out.println(s) in null.",
      "Dòng s.length() gây NullPointerException.",
      "Dòng String s = (String) o gây ClassCastException.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Cast null sang reference type hợp lệ và vẫn là null. Gọi method trên null mới gây NullPointerException.",
  },
  {
    id: 23,
    title: "Câu 23: StringBuilder equals",
    code: `public class Test {
    public static void main(String[] args) {
        StringBuilder a = new StringBuilder("x");
        StringBuilder b = new StringBuilder("x");

        System.out.println(a == b);
        System.out.println(a.equals(b));
        System.out.println(a.toString().equals(b.toString()));
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in false.",
      "Dòng thứ ba in true.",
      "StringBuilder override equals để so sánh nội dung giống String.",
    ],
    correct: [0, 1, 2],
    explanation:
      "StringBuilder không override equals theo nội dung, nên equals vẫn so sánh reference như Object.",
  },
  {
    id: 24,
    title: "Câu 24: So sánh array",
    code: `import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        int[] a = {1, 2};
        int[] b = {1, 2};

        System.out.println(a == b);
        System.out.println(a.equals(b));
        System.out.println(Arrays.equals(a, b));
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in false.",
      "Dòng thứ ba in true.",
      "Array override equals để so sánh từng phần tử.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Array không override equals theo nội dung. Muốn so sánh phần tử dùng Arrays.equals.",
  },
  {
    id: 25,
    title: "Câu 25: Arrays.asList",
    code: `import java.util.Arrays;
import java.util.List;

public class Test {
    public static void main(String[] args) {
        List<String> list = Arrays.asList("A", "B");

        list.set(0, "X");
        System.out.println(list);

        list.add("C");
        System.out.println("DONE");
    }
}`,
    options: [
      "Chương trình in [X, B] trước.",
      "list.set(0, \"X\") hợp lệ.",
      "list.add(\"C\") gây UnsupportedOperationException.",
      "DONE được in ra.",
    ],
    correct: [0, 1, 2],
    explanation:
      "List từ Arrays.asList có kích thước cố định. set được, nhưng add/remove làm đổi kích thước nên lỗi runtime.",
  },
  {
    id: 26,
    title: "Câu 26: Sửa ArrayList trong enhanced for",
    code: `import java.util.ArrayList;
import java.util.Arrays;

public class Test {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3));

        for (Integer x : list) {
            if (x == 1) {
                list.add(4);
            }
        }

        System.out.println(list);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có thể xảy ra ConcurrentModificationException khi chạy.",
      "Enhanced for dùng Iterator ngầm.",
      "Chương trình chắc chắn in [1, 2, 3, 4] bình thường.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Sửa cấu trúc ArrayList trực tiếp trong lúc đang duyệt bằng enhanced for thường làm Iterator phát hiện concurrent modification.",
  },
  {
    id: 27,
    title: "Câu 27: Iterator remove",
    code: `import java.util.ArrayList;
import java.util.Arrays;
import java.util.Iterator;

public class Test {
    public static void main(String[] args) {
        ArrayList<Integer> list = new ArrayList<>(Arrays.asList(1, 2, 3, 4));

        Iterator<Integer> it = list.iterator();

        while (it.hasNext()) {
            int x = it.next();

            if (x % 2 == 0) {
                it.remove();
            }
        }

        System.out.println(list);
    }
}`,
    options: [
      "Output là [1, 3].",
      "Dùng it.remove() sau it.next() là cách xóa an toàn khi đang duyệt bằng Iterator.",
      "Chương trình gây ConcurrentModificationException.",
      "Nếu gọi it.remove() hai lần liên tiếp sau một lần next() thì có thể lỗi.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Iterator.remove() hợp lệ nếu gọi sau next() và không gọi lặp lại nhiều lần cho cùng một phần tử.",
  },
  {
    id: 28,
    title: "Câu 28: Enhanced for với array null",
    code: `public class Test {
    public static void main(String[] args) {
        int[] a = null;

        for (int x : a) {
            System.out.println(x);
        }

        System.out.println("DONE");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có NullPointerException khi chạy đến vòng for.",
      "DONE không được in ra.",
      "Chương trình lỗi biên dịch vì enhanced for không cho phép array null.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Biến array có thể là null về mặt compile-time. Khi runtime cố duyệt null thì NullPointerException.",
  },
  {
    id: 29,
    title: "Câu 29: catch checked exception không thể xảy ra",
    code: `import java.io.IOException;

public class Test {
    public static void main(String[] args) {
        try {
            System.out.println("A");
        } catch (IOException e) {
            System.out.println("B");
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "IOException là checked exception.",
      "catch IOException không hợp lệ vì try block không thể ném IOException.",
      "Chương trình compile được và in A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Với checked exception, catch phải tương ứng với exception có thể được ném từ try block.",
  },
  {
    id: 30,
    title: "Câu 30: catch unchecked exception không xảy ra",
    code: `public class Test {
    public static void main(String[] args) {
        try {
            System.out.println("A");
        } catch (NullPointerException e) {
            System.out.println("B");
        }

        System.out.println("C");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là A rồi C.",
      "NullPointerException là unchecked exception.",
      "catch NullPointerException luôn lỗi biên dịch nếu try block không ném rõ ràng.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Unchecked exception có thể catch dù try block không ném rõ ràng exception đó.",
  },
  {
    id: 31,
    title: "Câu 31: Multi-catch với hai exception có quan hệ kế thừa",
    code: `import java.io.FileNotFoundException;
import java.io.IOException;

public class Test {
    public static void main(String[] args) {
        try {
            throw new FileNotFoundException();
        } catch (IOException | FileNotFoundException e) {
            System.out.println("caught");
        }
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không được đặt hai kiểu exception có quan hệ cha-con trong cùng một multi-catch.",
      "FileNotFoundException là con của IOException.",
      "Chương trình in caught.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Trong multi-catch, các alternative không được có quan hệ subclass-superclass với nhau.",
  },
  {
    id: 32,
    title: "Câu 32: Override và checked exception khi cha không throws",
    code: `import java.io.IOException;

class A {
    void f() {
    }
}

class B extends A {
    void f() throws IOException {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "B.f() không được thêm checked exception IOException khi override A.f().",
      "Nếu đổi IOException thành RuntimeException thì có thể hợp lệ.",
      "Override cho phép ném checked exception rộng hơn tùy ý.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Override không được thêm checked exception mới/rộng hơn so với method cha. Unchecked exception thì không bị ràng buộc như vậy.",
  },
  {
    id: 33,
    title: "Câu 33: Override và unchecked exception",
    code: `class A {
    void f() {
    }
}

class B extends A {
    void f() throws RuntimeException {
    }
}

public class Test {
    public static void main(String[] args) {
        new B().f();
        System.out.println("OK");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là OK.",
      "RuntimeException là unchecked exception.",
      "B.f() bắt buộc phải được gọi trong try-catch.",
    ],
    correct: [0, 1, 2],
    explanation:
      "throws RuntimeException không bắt buộc caller phải catch hoặc khai báo throws. Method body không ném gì nên in OK.",
  },
  {
    id: 34,
    title: "Câu 34: Override khác primitive return type",
    code: `class A {
    int f() {
        return 1;
    }
}

class B extends A {
    long f() {
        return 1L;
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Không thể override method int f() bằng method long f() cùng tham số.",
      "int và long là primitive nên không có covariant return.",
      "Đây là overload hợp lệ vì return type khác nhau.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Return type không đủ để overload. Với override, primitive return type phải tương thích chính xác, không có covariant primitive.",
  },
  {
    id: 35,
    title: "Câu 35: Overload main",
    code: `public class Test {
    public static void main(String[] args) {
        main(1);
    }

    static void main(int x) {
        System.out.println("int");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Khi chạy class Test, JVM gọi main(String[] args).",
      "Output là int.",
      "Không được overload method main.",
    ],
    correct: [0, 1, 2],
    explanation:
      "main cũng là method bình thường nên overload được. Entry point vẫn là public static void main(String[] args).",
  },
  {
    id: 36,
    title: "Câu 36: super gọi method cha",
    code: `class A {
    void f() {
        System.out.print("A");
    }
}

class B extends A {
    void f() {
        super.f();
        System.out.print("B");
    }
}

public class Test {
    public static void main(String[] args) {
        A obj = new B();
        obj.f();
    }
}`,
    options: [
      "Output là AB.",
      "obj.f() dispatch đến B.f().",
      "super.f() trong B.f() gọi implementation của A.",
      "Output là A vì biến obj có kiểu A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Instance method dùng dynamic dispatch. B.f() chạy, trong đó super.f() gọi bản f của A.",
  },
  {
    id: 37,
    title: "Câu 37: switch với enum và fall-through",
    code: `enum E {
    A, B
}

public class Test {
    public static void main(String[] args) {
        E e = E.A;

        switch (e) {
            case A:
                System.out.print("A");
            default:
                System.out.print("D");
        }
    }
}`,
    options: [
      "Output là AD.",
      "case A không có break nên rơi xuống default.",
      "Trong switch enum, case viết A thay vì E.A.",
      "Chương trình lỗi biên dịch vì default không được đặt sau case.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Switch vào case A, in A, không có break nên tiếp tục chạy default và in D.",
  },
  {
    id: 38,
    title: "Câu 38: Constructor của enum",
    code: `enum E {
    A;

    public E() {
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Constructor của enum không được public.",
      "Constructor enum mặc định là private.",
      "Enum không được có constructor dưới bất kỳ hình thức nào.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Enum có thể có constructor, nhưng constructor không được public/protected; nó chỉ dùng nội bộ để tạo các enum constant.",
  },
  {
    id: 39,
    title: "Câu 39: Lambda và functional interface",
    code: `interface I {
    void a();
    void b();
}

public class Test {
    public static void main(String[] args) {
        I i = () -> System.out.println("X");
        i.a();
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "I không phải functional interface vì có hai abstract method.",
      "Lambda chỉ gán được cho interface có đúng một abstract method.",
      "Chương trình in X.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Một lambda cần target type là functional interface. Interface I có hai abstract method nên không hợp lệ.",
  },
  {
    id: 40,
    title: "Câu 40: Lambda capture biến local",
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
      "Chương trình in 2.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Lambda chỉ capture được local variable final hoặc effectively final. Gán lại x sau khi lambda dùng x làm mất điều kiện đó.",
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
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-amber-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề luyện Java OOP số 3 - 40 câu
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
                <div className="mt-2 text-amber-300">
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
                      <p className="text-sm font-semibold text-amber-400">
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
                                  ? "border-amber-500/70 bg-amber-500/10"
                                  : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-amber-400"
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
                      <p className="text-sm font-bold text-amber-300">
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
                          ? "border-amber-500/60 bg-amber-500/15 text-amber-200"
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
                  className="w-full rounded-2xl bg-amber-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-amber-300"
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
                    <span className="font-bold text-amber-300">
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