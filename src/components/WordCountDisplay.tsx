import { useMemo } from 'react';
import { countWordsInHtml, formatWordCount } from '@/utils/wordCount';

interface WordCountDisplayProps {
  htmlContent: string;
  darkMode?: boolean;
  className?: string;
}

const WordCountDisplay = ({ htmlContent, className = '' }: WordCountDisplayProps) => {
  const wordCount = useMemo(() => countWordsInHtml(htmlContent), [htmlContent]);

  return (
    <div className={`text-[11px] text-[#5C6178] font-mono ${className}`}>
      <span className="text-[#3A3F52]">Words:</span> {formatWordCount(wordCount)}
    </div>
  );
};

export default WordCountDisplay;
