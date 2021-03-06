import React, { Component, Fragment } from 'react';
import { node, shape, func, string, arrayOf, object } from 'prop-types';
import { withRouter } from 'react-router-dom';
import { TopicShape, ResourceShape, LocationShape } from '../../../shapes';
import { getUrnIdsFromProps, isSubjectPagePath } from '../../../routeHelpers';
import { getSelectedTopic } from '../mastheadHelpers';
import { getFiltersFromUrlAsArray } from '../../../util/filterHelper';
import MastheadTopics from './MastheadTopics';
import MastheadMenuModal from './MastheadMenuModal';

class MastheadMenu extends Component {
  constructor() {
    super();
    this.state = {
      activeFilters: [],
      expandedTopicId: null,
      expandedSubtopicsId: [],
      location: null,
    };
  }

  componentDidMount() {
    const { location, topicPath } = this.props;

    const activeFilters = getFiltersFromUrlAsArray(location);
    const topicIds = topicPath ? topicPath.map(topic => topic.id) : null;

    this.setState({
      expandedTopicId: topicIds[0] || null,
      expandedSubtopicsId: topicIds.slice(1) || [],
      activeFilters,
    });
  }

  onFilterClick = activeFilters => {
    const { onDataFetch } = this.props;
    const { subjectId, topicId, resourceId } = getUrnIdsFromProps(this.props);

    const selectedTopicId = getSelectedTopic([
      this.state.expandedTopicId,
      ...this.state.expandedSubtopicsId,
    ]);

    this.setState({ activeFilters });
    onDataFetch(
      subjectId,
      selectedTopicId || topicId,
      resourceId,
      activeFilters,
    );
  };

  onNavigate = async (expandedTopicId, subtopicId, currentIndex) => {
    const { onDataFetch } = this.props;
    let { expandedSubtopicsId } = this.state;

    if (expandedSubtopicsId.length > currentIndex) {
      expandedSubtopicsId = expandedSubtopicsId.slice(0, currentIndex);
    }
    if (subtopicId) {
      expandedSubtopicsId.push(subtopicId);
    } else {
      expandedSubtopicsId.pop();
    }
    this.setState({
      expandedTopicId,
      expandedSubtopicsId,
    });

    const selectedTopicId = getSelectedTopic([
      expandedTopicId,
      ...expandedSubtopicsId,
    ]);

    if (selectedTopicId) {
      const { subjectId, resourceId } = getUrnIdsFromProps(this.props);
      onDataFetch(
        subjectId,
        selectedTopicId,
        resourceId,
        this.state.activeFilters,
      );
    }
  };

  static getDerivedStateFromProps(nextProps, prevState) {
    if (prevState.location === null) {
      return {
        location: nextProps.location,
      };
    }
    const { location, topicPath } = nextProps;
    const navigated = location !== prevState.location;

    if (navigated) {
      const activeFilters = getFiltersFromUrlAsArray(location);
      const topicIds = topicPath ? topicPath.map(topic => topic.id) : null;
      return {
        expandedTopicId: topicIds[0] || null,
        expandedSubtopicsId: topicIds.slice(1) || [],
        activeFilters,
        location,
      };
    }

    // No state update necessary
    return null;
  }

  render() {
    const {
      subject,
      location,
      filters,
      topicResourcesByType,
      locale,
      searchFieldComponent,
    } = this.props;

    const { activeFilters, expandedTopicId, expandedSubtopicsId } = this.state;

    return (
      <Fragment>
        <MastheadMenuModal onMenuExit={this.onMenuExit}>
          {onClose => (
            <MastheadTopics
              onClose={onClose}
              searchFieldComponent={searchFieldComponent}
              isOnSubjectFrontPage={isSubjectPagePath(location.pathname)}
              activeFilters={activeFilters}
              expandedTopicId={expandedTopicId}
              expandedSubtopicsId={expandedSubtopicsId}
              topicResourcesByType={topicResourcesByType}
              subject={subject}
              filters={filters}
              locale={locale}
              onFilterClick={this.onFilterClick}
              onNavigate={this.onNavigate}
            />
          )}
        </MastheadMenuModal>
      </Fragment>
    );
  }
}

MastheadMenu.propTypes = {
  subject: shape({
    id: string,
    name: string,
    topics: arrayOf(object),
  }).isRequired,
  locale: string.isRequired,
  resource: ResourceShape,
  filters: arrayOf(object),
  topicResourcesByType: arrayOf(TopicShape).isRequired,
  topicPath: arrayOf(TopicShape).isRequired,
  location: LocationShape,
  onDataFetch: func.isRequired,
  searchFieldComponent: node.isRequired,
};

export default withRouter(MastheadMenu);
