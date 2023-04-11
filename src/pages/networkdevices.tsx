import clsx from "clsx";
import { type NextPage } from "next";
import { PageContent } from "../components/pagecontent";
import { SearchInput } from "../components/search.input";
import { Table } from "../components/table";
import Fuse from "fuse.js";
import { api } from "../utils/api";
import { useEffect, useState } from "react";

const NetworkDevices: NextPage = () => {
  const networkDevicesQuery = api.networkDevices.getAll.useQuery();
  const [filteredData, setFilteredData] = useState(networkDevicesQuery.data);
  const [searchValue, setSearchValue] = useState<string | null>(null);

  useEffect(() => {
    if (!searchValue) {
      setFilteredData(networkDevicesQuery.data);
    }
  }, [networkDevicesQuery.data, searchValue]);

  return (
    <PageContent
      title="Netzwerkgeräte"
      description="Hier sehen Sie, wie Ihre Geräte aktuell mit Ihrer FRITZ!Box verbunden sind. Sie können nach Geräten suchen, die sich im Netzwerk befinden."
    >
      <div className="md:max-w-3xl 2xl:max-w-5xl">
        <div className="flex justify-end">
          <SearchInput
            placeholder="Suche nach Name, IP, Mac-Adresse..."
            className="min-w-[300px]"
            value={searchValue || ""}
            onClear={() => {
              setSearchValue(null);
              setFilteredData(networkDevicesQuery.data);
            }}
            onChange={(event) => {
              setSearchValue(event.target.value);
              if (
                networkDevicesQuery.data &&
                networkDevicesQuery.data.length > 0 &&
                event.target.value.length > 2
              ) {
                const fuse = new Fuse(networkDevicesQuery.data, {
                  keys: Object.keys(networkDevicesQuery.data[0] || {}),
                  shouldSort: true,
                  minMatchCharLength: 2,
                });
                const searchResult = fuse.search(event.target.value);
                setFilteredData(searchResult.map((result) => result.item));
              } else {
                setFilteredData(networkDevicesQuery.data);
              }
            }}
          />
        </div>
        <Table
          columns={[
            {
              title: "Aktiv",
              key: "active",
              render: (data) => (
                <div
                  className={clsx("h-2 w-2 rounded-full", {
                    "bg-green-300": data.active,
                    "bg-red-300": !data.active,
                  })}
                />
              ),
              sortable: true,
              defaultSort: "desc",
            },
            { title: "Name", key: "name", sortable: true },
            { title: "IP-Adresse", key: "ip", sortable: true },
            { title: "MAC-Adresse", key: "mac", sortable: true },
            { title: "LAN", key: "interface", sortable: true },
          ]}
          data={filteredData || []}
          loading={networkDevicesQuery.isLoading}
          className="mt-4"
        />
      </div>
    </PageContent>
  );
};

export default NetworkDevices;
