<a href="https://github.com/lukesthl/fritz-ui">
  <h1 align="center">Fritz UI</h1>
</a>
<p align="center">
Beautiful, fast and modern UI for the FRITZ!Box. Get a simple overview over your Router, Networkdevices and SmartHome Devices. 
</p>
<p align="center">
  <a href="#about-the-project"><strong>About The Project</strong></a> ·
  <a href="#features"><strong>Features</strong></a> ·
  <a href="#installation"><strong>Installation</strong></a> ·
  <a href="#configuration"><strong>Configuration</strong></a> ·
  <a href="#tech-stack"><strong>Tech Stack</strong></a>
</p>
<br/>

## About The Project

https://user-images.githubusercontent.com/44963006/230889693-20225732-0f8f-43a3-9181-178596689273.mp4

## Features

- Dashboard with Router, SmartHome Device Stats
- Mobile Responsive
- All your network devices in one list
- SmartHome Devices with current temperature, battery status and more
- Login with your fritzbox user credential

## Installation

Docker

```bash
docker run -d --restart=always -p 3000:3000 --name fritz-ui ghcr.io/lukesthl/fritz-ui:latest
```

## Configuration

```bash
docker run -d --restart=always -p 3000:3000 -e NEXTAUTH_URL='http://localhost:3000' \
  -e NEXTAUTH_URL='http://localhost:3000' \
  -e NEXTAUTH_SECRET='secret' \
  -e FRITZBOX_HOST='fritz.box' \
  -e FRITZBOX_PORT='49000'  \
  -e FRITZBOX_SSL='0' \
  --name fritz-ui ghcr.io/lukesthl/fritz-ui:latest
```

### Run-time variables

These variables must also be provided at runtime

| Variable        | Description                                                                                                                                                                      | Required | Default                 |
| --------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | -------- | ----------------------- |
| NEXTAUTH_URL    | Base URL of the site. NOTE: if this value differs from the value used at build-time, there will be a slight delay during container start (to update the statically built files). | optional | `http://localhost:3000` |
| NEXTAUTH_SECRET | jwt secret                                                                                                                                                                       | optional | `secret`                |
| FRITZBOX_HOST   | fritzbox host                                                                                                                                                                    | optional | `fritz.box`             |
| FRITZBOX_PORT   | fritzbox port                                                                                                                                                                    | optional | `49000`                 |
| FRITZBOX_SSL    | is fritzbox accessible via https (1 = true, 0 = false)                                                                                                                           | optional | `0`                     |

## Tech Stack

###

- [Nextjs](https://nextjs.org/)
- [tRPC](https://trpc.io/)
- [TailwindCSS](https://tailwindcss.com/)
- [NextAuth.js](https://next-auth.js.org/)
- [Fritzbox](https://github.com/lukesthl/fritzbox)

## Ideas

- [ ] Customizable Dashboard
- [ ] Multi Language Support
- [ ] Edit Network Device Properties
- [ ] Move to app dir with rsc ([waiting for tRPC](https://github.com/trpc/trpc/discussions/3185#discussioncomment-4167473))

## Security

You can technically host it on a vps, however i don't recommend it. Always host on a private network, which is not accessible publicly.
