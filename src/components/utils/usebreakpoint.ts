import { useMediaQuery } from "react-responsive";
import type { Config } from "tailwindcss";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const tailwindConfig = require("../../../tailwind.config.cjs") as Config;
import resolveConfig from "tailwindcss/resolveConfig";

const fullConfig = resolveConfig(tailwindConfig);

const breakpoints = fullConfig.theme?.screens as Record<string, string>;

type BreakpointKey = keyof typeof breakpoints;

export function useBreakpoint<K extends BreakpointKey>(breakpointKey: K) {
  const bool = useMediaQuery({
    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    query: `(min-width: ${breakpoints[breakpointKey]})`,
  });
  const capitalizedKey =
    (breakpointKey[0] ? breakpointKey[0].toUpperCase() : "") +
    breakpointKey.substring(1);
  type Key = `is${Capitalize<K>}`;
  return {
    [`is${capitalizedKey}`]: bool,
  } as Record<Key, boolean>;
}
