import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Link } from 'dva/router';
import { message } from 'antd';
import CAction from '../../../../components/index/system_config/task_manage/task_log/CAction';
import CSearch from '../../../../components/index/system_config/task_manage/task_log/CSearch';
import styles from '../../../../styles/util/ListLayout.less';
import * as projectUtil from '../../../../utils/rbacProjectUtil';

function TaskLogs({ children, dispatch, taskLogs }) {
  const { curActionName, actionBarVisible, curTaskID, taskDataSource, current, pageSize, selectedRowKeys } = taskLogs;
  const actionProps = {
    gotoAdd() {
      dispatch({
        type: 'taskLogs/gotoAdd',
      });
    },
    gotoDeleteBatch() {
      if (selectedRowKeys === undefined || selectedRowKeys === null || selectedRowKeys.length === 0) {
        message.info('请至少选中一条您想删除的记录');
      } else {
        dispatch({
          type: 'taskLogs/deleteBatch',
          payload: selectedRowKeys,
        });
      }
    },
  };
  const searchProps = {
    curTaskID,
    taskDataSource,
    onSearch(fieldsValue) {
      dispatch({
        type: 'taskLogs/initList',
        payload: { ...fieldsValue, pageNumber: current, pageSize: pageSize },
      });
    },
  };
  return (
    <div className={styles.listLayout}>
      <div className={styles.header}>
        <div className={styles.wrapper}>
          <div className={styles.titleBar}>
            <h3>
              <Link to={ projectUtil.getCurMenuLink() }>{ projectUtil.getCurMenuName() }</Link>
              <label>{curActionName === '' ? '' : ' -- ' + curActionName}</label>
            </h3>
          </div>
          <div className={styles.actionBar} style={{ 'display': (actionBarVisible === true  ?  'inline' : 'none') }}>
            <CAction {...actionProps}/>
          </div>
        </div>
      </div>
      <div style={{ 'display': (actionBarVisible === true  ?  'inline' : 'none') }}>
        <CSearch {...searchProps}/>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.container}>
          {children}
        </div>
      </div>
    </div>
  );
}

TaskLogs.propTypes = {
  taskLogs: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
};

// 指定订阅数据
function mapStateToProps({ taskLogs }) {
  return { taskLogs };
}

// 建立数据关联关系
export default connect(mapStateToProps)(TaskLogs);
