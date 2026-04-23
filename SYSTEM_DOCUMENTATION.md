# Mahayahay FM-ChMS: System Functionality & Process Documentation

## 🕊️ Project Overview
The **Mahayahay FM-ChMS** (Church Management System) is a modern, high-performance web application designed to streamline church operations, manage membership, track finances, and maintain a dynamic landing page for the community.

### 🛠️ Technology Stack
- **Framework**: Next.js 14 (App Router)
- **Database & Auth**: Supabase (PostgreSQL)
- **Styling**: Tailwind CSS & Lucide Icons
- **Components**: Shadcn UI & Base UI
- **Notifications**: Sonner (Toaster)

---

## 🏛️ System Architecture & Roles

### 1. Public Landing Page
The landing page serves as the digital front door for the church. It is dynamic and content-managed via the Admin Panel.
- **Hero Section**: Displays the church mission statement and primary call to action.
- **Worship Schedule**: Information about Sunday services and midweek gatherings.
- **Mission & Vision**: Core values and leadership information.
- **Real-time Updates**: Displays the latest 3 events and current announcements fetched directly from Supabase.
- **Prayer Request**: A public form allowing anyone to submit prayer requests directly to the church leadership.

### 2. Admin Portal (Role-Based Access)
The system uses **Supabase Auth** with a secondary check on the `users` table for an `admin` role.
- **Middleware Guard**: Prevents non-admin users from accessing the `/admin` routes.
- **Dashboard**: A central hub providing high-level metrics (Total Members, Upcoming Events, and Financial Summaries).

---

## ⚙️ Core Modules & Functionality

### 👥 Member Management
- **Process**: Admins can track church attendees and official members.
- **Features**: 
  - Add new members with contact details and family group associations.
  - Track "Active" vs "Inactive" status.
  - Delete or archive member records.
- **Revalidation**: Updates to members immediately refresh the admin view.

### 📅 Event Management
- **Process**: Planning and announcing church activities (e.g., Youth Camp, Sunday Worship).
- **Features**:
  - Create events with date, time, location, and specific ministry association.
  - Integrated with the Landing Page: New events automatically appear on the public site.
  - Management of event history and future schedules.

### 💰 Financial Tracking (Giving)
- **Process**: Recording tithes, offerings, and church expenses.
- **Features**:
  - Log transactions categorized by type (Donation, Tithe, Expense).
  - Real-time calculation of "Total Giving" displayed on the admin dashboard.
  - Date-based tracking for financial audits.

### 📣 Announcements & CMS
- **Process**: Managing public communication and website content.
- **Announcements**: Categorized news items (e.g., General, Urgent) with optional expiration dates.
- **CMS**: Allows admins to update the Landing Page's text (Hero title, Pastor's message, etc.) without touching any code.

### 🏷️ Ministry & User Management
- **Ministries**: Organizing the church into specific groups (Music, Youth, Kids).
- **User Management**: Admins can manage other user accounts and assign roles to ensure secure system access.

### 🛡️ Prayer Request Handling
- **Flow**: Public User submits form → API route `/api/prayer` processes request → Saved to `prayer_requests` table → Admin receives notification/view in the portal.

---

## 🔄 Data Processes & Reliability

1. **Server Actions**: All form submissions use Next.js Server Actions for secure, server-side processing.
2. **Revalidation**: The system uses `revalidatePath` to ensure that data changes (like adding an event) are reflected immediately on both the admin dashboard and the public landing page.
3. **Realtime Capability**: Tables are configured for Supabase Realtime, allowing the system to listen for database changes and update the UI without manual refreshes (requires Realtime to be enabled in the Supabase Dashboard).
4. **Error Handling**: Standardized error handling using `try/catch` blocks in server actions with user-friendly toast notifications via `sonner`.

---

## 🔒 Security Measures
- **Supabase RLS (Row Level Security)**: Protects tables from unauthorized access.
- **Protected API Routes**: Critical operations are restricted to authenticated admin sessions.
- **Environment Variables**: Sensitive keys (Supabase Service Key, etc.) are kept server-side in `.env.local`.
