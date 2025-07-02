import { WorkLogContext } from "@/app/layout";
import { WorkLog } from "@/types/worklog";
import { formatDateToKST } from "@/utils/work-log";
import axios from "axios";
import { useCallback, useContext, useState } from "react";

type SearchParams = {
  start?: Date | null;
  end?: Date | null;
};

export const useWorkLogs = () => {
  const context = useContext(WorkLogContext);
  if (!context)
    return {
      workLogs: [],
      searchData: [],
      loading: false,
      error: null,

      WorkLogData: async () => {}, // 빈 함수라도 있어야 호출 가능
    }; // 또는 로딩 처리, 에러 처리
  const { setIsSearchMode } = context;
  const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
  const [searchData, setSearchData] = useState<WorkLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<String | null>(null);

  const WorkLogData = useCallback(
    async (params?: SearchParams) => {
      setLoading(true);
      try {
        const response = await axios.get("/api/worklogs", { params });
        const formatteDate = formatDateToKST(response.data.data);
        setWorkLogs(formatteDate);
        if (params?.start && params?.end) {
          setIsSearchMode(true);
          setSearchData(formatteDate);
        } else {
          setIsSearchMode(false);
        }
      } catch (err) {
        setError("업무일지 불러오는중 에러");
      } finally {
        setLoading(false);
      }
    },
    [setIsSearchMode],
  );

  return {
    workLogs,
    searchData,
    loading,
    error,
    WorkLogData,
  };
};
