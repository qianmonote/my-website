# Enterprise Website Project

[中文](./README.md) | [English](./README_EN.md)

A modern enterprise website project built with [Next.js](https://nextjs.org), featuring multi-language support, responsive design, and a complete contact form system. Specially crafted for ONETOUCH AGRI ROBOTECH SDN. BHD. to showcase the company's green technology ecosystem and innovative solutions.

## ✨ Key Features

- 🚀 **Next.js 15** - Latest React framework
- 🎨 **Ant Design 5** - Enterprise-class UI component library
- 🌍 **Multi-language Support** - Chinese/English switching
- 📱 **Responsive Design** - Perfect mobile adaptation
- 💾 **Dual Database Support** - SQLite (local) + Vercel Postgres (production)
- 📋 **Contact Form System** - Complete data collection and management
- 🛡️ **TypeScript** - Type safety

## 🗄️ Database Support

The project supports automatic environment detection with dual database architecture:

- **Local Development**: Automatically uses SQLite database
- **Production Deployment**: Automatically uses Vercel Postgres database

For detailed configuration, please refer to: [Vercel Postgres Configuration Guide](./doc/VERCEL_POSTGRES_README.md)

## 🚀 Quick Start

### 1. Install Dependencies

```bash
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

### 3. Access Application

Open [http://localhost:3000](http://localhost:3000) to view the website.

- Contact Form Page: [http://localhost:3000/contact](http://localhost:3000/contact)
- Admin Dashboard: [http://localhost:3000/admin/contact](http://localhost:3000/admin/contact)

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   │   └── contact/       # Contact form API
│   ├── admin/             # Admin dashboard
│   ├── about/             # About us page
│   └── products/          # Products page
├── components/            # React components
│   ├── Navbar/           # Navigation bar
│   ├── Footer/           # Footer
│   ├── Banner/           # Carousel
│   └── elements/         # Common components
├── lib/                  # Utility libraries
│   ├── database.ts       # Database configuration
│   └── database-postgres.ts # Vercel Postgres support
└── config/               # Configuration files
    └── locales/          # Multi-language configuration
```

## 🔧 Environment Configuration

### Local Development
Local development requires no database configuration. The system will automatically:
- Create SQLite database file `./data/contact.db`
- Initialize database table structure
- Create default admin account (admin/admin123)

### Production Environment Deployment

1. **Create Vercel Postgres Database**
   - Create Postgres database in Vercel Dashboard
   - Vercel will automatically configure environment variables

2. **Deploy to Vercel**
   ```bash
   git push origin main
   ```
   
   The system will automatically detect the environment and use Vercel Postgres.

## 📋 Feature Modules

### Contact Form System
- ✅ Form data validation
- ✅ Data storage and management
- ✅ Backend data viewing
- ✅ Pagination and search functionality

### Multi-language Support
- ✅ Chinese/English switching
- ✅ Dynamic language loading
- ✅ SEO-friendly URLs

### Responsive Design
- ✅ Mobile optimization
- ✅ Touch-friendly interactions
- ✅ Adaptive layout

## 📚 Related Documentation

- [Contact Form System Guide](./doc/CONTACT_SYSTEM_README.md)
- [Internationalization Guide](./doc/INTERNATIONALIZATION_GUIDE.md)
- [Vercel Postgres Configuration Guide](./doc/VERCEL_POSTGRES_README.md)
- [Mobile Optimization Guide](./doc/MOBILE_OPTIMIZATION_README.md)
- [Team Interaction Features Guide](./doc/TEAM_INTERACTION_README.md)
- [Database Fix Guide](./doc/DATABASE_FIX_GUIDE.md)

## 🛠️ Technology Stack

- **Frontend Framework**: Next.js 15 (App Router)
- **UI Components**: Ant Design 5
- **Styling Solution**: CSS Modules
- **Development Language**: TypeScript
- **Database**: SQLite + Vercel Postgres
- **Deployment Platform**: Vercel

## 🚀 Deployment Guide

### Vercel Deployment (Recommended)

1. **Connect GitHub Repository**
   - Import project in Vercel Dashboard
   - Connect your GitHub repository

2. **Configure Database**
   - Create Vercel Postgres database
   - Environment variables will be automatically configured

3. **Deploy**
   - Each push to main branch will automatically deploy
   - First deployment will automatically initialize database tables

### Other Platform Deployment

For deployment to other platforms, ensure:
- Configure `POSTGRES_URL` environment variable
- Or keep using SQLite (requires persistent storage)

## 🔍 Development Guide

### Adding New Pages
```bash
# Create new route folder in src/app directory
mkdir src/app/new-page
touch src/app/new-page/page.tsx
```

### Modifying Database Structure
1. Update table structure in `src/lib/database.ts`
2. Update corresponding structure in `src/lib/database-postgres.ts`
3. Redeploy to apply changes

### Adding New API Endpoints
```bash
# Create new API route in src/app/api directory
mkdir src/app/api/new-endpoint
touch src/app/api/new-endpoint/route.ts
```

### Multi-language Development
1. Add translations in `src/config/locales/zh/common.json` and `src/config/locales/en/common.json`
2. Use `useI18n` Hook in components:
   ```typescript
   import { useI18n } from '../context/I18nContext';
   
   function MyComponent() {
     const { t } = useI18n();
     return <h1>{t('title')}</h1>;
   }
   ```

### Style Development
- Use CSS Modules for style isolation
- Follow Ant Design design specifications
- Ensure mobile responsive adaptation

### Environment Variable Configuration
Create `.env.local` file (local development):
```env
# Optional: Custom database path
DATABASE_PATH=./data/custom.db

# Production environment will automatically use Vercel Postgres
# POSTGRES_URL=your_postgres_connection_string
```

## 🤝 Contributing Guide

1. Fork this repository
2. Create feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Create Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🔧 Troubleshooting

### Common Issues

**1. Database Connection Failed**
- Check if `data` directory has write permissions
- Confirm SQLite file path is correct
- Check `POSTGRES_URL` environment variable in production

**2. Multi-language Switching Not Working**
- Ensure component is wrapped with `I18nProvider`
- Check if translation file format is correct
- Verify translation keys exist

**3. Style Issues**
- Clear browser cache
- Check if CSS Modules class names are correct
- Confirm Ant Design theme configuration

**4. API Interface Errors**
- Check request method and path
- Verify request parameter format
- Check server logs

### Performance Optimization

- Use Next.js image optimization components
- Enable Static Site Generation (SSG) for suitable pages
- Properly use client and server components
- Optimize database queries

## 📞 Technical Support

For questions or suggestions, please:
- Create [Issue](../../issues)
- Send email to technical support
- Check project documentation
- Refer to troubleshooting guide

## 🔄 Changelog

### v1.0.0 (2024-12-19)
- ✅ Initial version release
- ✅ Complete multi-language support
- ✅ Responsive design implementation
- ✅ Contact form system
- ✅ Dual database architecture
- ✅ Vercel deployment support

---

**Development Team**: ONETOUCH Development Team  
**Last Updated**: December 19, 2024  
**Version**: 1.0.0  
**License**: MIT