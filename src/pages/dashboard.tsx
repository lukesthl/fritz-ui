import { type NextPage } from "next";
import { PageContent } from "../components/pagecontent";
import dynamic from "next/dynamic";

const Dashboard: NextPage = () => {
  return (
    <PageContent
      title="Dashboard"
      description="Das Dashboard bietet Ihnen in Infos über die CPU-Auslastung und die Internet-Bandbreite Ihres Routers. Darüber hinaus erhalten Sie eine Übersicht über Statistiken Ihrer Smart Home Geräte."
    >
      <DashboardContent />
    </PageContent>
  );
};

const DashboardContent = dynamic(
  () =>
    import("../components/dashboard/dashboard.content").then(
      (mod) => mod.DashboardContent
    ),
  { ssr: false }
);

export default Dashboard;
