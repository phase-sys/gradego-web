"use client";

import { Toaster as SonnerToaster } from "sonner";
import { useTheme } from "next-themes";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

const Toaster = ({ ...props }: ToasterProps) => {
  const { theme = "system" } = useTheme();

  return (
    <SonnerToaster
      theme={theme as ToasterProps["theme"]}
      className="toaster group"
      {...props}
    />
  );
};

export { Toaster };