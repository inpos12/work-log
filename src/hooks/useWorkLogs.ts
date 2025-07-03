import { searchStore } from "@/store/searchStore";
import { WorkLog } from "@/types/worklog";
import { formatDateToKST } from "@/utils/work-log";
import axios from "axios";
import { useCallback, useState } from "react";

type SearchParams = {
  start?: Date | null;
  end?: Date | null;
};

export const useWorkLogs = () => {
  const { setIsSearchMode } = searchStore();
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
