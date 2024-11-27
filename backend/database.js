const express = require('express')
const cors = require('cors')
const {getServices, createAppointment, getScheduledAppointments, deleteAppointment} = require("./notion");
const app = express()

app.use(cors({
    origin: '*',
    methods: '*',
    allowedHeaders: '*',
}));

app.use(express.json())
const port = 3002

app.get('/getServices', async (req, res) => {
    const services = await getServices();
    return res.json(services);
})

app.post('/createAppointment', async (req, res) => {
    const appointment = req.body;
    await createAppointment(appointment);
    return res.json({success: true});
})

app.get('/getScheduledAppointments', async (req, res) => {
    const appointments = await getScheduledAppointments();
    return res.json(appointments);
})

app.delete('/appointment/:appointmentId', async (req, res) => {
    await deleteAppointment(req.params.appointmentId);
    return res.json({success: true});
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})