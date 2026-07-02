'use client';

import React, { useState } from 'react';

type QuestionType = 'single' | 'multiple';

interface Question {
  id: number;
  type: QuestionType;
  content: string;
  codeSnippet?: string;
  options: string[];
  correctAnswers: number[]; // Array of correct option indices
  rationale: string;
}

const questions: Question[] = [
  // --- PHẦN 1: 20 CÂU LÝ THUYẾT PHÂN TÍCH SÂU ---
  {
    id: 1,
    type: 'single',
    content: 'Bản chất của tái sử dụng mã nguồn theo cơ chế Kết tập (Aggregation) trong Lập trình Hướng đối tượng là gì?',
    options: [
      'Tạo ra lớp mới bằng cách kế thừa toàn bộ thuộc tính và phương thức của lớp cũ.',
      'Tái sử dụng thông qua lớp (class), phát triển lớp mới dựa trên lớp cơ sở.',
      'Tái sử dụng thông qua đối tượng (object), tạo lớp mới bằng cách tập hợp các đối tượng của các lớp đã có.',
      'Sao chép mã nguồn của lớp cũ sang lớp mới và chỉnh sửa lại cho phù hợp.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 11: Kết tập tái sử dụng thông qua đối tượng. Tạo ra các đối tượng của các lớp có sẵn thành thành viên của lớp mới.'
  },
  {
    id: 2,
    type: 'single',
    content: 'Mối quan hệ nào dưới đây biểu diễn đúng nhất bản chất của Kế thừa (Inheritance) và Kết tập (Aggregation)?',
    options: [
      'Kế thừa là "has-a", Kết tập là "is-a".',
      'Kế thừa là "is-a-part-of", Kết tập là "is-a-kind-of".',
      'Kế thừa là "is-a-kind-of", Kết tập là "is-a-part-of" (hoặc "has-a").',
      'Kế thừa là "has-a", Kết tập là "is-a-part-of".'
    ],
    correctAnswers: [2],
    rationale: 'Slide 10 & 23: Kết tập là quan hệ chứa/có ("has-a") hoặc là một phần ("is-a-part-of"). Kế thừa là quan hệ "là một loại" ("is-a-kind-of").'
  },
  {
    id: 3,
    type: 'multiple',
    content: 'Trong UML, Kết tập (Aggregation) được biểu diễn bằng ký hiệu nào? (Chọn nhiều đáp án)',
    options: [
      'Hình thoi rỗng (hollow diamond) đặt tại đầu của lớp thành phần (Part).',
      'Hình thoi rỗng đặt tại đầu của lớp toàn thể (Whole/Aggregate).',
      'Tam giác rỗng (hollow triangle) đặt tại đầu của lớp cha.',
      'Sử dụng bội số quan hệ (multiplicity) tại 2 đầu đường nối.'
    ],
    correctAnswers: [1, 3],
    rationale: 'Slide 13: Kết tập dùng hình thoi tại đầu lớp toàn thể (aggregate end) và có thể sử dụng bội số quan hệ ở 2 đầu. Tam giác rỗng là của Kế thừa.'
  },
  {
    id: 4,
    type: 'single',
    content: 'Thứ tự khởi tạo đối tượng trong mối quan hệ Kết tập (Aggregation) diễn ra như thế nào?',
    options: [
      'Lớp toàn thể (Whole) được khởi tạo trước, sau đó mới đến các đối tượng thành phần (Part).',
      'Các đối tượng thành phần được khởi tạo trước, sau đó lớp toàn thể mới được khởi tạo hoàn tất.',
      'Khởi tạo đồng thời dựa trên luồng (thread) của JVM.',
      'Tùy thuộc vào thứ tự khai báo biến trong lớp toàn thể mà không có quy tắc cố định.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 19: Các đối tượng thành phần được khởi tạo trước. Các phương thức khởi tạo của các lớp của các đối tượng thành phần được thực hiện trước.'
  },
  {
    id: 5,
    type: 'single',
    content: 'Trong UML, Kế thừa (Inheritance) được biểu diễn bằng ký hiệu gì?',
    options: [
      'Hình thoi đặc đặt tại đầu lớp con.',
      'Mũi tên nét đứt hướng về lớp cha.',
      'Tam giác rỗng (hollow triangle) đặt tại đầu Lớp cha.',
      'Tam giác rỗng đặt tại đầu Lớp con.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 24: Kế thừa sử dụng "tam giác rỗng" tại đầu Lớp cha.'
  },
  {
    id: 6,
    type: 'single',
    content: 'Trong Java, nếu một lớp không dùng từ khóa `extends` để kế thừa một lớp nào khác, thì bản chất nó đang kế thừa lớp nào?',
    options: [
      'java.lang.Class',
      'java.lang.Object',
      'java.util.Object',
      'Không kế thừa lớp nào cả.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 30: Nếu một lớp không được định nghĩa là lớp con của một lớp khác thì mặc định nó là lớp con trực tiếp của lớp Object trong gói java.lang.'
  },
  {
    id: 7,
    type: 'multiple',
    content: 'Những thành phần nào KHÔNG ĐƯỢC phép kế thừa từ lớp cha xuống lớp con? (Chọn nhiều đáp án)',
    options: [
      'Phương thức tĩnh (static methods).',
      'Phương thức khởi tạo (Constructors) và phương thức hủy (Destructors).',
      'Toán tử gán (Assignment operator =).',
      'Các thành viên có access modifier là `protected`.'
    ],
    correctAnswers: [1, 2],
    rationale: 'Slide 35: Các trường hợp không được phép kế thừa gồm: Các phương thức khởi tạo và hủy, Toán tử gán =.'
  },
  {
    id: 8,
    type: 'single',
    content: 'Mức độ truy cập (Access Modifier) `protected` cho phép truy cập từ đâu?',
    options: [
      'Chỉ trong cùng một lớp và các lớp con của nó.',
      'Trong cùng lớp, cùng package, và các lớp con (bất kể khác package).',
      'Chỉ trong cùng package.',
      'Trong toàn bộ project.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 32-34: `protected` được truy cập trong cùng lớp, lớp con (cùng hoặc khác gói), và các lớp cùng package.'
  },
  {
    id: 9,
    type: 'single',
    content: 'Một thành viên trong lớp cha có mức truy cập là "Mặc định" (Default/Package-private). Lớp con nằm Ở MỘT PACKAGE KHÁC có thể truy cập thành viên này không?',
    options: [
      'Có, vì nó là lớp con nên luôn được thừa kế và truy cập.',
      'Không, mức truy cập mặc định không cho phép lớp con ở package khác truy cập.',
      'Có, nếu ép kiểu (casting) về lớp cha.',
      'Tùy thuộc vào việc có import lớp cha hay không.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 34: Bảng phân quyền chỉ ra rằng "Không có" (Default modifier) với "Lớp con khác gói" là KHÔNG (No) được phép truy cập.'
  },
  {
    id: 10,
    type: 'single',
    content: 'Trong cây phân cấp kế thừa, điều gì xảy ra với các thành viên được kế thừa?',
    options: [
      'Lớp con chỉ kế thừa trực tiếp từ lớp cha ngay trên nó, không kế thừa từ ông nội.',
      'Thành viên được kế thừa sẽ truyền xuống dưới trong cây phân cấp, lớp con kế thừa tất cả các lớp tổ tiên của nó.',
      'Lớp con có thể chọn từ chối kế thừa một số phương thức bằng từ khóa `ignore`.',
      'Phương thức của ông nội sẽ bị xóa nếu lớp cha override nó.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 28: Thành viên được kế thừa sẽ được truyền xuống dưới trong cây phân cấp -> Lớp con kế thừa tất cả các lớp tổ tiên của nó.'
  },
  {
    id: 11,
    type: 'single',
    content: 'Phương thức `toString()` và `equals()` được kế thừa từ lớp nào?',
    options: [
      'java.lang.String',
      'java.lang.System',
      'java.lang.Object',
      'java.util.Collections'
    ],
    correctAnswers: [2],
    rationale: 'Slide 31: Lớp Object chứa một số phương thức hữu ích kế thừa lại cho tất cả các lớp như toString(), equals().'
  },
  {
    id: 12,
    type: 'multiple',
    content: 'Phát biểu nào ĐÚNG về việc khởi tạo đối tượng trong Kế thừa? (Chọn nhiều đáp án)',
    options: [
      'Lớp con được khởi tạo trước, sau đó mới đến lớp cha.',
      'Lớp cha được khởi tạo trước lớp con.',
      'Phương thức khởi tạo của lớp con luôn gọi phương thức khởi tạo của lớp cha ở câu lệnh đầu tiên.',
      'Nếu không gọi `super()` rõ ràng, Java sẽ báo lỗi biên dịch bất kể lớp cha có constructor nào.'
    ],
    correctAnswers: [1, 2],
    rationale: 'Slide 43: Lớp cha được khởi tạo trước lớp con. Các phương thức khởi tạo của lớp con luôn gọi constructor lớp cha ở câu lệnh đầu tiên. Tự động gọi implicit chỉ xảy ra nếu lớp cha CÓ constructor mặc định.'
  },
  {
    id: 13,
    type: 'single',
    content: 'Từ khóa `super(...)` dùng để gọi constructor lớp cha phải đặt ở đâu?',
    options: [
      'Bất kỳ đâu trong phương thức khởi tạo của lớp con.',
      'Câu lệnh cuối cùng trong phương thức khởi tạo của lớp con.',
      'Câu lệnh đầu tiên trong phương thức khởi tạo của lớp con.',
      'Trong bất kỳ phương thức nào của lớp con.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 45: Câu lệnh đầu tiên trong phương thức khởi tạo của lớp con gọi phương thức khởi tạo của lớp cha.'
  },
  {
    id: 14,
    type: 'single',
    content: 'Nếu lớp cha được định nghĩa với từ khóa `final` (VD: `public final class A`), điều gì sẽ xảy ra?',
    options: [
      'Tất cả các phương thức của lớp A tự động trở thành private.',
      'Không thể tạo ra đối tượng từ lớp A.',
      'Không thể có bất kỳ lớp nào kế thừa (dẫn xuất) từ lớp A.',
      'Lớp A không thể chứa các biến tham chiếu.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 36: Lớp cha nếu được định nghĩa là final thì không thể có lớp dẫn xuất từ nó.'
  },
  {
    id: 15,
    type: 'single',
    content: 'Quá trình hủy bỏ đối tượng (Destruction) trong Kế thừa diễn ra theo thứ tự nào?',
    options: [
      'Hủy lớp cha trước, sau đó hủy lớp con.',
      'Ngược lại so với khởi tạo đối tượng: Hủy lớp con trước, lớp cha sau.',
      'Hủy đồng thời do Garbage Collector quản lý.',
      'Chỉ hủy lớp con, giữ lại lớp cha trong bộ nhớ.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 43: Hủy bỏ đối tượng thực hiện ngược lại so với khởi tạo đối tượng (con trước, cha sau).'
  },
  {
    id: 16,
    type: 'single',
    content: 'Các lớp con có cùng chung một lớp cha trực tiếp được gọi là gì?',
    options: [
      'Sub-relatives',
      'Cousins',
      'Siblings (Anh chị em)',
      'Derived twins'
    ],
    correctAnswers: [2],
    rationale: 'Slide 28: Các lớp con có cùng lớp cha gọi là anh chị em (siblings).'
  },
  {
    id: 17,
    type: 'multiple',
    content: 'Sự khác biệt cốt lõi giữa Redefinition (Ghi đè) và Extension (Mở rộng) trong Kế thừa là gì? (Chọn nhiều đáp án)',
    options: [
      'Extension là việc thêm các thuộc tính hoặc hành vi mới vào lớp con.',
      'Redefinition (Method Overriding) là việc chỉnh sửa lại hành vi đã kế thừa từ lớp cha.',
      'Extension chỉ cho phép thêm thuộc tính, không cho phép thêm phương thức.',
      'Redefinition là việc đổi tên các phương thức của lớp cha cho phù hợp lớp con.'
    ],
    correctAnswers: [0, 1],
    rationale: 'Slide 23: Extension là thêm thuộc tính/hành vi mới. Redefinition (Overriding) là chỉnh sửa lại hành vi kế thừa từ cha.'
  },
  {
    id: 18,
    type: 'single',
    content: 'Trong mô hình hóa UML, tên vai trò (rolename) ở đầu mối quan hệ Kết tập, nếu không được ghi chú, sẽ mặc định là gì?',
    options: [
      'Tên của lớp toàn thể.',
      'Tên của lớp thành phần (viết thường chữ cái đầu).',
      'Từ khóa `part`.',
      'Không có mặc định, Java sẽ báo lỗi nếu không mô hình hóa.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 13: Tên vai trò (rolename), nếu không có thì mặc định là tên của lớp (bỏ viết hoa chữ cái đầu).'
  },
  {
    id: 19,
    type: 'single',
    content: 'Đa bội (Multiplicity) `*` trong biểu diễn Kết tập UML có nghĩa là gì?',
    options: [
      'Chính xác 1 đối tượng.',
      'Tùy chọn: 0 hoặc 1 đối tượng.',
      'Bất kỳ số nào (từ 0 đến vô cùng).',
      'Bắt buộc phải có từ 1 đối tượng trở lên.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 13: `*` có nghĩa là "Bất kỳ số nào".'
  },
  {
    id: 20,
    type: 'single',
    content: 'Đặc điểm nào chỉ có ở Kết tập mà KHÔNG có ở Kế thừa?',
    options: [
      'Lớp mới sử dụng lại dữ liệu và hành vi của lớp cũ.',
      'Cho phép giảm thiểu chi phí và thời gian viết mã.',
      'Lớp mới tạo ra như một sự TẬP HỢP các đối tượng của các lớp đã có.',
      'Mối quan hệ phân cấp hình cây.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 26: Kết tập tái sử dụng thông qua ĐỐI TƯỢNG (tập hợp các đối tượng). Kế thừa tái sử dụng thông qua LỚP (phát triển lớp).'
  },

  // --- PHẦN 2: 30 CÂU PHÂN TÍCH CODE JAVA (BẪY & ĐÁNH ĐỐ) ---
  {
    id: 21,
    type: 'multiple',
    content: 'Đoạn mã sau có lỗi biên dịch ở những lớp nào? (Chọn nhiều đáp án)',
    codeSnippet: `public class TG1 {
  private String name;
  public TG1(String name) { this.name = name; }
}
public class HV1 extends TG1 {
  public HV1() { }
  public void test() { }
}`,
    options: [
      'Lỗi ở lớp TG1',
      'Lỗi ở lớp HV1',
      'Lỗi ở hàm test() của HV1',
      'Không có lỗi nào'
    ],
    correctAnswers: [1],
    rationale: 'Slide 49: Lớp TG1 có constructor có tham số, nên Java KHÔNG tự sinh default constructor (không tham số). Lớp HV1 có constructor mặc định `HV1()` sẽ ngầm gọi `super();`, nhưng TG1 không có constructor nào không tham số -> Lỗi biên dịch ở HV1.'
  },
  {
    id: 22,
    type: 'single',
    content: 'Trong ví dụ trước (câu 21), cách sửa đúng nhất để lớp HV1 hết lỗi là gì?',
    options: [
      'Thêm `super();` vào dòng đầu của HV1().',
      'Đổi tên constructor HV1 thành TG1.',
      'Thêm `super("Default Name");` vào dòng đầu tiên của constructor HV1().',
      'Bỏ phương thức test().'
    ],
    correctAnswers: [2],
    rationale: 'Slide 45: Nếu cha không có constructor mặc định, con BẮT BUỘC phải gọi trực tiếp (tường minh) constructor của cha bằng `super(tham_số)`.'
  },
  {
    id: 23,
    type: 'single',
    content: 'Kết quả in ra của đoạn mã sau là gì?',
    codeSnippet: `class Diem {
  public Diem() { System.out.print("Diem "); }
}
class TuGiac {
  Diem d1 = new Diem();
  Diem d2 = new Diem();
  public TuGiac() { System.out.print("TuGiac "); }
}
public class Main {
  public static void main(String[] args) {
    TuGiac tg = new TuGiac();
  }
}`,
    options: [
      'TuGiac Diem Diem',
      'Diem TuGiac Diem',
      'Diem Diem TuGiac',
      'TuGiac'
    ],
    correctAnswers: [2],
    rationale: 'Slide 19: Trong Kết tập, các đối tượng thành phần (Diem) được khởi tạo TRƯỚC. d1 và d2 khởi tạo in ra "Diem Diem ", sau đó mới chạy constructor của TuGiac in ra "TuGiac ".'
  },
  {
    id: 24,
    type: 'single',
    content: 'Đoạn mã Kế thừa sau in ra thứ tự nào?',
    codeSnippet: `class Cha {
  public Cha() { System.out.print("Cha "); }
}
class Con extends Cha {
  public Con() { System.out.print("Con "); }
}
public class Main {
  public static void main(String[] args) {
    Con c = new Con();
  }
}`,
    options: [
      'Con Cha',
      'Cha Con',
      'Chỉ in Cha',
      'Chỉ in Con'
    ],
    correctAnswers: [1],
    rationale: 'Slide 44: Khởi tạo đối tượng lớp con sẽ tự động gọi constructor lớp cha trước. Do đó in "Cha " rồi mới in "Con ".'
  },
  {
    id: 25,
    type: 'single',
    content: 'Xem xét mã Kế thừa kết hợp Kết tập, kết quả in ra là gì?',
    codeSnippet: `class Component {
  Component() { System.out.print("Comp "); }
}
class Cha {
  Cha() { System.out.print("Cha "); }
}
class Con extends Cha {
  Component c = new Component();
  Con() { System.out.print("Con "); }
}
public class Main {
  public static void main(String[] args) {
    new Con();
  }
}`,
    options: [
      'Comp Cha Con',
      'Cha Comp Con',
      'Cha Con Comp',
      'Comp Con Cha'
    ],
    correctAnswers: [1],
    rationale: 'Trật tự khởi tạo: Khi gọi `new Con()`, đầu tiên nó phải khởi tạo lớp cha (gọi `super()` ngầm) -> in "Cha ". Sau khi phần cha xong, nó khởi tạo các thuộc tính thành phần của lớp con (Component) -> in "Comp ". Cuối cùng chạy nội dung constructor của con -> in "Con ".'
  },
  {
    id: 26,
    type: 'single',
    content: 'Đoạn mã sau bị lỗi biên dịch ở đâu?',
    codeSnippet: `package p1;
public class Person {
  protected String name = "John";
}
// -----------------
package p2;
import p1.Person;
public class Employee extends Person {
  public void test() {
    Person p = new Person();
    System.out.println(p.name); // Dòng 1
    System.out.println(this.name); // Dòng 2
  }
}`,
    options: [
      'Dòng 1',
      'Dòng 2',
      'Cả 2 dòng',
      'Không có lỗi'
    ],
    correctAnswers: [0],
    rationale: 'Slide 34 & 42: `name` là `protected`. Ở một package khác, lớp con (Employee) CHỈ có thể truy cập thuộc tính protected qua tham chiếu của CHÍNH NÓ (kế thừa `this.name`). Truy cập qua biến tham chiếu của lớp cha `p.name` ở một package khác là phạm quy tắc access modifier.'
  },
  {
    id: 27,
    type: 'single',
    content: 'Đoạn mã này in ra gì?',
    codeSnippet: `class Person {
  private String name;
  public String getName() { return name; }
}
class Employee extends Person {
  public void printName() {
    System.out.println(name);
  }
}`,
    options: [
      'In ra giá trị null.',
      'In ra lỗi NullPointerException.',
      'Lỗi biên dịch vì `name` là private trong lớp cha.',
      'In ra chuỗi rỗng.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 32: Không kế thừa được các thành viên `private`. Lớp con không thể gọi trực tiếp biến `name`.'
  },
  {
    id: 28,
    type: 'multiple',
    content: 'Đoạn code sau cố tình đặt hàm `super` không đúng chỗ. Dòng nào gây ra lỗi biên dịch? (Chọn nhiều đáp án)',
    codeSnippet: `class TuGiac {
  public TuGiac(int a) {}
}
class HinhVuong extends TuGiac {
  public HinhVuong() {
    System.out.println("Init HinhVuong"); // Dòng 1
    super(1); // Dòng 2
  }
}`,
    options: [
      'Dòng 1 bị lỗi vì đứng trước super.',
      'Dòng 2 bị lỗi vì gọi super không hợp lệ.',
      'Lỗi toàn bộ constructor HinhVuong.',
      'Trình biên dịch tự động đẩy super lên trên nên không lỗi.'
    ],
    correctAnswers: [1],
    rationale: 'Slide 45: `super(...)` bắt buộc phải là CÂU LỆNH ĐẦU TIÊN trong constructor. Đặt sau lệnh in `System.out.println` sẽ gây lỗi biên dịch ở dòng chứa lệnh `super`.'
  },
  {
    id: 29,
    type: 'single',
    content: 'Đoạn mã minh họa Kết tập bằng Mảng đối tượng:',
    codeSnippet: `class Diem { public Diem(){ } }
class TuGiac {
  private Diem[] diem = new Diem[4];
  public TuGiac() { 
    // Do something
  }
}
// Nếu trong TuGiac() không khởi tạo từng phần tử diem[i], khi gọi diem[0].toString() sẽ gặp lỗi gì?`,
    options: [
      'ArrayIndexOutOfBoundsException',
      'NullPointerException',
      'Lỗi biên dịch chưa khởi tạo biến.',
      'Không lỗi, in ra địa chỉ ô nhớ mặc định.'
    ],
    correctAnswers: [1],
    rationale: 'Mảng đối tượng trong Java khởi tạo với các phần tử mang giá trị `null` (Slide 18 cho thấy phải gán `diem[0] = p1;` ...). Gọi phương thức từ một phần tử `null` gây `NullPointerException`.'
  },
  {
    id: 30,
    type: 'single',
    content: 'Với Khai báo Kế thừa: `class Manager extends Employee`. Cú pháp ép kiểu (Casting) nào sau đây hợp lệ tại Runtime?',
    codeSnippet: `Employee e = new Manager();
Manager m = (Manager) new Employee();`,
    options: [
      'Cả hai đều hợp lệ và chạy tốt.',
      'Dòng 1 đúng, dòng 2 gây lỗi ClassCastException.',
      'Dòng 1 lỗi, dòng 2 đúng.',
      'Cả 2 đều gây lỗi biên dịch.'
    ],
    correctAnswers: [1],
    rationale: 'Kiến thức cốt lõi OOP: Đa hình cho phép biến cha (Employee) trỏ tới đối tượng con (Manager) -> Dòng 1 đúng. Nhưng biến con (Manager) không thể ép kiểu từ một đối tượng thực chất là cha (new Employee) -> ClassCastException runtime ở dòng 2.'
  },
  {
    id: 31,
    type: 'single',
    content: 'Đoạn mã sau bị lỗi ở đâu (Giả sử 2 class khác package)?',
    codeSnippet: `package pack1;
public class Parent {
  String text = "Hello"; // Access modifier mặc định
}
// -------------
package pack2;
import pack1.Parent;
public class Child extends Parent {
  public void show() { System.out.println(text); }
}`,
    options: [
      'Lỗi biên dịch ở dòng `System.out.println(text);`',
      'Lỗi ở khai báo import.',
      'Lỗi Runtime khi tạo object Child.',
      'Chạy bình thường, in ra Hello.'
    ],
    correctAnswers: [0],
    rationale: 'Slide 32-34: Mức truy cập mặc định (default/package-private) không cho phép kế thừa/truy cập từ một package KHÁC.'
  },
  {
    id: 32,
    type: 'single',
    content: 'Khởi tạo đối tượng qua phương thức Khởi tạo: Đoạn mã sau in ra gì?',
    codeSnippet: `class A {
  A() { System.out.print("A"); }
}
class B extends A {
  B(int x) { System.out.print("B" + x); }
  B() { this(5); System.out.print("B0"); }
}
// Khi gọi new B();`,
    options: [
      'B5 B0',
      'A B5 B0',
      'A B0 B5',
      'Lỗi biên dịch do constructor B() dùng `this(5)`.'
    ],
    correctAnswers: [1],
    rationale: '`new B()` gọi `B()`. Lệnh `this(5)` trỏ sang `B(int x)`. Constructor `B(int x)` phải gọi cha `super()` ngầm định đầu tiên -> in "A". Sau đó in "B5". Trở về `B()` in tiếp "B0". Kết quả: A B5 B0.'
  },
  {
    id: 33,
    type: 'multiple',
    content: 'Tại sao lại cần phải che giấu (encapsulate) danh sách mảng đối tượng `Diem` bằng từ khóa `private` trong lớp `TuGiac` ở ví dụ Kết tập (Slide 18)?',
    options: [
      'Để ngăn chặn lớp bên ngoài trực tiếp thay đổi địa chỉ của các phần tử điểm.',
      'Vì Java bắt buộc mọi thuộc tính mảng phải là private.',
      'Để đảm bảo tính đóng gói (encapsulation), cung cấp dữ liệu qua các hàm get/set nếu cần.',
      'Để lớp con của TuGiac có thể ghi đè mảng Diem.'
    ],
    correctAnswers: [0, 2],
    rationale: 'Slide 18 (Cài đặt kết tập): Dùng `private` cho mảng `diem` là nguyên tắc đóng gói cơ bản, bảo vệ tính toàn vẹn của dữ liệu và giấu cấu trúc lưu trữ nội bộ.'
  },
  {
    id: 34,
    type: 'single',
    content: 'Đoạn mã in ra gì?',
    codeSnippet: `class Vehicle {
  public void start() { System.out.print("V "); }
}
class Car extends Vehicle {
  public void start() { System.out.print("C "); }
}
public class Test {
  public static void main(String[] args) {
    Vehicle v = new Car();
    v.start();
  }
}`,
    options: [
      'V ',
      'C ',
      'V C',
      'Lỗi biên dịch'
    ],
    correctAnswers: [1],
    rationale: 'Slide 23 (Redefinition): Lớp con ghi đè phương thức. Biến v kiểu cha (Vehicle) trỏ đến object con (Car). Do tính đa hình (Dynamic binding), hàm `start()` của Car được gọi -> In "C ".'
  },
  {
    id: 35,
    type: 'single',
    content: 'Ghi đè (Overriding) sẽ bị NGĂN CHẶN nếu lớp cha khai báo phương thức với từ khóa nào?',
    options: [
      'static',
      'public',
      'protected',
      'final'
    ],
    correctAnswers: [3],
    rationale: 'Từ khóa `final` ngăn cản lớp con ghi đè phương thức. (Kiến thức mở rộng trực tiếp từ final class ở slide 36).'
  },
  {
    id: 36,
    type: 'multiple',
    content: 'Phát biểu nào sai khi nói về `this` và `super`? (Chọn nhiều đáp án)',
    options: [
      '`this` tham chiếu đến đối tượng hiện tại của lớp.',
      '`super` tham chiếu đến đối tượng của lớp cha.',
      'Có thể dùng cả `this(...)` và `super(...)` đồng thời ở 2 dòng đầu của một constructor.',
      '`super` có thể dùng trong phương thức `static` để gọi hàm lớp cha.'
    ],
    correctAnswers: [1, 2, 3],
    rationale: '`super` chỉ gọi constructor/hàm của cha, không tạo ra 1 "đối tượng" cha độc lập (bản chất chỉ có 1 instance gộp). Không thể dùng cả 2 trong 1 constructor vì cả hai đều đòi đứng dòng 1. Không dùng được `super` trong ngữ cảnh `static`.'
  },
  {
    id: 37,
    type: 'single',
    content: 'Mã lỗi ở đâu?',
    codeSnippet: `class Cha {
  protected int val;
}
class Con extends Cha {
  public void setVal(int v) { super.val = v; }
}
class Chau extends Con {
  public void printVal() { System.out.println(super.super.val); }
}`,
    options: [
      'Không lỗi, in ra bình thường.',
      'Lỗi ở `super.val = v;`',
      'Lỗi ở `super.super.val`',
      'Lỗi ở khai báo thuộc tính val.'
    ],
    correctAnswers: [2],
    rationale: 'Java không hỗ trợ cú pháp `super.super` để nhảy cóc truy cập tổ tiên. Lớp cháu kế thừa trực tiếp nên gọi `val` hoặc `super.val` là đủ.'
  },
  {
    id: 38,
    type: 'single',
    content: 'Khi khai báo một mảng các đối tượng lớp Cha, ta có thể lưu các đối tượng lớp Con vào mảng đó không?',
    codeSnippet: `Person[] people = new Person[5];
people[0] = new Employee();`,
    options: [
      'Không, vì mảng yêu cầu đúng kiểu dữ liệu.',
      'Có, vì Employee "là một" (is-a) Person, đây là tính đa hình (Upcasting).',
      'Có, nhưng phải ép kiểu rõ ràng: (Employee) new Person().',
      'Lỗi biên dịch.'
    ],
    correctAnswers: [1],
    rationale: 'Do quan hệ Kế thừa (Slide 23 "is-a-kind-of"), Employee là một Person, mảng Person hoàn toàn chứa được object Employee.'
  },
  {
    id: 39,
    type: 'single',
    content: 'Một thuộc tính kiểu nguyên thủy (int) được che giấu trong lớp `Diem`. Lớp `TuGiac` kết tập `Diem`. Làm sao `TuGiac` lấy được tọa độ x?',
    options: [
      'd1.x',
      'super.x',
      'd1.getX()',
      'Ép kiểu: (int) d1'
    ],
    correctAnswers: [2],
    rationale: 'Slide 15: Biến x trong lớp Diem là `private`. Lớp TuGiac muốn lấy x phải gọi qua getter của đối tượng thành phần: `d1.getX()`.'
  },
  {
    id: 40,
    type: 'single',
    content: 'Đoạn mã sau bị lỗi ở đâu?',
    codeSnippet: `public class PhongBan {
  private NhanVien[] dsnv = new NhanVien[100];
  public void inTTin() {
    System.out.println(dsnv[0].tenNhanVien);
  }
}`,
    options: [
      'Biến tenNhanVien của NhanVien đang là private (Slide 51) nên không gọi trực tiếp được.',
      'Mảng dsnv chưa được khởi tạo.',
      'Không có lỗi, gọi bình thường.',
      'Lỗi cú pháp của System.out'
    ],
    correctAnswers: [0],
    rationale: 'Slide 51: Sơ đồ UML cho thấy `tenNhanVien` có dấu trừ (-) tức là private. Lớp PhongBan không thể truy cập trực tiếp bằng `dsnv[0].tenNhanVien` mà phải dùng hàm (vd: `inTTin()` của NhanVien).'
  },
  {
    id: 41,
    type: 'single',
    content: 'Đoạn mã Kết tập (Slide 51): `PhongBan` quản lý mảng `dsnv`. Phương thức `themNV(NhanVien nv)` thực chất đang làm gì?',
    options: [
      'Tạo mới một đối tượng NhanVien bằng `new NhanVien()` và copy dữ liệu.',
      'Lưu tham chiếu của đối tượng `nv` truyền vào vào một phần tử trống trong mảng `dsnv`.',
      'Gọi constructor của lớp cha NhanVien.',
      'Kế thừa dữ liệu từ NhanVien.'
    ],
    correctAnswers: [1],
    rationale: 'Kết tập lưu các đối tượng đã có. Truyền `NhanVien nv` vào hàm `themNV` thực chất là gán tham chiếu `dsnv[index] = nv`.'
  },
  {
    id: 42,
    type: 'multiple',
    content: 'Ký hiệu `#` và `+` trong thiết kế UML (như ở Slide 51) tương ứng với access modifier nào?',
    options: [
      '`#` là protected',
      '`+` là public',
      '`-` là default',
      '`-` là private'
    ],
    correctAnswers: [0, 1, 3],
    rationale: 'Ký hiệu UML: `+` public, `-` private, `#` protected, `~` package/default.'
  },
  {
    id: 43,
    type: 'single',
    content: 'Lệnh gán nào bị cấm?',
    codeSnippet: `class Vehicle {}
class Car extends Vehicle {}
class Moto extends Vehicle {}

Vehicle v = new Car(); // Lệnh 1
Car c = new Vehicle(); // Lệnh 2
Moto m = (Moto) v; // Lệnh 3`,
    options: [
      'Chỉ lệnh 1',
      'Chỉ lệnh 2',
      'Lệnh 2 và Lệnh 3',
      'Tất cả đều hợp lệ.'
    ],
    correctAnswers: [2],
    rationale: 'Lệnh 1 là Upcasting (hợp lệ). Lệnh 2 là Downcasting sai ngữ nghĩa (Vehicle không thể tự động thu hẹp thành Car) -> Lỗi biên dịch. Lệnh 3 ép kiểu biến đang trỏ tới Car sang Moto -> Lỗi ClassCastException (Runtime).'
  },
  {
    id: 44,
    type: 'single',
    content: 'Trong kế thừa, việc khai báo một phương thức trong lớp con có chữ ký (signature) giống hệt phương thức ở lớp cha được gọi là gì?',
    options: [
      'Overloading (Chồng phương thức)',
      'Overriding (Ghi đè phương thức)',
      'Hiding (Che giấu)',
      'Encapsulation (Đóng gói)'
    ],
    correctAnswers: [1],
    rationale: 'Slide 23: Redefinition (Method Overriding) là việc chỉnh sửa lại các hành vi kế thừa từ lớp cha bằng cách khai báo lại phương thức giống hệt chữ ký.'
  },
  {
    id: 45,
    type: 'single',
    content: 'Nếu lớp con Overriding một phương thức, làm thế nào để lớp con đó vẫn gọi được phiên bản phương thức cũ của lớp cha?',
    options: [
      'this.methodName();',
      'parent.methodName();',
      'super.methodName();',
      'Không thể gọi được nữa vì đã bị ghi đè hoàn toàn.'
    ],
    correctAnswers: [2],
    rationale: 'Sử dụng từ khóa `super.tenPhuongThuc()` để truy cập phiên bản phương thức của lớp cha đã bị ghi đè.'
  },
  {
    id: 46,
    type: 'single',
    content: 'Trong cấu trúc kế thừa phân cấp sâu: `class A {}`, `class B extends A {}`, `class C extends B {}`. Khi khởi tạo `new C();`, những constructor nào được gọi?',
    options: [
      'Chỉ C()',
      'B() rồi C()',
      'C() rồi B() rồi A()',
      'A() rồi B() rồi C()'
    ],
    correctAnswers: [3],
    rationale: 'Luôn khởi tạo từ đỉnh tháp kế thừa xuống dưới. Lớp cha xa nhất (A) khởi tạo trước, rồi đến B, cuối cùng là C.'
  },
  {
    id: 47,
    type: 'multiple',
    content: 'Lớp PhongBan (Slide 51) có hằng số `+SO_NV_MAX: byte = 100`. Trong Java, thuộc tính này nên được khai báo như thế nào là chuẩn nhất theo thiết kế?',
    options: [
      'public final byte SO_NV_MAX = 100;',
      'public static final byte SO_NV_MAX = 100;',
      'private const byte SO_NV_MAX = 100;',
      'public const int SO_NV_MAX = 100;'
    ],
    correctAnswers: [0, 1],
    rationale: 'Dấu `+` nghĩa là public. Viết HOA toàn bộ nghĩa là hằng số -> dùng `final`. Thông thường hằng số cấp lớp sẽ thêm `static` để tiết kiệm bộ nhớ.'
  },
  {
    id: 48,
    type: 'single',
    content: 'Đoạn mã sau bị lỗi ở hàm nào?',
    codeSnippet: `class MathUtils {
  public final int sum(int a, int b) { return a + b; }
}
class AdvancedMath extends MathUtils {
  public int sum(int a, int b) { return a + b + 1; } // Hàm 1
  public double sum(double a, double b) { return a + b; } // Hàm 2
}`,
    options: [
      'Lỗi ở Hàm 1',
      'Lỗi ở Hàm 2',
      'Lỗi ở cả hai hàm',
      'Không có lỗi'
    ],
    correctAnswers: [0],
    rationale: 'Hàm `sum(int, int)` ở lớp cha có từ khóa `final`, do đó Lớp con KHÔNG THỂ ghi đè (override) nó ở Hàm 1. Hàm 2 là nạp chồng (overload) vì khác tham số, nên hợp lệ.'
  },
  {
    id: 49,
    type: 'single',
    content: 'Tại sao lại cần phải khai báo hàm ảo hay kế thừa `toString()` của lớp `Object` trong thực tế?',
    options: [
      'Để tránh lỗi cú pháp khi gọi System.out.println(object).',
      'Để hệ điều hành biết cách cấp phát bộ nhớ cho chuỗi.',
      'Để cung cấp một cách biểu diễn đối tượng dưới dạng chuỗi có ý nghĩa (ví dụ: thông tin nhân viên) thay vì in ra mã hash code khó hiểu.',
      'Vì nếu không override, đối tượng sẽ không thể ép kiểu sang String.'
    ],
    correctAnswers: [2],
    rationale: 'Slide 31: `toString()` mặc định in ra hash code (địa chỉ tham chiếu ảo). Ghi đè `toString()` giúp in thông tin thuộc tính rõ ràng khi truyền đối tượng vào println().'
  },
  {
    id: 50,
    type: 'multiple',
    content: 'Tổng kết sự khác biệt giữa Kế thừa và Kết tập (Slide 26). Chọn mệnh đề ĐÚNG (Chọn nhiều đáp án)',
    options: [
      'Kế thừa là tái sử dụng thông qua lớp, Kết tập là thông qua đối tượng.',
      'Kế thừa là quan hệ "is-a-part-of", Kết tập là "is-a-kind-of".',
      'Lớp toàn thể (Whole) gọi hành vi thông qua đối tượng thành phần (Part) trong Kết tập.',
      'Trong kết tập, lớp toàn thể mặc nhiên sử dụng được các biến protected của lớp thành phần.'
    ],
    correctAnswers: [0, 2],
    rationale: 'Slide 26: Kế thừa (qua lớp, "is-a-kind-of"). Kết tập (qua đối tượng, Whole mượn hành vi Part). Lớp toàn thể KHÔNG tự nhiên truy cập được protected của Part trừ phi cùng package.'
  }
];

export default function OOPQuizInheritance() {
  const [answers, setAnswers] = useState<Record<number, number[]>>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleSelect = (qId: number, optionIndex: number, type: QuestionType) => {
    if (submitted) return;
    
    setAnswers(prev => {
      const current = prev[qId] || [];
      if (type === 'single') {
        return { ...prev, [qId]: [optionIndex] };
      } else {
        if (current.includes(optionIndex)) {
          return { ...prev, [qId]: current.filter(i => i !== optionIndex) };
        } else {
          return { ...prev, [qId]: [...current, optionIndex].sort() };
        }
      }
    });
  };

  const handleSubmit = () => {
    let newScore = 0;
    questions.forEach(q => {
      const userAns = answers[q.id] || [];
      if (userAns.length === q.correctAnswers.length && userAns.every(v => q.correctAnswers.includes(v))) {
        newScore++;
      }
    });
    setScore(newScore);
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const progress = Math.round((Object.keys(answers).length / questions.length) * 100);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white shadow-xl rounded-lg overflow-hidden mb-8 sticky top-0 z-10 border-b-4 border-red-600">
          <div className="p-6 bg-red-700 text-white flex justify-between items-center">
            <h1 className="text-xl md:text-2xl font-bold">HUST - Bài thi trắc nghiệm OOP (Bài 6: Kết tập & Kế thừa)</h1>
            {submitted && (
              <div className="text-xl font-bold bg-white text-red-700 px-4 py-2 rounded-full shadow">
                Điểm: {score}/{questions.length}
              </div>
            )}
          </div>
          <div className="w-full bg-gray-200 h-2">
            <div className="bg-green-500 h-2 transition-all duration-300" style={{ width: `${progress}%` }}></div>
          </div>
          {!submitted && (
            <div className="p-2 text-center text-sm text-gray-500 bg-gray-100">
              Tiến độ: {Object.keys(answers).length} / {questions.length} câu
            </div>
          )}
        </div>

        <div className="space-y-6">
          {questions.map((q, index) => {
            const userAns = answers[q.id] || [];
            const isCorrect = userAns.length === q.correctAnswers.length && userAns.every(v => q.correctAnswers.includes(v));

            return (
              <div key={q.id} className={`bg-white rounded-lg shadow-md p-6 border-l-4 ${submitted ? (isCorrect ? 'border-green-500' : 'border-red-500') : 'border-gray-300'}`}>
                <h3 className="text-lg font-semibold text-gray-800 mb-2">
                  <span className="text-red-600 mr-2">Câu {index + 1}:</span> 
                  {q.content}
                </h3>
                
                {q.codeSnippet && (
                  <pre className="bg-gray-800 text-green-400 p-4 rounded-md overflow-x-auto text-sm my-4 font-mono shadow-inner">
                    <code>{q.codeSnippet}</code>
                  </pre>
                )}

                <div className="space-y-3 mt-4">
                  {q.options.map((opt, optIdx) => {
                    const isSelected = userAns.includes(optIdx);
                    const isCorrectOpt = q.correctAnswers.includes(optIdx);
                    
                    let optionClasses = "flex items-center p-3 rounded-md border transition-all ";
                    
                    if (!submitted) {
                      optionClasses += isSelected 
                        ? "bg-red-50 border-red-300 shadow-sm text-red-900 font-medium" 
                        : "border-gray-200 hover:bg-gray-50 cursor-pointer text-gray-800";
                    } else {
                      if (isCorrectOpt) {
                        optionClasses += "bg-green-100 border-green-500 text-green-800 font-medium ";
                      } else if (isSelected && !isCorrectOpt) {
                        optionClasses += "bg-red-100 border-red-500 text-red-800 line-through ";
                      } else {
                        optionClasses += "opacity-60 border-gray-200 bg-gray-50 text-gray-800 ";
                      }
                    }

                    return (
                      <div 
                        key={optIdx} 
                        className={optionClasses}
                        onClick={() => handleSelect(q.id, optIdx, q.type)}
                      >
                        <div className="flex-shrink-0 mr-3">
                          {q.type === 'single' ? (
                            <input 
                              type="radio" 
                              checked={isSelected}
                              readOnly
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300"
                            />
                          ) : (
                            <input 
                              type="checkbox" 
                              checked={isSelected}
                              readOnly
                              className="w-4 h-4 text-red-600 focus:ring-red-500 border-gray-300 rounded"
                            />
                          )}
                        </div>
                        <span className="text-sm md:text-base">{opt}</span>
                      </div>
                    );
                  })}
                </div>

                {submitted && (
                  <div className={`mt-4 p-4 rounded-md text-sm ${isCorrect ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
                    <p className="font-semibold mb-1 flex items-center">
                      {isCorrect ? (
                        <><span className="text-green-600 text-lg mr-2">✓</span> Trả lời đúng</>
                      ) : (
                        <><span className="text-red-600 text-lg mr-2">✗</span> Trả lời sai</>
                      )}
                    </p>
                    <p className="text-gray-700"><span className="font-semibold text-gray-900">Giải thích:</span> {q.rationale}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {!submitted && (
          <div className="mt-8 text-center">
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="bg-red-700 hover:bg-red-800 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Nộp Bài
            </button>
          </div>
        )}
        
        {submitted && (
          <div className="mt-8 text-center space-y-4">
             <div className="text-2xl font-bold text-gray-800">
               Kết quả của bạn: <span className={score >= 40 ? 'text-green-600' : 'text-red-600'}>{score} / {questions.length}</span>
             </div>
             <button 
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-6 rounded-full transition-all"
              >
                Làm Lại Bài Thi
              </button>
          </div>
        )}
      </div>
    </div>
  );
}