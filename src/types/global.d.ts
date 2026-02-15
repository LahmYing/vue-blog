// 全局类型声明文件

// 声明 markdown-it 模块
declare module 'markdown-it' {
  class MarkdownIt {
    constructor(options?: any);
    render(src: string): string;
  }
  
  export default MarkdownIt;
}

// 可以在这里添加其他需要声明的模块
// 例如: declare module 'some-other-module';
