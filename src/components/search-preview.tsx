import React from 'react';
import { StaticQuery } from 'gatsby';
import { Highlight } from 'react-instantsearch-dom';

interface SearchPreviewProps {
  hit: string;
}
const SearchPreview = ({ hit }: SearchPreviewProps): JSX.Element => {
  return (
    <>
      <h3>
        <Highlight hit={hit} attribute="title" tagName="mark" />
      </h3>
      <p>
        <Highlight hit={hit} attribute="description" tagName="description" />
      </p>
    </>
  );
};

export default SearchPreview;
