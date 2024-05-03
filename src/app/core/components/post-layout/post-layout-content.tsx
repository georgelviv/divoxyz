import Markdown from 'react-markdown';
import rehypeKatex from 'rehype-katex';
import { remarkAlert } from 'remark-github-blockquote-alert';
import remarkMath from 'remark-math';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { base16AteliersulphurpoolLight } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { useEffect, useState } from 'react';

import notChromeWarning from './not-chrome-warning.md?raw';

interface PostLayoutContentProps {
  article: string;
}

function LinkRenderer(props: {
  href?: string;
  children?: JSX.Element | string | any;
}) {
  return (
    <a href={props.href} target="_blank" rel="noreferrer">
      {props.children}
    </a>
  );
}

function CodeRenderer(props: any) {
  const { children, className, ...rest } = props;
  const match = /language-(\w+)/.exec(className || '');
  return match ? (
    <SyntaxHighlighter
      {...rest}
      PreTag="div"
      children={String(children).replace(/\n$/, '')}
      language={match[1]}
      style={base16AteliersulphurpoolLight}
    />
  ) : (
    <code {...rest} className={className}>
      {children}
    </code>
  );
}

const PostLayoutContent = ({ article }: PostLayoutContentProps) => {
  const [notChromeBrowser, setNotChromeBrowser] = useState<boolean>(false);

  useEffect(() => {
    if (!('chrome' in window)) {
      setNotChromeBrowser(true);
    }
  }, [notChromeBrowser]);

  const updatedArticle = notChromeBrowser
    ? notChromeWarning + article
    : article;

  return (
    <Markdown
      components={{ a: LinkRenderer, code: CodeRenderer }}
      className="post-layout"
      remarkPlugins={[remarkMath, remarkAlert]}
      rehypePlugins={[[rehypeKatex, { strict: false }]]}
    >
      {updatedArticle}
    </Markdown>
  );
};

PostLayoutContent.displayName = 'PostLayoutContent';

export default PostLayoutContent;
