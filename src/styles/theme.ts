import { DefaultTheme } from 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    primary: string;
    secondary: string;
    background: string;
  }
}

export const lightTheme: DefaultTheme = {
  primary: '#ABFF00',
  secondary: '#666',
  background: '#D0EFD1',
};

export const darkTheme: DefaultTheme = {
  primary: '#fff',
  secondary: '#cacaca',
  background: '#D0EFD1',
};
