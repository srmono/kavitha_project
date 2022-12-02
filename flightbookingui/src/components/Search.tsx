import React, { useEffect, useState } from 'react';
import {
  Select,
  Checkbox,
  DatePicker,
  Form,
  Button,
  message,
  notification,
} from 'antd';
import searchapi from '../api/searchFlightsapi';
import {
  searchApiDispatcher,
  saveUserpreferences,
} from '../reducers/dispatchActions';
import store from '../store/store';

interface searchProps {
  Options: any;
  loading: any;
  setShowResults: any;
}
const SearchBar = (props: searchProps) => {
  const { Options, loading, setShowResults } = props;

  const [userpreferences, setUserpreferences] = useState({
    tripType: 'oneway',
  } as any);
  const [showreturnTrip, setShowreturnTrip] = useState(false);
  const dispatch = store.dispatch;
  const formFinish = () => {
    if (
      userpreferences.depatureDestination == userpreferences.arrivalDestination
    ) {
      notification.error({
        message: 'from location and to locations cannot be the same',
      });
      return;
    }
    message.info('please wait....!');
    searchapi(userpreferences).then((data) => {
      searchApiDispatcher(dispatch, { data, mode: userpreferences.tripType });
      saveUserpreferences(dispatch, userpreferences);
    });
    setShowResults(true);
  };
  const onchangeTripType = (e: any) => {
    console.log(e.target.checked);
    if (e.target.checked) {
      setShowreturnTrip(true);
    } else {
      setShowreturnTrip(false);
    }
    setUserpreferences({
      ...userpreferences,
      tripType: e.target.checked ? 'twoWay' : 'oneWay',
    });
  };
  const onchangeFrom = (e: any) => {
    console.log(e);
    setUserpreferences({ ...userpreferences, depatureDestination: e });
  };
  const onchangeTo = (e: any) => {
    setUserpreferences({ ...userpreferences, arrivalDestination: e });
  };
  const onchangeDate = (e: any) => {
    console.log(e.toString());

    setUserpreferences({ ...userpreferences, departureAt: e.toString() });
  };
  const onchangeReturnDate = (e: any) => {
    console.log(e.toString());

    setUserpreferences({
      ...userpreferences,
      returnDepartureAt: e.toString(),
    });
  };

  return (
    <div className="container">
      <Form
        initialValues={{ remember: true }}
        onFinish={formFinish}
        onFinishFailed={() => {}}
        autoComplete="off"
      >
        <div className="d-flex justify-content-between">
          <p className="display-6">select location</p>
          <div className="align-self-end">
            <Checkbox onChange={onchangeTripType}>Two way trip</Checkbox>
          </div>
        </div>
        <div className="d-flex ">
          <div className="me-3 w-100">
            <Form.Item
              name="fromloc"
              rules={[
                { required: true, message: 'Please input from location' },
              ]}
            >
              <Select
                showSearch
                allowClear
                loading={loading}
                disabled={loading}
                style={{ width: '100%' }}
                size="large"
                placeholder="from"
                optionFilterProp="children"
                onChange={onchangeFrom}
                onSearch={() => {}}
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={Options.length ? Options : []}
              />
            </Form.Item>
          </div>
          <div className=" w-100">
            <Form.Item
              name="destination"
              rules={[
                {
                  required: true,
                  message: 'Please input destination location',
                },
              ]}
            >
              <Select
                showSearch
                allowClear
                style={{ width: '100%' }}
                size="large"
                loading={loading}
                disabled={loading}
                placeholder="to"
                optionFilterProp="children"
                onChange={onchangeTo}
                onSearch={() => {}}
                filterOption={(input: any, option: any) =>
                  (option?.label ?? '')
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
                options={Options.length ? Options : []}
              />
            </Form.Item>
          </div>
        </div>
        <div className="w-100 mt-3">
          <p className="display-6">travelling date</p>
          <div className="d-flex">
            <Form.Item
              name="date"
              rules={[
                {
                  required: true,
                  message: 'Please input date of travel',
                },
              ]}
            >
              <DatePicker
                style={{ width: '100%' }}
                onChange={onchangeDate}
                size="large"
              />
            </Form.Item>
            {showreturnTrip && (
              <Form.Item
                name="returndate"
                rules={[
                  {
                    required: true,
                    message: 'Please input return date of travel',
                  },
                ]}
              >
                <DatePicker
                  style={{ width: '100%' }}
                  onChange={onchangeReturnDate}
                  size="large"
                />
              </Form.Item>
            )}
          </div>
        </div>
        <Button type="primary" htmlType="submit">
          Search
        </Button>
      </Form>
    </div>
  );
};

export default SearchBar;
