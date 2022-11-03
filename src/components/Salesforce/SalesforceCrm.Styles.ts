/* eslint-disable import/no-unused-modules */
// eslint-disable-next-line import/no-extraneous-dependencies
import styled from '@emotion/styled';

export const CustomCRMContainer = styled('div')`
  text-align: center;
  display: flex;
  flex: 1 1;
  border-left: 1px solid #000;
  background-color: #fff;
`;

export const ProfileCanvas = styled('div')`
  color: #000;
  align-items: center;
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  justify-content: center;
`;

export const ProfileGrid = styled('div')`
  display: grid;
  grid-template-columns: auto auto;
  column-gap: 5vw;
  row-gap: 20px;
`;

export const Label = styled('div')`
  color: #000;
  letter-spacing: 2px;
  margin: 10px 12px 4px;
`;

export const Value = styled('div')`
  color: #000;
`;

export const Header = styled('div')`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 2px;
  margin: 0px 12px 4px;
`;

export const HeaderLine = styled('div')`
  border-style: solid;
  border-width: 0px 0px 4px;
  border-color: #000;
  margin: 0 0 20px;
`;
