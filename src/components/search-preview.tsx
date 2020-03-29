import React from 'react';
import { Highlight } from 'react-instantsearch-dom';
import { Link } from 'gatsby';

interface SearchPreviewProps {
  hit: string;
}

const SearchPreview = ({ hit }: SearchPreviewProps): JSX.Element => {
  return (
    <>
      <h3>
        {/* <Link to={hit}></Link> */}
        <Highlight hit={hit} attribute="title" tagName="mark" />
      </h3>
      <p>
        <Highlight hit={hit} attribute="description" tagName="description" />
      </p>
    </>
  );
};

export default SearchPreview;
