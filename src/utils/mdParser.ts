// 解析 Markdown 文件，提取元数据和内容
export function parseMarkdown(content: string, filename?: string) {
  // 提取 front matter
  const frontMatterMatch = content.match(/^---[\s\S]*?---\s*/);
  let metadata: Record<string, string> = {};
  let markdownContent = content;
  
  if (frontMatterMatch) {
    const frontMatter = frontMatterMatch[0];
    markdownContent = content.replace(frontMatter, '');
    
    // 解析 front matter
    const lines = frontMatter.split('\n');
    for (let i = 1; i < lines.length - 1; i++) {
      const line = lines[i].trim();
      if (line) {
        const [key, ...valueParts] = line.split(':');
        const value = valueParts.join(':').trim().replace(/^['"]|['"]$/g, '');
        metadata[key.trim()] = value;
      }
    }
  }
  
  // 提取标题
  const titleMatch = markdownContent.match(/^#\s+(.*?)\s*$/m);
  if (titleMatch && !metadata.title) {
    metadata.title = titleMatch[1];
  }
  
  // 处理图片路径
  if (filename) {
    // 提取文章文件名（不含扩展名）
    const postName = filename.replace('.md', '');
    
    // 首先处理 Hexo 的标签语法：{% asset_img 图片路径 %}
    markdownContent = markdownContent.replace(/\{\%\s*asset_img\s+([^\s]+)(\s+[^\s]+)?\s*\%\}/g, (match, src, alt) => {
      // 如果没有提供 alt 文本，使用图片文件名作为 alt 文本
      const altText = alt ? alt.trim() : src.split('/').pop();
      return `![${altText}](${src})`;
    });
    
    // 然后处理标准的 Markdown 图片语法：![alt](src)
    markdownContent = markdownContent.replace(/\!\[(.*?)\]\(([^)]+)\)/g, (match, alt, src) => {
      // 如果是绝对路径，保持不变
      if (src.startsWith('http://') || src.startsWith('https://')) {
        return match;
      }
      
      // 处理相对路径
      // 假设图片路径是相对于文章文件的，例如：![图片](CI-CD/CI-CD.jpg)
      // 在 Vue 3 项目中，图片被复制到了 public/assets/images/ 目录下
      let imagePath = src;
      
      // 如果图片路径不包含目录，尝试使用文章文件名作为目录
      if (!src.includes('/')) {
        // 尝试使用文章文件名作为目录
        imagePath = `${postName}/${src}`;
      }
      
      // 生成新的图片路径
      const newSrc = `/assets/images/${imagePath}`;
      return `![${alt}](${newSrc})`;
    });
  }
  
  // 提取摘要（前 200 个字符）
  if (!metadata.excerpt) {
    const plainText = markdownContent.replace(/#+\s+/g, '').replace(/\*\*|\*|`/g, '').replace(/\n/g, ' ');
    metadata.excerpt = plainText.substring(0, 200) + (plainText.length > 200 ? '...' : '');
  }
  
  return {
    metadata,
    content: markdownContent
  };
}

// 生成文章 ID
export function generatePostId(title: string): string {
  return title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}

// 格式化日期
export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toISOString().split('T')[0];
}
