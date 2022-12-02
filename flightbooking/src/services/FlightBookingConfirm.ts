import express,{Request,Response} from 'express';
const router = express.Router();

const generateTickedID=(length:Number)=>{
     var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
const confirmBooking=(req:Request, res:Response)=>{
const userPreferences = req.body;
const flightDetails = userPreferences.flightDetails;
if(userPreferences.tickets.length > flightDetails.availableSeats)
{
res.status(402).send({message: 'worng data for user preferences'})
}
else{
    let totalprice:Number= 0;
    let TicketIds:String[]=[];
    userPreferences.tickets.forEach((ticket:any)=>{
   TicketIds.push(generateTickedID(10));
       totalprice += ticket.passengerType == 'adult' ? flightDetails?.prices?.[0]?.adult : flightDetails?.prices?.[0]?.child
    })


}
}
router.post('/',(req:Request, res:Response) => {
    res.status(200).send('confirm booking')
})

export default {
    confirmBooking,
};