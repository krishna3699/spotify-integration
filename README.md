# 🎵 Spotify Track Advice App

This is a full-stack application that authenticates users via Spotify, fetches their top tracks, and provides custom advice for each track.
---

## 🚀 Features

- ✅ Spotify OAuth integration
- ✅ Displays user's top tracks
- ✅ Allows adding and viewing advice per track
- ✅ Paginated results
- ✅ Full Docker support
- ✅ JWT-based authentication

---

## 🧪 Tech Stack

| Layer       | Tech                          |
|------------|-------------------------------|
| Frontend    | Angular                       |
| Backend     | Node.js, Express, TypeORM     |
| Database    | MySQL                         |
| Auth        | JWT + Spotify OAuth           |
| Deployment  | Docker + Docker Compose       |

---

## 🐳 Getting Started with Docker

### 🔧 Prerequisites

- Docker
- Docker Compose
- Spotify Developer Account(please set the redirect uri to value mentioned in docker-compose)

### ⚙️ Environment Variables

You can configure environment variables inside the `docker-compose.yml` file.

```env
# Example
JWT_SECRET=your_jwt_secret
SPOTIFY_CLIENT_ID=your_spotify_id
SPOTIFY_CLIENT_SECRET=your_spotify_secret
