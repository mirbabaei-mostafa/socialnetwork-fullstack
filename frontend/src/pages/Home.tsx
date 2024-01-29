import React from "react";
import Header from "../components/header/Header";
import LeftMenu from "../components/leftMenu/LeftMenu";
import Posts from "../components/posts/Posts";
import RightSide from "../components/rightSide/RightSide";

const Home = () => {
  return (
    <div className="container flex flex-col">
      <Header />
      <div className="flex flex-row justify-between gap-7 items-start">
        <div className="flex-grow">
          <LeftMenu />
        </div>
        <div className="flex-grow-[3]">
          <Posts />
        </div>
        <div className="flex-grow">
          <RightSide />
        </div>
      </div>
    </div>
  );
};

export default Home;
