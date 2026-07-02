'use client';

import React, { useState } from 'react';

type QuestionType = 'single' | 'multiple';

interface Question {
  id: number;
  type: QuestionType;
  content: string;
  codeSnippet?: string;
  options: string[];
  correctAnswers: number[];
  rationale: string;
}

const questions: Question[] = [
  {
    "content": "Trong Java, lớp gốc cao nhất (root class) của toàn bộ cây phân cấp ngoại lệ (Exception Hierarchy) là gì?",
    "options": [
      "java.lang.Exception",
      "java.lang.Error",
      "java.lang.Throwable",
      "java.lang.RuntimeException"
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Lớp `Throwable` là lớp cha (root) của toàn bộ hệ thống ngoại lệ trong Java. `Exception` và `Error` đều kế thừa từ `Throwable`.",
    "id": 1,
    "type": "single"
  },
  {
    "content": "Sự khác biệt bản chất giữa `Error` và `Exception` trong Java là gì?",
    "options": [
      "`Error` do lập trình viên tạo ra, còn `Exception` do máy ảo Java (JVM) tạo ra.",
      "`Error` biểu diễn các lỗi nghiêm trọng mà ứng dụng thông thường không nên cố gắng bắt (catch) hoặc phục hồi, còn `Exception` là các điều kiện bất thường mà ứng dụng có thể bắt và xử lý.",
      "`Exception` luôn dẫn đến việc dừng chương trình, còn `Error` có thể bỏ qua.",
      "Không có sự khác biệt về bản chất, chúng có thể được sử dụng thay thế cho nhau."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "`Error` đại diện cho lỗi hệ thống nghiêm trọng (ví dụ OutOfMemoryError, StackOverflowError) không thể phục hồi. `Exception` là các ngoại lệ logic hoặc môi trường có thể xử lý được.",
    "id": 2,
    "type": "single"
  },
  {
    "content": "Phát biểu nào sau đây đúng nhất khi phân biệt Checked Exception và Unchecked Exception?",
    "options": [
      "Checked Exception bắt buộc phải được xử lý (bằng try-catch) hoặc khai báo ném đi (throws) tại thời điểm biên dịch, nếu không sẽ bị lỗi Compile-time. Unchecked Exception thì không bắt buộc.",
      "Unchecked Exception là các lớp kế thừa trực tiếp từ `Exception`, Checked Exception kế thừa từ `RuntimeException`.",
      "Checked Exception xảy ra tại thời điểm chạy (Run-time), còn Unchecked Exception xảy ra tại thời điểm biên dịch (Compile-time).",
      "Trình biên dịch bỏ qua mọi Checked Exception nếu chúng ta dùng từ khóa `ignore`."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Checked Exception bị trình biên dịch (Compiler) ép buộc phải xử lý. Unchecked Exception (kế thừa `RuntimeException` hoặc `Error`) không bị ép buộc xử lý ở thời điểm biên dịch.",
    "id": 3,
    "type": "single"
  },
  {
    "content": "Những lớp nào sau đây thuộc nhóm Unchecked Exception?",
    "options": [
      "java.lang.RuntimeException",
      "java.lang.Error",
      "java.io.IOException",
      "java.lang.NullPointerException"
    ],
    "correctAnswers": [
      0,
      1,
      3
    ],
    "rationale": "`RuntimeException`, các lớp con của nó (như `NullPointerException`) và `Error` là Unchecked. `IOException` kế thừa `Exception` nên là Checked.",
    "id": 4,
    "type": "multiple"
  },
  {
    "content": "Sự khác biệt cơ bản giữa từ khóa `throw` và `throws` là gì?",
    "options": [
      "`throw` dùng để khai báo phương thức có thể ném ra ngoại lệ, `throws` dùng để ném ra một đối tượng ngoại lệ cụ thể.",
      "`throw` được sử dụng bên trong thân phương thức để ném ra một ĐỐI TƯỢNG ngoại lệ. `throws` được đặt ở chữ ký phương thức để khai báo LỚP ngoại lệ mà phương thức có thể ném ra.",
      "Cả hai có chức năng giống hệt nhau, `throws` chỉ là dạng số nhiều của `throw` khi ném nhiều ngoại lệ.",
      "`throws` chỉ dùng cho Unchecked Exception, `throw` dùng cho Checked Exception."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "`throw` đi kèm với một instance (ví dụ: `throw new Exception();`). `throws` đi kèm với kiểu/lớp (ví dụ: `void method() throws Exception`).",
    "id": 5,
    "type": "single"
  },
  {
    "content": "Khối `finally` có LUÔN LUÔN được thực thi trong mọi trường hợp, cho dù có xảy ra ngoại lệ hay có lệnh `return` trong khối `try` hay không?",
    "options": [
      "Đúng, không có ngoại lệ nào, `finally` chắc chắn 100% được thực thi.",
      "Sai, khối `finally` sẽ KHÔNG được thực thi nếu gặp lệnh `System.exit()`, hoặc JVM bị crash, máy tính mất nguồn.",
      "Sai, khối `finally` sẽ bị bỏ qua nếu khối `try` có lệnh `return`.",
      "Sai, khối `finally` bị bỏ qua nếu ngoại lệ không được bắt trong khối `catch`."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Lệnh `System.exit(0)` sẽ ngắt ngay lập tức tiến trình JVM, khiến khối `finally` không kịp chạy. Crash JVM cũng vậy.",
    "id": 6,
    "type": "single"
  },
  {
    "content": "Khi định nghĩa một ngoại lệ tự tạo (Custom Exception), nếu muốn nó là một Checked Exception thì lớp đó phải kế thừa từ đâu?",
    "options": [
      "Kế thừa từ `RuntimeException`",
      "Kế thừa trực tiếp từ `Exception` (hoặc một Checked Exception khác)",
      "Kế thừa từ `Error`",
      "Kế thừa từ `Throwable` và triển khai interface `Checked`"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Để tạo Checked Exception, bạn cần kế thừa từ lớp `Exception` (nhưng không phải `RuntimeException`).",
    "id": 7,
    "type": "single"
  },
  {
    "content": "Quy tắc Ghi đè phương thức (Method Overriding) đối với ngoại lệ (Exceptions) là gì? ",
    "options": [
      "Nếu lớp cha không khai báo ném (throws) bất kỳ Checked Exception nào, lớp con ghi đè cũng KHÔNG được phép ném ra Checked Exception mới.",
      "Lớp con ghi đè phương thức có thể ném ra bất kỳ Unchecked Exception (RuntimeException) nào, bất kể lớp cha có khai báo hay không.",
      "Nếu lớp cha ném ra `IOException`, lớp con có thể ném ra `Exception` (lớp cha của IOException).",
      "Lớp con ghi đè phương thức KHÔNG được phép ném ra các Checked Exception rộng hơn (broader) hoặc mới so với phương thức ở lớp cha."
    ],
    "correctAnswers": [
      0,
      1,
      3
    ],
    "rationale": "Luật ghi đè: Không được ném Checked Exception MỚI hoặc RỘNG HƠN lớp cha. Tuy nhiên, được phép ném ngoại lệ HẸP HƠN (subclass) và tự do ném Unchecked Exception.",
    "id": 8,
    "type": "multiple"
  },
  {
    "content": "Có thể sử dụng khối `try` mà KHÔNG có khối `catch` được không?",
    "options": [
      "Không, bắt buộc phải có ít nhất một khối `catch`.",
      "Có, nhưng bắt buộc phải có khối `finally`. (Cấu trúc try-finally)",
      "Có, có thể chỉ đứng một mình từ khóa `try`.",
      "Chỉ được phép nếu trong `try` không có code."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Cấu trúc hợp lệ là `try-catch`, `try-finally`, hoặc `try-catch-finally`. Nếu bỏ qua `catch`, bắt buộc phải có `finally` để dọn dẹp tài nguyên.",
    "id": 9,
    "type": "single"
  },
  {
    "content": "Khi một ngoại lệ được ném ra trong khối `try`, điều gì xảy ra với các dòng code còn lại phía sau bên trong khối `try` đó?",
    "options": [
      "Vẫn được thực thi bình thường.",
      "Bị bỏ qua hoàn toàn, luồng điều khiển chuyển ngay lập tức sang khối `catch` phù hợp (nếu có) hoặc ra ngoài phương thức.",
      "Phụ thuộc vào mức độ nghiêm trọng của ngoại lệ.",
      "Sẽ được thực thi sau khi khối `catch` chạy xong."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Khi xảy ra Exception, execution flow (luồng thực thi) lập tức nhảy ra khỏi khối `try` để tìm khối `catch` khớp.",
    "id": 10,
    "type": "single"
  },
  {
    "content": "Đặc quyền của `RuntimeException` so với `Exception` thông thường là gì?",
    "options": [
      "Chạy nhanh hơn do không bị máy ảo kiểm tra.",
      "Không bắt buộc phải khai báo `throws` trên chữ ký phương thức và không bắt buộc phải bọc trong `try-catch` tại thời điểm biên dịch.",
      "Được phép bắt đa hình (catch polymorphism).",
      "Có thể phục hồi dữ liệu từ database."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "`RuntimeException` là Unchecked Exception, Compiler sẽ không ép buộc programmer phải xử lý hay khai báo nó.",
    "id": 11,
    "type": "single"
  },
  {
    "content": "Giả sử bạn bắt (catch) một ngoại lệ `e`. Lệnh `e.printStackTrace();` có ý nghĩa gì?",
    "options": [
      "Ghi ngoại lệ vào database để truy xuất sau.",
      "In ra màn hình thông báo lỗi và lịch sử các lời gọi hàm (call stack) đã dẫn đến dòng code gây ra ngoại lệ, hỗ trợ rất tốt cho debug.",
      "Chỉ in ra tên của lớp ngoại lệ.",
      "Dừng ngay lập tức chương trình."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "In ra Call Stack (dấu vết ngăn xếp) giúp lập trình viên biết chính xác file nào, dòng nào, chuỗi hàm nào gọi đến vị trí xảy ra lỗi.",
    "id": 12,
    "type": "single"
  },
  {
    "content": "Trong một phương thức, nếu bạn viết `throw new IOException();` nhưng không có khối `try-catch` bao quanh nó, bạn PHẢI làm gì để code biên dịch được?",
    "options": [
      "Không thể làm gì, code luôn lỗi.",
      "Thêm khai báo `throws IOException` vào chữ ký (signature) của phương thức.",
      "Thêm `throws RuntimeException` vào chữ ký phương thức.",
      "Gọi lệnh `System.gc()` trước khi ném."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Vì `IOException` là Checked Exception, quy tắc \"Catch or Specify\" (Bắt hoặc Khai báo) yêu cầu nếu không bắt thì phải chỉ định `throws` trên signature.",
    "id": 13,
    "type": "single"
  },
  {
    "content": "Cú pháp Multi-catch (bắt nhiều ngoại lệ trong một khối catch) xuất hiện từ Java 7 có dạng như thế nào?",
    "options": [
      "`catch (ExceptionA, ExceptionB e)`",
      "`catch (ExceptionA | ExceptionB e)`",
      "`catch (ExceptionA & ExceptionB e)`",
      "`catch (ExceptionA || ExceptionB e)`"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Dấu ngoặc đơn chứa nhiều Exception phân tách bằng ký tự đường ống `|` (Pipe). Ví dụ: `catch (IOException | SQLException e)`.",
    "id": 14,
    "type": "single"
  },
  {
    "content": "Khi sử dụng Multi-catch (`catch (ExceptionA | ExceptionB e)`), quy tắc nào sau đây là BẮT BUỘC?",
    "options": [
      "ExceptionA và ExceptionB không được có quan hệ kế thừa (không được là cha-con) của nhau.",
      "Cả hai phải là Unchecked Exceptions.",
      "Cả hai phải cùng nằm trong một package.",
      "Biến tham chiếu `e` có thể được gán lại giá trị mới bên trong khối catch."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Nếu có quan hệ kế thừa (ví dụ `FileNotFoundException` là con của `IOException`), Compiler sẽ báo lỗi vì việc khai báo lớp con là dư thừa.",
    "id": 15,
    "type": "single"
  },
  {
    "content": "Từ khóa nào KHÔNG nằm trong cơ chế xử lý ngoại lệ của Java?",
    "options": [
      "try",
      "catch",
      "finally",
      "fault"
    ],
    "correctAnswers": [
      3
    ],
    "rationale": "`fault` không phải là keyword của Java. Java sử dụng 5 từ khóa: try, catch, finally, throw, throws.",
    "id": 16,
    "type": "single"
  },
  {
    "content": "Khi nào thì một Custom Exception (Ngoại lệ tự tạo) NÊN kế thừa từ `RuntimeException`?",
    "options": [
      "Khi ngoại lệ đó đại diện cho một lỗi logic nghiêm trọng của lập trình viên (ví dụ truyền sai tham số) mà client không thể làm gì để phục hồi, và ta không muốn ép client phải viết `try-catch` khắp nơi.",
      "Khi muốn kết nối cơ sở dữ liệu.",
      "Khi lỗi đó bắt buộc client phải giải quyết (ví dụ: mất kết nối mạng).",
      "Luôn luôn nên kế thừa từ `RuntimeException` để code ngắn gọn."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Unchecked exceptions (kế thừa RuntimeException) thường dùng cho programming errors hoặc những lỗi mà ứng dụng khó có thể recover (như IllegalArgumentException).",
    "id": 17,
    "type": "single"
  },
  {
    "content": "Ủy nhiệm ngoại lệ (Exception Delegation) nghĩa là gì?",
    "options": [
      "Là việc đổi tên ngoại lệ thành một tên khác dễ hiểu hơn.",
      "Là việc phương thức không trực tiếp xử lý ngoại lệ bằng `try-catch`, mà dùng từ khóa `throws` đẩy trách nhiệm xử lý ngoại lệ đó cho phương thức gọi (caller).",
      "Là việc ủy quyền cho Garbage Collector dọn dẹp ngoại lệ.",
      "Là tạo ra một luồng (Thread) mới để xử lý ngoại lệ độc lập."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Sử dụng `throws` để chuyển việc xử lý lên cấp gọi cao hơn trong Call Stack.",
    "id": 18,
    "type": "single"
  },
  {
    "content": "Phát biểu nào sau đây ĐÚNG về luồng thực thi khi gặp lệnh `throw`?",
    "options": [
      "Lệnh `throw` sẽ ngay lập tức ném ra đối tượng ngoại lệ, các dòng code ngay bên dưới lệnh `throw` trong cùng khối (block) đó sẽ không bao giờ được thực thi (unreachable).",
      "Lệnh `throw` chỉ ghi nhận lỗi, chương trình vẫn chạy tiếp các lệnh dưới nó.",
      "Lệnh `throw` chỉ hoạt động được khi đặt trong khối `catch`.",
      "Lệnh `throw` bắt buộc phải trả về một biến kiểu `int`."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Giống như lệnh `return` hay `break`, lệnh `throw` là lệnh rẽ nhánh luồng thực thi. Code phía sau lệnh `throw` trong cùng khối là Unreachable code.",
    "id": 19,
    "type": "single"
  },
  {
    "content": "Trong tài liệu về Cây ngoại lệ (Exception Tree), lớp nào là cha trực tiếp của `NullPointerException`?",
    "options": [
      "Exception",
      "Error",
      "RuntimeException",
      "IllegalArgumentException"
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "`NullPointerException` là một lỗi logic run-time phổ biến, nó kế thừa trực tiếp từ `RuntimeException`.",
    "id": 20,
    "type": "single"
  },
  {
    "content": "Đoạn code sau gây ra lỗi gì? (Bẫy thứ tự catch)",
    "codeSnippet": "try {\n  FileReader f = new FileReader(\"test.txt\");\n} catch (Exception e) {\n  System.out.println(\"Exception\");\n} catch (FileNotFoundException e) {\n  System.out.println(\"File not found\");\n}",
    "options": [
      "In ra 'Exception'.",
      "In ra 'File not found'.",
      "Lỗi biên dịch (Compile-time error) do Unreachable code.",
      "Lỗi Runtime (Run-time error)."
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Khối `catch (Exception e)` bắt MỌI ngoại lệ (bao gồm cả `FileNotFoundException`). Do đó khối `catch` thứ 2 không bao giờ đạt tới. Java compiler sẽ báo lỗi Unreachable code.",
    "id": 21,
    "type": "single"
  },
  {
    "content": "Kết quả trả về của hàm sau là gì? (Bẫy Return trong Finally)",
    "codeSnippet": "public int testReturn() {\n  try {\n    return 1;\n  } finally {\n    return 2;\n  }\n}",
    "options": [
      "1",
      "2",
      "Lỗi biên dịch do return 2 lần.",
      "Ném ra ngoại lệ."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Khối `finally` luôn chạy sau khi khối `try` chuẩn bị kết thúc. Lệnh `return 2;` trong `finally` sẽ ghi đè kết quả `return 1;` của khối `try`.",
    "id": 22,
    "type": "single"
  },
  {
    "content": "Hàm sau trả về giá trị bao nhiêu? (Bẫy biến cục bộ)",
    "codeSnippet": "public int test() {\n  int x = 1;\n  try {\n    return x;\n  } finally {\n    x = x + 1;\n  }\n}",
    "options": [
      "1",
      "2",
      "Lỗi biên dịch.",
      "0"
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Lệnh `return x;` trong `try` đã đánh giá giá trị x hiện tại (là 1) và đưa vào stack lưu trữ. Khối `finally` chạy và làm x=2, nhưng không làm ảnh hưởng đến giá trị 1 đã được 'đóng gói' để return.",
    "id": 23,
    "type": "single"
  },
  {
    "content": "Đoạn mã sau có hợp lệ không? (Bẫy Checked Exception ẩn)",
    "codeSnippet": "public void doSomething() {\n  throw new InterruptedException();\n}",
    "options": [
      "Hợp lệ, ném ngoại lệ bình thường.",
      "Lỗi biên dịch (Compile error) vì InterruptedException là Checked Exception mà không khai báo throws hoặc try-catch.",
      "Lỗi Runtime.",
      "Cảnh báo nhưng vẫn chạy được."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "`InterruptedException` là Checked Exception. Bạn không thể tuỳ tiện `throw` mà không có `try-catch` bao bọc nó hoặc khai báo `throws InterruptedException` trên chữ ký hàm.",
    "id": 24,
    "type": "single"
  },
  {
    "content": "Điều gì xảy ra với đoạn code sau? (Bẫy System.exit)",
    "codeSnippet": "try {\n  System.out.println(\"A\");\n  System.exit(0);\n} finally {\n  System.out.println(\"B\");\n}",
    "options": [
      "In ra A rồi in ra B.",
      "Chỉ in ra A, chương trình kết thúc ngay, không in B.",
      "Lỗi biên dịch.",
      "In ra B, A không in."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "`System.exit(0)` tắt ngay lập tức máy ảo JVM (Java Virtual Machine), do đó khối `finally` không có cơ hội được thực thi.",
    "id": 25,
    "type": "single"
  },
  {
    "content": "Đoạn mã sau bị lỗi ở dòng nào? (Bẫy Ghi đè ngoại lệ)",
    "codeSnippet": "class Parent {\n  void method() throws IOException { }\n}\nclass Child extends Parent {\n  @Override\n  void method() throws Exception { } // Dòng X\n}",
    "options": [
      "Không có lỗi.",
      "Lỗi tại Dòng X vì lớp con ném ra Checked Exception rộng hơn lớp cha.",
      "Lỗi do thiếu khối try-catch.",
      "Lỗi vì lớp con không được throws bất cứ gì."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Lớp con (`Exception`) lớn hơn lớp cha (`IOException`). Ghi đè phương thức không cho phép mở rộng (ném ngoại lệ rộng hơn) loại Checked Exception.",
    "id": 26,
    "type": "single"
  },
  {
    "content": "Kết quả in ra của đoạn code sau là gì? (Bẫy Execution Flow)",
    "codeSnippet": "try {\n  int a = 10 / 0;\n  System.out.println(\"A\");\n} catch (ArithmeticException e) {\n  System.out.println(\"B\");\n} finally {\n  System.out.println(\"C\");\n}\nSystem.out.println(\"D\");",
    "options": [
      "A B C D",
      "B C D",
      "A C D",
      "B C"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "10/0 sinh lỗi `ArithmeticException`. Lệnh in \"A\" bị bỏ qua. Nhảy vào catch in \"B\". Chạy finally in \"C\". Luồng điều khiển ra ngoài try-catch tiếp tục chạy bình thường in \"D\".",
    "id": 27,
    "type": "single"
  },
  {
    "content": "Đoạn mã sau in ra gì? (Bẫy ngoại lệ không được catch)",
    "codeSnippet": "try {\n  String s = null;\n  s.length();\n} catch (ArithmeticException e) {\n  System.out.println(\"Toán học\");\n} finally {\n  System.out.println(\"Hoàn thành\");\n}\nSystem.out.println(\"Tiếp tục\");",
    "options": [
      "Hoàn thành -> Tiếp tục",
      "Toán học -> Hoàn thành -> Tiếp tục",
      "Hoàn thành -> Sau đó crash chương trình vì NullPointerException không được xử lý.",
      "Crash ngay lập tức, không in gì."
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Lỗi xảy ra là `NullPointerException`, nhưng khối catch chỉ bắt `ArithmeticException`. Vì không bắt trúng, JVM sẽ ném ngoại lệ lên trên. Nhưng TRƯỚC KHI ném, nó vẫn chạy khối `finally` in ra \"Hoàn thành\". Sau đó crash, chữ \"Tiếp tục\" không được in.",
    "id": 28,
    "type": "single"
  },
  {
    "content": "Nếu bạn thực thi lệnh `throw null;` thì chương trình ném ra lỗi gì?",
    "options": [
      "NullPointerException",
      "Lỗi biên dịch",
      "IllegalArgumentException",
      "Không ném gì, bỏ qua lệnh này."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Ném một tham chiếu null (`throw null;`) sẽ kích hoạt máy ảo Java lập tức ném ra `NullPointerException`.",
    "id": 29,
    "type": "single"
  },
  {
    "content": "Đoạn code sau có lỗi biên dịch ở đâu? (Bẫy Unreachable Catch với Multi-catch)",
    "codeSnippet": "try {\n  // Code\n} catch (IOException | FileNotFoundException e) {\n  e.printStackTrace();\n}",
    "options": [
      "Không có lỗi.",
      "Lỗi biên dịch vì `FileNotFoundException` kế thừa từ `IOException`, chúng có quan hệ cha-con nên không được đặt chung trong Multi-catch.",
      "Lỗi vì e phải được khai báo final.",
      "Lỗi vì thiếu khối finally."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Trong Multi-catch (sử dụng dấu `|`), các Exception không được phép có quan hệ kế thừa với nhau để tránh dư thừa (redundant) và lỗi biên dịch.",
    "id": 30,
    "type": "single"
  },
  {
    "content": "Cú pháp sau có hợp lệ không? (Bẫy Throw lại ngoại lệ)",
    "codeSnippet": "try {\n  throw new Exception(\"Lỗi\");\n} catch (Exception e) {\n  throw e;\n}",
    "options": [
      "Hợp lệ, nếu phương thức bao ngoài có khai báo `throws Exception` hoặc được bọc trong một try-catch khác.",
      "Lỗi biên dịch vì không được phép `throw e;` bên trong `catch`.",
      "Lỗi Runtime (StackOverflow).",
      "Hợp lệ và chương trình chạy vô hạn."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Re-throwing (ném lại ngoại lệ) là hoàn toàn hợp lệ trong Java. Tuy nhiên vì nó là Checked Exception, hàm bao ngoài phải xử lý tiếp bằng try-catch hoặc `throws`.",
    "id": 31,
    "type": "single"
  },
  {
    "content": "Kết quả của đoạn mã sau là gì? (Bẫy ném RuntimeException trong Ghi đè)",
    "codeSnippet": "class Parent {\n  void process() { }\n}\nclass Child extends Parent {\n  @Override\n  void process() throws NullPointerException { } // Dòng X\n}",
    "options": [
      "Lỗi biên dịch tại Dòng X vì cha không throws gì mà con lại throws.",
      "Hợp lệ. Vì NullPointerException là Unchecked Exception, lớp con có quyền ném tự do mà không vi phạm luật ghi đè.",
      "Hợp lệ nhưng sẽ bị cảnh báo.",
      "Lỗi Runtime."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Quy tắc chỉ cấm lớp con mở rộng Checked Exception. Đối với Unchecked Exception (như NullPointerException), lớp con có thể `throws` thoải mái mà không lỗi biên dịch.",
    "id": 32,
    "type": "single"
  },
  {
    "content": "Chạy đoạn mã này nhận được gì? (Bẫy đa hình với Exception)",
    "codeSnippet": "try {\n  throw new ArithmeticException();\n} catch (RuntimeException e) {\n  System.out.println(\"Bắt được Runtime\");\n} catch (Exception e) {\n  System.out.println(\"Bắt được Exception\");\n}",
    "options": [
      "Bắt được Exception",
      "Bắt được Runtime",
      "Lỗi biên dịch",
      "Bắt được cả hai"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "`ArithmeticException` kế thừa từ `RuntimeException`. Khối catch đầu tiên bắt theo kiểu đa hình (polymorphism) và khớp, nên in ra \"Bắt được Runtime\" và kết thúc.",
    "id": 33,
    "type": "single"
  },
  {
    "content": "Điều gì xảy ra ở Dòng X? (Bẫy ném Checked Exception vô cớ)",
    "codeSnippet": "public void myMethod() {\n  try {\n    System.out.println(\"Hello\");\n  } catch (IOException e) { // Dòng X\n    System.out.println(\"Lỗi IO\");\n  }\n}",
    "options": [
      "Lỗi biên dịch tại Dòng X vì trong khối try KHÔNG có bất cứ đoạn code nào có khả năng ném ra IOException (Checked Exception).",
      "In ra Hello.",
      "In ra Lỗi IO.",
      "Lỗi Runtime."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Trình biên dịch Java rất thông minh. Nếu trong khối `try` không có mã nào có thể ném ra Checked Exception (trừ Exception chung), việc cố tình `catch` Checked Exception đó sẽ gây lỗi biên dịch.",
    "id": 34,
    "type": "single"
  },
  {
    "content": "Tương tự câu trước, nhưng thay `IOException` bằng `NullPointerException` (Unchecked). Code có biên dịch không?",
    "codeSnippet": "public void myMethod() {\n  try {\n    System.out.println(\"Hello\");\n  } catch (NullPointerException e) { // Dòng Y\n    System.out.println(\"NPE\");\n  }\n}",
    "options": [
      "Lỗi biên dịch.",
      "Hợp lệ, biên dịch và chạy bình thường, in ra \"Hello\".",
      "In ra \"NPE\".",
      "Ném ra ngoại lệ."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Trái ngược với Checked Exception, bạn được phép `catch` các Unchecked Exception (như NullPointerException, RuntimeException, Exception) bất cứ lúc nào, bất kể khối `try` có khả năng ném hay không.",
    "id": 35,
    "type": "single"
  },
  {
    "content": "Giá trị trả về là gì? (Bẫy Return trong Try và Catch)",
    "codeSnippet": "public int getVal() {\n  try {\n    int a = 1 / 0;\n    return 1;\n  } catch (Exception e) {\n    return 2;\n  } finally {\n    System.out.println(\"Fin\");\n  }\n}",
    "options": [
      "In ra Fin, sau đó trả về 2.",
      "Trả về 2, không in gì.",
      "In ra Fin, trả về 1.",
      "Lỗi biên dịch."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "1/0 gây lỗi nhảy vào catch. Catch chuẩn bị `return 2`. Khối `finally` chạy trước, in ra \"Fin\". Sau đó hàm thực sự kết thúc và trả về 2.",
    "id": 36,
    "type": "single"
  },
  {
    "content": "Đoạn mã tự định nghĩa ngoại lệ. Lỗi ở đâu?",
    "codeSnippet": "class TuoiKhongHopLe extends Exception { }\n\npublic class Test {\n  static void checkTuoi(int t) {\n    if (t < 18) throw new TuoiKhongHopLe();\n  }\n}",
    "options": [
      "Thiếu khối try-catch hoặc throws TuoiKhongHopLe ở phương thức checkTuoi.",
      "Kế thừa Exception là sai, phải kế thừa RuntimeException.",
      "Lỗi ở `throw new TuoiKhongHopLe();` vì thiếu message.",
      "Đoạn mã hoàn toàn đúng."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "`TuoiKhongHopLe` kế thừa `Exception` nên nó là Checked Exception. Trong `checkTuoi` ném nó ra nhưng không có try-catch cũng không `throws` trên chữ ký -> Lỗi Compile.",
    "id": 37,
    "type": "single"
  },
  {
    "content": "Nếu bạn có khối `finally`, bạn có cần khối `catch` không? (Đoạn mã thực tế)",
    "codeSnippet": "public void doWork() throws IOException {\n  try {\n    FileReader fr = new FileReader(\"a.txt\");\n  } finally {\n    System.out.println(\"Đã dọn dẹp\");\n  }\n}",
    "options": [
      "Lỗi biên dịch vì bắt buộc phải có catch.",
      "Hợp lệ. Mã này sử dụng try-finally và nhường việc xử lý (throw tiếp) cho phương thức gọi.",
      "Lỗi Runtime.",
      "Lỗi vì không đóng file."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Khối `try-finally` là hoàn toàn hợp lệ. Ngoại lệ sẽ không được xử lý ở đây mà bị ném thẳng ra ngoài (vì hàm có `throws IOException`).",
    "id": 38,
    "type": "single"
  },
  {
    "content": "Giá trị của biến `a` sau khi chạy là bao nhiêu? (Bẫy Gán giá trị khi lỗi)",
    "codeSnippet": "int a = 0;\ntry {\n  a = 5;\n  a = a / 0;\n  a = 10;\n} catch (Exception e) {\n  // empty\n}",
    "options": [
      "0",
      "5",
      "10",
      "Lỗi biên dịch"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "a được gán = 5. Đến lệnh a/0 bị lỗi Exception, ngay lập tức nhảy vào catch. Dòng `a = 10;` không bao giờ chạy. Khối catch rỗng, chương trình đi tiếp. a mang giá trị 5.",
    "id": 39,
    "type": "single"
  },
  {
    "content": "Có thể ném ra Error không?",
    "codeSnippet": "public void test() {\n  throw new StackOverflowError();\n}",
    "options": [
      "Không, Error do JVM tạo ra, lập trình viên không được dùng từ khóa `throw` với Error.",
      "Được, mã hợp lệ và chương trình sẽ ném ra lỗi Runtime.",
      "Được, nhưng phải bắt bằng try-catch.",
      "Lỗi biên dịch."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Bạn hoàn toàn có thể `throw` bất kỳ đối tượng nào kế thừa từ `Throwable` (bao gồm cả `Error`). Mặc dù thực tế rất ít khi làm vậy, nó hoàn toàn hợp lệ về cú pháp.",
    "id": 40,
    "type": "single"
  },
  {
    "content": "Lệnh in nào sẽ được thực thi? (Bẫy cấu trúc if-else với Exceptions)",
    "codeSnippet": "try {\n  throw new RuntimeException(\"Lỗi R\");\n} catch (Exception e) {\n  if (e instanceof RuntimeException) {\n    System.out.println(\"A\");\n  } else {\n    System.out.println(\"B\");\n  }\n}",
    "options": [
      "A",
      "B",
      "Cả A và B",
      "Lỗi biên dịch"
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Ngoại lệ ném ra thực sự là RuntimeException. Mặc dù bị bắt bởi `catch (Exception e)` do đa hình, bản chất kiểu đối tượng ở runtime vẫn là RuntimeException. Toán tử `instanceof` đánh giá là `true`. In ra A.",
    "id": 41,
    "type": "single"
  },
  {
    "content": "Lỗi Unreachable Code với throw:",
    "codeSnippet": "public void demo() {\n  throw new RuntimeException();\n  System.out.println(\"Demo\"); // Dòng X\n}",
    "options": [
      "In ra Demo.",
      "Lỗi Runtime.",
      "Lỗi biên dịch (Compile Error) tại Dòng X vì Unreachable code.",
      "In ra tên Exception rồi in Demo."
    ],
    "correctAnswers": [
      2
    ],
    "rationale": "Bất kỳ đoạn code nào nằm ngay phía sau lệnh `throw` không điều kiện (trong cùng block) đều là Unreachable code. Trình biên dịch sẽ báo lỗi chặn ngay.",
    "id": 42,
    "type": "single"
  },
  {
    "content": "Bẫy lồng Try-Catch (Nested try-catch). In ra gì?",
    "codeSnippet": "try {\n  try {\n    throw new Exception(\"X\");\n  } finally {\n    System.out.print(\"F1 \");\n  }\n} catch (Exception e) {\n  System.out.print(\"C \");\n}",
    "options": [
      "C F1",
      "F1 C",
      "Lỗi biên dịch do khối try bên trong không có catch.",
      "Chỉ in F1"
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Lỗi ném ra từ khối try bên trong. Nó không có catch nhưng có finally -> chạy finally in \"F1 \". Ngoại lệ X tiếp tục ném ra ngoài, khối catch bên ngoài bắt được -> in \"C \".",
    "id": 43,
    "type": "single"
  },
  {
    "content": "Hàm sau có lỗi biên dịch không? (Missing return statement trap)",
    "codeSnippet": "public int getNumber() {\n  try {\n    return 1;\n  } catch (Exception e) {\n    return 0;\n  }\n}",
    "options": [
      "Không lỗi. Hàm trả về int đúng quy định trong mọi luồng đi.",
      "Lỗi biên dịch vì thiếu `return` ở ngoài cùng.",
      "Lỗi Runtime.",
      "Trả về 0 trong mọi trường hợp."
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Trình biên dịch đủ thông minh để hiểu rằng: Nếu thành công, trả về 1. Nếu lỗi, nhảy vào catch trả về 0. Cả 2 luồng đều có lệnh return. Không cần lệnh return ở ngoài cùng.",
    "id": 44,
    "type": "single"
  },
  {
    "content": "Nếu thay đổi hàm ở câu trước, bỏ `return` trong catch đi:",
    "codeSnippet": "public int getNumber() {\n  try {\n    return 1;\n  } catch (Exception e) {\n    System.out.println(\"Error\");\n  }\n}",
    "options": [
      "Vẫn không lỗi.",
      "Lỗi biên dịch: Missing return statement.",
      "Trả về 1 mặc định.",
      "Lỗi NullPointerException."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Nếu có Exception xảy ra, luồng nhảy vào catch, in ra màn hình, rồi đi ra ngoài. Nhưng ngoài cùng không có lệnh `return` nào cho kiểu `int`. Lỗi: Missing return statement.",
    "id": 45,
    "type": "single"
  },
  {
    "content": "Đoạn mã sau có bắt được lỗi không? (Bẫy đa hình ClassCastException)",
    "codeSnippet": "try {\n  Object o = new Integer(1);\n  String s = (String) o;\n} catch (NumberFormatException e) {\n  System.out.println(\"Number\");\n} catch (Exception e) {\n  System.out.println(\"General\");\n}",
    "options": [
      "In ra Number",
      "In ra General",
      "Lỗi Runtime vì không bắt đúng ClassCastException.",
      "Không lỗi, không in gì."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Việc ép kiểu Integer sang String ném ra `ClassCastException`. Khối catch đầu không khớp. Khối thứ 2 bắt `Exception` (là cha của ClassCastException) nên khớp. In ra \"General\".",
    "id": 46,
    "type": "single"
  },
  {
    "content": "Khối `try-with-resources` (Java 7). Đoạn code nào đúng?",
    "options": [
      "`try (Scanner sc = new Scanner(System.in)) { }`",
      "`try { Scanner sc = new Scanner(); } with (sc) { }`",
      "`try-resources (Scanner sc = new Scanner()) { }`",
      "`try { } resources { }`"
    ],
    "correctAnswers": [
      0
    ],
    "rationale": "Cú pháp chuẩn của try-with-resources là đặt việc khởi tạo tài nguyên trong dấu ngoặc đơn ngay sau từ khóa `try`. Máy ảo sẽ tự động đóng tài nguyên.",
    "id": 47,
    "type": "single"
  },
  {
    "content": "Gán biến trong try-with-resources:",
    "codeSnippet": "try (FileReader fr = new FileReader(\"a.txt\")) {\n  fr = new FileReader(\"b.txt\"); // Dòng X\n} catch(Exception e) {}",
    "options": [
      "Hợp lệ.",
      "Lỗi biên dịch tại Dòng X vì biến tài nguyên trong `try-with-resources` được xem như `final` ngầm định, không thể gán lại.",
      "Lỗi Runtime.",
      "Chỉ báo cảnh báo (warning)."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Biến khởi tạo trong ngoặc đơn của `try` được Java quy định là ngầm định `final` (implicitly final). Không thể thay đổi tham chiếu của nó.",
    "id": 48,
    "type": "single"
  },
  {
    "content": "Bẫy thay đổi biến của Exception trong catch block:",
    "codeSnippet": "try {\n  throw new Exception(\"Lỗi 1\");\n} catch (Exception e) {\n  e = new Exception(\"Lỗi 2\");\n  System.out.println(e.getMessage());\n}",
    "options": [
      "Lỗi 1",
      "Lỗi 2",
      "Lỗi biên dịch vì biến e là final ngầm định.",
      "Lỗi biên dịch vì không được phép gán e."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Biến `e` trong catch KHÔNG phải là final (trừ phi có multi-catch). Khối catch ở đây bắt 1 ngoại lệ duy nhất, do đó có thể gán `e` tham chiếu đến đối tượng khác. In ra \"Lỗi 2\".",
    "id": 49,
    "type": "single"
  },
  {
    "content": "Bẫy thay đổi biến trong Multi-catch:",
    "codeSnippet": "try {\n  // ...\n} catch (IOException | SQLException e) {\n  e = new Exception(); // Dòng X\n}",
    "options": [
      "Hợp lệ.",
      "Lỗi biên dịch tại Dòng X vì biến e trong khối Multi-catch LÀ final ngầm định.",
      "Lỗi Runtime.",
      "Ném ngoại lệ mới."
    ],
    "correctAnswers": [
      1
    ],
    "rationale": "Khác với catch thông thường, biến ngoại lệ trong `Multi-catch` bị trình biên dịch ép là `implicitly final` để đảm bảo tính nhất quán của kiểu đa hình tĩnh. Gán lại sẽ báo lỗi.",
    "id": 50,
    "type": "single"
  }
];

export default function ExceptionQuiz() {
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
    <div className="min-h-screen bg-slate-100 py-10 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-5xl mx-auto">
        {/* Sticky Header */}
        <div className="bg-white shadow-lg rounded-xl overflow-hidden mb-10 sticky top-0 z-50 border-t-8 border-rose-600">
          <div className="p-6 bg-rose-700 text-white flex flex-col sm:flex-row justify-between items-center gap-4">
            <div>
              <h1 className="text-2xl font-bold tracking-tight">HUST - Bài thi OOP</h1>
              <p className="text-rose-200 mt-1">Bài 10: Ngoại lệ và Xử lý ngoại lệ (50 Câu Hỏi Đánh Đố)</p>
            </div>
            {submitted && (
              <div className="text-2xl font-extrabold bg-white text-rose-700 px-6 py-2 rounded-full shadow-md">
                Điểm: {score}/{questions.length}
              </div>
            )}
          </div>
          <div className="w-full bg-rose-100 h-3">
            <div className="bg-teal-500 h-3 transition-all duration-500 ease-out" style={{ width: `${progress}%` }}></div>
          </div>
          {!submitted && (
            <div className="p-3 text-center text-sm font-medium text-slate-600 bg-slate-50 border-b border-slate-200">
              Đã làm: <span className="text-rose-600 font-bold">{Object.keys(answers).length}</span> / {questions.length} câu
            </div>
          )}
        </div>

        {/* Questions */}
        <div className="space-y-8">
          {questions.map((q, index) => {
            const userAns = answers[q.id] || [];
            const isCorrect = userAns.length === q.correctAnswers.length && userAns.every(v => q.correctAnswers.includes(v));

            return (
              <div key={q.id} className={`bg-white rounded-xl shadow-md overflow-hidden transition-all duration-300 ${submitted ? (isCorrect ? 'ring-2 ring-teal-500' : 'ring-2 ring-rose-500') : 'hover:shadow-lg border border-slate-200'}`}>
                <div className={`p-6 ${submitted ? (isCorrect ? 'bg-teal-50/30' : 'bg-rose-50/30') : ''}`}>
                  <h3 className="text-lg font-bold text-slate-800 mb-3 leading-relaxed">
                    <span className="text-rose-600 mr-2 bg-rose-100 px-3 py-1 rounded-full text-sm">Câu {index + 1}</span> 
                    {q.content} 
                    {q.type === 'multiple' && <span className="inline-block text-xs font-semibold text-sky-600 bg-sky-100 px-2 py-1 rounded ml-2 uppercase tracking-wide">Chọn nhiều đáp án</span>}
                  </h3>
                  
                  {q.codeSnippet && (
                    <div className="my-5 relative">
                      <div className="absolute top-0 left-0 bg-slate-700 text-slate-300 text-xs px-3 py-1 rounded-br-lg rounded-tl-md font-mono">Java</div>
                      <pre className="bg-slate-900 text-teal-400 p-5 pt-8 rounded-md overflow-x-auto text-sm font-mono shadow-inner leading-relaxed">
                        <code>{q.codeSnippet}</code>
                      </pre>
                    </div>
                  )}

                  <div className="space-y-3 mt-5">
                    {q.options.map((opt, optIdx) => {
                      const isSelected = userAns.includes(optIdx);
                      const isCorrectOpt = q.correctAnswers.includes(optIdx);
                      
                      let optionClasses = "flex items-start p-4 rounded-lg border-2 transition-all cursor-pointer ";
                      
                      if (!submitted) {
                        optionClasses += isSelected 
                          ? "bg-rose-50 border-rose-400 shadow-sm text-rose-900 font-medium" 
                          : "border-slate-100 hover:border-rose-200 hover:bg-slate-50 text-slate-700";
                      } else {
                        if (isCorrectOpt) {
                          optionClasses += "bg-teal-100 border-teal-500 text-teal-900 font-bold ";
                        } else if (isSelected && !isCorrectOpt) {
                          optionClasses += "bg-rose-100 border-rose-500 text-rose-900 line-through font-medium opacity-80 ";
                        } else {
                          optionClasses += "opacity-40 border-slate-100 bg-slate-50 text-slate-500 ";
                        }
                      }

                      return (
                        <div 
                          key={optIdx} 
                          className={optionClasses}
                          onClick={() => handleSelect(q.id, optIdx, q.type)}
                        >
                          <div className="flex-shrink-0 mt-0.5 mr-4">
                            {q.type === 'single' ? (
                              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${isSelected && !submitted ? 'border-rose-600' : submitted && isCorrectOpt ? 'border-teal-600 bg-teal-600' : submitted && isSelected ? 'border-rose-600 bg-rose-600' : 'border-slate-300'}`}>
                                {(isSelected || (submitted && isCorrectOpt)) && <div className={`w-2.5 h-2.5 rounded-full ${submitted && (isCorrectOpt || isSelected) ? 'bg-white' : 'bg-rose-600'}`}></div>}
                              </div>
                            ) : (
                              <div className={`w-5 h-5 rounded border-2 flex items-center justify-center ${isSelected && !submitted ? 'border-rose-600 bg-rose-50' : submitted && isCorrectOpt ? 'border-teal-600 bg-teal-600' : submitted && isSelected ? 'border-rose-600 bg-rose-600' : 'border-slate-300 bg-white'}`}>
                                {(isSelected || (submitted && isCorrectOpt)) && <svg className={`w-3.5 h-3.5 ${submitted ? 'text-white' : 'text-rose-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" /></svg>}
                              </div>
                            )}
                          </div>
                          <span className="text-base leading-snug pt-px">{opt}</span>
                        </div>
                      );
                    })}
                  </div>

                  {submitted && (
                    <div className={`mt-6 p-5 rounded-lg border ${isCorrect ? 'bg-teal-50 border-teal-200' : 'bg-rose-50 border-rose-200'}`}>
                      <h4 className={`font-bold mb-2 flex items-center text-lg ${isCorrect ? 'text-teal-700' : 'text-rose-700'}`}>
                        {isCorrect ? (
                          <><svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Trả lời chính xác!</>
                        ) : (
                          <><svg className="w-6 h-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg> Sai rồi!</>
                        )}
                      </h4>
                      <p className="text-slate-700 leading-relaxed"><span className="font-semibold text-slate-900 bg-white px-2 py-1 rounded shadow-sm mr-2 text-sm">Giải thích chuyên sâu:</span> {q.rationale}</p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action Button */}
        {!submitted && (
          <div className="mt-12 mb-20 text-center">
            <button 
              onClick={handleSubmit}
              disabled={Object.keys(answers).length === 0}
              className="bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 text-white font-bold py-4 px-12 rounded-full shadow-xl transition-all transform hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none text-lg tracking-wide"
            >
              Nộp Bài & Xem Điểm
            </button>
          </div>
        )}
        
        {/* Results Modal / Banner */}
        {submitted && (
          <div className="mt-12 mb-20 p-8 bg-white rounded-2xl shadow-2xl text-center space-y-6 border-t-8 border-rose-600 relative overflow-hidden">
             <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-rose-400 to-teal-400"></div>
             <h2 className="text-2xl font-bold text-slate-600">Tổng kết bài thi</h2>
             <div className="text-5xl font-black text-slate-800">
               <span className={score >= 40 ? 'text-teal-600' : 'text-rose-600'}>{score}</span> 
               <span className="text-slate-300 text-4xl"> / {questions.length}</span>
             </div>
             <p className="text-slate-600 text-xl max-w-2xl mx-auto leading-relaxed">
               {score >= 45 ? '🎉 Xuất sắc! Bạn thực sự là một Master về Xử lý ngoại lệ trong Java.' 
                : score >= 35 ? '🔥 Rất tốt! Bạn nắm vững đa số các bẫy khét lẹt của Lập trình Hướng đối tượng.' 
                : '📚 Bạn đã sập khá nhiều bẫy biên dịch. Hãy ôn lại thật kỹ slide bài giảng về Compile-time vs Run-time nhé!'}
             </p>
             <button 
                onClick={() => {
                  setAnswers({});
                  setSubmitted(false);
                  setScore(0);
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="mt-6 bg-slate-800 hover:bg-slate-900 text-white font-bold py-3 px-10 rounded-full transition-all shadow-lg hover:shadow-xl flex items-center justify-center mx-auto"
              >
                <svg className="w-5 h-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" /></svg>
                Làm Lại Bài Thi
              </button>
          </div>
        )}
      </div>
    </div>
  );
}
