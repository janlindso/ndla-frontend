/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import React, { PropTypes, Component } from 'react';
import { connect } from 'react-redux';

import * as actions from './searchActions';
import { getResults } from './searchSelectors';
import SearchForm from './components/SearchForm';
import SearchResult from './components/SearchResult';

class SearchPage extends Component {

  componentWillMount() {
    const { location: { query }, search } = this.props;
    if (query.query) {
      search(query);
    }
  }

  render() {
    const { location: { query }, results, search } = this.props;
    return (
      <div>
        <SearchForm query={query.query} onSearchQuerySubmit={(searchQuery) => search({ query: searchQuery, page: 1 })} />
        <div className="search-results">
          { results.map(result => <SearchResult key={result.id} article={result} />)}
        </div>
      </div>
    );
  }
}

SearchPage.propTypes = {
  location: PropTypes.shape({
    query: PropTypes.shape({
      query: PropTypes.string,
      page: PropTypes.string,
    }).isRequired,
  }).isRequired,
  results: PropTypes.array.isRequired,
  search: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  search: actions.search,
};

const mapStateToProps = (state) => ({
  results: getResults(state),
});

export default connect(mapStateToProps, mapDispatchToProps)(SearchPage);
