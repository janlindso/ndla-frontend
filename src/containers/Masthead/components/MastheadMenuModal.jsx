import React from 'react';
import PropTypes from 'prop-types';
import Modal from '@ndla/modal';
import { injectT } from '@ndla/i18n';
import { TopicMenuButton } from '@ndla/ui';

const MastheadMenuModal = ({ children, onMenuExit, t }) => (
  <Modal
    size="fullscreen"
    activateButton={
      <TopicMenuButton data-testid="masthead-menu-button">
        {t('masthead.menu.title')}
      </TopicMenuButton>
    }
    animation="subtle"
    animationDuration={150}
    backgroundColor="grey"
    noBackdrop
    onClose={onMenuExit}>
    {children}
  </Modal>
);

MastheadMenuModal.propTypes = {
  onMenuExit: PropTypes.func,
};

export default injectT(MastheadMenuModal);
