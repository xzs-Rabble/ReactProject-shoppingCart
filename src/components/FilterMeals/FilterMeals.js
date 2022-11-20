import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import classes from "./FilterMeals.module.css";

const FilterMeals = (props) => {
  const [keyword, setKeyword] = useState("");

  //通过Effect来改造练习
  useEffect(() => {
    //降低数据过滤的次数，提高用户体验
    //用户输入完了你在过滤，用户输入的过程中不要过滤
    //当用户停止输入动作1秒后，我们才做查询
    const timer = setTimeout(() => {
      console.log("effect触发");
      props.onFilter(keyword);
    }, 1000);

    //在effect的回调函数中，可以指定一个函数作为返回值
    //这个函数可以称为其为清理函数，它会在下次effect函数执行前调用
    return () => {
      clearTimeout(timer);
    };
  }, [keyword]);

  const inputChangeHandler = (e) => {
    // props.onFilter(e.target.value);
    setKeyword(e.target.value.trim());
  };

  return (
    <div className={classes.FilterMeals}>
      <div className={classes.InputOuter}>
        <input
          value={keyword}
          onChange={inputChangeHandler}
          className={classes.SearchInput}
          type="text"
          placeholder={"请输入关键字"}
        />
        <FontAwesomeIcon className={classes.SearchIcon} icon={faSearch} />
      </div>
    </div>
  );
};

export default FilterMeals;
