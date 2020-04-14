import React from 'react';
import { Highlight } from 'react-instantsearch-dom';
import { Link } from 'gatsby';

interface SearchPreviewProps {
  hit: string;
  slug: string;
}

const SearchPreview = ({ hit, slug }: SearchPreviewProps): JSX.Element => {
  return (
    <>
      <h3>
        <Link to={slug}>
          <Highlight hit={hit} attribute="title" tagName="mark" />
        </Link>
      </h3>
      <p>
        <Highlight hit={hit} attribute="description" tagName="span" />
      </p>
    </>
  );
};

export default SearchPreview;
