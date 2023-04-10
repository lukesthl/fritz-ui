import { type NextPage } from "next";
import { PageContent } from "../components/pagecontent";

const Index: NextPage = () => {
  return (
    <PageContent
      title="Willkommen bei Fritz-UI"
      description="Mit Fritz-UI haben Sie eine moderne, schnelle und simple Übersicht über Ihr Netzwerk, SmartHome-Geräte und den Router. Wählen Sie dafür einen Menüpunkt aus."
    />
  );
};

export default Index;
