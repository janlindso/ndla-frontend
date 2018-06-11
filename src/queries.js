/**
 * Copyright (c) 2018-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

import gql from 'graphql-tag';

const contributorInfoFragment = gql`
  fragment ContributorInfo on Contributor {
    name
    type
  }
`;

const copyrightInfoFragment = gql`
  ${contributorInfoFragment}
  fragment CopyrightInfo on Copyright {
    license {
      license
      url
    }
    creators {
      ...ContributorInfo
    }
    processors {
      ...ContributorInfo
    }
    rightsholders {
      ...ContributorInfo
    }
  }
`;

export const topicInfoFragment = gql`
  fragment TopicInfo on Topic {
    id
    name
    parent
    path
    meta {
      metaDescription
    }
  }
`;

export const subjectInfoFragment = gql`
  fragment SubjectInfo on Subject {
    id
    name
    path
  }
`;

export const resourceInfoFragment = gql`
  fragment ResourceInfo on Resource {
    id
    name
    contentUri
    path
    resourceTypes {
      id
      name
    }
    meta {
      id
      title
      introduction
      metaDescription
      metaImage
      lastUpdated
    }
  }
`;

export const articleInfoFragment = gql`
  ${copyrightInfoFragment}

  fragment ArticleInfo on Article {
    id
    title
    introduction
    content
    metaDescription
    created
    updated
    oldNdlaUrl
    requiredLibraries {
      name
      mediaType
    }
    metaData {
      footnotes {
        ref
        title
        year
        authors
        edition
        publisher
        url
      }
      images {
        title
        altText
        src
        copyright {
          ...CopyrightInfo
        }
      }
      audios {
        title
        src
        copyright {
          ...CopyrightInfo
        }
      }
      brightcoves {
        title
        cover
        src
        iframe {
          height
          src
          width
        }
        copyright {
          ...CopyrightInfo
        }
      }
    }
    copyright {
      ...CopyrightInfo
    }
  }
`;

export const subjectPageArticlesInfo = gql`
  ${resourceInfoFragment}
  fragment SubjectPageArticlesInfo on SubjectPageArticles {
    location
    resources {
      ...ResourceInfo
    }
  }
`;

export const subjectQuery = gql`
  ${topicInfoFragment}
  ${subjectPageArticlesInfo}
  ${resourceInfoFragment}
  query subjectQuery($subjectId: String!, $filterIds: String) {
    subject(id: $subjectId) {
      id
      name
      path
      topics(all: true, filterIds: $filterIds) {
        ...TopicInfo
      }
      filters {
        id
        name
      }
      subjectpage {
        id
        topical {
          resource {
            ...ResourceInfo
          }
        }
        banner
        facebook
        twitter
        subjectListLocation
        displayInTwoColumns
        about {
          location
          title
          description
          visualElement {
            type
            url
            alt
          }
        }
        goTo {
          location
          resourceTypes {
            id
            name
          }
        }
        mostRead {
          ...SubjectPageArticlesInfo
        }
        latestContent {
          ...SubjectPageArticlesInfo
        }
        editorsChoices {
          ...SubjectPageArticlesInfo
        }
      }
    }
  }
`;

export const subjectsQuery = gql`
  ${subjectInfoFragment}

  query subjectsQuery {
    subjects {
      ...SubjectInfo
    }
  }
`;

export const frontpageQuery = gql`
  ${resourceInfoFragment}
  ${subjectInfoFragment}

  query frontpageQuery {
    frontpage {
      topical {
        ...ResourceInfo
      }
      categories {
        name
        subjects {
          ...SubjectInfo
        }
      }
    }
  }
`;

export const resourceTypesWithSubTypesQuery = gql`
  query resourceTypesQuery {
    resourceTypes {
      id
      name
      subtypes {
        id
        name
      }
    }
  }
`;

export const resourceTypesQuery = gql`
  query resourceTypesQuery {
    resourceTypes {
      id
      name
    }
  }
`;

export const topicResourcesQuery = gql`
  ${resourceInfoFragment}
  query topicResourcesQuery($topicId: String!) {
    topic(id: $topicId) {
      coreResources {
        ...ResourceInfo
      }
      supplementaryResources {
        ...ResourceInfo
      }
    }
  }
`;

export const resourceQuery = gql`
  ${articleInfoFragment}

  query resourceQuery($resourceId: String!) {
    resource(id: $resourceId) {
      id
      name
      path
      contentUri
      article {
        ...ArticleInfo
      }
      resourceTypes {
        id
        name
      }
    }
  }
`;
