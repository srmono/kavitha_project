import {Response,Request} from 'express'
// import FlightData from '../data.json'
import FlightData from './../dataConnector/FlightData'

const findByFlightId = (req:Request, res:Response) => {
  const { id } = req.body;
  console.log(req.body);
  let resdata = FlightData.filter((flight:any) => flight.flight_id == id);
  return res.status(200).send(resdata);
};
 const findByArrivalAndDestination = (req:Request, res:Response) => {
  const { source, destination } = req.body;
  let resdata = FlightData.filter(
    (flight:any) =>
      flight.depatureDestination == source &&
      flight.arrivalDestination == destination
  );
  console.log(req.body)
  return res.status(200).send(resdata);
};

const compareFlightDate=(userdate:String,flightDate:String)=>{
 
let [user_month,user_date,user_year]=new Date(`${userdate}`).toLocaleDateString().split('/')
let [flight_month,flight_date,flight_year]=new Date(`${flightDate}`).toLocaleDateString().split('/')
if(user_month == flight_month && user_date == flight_date && user_year == flight_year){
  return true;
}
return false;
}

const findFlightsByAllDetails=(req:Request, res:Response) => {
const userPreferences = req.body;
let resdata={};
if(userPreferences.tripType.toLowerCase() == 'oneway'){

  let flights = FlightData.filter((flight)=>
    flight.depatureDestination == userPreferences.depatureDestination && flight.arrivalDestination == userPreferences.arrivalDestination
  )
  
  let availableFlightsOnTime = flights[0].itineraries.filter(item=>compareFlightDate(userPreferences.departureAt,item.depatureAt))
 resdata=availableFlightsOnTime;
  return res.send(availableFlightsOnTime);
}else{
  let from_flights = FlightData.filter((flight)=>
    flight.depatureDestination == userPreferences.depatureDestination && flight.arrivalDestination == userPreferences.arrivalDestination
  )
  let return_flights = FlightData.filter((flight)=>
    flight.depatureDestination == userPreferences.arrivalDestination && flight.arrivalDestination == userPreferences.depatureDestination
  )
  console.log({from_flights,return_flights})
  let from_availableFlightsOnTime = from_flights[0].itineraries.filter(item=>compareFlightDate(userPreferences.departureAt,item.depatureAt))
  let return_availableFlightsOnTime = return_flights[0].itineraries.filter(item=>compareFlightDate(userPreferences.returnDepartureAt,item.depatureAt))
  resdata = {from_availableFlightsOnTime, return_availableFlightsOnTime}
  return res.status(200).send({
    from_availableFlightsOnTime,return_availableFlightsOnTime
  })
}
// res.sendStatus(200).send(resdata)
}
export default {
findByFlightId,
findByArrivalAndDestination,
findFlightsByAllDetails
}