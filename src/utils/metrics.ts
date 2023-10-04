import { RecordModel } from "pocketbase";

export const getData = async (): Promise<number[]> => {
    const dailyAmount: number[] = [];
    const dateFind = new Date();
    while (dailyAmount.length < 6) {
      let i = 0;
      const res = await fetch(
        `http://10.68.140.169:8090/api/collections/TrackingNumbers/records?perPage=500&Received133>${new Date(
          dateFind.setDate(dateFind.getDate() - i)
        ).toDateString()}&Received133<${new Date(
          dateFind.setDate(dateFind.getDate() + 1)
        ).toDateString()}`,
        { cache: "no-store" }
      );
      const packages: RecordModel = (await res.json()) as unknown as RecordModel;
      if (packages.items[0]) {
        dailyAmount.push(packages.items[0].length);
        if (i < 1) {
          i++;
        }
      }
    }
    return dailyAmount;
  }