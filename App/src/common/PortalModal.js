import React from 'react';
import Portal from 'react-portal';
import styled from 'styled-components';

const WrapperModal = styled.div``;

export const PortalModal = props => (
  <Portal openByClickOn={props.openByClickOn}>
    <WrapperModal>Whaaaaat</WrapperModal>
  </Portal>
);
