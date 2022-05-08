import { View, Image, Text} from "@tarojs/components";
import { AtSwipeAction, AtToast,AtModal } from "taro-ui";
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
const SingleList = ({list, deleteData, goEdit}) => {
  const handleClick = (option,index,e) => {
    e.stopPropagation();
    index === 1 && deleteData(option.className.id);
  };
  return (
    <>
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
              <View className="item">
                <View className="title">{item.title}</View>
                <View className="date">{item.date}</View>
              </View>
            </AtSwipeAction>
          </View>

        ))
      }
    </>
  );
};
const DoubleList = ({list, deleteData, goEdit}) => {
  return (
    <View className="list-item-box">
      {
        list.map((item, index) => (
          <View key={index} className="list-item-double" onClick={() => goEdit(item.id)}
            onLongPress={() => deleteData(item.id)}>
            <View className="title">{item.title}</View>
            <View className="text">{item.content}</View>
            <View className="date">{item.date}</View>
          </View>

        ))
      }
    </View>
  );
};
// 列表组件
const List = observer(({list, deleteData}) => {
  const {isDoubleList} = store;
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
      {isDoubleList ? <DoubleList deleteData={deleteData} goEdit={goEdit} list={list}></DoubleList> : <SingleList deleteData={deleteData} goEdit={goEdit} list={list}></SingleList>}
    </View>
  );
});
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

  const [, { get,set }] = useStorage();
  const [list, setList] = useState<Array<List>>([]);
  const [deleteID, setDeleteID] = useState<string>("");
  const [{text,status,duration,isOpened }, setToastInfo] = useState<ToastInfo>({
    isOpened: false,
    duration: 1000
  });
  const [showModal, setShowModal] = useState<boolean>(false);
  // const sortList = (arr, columns) => {
  //   const cols = columns;
  //   const out:any = [];
  //   let col = 0;
  //   while(col < cols) {
  //       for(let i = 0; i < arr.length; i += cols) {
  //           let _val = arr[i + col];
  //           if (_val !== undefined)
  //               out.push(_val);
  //       }
  //       col++;
  //   }
  //   return out;

  // };
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
    // 设置缓存
    const setStorage = async (key:string, lists: Array<List>) => {
      await set(key, lists);
      setShowModal(false);
    };
    // 删除
    const deleteData = (id) => {
      setDeleteID(id);
      setShowModal(true);
    };
    // 弹窗-取消
    const handleCancel = () => {
      setShowModal(false);
    };
    // 弹窗-确认删除
    const handleConfirm = async() => {
      const index = list.findIndex(e => e.id === deleteID);
      list.splice(index, 1);
      setList(list);
      await setStorage("list", list);
      setToastInfo({
        isOpened: true,
        duration: 1000,
        status: "success",
        text: "删除成功"
      });
    };
  return (
    <View className="page-wrapper">
      {list.length ? <Header></Header> : null}
      <Empty list={list}></Empty>
      <List deleteData={deleteData} list={list}></List>
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
});
export default Home;

