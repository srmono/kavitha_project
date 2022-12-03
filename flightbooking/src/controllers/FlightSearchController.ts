import express,{Request,Response} from 'express';
import FlightSearchOps from '../services/FlightSearch'

const router = express.Router();

router.post('/byId', FlightSearchOps.findByFlightId);
router.post('/', FlightSearchOps.findFlightsByAllDetails);
router.post('/byStD', FlightSearchOps.findByArrivalAndDestination);

export default router;
