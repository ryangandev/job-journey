import React from 'react';

const formatTextForHTML = (text: string) => {
  return text.split('\n').map((str, index) => (
    <React.Fragment key={index}>
      {str}
      <br />
    </React.Fragment>
  ));
};

export { formatTextForHTML };
