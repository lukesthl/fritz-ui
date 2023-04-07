import {
  AdjustmentsVerticalIcon,
  Bars3Icon,
  HomeIcon,
  UserIcon,
} from "@heroicons/react/20/solid";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import clsx from "clsx";
import { LogOut, NetworkIcon, X } from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { useState } from "react";
import { HomeWifiIcon } from "../icons/home-wifi";
import { Logo } from "../logo";
import { Dialog, DialogContent, DialogTrigger } from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { useBreakpoint } from "../utils/usebreakpoint";

const navItems = [
  {
    name: "Dashboard",
    href: "/dashboard",
    icon: HomeIcon,
  },
  {
    name: "Netzwerkgeräte",
    href: "/networkdevices",
    icon: NetworkIcon,
  },
  {
    name: "Smart Home",
    href: "/smarthome",
    icon: HomeWifiIcon,
  },
  {
    name: "System",
    href: "/system",
    icon: AdjustmentsVerticalIcon,
  },
];

export const NavigationMenu = ({ children }: React.PropsWithChildren) => {
  const { isMd } = useBreakpoint("md");
  const [menuOpen, setMenuOpen] = useState(false);
  return (
    <>
      <div className="container mx-auto h-full">
        <div className="h-full w-full justify-center">
          {isMd && (
            <div className="box-blur fixed inset-0 top-0 left-[max(0px,calc(50%-50rem))] right-auto w-[17.5rem] overflow-y-auto bg-[#191A23]/30 shadow-white/10 backdrop-blur-sm">
              <Navigation />
            </div>
          )}
          <div className="flex-auto md:pl-[17.5rem]">
            <div className="sticky top-0 z-40 h-14 bg-black/5 backdrop-blur-md">
              <Dialog
                open={menuOpen}
                onOpenChange={(open) => setMenuOpen(open)}
              >
                <DialogTrigger asChild>
                  <div className="relative mx-8 block py-3 md:hidden">
                    <button className="absolute top-1/2 left-0  -translate-y-1/2">
                      <Bars3Icon className="h-6 w-6" />
                    </button>
                    <div className="flex h-full flex-1 items-center justify-center">
                      <Link href="/" className="md:px-6">
                        <Logo />
                      </Link>
                    </div>
                  </div>
                </DialogTrigger>
                <DialogContent className="box-blur shadow-white/10 backdrop-blur-sm dark:bg-[#191A23]/30">
                  <Navigation setMenuOpen={setMenuOpen} />
                </DialogContent>
              </Dialog>
            </div>
            <div className="relative overflow-hidden p-8 xl:p-24">
              {children}
            </div>
          </div>
        </div>
      </div>
      <div className="fixed top-14 right-0 z-50 w-full border-b border-white/10" />
    </>
  );
};

const Navigation = ({
  setMenuOpen,
}: {
  setMenuOpen?: (value: boolean) => void;
}) => {
  const { data: session } = useSession();
  const { isMd } = useBreakpoint("md");
  return (
    <div className="m-4 flex h-full flex-1 flex-col md:m-0">
      <div className="relative flex h-14 justify-between rounded-t border-t border-l border-r border-white/10 px-6 md:block md:rounded-none md:border-0 md:border-l md:px-0">
        <Link
          href="/"
          className="flex h-full flex-shrink-0 items-center md:px-6"
          onClick={() => void (!isMd && setMenuOpen?.(false))}
        >
          <Logo />
        </Link>
        <div className="absolute right-0 top-0 z-10 hidden h-full py-3.5 md:flex">
          <div className="w-[1px] bg-white/10" />
        </div>
        {!isMd && (
          <DialogPrimitive.Close className="rounded-sm opacity-70 transition-opacity hover:opacity-100 focus:outline-none focus:ring-0 disabled:pointer-events-none data-[state=open]:bg-slate-100 dark:focus:ring-slate-400 dark:focus:ring-offset-slate-900 dark:data-[state=open]:bg-slate-800">
            <X className="h-4 w-4" />
          </DialogPrimitive.Close>
        )}
      </div>
      <nav
        className="flex flex-1 flex-col rounded-b-md border-r border-t border-b border-l border-white/10 p-6 md:rounded-none md:border-t-0 md:border-b-0"
        aria-label="Sidebar"
      >
        <div className="flex-1 space-y-2">
          {navItems.map(({ icon: Icon, ...navItem }) => (
            <Link
              href={navItem.href}
              className={clsx(
                "group flex items-center space-x-4 rounded-md py-2.5 px-2 font-medium md:space-x-2 md:pl-3.5 md:pr-7 md:text-sm",
                {
                  "border border-white/10 bg-[#303142]/70 text-white/90":
                    navItem.href === location.pathname,
                  "border border-transparent text-[#C5CBCB] transition-all duration-200 ease-in-out hover:bg-[#303142]/70 active:scale-95":
                    navItem.href !== location.pathname,
                }
              )}
              key={navItem.href}
              onClick={() => void (!isMd && setMenuOpen?.(false))}
            >
              <Icon className="h-4 w-4" color={"rgb(197 203 203)"} />
              <span>{navItem.name}</span>
            </Link>
          ))}
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <div className="mt-6 flex cursor-pointer items-center space-x-3 rounded-md border border-white/10 bg-[#303142]/60 py-2 px-3 text-white/80 md:mt-0">
              <UserIcon className="mt-0.5 h-5 w-5" />
              <span className="tracking-wide">
                {session?.user?.fritzbox.username}
              </span>
            </div>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-56 dark:border-white/10 dark:bg-[#303142]/60 dark:text-white/80">
            <DropdownMenuItem
              onClick={() => void signOut()}
              className="cursor-pointer rounded py-2 px-3 dark:focus:bg-white/20"
            >
              <LogOut className="mr-2 h-4 w-4" />
              <span>Abmelden</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </div>
  );
};
