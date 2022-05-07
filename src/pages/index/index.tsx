import { View, Image, Text} from "@tarojs/components";
import { AtSwipeAction, AtListItem  } from "taro-ui";
import Taro, {useDidShow} from "@tarojs/taro";
import { observer } from "mobx-react";
import { useState } from "react";
import store from "@/store/index";
import { useStorage } from "taro-hooks";
import { emptyImg,dListImg,sListImg} from "@/utils/base64";
import {  colorBrand } from "@/color.scss";
import "./index.scss";


// 暂无数据
const Empty = ({list}) => {
  const switchTab = () => {
    Taro.switchTab({
      url: "/pages/add/add"
    });
    store.handleData({
      type: "add"
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

// 单列表模式
const SingleList = () => {

};
const DoubleList = () => {

};
// 列表组件
const List = ({list}) => {



  const handleClick = (option,index,e) => {
    e.stopPropagation();

  };
  const goEdit = (id:string) => {

    Taro.switchTab({
      url: "/pages/add/add"
    });
    store.handleData({
      type: "edit",
      id
    });
  };
  return (
    <View className="list">
    {
      list.map((item, index) => (
        <View key={index} className="list-item" onClick={() => goEdit(item.id)}>
          <AtSwipeAction
            key={index}
            autoClose
            isOpened={false}
            onClick={handleClick}
            options={[
            {
              text: "取消",
              style: {
                backgroundColor: colorBrand
              },
              className: {
                index,
                ...item
              }
            },
            {
              text: "删除",
              style: {
                backgroundColor: "#f00"
              },
              className: {
                index,
                ...item
              }
            }
          ]}
          >
            <AtListItem title={item.title} />
          </AtSwipeAction>
        </View>

      ))
    }
    </View>
  );
};
const Header = observer(() => {
  const {isDoubleList} = store;
  const changeListType = () => {
    store.setListType(!store.isDoubleList);
  };
  return (
    <View className="header">
    <View className="icon" onClick={changeListType}>
      <Image
        className="icon-list-type"
        src={isDoubleList ? dListImg : sListImg}
      />
    </View>
  </View>
  );
});
const Home = observer(() => {
  const [, { get }] = useStorage();
  const [list, setList] = useState<Array<object>>([]);
  useDidShow( async () => {
    store.handleData({
      type: ""
    });
    try {
      setList(await get("list"));
    } catch (error) {
      setList([]);
    }
  });
  return (
    <View className="page-wrapper">
      {list.length ? <Header></Header> : null}
      <Empty list={list}></Empty>
      <List list={list}></List>
    </View>
  );
});
export default Home;

