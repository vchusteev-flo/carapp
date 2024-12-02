import { Client } from '@notionhq/client';

// const notion = new Client({ auth: process.env.NOTION_API_KEY });
const notion = new Client({auth: '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'})
// const DATABASE_ID = process.env.NOTION_CAR_INQUIRIES_DATABASE_ID;
const NOTION_CAR_INQUIRIES_DATABASE_ID = '149e469d517880389e71cd813dfbdd74'

export const getCarInquiries = async () => {
	try {
			const response = await notion.databases.query({
					database_id: NOTION_CAR_INQUIRIES_DATABASE_ID,
			});

			console.log(JSON.stringify(response.results, null, 2)); // Pretty-print with 2 spaces for indentation
			// return response.results.map((page) => ({
			// 		pageId: page.id,
			// 		ID: `${page.properties.ID?.unique_id?.prefix}-${page.properties.ID?.unique_id?.number}` || "No ID",
			// 		name: page.properties.Name?.title?.[0]?.plain_text || "No Name",
			// 		telegramId: page.properties.TelegramId?.phone_number || "No Phone",
			// 		email: page.properties.Email?.email || "No Email",
			// 		carOptions: page.properties['Car Options']?.rich_text?.[0]?.plain_text?.split(',') || [],
			// }));
	} catch (error) {
			console.error('Failed to fetch car inquiries:', error.message);
			throw new Error('Unable to fetch car inquiries');
	}
};

export const getCarInquiryById = async (pageId) => {
	try {
			const response = await notion.pages.retrieve({ page_id: pageId });
			return {
					pageId: response.id,
					ID: response.properties.ID?.unique_id?.prefix + '-' + response.properties.ID?.unique_id?.number || "No ID",
					name: response.properties.Name?.title?.[0]?.plain_text || "No Name",
					phone: response.properties.Phone?.phone_number || "No Phone",
					email: response.properties.Email?.email || "No Email",
					carOptions: response.properties['Car Options']?.rich_text?.[0]?.plain_text?.split(',') || [],
			};
	} catch (error) {
			console.error('Failed to fetch car inquiry by ID:', error.message);
			throw new Error('Unable to fetch car inquiry by ID');
	}
};

export const createCarInquiry = async ({ name, phone, email, carOptions }) => {
	try {
			const response = await notion.pages.create({
					parent: { database_id: NOTION_CAR_INQUIRIES_DATABASE_ID },
					properties: {
							Name: { 
									title: [{ text: { content: name } }] 
							},
							Phone: { 
									phone_number: phone 
							},
							Email: { 
									email: email 
							},
							'Car Options': { 
									rich_text: [{ text: { content: carOptions.join(',') } }] 
							},
					},
			});

			return response;
	} catch (error) {
			console.error('Failed to create car inquiry:', error.message);
			throw new Error('Unable to create car inquiry');
	}
};

export const deleteCarInquiry = async (id) => {
	try {
			await notion.pages.update({
					page_id: id,
					properties: {
							Status: { select: { name: 'Deleted' } },
					},
			});

			return { success: true, message: 'Inquiry deleted successfully' };
	} catch (error) {
			console.error('Failed to delete car inquiry:', error.message);
			throw new Error('Unable to delete car inquiry');
	}
};