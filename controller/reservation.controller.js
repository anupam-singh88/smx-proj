const BadRequestError = require("../errors/bad-request");
const asyncWrapper = require("../utils/async");

const reservationController = asyncWrapper((req, res) => {
    const { ResStatus, HotelCode } = req.body;

    if (!ResStatus && !HotelCode) {
        throw new BadRequestError(
            'ResStatus and HotelCode are required'
        )
    }

    if (HotelCode !== process.env.TEST_HOTEL_CODE) {
        throw new BadRequestError(
            'Invalid Hotel Code , hit this endpoint for correct hotel /api/credentials')
    }

    switch (ResStatus) {
        case 'Reserved':
        case 'Waitlisted':
        case 'Cancelled':
        case 'No-show':
        case 'In-house':
        case 'Checked-Out':
        case 'Redacted':
            res.status(200).json({ message: 'Success' });
            break;
        default:
            throw new BadRequestError('Invalid ResStatus , check types /api/responseTypes');
    }
})

const resStausTypes = asyncWrapper((req, res) => {
    res.status(200).json({
        "status": ["Reserved", "Waitlisted", "Cancelled", "No-show", "In-house", "Checked-Out", "Redacted"]
    })
}
)
const getCredentials = asyncWrapper((req, res) => {
    res.status(200).json({
        "credentials": {
            "username": process.env.TEST_USERNAME,
            "password": process.env.TEST_PASSWORD,
            "hotelCode": process.env.TEST_HOTEL_CODE

        }
    })
})

const getAllData = asyncWrapper((req, res) => {
    res.status(200).json({
        "message": "Welcome to Reservation API. Here are the required credentails and reservation types allowed",
        "status": ["Reserved", "Waitlisted", "Cancelled", "No-show", "In-house", "Checked-Out", "Redacted"],
        "credentials": {
            "username": process.env.TEST_USERNAME,
            "password": process.env.TEST_PASSWORD,
            "hotelCode": process.env.TEST_HOTEL_CODE

        }

    })
})


module.exports = { reservationController, resStausTypes, getCredentials, getAllData }