import React from 'react';
import { Modal, Button } from 'ndla-ui';
import PropTypes from 'prop-types';
import { injectT } from 'ndla-i18n';

const MastheadMenuModal = ({ children, onMenuExit, t }) => (
  <Modal
    size="fullscreen"
    activateButton={
      <Button
        outline
        data-testid="masthead-menu-button"
        className="c-topic-menu-toggle-button">
        {t('masthead.menu.title')}
      </Button>
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