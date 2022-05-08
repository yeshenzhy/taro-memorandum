
import { AtInput,AtTextarea,AtButton } from "taro-ui";
import { View } from "@tarojs/components";
import LabelTitle from "@/components/label";
import store from "@/store/index";
import { observer } from "mobx-react";
// 主体内容
const Main = observer((props) => {
  const {titleValue,txt,setTxt, setTitleValue, saveData} = props;
  return (
    <View className="main">
      <LabelTitle title="标题"></LabelTitle>
      <View className="input">
        <AtInput
          name="value"
          onChange={(value:string) => setTitleValue(value.length >= 15 ? value.substr(0,15) : value)}
          placeholder="请输入标题"
          type="text"
          value={titleValue}
        />
      </View>
      <LabelTitle title="内容"></LabelTitle>
      <View className="text-area">
        <AtTextarea
          maxLength={200}
          onChange={(value) => setTxt(value)}
          placeholder="你的内容是..."
          value={txt}
        />
      </View>
      <View className="btn-save">
        <AtButton onClick={saveData} type="primary">{store.dataInfo.type === "edit" ? "保存" : "新建"}</AtButton>
      </View>

    </View>
  );
});

export default Main;
