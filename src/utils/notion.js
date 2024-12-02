import { Client } from '@notionhq/client';
// Initialize the Notion client
const notion = new Client({ auth: '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' });
const NOTION_CAR_INQUIRIES_DATABASE_ID = '149e469d517880389e71cd813dfbdd74';
// Fetch all car inquiries
export const getCarInquiries = async () => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_CAR_INQUIRIES_DATABASE_ID,
    });
    // Map response to a readable format
    return response.results.map((page) => ({
      pageId: page.id,
      ID: `${page.properties.ID?.unique_id?.prefix}-${page.properties.ID?.unique_id?.number}` || 'No ID',
      name: page.properties.Name?.title?.[0]?.plain_text || 'No Name',
      telegramId: page.properties.TelegramId?.rich_text?.[0]?.plain_text || 'No Telegram ID',
      orderCarId: page.properties.OrderCarId?.rich_text?.[0]?.plain_text || 'No Order Car ID',
      status: page.properties.Status?.status?.name || 'No Status',
      comments: page.properties.Comments?.rich_text?.[0]?.plain_text || 'No Comments',
      price: page.properties.Price?.rich_text?.[0]?.plain_text || 'No Price',
      finalPrice: page.properties.FinalPrice?.rich_text?.[0]?.plain_text || 'No Final Price',
    }));
  } catch (error) {
    console.error('Failed to fetch car inquiries:', error.message);
    throw new Error('Unable to fetch car inquiries');
  }
};
// Fetch a specific car inquiry by ID
export const getCarInquiryById = async (pageId) => {
  try {
    const response = await notion.pages.retrieve({ page_id: pageId });
    // Map response to a readable format
    return {
      pageId: response.id,
      ID: `${response.properties.ID?.unique_id?.prefix}-${response.properties.ID?.unique_id?.number}` || 'No ID',
      name: response.properties.Name?.title?.[0]?.plain_text || 'No Name',
      telegramId: response.properties.TelegramId?.rich_text?.[0]?.plain_text || 'No Telegram ID',
      orderCarId: response.properties.OrderCarId?.rich_text?.[0]?.plain_text || 'No Order Car ID',
      status: response.properties.Status?.status?.name || 'No Status',
      comments: response.properties.Comments?.rich_text?.[0]?.plain_text || 'No Comments',
      price: response.properties.Price?.rich_text?.[0]?.plain_text || 'No Price',
      finalPrice: response.properties.FinalPrice?.rich_text?.[0]?.plain_text || 'No Final Price',
    };
  } catch (error) {
    console.error('Failed to fetch car inquiry by ID:', error.message);
    throw new Error('Unable to fetch car inquiry by ID');
  }
};
// Create a new car inquiry
export const createCarInquiry = async ({ name, telegramId, orderCarId, status, comments, price }) => {
  console.log(typeof telegramId)
  try {
    const response = await notion.pages.create({
      parent: { database_id: NOTION_CAR_INQUIRIES_DATABASE_ID },
      properties: {
        Name: {
          title: [{ text: { content: name } }],
        },
        TelegramId: {
          rich_text: [{ text: { content: String(telegramId) } }],
        },
        OrderCarId: {
          rich_text: [{ text: { content: String(orderCarId) } }],
        },
        Status: {
          status: { name: status }, // Ensure the status matches a valid option in your Notion database
        },
        Comments: {
          rich_text: [{ text: { content: comments } }],
        },
        Price: {
          rich_text: [{ text: { content: String(price) } }],
        },
        FinalPrice: {
          rich_text: [{ text: { content: String(price) } }],
        }
      },
    });
    return response;
  } catch (error) {
    console.error('Failed to create car inquiry:', error.message);
    throw new Error('Unable to create car inquiry');
  }
};
// Find a car inquiry by Telegram ID
export const findCarInquiryByTelegramId = async (telegramId) => {
  try {
    const response = await notion.databases.query({
      database_id: NOTION_CAR_INQUIRIES_DATABASE_ID,
      filter: {
        property: 'TelegramId',
        rich_text: {
          equals: telegramId,
        },
      },
    });
    return response.results.map((page) => ({
      pageId: page.id,
      ID: `${page.properties.ID?.unique_id?.prefix}-${page.properties.ID?.unique_id?.number}` || 'No ID',
      name: page.properties.Name?.title?.[0]?.plain_text || 'No Name',
      telegramId: page.properties.TelegramId?.rich_text?.[0]?.plain_text || 'No Telegram ID',
      orderCarId: page.properties.OrderCarId?.rich_text?.[0]?.plain_text || 'No Order Car ID',
      status: page.properties.Status?.status?.name || 'No Status',
      comments: page.properties.Comments?.rich_text?.[0]?.plain_text || 'No Comments',
      price: page.properties.Price?.rich_text?.[0]?.plain_text || 'No Price',
      finalPrice: page.properties.FinalPrice?.rich_text?.[0]?.plain_text || 'No Final Price',
    }));
  } catch (error) {
    console.error('Failed to find car inquiry by Telegram ID:', error.message);
    throw new Error('Unable to find car inquiry by Telegram ID');
  }
};
// Delete (Cancel) a car inquiry by updating the status
export const deleteCarInquiry = async (id) => {
  try {
    const response = await notion.pages.update({
      page_id: id,
      properties: {
        Status: {
          status: { name: 'Canceled' }, // Ensure this matches your database's predefined status options
        },
      },
    });
    return { success: true, message: 'Inquiry status updated to Canceled', response };
  } catch (error) {
    console.error('Failed to delete (cancel) car inquiry:', error.message);
    throw new Error('Unable to delete (cancel) car inquiry');
  }
};