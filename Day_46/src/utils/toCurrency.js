const toVND = (price) => {
   return price.toLocaleString("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
   });
};

export default toVND;
