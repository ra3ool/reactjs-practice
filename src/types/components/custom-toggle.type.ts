export interface CustomToggleProps {
    toggle?: (arg0: boolean) => void;
    isActive?: boolean;
    hasBiggerBubble?: boolean;
    activeLabelText?: string;
    deActiveLabelText?: string;
}