/* eslint-disable react/destructuring-assignment */
import React from 'react';
import createAlgoliaSearchClient, {
  SearchClient as AlgoliaSearchClient,
} from 'algoliasearch/lite';
import { graphql, StaticQuery } from 'gatsby';

import { InstantSearch, SearchBox, Hits } from 'react-instantsearch-dom';
import '../styles/search.css';
import SearchPreview from './search-preview';

const createSearchClient = (
  algoliaConfig: Search.AlgoliaConfig
): Search.SearchClient => ({
  algoliaSearchClient: (algoliaConfig.algoliaAppId &&
    algoliaConfig.algoliaAPIKey &&
    createAlgoliaSearchClient(
      algoliaConfig.algoliaAppId,
      algoliaConfig.algoliaAPIKey
    )) as AlgoliaSearchClient,

  // @ts-ignore
  search(requests) {
    if (!this.algoliaSearchClient) return;

    if (requests.every(({ params }: any) => !params.query)) {
      return Promise.resolve({
        results: requests.map(() => ({
          hits: [],
          nbHits: 0,
          nbPages: 0,
          processingTimeMS: 0,
        })),
      });
    }

    return this.algoliaSearchClient.search(requests);
  },
});

const Search = (): JSX.Element => (
  <StaticQuery
    query={graphql`
      query {
        site {
          siteMetadata {
            algoliaAppId
            algoliaAPIKey
            algoliaIndexPrefix
          }
        }
      }
    `}
    render={({
      site: { siteMetadata: algoliaConfig },
    }: Search.AlgoliaQuery) => (
      <div className="container">
        <div>
          <InstantSearch
            searchClient={createSearchClient(algoliaConfig)}
            indexName={`${algoliaConfig.algoliaIndexPrefix}_Learn`}
          >
            <SearchBox className="searchbox" />
            <div style={{ position: 'sticky', backgroundColor: 'red' }}>
              <Hits hitComponent={SearchPreview} />
            </div>
          </InstantSearch>
        </div>
      </div>
    )}
  />
);

declare namespace Search {
  export type AlgoliaConfig = Record<
    'algoliaAppId' | 'algoliaAPIKey' | 'algoliaIndexPrefix',
    string
  >;
  export interface SearchClient extends Pick<AlgoliaSearchClient, 'search'> {
    algoliaSearchClient?: SearchClient;
  }
  export interface AlgoliaQuery {
    site: { siteMetadata: AlgoliaConfig };
  }
}

export { Search };
