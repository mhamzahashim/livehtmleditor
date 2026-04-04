import { useMemo } from 'react';
import { countWordsInHtml, formatWordCount } from '@/utils/wordCount';

interface WordCountDisplayProps { htmlContent: string; darkMode?: boolean; className?: string; }

const WordCountDisplay = ({ htmlContent, className = '' }: WordCountDisplayProps) => {
  const wordCount = useMemo(() => countWordsInHtml(htmlContent), [htmlContent]);
  return (
    <div className={`text-[11px] text-muted-foreground font-mono ${className}`}>
      <span className="text-muted-foreground/60">Words:</span> {formatWordCount(wordCount)}
    </div>
  );
};

export default WordCountDisplay;
