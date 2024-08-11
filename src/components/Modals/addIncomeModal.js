import Modal from 'antd/es/modal/Modal'
import { DatePicker, Form, Input, Select, Button } from 'antd';
import { useForm } from 'antd/es/form/Form';

function AddIncomeModal({isIncomeModalVisible, setIsIncomeModalVisible, onFinish}) {
    const [form] = useForm();
    return (
        <Modal style={{paddingBottom:'1.5rem'}} open={isIncomeModalVisible} title="Add Income" onCancel={() => { setIsIncomeModalVisible(false) }} footer={null}>
            <Form form={form} layout='vertical' onFinish={(values)=>{
                onFinish(values, "Income");
                form.resetFields();
                setIsIncomeModalVisible(false)
            }}
            >
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
                    {required:true, message:"Please input the income amount"}
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
                        <Select.Option value="Salary">Salary</Select.Option>
                        <Select.Option value="Freelance">Freelance</Select.Option>
                    </Select>
                </Form.Item>
                <Form.Item>
                    <Button className='my-btn my-btn-blue' htmlType='submit'>Add Income</Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default AddIncomeModal
