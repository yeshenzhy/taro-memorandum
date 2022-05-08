
import { observable, action } from "mobx";

interface DataInfo{
  type: string;
  id?: string;
}
class CounterStore {
  @observable dataInfo:DataInfo = {
    type: ""
  }
  @observable isDoubleList:boolean = true
  @action.bound
  handleData(data: DataInfo) {
    this.dataInfo = data;
  }
  @action.bound
  setListType(val:boolean) {
    this.isDoubleList = val;
  }
}
export default new CounterStore();
