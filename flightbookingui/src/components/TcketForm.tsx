import React, { useState } from 'react';
import { Select, Form, Input, InputNumber, Button, notification } from 'antd';
interface TcketFormProps {
  onDelete: any;
  index: any;
  setNameGenderAge: any;
  prices: any;
}
const TcketForm = (props: TcketFormProps) => {
  const { onDelete, index, setNameGenderAge, prices } = props;
  const [obj, setObj] = useState({} as any);
  const [con, setCon] = useState(false);
  const onchangename = (e: any) => {
    setObj({ ...obj, name: e.target.value });
    console.log(e.target.value);
  };
  const onchangeGender = (e: any) => {
    console.log(e);
    setObj({ ...obj, gender: e });
  };
  const confirmData = () => {
    if (
      !obj.hasOwnProperty('name') ||
      !obj.hasOwnProperty('age') ||
      !obj.hasOwnProperty('gender') ||
      obj.age === undefined ||
      obj.age === ''
    ) {
      notification.error({ message: 'please fill all mandatory details' });
      return;
    }
    console.log(obj);
    setNameGenderAge({
      ticketId: index,
      price: obj?.age > 12 ? prices.adult : prices.child,
      ...obj,
    });
    setCon(true);
  };
  const onchangeAge = (e: any) => {
    if (e >= 100) {
      setObj({ ...obj, age: '' });
      return;
    }
    setObj({ ...obj, age: e });
  };
  return (
    <div className="bg-white p-3 mb-3 rounded-2 position-relative">
      <div className="d-flex justify-content-end">
        <Button type="default" onClick={confirmData} disabled={con}>
          Confirm
        </Button>
        <button
          onClick={() => onDelete(index)}
          type="button"
          className="btn-close ms-5"
          aria-label="Close"
        ></button>
      </div>
      <div className="d-flex justify-content-between">
        <Form.Item
          name={`name+${index}`}
          label="Name"
          style={{ width: '100%', marginRight: 10 }}
          rules={[{ required: true, message: 'Please input from location' }]}
        >
          <Input
            type="text"
            size="large"
            onChange={onchangename}
            placeholder="name"
          />
        </Form.Item>
        <Form.Item
          name={`gender+${index}`}
          style={{ width: '100%', marginRight: 10 }}
          label="Gender"
          rules={[{ required: true, message: 'Please input from location' }]}
        >
          <Select
            showSearch
            allowClear
            style={{ width: '100%' }}
            size="large"
            placeholder="gender"
            optionFilterProp="children"
            onChange={onchangeGender}
            onSearch={() => {}}
            filterOption={(input: any, option: any) =>
              (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
            }
            options={[
              { value: 'male', label: 'Male' },
              { value: 'female', label: 'Female' },
            ]}
          />
        </Form.Item>
        <Form.Item
          name={`age+${index}`}
          label="Age"
          style={{ width: '100%' }}
          rules={[
            // { required: true, message: 'Please input from location' },
            {
              required: true,
              type: 'number',
              min: 0,
              max: 99,
              message: 'please enter valid age',
            },
          ]}
        >
          <InputNumber size="large" onChange={onchangeAge} placeholder="age" />
        </Form.Item>
        {obj.age && (
          <div
            className="d-flex justify-content-around align-items-center position-absolute"
            style={{ right: 15, bottom: 0 }}
          >
            <p className="h6 me-3"> price </p>

            <p className="display-6">
              {obj?.age > 12 && prices.adult}
              {obj?.age <= 12 && prices.child}
              {console.log(obj?.age)}
            </p>
            <span className="text-muted">{prices.currency}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default TcketForm;
