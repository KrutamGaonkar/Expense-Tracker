import React from 'react'
import Modal from 'antd/es/modal/Modal'
import { DatePicker, Form, Input, Select, Button } from 'antd';
import { useForm } from 'antd/es/form/Form';

function AddExpenseModal({ isExpenseModalVisible, setIsExpenseModalVisible, onFinish }) {
  const [form] = useForm()
    return (
        <Modal style={{paddingBottom:'1.5rem'}} open={isExpenseModalVisible} title="Add Expense" onCancel={() => { setIsExpenseModalVisible(false) }} footer={null}>
            <Form form={form} layout='vertical' onFinish={(values)=>{
                onFinish(values, "Expense");
                form.resetFields();
                setIsExpenseModalVisible(false)
            }}>
                <Form.Item 
                rules={[
                    {required:true, message:"Please input the name of the transaction"}
                ]}
                    label={"Name"}
                    name={"name"}
                    className='form-label'>
                        <Input type='text' className='my-input'/>
                </Form.Item>
                <Form.Item 
                rules={[
                    {required:true, message:"Please input the Expense amount"}
                ]}
                    label={"Amount(₹)"}
                    name={"amount"}
                    className='from-label'>
                    <Input type='text' className='my-input'/>
                </Form.Item>
                <Form.Item 
                rules={[
                    {required:true, message:"Please select a date"}
                ]}
                    label={"Date"}
                    name={"date"}
                    className='from-label'>
                    <DatePicker className='my-input'/>
                </Form.Item>
                <Form.Item 
                rules={[
                    {required:true, message:"Please select a tag"}
                ]}
                    label={"Tag"}
                    name={"tag"}
                    className='from-label'>
                    <Select className='my-input'>
                        <Select.Option value="Bills">Bills</Select.Option>
                        <Select.Option value="Education">Education</Select.Option>
                        <Select.Option value="Entertainment">Entertainment</Select.Option>
                        <Select.Option value="Electronics">Electronics</Select.Option>
                        <Select.Option value="Food">Food</Select.Option>
                        <Select.Option value="Fuel">Fuel</Select.Option>
                        <Select.Option value="Grocery">Grocery</Select.Option>
                        <Select.Option value="Investment">Investment</Select.Option>
                        <Select.Option value="Shopping">Shopping</Select.Option>
                        <Select.Option value="Other">Other</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button className='my-btn my-btn-blue' htmlType='submit'>Add Expense</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddExpenseModal
