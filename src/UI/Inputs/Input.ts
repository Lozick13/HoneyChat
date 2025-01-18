import React from 'react';

export interface Input {
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

export interface InputBase extends Input {
  label?: string;
}

export interface InputChat extends Input {
  leftElement?: React.ReactNode;
  rightElement?: React.ReactNode;
}
