import React, { useReducer, useState } from "react";
import Meals from "./components/Meals/Meals";
import CartContext from "./store/cart-context";
import FilterMeals from "./components/FilterMeals/FilterMeals";
import Cart from "./components/Cart/Cart";
//模拟一组食物数据
const MEALS_DATA = [
  {
    id: "1",
    title: "树莓薄荷饮",
    desc: "十分提神的薄荷饮料，用树莓加以装饰，散发着雅制的清香。",
    price: 12,
    img: "/img/meals/1.jpg",
  },
  {
    id: "2",
    title: "冰钩钩果汁",
    desc: "在鲜榨的钩钩果果汁中放入冰块并稍加调制，泛起梦幻般的紫色。",
    price: 12,
    img: "/img/meals/2.jpg",
  },
  {
    id: "3",
    title: "脆脆鸡腿堡",
    desc: "香嫩多汁的腿排，让人如同身陷云端般轻易沉醉在这掌中的美味。",
    price: 28,
    img: "/img/meals/3.jpg",
  },
  {
    id: "4",
    title: "香浓土豆泥",
    desc: "香浓美味的土豆泥入口即化，紧接着鲜味与奶味交织迸发。",
    price: 20,
    img: "/img/meals/4.jpg",
  },
  {
    id: "5",
    title: "月亮派",
    desc: "切开娇小肉派的一角，黄油奶香伴随着丰富肉香一同涌入鼻腔。",
    price: 16,
    img: "/img/meals/5.jpg",
  },
  {
    id: "6",
    title: "鸡豆花",
    desc: "形似豆花，成团不散。入口轻抿，细嫩的触感已在舌尖化开。",
    price: 30,
    img: "/img/meals/6.jpg",
  },
  {
    id: "7",
    title: "大黄金吮指鸡",
    desc: "金黄色的外皮将饱满肉汁牢牢锁在禽肉之中，大口咬下倍感满足。",
    price: 23,
    img: "/img/meals/7.jpg",
  },
];

//定义cartReducer
const cartReducer = (state, action) => {
  //对购物车进行复制
  const newCart = { ...state };
  switch (action.type) {
    //向购物车添加商品
    case "ADD":
      //判断购物车是否存在该商品
      if (newCart.items.indexOf(action.meal) === -1) {
        //将meal添加到购物车中
        newCart.items.push(action.meal);
        //修改商品的数量
        action.meal.amount = 1;
      } else {
        //增加商品的数量
        action.meal.amount += 1;
      }

      //增加总数
      newCart.totalAmount += 1;
      //增加总金额
      newCart.totalPrice += action.meal.price;

      return newCart;
    //减少商品数量
    case "REMOVE":
      //减少商品的数量
      action.meal.amount -= 1;
      //检查商品数量是否归0
      if (action.meal.amount === 0) {
        //从购物车中移除商品
        newCart.items.splice(newCart.items.indexOf(action.meal), 1);
      }

      //修改商品总数和总金额
      newCart.totalAmount -= 1;
      newCart.totalPrice -= action.meal.price;
      return newCart;
    //清空购物车
    case "CLEAR":
      // 将购物车中商品的数量清0
      newCart.items.forEach((item) => delete item.amount);
      newCart.items = [];
      newCart.totalAmount = 0;
      newCart.totalPrice = 0;
      return newCart;
    default:
      return state;
  }
};
const App = () => {
  /* 创建一个state，用来储存购物车
   * 1.商品[]
   * 2.商品总数totalAmount
   * 3.商品总价totalPrice
   */
  /* const [cartData, setCartData] = useState({
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  }); */

  //创建一个reducer
  const [cartData, cartDispatch] = useReducer(cartReducer, {
    items: [],
    totalAmount: 0,
    totalPrice: 0,
  });

  //创建一个过滤meals的函数
  const filterHandler = (keyword) => {
    const newMealsData = MEALS_DATA.filter(
      (item) => item.title.indexOf(keyword) !== -1
    );
    setMealsData(newMealsData);
  };

  //创建一个state用来储存食物列表
  const [mealsData, setMealsData] = useState(MEALS_DATA);
  // console.log(setMealsData);

  return (
    <CartContext.Provider value={{ ...cartData, cartDispatch }}>
      <div>
        <FilterMeals onFilter={filterHandler} />
        <Meals mealsData={mealsData} />
        <Cart />
      </div>
    </CartContext.Provider>
  );
};

export default App;
