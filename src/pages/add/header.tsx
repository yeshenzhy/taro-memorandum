import {backImg,deleteImg,clearImg } from "@/utils/base64";
import { View,Text } from "@tarojs/components";
import { observer } from "mobx-react";
import Taro from "@tarojs/taro";
import store from "@/store/index";
// 头部操作按钮
const Header = observer((props) => {
  const {clearData, deleteData} = props;
  const backIconStyle = {
    background: `url(${backImg})`,
    backgroundSize: "100% 100%"
  };
  const deleteIconStyle = {
    background: `url(${deleteImg})`,
    backgroundSize: "100% 100%"
  };
  const clearIconStyle = {
    background: `url(${clearImg})`,
    backgroundSize: "100% 100%"
  };
  const back = () => {
    Taro.switchTab({
      url: "/pages/index/index"
    });
  };
  return (
    <View className="header">
      {
        store.dataInfo.type === "edit" ? (
          <View className="btn back" onClick={back}>
            <View className="icon" style={backIconStyle}></View>
            <Text className="text">返回</Text>
          </View>
        ) : null
      }
      <View className="btn clear" onClick={clearData}>
        <View className="icon" style={clearIconStyle}></View>
        <Text className="text">清空</Text>
      </View>
      {
        store.dataInfo.type === "edit" ? (
          <View className="btn delete" onClick={deleteData}>
            <View className="icon" style={deleteIconStyle}></View>
            <Text className="text">删除</Text>
          </View>
        ) : null
      }
    </View>
  );
});

export default Header;
