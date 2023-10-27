//make sure whatsapp-web.js and qrcode is installed in npm
//Stored session data is currently not working in the multi device version. So everytime you may need to scan the QR code to work with 
//This is a simple file which will send a message and attachment to a particular user with the mentioned content


//defining Client and Qr Code
const { Client, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

// Create a new WhatsApp client
const client = new Client();

// Scan the QR code to connect to WhatsApp Web
client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

// Once connected, send a message to the desired contact with an attachment
client.on('ready', async() => {
  // Get the contact's ID
  const contactId = `919176030058@c.us`;
  console.log('Contact ID generated');

  // Change the path of the file which you would like to add
  const media = MessageMedia.fromFilePath('./your/file/path.txt');
  console.log('Media Selected');

  // Send the message with the attachment
  await client.sendMessage(contactId, media, { caption: 'This is a new message with an attachment!' });
  console.log('Message Sent');

});


// Initialize the client
client.initialize();
