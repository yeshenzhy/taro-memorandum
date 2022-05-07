/**
 * @name: toDate
 * @desc: 日期格式化
 * @param {number} time
 * @param {string} format
 * @return {*}
 */
export default function toDate(time:number, format?:string):any {
  if (time.toString().length < 13) {
    time = parseInt(time.toString()) * 1000;
  }
  let t:Date = new Date(time);
  let nowYear:number = t.getFullYear(); // 年
  let nowMonth:number = t.getMonth() + 1; // 月
  let nowDate:number = t.getDate(); // 日
  let nowHour:number = t.getHours(); // 时
  let nowMinutes:number = t.getMinutes(); // 分
  let nowSeconds:number = t.getSeconds(); // 秒
  let nowDayOfWeek:number = t.getDay(); // 今天本周的第几天

  let tf = function(i:number) {
    return (i < 10 ? "0" : "") + i;
  };
  // 当前时间
  let nowTime = function(formats:string) {
    return formats.replace(/yyyy|MM|dd|hh|mm|ss/g, function(a) {
      let str:string = "";
      switch (a) {
        case "yyyy":
          str = tf(nowYear);
          break;
        case "MM":
          str = tf(nowMonth);
          break;
        case "dd":
          str = tf(nowDate);
          break;
        case "hh":
          str = tf(nowHour);
          break;
        case "mm":
          str = tf(nowMinutes);
          break;
        case "ss":
          str = tf(nowSeconds);
          break;
      }
      return str;
    });
  };
  return {
    nowTime: format ? nowTime(format) : "",
    nowYear: nowYear,
    nowMonth: nowMonth,
    nowDate: nowDate,
    nowHour: nowHour,
    nowMinutes: nowMinutes,
    nowSeconds: nowSeconds,
    nowDayOfWeek: nowDayOfWeek
  };
}
