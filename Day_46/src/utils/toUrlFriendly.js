export const toUrlFriendly = (str) => {
   return str
      .normalize("NFD") // chuyển đổi các ký tự có dấu thành không dấu
      .replace(/[\u0300-\u036f]/g, "") // loại bỏ các dấu
      .toLowerCase() // chuyển đổi chuỗi thành chữ thường
      .trim() // loại bỏ khoảng trắng ở đầu và cuối chuỗi
      .replace(/\s+/g, "-") // thay thế khoảng trắng bằng dấu gạch ngang
      .replace(/[^\w\-]+/g, "") // loại bỏ tất cả các ký tự không phải là chữ, số hoặc dấu gạch ngang
      .replace(/\-\-+/g, "-"); // thay thế nhiều dấu gạch ngang liên tiếp bằng một dấu gạch ngang
};
