import React from 'react';
import PropTypes from 'prop-types';
import './DialogComponent.css';

function DialogComponent({ open, closeDialog, dialogContent }) {
  const { parentOkrListItem, okrListItem } = dialogContent;
  if (!open) return null;
  let modalHeader = `${okrListItem.id} - ${okrListItem.title}`;

  const displayDialogContent = (title, listItem) => {
    return (
      <div className="modal-body-content">
        {Object.keys(listItem).map((key, index) => {
          if (key === 'children') return null;
          return (
            <div key={key}>
              <div className="property-key">{`${
                title ? `${title}_${key}` : `${key}`
              }`}</div>
              <div className="property-value">{okrListItem[key]}</div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div id="myModal" className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <span
            className="close"
            onClick={(e) => {
              e.stopPropagation();
              closeDialog();
            }}
          >
            &times;
          </span>
          <h2>{modalHeader}</h2>
        </div>
        <div className="modal-body">
          {okrListItem && displayDialogContent('', okrListItem)}
          {parentOkrListItem &&
            displayDialogContent('parent', parentOkrListItem)}
        </div>
      </div>
    </div>
  );
}

DialogComponent.propTypes = {
  open: PropTypes.bool,
  closeDialog: PropTypes.func,
  dialogContent: PropTypes.object,
};

export default DialogComponent;
