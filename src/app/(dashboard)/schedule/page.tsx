import { redirect } from "next/navigation";
import { headers } from "next/headers";

import { auth } from "@/lib/auth/auth";

import { SchedulePageView } from "@/modules/schedule/ui/views/schedule-page-view";

const SchedulePage = async () => {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session) redirect("/sign-in");

  return <SchedulePageView />;
};

export default SchedulePage;
