const express = require('express');
const cors = require('cors');
const { getCarInquiries, createCarInquiry, deleteCarInquiry } = require('./notion');

const app = express();

app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
}));

app.use(express.json());
const port = 3002;

// Endpoint to fetch car inquiries
app.get('/getCarInquiries', async (req, res) => {
    try {
        const inquiries = await getCarInquiries();
        return res.json(inquiries);
    } catch (error) {
        console.error('Error fetching car inquiries:', error);
        return res.status(500).json({ message: 'Failed to fetch car inquiries' });
    }
});

// Endpoint to create a new car inquiry
app.post('/createCarInquiry', async (req, res) => {
    console.log('Received request to create car inquiry:', req.body);
    try {
        const inquiryData = req.body;
        await createCarInquiry(inquiryData);
        return res.json({ success: true });
    } catch (error) {
        console.error('Error creating car inquiry:', error);
        return res.status(500).json({ message: 'Failed to create car inquiry' });
    }
});

// Endpoint to delete a car inquiry
app.delete('/carInquiry/:inquiryId', async (req, res) => {
    try {
        const inquiryId = req.params.inquiryId;
        await deleteCarInquiry(inquiryId);
        return res.json({ success: true });
    } catch (error) {
        console.error('Error deleting car inquiry:', error);
        return res.status(500).json({ message: 'Failed to delete car inquiry' });
    }
});

app.listen(port, () => {
    console.log(`Car Inquiries app listening on port ${port}`);
});