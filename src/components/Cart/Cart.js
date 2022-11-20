import React, { useContext, useEffect, useState } from "react";
import classes from "./Cart.module.css";
import iconImg from "../../asset/bag.png";
import CartContext from "../../store/cart-context";
import CartDetails from "./CartDetails/CartDetails";
import Checkout from "./Checkout/Checkout";

const Cart = () => {
  // console.log("重新渲染");
  const ctx = useContext(CartContext);

  //添加一个state来设置详情是否显示
  const [showDetails, setShowDetails] = useState(false);

  //添加一个state来设置结账页是否显示
  const [showCheckout, setShowCheckout] = useState(false);

  //在组件每次重新渲染时，检查商品的总数量是否为0，修改showDetails为false
  //会进入死循环！！！
  // if (ctx.totalAmount === 0) {
  //   setShowDetails(false);
  // }

  /* 默认情况下，useEffect()在每次渲染完成后都会调用一次
    只有当第二个参数变化时，useEffect才会被调用
  */
  useEffect(() => {
    console.log("effect执行");
    if (ctx.totalAmount === 0) {
      //购物车已经被清空
      setShowDetails(false);
      //结账页清空
      setShowCheckout(false);
    }
  }, [ctx]);

  //添加一个显示详情页的函数
  const toggleDetailsHandler = () => {
    if (ctx.totalAmount === 0) {
      setShowDetails(false);
      return;
    }
    setShowDetails((prevState) => !prevState);
    // e.stopPropagation();
  };

  //添加一个显示结账页的函数
  const showCheckoutHandler = () => {
    if (ctx.totalAmount === 0) return;
    setShowCheckout(true);
    // e.stopPropagation();
  };
  //添加一个隐藏结账页的函数
  const hideCheckoutHandler = () => {
    setShowCheckout(false);
    // e.stopPropagation();
  };

  return (
    <div className={classes.Cart} onClick={toggleDetailsHandler}>
      {showCheckout && <Checkout onHide={hideCheckoutHandler} />}
      {/* 引入购物车的详情 */}
      {showDetails && <CartDetails />}
      <div className={classes.Icon}>
        <img src={iconImg} alt="" />
        {ctx.totalAmount === 0 ? null : (
          <span className={classes.TotalAmount}>{ctx.totalAmount}</span>
        )}
      </div>
      {ctx.totalAmount === 0 ? (
        <p className={classes.NoMeal}>未选购商品</p>
      ) : (
        <p className={classes.Price}>{ctx.totalPrice}</p>
      )}
      <button
        onClick={showCheckoutHandler}
        className={`${classes.Button} ${
          ctx.totalAmount === 0 ? classes.Disabled : ""
        }`}
      >
        去结算
      </button>{" "}
    </div>
  );
};

export default Cart;
