import React from 'react';
import { Card, Button } from 'antd';

interface ConfirmProps {
  confirmedTkts: any;
  setBooking: any;

  flight: any;
  setConfirmTkts: any;
}

const ConfirmPage = (props: ConfirmProps) => {
  const { confirmedTkts, flight, setConfirmTkts, setBooking } = props;
  return (
    <div className="container mt-3 bg-light">
      <div className="d-flex justify-content-between align-items-end mt-3">
        <p className="display-5">Booking Confirmed</p>
        <Button
          type="text"
          onClick={() => setConfirmTkts({ isConfirmed: false })}
        >
          Go back
        </Button>
      </div>
      <hr />
      {confirmedTkts.tickets.map((ticket: any) => (
        <Card
          title={'Ticket ID :  ' + ticket.ticketId}
          extra={
            <>
              <p className="h6">Price : </p>{' '}
              <span className="display-6 text-success">{ticket.price}</span>
            </>
          }
          bordered={true}
          style={{ width: '100%', margin: '10px' }}
        >
          <span className="h5 mb-3">Passenger details :</span>
          <div className="d-flex justify-content-between">
            <div className="d-flex">
              <div className="">
                <p className="h6 me-3">
                  Name : <span className="h5 text-success">{ticket.name}</span>
                </p>
              </div>
              <div className="">
                <p className="h6 me-3">
                  Gender :{' '}
                  <span className="h5 text-success">{ticket.gender}</span>
                </p>
              </div>
              <div className="">
                <p className="h6 me-3">
                  Age : <span className="h5 text-success">{ticket.age}</span>
                </p>
              </div>
            </div>
            <span className="display-6 text-success ">{ticket.status}</span>
          </div>
          <span className="h5 mb-3">Travel details :</span>
          <div className="d-flex">
            <div className="">
              <p className="h6 me-3">
                From : <span className="h5 text-success">{ticket.from}</span>
              </p>
            </div>
            <div className="">
              <p className="h6 me-3">
                To : <span className="h5 text-success">{ticket.to}</span>
              </p>
            </div>
          </div>
          <span className=" text-warning">
            Ticket details are sent to{' '}
            <span className="h6">{ticket.tktBookedBy.email}</span>
          </span>
        </Card>
      ))}
    </div>
  );
};

export default ConfirmPage;
