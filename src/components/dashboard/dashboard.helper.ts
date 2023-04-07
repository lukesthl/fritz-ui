type DataFormat<T> = {
  [key in keyof T]: { labels: (boolean | number)[] };
};

export class DashboardHelper {
  public static getDateByTooComplicatedFritzboxFormat<T extends DataFormat<T>>(
    data: T,
    index: number,
    key: keyof T
  ): Date {
    const date = new Date();
    let nextHour: number | undefined = undefined;
    if (!nextHour && data) {
      let newIndex = index;
      while (key in data && newIndex < data[key].labels.length) {
        const newHour = data[key].labels[newIndex];
        if (newHour && typeof newHour === "number") {
          nextHour = newHour;
          break;
        }
        newIndex += 1;
      }
    }
    if (nextHour) {
      date.setHours(nextHour);
    }
    date.setMinutes(0);
    return date;
  }
}
