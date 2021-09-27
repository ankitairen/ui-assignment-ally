import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const FilterMainDiv = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 1 auto;
  margin: 0 5px 0 10px;
`;

const Wrapper = styled.div`
  color: #697488;
  font-size: 14px;
  font-weight: 600;
  margin-top: 10px;
  position: relative;
  padding-left: 10px;
`;

const FilterGroupContainer = styled.div`
  width: 100%;
  background-color: #ffffff;
  border-radius: 2px;
  margin-top: 12px;
  margin-bottom: 24px;
  padding: 24px;
`;

const FilterOptionsContainer = styled.div`
  width: 100%;
  padding: 0 3px;
  max-height: ${(props) =>
    props.maxHeight ? `${props.maxHeight}px` : '222px'};
  overflow: auto;

  &::-webkit-scrollbar {
    width: 4px;
  }
  &::-webkit-scrollbar-thumb {
    background: #e0e0e0;
    border-radius: 4px;
  }
`;

const Input = styled.input`
  margin-bottom: 17px;
  width: 100%;
  padding: 12px 16px;
  border: 2px solid #e0e0e0;
  border-radius: 2px;
  color: #a8a8a8;
  font-size: 14px;
  &::placeholder {
    font-family: 'Open Sans', sans-serif;
    color: #a8a8a8;
    font-size: 14px;
  }
  &:active,
  &:focus,
  &:focus-visible {
    border: 2px solid #e0e0e0 !important;
    outline: none;
  }
`;

const CheckboxWrapper = styled.div`
  cursor: pointer;
  margin-bottom: 18px;
  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: initial;
  & > span {
    margin-top: -2px;
    margin-left: 12px;
    font-size: 14px;
    & > span {
      color: #a8a8a8;
    }
  }
`;

function FilterComponent({ categories, filterOkrListByCategory }) {
  const [query, setQuery] = useState('');

  const [selectedCategories, setSelectedCategories] = useState(new Set());

  const selectCategory = (category) => {
    let newSelectedCategories = new Set(selectedCategories);
    if (newSelectedCategories.has(category)) {
      newSelectedCategories.delete(category);
    } else {
      newSelectedCategories.add(category);
    }
    setSelectedCategories(newSelectedCategories);
    filterOkrListByCategory(newSelectedCategories);
  };

  return (
    <FilterMainDiv>
      <Wrapper>OKR Category Filter</Wrapper>
      <FilterGroupContainer>
        <Input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={'Search Category'}
        />
        <FilterOptionsContainer maxHeight={175}>
          {categories &&
            categories
              .filter(
                (category) =>
                  category.toUpperCase().indexOf(query.toUpperCase()) > -1
              )
              .map((category, i) => {
                return (
                  <CheckboxWrapper
                    key={category}
                    onClick={(e) => {
                      e.stopPropagation();
                      selectCategory(category);
                    }}
                  >
                    <input
                      type="checkbox"
                      checked={selectedCategories.has(category)}
                      onChange={() => {}}
                    />
                    <span>{category}</span>
                  </CheckboxWrapper>
                );
              })}
        </FilterOptionsContainer>
      </FilterGroupContainer>
    </FilterMainDiv>
  );
}

FilterComponent.propTypes = {
  categories: PropTypes.array,
  filterOkrListByCategory: PropTypes.func,
};

export default FilterComponent;
