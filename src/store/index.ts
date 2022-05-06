
import { observable, action } from "mobx";

interface UserInfo{
  name: string;
  age: number;
}
class CounterStore {
  @observable counter:number = 0;
  @observable userInfo:UserInfo = {
    name: "tom",
    age: 18
  }
  @action.bound
  increment() {
    this.counter++;
  }
  @action.bound
  decrement() {
    this.counter--;
  }
  @action.bound
  incrementAsync() {
    setTimeout(() => this.counter++, 1500);
  }
}
export default new CounterStore();
