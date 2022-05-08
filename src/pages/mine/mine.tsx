import { View, Image} from "@tarojs/components";
import { logoImg } from "@/utils/base64";
// import { AtButton, AtCalendar } from "taro-ui";
import "./mine.scss";


const Mine = () => {
  return (
    <View className="page-wrapper">
      <Image
        className="icon-logo"
        src={logoImg}
      />
      <View className="bold">关于夜神备忘录</View>
      <View className="text">只是记录一个简单的信息，所有信息均保存在手机缓存中，仅供技术交流，请勿用于商业及非法用途，如产生法律纠纷与本人无关！！！</View>
    </View>
  );
};
export default Mine;


