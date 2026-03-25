# Place of Beauty — PRD

## Problem Statement
Создать полноценный сайт для салона красоты Place of Beauty (Garbarska 17/2, 05-825 Grodzisk Mazowiecki, Polska). Сайт на польском языке. Информация из Facebook/Booksy страницы.

## Architecture
- **Backend**: FastAPI + MongoDB (motor async driver)
- **Frontend**: React + Tailwind CSS + Framer Motion + Shadcn UI
- **Database**: MongoDB — collections: services, reviews, gallery, salon_info

## User Personas
- Женщины (основная ЦА) и мужчины из Гродзиска Мазовецкого, ищущие косметические услуги
- Новые клиенты, которые ищут салон красоты через интернет
- Существующие клиенты, которые хотят записаться на приём

## Core Requirements
- Сайт на польском языке
- Страницы: Главная, Услуги (с ценами), О нас, Галерея, Отзывы, Контакт
- Запись через Booksy (внешняя ссылка)
- Современный лакшери дизайн с анимациями

## What's Implemented (2025-12-22)
- Full backend API: /api/services, /api/reviews, /api/gallery, /api/salon-info, /api/categories
- Database seeded with 29 services, 10 reviews, 12 gallery items, salon info
- Home page: Hero with parallax, features bar, services preview grid, reviews marquee, CTA section, info bar
- Services page: Full catalog with search, category filters, expandable categories, prices
- About page: Salon story, values (4 cards), team (Carika), amenities
- Gallery page: Masonry grid with lightbox, category filters
- Reviews page: Rating summary (4.9/272), testimonials grid, Booksy link
- Contact page: Address, phone, Facebook, working hours (with today highlight), Google Maps embed
- Layout: Glass navbar with scroll effect, footer, mobile menu (Sheet), scroll-to-top button
- Design: Playfair Display + Manrope fonts, stone/gold palette, grain overlay, hover animations, parallax

## Testing Results
- Backend: 100% (7/7 endpoints)
- Frontend: 98% (minor scroll button z-index — fixed)

## Prioritized Backlog
- P0: None (MVP complete)
- P1: Contact form (email integration), SEO meta tags
- P2: Blog/news section, promotions/specials page, multi-language support
- P3: Admin panel for managing services/gallery/reviews

## Next Tasks
1. Add contact form with email integration (e.g. SendGrid/Resend)
2. Add SEO meta tags and Open Graph for social sharing
3. Add actual salon photos (replace stock images)
4. Add promotions/specials section
5. Add Google Analytics
