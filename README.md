# Fast Food App 🍔

<p align="center">
  <img src="./assets/icon.png" width="200" height="200" alt="Fast Food App Logo">
</p>

A mobile application for ordering fast food, featuring real-time order tracking and a seamless user experience.

## Related Repositories

This mobile app is part of a complete ecosystem:

- 🌐 [Web Application](https://github.com/jonathanleivag/food_app_web)
- ⚙️ [Backend Server](https://github.com/jonathanleivag/food-app-backend)

## Environment Setup

Before running the application, you need to set up your environment variables. Create a `.env` file in the root directory and add the following variables:

```env
EXPO_PUBLIC_API_URL="<API_URL>"
EXPO_PUBLIC_KEY_PUSHER="<KEY_PUSHER>"
EXPO_PUBLIC_CLUSTER_PUSHER="<CLUSTER_PUSHER>"
```

## Installation and Setup

1. Clone the repository:

```bash
git clone https://github.com/jonathanleivag/foodApp.git
cd foodApp
cp .env.example .env
npm i
npm run start
```
