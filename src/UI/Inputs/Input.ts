export interface Input {
  label?: string;
  id: string;
  name: string;
  value: string | number;
  type: string;
  change: (e: React.ChangeEvent<HTMLInputElement>) => void;
  min?: number;
  placeholder?: string;
  required: boolean;
  disabled?: boolean;
}
