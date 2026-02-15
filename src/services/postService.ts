import { parseMarkdown, generatePostId, formatDate } from '../utils/mdParser';

// 动态加载所有 Markdown 文件
const postModules = import.meta.glob('../data/posts/*.md', { query: '?raw', import: 'default' });

// 定义文章类型
export interface Post {
  id: number;
  title: string;
  date: string;
  tags: string[];
  excerpt: string;
  content: string;
}

// 定义标签类型
export interface Tag {
  name: string;
  count: number;
}

// 缓存解析后的文章数据
let cachedPosts: Post[] | null = null;

// 解析所有文章
async function parseAllPosts(): Promise<Post[]> {
  if (cachedPosts) {
    return cachedPosts;
  }

  const posts: Post[] = [];
  let id = 1;

  // 遍历所有 Markdown 文件
  for (const [path, module] of Object.entries(postModules)) {
    try {
      // 获取文件名
      const filename = path.split('/').pop();
      
      // 加载文件内容
      const content = await module();
      
      // 解析 Markdown 文件
      const { metadata, content: parsedContent } = parseMarkdown(content, filename);
      
      // 构建文章对象
      let tags = ['未分类'];
      if (metadata.tags) {
        // 处理包含方括号的标签字符串，例如：[CSS, 前端]
        let tagsStr = metadata.tags;
        // 去除首尾的方括号
        tagsStr = tagsStr.replace(/^\[|\]$/g, '');
        // 分割标签并去除空格
        tags = tagsStr.split(',').map(tag => tag.trim());
      }
      
      const post: Post = {
        id: id++,
        title: metadata.title || filename?.replace('.md', '') || '',
        date: metadata.date ? formatDate(metadata.date) : new Date().toISOString().split('T')[0],
        tags: tags,
        excerpt: metadata.excerpt || parsedContent.substring(0, 200).replace(/\n/g, ' ').replace(/[#*`]/g, '') + '...',
        content: parsedContent
      };
      
      posts.push(post);
    } catch (error) {
      console.error(`Error parsing post ${path}:`, error);
    }
  }

  // 按日期降序排序
  posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

  // 缓存结果
  cachedPosts = posts;
  return posts;
}

// 获取所有文章
export function getPosts(): Promise<Post[]> {
  return new Promise(resolve => {
    parseAllPosts().then(posts => {
      resolve(posts);
    });
  });
}

// 获取单个文章
export function getPost(id: number | string): Promise<Post | undefined> {
  return new Promise(resolve => {
    parseAllPosts().then(posts => {
      const post = posts.find(post => post.id == id);
      resolve(post);
    });
  });
}

// 获取标签列表
export function getTags(): Promise<Tag[]> {
  return new Promise(resolve => {
    parseAllPosts().then(posts => {
      const tagCounts: Record<string, number> = {};
      
      posts.forEach(post => {
        post.tags.forEach(tag => {
          if (tagCounts[tag]) {
            tagCounts[tag]++;
          } else {
            tagCounts[tag] = 1;
          }
        });
      });
      
      const tags: Tag[] = Object.entries(tagCounts).map(([name, count]) => ({ name, count }));
      resolve(tags);
    });
  });
}

// 获取指定标签的文章
export function getPostsByTag(tag: string): Promise<Post[]> {
  return new Promise(resolve => {
    parseAllPosts().then(posts => {
      // 解码标签名称，确保能够正确匹配包含特殊字符的标签
      const decodedTag = decodeURIComponent(tag);
      const filteredPosts = posts.filter(post => post.tags.includes(decodedTag));
      resolve(filteredPosts);
    });
  });
}

// 获取归档数据
export function getArchive(): Promise<Record<string, Record<string, Post[]>>> {
  return new Promise(resolve => {
    parseAllPosts().then(posts => {
      const archive: Record<string, Record<string, Post[]>> = {};
      
      posts.forEach(post => {
        const [year, month] = post.date.split('-');
        const monthName = getMonthName(month);
        
        if (!archive[year]) {
          archive[year] = {};
        }
        
        if (!archive[year][monthName]) {
          archive[year][monthName] = [];
        }
        
        archive[year][monthName].push(post);
      });
      
      // 按年份降序排序
      const sortedArchive = Object.fromEntries(
        Object.entries(archive).sort(([yearA], [yearB]) => parseInt(yearB) - parseInt(yearA))
      );
      
      resolve(sortedArchive);
    });
  });
}

// 获取月份名称
function getMonthName(month: string): string {
  const monthNames: Record<string, string> = {
    '01': '一月',
    '02': '二月',
    '03': '三月',
    '04': '四月',
    '05': '五月',
    '06': '六月',
    '07': '七月',
    '08': '八月',
    '09': '九月',
    '10': '十月',
    '11': '十一月',
    '12': '十二月'
  };
  return monthNames[month] || month;
}
