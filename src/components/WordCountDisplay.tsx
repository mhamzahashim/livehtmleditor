import { useMemo } from 'react';
import { countWordsInHtml, formatWordCount } from '@/utils/wordCount';

interface WordCountDisplayProps {
  htmlContent: string;
  darkMode?: boolean;
  className?: string;
}

const WordCountDisplay = ({ htmlContent, darkMode = false, className = '' }: WordCountDisplayProps) => {
  const wordCount = useMemo(() => {
    return countWordsInHtml(htmlContent);
  }, [htmlContent]);

  return (
    <div className={`text-xs text-slate-500 ${className}`}>
      <span className="font-medium">Words:</span> {formatWordCount(wordCount)}
    </div>
  );
};

export default WordCountDisplay;