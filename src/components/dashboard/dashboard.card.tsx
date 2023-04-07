import { AreaChart } from "@tremor/react";
import { Card } from "../card";
import { cn } from "../utils/class.helper";

export const DashboardCard = ({
  loading,
  title,
  ...chartProps
}: {
  title: string;
  loading?: boolean;
} & React.ComponentProps<typeof AreaChart>) => (
  <Card.Wrapper className="h-full">
    <Card.Header>{title}</Card.Header>
    <Card.Content className="h-full">
      <dl className="h-full">
        <div
          className={cn(
            "max-w-full whitespace-pre-wrap border-y border-white/20 py-5 pr-4 font-mono text-sm text-white/70 sm:gap-4 sm:pr-6",
            {
              "h-full": !loading,
            }
          )}
        >
          {loading ? (
            <>
              <span className="hidden">
                {"only to show animation when loaded"}
              </span>
              <AreaChart
                height="h-72"
                maxValue={100}
                colors={["indigo"]}
                valueFormatter={(value) => `${value}%`}
                marginTop="mt-1"
                {...chartProps}
                data={[]}
              />
            </>
          ) : (
            <AreaChart
              height="h-72"
              maxValue={100}
              colors={["indigo"]}
              valueFormatter={(value) => `${value}%`}
              marginTop="mt-1"
              {...chartProps}
            />
          )}
        </div>
      </dl>
    </Card.Content>
  </Card.Wrapper>
);
