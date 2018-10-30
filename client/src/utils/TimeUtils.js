export default class TimeUtils {
  static makeTimeToLocalString(time) {
    return new Date(time).toLocaleString(navigator.language);
  }
}