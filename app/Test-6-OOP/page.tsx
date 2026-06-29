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
    title: "Câu 1: Hai biến cùng trỏ một object",
    code: `class Box {
    int v;
}

public class Test {
    public static void main(String[] args) {
        Box a = new Box();
        Box b = a;

        a.v = 5;
        b.v = 7;

        System.out.println(a.v);
        System.out.println(b.v);
        System.out.println(a == b);
    }
}`,
    options: [
      "Dòng đầu in 7.",
      "Dòng thứ hai in 7.",
      "Dòng thứ ba in true.",
      "b = a tạo một object Box mới giống hệt a.",
    ],
    correct: [0, 1, 2],
    explanation:
      "a và b cùng trỏ tới một object. Sửa qua a hay b đều sửa cùng object đó. b = a không tạo object mới.",
  },
  {
    id: 2,
    title: "Câu 2: Sửa object rồi gán lại tham chiếu",
    code: `class Box {
    int v;
}

public class Test {
    static void change(Box b) {
        b.v = 2;
        b = new Box();
        b.v = 3;
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
      "Output là 2.",
      "Output là 3.",
      "b = new Box() chỉ làm biến b trong method trỏ sang object mới.",
    ],
    correct: [1, 3],
    explanation:
      "Ban đầu b copy reference của box nên b.v = 2 sửa object thật. Sau đó b = new Box() chỉ đổi biến local b, không đổi box ở main.",
  },
  {
    id: 3,
    title: "Câu 3: Chỉ gán lại tham chiếu trong method",
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
      "Object ban đầu không bị sửa.",
      "Java truyền reference theo tham chiếu nên box ở main bị đổi sang object mới.",
    ],
    correct: [0, 2],
    explanation:
      "Java truyền tham trị. Giá trị được truyền là bản copy của reference. Gán b sang object mới không làm box ở main đổi.",
  },
  {
    id: 4,
    title: "Câu 4: Mảng và alias",
    code: `public class Test {
    public static void main(String[] args) {
        int[] a = {1, 2};
        int[] b = a;

        b[0] = 9;
        b = new int[] {3, 4};

        System.out.println(a[0]);
        System.out.println(b[0]);
    }
}`,
    options: [
      "Dòng đầu in 9.",
      "Dòng thứ hai in 3.",
      "Sau b = new int[] {3, 4}, a cũng trỏ sang mảng mới.",
      "b[0] = 9 sửa mảng mà cả a và b đang cùng trỏ tới lúc đó.",
    ],
    correct: [0, 1, 3],
    explanation:
      "Ban đầu a và b cùng trỏ một mảng. Sau khi b gán sang mảng mới, a vẫn trỏ mảng cũ.",
  },
  {
    id: 5,
    title: "Câu 5: Tham số là mảng",
    code: `public class Test {
    static void change(int[] arr) {
        arr[0] = 7;
        arr = new int[] {8, 9};
        arr[0] = 10;
    }

    public static void main(String[] args) {
        int[] a = {1, 2};

        change(a);

        System.out.println(a[0]);
        System.out.println(a.length);
    }
}`,
    options: [
      "Dòng đầu in 7.",
      "Dòng đầu in 10.",
      "Dòng thứ hai in 2.",
      "arr = new int[] {8, 9} không làm a ở main trỏ sang mảng mới.",
    ],
    correct: [0, 2, 3],
    explanation:
      "arr[0] = 7 sửa mảng gốc. Sau đó arr trỏ sang mảng mới, nhưng a ở main không đổi.",
  },
  {
    id: 6,
    title: "Câu 6: String truyền vào method",
    code: `public class Test {
    static void change(String s) {
        s = s + "B";
    }

    public static void main(String[] args) {
        String s = "A";

        change(s);

        System.out.println(s);
    }
}`,
    options: [
      "Output là A.",
      "Output là AB.",
      "String là immutable.",
      "s trong method là bản copy của reference ban đầu.",
    ],
    correct: [0, 2, 3],
    explanation:
      "s + \"B\" tạo String mới và biến local s trỏ sang đó. Biến s trong main vẫn trỏ tới \"A\".",
  },
  {
    id: 7,
    title: "Câu 7: StringBuilder bị sửa qua reference",
    code: `public class Test {
    static void change(StringBuilder sb) {
        sb.append("B");
    }

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("A");

        change(sb);

        System.out.println(sb);
    }
}`,
    options: [
      "Output là A.",
      "Output là AB.",
      "StringBuilder là mutable.",
      "Method change sửa chính object mà sb ở main đang trỏ tới.",
    ],
    correct: [1, 2, 3],
    explanation:
      "StringBuilder mutable nên append sửa object hiện tại. Reference truyền vào method vẫn trỏ tới object đó.",
  },
  {
    id: 8,
    title: "Câu 8: StringBuilder vừa sửa vừa gán lại",
    code: `public class Test {
    static void change(StringBuilder sb) {
        sb.append("B");

        sb = new StringBuilder("C");
        sb.append("D");
    }

    public static void main(String[] args) {
        StringBuilder sb = new StringBuilder("A");

        change(sb);

        System.out.println(sb);
    }
}`,
    options: [
      "Output là AB.",
      "Output là CD.",
      "Output là ABD.",
      "Sau khi sb = new StringBuilder(\"C\"), biến sb trong main không đổi.",
    ],
    correct: [0, 3],
    explanation:
      "append lần đầu sửa object gốc thành AB. Sau đó biến local sb trỏ sang object mới CD, nhưng main vẫn giữ object AB.",
  },
  {
    id: 9,
    title: "Câu 9: final reference",
    code: `class Box {
    int v;
}

public class Test {
    public static void main(String[] args) {
        final Box b = new Box();

        b.v = 1;
        b.v = 2;

        b = new Box();

        System.out.println(b.v);
    }
}`,
    options: [
      "Chương trình lỗi biên dịch.",
      "Dòng b.v = 1 hợp lệ.",
      "Dòng b.v = 2 hợp lệ.",
      "Dòng b = new Box() không hợp lệ.",
      "final làm object Box bên trong không thể bị sửa field.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "final reference không được gán sang object khác, nhưng object mà nó trỏ tới vẫn có thể bị sửa nội dung.",
  },
  {
    id: 10,
    title: "Câu 10: == và equals khi chưa override",
    code: `class Box {
    int v;

    Box(int v) {
        this.v = v;
    }
}

public class Test {
    public static void main(String[] args) {
        Box a = new Box(1);
        Box b = new Box(1);
        Box c = a;

        System.out.println(a == b);
        System.out.println(a == c);
        System.out.println(a.equals(b));
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in true.",
      "Dòng thứ ba in false.",
      "a và b có cùng v nên a == b là true.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Box chưa override equals nên equals dùng logic của Object, tức so sánh reference.",
  },
  {
    id: 11,
    title: "Câu 11: String reference và nội dung",
    code: `public class Test {
    public static void main(String[] args) {
        String a = "ab";
        String b = new String("ab");
        String c = b;

        System.out.println(a == b);
        System.out.println(b == c);
        System.out.println(a.equals(c));
    }
}`,
    options: [
      "Dòng đầu in false.",
      "Dòng thứ hai in true.",
      "Dòng thứ ba in true.",
      "c trỏ cùng object với b.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "b là object mới, c copy reference của b. String.equals so sánh nội dung.",
  },
  {
    id: 12,
    title: "Câu 12: Constructor nhận reference",
    code: `class Box {
    int v;

    Box(int v) {
        this.v = v;
    }
}

class User {
    Box box;

    User(Box box) {
        this.box = box;
    }
}

public class Test {
    public static void main(String[] args) {
        Box box = new Box(1);

        User u1 = new User(box);
        User u2 = new User(u1.box);

        u2.box.v = 5;

        System.out.println(u1.box.v);
        System.out.println(u1.box == u2.box);
    }
}`,
    options: [
      "Dòng đầu in 5.",
      "Dòng thứ hai in true.",
      "u1.box và u2.box trỏ cùng một Box.",
      "new User(u1.box) tự động clone object Box.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Constructor chỉ nhận và lưu reference. Nó không tự clone object.",
  },
  {
    id: 13,
    title: "Câu 13: Copy object thủ công",
    code: `class Box {
    int v;

    Box(int v) {
        this.v = v;
    }
}

class User {
    Box box;

    User(Box box) {
        this.box = new Box(box.v);
    }
}

public class Test {
    public static void main(String[] args) {
        Box box = new Box(1);

        User u1 = new User(box);
        User u2 = new User(u1.box);

        u2.box.v = 5;

        System.out.println(u1.box.v);
        System.out.println(u2.box.v);
        System.out.println(u1.box == u2.box);
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in 5.",
      "Dòng thứ ba in false.",
      "u1.box và u2.box vẫn là cùng object vì đều sinh ra từ box ban đầu.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Constructor tạo new Box(box.v), nên mỗi User giữ một Box riêng.",
  },
  {
    id: 14,
    title: "Câu 14: Alias với hàng trong mảng 2 chiều",
    code: `public class Test {
    public static void main(String[] args) {
        int[][] a = {
            {1, 2},
            {3, 4}
        };

        int[] row = a[0];

        row[1] = 9;
        row = new int[] {7, 8};

        System.out.println(a[0][1]);
        System.out.println(row[1]);
    }
}`,
    options: [
      "Dòng đầu in 9.",
      "Dòng thứ hai in 8.",
      "row ban đầu trỏ tới a[0].",
      "Sau row = new int[] {7, 8}, a[0] cũng trỏ sang mảng mới.",
    ],
    correct: [0, 1, 2],
    explanation:
      "row ban đầu alias với a[0]. Gán row sang mảng mới không làm a[0] đổi.",
  },
  {
    id: 15,
    title: "Câu 15: clone mảng chứa object",
    code: `public class Test {
    public static void main(String[] args) {
        StringBuilder[] a = {
            new StringBuilder("A")
        };

        StringBuilder[] b = a.clone();

        b[0].append("B");
        b[0] = new StringBuilder("C");

        System.out.println(a[0]);
        System.out.println(b[0]);
    }
}`,
    options: [
      "Dòng đầu in AB.",
      "Dòng thứ hai in C.",
      "a.clone() tạo mảng mới.",
      "a.clone() clone sâu cả StringBuilder bên trong.",
    ],
    correct: [0, 1, 2],
    explanation:
      "clone mảng object là shallow copy. Mảng mới nhưng phần tử ban đầu vẫn trỏ tới cùng StringBuilder.",
  },
  {
    id: 16,
    title: "Câu 16: Enhanced for và gán lại biến vòng lặp",
    code: `public class Test {
    public static void main(String[] args) {
        StringBuilder[] arr = {
            new StringBuilder("A"),
            new StringBuilder("B")
        };

        for (StringBuilder s : arr) {
            s = new StringBuilder("X");
        }

        System.out.println(arr[0]);
        System.out.println(arr[1]);
    }
}`,
    options: [
      "Dòng đầu in A.",
      "Dòng thứ hai in B.",
      "Gán s = new StringBuilder(\"X\") không làm phần tử trong arr đổi.",
      "Output là X rồi X.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Biến s trong enhanced for là biến local nhận bản copy reference của từng phần tử. Gán lại s không sửa mảng.",
  },
  {
    id: 17,
    title: "Câu 17: Enhanced for và sửa object",
    code: `public class Test {
    public static void main(String[] args) {
        StringBuilder[] arr = {
            new StringBuilder("A"),
            new StringBuilder("B")
        };

        for (StringBuilder s : arr) {
            s.append("X");
        }

        System.out.println(arr[0]);
        System.out.println(arr[1]);
    }
}`,
    options: [
      "Dòng đầu in AX.",
      "Dòng thứ hai in BX.",
      "s.append(\"X\") sửa object mà phần tử mảng đang trỏ tới.",
      "Enhanced for luôn tạo bản sao object độc lập.",
    ],
    correct: [0, 1, 2],
    explanation:
      "s là bản copy reference, nhưng vẫn trỏ tới cùng object nên gọi append sẽ sửa object trong mảng.",
  },
  {
    id: 18,
    title: "Câu 18: ArrayList giữ reference",
    code: `import java.util.ArrayList;

class Box {
    int v;

    Box(int v) {
        this.v = v;
    }
}

public class Test {
    public static void main(String[] args) {
        ArrayList<Box> list = new ArrayList<>();

        Box b = new Box(1);
        list.add(b);

        b.v = 2;
        list.get(0).v = 3;

        System.out.println(b.v);
        System.out.println(list.get(0) == b);
    }
}`,
    options: [
      "Dòng đầu in 3.",
      "Dòng thứ hai in true.",
      "ArrayList lưu reference tới object Box.",
      "list.add(b) tạo một bản copy độc lập của Box.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Collection lưu reference, không tự copy object. list.get(0) và b cùng trỏ một Box.",
  },
  {
    id: 19,
    title: "Câu 19: list.set đổi reference trong list",
    code: `import java.util.ArrayList;

class Box {
    int v;

    Box(int v) {
        this.v = v;
    }
}

public class Test {
    public static void main(String[] args) {
        ArrayList<Box> list = new ArrayList<>();

        Box a = new Box(1);
        list.add(a);

        Box old = list.get(0);

        list.set(0, new Box(2));
        old.v = 9;

        System.out.println(list.get(0).v);
        System.out.println(a.v);
        System.out.println(old == a);
    }
}`,
    options: [
      "Dòng đầu in 2.",
      "Dòng thứ hai in 9.",
      "Dòng thứ ba in true.",
      "old.v = 9 sửa object mới vừa được list.set đưa vào list.",
    ],
    correct: [0, 1, 2],
    explanation:
      "old và a vẫn trỏ tới Box cũ. list.set làm list trỏ sang Box mới, không làm old/a đổi theo.",
  },
  {
    id: 20,
    title: "Câu 20: Arrays.asList và mảng gốc",
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
    }
}`,
    options: [
      "Dòng đầu in [X, Y].",
      "Dòng thứ hai in [X, Y].",
      "List tạo bởi Arrays.asList được backed bởi mảng gốc.",
      "list.set(1, \"Y\") không ảnh hưởng arr.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Arrays.asList tạo list kích thước cố định backed bởi array. Thay đổi phần tử qua list hoặc array phản ánh qua bên kia.",
  },
  {
    id: 21,
    title: "Câu 21: Array covariance",
    code: `public class Test {
    public static void main(String[] args) {
        Object[] arr = new String[2];

        arr[0] = "A";
        System.out.print(arr[0] + " ");

        arr[1] = new Object();

        System.out.print("DONE");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output có A trước khi lỗi xảy ra.",
      "Dòng arr[1] = new Object() gây ArrayStoreException.",
      "Object[] arr = new String[2] không compile được.",
    ],
    correct: [0, 1, 2],
    explanation:
      "String[] là subtype của Object[] nên compile được. Nhưng runtime vẫn kiểm tra kiểu thật của mảng là String[].",
  },
  {
    id: 22,
    title: "Câu 22: Downcast đúng object thật",
    code: `class A {
}

class B extends A {
}

public class Test {
    public static void main(String[] args) {
        A a = new B();

        B b = (B) a;

        System.out.println(a == b);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Output là true.",
      "Cast thành B hợp lệ ở runtime vì object thật là B.",
      "Cast tạo một object B mới.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Cast chỉ đổi cách nhìn reference, không tạo object mới. Object thật đang là B nên downcast thành B hợp lệ.",
  },
  {
    id: 23,
    title: "Câu 23: Downcast sai object thật",
    code: `class A {
}

class B extends A {
}

public class Test {
    public static void main(String[] args) {
        A a = new A();

        B b = (B) a;

        System.out.println(b);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có ClassCastException khi chạy.",
      "Cast compile được vì B là subclass của A.",
      "Cast tạo được object B từ object A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Compiler cho phép downcast từ A sang B, nhưng runtime kiểm tra object thật. Object thật là A, không phải B.",
  },
  {
    id: 24,
    title: "Câu 24: Cast qua Object",
    code: `class A {
}

class B {
}

public class Test {
    public static void main(String[] args) {
        Object o = new A();

        B b = (B) o;

        System.out.println(b);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có ClassCastException khi chạy.",
      "Object reference có thể được cast xuống B ở compile-time.",
      "Vì A và B không liên quan nên dòng B b = (B) o luôn lỗi biên dịch.",
    ],
    correct: [0, 1, 2],
    explanation:
      "o có kiểu compile-time là Object nên compiler cho cast xuống B. Runtime thấy object thật là A nên ném ClassCastException.",
  },
  {
    id: 25,
    title: "Câu 25: Cast sang interface",
    code: `interface I {
}

class A {
}

public class Test {
    public static void main(String[] args) {
        Object o = new A();

        I i = (I) o;

        System.out.println(i);
    }
}`,
    options: [
      "Chương trình compile được.",
      "Có ClassCastException khi chạy.",
      "A không implement I.",
      "Cast sang interface luôn thành công.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Cast từ Object sang interface compile được. Runtime kiểm tra object thật có implement interface đó không.",
  },
  {
    id: 26,
    title: "Câu 26: instanceof với interface",
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
      "Một object class A có thể vừa là A vừa là I.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "A implements I nên object new A() vừa là A vừa là I.",
  },
  {
    id: 27,
    title: "Câu 27: Field hiding với reference",
    code: `class Box {
    String name;

    Box(String name) {
        this.name = name;
    }
}

class A {
    Box box = new Box("A");
}

class B extends A {
    Box box = new Box("B");
}

public class Test {
    public static void main(String[] args) {
        A ref = new B();

        ref.box.name = "X";

        System.out.println(((B) ref).box.name);
        System.out.println(ref.box.name);
    }
}`,
    options: [
      "Dòng đầu in B.",
      "Dòng thứ hai in X.",
      "ref.box truy cập field box của A.",
      "((B) ref).box truy cập field box của B.",
      "Field box của B override field box của A.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Field không override, chỉ bị hide. ref.box xét theo kiểu tham chiếu A, còn ((B) ref).box xét theo B.",
  },
  {
    id: 28,
    title: "Câu 28: Method override trả về reference",
    code: `class Box {
    String name;

    Box(String name) {
        this.name = name;
    }
}

class A {
    Box get() {
        return new Box("A");
    }
}

class B extends A {
    Box box = new Box("B");

    Box get() {
        return box;
    }
}

public class Test {
    public static void main(String[] args) {
        A a = new B();

        Box x = a.get();
        Box y = ((B) a).box;

        x.name = "X";

        System.out.println(x == y);
        System.out.println(y.name);
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in X.",
      "a.get() gọi B.get() vì method instance có dynamic dispatch.",
      "B.get() trả về reference tới field box trong B.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "a có kiểu A nhưng object thật là B, nên B.get() chạy và trả về cùng Box với ((B)a).box.",
  },
  {
    id: 29,
    title: "Câu 29: Static field hiding và reference",
    code: `class Box {
    String name;

    Box(String name) {
        this.name = name;
    }
}

class A {
    static Box box = new Box("A");
}

class B extends A {
    static Box box = new Box("B");
}

public class Test {
    public static void main(String[] args) {
        A a = new B();

        Box x = a.box;
        Box y = ((B) a).box;

        x.name = "X";

        System.out.println(A.box.name);
        System.out.println(B.box.name);
        System.out.println(x == y);
    }
}`,
    options: [
      "Dòng đầu in X.",
      "Dòng thứ hai in B.",
      "Dòng thứ ba in false.",
      "Static field được chọn theo kiểu tham chiếu/class, không theo object runtime.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "a.box chọn A.box. ((B)a).box chọn B.box. Hai static field là hai field khác nhau.",
  },
  {
    id: 30,
    title: "Câu 30: Null trong mảng object",
    code: `class Box {
    int v;
}

public class Test {
    public static void main(String[] args) {
        Box[] arr = new Box[1];

        Box b = arr[0];

        System.out.println(b);

        b.v = 1;

        System.out.println("DONE");
    }
}`,
    options: [
      "Chương trình compile được.",
      "Dòng System.out.println(b) in null.",
      "Dòng b.v = 1 gây NullPointerException.",
      "new Box[1] tự tạo sẵn một object Box ở arr[0].",
    ],
    correct: [0, 1, 2],
    explanation:
      "Mảng object chỉ chứa các reference. Phần tử mặc định là null, không tự tạo object bên trong.",
  },
  {
    id: 31,
    title: "Câu 31: append trả về chính object",
    code: `public class Test {
    public static void main(String[] args) {
        StringBuilder a = new StringBuilder("x");

        StringBuilder b = a.append("y");

        System.out.println(a == b);
        System.out.println(a);
        System.out.println(b);
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Hai dòng sau đều in xy.",
      "StringBuilder.append trả về chính object StringBuilder sau khi sửa.",
      "b trỏ tới object mới hoàn toàn khác a.",
    ],
    correct: [0, 1, 2],
    explanation:
      "append sửa object hiện tại rồi trả về chính reference đó.",
  },
  {
    id: 32,
    title: "Câu 32: String immutable và reference cũ",
    code: `public class Test {
    public static void main(String[] args) {
        String s = "A";
        String t = s;

        s += "B";

        System.out.println(s);
        System.out.println(t);
        System.out.println(s == t);
    }
}`,
    options: [
      "Dòng đầu in AB.",
      "Dòng thứ hai in A.",
      "Dòng thứ ba in false.",
      "s += \"B\" sửa trực tiếp object String ban đầu mà t đang trỏ tới.",
    ],
    correct: [0, 1, 2],
    explanation:
      "String immutable. s += \"B\" tạo String mới cho s, còn t vẫn trỏ tới \"A\".",
  },
  {
    id: 33,
    title: "Câu 33: Overload xét kiểu tham chiếu",
    code: `class A {
}

class B extends A {
}

public class Test {
    static void f(A a) {
        System.out.println("A");
    }

    static void f(B b) {
        System.out.println("B");
    }

    public static void main(String[] args) {
        A x = new B();

        f(x);
        f((B) x);
    }
}`,
    options: [
      "Dòng đầu in A.",
      "Dòng thứ hai in B.",
      "Overload được chọn ở compile-time dựa trên kiểu biểu thức.",
      "f(x) chọn B vì object thật của x là B.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Overload không dùng dynamic dispatch. x có kiểu compile-time là A nên f(x) chọn f(A). Cast sang B thì chọn f(B).",
  },
  {
    id: 34,
    title: "Câu 34: Override dùng object thật",
    code: `class A {
    void f() {
        System.out.print("A");
    }
}

class B extends A {
    void f() {
        System.out.print("B");
    }
}

public class Test {
    public static void main(String[] args) {
        B b = new B();
        A a = b;

        a.f();
        b.f();
    }
}`,
    options: [
      "Output là BB.",
      "a và b cùng trỏ tới một object B.",
      "a.f() gọi B.f() vì instance method override dùng dynamic dispatch.",
      "Output là AB vì a có kiểu A.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Instance method override được quyết định bởi object thật lúc runtime. Object thật là B.",
  },
  {
    id: 35,
    title: "Câu 35: null và overload với biến Object",
    code: `public class Test {
    static void f(String s) {
        System.out.println("String");
    }

    static void f(Object o) {
        System.out.println("Object");
    }

    public static void main(String[] args) {
        Object x = null;

        f(null);
        f(x);
    }
}`,
    options: [
      "Dòng đầu in String.",
      "Dòng thứ hai in Object.",
      "f(null) chọn overload cụ thể hơn là String.",
      "f(x) chọn theo kiểu compile-time của x là Object.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "null literal chọn method cụ thể hơn giữa String và Object. Nhưng x có kiểu Object nên f(x) chọn f(Object).",
  },
  {
    id: 36,
    title: "Câu 36: clone object đơn giản",
    code: `class Box implements Cloneable {
    int v;

    public Object clone() throws CloneNotSupportedException {
        return super.clone();
    }
}

public class Test {
    public static void main(String[] args) throws Exception {
        Box a = new Box();
        a.v = 1;

        Box b = (Box) a.clone();
        b.v = 2;

        System.out.println(a.v);
        System.out.println(b.v);
        System.out.println(a == b);
    }
}`,
    options: [
      "Dòng đầu in 1.",
      "Dòng thứ hai in 2.",
      "Dòng thứ ba in false.",
      "clone() ở đây tạo object Box khác với a.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "super.clone() tạo object mới cùng kiểu. Với field primitive int, giá trị được copy sang object mới.",
  },
  {
    id: 37,
    title: "Câu 37: clone nông với object lồng bên trong",
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
      "super.clone() mặc định clone sâu toàn bộ object lồng bên trong.",
    ],
    correct: [0, 1, 2],
    explanation:
      "clone mặc định là shallow copy. h1 và h2 là hai Holder khác nhau, nhưng cùng trỏ tới một Box bên trong.",
  },
  {
    id: 38,
    title: "Câu 38: equals với subclass",
    code: `class A {
    int id;

    A(int id) {
        this.id = id;
    }

    public boolean equals(Object o) {
        return o instanceof A && ((A) o).id == id;
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
        B b = new B(1);

        System.out.println(a.equals(b));
        System.out.println(b.equals(a));
    }
}`,
    options: [
      "Dòng đầu in true.",
      "Dòng thứ hai in true.",
      "b kế thừa equals từ A.",
      "instanceof A đúng với object B vì B extends A.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "B là subtype của A, nên b instanceof A là true. equals trong A so sánh id.",
  },
  {
    id: 39,
    title: "Câu 39: equals overload nhầm trong HashSet",
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
      "HashSet dùng equals(Object), không dùng equals(P) như override.",
      "Vì hashCode giống nhau nên contains chắc chắn true.",
    ],
    correct: [0, 1, 2],
    explanation:
      "Method đúng để override là equals(Object). Ở đây equals(P) chỉ là overload, nên HashSet vẫn dùng Object.equals để so reference.",
  },
  {
    id: 40,
    title: "Câu 40: Lambda capture reference",
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
      "Lambda capture bản copy sâu của object Box tại thời điểm tạo lambda.",
    ],
    correct: [0, 1, 2, 3],
    explanation:
      "Lambda capture reference tới object. Biến box không bị gán lại nên vẫn effectively final. Object bên trong vẫn có thể bị sửa.",
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
          <p className="mb-2 text-sm font-semibold uppercase tracking-[0.25em] text-rose-400">
            Java OOP Final Practice
          </p>

          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight text-white md:text-4xl">
                Đề luyện Java OOP số 6 - 40 câu tham chiếu
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
                <div className="mt-2 text-rose-300">
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
                      <p className="text-sm font-semibold text-rose-400">
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
                              ? "border-rose-500/70 bg-rose-500/10"
                              : "border-slate-800 bg-slate-950 hover:border-slate-600"
                          } ${submitted ? "cursor-default" : ""}`}
                        >
                          <input
                            type="checkbox"
                            checked={checked}
                            disabled={submitted}
                            onChange={() => toggleAnswer(q.id, optionIndex)}
                            className="mt-1 h-4 w-4 rounded border-slate-600 bg-slate-900 accent-rose-400"
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
                      <p className="text-sm font-bold text-rose-300">
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
                        ? "border-rose-500/60 bg-rose-500/15 text-rose-200"
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
                  className="w-full rounded-2xl bg-rose-400 px-4 py-3 text-sm font-black text-slate-950 transition hover:bg-rose-300"
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
                    <span className="font-bold text-rose-300">
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