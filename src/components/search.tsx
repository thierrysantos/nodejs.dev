/* eslint-disable react/destructuring-assignment */
import React from 'react';
import algoliasearch from 'algoliasearch/lite';
import {
  InstantSearch,
  SearchBox,
  Hits,
  Pagination,
  Highlight,
} from 'react-instantsearch-dom';
import '../styles/search.css';
import SearchPreview from './search-preview';

const algoliaClient = algoliasearch(
  '1G9WNEG3D7',
  '283f0a770d5544c57cdb9085b5c3ff8d'
);

const searchClient = {
  search(requests) {
    if (requests.every(({ params }) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return algoliaClient.search(requests);
  },
};

export const Search = (): JSX.Element => (
  <div className="container">
    <div>
      <InstantSearch searchClient={searchClient} indexName="Learn">
        {/* <SearchBox className="searchbox" /> */}
        <div style={{ position: 'absolute', backgroundColor: 'red' }}>
          <Hits hitComponent={SearchPreview} />
        </div>
      </InstantSearch>
    </div>
  </div>
);
