import { css, RuleSet } from 'styled-components';

export function hover(style: RuleSet<object>) {
  return css`
    &:hover {
      ${style};
    }
  `;
}
