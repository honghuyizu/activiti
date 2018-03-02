import React from 'react';
import PropTypes from 'prop-types';

function MobileAppManage({ children }) {
  return (
    <div>{children}</div>
  );
}

MobileAppManage.propTypes = {
  children: PropTypes.object,
};

// 建立数据关联关系
export default MobileAppManage;