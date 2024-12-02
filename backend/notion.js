const { Client } = require('@notionhq/client');
require('dotenv').config();

// Initialize Notion client
const notion = new Client({ auth: process.env.NOTION_API_KEY });
const NOTION_CAR_INQUIRIES_DATABASE_ID = process.env.NOTION_CAR_INQUIRIES_DATABASE_ID;

// async function list() {
//         console.log(await notion.databases.retrieve({
//                 database_id: NOTION_CAR_INQUIRIES_DATABASE_ID,
//         }))
// }

// list();

module.exports.getCarInquiries = async () => {
    try {
        const response = await notion.databases.query({
            database_id: NOTION_CAR_INQUIRIES_DATABASE_ID,
        });
        console.log(response.results, 'response <<< results');
        console.log(response.results[0].properties.ID, 'response <<< results[0]ID')

        return response.results.map((page) => ({
            pageId: page.id,
            name: page.properties.Name?.title?.[0]?.plain_text || "No Name",
            phone: page.properties.Phone?.phone_number || "No Phone",
            email: page.properties.Email?.email || "No Email",
            carOptions: page.properties['Car Options']?.rich_text?.[0]?.plain_text?.split(',') || [],
        }));
    } catch (error) {
        console.error('Failed to fetch car inquiries:', error.message);
        throw new Error('Unable to fetch car inquiries');
    }
};

module.exports.createCarInquiry = async ({ name, phone, email, carOptions }) => {
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

module.exports.deleteCarInquiry = async (id) => {
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