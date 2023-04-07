import { Card } from "../card";
import { cn } from "../utils/class.helper";

export const InfoCard = ({
  title,
  icon: Icon,
  value,
  maxValue,
  loading,
}: {
  title: string;
  icon: React.ReactNode;
  value: React.ReactNode;
  maxValue?: React.ReactNode;
  loading?: boolean;
}) => (
  <Card.Wrapper className="h-full p-2">
    <div className="flex h-full flex-col items-center justify-center">
      <div>{Icon}</div>
      <p
        className={cn("text-center text-2xl font-semibold text-white/95", {
          "my-3 h-3 w-16 animate-pulse rounded bg-gray-300/30 md:h-4 md:w-14":
            loading,
          "mt-1": !loading,
        })}
      >
        {loading ? "" : value}
      </p>
      {maxValue && (
        <p className="text-center text-sm text-white/70">{maxValue}</p>
      )}
      <p className="text-center text-sm text-white/70">{title}</p>
    </div>
  </Card.Wrapper>
);
