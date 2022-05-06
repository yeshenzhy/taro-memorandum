import { View,Text } from "@tarojs/components";
// import { observer, useLocalStore } from "mobx-react";
// import store from "@/store/index";
// import { AtButton } from "taro-ui";
// import { useRouter } from "@tarojs/taro";
import "./add.scss";
import {backImg,deleteImg,saveImg } from "@/utils/base64";

const PageAdd = () => {
  const backIconStyle = {
    background: `url(${backImg})`,
    backgroundSize: "100% 100%"
  };
  const deleteIconStyle = {
    background: `url(${deleteImg})`,
    backgroundSize: "100% 100%"
  };
  const saveIconStyle = {
    background: `url(${saveImg})`,
    backgroundSize: "100% 100%"
  };
  return (
    <View className="page-wrapper">
      <View className="header">
        <View className="btn back">
          <View className="icon" style={backIconStyle}></View>
          <Text className="text">返回</Text>
        </View>
        <View className="btn delete">
          <View className="icon" style={deleteIconStyle}></View>
          <Text className="text">删除</Text>
          </View>
        <View className="btn save">
          <View className="icon" style={saveIconStyle}></View>
          <Text className="text">保存</Text>
        </View>
      </View>
    </View>
  );
};
export default PageAdd;






