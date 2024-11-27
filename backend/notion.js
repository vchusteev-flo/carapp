const {Client} = require('@notionhq/client');
const { get } = require('http');

const NOTION_API_KEY = "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"
const NOTION_SERVICES_DATABASE_ID = "14be469d517880229833e5bd2d58b7f6"
const NOTION_APPOINTMENTS_DATABASE_ID = ""

const notion = new Client({auth: NOTION_API_KEY})

console.log(notion, 'client')	

// async function getDatabse() {
// 	const response = await notion.databases.retrieve({
// 		database_id: NOTION_SERVICES_DATABASE_ID,
// 	})
// 	console.log(response, 'response')
// }


async function main() {
  // Create a new database
  const newDatabase = await notion.databases.create({
    parent: {
      type: "page_id",
      page_id: '149e469d5178808ca56de0958f47cf58',
    },
    title: [
      {
        type: "text",
        text: {
          content: "New database name",
        },
      },
    ],
    properties: {
      // These properties represent columns in the database (i.e. its schema)
      "Grocery item": {
        type: "title",
        title: {},
      },
      Price: {
        type: "number",
        number: {
          format: "dollar",
        },
      },
      "Last ordered": {
        type: "date",
        date: {},
      },
    },
  })

  // Print the new database response
  console.log(newDatabase)
}

main()

// getDatabse()


module.exports.getServices = async () => {
    const response = await notion.databases.query({
        database_id: NOTION_SERVICES_DATABASE_ID,
    })
		console.log(response, 'response')

    // return response.results.map((page) => ({
    //     id: page.id,
    //     name: page.properties.Name.title[0].plain_text,
    //     description: page.properties.Description.rich_text[0].plain_text,
    //     price: page.properties.Price.number,
    //     image: page.properties.Image.files[0].file.url,
    // }))
}

module.exports.getScheduledAppointments = async () => {
    const response = await notion.databases.query({
        database_id: NOTION_APPOINTMENTS_DATABASE_ID,
        filter: {
            property: 'Status',
            select: {
                equals: 'Scheduled',
            },
        },
    })

    return response.results.map((page) => ({
        id: page.id,
        serviceName: page.properties.ServiceName.title[0].plain_text,
        date: page.properties.Date.date.start,
    }))
}

module.exports.createAppointment = async ({serviceId, formData, selectedDate, selectedTime}) => {
    const services = await this.getServices();
    const service = services.find((service) => service.id === serviceId);
    const dataForSend = {
        parent: {database_id: NOTION_APPOINTMENTS_DATABASE_ID},
        properties: {
            ServiceName: {title: [{text: {content: service.name}}]},
            Make: {rich_text: [{text: {content: formData.make}}]},
            Model: {rich_text: [{text: {content: formData.model}}]},
            Year: {number: parseInt(formData.year)},
            Color: {rich_text: [{text: {content: formData.color}}]},
            Comment: {rich_text: [{text: {content: formData.comment || ""}}]},
            Date: {date: {start: `${selectedDate}T${selectedTime}:00.000Z`}},
            Status: {select: {name: 'Scheduled'}},
            ServiceID: {rich_text: [{text: {content: serviceId}}]},
        },
    };
    await notion.pages.create(dataForSend)
}

module.exports.deleteAppointment = async (id) => {
    await notion.pages.update({
        page_id: id,
        properties: {
            Status: {select: {name: 'Deleted'}}
        }
    })
}