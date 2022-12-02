import express,{Request,Response} from 'express';
import FlightBookingConfirm from '../services/FlightBookingConfirm'
const router = express.Router();

router.post('/',(req, res) => {
  res.status(200).send('smaple')
})
router.post('/validateDetails', FlightBookingConfirm.confirmBooking);
// router.post('/confirmbooking', FlightBookingConfirm);

export default router;
