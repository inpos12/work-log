"use client";

import { WorkLog } from "@/types/worklog";
import { formatDateToKST } from "@/utils/work-log";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type SearchParams = {
  start?: Date | null;
  end?: Date | null;
};

type FetchResult = {
  originalData?: WorkLog[];
  formattedData: WorkLog[];
};
export const useWorkLogs = (params?: SearchParams) => {
  const fetchWorkLogs = async (): Promise<FetchResult> => {
    const response = await axios.get("/api/worklogs", { params });
    const formattedDate = formatDateToKST(response.data.data as WorkLog[]);
    return { formattedData: formattedDate };
  };
  const {
    data: workLogs,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["workLogs", params],
    queryFn: fetchWorkLogs,
  });

  return {
    searchData: workLogs?.formattedData,
    isLoading,
    isError,
    error,
  };
};

// export const useWorkLogs = () => {
//   const { setIsSearchMode } = searchStore();
//   const [workLogs, setWorkLogs] = useState<WorkLog[]>([]);
//   const [searchData, setSearchData] = useState<WorkLog[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const WorkLogData = useCallback(
//     async (params?: SearchParams) => {
//       setLoading(true);
//       try {
//         const response = await axios.get("/api/worklogs", { params });
//         const formatteDate = formatDateToKST(response.data.data);
//         setWorkLogs(formatteDate);
//         if (params?.start && params?.end) {
//           setIsSearchMode(true);
//           setSearchData(formatteDate);
//         } else {
//           setIsSearchMode(false);
//         }
//       } catch (err) {
//         setError("업무일지 불러오는중 에러");
//       } finally {
//         setLoading(false);
//       }
//     },
//     [setIsSearchMode],
//   );

//   return {
//     workLogs,
//     searchData,
//     loading,
//     error,
//     WorkLogData,
//   };
// };
