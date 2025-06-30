import { ReactNode } from "react";

export interface ExpansionPanelProps {
  title?: string;
  children?: ReactNode;
  isExpanded?: boolean;
  className?: string;
  headerClassName?: string;
  expandedHeaderClassName?: string;
}