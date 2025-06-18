import { useRouter } from "next/navigation";

export const useCustomRouter = () => {
  const router = useRouter();
  const goToWorkLog = () => router.push("/work-log");
  const goToNewWorkLog = () => router.push("/work-log/new");
  return {
    router,
    goToWorkLog,
    goToNewWorkLog,
  };
};
