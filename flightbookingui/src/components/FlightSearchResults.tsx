import React from 'react';
import store from '../store/store';
import { Card, Button } from 'antd';
interface searchResultsProps {
  setIsBooking: any;
}
const FlightSearchResults = (props: searchResultsProps) => {
  const { setIsBooking } = props;
  const availableFlights: any = store.getState().searchResults;
  const userpreferences: any = store.getState().userpreferences;
  const mode = store.getState().mode;
  const getTime = (str: any) => {
    return `${new Date(str).getHours()} : ${new Date(
      str
    ).getMinutes()} : ${new Date(str).getSeconds()}`;
  };
  const getTitle = (flight: any) => {
    let str = flight.depatureAt;
    let date = new Date(str).toLocaleDateString();
    let time = getTime(str);

    return `${date}  departure at:  ${time}`;
  };

  const clickHandle = (flight: any) => {
    console.log(flight);
    setIsBooking(true);
  };

  if (mode.toLowerCase() == 'oneway') {
    if (!availableFlights.length) {
      return (
        <div className="container bg-light ">
          <p className="text-muted">
            sorry no flights are available for your required locations
          </p>
        </div>
      );
    }
  }
  if (mode.toLowerCase() != 'oneway') {
    if (
      !availableFlights.hasOwnProperty('from_availableFlightsOnTime') &&
      !availableFlights.hasOwnProperty('return_availableFlightsOnTime')
    ) {
      return (
        <div className="container bg-light ">
          <p className="text-muted">
            sorry no flights are available for your required locations
          </p>
        </div>
      );
    }
  }
  return (
    <div className="container bg-light">
      <hr />
      <div className="bg-light m-3 d-flex flex-column align-items-center">
        {mode.toLowerCase() == 'oneway' ? (
          availableFlights.map((flight: any) => (
            <Card
              title={getTitle(flight)}
              bordered={true}
              style={{ width: '100%', margin: '10px' }}
            >
              <p>Arrival Destination at : {getTitle(flight)}</p>
              <p>
                Travel path : {userpreferences.depatureDestination} to &nbsp;
                {userpreferences.arrivalDestination}
              </p>

              <p>Availabale seats : {flight.avaliableSeats} </p>
              <h6>Price : {flight.prices[0].adult}</h6>
              <div className="d-flex w-100 justify-content-end">
                <Button type="primary" onClick={() => clickHandle(flight)}>
                  Book
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <>
            <p className="display-6">flights to the destination</p>
            {availableFlights.from_availableFlightsOnTime.length ? (
              availableFlights.from_availableFlightsOnTime.map(
                (flight: any) => (
                  <Card
                    title={getTitle(flight)}
                    bordered={true}
                    style={{ width: '100%', margin: '10px' }}
                  >
                    <p>ArrivalDestination at : {getTitle(flight)}</p>
                    <p>
                      Travel path : {userpreferences.depatureDestination} to
                      &nbsp;
                      {userpreferences.arrivalDestination}
                    </p>
                    <p>Availabale seats : {flight.avaliableSeats} </p>
                    <h6>Price : {flight.prices[0].adult}</h6>
                    <div className="d-flex w-100 justify-content-end">
                      <Button type="primary">Book</Button>
                    </div>
                  </Card>
                )
              )
            ) : (
              <>
                <p className="text-muted">sorry no flights available</p>
              </>
            )}
            <p className="display-6">flights from the destination</p>
            {availableFlights.return_availableFlightsOnTime.length ? (
              availableFlights.return_availableFlightsOnTime.map(
                (flight: any) => (
                  <Card
                    title={getTitle(flight)}
                    bordered={true}
                    style={{ width: '100%', margin: '10px' }}
                  >
                    <p>ArrivalDestination at : {getTitle(flight)}</p>
                    <p>
                      Travel path : {userpreferences.depatureDestination} to
                      &nbsp;
                      {userpreferences.arrivalDestination}
                    </p>
                    <p>Availabale seats : {flight.avaliableSeats} </p>
                    <h6>price : {flight.prices[0].adult}</h6>
                    <div className="d-flex w-100 justify-content-end">
                      <Button type="primary">Book</Button>
                    </div>
                  </Card>
                )
              )
            ) : (
              <>
                <p className="text-muted">sorry no flights available</p>
              </>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FlightSearchResults;
