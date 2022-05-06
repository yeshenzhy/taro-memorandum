import { View,Image, Text } from "@tarojs/components";
import Taro from "@tarojs/taro";
// import { observer, useLocalStore } from "mobx-react";
// import store from "@/store/index";
// import { AtButton } from "taro-ui";
import { emptyImg } from "@/utils/base64";
import "./index.scss";

// 暂无数据
const Empty = ({list}) => {
  const switchTab = () => {
    Taro.switchTab({
      url: "/pages/add/add"
    });
  };
  if (!list.length) {
    return (
      <View className="empty" onClick={switchTab}>
       <Image
           className="empty-img"
           src={emptyImg}
       />
       <Text className="text">暂无数据，点击添加</Text>
      </View>
    );
  }
  return null;
};
// 列表组件
const List = ({list}) => {
  return list.map((val, index) => {
    return (
      <View key={index} className="list">
        {val}
      </View>
    );
  });

};

const Home = () => {
  const list:Array<object> = [];
  return (
    <View className="page-wrapper">
      <Empty list={list}></Empty>
      <List list={list}></List>
    </View>
  );
};
export default Home;

