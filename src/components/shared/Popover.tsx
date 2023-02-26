import useWindowSize from "@/hooks/useWindowSize";
import React, {
  type PropsWithChildren,
  type Dispatch,
  type ReactNode,
  type SetStateAction,
} from "react";
import * as PopoverPrimitive from "@radix-ui/react-popover";
import Leaflet from "./Leaflet";

interface PopoverProps {
  content: ReactNode | string;
  align?: "center" | "start" | "end";
  openPopover: boolean;
  setOpenPopover: Dispatch<SetStateAction<boolean>>;
}

const Popover: React.FC<PropsWithChildren<PopoverProps>> = ({
  children,
  content,
  align = "center",
  openPopover,
  setOpenPopover,
}) => {
  const { isMobile, isDesktop } = useWindowSize();
  return (
    <>
      {isMobile && children}
      {openPopover && isMobile && (
        <Leaflet setShow={setOpenPopover}>{content}</Leaflet>
      )}
      {isDesktop && (
        <PopoverPrimitive.Root>
          <PopoverPrimitive.Trigger className="inline-flex" asChild>
            {children}
          </PopoverPrimitive.Trigger>
          <PopoverPrimitive.Content
            sideOffset={4}
            align={align}
            className="animate-slide-up-fade z-20 items-center rounded-md border border-gray-200 bg-white drop-shadow-lg"
          >
            {content}
          </PopoverPrimitive.Content>
        </PopoverPrimitive.Root>
      )}
    </>
  );
};

export default Popover;
