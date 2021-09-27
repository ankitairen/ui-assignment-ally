import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderContainerDiv = styled.div`
  overflow: hidden;
  background-color: #f1f1f1;
  width: 100%;
`;

const AnchorTag = styled.div`
  float: left;
  color: black;
  text-align: center;
  padding: 10px;
  text-decoration: none;
  font-size: 18px;
  line-height: 25px;
  border-radius: 4px;
  font-size: 25px;
  font-weight: bold;
`;

const ImageTag = styled.img`
  width: 100px;
  height: 45px;
`;

function HeaderComponent({ logo }) {
  return (
    <HeaderContainerDiv>
      <AnchorTag href="#default">
        <ImageTag src={logo} alt="ally.io" />
      </AnchorTag>
    </HeaderContainerDiv>
  );
}

HeaderComponent.propTypes = {
  logo: PropTypes.string,
};

export default HeaderComponent;
