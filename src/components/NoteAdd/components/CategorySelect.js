import React from 'react';
import styled from 'styled-components';
import { categories } from '~/components/common/categories';

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
      ? `background: ${categories[item]}; color: #fff;`
      : 'background: #fff; color: #90caf9;'};

  & :hover {
    ${({ item }) => `background: ${categories[item]}`};
    color: #fff;
  }
`;

export const CategorySelect = props => {
  const { selected, handleChange } = props;
  return (
    <Wrapper>
      {props.categories.map((item, i) => (
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
