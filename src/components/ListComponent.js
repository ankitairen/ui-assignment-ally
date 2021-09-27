import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import './ListComponent.css';

function ListComponent({ okrList, toggleStateMap, showDialog }) {
  const [toggleStateMapClone, setToggleStateMapClone] = useState(
    toggleStateMap
  );

  useEffect(() => {
    setToggleStateMapClone(toggleStateMap);
  }, [toggleStateMap]);

  if (!okrList || okrList.length === 0) return null;

  const toggleView = (okrListItem) => {
    toggleStateMapClone[okrListItem.id] = !toggleStateMapClone[okrListItem.id];
    setToggleStateMapClone({ ...toggleStateMapClone });
  };

  const constructIncludedChildOkrTree = (
    parentOkrListItem,
    okrListItem,
    index,
    isRootParent
  ) => {
    let nestedChildren = constructOkrTree(
      parentOkrListItem,
      okrListItem.children
    );
    let title = `${index + 1}. ${okrListItem.title}`;
    let normalMode = (
      <div className="node">
        <i
          className="fa fa-caret-down arrow"
          onClick={(e) => {
            e.stopPropagation();
            toggleView(okrListItem);
          }}
        ></i>
        <i className="fa fa-user-circle"></i>
        <span className="titleClass">{title}</span>
      </div>
    );
    return (
      <li
        className={isRootParent ? 'rootNode' : 'childNode'}
        key={index}
        onClick={(e) => {
          e.stopPropagation();
          showDialog(parentOkrListItem, okrListItem);
        }}
      >
        {normalMode}
        {nestedChildren}
      </li>
    );
  };

  const constructExcludedChildOkrTree = (
    parentOkrListItem,
    okrListItem,
    index,
    isRootParent
  ) => {
    return (
      <li
        className={isRootParent ? 'rootNode' : 'childNode'}
        key={index}
        onClick={(e) => {
          e.stopPropagation();
          showDialog(parentOkrListItem, okrListItem);
        }}
      >
        <div className="node">
          <i
            className="fa fa-caret-right arrow"
            onClick={(e) => {
              e.stopPropagation();
              toggleView(okrListItem);
            }}
          ></i>
          <i className="fa fa-user-circle"></i>
          {okrListItem.title}
        </div>
      </li>
    );
  };

  const constructOkrTreeItem = (
    parentOkrListItem,
    okrListItem,
    index,
    isRootParent
  ) => {
    let userIconClassName = 'fa fa-user-circle';
    if (!isRootParent) {
      userIconClassName = `${userIconClassName} fa-icon-class`;
    }
    let showChildren = toggleStateMapClone[okrListItem.id];
    let indexNumber = isRootParent
      ? index + 1
      : String.fromCharCode(index + 97);
    let title = `${indexNumber}. ${okrListItem.title}`;
    let normalMode = (
      <div className="node">
        {isRootParent && !showChildren && (
          <i
            className="fa fa-caret-right arrow"
            onClick={(e) => {
              e.stopPropagation();
              toggleView(okrListItem);
            }}
          ></i>
        )}
        {isRootParent && showChildren && (
          <i
            className="fa fa-caret-down arrow"
            onClick={(e) => {
              e.stopPropagation();
              toggleView(okrListItem);
            }}
          ></i>
        )}
        <i className={userIconClassName}></i>
        <span className={isRootParent ? 'titleClass' : ''}>{title}</span>
      </div>
    );

    return (
      <li
        className={isRootParent ? 'rootNode' : 'childNode'}
        key={index}
        onClick={(e) => {
          e.stopPropagation();
          showDialog(parentOkrListItem, okrListItem);
        }}
      >
        {normalMode}
      </li>
    );
  };

  const constructOkrTree = (parentOkrListItem, okrList) => {
    if (!okrList || okrList.length === 0) return null;
    let children = okrList.map((okrListItem, index) => {
      let isRootParent = !okrListItem['parent_objective_id'];
      let constructedTreeItem = null;
      if (okrListItem.children && okrListItem.children.length > 0) {
        let showChildren = toggleStateMapClone[okrListItem.id];
        if (showChildren) {
          constructedTreeItem = constructIncludedChildOkrTree(
            okrListItem,
            okrListItem,
            index,
            isRootParent
          );
        } else {
          constructedTreeItem = constructExcludedChildOkrTree(
            okrListItem,
            okrListItem,
            index,
            isRootParent
          );
        }
      } else if (okrListItem) {
        constructedTreeItem = constructOkrTreeItem(
          parentOkrListItem,
          okrListItem,
          index,
          isRootParent
        );
      }
      return constructedTreeItem;
    });
    return <ul>{children}</ul>;
  };

  const okrListTree = constructOkrTree(null, okrList);

  return (
    <div className="mainDiv">
      <div className="wrapper">OKR List</div>
      <div className="tree">{okrListTree}</div>
    </div>
  );
}

ListComponent.propTypes = {
  okrList: PropTypes.array,
  toggleStateMap: PropTypes.object,
  showDialog: PropTypes.func,
};

export default ListComponent;
