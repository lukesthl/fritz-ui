import { ErrorBoundary } from "react-error-boundary";
import { Card } from "../card";
import { AreaChart } from "../charts/area.chart";
import { cn } from "../utils/class.helper";

export const DashboardCard = ({
  loading,
  title,
  className,
  error,
  ...chartProps
}: {
  title: string;
  loading?: boolean;
  error?: Error;
} & React.ComponentProps<typeof AreaChart>) => (
  <Card.Wrapper className="h-full">
    <Card.Header>{title}</Card.Header>
    <Card.Content className="h-full">
      <div className="h-full">
        {error && (
          <div className="flex h-full items-center justify-center px-4">
            <p className="text-white/70">
              {error.message || "Es ist ein Fehler aufgetreten."}
            </p>
          </div>
        )}
        <div
          className={cn(
            "max-w-full border-y border-white/20 py-5 pr-4 font-mono text-sm whitespace-pre-wrap text-white/70 sm:gap-4 sm:pr-6",
            {
              "h-full": !loading,
            },
          )}
        >
          {loading ? (
            <>
              <span className="hidden">
                {"only to show animation when loaded"}
              </span>
              <AreaChart
                maxValue={100}
                valueFormatter={(value) => `${value}%`}
                className={cn("mt-1 h-72", className)}
                {...chartProps}
                data={[]}
              />
            </>
          ) : (
            <AreaChart
              maxValue={100}
              valueFormatter={(value) => `${value}%`}
              className={cn("mt-1 h-72", className)}
              {...chartProps}
            />
          )}
        </div>
      </div>
    </Card.Content>
  </Card.Wrapper>
);
