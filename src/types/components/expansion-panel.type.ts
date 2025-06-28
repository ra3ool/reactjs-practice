import { ReactNode } from "react";

export interface ExpansionPanelProps {
  title?: string;
  trigger?: ReactNode;
  children?: ReactNode;
  isExpanded?: boolean;
  className?: string;
}