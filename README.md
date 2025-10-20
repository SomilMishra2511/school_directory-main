# 🏫 School Management Web App (Next.js + MySQL + Cloudinary)

A responsive full-stack school management web app built using **Next.js**, **MySQL**, and **Cloudinary**.  
Users can add schools with images, view all schools, search, and view individual details.  
Cloudinary is used for image hosting and MySQL for data persistence.

---

## 🚀 Features

- 📸 Add School with image upload (Cloudinary integration)
- 🗂 View all schools in a responsive card grid
- 🔍 Search schools by name or city
- 📄 View single school details
- 🌐 Cloudinary-hosted image URLs stored in MySQL
- ⚡ Built using Next.js API routes + TailwindCSS
- 💾 Responsive and modern UI design

---

## 🛠 Tech Stack

| Layer | Technology |
|-------|-------------|
| Frontend | React + Next.js + TailwindCSS |
| Backend | Next.js API Routes |
| Database | MySQL (via mysql2 / pool connection) |
| Image Hosting | Cloudinary |
| Form Handling | react-hook-form + formidable |
| Styling | Tailwind CSS |

---

## 📂 Project Structure

school-assignment/
├── lib/
│ └── db.js # MySQL connection pool
├── pages/
│ ├── api/
│ │ ├── upload.js # Handles form submission + Cloudinary upload
│ │ └── schools.js # Fetch schools (list/single)
│ ├── addSchool.jsx # Form to add school details
│ ├── showSchools.jsx # Display all schools
│ └── school/[id].jsx # Single school detail page
├── public/
│ └── (static assets if needed)
├── styles/
│ └── globals.css
├── .env.local # Environment variables (ignored in Git)
├── .gitignore
├── README.md
├── next.config.js
├── package.json
└── tailwind.config.js