import React from 'react';
import renderer from 'react-test-renderer';
import { StaticQuery } from 'gatsby';
import Header from '../../src/components/header';

beforeEach(() => {
  (StaticQuery as any).mockImplementationOnce(({ render }: any) =>
    render({
      site: {
        siteMetadata: {
          algoliaAppId: undefined,
          algoliaAPIKey: undefined,
          algoliaIndexPrefix: undefined,
        },
      },
    })
  );
});

describe('Tests for Header component', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<Header />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
