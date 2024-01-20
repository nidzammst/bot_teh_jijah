
# WA_BOT by Ahmad Nidzam Musthafa

WhatsApp bot dengan berbagai macam fitur, menggunakan library [whatsapp-web.js](https://github.com/pedroslopez/whatsapp-web.js)

NOTE: Saya tidak dapat menjamin Anda tidak akan diblokir dengan menggunakan metode ini, meskipun metode ini berhasil untuk saya. WhatsApp tidak mengizinkan bot atau client tidak resmi di platform mereka, jadi hal ini tidak dianggap sepenuhnya aman.


### ✍️ Random Dev Quote
![](https://quotes-github-readme.vercel.app/api?type=horizontal&theme=dark)
## Tech Stack

**Server:** Node


## Installation

Install wa_bot on Ubuntu, Kali Linux or debian based, Arch Linux Manjaro or Arch based

Install wa_bot on Termux

```bash
  pkg install proot-distro
  proot-distro install alpine
  proot-distro login alpine
  apk update && echo @edge http://nl.alpinelinux.org/alpine/edge/community >> /etc/apk/repositories && echo @edge http://nl.alpinelinux.org/alpine/edge/main >> /etc/apk/repositories
  apk update && apk add nodejs git && apk add --no-cache chromium
  git clone https://github.com/nidzammst/wa_bot
  cd wa_bot
  npm install
```

Development
```bash
   npm run dev
```

Starting the project
```bash
   npm run start
```

Kemudian tinggal scan QR code pas muncul di terminal dan tunggu terhubung sampai muncul `Client is Ready!`

## Run Locally

Clone the project

```bash
  git clone https://github.com/nidzammst/wa_bot
```

Go to the project directory

```bash
  cd wa_bot
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm run start
```


## Supported features

| Feature  | Status |
| ------------- | ------------- |
| Multi Device  | ✅  |
| Send messages  | ✅  |
| Receive messages  | ✅  |
| Send media (images/audio/documents)  | ✅  |
| Send media (video)  | ✅ [(requires google chrome)](https://wwebjs.dev/guide/handling-attachments.html#caveat-for-sending-videos-and-gifs)  |
| Send stickers | ✅ |
| Receive media (images/audio/video/documents)  | ✅  |
| Send contact cards | ✅ |
| Send location | ✅ |
| Send buttons | ❌ |
| Send lists | ❌  [(DEPRECATED)](https://www.youtube.com/watch?v=hv1R1rLeVVE) |
| Receive location | ✅ | 
| Message replies | ✅ |
| Join groups by invite  | ✅ |
| Get invite for group  | ✅ |
| Modify group info (subject, description)  | ✅  |
| Modify group settings (send messages, edit info)  | ✅  |
| Add group participants  | ✅  |
| Kick group participants  | ✅  |
| Promote/demote group participants | ✅ |
| Mention users | ✅ |
| Mute/unmute chats | ✅ |
| Block/unblock contacts | ✅ |
| Get contact info | ✅ |
| Get profile pictures | ✅ |
| Set user status message | ✅ |
| React to messages | ✅ |
| Vote in polls | 🔜 |
| Create polls | ✅ |

Something missing? Make an issue and let us know!


## Contributing

Pull requests are welcome! If you see something you'd like to add, please do. For drastic changes, please open an issue first.

## Support

For support, email nidzam0501@gmail.com or join our Slack channel.
  ## 💰 You can help me by Donating
[![BuyMeACoffee](https://img.shields.io/badge/Buy%20Me%20a%20Coffee-ffdd00?style=for-the-badge&logo=buy-me-a-coffee&logoColor=black)](https://buymeacoffee.com/nidzam) [![PayPal](https://img.shields.io/badge/PayPal-00457C?style=for-the-badge&logo=paypal&logoColor=white)](https://paypal.me/nidzammst) [![Ko-Fi](https://img.shields.io/badge/Ko--fi-F16061?style=for-the-badge&logo=ko-fi&logoColor=white)](https://ko-fi.com/nidzam) 


## License

[MIT](https://choosealicense.com/licenses/mit/)

Copyright 2024 Ahmad Nidzam Mst
## Related

Here are some related projects

[Awesome README](https://github.com/matiassingers/awesome-readme)

