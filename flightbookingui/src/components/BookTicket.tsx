import React from 'react';
import { Button, Form, Input, message } from 'antd';
interface BookTicketProps {
  setIsBooking: any;
}
const BookTicket = (props: BookTicketProps) => {
  const { setIsBooking } = props;

  const formFinish = () => {
    message.info('finished');
  };
  return (
    <div className="container">
      <p className="display-5">personal details</p>
      <hr />
      <Form
        initialValues={{ remember: true }}
        onFinish={formFinish}
        layout="vertical"
        onFinishFailed={() => {}}
        autoComplete="off"
      >
        <div className="d-flex justify-content-between">
          <Form.Item
            name="firstname"
            label="First Name"
            rules={[{ required: true, message: 'Please input from location' }]}
          >
            <Input placeholder="First Name" />
          </Form.Item>
          <Form.Item
            name="secondname"
            label="Midlle Name"
            rules={[{ required: false, message: 'Please input from location' }]}
          >
            <Input placeholder="Middle Name" />
          </Form.Item>
          <Form.Item
            name="lastname"
            label="Last Name"
            rules={[{ required: true, message: 'Please input from location' }]}
          >
            <Input placeholder="Last Name" />
          </Form.Item>
        </div>
        <div className="d-flex justify-content-between">
          <Form.Item
            name="email"
            label="email"
            rules={[
              {
                required: true,
                message: 'Please enter valid email',
                type: 'email',
              },
            ]}
          >
            <Input placeholder="email" />
          </Form.Item>
          <Form.Item
            name="Phone"
            label="Phone"
            rules={[
              {
                required: true,
                message: 'Please enter valid phone number',
              },
            ]}
          >
            <Input placeholder="Last Name" type="number" />
          </Form.Item>
        </div>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
      <Button type="dashed" onClick={() => setIsBooking(false)}>
        go back
      </Button>
    </div>
  );
};

export default BookTicket;
