import LayoutSite from "@/components/layout/LayoutSite";
import { ReactNode } from "react";

const layout = ({ children }: { children: ReactNode }) => {
  return <LayoutSite>{children}</LayoutSite>;
};

export default layout;
