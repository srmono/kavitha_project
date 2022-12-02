import React, { useEffect, useState } from 'react';
import Search from './components/Search';
import LoadingScreen from './components/LoadingScreen';
import prefetch from './api/prefetch';
import { prefetchDispatcher } from './reducers/dispatchActions';
import { Typography } from 'antd';
import store from './store/store';
import { Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import BookTicket from './components/BookTicket';
const FlightSearchResults = React.lazy(
  () => import('./components/FlightSearchResults')
);
const { Title, Text } = Typography;
function App() {
  const [first, setFirst] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showResults, setshowResults] = useState(false);
  const [Options, setOptions] = useState({} as any);
  const [isbooking, setIsBooking] = useState(false);
  const dispatch = store.dispatch;
  const state = useSelector((state: any) => state);
  console.log(state);
  const list = state?.searchResults?.data;
  const getOptions = () => {
    prefetch()
      .then((data) => {
        // console.log({ data });
        prefetchDispatcher(dispatch, data);
        setLoading(false);
        // console.log(data.sources_set);
        // setOptions(data);
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
    console.log('check');

    getOptions();
  }, []);
  if (isbooking) {
    return <BookTicket setIsBooking={setIsBooking} />;
  }
  return (
    // <Route path="/">
    <div className="App">
      <div className="container">
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
            <FlightSearchResults setIsBooking={setIsBooking} />;
          </>
        </React.Suspense>
      )}
    </div>
    // </Route>
  );
}

export default App;
