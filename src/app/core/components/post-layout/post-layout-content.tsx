import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import remarkMath from 'remark-math';

interface PostLayoutContentProps {
  article: string;
}

function LinkRenderer(props: {
  href?: string;
  children: JSX.Element | string;
}) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

const PostLayoutContent = ({ article }: PostLayoutContentProps) => {
  return (
    <Markdown
      components={{ a: LinkRenderer }}
      className="post-layout"
      remarkPlugins={[remarkMath]}
      rehypePlugins={[rehypeKatex]}
    >
      {article}
    </Markdown>
  );
};

PostLayoutContent.displayName = 'PostLayoutContent';

export default PostLayoutContent;
