# Blog Platform — Angular + NestJS

This is a full-stack blog platform with JWT authentication and CRUD functionality for blog posts. Built with:

- 🅰️ Angular 17 (Sakai-NG UI)
- ⚙️ NestJS (or Express)
- 🔡 Supabase Auth (or mocked auth using AWS Amplify)

---

## 📁 Folder Structure

```
/frontend   → Angular project
/backend    → NestJS or Express backend
```

---

## 🚀 Setup Instructions

### Frontend

```bash
cd frontend
npm install
ng serve
```

Runs the Angular app at `http://localhost:4200`.

---

### Backend

```bash
cd backend
npm install
npm run start:dev
```

Runs the NestJS/Express API server at `http://localhost:3000`.

---

## 🔐 Auth Flow

- User signs in via AWS Amplify/Supabase.
- The user's email is stored in `localStorage`.
- On post creation, the author is auto-filled from localStorage.
- Protected routes (like post creation) are guarded using `CanActivate`.

---
