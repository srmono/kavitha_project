import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import LoadingScreen from './components/LoadingScreen';
import prefetch from './api/prefetch';
import { prefetchDispatcher } from './reducers/dispatchActions';
import { Typography, Button } from 'antd';
import store from './store/store';
import { useSelector } from 'react-redux';
import BookTicket from './components/BookTicket';
import ConfirmPage from './components/ConfirmPage';

const FlightSearchResults = React.lazy(
  () => import('./components/FlightSearchResults')
);

const { Title, Text } = Typography;

function App() {
  const [loading, setLoading] = useState(true);
  const [showResults, setshowResults] = useState(false);
  const [Options, setOptions] = useState({} as any);
  const [booking, setBooking] = useState({ isbooking: false } as any);
  const [confirmTkts, setConfirmTkts] = useState({ isConfirmed: false } as any);

  const dispatch = store.dispatch;
  const state = useSelector((state: any) => state);

  const list = state?.searchResults?.data;

  const getOptions = () => {
    prefetch()
      .then((data) => {
        prefetchDispatcher(dispatch, data);
        setLoading(false);
        let ar = [] as any;
        data.sources_set.map((itm: any) => {
          ar.push({
            value: itm,
            label: itm,
          });
        });
        setOptions(ar);
        return data;
      })
      .catch((err) => console.log({ err }));
  };
  //
  useEffect(() => {
    getOptions();
  }, []);
  if (booking?.isbooking) {
    return (
      <BookTicket
        setBooking={setBooking}
        booking={booking}
        setConfirmTkts={setConfirmTkts}
        confirmTkts={confirmTkts}
      />
    );
  }
  if (confirmTkts.isConfirmed) {
    return (
      <ConfirmPage
        confirmedTkts={confirmTkts}
        setConfirmTkts={setConfirmTkts}
        setBooking={setBooking}
        flight={booking.flight}
      />
    );
  }
  {
    console.log({ state });
  }
  return (
    // <Route path="/">

    <div className="App ">
      <div className="container position-relative">
        {state.confirmedtkts.length > 0 && (
          <div
            className="position-absolute"
            style={{
              bottom: 2,
              right: 10,
            }}
          >
            <Button
              type="dashed"
              onClick={() => {
                setConfirmTkts({
                  isConfirmed: true,
                  tickets: state.confirmedtkts,
                });
              }}
            >
              Check My Tickets
            </Button>
          </div>
        )}
        <figure className="text-center">
          <blockquote className="blockquote">
            <p className="display-3">Flights Booking</p>
          </blockquote>
          <figcaption className="blockquote-footer">
            with better prices than competion
          </figcaption>
        </figure>
      </div>
      <hr />

      <Search
        Options={Options}
        loading={loading}
        setShowResults={setshowResults}
      />

      {showResults && (
        <React.Suspense fallback={<LoadingScreen />}>
          <>
            <FlightSearchResults setBooking={setBooking} />;
          </>
        </React.Suspense>
      )}
    </div>
    // </Route>
  );
}

export default App;
