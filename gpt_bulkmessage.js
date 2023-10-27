//make sure whatsapp-web.js, csv parser and qrcode is installed in npm
//Stored session data is currently not working in the multi device version. So everytime you may need to scan the QR code to work with 
//This file will send a message to bulk users as mentioned in a CSV file. The first column should be named "phone" with the phone numbers below and the second "caption" with the messages below


//defining fs, Client, csv parser and Qr Code
const fs = require('fs');
const csv = require('csv-parser');
const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new WhatsApp client
const client = new Client();


//This will show the QR Code for connecting the whatsapp web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

const messageData = []; // An array to store the message data

// Read the CSV file containing contact numbers and captions
fs.createReadStream('contacts.csv')
  .pipe(csv())
  .on('data', (row) => {
    // Assuming the CSV file has columns "phone" and "caption"
    const { phone, caption } = row;
    messageData.push({ phone, caption });
  })
  .on('end', () => {
    console.log('CSV file has been processed.');
    sendBulkMessages(); //created as a seperate function below

  });
  
  
  
  
  
  async function sendBulkMessages() {
    
    client.on('ready', async () => {
      console.log('WhatsApp client is ready to send messages.');
  
      for (const data of messageData) {
        const chat = await client.getContactById(data.phone);
        if (chat) {
          await client.sendMessage(data.phone, data.caption);
          console.log(`Message sent to ${data.phone}: ${data.caption}`);
        } else {
          console.log(`Contact with number ${data.phone} not found.`);
        }
      }
    });

}

// Initialize the client
  client.initialize();
