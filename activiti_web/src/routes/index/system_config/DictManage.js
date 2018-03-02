import React from 'react';
import PropTypes from 'prop-types';

function DictManage({ children }) {
  return (
    <div>{children}</div>
  );
}

DictManage.propTypes = {
  children: PropTypes.object,
};

// 建立数据关联关系
export default DictManage;
