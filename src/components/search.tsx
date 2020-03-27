import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import SearchPreview from './search-preview';

const searchClient = algoliasearch(
  '1G9WNEG3D7',
  '33a157ff5478c676da24bf78913577f6'
);

export const Search = (): JSX.Element => (
  <div className="ais-InstantSearch">
    <InstantSearch searchClient={searchClient} indexName="Learn">
      <SearchBox />
      <Hits hitComponent={SearchPreview} />
    </InstantSearch>
  </div>
);
