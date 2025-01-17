export interface Button {
  click?: () => void;
  text: string;
}

export interface ButtonBase extends Button {
  secondary?: boolean;
}
