export interface Button {
  click?: () => void;
  text?: string;
}

export interface ButtonBase extends Button {
  secondary?: boolean;
}
export interface ButtonImg extends Button {
  img: string;
  color?: string;
}
export interface ButtonIcon extends Button {
  icon: string;
}
