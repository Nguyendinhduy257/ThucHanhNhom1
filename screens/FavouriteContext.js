import React, { createContext, useState } from 'react';

export const FavouriteContext = createContext();

export const FavouriteProvider = ({ children }) => {
  const [favourites, setFavourites] = useState([]);

  const toggleFavourite = (product) => {
    // 1. CHẶN NGAY NẾU DỮ LIỆU RỖNG
    if (!product) return;

    // 2. Lấy ID chuẩn (ưu tiên id, nếu không có id thì dùng name hoặc title)
    const productId = product.id || product.name || product.title;

    // Báo lỗi ra console nếu sản phẩm này hoàn toàn không có ID hay Tên (Giúp bạn dễ debug)
    if (!productId) {
      console.log("LỖI: Sản phẩm này không có id, name hay title để lưu!", product);
      return; 
    }

    setFavourites((prevFavourites) => {
      // 3. So sánh cực kỳ chặt chẽ
      const isExist = prevFavourites.some(item => 
        (item.id && item.id === product.id) || 
        (item.name && item.name === product.name) ||
        (item.title && item.title === product.title)
      );
      
      if (isExist) {
        // GỠ TIM: Lọc bỏ sản phẩm trùng khớp
        return prevFavourites.filter(item => 
          (item.id !== product.id) && 
          (item.name !== product.name) &&
          (item.title !== product.title)
        );
      } else {
        // THÊM TIM: Nhét vào mảng cũ
        return [...prevFavourites, product];
      }
    });
  };

  return (
    <FavouriteContext.Provider value={{ favourites, toggleFavourite }}>
      {children}
    </FavouriteContext.Provider>
  );
};