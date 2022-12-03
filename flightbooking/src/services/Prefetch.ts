import FlightData from '../dataConnector/FlightData';
import { Response, Request } from 'express';

const prefetch = (req: Request, res: Response) => {

  let sources: string[] = [],
      destinations: String[] = [];

  FlightData.forEach((flight: any) => {
    sources.push(flight.depatureDestination);
    destinations.push(flight.arrivalDestination);
  });
  
  let sources_set: String[] = [...new Set(sources)];
  let destinations_set: String[] = [...new Set(destinations)];

  res.status(200).send({ sources_set, destinations_set });
};

export default prefetch;
