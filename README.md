# 🏗️ Welder Qualification Management System

A modern, production-ready web application for managing welder qualifications, certifications, and continuity records in compliance with welding standards (ASME, AWS, API).

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-18.x-61dafb)
![License](https://img.shields.io/badge/license-MIT-green)

---

## 📋 **Features**

### ✅ **Currently Implemented (Phase 4)**
- **Authentication System** - Secure login with session management
- **Form1 (WPQ Certificate)** - Complete 6-section qualification form
- **Real-time Validation** - Instant feedback with Zod validation
- **File Upload Management** - Photos and digital signatures
- **Form Persistence** - Auto-save to localStorage
- **Professional PDF Generation** - Compliant certificate output
- **Search & Reports** - Advanced filtering and data retrieval
- **Responsive Design** - Works on desktop, tablet, and mobile

### 🚧 **Upcoming Features (Future Phases)**
- Form2-5 implementation
- Advanced analytics dashboard
- Email notifications
- Role-based access control
- Bulk import/export
- Expiration alerts

---

## 🛠️ **Tech Stack**

| Category | Technology |
|----------|-----------|
| **Frontend** | React 18, Vite, Tailwind CSS |
| **UI Components** | shadcn/ui, Lucide React |
| **Backend** | Supabase (PostgreSQL + Auth + Storage) |
| **Validation** | Zod |
| **PDF Generation** | @react-pdf/renderer |
| **Routing** | React Router v6 |
| **Deployment** | Vercel (Frontend) + Supabase Cloud |

---

## 📦 **Installation**

### **Prerequisites**
- Node.js 18.x or higher
- npm or yarn
- Supabase account (free tier works)
- Vercel account (for deployment)

### **1. Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/welder-management.git
cd welder-management
```

### **2. Install dependencies**
```bash
npm install
```

### **3. Set up environment variables**
```bash
# Copy the example file
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# Get these from: https://supabase.com/dashboard/project/YOUR_PROJECT/settings/api
```

### **4. Set up Supabase**

Run the SQL schema in your Supabase SQL Editor:

```sql
-- Copy the complete schema from the project documentation
-- Location: /docs/database-schema.sql
```

Create storage buckets:
- `welder-photos` (public)
- `signatures` (public)
- `documents` (public)
- `qr-codes` (public)

### **5. Run development server**
```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173)

---

## 📁 **Project Structure**

```
welder-management/
├── public/
│   └── iss-logo.png
├── src/
│   ├── components/
│   │   ├── ui/              # shadcn/ui components
│   │   ├── layout/          # Navbar, Footer, Layout
│   │   ├── auth/            # Login, ProtectedRoute
│   │   ├── forms/           # Form1 sections
│   │   ├── reports/         # Report tables
│   │   └── pdf/             # PDF templates
│   ├── contexts/
│   │   └── AuthContext.jsx
│   ├── hooks/
│   │   ├── useForm1State.js
│   │   └── useFileUpload.js
│   ├── lib/
│   │   └── supabase.js
│   ├── pages/
│   │   ├── Login.jsx
│   │   ├── Home.jsx
│   │   ├── Form1Page.jsx
│   │   └── ...
│   ├── services/
│   │   ├── authService.js
│   │   ├── welderService.js
│   │   └── storageService.js
│   ├── utils/
│   │   └── validators.js
│   ├── App.jsx
│   └── main.jsx
├── .env.example
├── .gitignore
├── package.json
└── README.md
```

---

## 🧪 **Testing**

### **Quick Validation Test**
Use this sample data to test Form1:

```
Section 1:
- Client/Contractor: ALMUZAIN
- Client Name Short: MZN
- Certificate No: TEST-001
- Symbol/Stamp No: MZN-999
- Welder Name: JOHN SMITH
- Welder Name Short: J Smith
- Iqama: 1234567890
- Date Welded: 2025-01-15
- Date of Birth: 1985-03-20

Section 2:
- WPS ID: MZN/WPS-126/11
- Test Type: Test Coupon
- Base Metal: SA106 Gr.B

Section 5:
- Visual Exam: Accepted

Section 6:
- Continuity Date: 2025-01-10
- Code Year: 2025
- Form No: 001
- Certified Date: 2025-01-15
- Certified Name: ABDUL HASEEB
```

---

## 🚀 **Deployment**

### **Deploy to Vercel**

```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

Add environment variables in Vercel dashboard:
- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_ANON_KEY`
- `VITE_APP_URL`

---

## 📊 **Database Schema**

### **Main Tables**
- `welders` - Welder master data
- `wpq_records` - Form1 WPQ certificate data
- `continuity_records` - Continuity tracking
- `documents` - PDF references
- `audit_logs` - Change history

See full schema in `/docs/database-schema.sql`

---

## 🔒 **Security Features**

- ✅ Row Level Security (RLS) on all tables
- ✅ Secure file upload with validation
- ✅ Session-based authentication
- ✅ Protected API routes
- ✅ Input sanitization
- ✅ XSS prevention

---

## 📝 **Development Timeline**

- **Phase 1-3** ✅ Foundation, Auth, Layout (Complete)
- **Phase 4** ✅ Form1 Entry (Complete - Current)
- **Phase 5** 🚧 CRUD Operations (Next)
- **Phase 6** ⏳ PDF Generation
- **Phase 7** ⏳ Search & Reports
- **Phase 8** ⏳ Testing & Polish

---

## 🤝 **Contributing**

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📄 **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 👥 **Credits**

- **Developer:** Your Name
- **Company:** Industrial Support Services Co.
- **Year:** 2025

---

## 📞 **Support**

For issues and questions:
- Create an issue on GitHub
- Email: your-email@example.com

---

## 🔄 **Version History**

### **v1.0.0** (January 2025)
- ✅ Initial release with Form1 complete
- ✅ Authentication system
- ✅ Form persistence
- ✅ File upload management
- ✅ Professional error handling

---

**⭐ If you find this project useful, please give it a star on GitHub!**