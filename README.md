## Next-Music-Player: Cloning Spotify Music Player 🎶

[Spotify Clone]( https://next-music-player-mauve.vercel.app/ )

## 🌟 Overview
Next-Music-Player is a sleek and modern web application that aims to clone the core functionalities and user interface of a Spotify-like music player. Built with Next.js, it offers a fast, responsive, and intuitive experience for playing music, managing playlists, and discovering tracks. Whether you're a developer looking for a comprehensive example of a music streaming app or a music lover wanting a personal player, this project has something for you!

## ✨ Features
- Responsive UI : Beautifully designed interface that adapts to various screen sizes, from mobile to desktop.
- Music Playback : Play, pause, skip, and seek through tracks.
- Playlist Management: Create, view, and manage your custom music playlists.
- Search Functionality: Easily find your favorite songs, artists, or albums.
- Dynamic UI Elements: Interactive components for a seamless user experience.
- Modern Technologies: Leverages the power of Next.js for server-side rendering and static site generation, ensuring optimal performance.

## 🛠️ Technologies Used
This Project is built using a modern web development stack : 
- Next.js: React Framework for production-ready application , nabling server-side rendering (SSR) and static site generation (SSG).
- React: A JavaScript library for building user interfaces.
- Tailwind CSS: A utility-first CSS framework for rapidly building custom designs.
- TypeScript: For type-safe JavaScript.
- Supabase : An open-source Backend-as-a-Service (BaaS) platform that simplifies backend development for web and mobile applications.
- Zustand : For state management
- use-sound : Library for playing audio

## 🚀 Getting Started
Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.
Make sure you have Node.js and npm (or yarn) installed on your machine.
- Node.js : [ Download & install Node.js ]([LTS Version recommended](https://nodejs.org/dist/v22.18.0/node-v22.18.0-x64.msi))
- npm : Comes with nodejs
- Yarn(optional) : npm install -g yarn

## installation
1. Clone Repository
  ```bash
    git clone https://github.com/jiieea/Next-Music-Player.git
    cd Next-Music-Player
 ```
2 . Install dependecies
```bash
npm install
# or
yarn install
```
### Running the Development Server
To run the application in development mode:
```bash
npm run dev
# or
yarn dev
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying ```bash pages/index.js.``` The page auto-updates as you edit the file.

## 💡 Usage
Once the application is running, you can:
1. Browse the main interface, similar to a music player dashboard.

2. Interact with placeholder music tracks (if implemented) or integrate with a music API.

3. Explore the responsiveness by resizing your browser window

(Further usage instructions will depend on actual implemented features and data integration.)

## 📂 Project Structure
```bash
ext-Music-Player/
├── public/                 # Static assets (images, fonts)
├── pages/                  # Next.js pages (routes)
│   ├── api/                # API routes
│   └── _app.js             # Custom App component
│   └── index.js            # Home page
├── components/             # Reusable React components
├── styles/                 # Global styles, Tailwind CSS configuration
├── lib/                    # Utility functions, API integration logic
├── hooks/                  # Custom React hooks
├── data/                   # Mock data or local data sources (if any)
├── README.md               # This file
├── package.json            # Project dependencies and scripts
└── tailwind.config.js      # Tailwind CSS configuration
```

## 📄 License
Distributed under the MIT License. See ```bash  LICENSE ``` for more information.

## 🙏 Acknowledgements
- [Spotify](https://open.spotify.com/) for the inspiration
- [Next.js](https://nextjs.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- [React Icons](https://react-icons.github.io/react-icons/)
- [Code with Antonio](https://www.youtube.com/@codewithantonio) for the tutorials
