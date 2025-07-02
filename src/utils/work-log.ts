import { WorkLog } from "@/types/worklog";

export const formatDateToKST = (result: WorkLog[]) => {
  return result.map((item) => {
    const utcDate = new Date(item.newDate);
    const kstString = utcDate.toLocaleString("en-US", {
      timeZone: "Asia/Seoul",
    });
    const newDate = new Date(kstString);
    const yyyy = newDate.getFullYear();
    const month = String(newDate.getMonth() + 1).padStart(2, "0");
    const day = String(newDate.getDate()).padStart(2, "0");

    return {
      ...item,
      newDate: yyyy + "-" + month + "-" + day,
    };
  });
};
