<a href="https://github.com/lukesthl/fritz-ui">
  <img alt="Fritz-UI" src="">
  <h1 align="center">Fritz UI</h1>
</a>

<p align="center">
TODO
</p>
<p align="center">
  <a href="#about-the-project"><strong>About The Project</strong></a> ·
  <a href="#requirements"><strong>Requirements</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
  <a href="#author"><strong>Author</strong></a>
</p>
<br/>

## About The Project

TODO

## Requirements

- [Motion Detector App](https://github.com/lukesthl/motion-detector/releases) installed (MacOS, Windows, Ubuntu)
- Raspberry Pi
  - 64-bit OS
  - [Bun](https://github.com/oven-sh/bun#install) installed
  - Python 3 and [GPIO zero](https://gpiozero.readthedocs.io/en/stable/installing.html) installed
  - Server (RPi) must only be reached in local network
  - Raspberry Pi with [Infrared Sensor](https://projects.raspberrypi.org/en/projects/physical-computing/11) connected on GPIO Pin

## Server Installation

1. Clone the repository onto your Raspberry Pi:

```bash
docker run -d --restart=always -p 300:3000 --name fritz-ui 0062836749ab72225f3676edc518e569cb418867d59365a42d5cbc02b4f1fb9f

docker run -d --restart=always -p 3000:3000 -e NEXTAUTH_URL='http://localhost:3000' \
  -e NEXTAUTH_SECRET='secert' \
  -e FRITZBOX_SSL='0' \
  -e FRITZBOX_HOST='fritz.box' \
  -e FRITZBOX_PORT='80'  --name fritz-ui 301946e15bfde123bfefaeb92794210f0e1c72144b014b0349752c8fec1adf4e
```

## Tech Stack

### Frontend (App)

- [Tauri](https://tauri.app/) – Tauri is a framework for building tiny, blazingly fast binaries for all major desktop platforms
- [SvelteKit](https://kit.svelte.dev/) – SvelteKit is built on Svelte, a UI framework for making interactive webpages
- [Vite](https://vitejs.dev/) – Vite is a build tool for Frontends. It allows for faster development thanks to fast Hot Module Reload (HMR)
- [TailwindCSS](https://tailwindcss.com/) - Tailwind CSS is basically a utility-first CSS framework for rapidly building custom user interfaces

### Backend (Raspberry Pi Server)

- [Bun](https://bun.sh/) – Bun is a fast all-in-one JavaScript runtime like nodejs or deno
- [SQLite](https://www.sqlite.org/) – SQL database engine (only one currently supported by bun)

## Ideas

- [ ] Dashboard
- [ ] Add more Actions (E-Mail, Phillips Hue, Sound)
- [ ] Mobile App Support (https://tauri.app/blog/2022/12/09/tauri-mobile-alpha/)
- [ ] Multiple Server/Sensor Support

## Known Limitations

- MacOS Notifications not popping up (only shown in notification panel): https://github.com/tauri-apps/tauri/issues/5488
- Bun Docker build with aarch64: https://github.com/oven-sh/bun/issues/1219

## Author

- Luke Stahl ([@lukesthl](https://github.com/lukesthl))
