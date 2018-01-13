import React from 'react';
import styled from 'styled-components';
import { categoryColors } from '~/components/common/styles';

const Wrapper = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 20px;
  flex-flow: row wrap;
`;

const Item = styled.div`
  border-radius: 5px;
  padding: 3px 5px;
  margin: 5px;
  width: 45%;
  cursor: pointer;
  box-sizing: border-box;
  text-align: center;
  transition: 0.3s all;

  ${({ active, item }) =>
    active
      ? `background: ${categoryColors[item]}; color: #fff;`
      : 'background: #fff; color: #90caf9;'};

  & :hover {
    ${({ item }) => `background: ${categoryColors[item]}`};
    color: #fff;
  }
`;

export const CategorySelect = props => {
  const { categories, selected, handleChange } = props;
  return (
    <Wrapper>
      {categories.map((item, i) => (
        <Item
          key={i}
          item={item}
          active={selected === item}
          onClick={() => handleChange(item)}
        >
          {item}
        </Item>
      ))}
    </Wrapper>
  );
};
