declare module '*.svg' {
  const content: string;
  export default content;
}

declare const require: (moduleName: string) => string;
