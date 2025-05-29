import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/20/solid";
import clsx from "clsx";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

type SortDirection = "asc" | "desc";

type ColumnDefinitionType<T, K extends keyof T> = {
  key: K | string;
  title: string;
  width?: number;
  sortable?: boolean;
  defaultSort?: SortDirection;
  render?: (value: T) => React.ReactNode;
};

type TableProps<T, K extends keyof T> = {
  data: Array<T>;
  columns: Array<ColumnDefinitionType<T, K>>;
  loading?: boolean;
} & React.ComponentProps<"table">;

export const Table = <T, K extends keyof T>({
  columns,
  data,
  loading,
  className,
  ...tableProps
}: TableProps<T, K>) => {
  const [sortedColumn, setSortedColumn] = useState<{
    key: K | string;
    direction: SortDirection;
  } | null>(null);
  useEffect(() => {
    const column = columns.find((column) => column.defaultSort);
    if (column && column.defaultSort) {
      setSortedColumn({
        key: column.key,
        direction: column.defaultSort,
      });
    }
  }, [columns]);
  const sortedData = sortedColumn
    ? [...data].sort((a, b) => {
        if (sortedColumn) {
          const column = columns.find(
            (columnTmp) => columnTmp.key === sortedColumn.key
          );
          const key = column?.key as keyof T;
          const direction = sortedColumn.direction;
          if (key) {
            if (direction === "asc") {
              return a[key] > b[key] ? 1 : -1;
            }
            return a[key] > b[key] ? -1 : 1;
          }
        }
        return 0;
      })
    : data;
  return (
    <div
      className={clsx(
        "relative overflow-x-auto rounded-lg border border-white/20 shadow-sm",
        className
      )}
    >
      <table
        className={clsx("w-full divide-y divide-white/20")}
        {...tableProps}
      >
        <thead className="bg-white/10">
          <tr>
            {columns.map((column) => (
              <th
                scope="col"
                className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-white/80"
                key={column.key.toString()}
              >
                {column.sortable ? (
                  <div
                    className="flex cursor-pointer items-center"
                    onClick={() => {
                      if (
                        sortedColumn?.key === column.key &&
                        sortedColumn?.direction === "asc"
                      ) {
                        setSortedColumn(null);
                      } else {
                        setSortedColumn({
                          key: column.key,
                          direction:
                            sortedColumn?.key === column.key
                              ? sortedColumn.direction === "asc"
                                ? "desc"
                                : "asc"
                              : "desc",
                        });
                      }
                    }}
                  >
                    {column.title}
                    <div className="ml-0.5 flex flex-col">
                      <ChevronUpIcon
                        className={clsx(
                          "-mb-[3.75px] -mt-1 h-3.5 w-3.5 transition-opacity duration-200 ease-in-out",
                          {
                            "opacity-50":
                              sortedColumn?.key === column.key &&
                              sortedColumn?.direction === "desc",
                          }
                        )}
                      />
                      <ChevronDownIcon
                        className={clsx(
                          "-mb-1 -mt-[3.75px] h-3.5 w-3.5 transition-opacity duration-200 ease-in-out",
                          {
                            "opacity-50":
                              sortedColumn?.key === column.key &&
                              sortedColumn?.direction === "asc",
                          }
                        )}
                      />
                    </div>
                  </div>
                ) : (
                  column.title
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="box-blur divide-y divide-white/10 bg-[#191A23]/30 shadow-white/10">
          {loading
            ? [...Array<unknown>(10)].map(() => (
                <tr key={uuidv4()}>
                  {columns.map((column) => (
                    <td
                      className="whitespace-nowrap px-6 py-4"
                      key={column.key.toString()}
                    >
                      <span className="inline-flex h-2.5 w-full animate-pulse rounded-sm bg-gray-300/30" />
                    </td>
                  ))}
                </tr>
              ))
            : sortedData.map((row) => (
                <tr key={uuidv4()}>
                  {columns.map((column) => (
                    <td
                      className="whitespace-nowrap px-6 py-4"
                      key={column.key.toString()}
                    >
                      <span className="items-center rounded-full text-sm text-white/80">
                        {column.render
                          ? column.render(row)
                          : row[column.key as keyof T]?.toString()}
                      </span>
                    </td>
                  ))}
                </tr>
              ))}
        </tbody>
      </table>
    </div>
  );
};
