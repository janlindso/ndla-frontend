/**
 * Copyright (c) 2016-present, NDLA.
 *
 * This source code is licensed under the GPLv3 license found in the
 * LICENSE file in the root directory of this source tree. *
 */

import React, { Fragment } from 'react';
import { injectT } from '@ndla/i18n';
import { func, arrayOf, shape, string } from 'prop-types';
import { SearchFilter, SearchPopoverFilter } from '@ndla/ui';
import { Core, Additional } from '@ndla/icons/common';
import { FilterShape, SubjectShape, SearchParamsShape } from '../../../shapes';
import supportedLanguages from '../../../util/supportedLanguages';
import { RELEVANCE_CORE, RELEVANCE_SUPPLEMENTARY } from '../../../constants';

const SearchFilters = ({
  subjects,
  activeSubjects,
  searchParams,
  onChange,
  onContentTypeChange,
  enabledTabs,
  enabledTab,
  t,
}) => {
  const allSubjects = subjects.map(subject => ({
    title: subject.name,
    value: subject.id,
  }));

  const languages = supportedLanguages.map(language => ({
    title: t(`languages.${language}`),
    value: language,
  }));

  const relevances = [
    {
      value: RELEVANCE_CORE,
      title: t('searchPage.searchFilterMessages.coreRelevance'),
    },
    {
      value: RELEVANCE_SUPPLEMENTARY,
      title: t('searchPage.searchFilterMessages.supplementaryRelevance'),
    },
  ];

  const allContentTypes = enabledTabs.map(tab => ({
    title: tab.name,
    value: tab.value,
  }));

  const subjectFilters = [
    ...activeSubjects.map(subject => ({
      name: subject.filterName,
      options: subject.filters.map(filter => ({
        title: filter.name,
        value: filter.name,
      })),
    })),
  ];

  return (
    <Fragment>
      <SearchFilter
        label={t('searchPage.label.subjects')}
        noFilterSelectedLabel={t('searchPage.label.noFilter')}
        options={activeSubjects}
        onChange={(newValues, value) => onChange(newValues, value, 'subjects')}
        values={searchParams.subjects || []}>
        {searchParams.subjects && (
          <SearchPopoverFilter
            messages={{
              backButton: t('searchPage.searchFilterMessages.backButton'),
              filterLabel: t('searchPage.searchFilterMessages.filterLabel'),
              closeButton: t('searchPage.close'),
              confirmButton: t('searchPage.searchFilterMessages.confirmButton'),
              hasValuesButtonText: t(
                'searchPage.searchFilterMessages.hasValuesButtonText',
              ),
              noValuesButtonText: t(
                'searchPage.searchFilterMessages.noValuesButtonText',
              ),
            }}
            options={allSubjects}
            values={searchParams.subjects}
            onChange={(newValues, value) =>
              onChange(newValues, value, 'subjects')
            }
          />
        )}
      </SearchFilter>
      <SearchFilter
        label={t(`searchPage.label.contentTypes`)}
        narrowScreenOnly
        defaultVisibleCount={3}
        showLabel={t(`searchPage.showLabel.contentTypes`)}
        hideLabel={t(`searchPage.hideLabel.contentTypes`)}
        options={allContentTypes}
        values={[enabledTab ? enabledTab.value : 'all']}
        onChange={(newValues, tab) => onContentTypeChange(tab)}
      />
      {subjectFilters.map(searchFilter => (
        <SearchFilter
          key={`filter_${searchFilter.name}`}
          label={searchFilter.name}
          defaultVisibleCount={5}
          showLabel={t(`searchPage.showLabel.levels`)}
          hideLabel={t(`searchPage.hideLabel.levels`)}
          options={searchFilter.options}
          values={searchParams.levels || []}
          onChange={(newValues, value) => onChange(newValues, value, 'levels')}
        />
      ))}
      {subjectFilters.length > 0 && (
        <SearchFilter
          label={t('searchPage.label.content')}
          options={relevances.map(({ title, value }) => ({
            title,
            value,
            icon: value === RELEVANCE_CORE ? Core : Additional,
          }))}
          values={searchParams.relevance}
          onChange={(newValues, value) => {
            onChange(newValues, value, 'relevance');
          }}
        />
      )}
      <SearchFilter
        label={t(`searchPage.label.languageFilter`)}
        defaultVisibleCount={2}
        showLabel={t(`searchPage.showLabel.languageFilter`)}
        hideLabel={t(`searchPage.hideLabel.languageFilter`)}
        options={languages}
        values={searchParams.languageFilter || []}
        onChange={(newValues, value) =>
          onChange(newValues, value, 'languageFilter')
        }
      />
    </Fragment>
  );
};

SearchFilters.propTypes = {
  subjects: arrayOf(SubjectShape),
  activeSubjects: arrayOf(
    shape({
      title: string,
      filterName: string,
      value: string,
    }),
  ),
  searchParams: SearchParamsShape,
  filters: arrayOf(FilterShape),
  onChange: func,
  onContentTypeChange: func,
  enabledTabs: arrayOf(
    shape({
      name: string,
      value: string,
      type: string,
    }),
  ),
  enabledTab: string.isRequired,
};

export default injectT(SearchFilters);
