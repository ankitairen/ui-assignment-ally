import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import styled from 'styled-components';
import logo from '../assets/images/ally_io.png';
import Header from '../components/HeaderComponent';
import Filter from '../components/FilterComponent';
import List from '../components/ListComponent';
import Dialog from '../components/DialogComponent';
import listContainerActions from '../actions/listActions';

const MainDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  background-color: #fafafa;
  width: 100%;
  height: 100%;
`;

const MainPanel = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

function ListContainer() {
  const okrList = useSelector((state) => state.list.filteredOkrList);

  const toggleStateMap = useSelector((state) => state.list.toggleStateMap);

  const okrListCategoryFilter = useSelector(
    (state) => state.list.okrListCategoryFilter
  );

  const [openDialog, setOpenDialog] = useState(false);

  const [dialogContent, setDialogContent] = useState({});

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listContainerActions.fetchOkrList());
  }, []);

  const filterOkrListByCategory = (selectedCategories) => {
    dispatch(listContainerActions.filterOkrList(selectedCategories));
  };

  const showDialog = (parentOkrListItem, okrListItem) => {
    setDialogContent({
      okrListItem,
      parentOkrListItem: !okrListItem['parent_objective_id']
        ? null
        : parentOkrListItem,
    });
    setOpenDialog(true);
  };

  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <MainDiv>
      <Header logo={logo} />
      <MainPanel>
        <Filter
          categories={okrListCategoryFilter}
          filterOkrListByCategory={filterOkrListByCategory}
        />
        <List
          okrList={okrList}
          toggleStateMap={toggleStateMap}
          showDialog={showDialog}
        />
      </MainPanel>
      <Dialog
        open={openDialog}
        closeDialog={closeDialog}
        dialogContent={dialogContent}
      />
    </MainDiv>
  );
}

export default ListContainer;
