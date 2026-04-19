// data.js

export const productsData = [
  // --- EXCLUSIVE OFFERS ---
  {
    id: 'ex_1', title: "Organic Bananas", subTitle: "7pcs, Priceg", price: 4.99,
    imagePath: require('./assets/AnhTraiChuoi.png'), category: "Exclusive Offer",
    description: "Chuối hữu cơ tươi ngon, giàu kali và vitamin. Rất tốt cho hệ tiêu hóa và cung cấp năng lượng tức thì cho một ngày làm việc hiệu quả."
  },
  {
    id: 'ex_2', title: "Red Apple", subTitle: "1kg, Priceg", price: 2.99,
    imagePath: require('./assets/AnhTraiTao.png'), category: "Exclusive Offer",
    description: "Táo đỏ giòn ngọt, được hái tận vườn. Chứa nhiều chất chống oxy hóa và vitamin C, hoàn hảo cho một bữa ăn nhẹ lành mạnh."
  },
  {
    id: 'ex_3', title: "Fresh Eggs", subTitle: "10pcs, Priceg", price: 6.99,
    imagePath: require('./assets/EggsV1.png'), category: "Exclusive Offer",
    description: "Trứng gà tươi ngon mỗi ngày. Nguồn cung cấp protein dồi dào cho bữa sáng tuyệt vời của gia đình bạn."
  },
  {
    id: 'ex_4', title: "Egg Pastal", subTitle: "1kg, Priceg", price: 8.99,
    imagePath: require('./assets/eggPasta.png'), category: "Exclusive Offer",
    description: "Mì ý trứng cao cấp, dai ngon sần sật. Dễ dàng chế biến thành nhiều món ăn hấp dẫn chuẩn vị Ý."
  },
  {
    id: 'ex_5', title: "Egg Noodle", subTitle: "1kg, Priceg", price: 12.99,
    imagePath: require('./assets/eggnoodle1.png'), category: "Exclusive Offer",
    description: "Mì trứng sợi nhỏ, mướt mịn. Rất phù hợp để xào hoặc nấu súp, đem lại hương vị đậm đà khó quên."
  },
  {
    id: 'ex_6', title: "Milk Cheese", subTitle: "1kg, Priceg", price: 21.99,
    imagePath: require('./assets/DairyAndEgg.png'), category: "Exclusive Offer",
    // Cố tình bỏ trống description ở đây để test tính năng fallback
  },

  // --- BEST SELLING ---
  {
    id: 'bs_1', title: "Bell Pepper Red", subTitle: "1kg, Priceg", price: 4.99,
    imagePath: require('./assets/AnhOtChuong.png'), category: "Best Selling",
    description: "Ớt chuông đỏ giàu vitamin A và C, làm tăng màu sắc và hương vị cho các món salad và món xào của bạn."
  },
  {
    id: 'bs_2', title: "Diet Coke", subTitle: "250gm, Priceg", price: 1.99,
    imagePath: require('./assets/Coke1.png'), category: "Best Selling",
    description: "Nước ngọt có ga không đường, giải khát sảng khoái mà không lo tăng cân."
  },
  {
    id: 'bs_3', title: "Milk Cheese", subTitle: "550gm, Priceg", price: 14.99,
    imagePath: require('./assets/DairyAndEgg.png'), category: "Best Selling",
    description: "Phô mai sữa béo ngậy, tan chảy cực ngon khi dùng kèm bánh mì hoặc pizza."
  },
  {
    id: 'bs_4', title: "White Egg", subTitle: "350gm, Priceg", price: 9.99,
    imagePath: require('./assets/EggsV1.png'), category: "Best Selling",
    description: "Trứng gà trắng chất lượng cao, vỏ mỏng, lòng đỏ to và béo."
  },
  {
    id: 'bs_5', title: "Sprite", subTitle: "250ml, Priceg", price: 17.99,
    imagePath: require('./assets/sprite.png'), category: "Best Selling",
    description: "Nước ngọt vị chanh trong suốt, thổi bay cơn khát tức thì."
  },

  // --- THỊT (MEAT) ---
  {
    id: 'meat_1', title: "Beef Bone", subTitle: "1kg, Priceg", price: 14.99,
    imagePath: require('./assets/AnhMiengThit.png'), category: "Meat",
    description: "Xương bò hầm ngọt nước, nguyên liệu không thể thiếu cho nồi phở hoặc bún bò chuẩn vị."
  },
  {
    id: 'meat_2', title: "Broiler Chicken", subTitle: "1kg, Priceg", price: 4.99,
    imagePath: require('./assets/AnhThitGa.png'), category: "Meat",
    description: "Gà công nghiệp thịt mềm, dễ chế biến, phù hợp cho các món chiên, nướng hoặc kho."
  },
  {
    id: 'meat_3', title: "Beef Bone", subTitle: "1kg, Priceg", price: 9.99,
    imagePath: require('./assets/AnhMiengThit.png'), category: "Meat",
    // Cố tình bỏ trống để test fallback
  },
  {
    id: 'meat_4', title: "Broiler Chicken", subTitle: "1kg, Priceg", price: 24.99,
    imagePath: require('./assets/AnhThitGa.png'), category: "Meat",
    description: "Gà nguyên con làm sạch, sẵn sàng cho những bữa tiệc gia đình ấm cúng."
  }
];