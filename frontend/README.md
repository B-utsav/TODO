# ⚡ Todo App - Vite + React Version

This is the **Vite version** of the Todo app that uses `npm run dev` instead of `npm start`.

## 🚀 Quick Start

### Install dependencies:
```bash
npm install
```

### Start development server:
```bash
npm run dev
```

Server runs at: http://localhost:3000

### Build for production:
```bash
npm run build
```

### Preview production build:
```bash
npm run preview
```

---

## ⚡ Why Vite?

- **5-10x faster** than Create React App
- **Instant hot module replacement** (HMR)
- **Modern build tool** using esbuild
- **Smaller bundle sizes**
- **Better developer experience**

---

## 📦 What's Different from CRA?

### Commands:
- ✅ `npm run dev` (instead of `npm start`)
- ✅ File extensions: `.jsx` (instead of `.js`)
- ✅ Vite config (instead of webpack)
- ✅ Faster builds and hot reload

### File Structure:
```
frontend-vite/
├── index.html           ← Root HTML (not in public/)
├── vite.config.js       ← Vite configuration
├── package.json
├── src/
│   ├── main.jsx         ← Entry point (not index.js)
│   ├── App.jsx
│   ├── App.css
│   ├── index.css
│   └── components/
│       ├── TodoForm.jsx
│       ├── TodoList.jsx
│       └── TodoItem.jsx
└── public/
```

---

## 🔧 Setup with Backend

### Terminal 1 - Backend:
```bash
cd backend
python -m venv venv
venv\Scripts\activate    # Windows
# source venv/bin/activate  # Mac/Linux
pip install -r requirements.txt
python manage.py migrate
python manage.py runserver
```

### Terminal 2 - Frontend (Vite):
```bash
cd frontend-vite
npm install
npm run dev
```

---

## 🌐 API Configuration

The proxy is configured in `vite.config.js`:

```javascript
server: {
  proxy: {
    '/api': {
      target: '*',
      changeOrigin: true,
    }
  }
}
```

This forwards all `/api/*` requests to the Django backend.

---

## 📋 Available Scripts

- `npm run dev` - Start dev server with hot reload
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

---

## 🆚 Comparison

| Feature | Create React App | Vite |
|---------|-----------------|------|
| Start command | `npm start` | `npm run dev` |
| Dev server speed | ~10-20s | ~1-2s ⚡ |
| Hot reload | Good | Instant ⚡ |
| Build time | 30-60s | 5-10s ⚡ |
| File extension | `.js` | `.jsx` |
| Bundle size | Larger | Smaller ⚡ |

---

## ✅ Features

Same features as the original app:
- ✅ Create, read, update, delete todos
- ✅ Mark complete/incomplete
- ✅ Inline editing
- ✅ Real-time statistics
- ✅ Beautiful gradient UI
- ✅ Responsive design

---

## 🔄 Migrating from CRA

If you want to migrate your existing CRA project:

1. Copy your `src` folder
2. Rename `.js` files to `.jsx`
3. Update imports to include `.jsx` extension
4. Use `npm run dev` instead of `npm start`

---

## 📚 Learn More

- [Vite Documentation](https://vitejs.dev/)
- [Vite + React Guide](https://vitejs.dev/guide/)
- [Why Vite?](https://vitejs.dev/guide/why.html)

---

Happy coding with Vite! ⚡🚀
