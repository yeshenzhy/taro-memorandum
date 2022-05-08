import { View } from "@tarojs/components";
import Taro, { useDidHide, useDidShow} from "@tarojs/taro";
import { useState } from "react";

import { AtToast,AtModal } from "taro-ui";
import { observer } from "mobx-react";
import { useStorage,useDebounceFn } from "taro-hooks";
import toDate from "@/utils/time-format";
import store from "@/store/index";
import uuid from "@/utils/uuid";
import "./add.scss";

import Header from "./header";
import Main from "./main";





const PageAdd = () => {
  interface ToastInfo{
    status?: "success" | "error" | "loading" | undefined;
    isOpened: boolean;
    duration?: number;
    text?:string;
  }
  interface List {
    title:string;
    content: string,
    date: string,
    id: string
  }
  const [titleValue, setTitleValue] = useState<string>("");
  const [txt, setTxt] = useState<string>("");
  const [{text,status,duration,isOpened }, setToastInfo] = useState<ToastInfo>({
    isOpened: false,
    duration: 1000
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  const [, { set,get }] = useStorage();
  // 获取当前item
  const getCurrentItem = async (id:string|undefined) => {
    let list:Array<List> = [];
    try {
      list = await get("list");
    } catch (error) {
      list = [];
    }
    if (!id) {
      return {
        list,
        item: null
      };
    };
    return {
      list,
      item: list.find(e => e.id === id) || null
    };
  };
  // 初始化
  const init = async () => {
    const { dataInfo: {type,id} } = store;
    if (type === "edit" && id) {
      Taro.setNavigationBarTitle({
        title: "备忘录-编辑"
      });
      const itemData = await getCurrentItem(id);
      if(itemData && itemData.item) {
        setTitleValue(itemData.item.title);
        setTxt(itemData.item.content);
      }
    } else {
      Taro.setNavigationBarTitle({
        title: "备忘录-新建"
      });
    }

  };
  // 获取编辑信息
  useDidHide(() => {
    clearData();
  });
  useDidShow(() => {
    init();
  });
  // 保存
  const saveData  = async () => {
    const { dataInfo: {type,id} } = store;
    if (!titleValue.trim()) {
      setToastInfo({
        isOpened: true,
        duration: 1000,
        text: "请输入标题"
      });
    } else if (!txt.trim()) {
      setToastInfo({
        isOpened: true,
        duration: 1000,
        text: "请输入内容"
      });
    } else{
      const {list} = await getCurrentItem(id);
      if (type === "edit" && id) {
        // 编辑
        const index = list.findIndex(e => e.id === id);
        list[index].content = txt;
        list[index].title = titleValue;
        await setStorage("list", list);
        // 保存
        setToastInfo({
          isOpened: true,
          duration: 1000,
          status: "success",
          text: `保存成功${store.dataInfo.type ? "" : "，请继续填写"}`
        });
      } else {
        // 新建
        list.unshift({
          title: titleValue,
          content:txt,
          date: toDate(new Date().getTime(), "yyyy-MM-dd hh:mm:ss").nowTime,
          id: uuid()
        });
        await setStorage("list", list);
        // 保存
        setToastInfo({
          isOpened: true,
          duration: 1000,
          status: "success",
          text: `保存成功${store.dataInfo.type ? "" : "，请继续填写"}`
        });
      }
    }


  };
  // 设置缓存
  const setStorage = async (key:string, list: Array<List>) => {
    await set(key, list);
    setShowModal(false);
    if (store.dataInfo.type) {
      setTimeout(() => {
        Taro.switchTab({
          url: "/pages/index/index"
        });
        clearData();
        store.handleData({
          type: ""
        });
      },1000);

    } else {
      setTimeout(() => {
        clearData();
        store.handleData({
          type: ""
        });
      },1000);
    }
  };
  // 删除
  const deleteData = () => {
    setShowModal(true);
  };
  // 弹窗-取消
  const handleCancel = () => {
    setShowModal(false);
  };
  // 弹窗-确认删除
  const handleConfirm = async() => {
    const { dataInfo: {id} } = store;
    const itemData = await getCurrentItem(id);

    if(itemData && itemData.item) {
      const list:Array<List> = itemData.list || [];
      const ids = itemData.item.id;
      const index = list.findIndex(e => e.id === ids);
      list.splice(index, 1);
      await setStorage("list", list);
      setToastInfo({
        isOpened: true,
        duration: 1000,
        status: "success",
        text: "删除成功"
      });
    }
  };
  // 清空
  const clearData = () => {
    setTitleValue("");
    setTxt("");
  };
  return (
    <View className="page-wrapper">
      <Header clearData={clearData} deleteData={deleteData}></Header>
      <Main
        saveData={useDebounceFn(saveData,{wait: 500}).run}
        setTitleValue={setTitleValue}
        setTxt={setTxt}
        titleValue={titleValue}
        txt={txt}>
      </Main>
      <AtToast
        duration={duration}
        isOpened={isOpened}
        onClose={() => {
          setToastInfo((prev) => {
            return {
              ...prev,
              text: "",
              isOpened: false
            };
          });
        }}
        status={status}
        text={text}></AtToast>
      <AtModal
        cancelText="取消"
        confirmText="确认"
        content="确认要删除该条备忘录吗？"
        isOpened={showModal}
        onCancel={handleCancel}
        onClose={handleCancel}
        onConfirm={handleConfirm}
        title="删除确认"
/>
    </View>

  );
};
export default observer(PageAdd);






