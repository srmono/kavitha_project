import React, { useState } from 'react';
import { Button, Form, Input, message, notification } from 'antd';
import store from '../store/store';
import TicketForm from './TcketForm';
import BookingConfirmApi from '../api/BookingConfirmApi';

import {
  saveConfirmedTkts,
  savePersonalDetails,
} from '../reducers/dispatchActions';

import ConfirmPage from './ConfirmPage';

interface BookTicketProps {
  setBooking: any;
  booking: any;
  confirmTkts: any;
  setConfirmTkts: any;
}

const BookTicket = (props: BookTicketProps) => {
  const { setBooking, booking, confirmTkts, setConfirmTkts } = props;
  const userpreferences: any = store.getState().userpreferences;
  const prevPersonalData: any = store.getState().personalDetails;
  const prevTickets: any = store.getState().confirmedtkts;
  const [ticketForms, setTicketForms] = useState([] as any);
  const [ticketData, setTicketData] = useState([] as any);
  const [personalData, setPersonalData] = useState(prevPersonalData as any);
  const dispatch = store.dispatch;

  const getTotalPrice = () => {
    let price = 0;
    ticketData.map((ticket: any) => {
      price += ticket.price;
    });
    return price;
  };

  const formFinish = () => {
    if (ticketData.length <= 0) {
      notification.error({
        message: 'you have no tickets to finish the process',
      });
    }
    BookingConfirmApi({
      personalData,
      ticketData,
      flight: booking.flight,
    }).then((res) => {
      console.log({ res });
      let confirmedtkts = res;
      notification.success({
        message:
          'ticket confirmation recieved please check your bookings for additional details',
      });
      setConfirmTkts({
        isConfirmed: true,
        tickets: [...prevTickets, ...confirmedtkts],
      });
      saveConfirmedTkts(dispatch, [...prevTickets, ...confirmedtkts]);
      setBooking({ isbooking: false });
    });
    savePersonalDetails(dispatch, personalData);
    console.log({ personalData, ticketData, flight: booking.flight });
  };
  const OnDelete = (e: number) => {
    let smaple = ticketForms.filter((tkt: any) => {
      return tkt.ticketId != e;
    });
    let tktdata = ticketData.filter((tkt: any) => {
      return tkt.ticketId != e;
    });
    setTicketData(tktdata);
    setTicketForms(smaple);
  };
  const setNameGenderAge = (newTicket: any) => {
    setTicketData([...ticketData, newTicket]);
  };
  const getAvailableTickets = (totalTickets: any) => {
    return totalTickets - ticketForms.length;
  };
  const getTicketForms = (totalTickets: any) => {
    if (ticketForms.length >= totalTickets) {
      notification.error({
        message: 'you have reached the maximum number of tickets',
      });
      return;
    }

    setTicketForms([...ticketForms, { ticketId: Date.now() }]);
  };

  const onNameChange = (e: any) => {
    console.log(e.target.value);
    setPersonalData({
      ...personalData,
      firstname: e.target.value,
    });
  };
  const onMiddleNameChange = (e: any) => {
    setPersonalData({
      ...personalData,
      middlename: e.target.value,
    });
  };
  const onLastNameChange = (e: any) => {
    setPersonalData({
      ...personalData,
      lastname: e.target.value,
    });
  };
  const onEmailChange = (e: any) => {
    setPersonalData({
      ...personalData,
      email: e.target.value,
    });
  };
  const onPhonechange = (e: any) => {
    setPersonalData({
      ...personalData,
      phone: e.target.value,
    });
  };
  // if (confirmTkts.isConfirmed) {
  //   return (
  //     <ConfirmPage
  //       confirmedTkts={confirmTkts}
  //       setConfirmTkts={setConfirmTkts}
  //       setBooking={setBooking}
  //       flight={booking.flight}
  //     />
  //   );
  // }
  return (
    <div className="container bg-light">
      <div className="d-flex justify-content-between align-items-end mt-3">
        <p className="display-5">Personal Details</p>
        <Button type="text" onClick={() => setBooking({ isbooking: false })}>
          Go back
        </Button>
      </div>
      <hr />
      <Form
        initialValues={{ remember: true }}
        onFinish={formFinish}
        layout="vertical"
        onFinishFailed={() => {}}
        autoComplete="off"
      >
        {!Object.keys(prevPersonalData).length && (
          <>
            <div className="d-flex justify-content-between">
              <Form.Item
                name="firstname"
                label="First Name"
                style={{ width: '100%', marginRight: 10 }}
                rules={[
                  { required: true, message: 'Please input from location' },
                ]}
              >
                <Input placeholder="First Name" onChange={onNameChange} />
              </Form.Item>
              <Form.Item
                name="secondname"
                label="Midlle Name"
                style={{ width: '100%', marginRight: 10 }}
                rules={[
                  { required: false, message: 'Please input from location' },
                ]}
              >
                <Input
                  placeholder="Middle Name"
                  onChange={onMiddleNameChange}
                />
              </Form.Item>
              <Form.Item
                name="lastname"
                label="Last Name"
                style={{ width: '100%' }}
                rules={[
                  { required: true, message: 'Please input from location' },
                ]}
              >
                <Input placeholder="Last Name" onChange={onLastNameChange} />
              </Form.Item>
            </div>
            <div className="d-flex justify-content-between">
              <Form.Item
                name="email"
                label="email"
                style={{ width: '70%', marginRight: 10 }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter valid email',
                    type: 'email',
                  },
                ]}
              >
                <Input placeholder="email" onChange={onEmailChange} />
              </Form.Item>
              <Form.Item
                name="Phone"
                label="Phone"
                style={{ width: '30%' }}
                rules={[
                  {
                    required: true,
                    message: 'Please enter valid phone number',
                  },
                ]}
              >
                <Input
                  placeholder="Last Name"
                  type="number"
                  onChange={onPhonechange}
                />
              </Form.Item>
            </div>
          </>
        )}
        <hr />
        <p>
          Travel from :
          <strong className="text-success h5 mx-3">
            {booking.flight.depatureDestination}
          </strong>
          to &nbsp;
          <strong className="mx-3 text-success h5">
            {booking.flight.arrivalDestination}
          </strong>
          on date :{' '}
          <strong className="mx-3 text-success h5">
            {new Date(booking.flight.depatureAt).toLocaleDateString()}
          </strong>
        </p>
        <h5>Available Tickets : {booking.flight.avaliableSeats}</h5>
        <h5>Price for Adults : {booking.flight.prices[0].adult}</h5>
        <h5>Price for Child : {booking.flight.prices[0].child}</h5>{' '}
        <span className="text-muted">
          those below <span className="text-danger">12 years</span> age are
          considered as childrens
        </span>
        <hr />
        <h5>Add Ticket </h5>
        <p>
          total available Tickets are
          {getAvailableTickets(booking.flight.avaliableSeats)}
        </p>
        <div className="mb-3">
          <Button
            type="dashed"
            onClick={() => getTicketForms(booking.flight.avaliableSeats)}
          >
            Add Ticket
          </Button>
        </div>
        {ticketForms.map((tkt: any, ind: number) => (
          <TicketForm
            index={tkt.ticketId}
            onDelete={OnDelete}
            setNameGenderAge={setNameGenderAge}
            prices={{
              adult: booking.flight.prices[0].adult,
              child: booking.flight.prices[0].child,
              currency: booking.flight.prices[0].currency,
            }}
            key={ind}
          />
        ))}
        <p className="h6">totla expence for tickets: {getTotalPrice()} </p>
        <div className="mb-5">
          <Button
            type="primary"
            htmlType="submit"
            size="large"
            style={{ background: 'red' }}
          >
            Confirm Booking
          </Button>
        </div>
      </Form>
    </div>
  );
};

export default BookTicket;
