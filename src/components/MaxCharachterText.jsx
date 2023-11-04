import React, { useState } from 'react';

const MaxCharachterText = ({ text, maxCharCount }) => {
  const [showMore, setShowMore] = useState(false);

  const toggleShowMore = () => {
    setShowMore(!showMore);
  };

  const displayText = showMore ? text : text.slice(0, maxCharCount);
  const isTextOverflowed = text.length > maxCharCount;

  return (
    <div className='ReviewText'>
      <span className='span-reviewText'>{displayText}</span> {!showMore && isTextOverflowed ? <span>...</span> : ''}
      {isTextOverflowed && (
        <a onClick={toggleShowMore} className='viewMoreOrLess'>
          {showMore ? ' View Less' : ' View More'}
        </a>
      )}
    </div>
  );
};

export default MaxCharachterText
