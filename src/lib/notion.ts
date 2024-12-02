// import axios from "axios";

// const baseURL = "http://95.181.173.213:3001"
// const baseURL = "https://api.iqbtc.ru"

// export async function getServices() {
//   const { data } = await axios.get(`${baseURL}/getServices`)
//   return data;
// }

// export async function getScheduledAppointments() {
//   const { data } = await axios.get(`${baseURL}/getScheduledAppointments`);
//   return data;
// }

// export async function createAppointment(serviceId, formData, selectedDate, selectedTime) {
//   console.log({serviceId, formData, selectedDate, selectedTime})
//   await axios.post(`${baseURL}/createAppointment`, {
//     serviceId,
//     formData,
//     selectedDate,
//     selectedTime,
//   });
// }

// export async function deleteAppointment(appointmentId) {
//   await axios.delete(`${baseURL}/appointment/${appointmentId}`)
// }

import axios from 'axios';

const api = axios.create({
  baseURL: 'https://cars.flo.team/api',
  // baseURL: 'http://localhost:3002',
  headers: {
    'Content-Type': 'application/json'
  }
})
interface CarInquiry {
  name: string;
  telegramId: number;
  orderCarId: string;
  status: string;
  comments: string;
  price: number;
}

export const notionClient = {
  getCarInquiries: async () => {
    const response = await api.get('/getCarInquiries');
		return response.data;
  },

  createCarInquiry: async (data: CarInquiry) => {
    const response = await api.post('/createCarInquiry', data);
		return response.data;
  },

  deleteCarInquiry: async (id: number) => {
    const response = await api.delete(`/carInquiry/${id}`);
		return response.data;
  },
  getCarInquiriesByTelegramId: async (id: number) => {
    const response = await api.get(`/carInquiry/telegram/${id}`);
		return response.data;
  },
}