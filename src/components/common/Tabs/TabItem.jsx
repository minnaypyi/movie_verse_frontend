import React from 'react';

const TabItem = ({ index, label, toggleTab, activeTab }) => {
  let className = 'tab-list-item';

  if (activeTab === index) {
    className += ' tab-list-active';
  }

  return (
    <li className={className} onClick={() => toggleTab(index)}>
      {label}
    </li>
  );
};

export default TabItem;
