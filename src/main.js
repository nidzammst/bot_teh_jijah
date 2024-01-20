const { Client, LocalAuth, MessageMedia } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const fs = require('fs');
const path = require('path');
require('dotenv').config();
const { fetchMessageFromFlip, fetchJsonData } = require('./utils')
const client = new Client({
  authStrategy: new LocalAuth(),
  puppeteer: {
    args: ["--no-sandbox"]
  }
});

client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
  console.log('Client is ready!');
});

let temporaryDataArray = [];

// Fungsi untuk menyimpan chat dan nomor WhatsApp sementara
const saveTemporaryData = async (question, answer, category, waNumber, name, description) => {
  try {
    // Tambahkan objek ke dalam array temporaryDataArray
    temporaryDataArray.push({
      question,
      answer,
      category,
      waNumber,
      name,
      description,
      timestamp: Date.now(),
    });

    // Atur timeout untuk menghapus objek setelah 10 menit
    setTimeout(() => {
      // Hapus objek yang memiliki timestamp lebih dari 10 menit yang lalu
      const currentTime = Date.now();
      temporaryDataArray = temporaryDataArray.filter(
        (data) => currentTime - data.timestamp <= 10 * 60 * 1000
      );

      console.log('Old data deleted after 10 minutes.');
    }, 24 * 60 * 60 * 1000); // 24 jam dalam milidetik

  } catch (error) {
    console.error('Error:', error.message);
  }
};
const removeDataByWaNumber = (waNumber) => {
  try {
    // Filter array untuk menciptakan array baru tanpa objek yang memiliki waNumber tertentu
    let filteredData = temporaryDataArray.filter((data) => data.waNumber !== waNumber);

    // Update temporaryDataArray dengan array baru yang telah difilter
    temporaryDataArray = filteredData;
  } catch (error) {
    console.error('Error:', error.message);
  }
};

// Get the current time with WIB (Western Indonesian Time) timezone
const currentTime = new Date();
const timezoneOptionsWIB = { timeZone: 'Asia/Jakarta' };
const currentTimeWIB = new Intl.DateTimeFormat('id-ID', { timeStyle: 'short', ...timezoneOptionsWIB }).format(currentTime);

let timeOfDay;

if (currentTimeWIB >= 0 && currentTimeWIB < 12) {
    timeOfDay = "Morning"
} else if (currentTimeWIB >= 12 && currentTimeWIB < 15) {
    timeOfDay = "Afternoon"
} else if (currentTimeWIB >= 15 && currentTimeWIB < 18) {
    timeOfDay = "Evening"
} else {
    timeOfDay = "Night"
}

client.on('message', (message) => {
  if (message.body.toLowerCase().replace(/\s/g, '') === '1') {
    try {
      removeDataByWaNumber(message.from);
      message.reply(`*PRICELIST MAKEUP MUSLIMAH BANDUNG DAN TEAM 2024*\n\nMakeup Reguler *Rp 200k*\nMom Makeup *Rp 250k*\nMakeup Wedding Akad *Rp 500k*\nMakeup Wedding + Touch Up/ Melati *1.000k*\n\n NB\n*Max harga melati di 500k apabila harga di atas yang tercantum dikenakan charge tambahan\n*Untuk pembelian paket +touch up max 8 jam kerja\nDP min 30% dan pelunasan H-1`)
    } catch (error) {
      console.error(error.message);
      message.reply(error.message);
    }
  } else if (message.body.toLowerCase().replace(/\s/g, '') === '2') {
    try {
      removeDataByWaNumber(message.from);
      message.reply('https://instagram.com/makeup_muslimah_bandung');
    } catch (error) {
      console.error(error.message);
      message.reply(error.message);
    }
  } else if (message.body.toLowerCase().replace(/\s/g, '') === '3') {
    try {
      removeDataByWaNumber(message.from);
      message.reply('Tunggulah beberapa saat! Admin akan segera membalas pesan anda');
    } catch (error) {
      console.error(error.message);
      message.reply(error.message);
    }
  } else if (message.body.toLowerCase().replace(/\s/g, '') === '4') {
    const handleChatData = async (err, data) => {
      try {
        removeDataByWaNumber(message.from);
        if (err) {
          throw new Error('Error reading file: ' + err.message);
        }

        // Parse JSON data
        const jsonData = JSON.parse(data);

        if (!Array.isArray(jsonData)) {
          throw new Error('Invalid JSON format. Expected an array.');
        }

        const randomNumber = Math.floor(Math.random() * jsonData.length);

        const existingChat = temporaryDataArray.find((data) => data.waNumber === message.from)

        if (existingChat) {
          const removedChat = temporaryDataArray.filter((data) => data.waNumber !== message.from)
        }
        const chat = saveTemporaryData(jsonData[randomNumber].soal, jsonData[randomNumber].jawaban, 'bot-1', message.from, message._data.notifyName, null)

        message.reply(jsonData[randomNumber].soal);
      } catch (error) {
        console.error('Error in reading asahotak.json:', error.message);
        message.reply('Error in reading asahotak.json. Please try again later.');
      }
    };

    const filePath = path.resolve(__dirname, 'constants', 'asahotak.json');
    fs.readFile(filePath, 'utf8', handleChatData);
  } else if(message.body.toLowerCase().replace(/\s/g, '') === '5') {
    const handleChatData = async (err, data) => {
      try {
        removeDataByWaNumber(message.from);
        if (err) {
          throw new Error('Error reading file: ' + err.message);
        }

        // Parse JSON data
        const jsonData = JSON.parse(data);

        if (!Array.isArray(jsonData)) {
          throw new Error('Invalid JSON format. Expected an array.');
        }

        const randomNumber = Math.floor(Math.random() * jsonData.length);

        const existingChat = temporaryDataArray.find((data) => data.waNumber === message.from)

        if (existingChat) {
          const removedChat = temporaryDataArray.filter((data) => data.waNumber !== message.from)
        }
        const chat = saveTemporaryData(jsonData[randomNumber].img, jsonData[randomNumber].name, 'bot-6', message.from, message._data.notifyName, null);

        const media = await MessageMedia.fromUrl(jsonData[randomNumber].img)

        message.reply(media)
      } catch (error) {
        console.error('Error in reading tebakbendera.json:', error.message);
        // Handle the error as needed, e.g., reply with an error message to the user
        message.reply('Error in reading tebakbendera.json. Please try again later.');
      }
    };
    const filePath = path.resolve(__dirname, 'constants', 'tebakbendera.json');
    fs.readFile(filePath, 'utf8', handleChatData)
  } else if(message.body.toLowerCase().replace(/\s/g, '') === '6') {
    const handleChatData = async (err, data) => {
      try {
        removeDataByWaNumber(message.from);
        if (err) {
          throw new Error('Error reading file: ' + err.message);
        }

        // Parse JSON data
        const jsonData = JSON.parse(data);

        if (!Array.isArray(jsonData)) {
          throw new Error('Invalid JSON format. Expected an array.');
        }

        const randomNumber = Math.floor(Math.random() * jsonData.length);

        const existingChat = temporaryDataArray.find((data) => data.waNumber === message.from)

        if (existingChat) {
          const removedChat = temporaryDataArray.filter((data) => data.waNumber !== message.from)
        }
        const chat = saveTemporaryData(jsonData[randomNumber].soal, jsonData[randomNumber].jawaban, 'bot-15', message.from, message._data.notifyName, null)

        message.reply(jsonData[randomNumber].soal);
      } catch (error) {
        console.error('Error in reading tekateki.json:', error.message);
        // Handle the error as needed, e.g., reply with an error message to the user
        message.reply('Error in reading tekateki.json. Please try again later.');
      }
    };
    const filePath = path.resolve(__dirname, 'constants', 'tekateki.json');
    fs.readFile(filePath, 'utf8', handleChatData)
  } else if(message.body.toLowerCase().replace(/\s/g, '') === '7') {
    const filePath = path.resolve(__dirname, 'constants', 'quotes.json');
    removeDataByWaNumber(message.from);
    fs.readFile(filePath, 'utf8', (err, data) => {
      try {
        if (err) {
          throw new Error(`Error reading file: ${err.message}`);
        }
        //Parse Json data
        const jsonData = JSON.parse(data);
        const randomNumber = Math.floor(Math.random() * jsonData.length);

        message.reply(`\`\`\`${jsonData[randomNumber].text}\`\`\`\n_By: ${jsonData[randomNumber].author}_`)
      }
      catch (error) {
        console.error('Error in reading quotes.json:', error.message);
        // Handle the error as needed, e.g., reply with an error message to the user
        message.reply('Error in reading quotes.json. Please try again later.');
      }
    })
  } else if(message.body.toLowerCase().replace(/\s/g, '') === '8') {
    removeDataByWaNumber(message.from);
    const filePath = path.resolve(__dirname, 'constants', 'truth.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      try {
        if (err) {
          throw new Error(`Error reading file: ${err.message}`);
        }
        //Parse Json data
        const jsonData = JSON.parse(data);
        const randomNumber = Math.floor(Math.random() * jsonData.length);

        message.reply(`\`\`\`${jsonData[randomNumber]}\`\`\``);
      }
      catch (error) {
        console.error('Error in reading truth.json:', error.message);
        // Handle the error as needed, e.g., reply with an error message to the user
        message.reply('Error in reading truth.json. Please try again later.');
      }
    })
  } else if(message.body.toLowerCase().replace(/\s/g, '') === '9') {
    removeDataByWaNumber(message.from);
    const filePath = path.resolve(__dirname, 'constants', 'dare.json');
    fs.readFile(filePath, 'utf8', (err, data) => {
      try {
        if (err) {
          throw new Error(`Error reading file: ${err.message}`);
        }
        //Parse Json data
        const jsonData = JSON.parse(data);
        const randomNumber = Math.floor(Math.random() * jsonData.length);

        message.reply(`\`\`\`${jsonData[randomNumber]}\`\`\``);
      }
      catch (error) {
        console.error('Error in reading dare.json:', error.message);
        // Handle the error as needed, e.g., reply with an error message to the user
        message.reply('Error in reading dare.json. Please try again later.');
      }
    })
  } else {
    try {
      const requesterData = temporaryDataArray.find((data) => data.waNumber === message.from);
      if(!requesterData) {
        if(message.author) return;
        const chat = saveTemporaryData(null, null, null, message.from, message._data.notifyName, null);

        message.reply(`Hi Good ${timeOfDay} Thank you for contacting Azizah Musthafa!\nPlease let us know how we can help you.\n*1:* Info Pricelist\n*2:* Katalog Makeup\n*3:* Chat Admin\n*4:* Asak Otak\n*5:* Tebak Bendera\n*6:* Teka-Teki\n*7:* Quotes\n*8:* Truth\n*9:* Dare`);
      } else {
        if(requesterData.category === 'bot-1' || requesterData.category === 'bot-4' || requesterData.category === 'bot-5' || requesterData.category === 'bot-6' || requesterData.category === 'bot-9' || requesterData.category === 'bot-10' || requesterData.category === 'bot-11' || requesterData.category === 'bot-12' || requesterData.category === 'bot-13' || requesterData.category === 'bot-14' || requesterData.category === 'bot-15') {
          const correctAnswer = requesterData.answer.toLowerCase() === message.body.toLowerCase();
          if(correctAnswer) {
            message.reply(`Bravo ${requesterData.name}! Anda sudah menjawab dengan benar!\nSelamat anda berhak mendapatkan sebuah *HADIAH* yang akan dikirimkan ke rumah anda, jika tidak datang juga berarti anda ditipu...`);
          } else {
            message.reply(`Sayang sekali jawaban anda masih salah\nJawaban: *${requesterData.answer}*`)
          }
        } else if(requesterData.category === 'bot-2' || requesterData.category === 'bot-7') {
          const correctAnswer = requesterData.answer.toLowerCase() === message.body.toLowerCase();
          if(correctAnswer) {
            message.reply(`${requesterData.description}\nBravo! Anda sudah menjawab dengan benar!\nSelamat anda berhak mendapatkan sebuah *HADIAH* yang akan dikirimkan ke rumah anda, jika tidak datang juga berarti anda sudah tertipu`);
          } else {
            message.reply(`Sayang sekali jawaban anda masih salah\nJawaban: *${requesterData.answer}*\n👉: ${requesterData.description}`)
          }
        }
      }
      removeDataByWaNumber(message.from);
    }
    catch (error) {
      console.error('Error:', error.message);
      // Handle the error as needed, e.g., reply with an error message to the user
      message.reply('Error:', error.message);
    }
  }
})

client.initialize();