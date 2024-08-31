import React from 'react'
import { Button, Modal } from 'antd';

function DeleteModal({ isDeleteModalVisible, setIsDeleteModalVisible, deleteAllData }) {
  return (
    <Modal
        open={isDeleteModalVisible}
        title="Delete All Transactions"
        onCancel={()=>{ setIsDeleteModalVisible(false) }}
        onOk={()=>{ setIsDeleteModalVisible(false); deleteAllData() }}
        okText = "Delete"
      >
        <p>Are yoy sure you want to delete all transactions?</p>
      </Modal>
  )
}

export default DeleteModal
