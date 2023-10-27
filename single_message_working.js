//make sure whatsapp-web.js and qrcode is installed in npm
//Stored session data is currently not working in the multi device version. So everytime you may need to scan the QR code to work with 
//This is a simple file which will send a message to a particular user with the mentioned content


//defining Client and Qr Code

const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new WhatsApp client
const client = new Client();

//This will show the QR Code for connecting the whatsapp web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Once connected, send a message to the desired contact
client.on('ready', () => {
  
  // Here change the phone number of the particular user 
    const contactId = `919876543210@c.us`;

  // This will Send a message to the contact you can also change the message as required
  client.sendMessage(contactId, 'Hi This is an automated message. This is Awesome!');
});

// Initialize the client
client.initialize();
