import { Typography as AntTypography, TypographyProps } from 'antd';
import styled from 'styled-components';

/**
 * * Override Typography ant design components with theming and needed styles.
 */

const { Text: AntText } = AntTypography;

export type ModifiedTypographyProps = Partial<TypographyProps> & {
  $color?: string;
  $size?: string;
  $textAlign?: string;
  $upperCase?: boolean;
  strong?: boolean; // Antd props for intellisense
  italic?: boolean; // Antd props for intellisense
  underline?: boolean; // Antd props for intellisense
  code?: boolean; // Antd props for intellisense
  mark?: boolean; // Antd props for intellisense
  ellipsis?: boolean; // Antd props for intellisense
  m?: string;
  type?: 'secondary' | 'success' | 'warning' | 'danger'; // Antd props for intellisense
};

const Typography = styled(AntTypography)<ModifiedTypographyProps>`
  margin: ${(p: any) => p.m};
  font-size: ${(p: any) => (p.$size ? p.$size : '14px')}; // Default size

`;

const Text = styled(AntText)<ModifiedTypographyProps>`
  margin: ${(p: any) => p.m};
  font-size: ${(p: any) => (p.$size ? p.$size : '14px')}; // Default size
`;

export { Text, Typography };
