export const media = {
  sm(style: string) {
    return `@media (min-width: 480px) {${style}}`;
  },
  md(style: string) {
    return `@media (min-width: 768px) {${style}}`;
  },
  lg(style: string) {
    return `@media (min-width: 1024px) {${style}}`;
  },
};
