const qrcode = require('qrcode-terminal');
const { Client, LocalAuth } = require('whatsapp-web.js');
const { EditPhotoHandler } = require('./feature/edit_foto');
const { ChatAIHandler } = require('./feature/chat_ai');



const client = new Client({
    authStrategy: new LocalAuth()
});



client.on('qr', qr => {
    qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('message', async msg => {

    const text = msg.body.toLowerCase() || '';

    //check status
    if (text === '!ping') {
        msg.reply('pong');
    }

    if( text === "help" || text === "Help" ) {
        let message = `
        hay apakah anda butuh bantuan ?\n
        mungkin saya dapat membantu anda\n
        ini adalah caranya jika anda meminta bantuan saya\n
        list format text:\n
        => ask = pertanyaan anda
        `
        msg.reply(message);
    }

    // edit_bg/bg_color
    if (text.includes("#edit_bg/")) {
        await EditPhotoHandler(text, msg);
    }
    // #ask/question?
    if ( text.includes("ask=") || text.includes("Ask=") || text.includes("ask =") || text.includes("Ask =") ) {
        await ChatAIHandler(text, msg);
    }

});

client.initialize();



