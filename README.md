# Machine Learning & Data Science Portfolio

A modern, responsive portfolio website showcasing machine learning and data science projects, skills, and experience. Built with React, TypeScript, and Tailwind CSS.

## 🚀 Features

- **Modern Design**: Clean, professional design with smooth animations
- **Responsive**: Fully responsive across all devices
- **Interactive**: Smooth scrolling navigation and hover effects
- **Project Showcase**: Filterable project gallery with detailed descriptions
- **Skills Visualization**: Interactive skill bars and proficiency levels
- **Contact Form**: Functional contact form for inquiries
- **SEO Optimized**: Meta tags and semantic HTML structure

## 🛠️ Tech Stack

- **Frontend**: React 18 with TypeScript
- **Styling**: Tailwind CSS with custom animations
- **Animations**: Framer Motion for smooth transitions
- **Icons**: Lucide React for consistent iconography
- **Build Tool**: Create React App
- **Deployment**: Ready for Vercel, Netlify, or GitHub Pages

## 📁 Project Structure

```
src/
├── components/
│   ├── Header.tsx          # Navigation header
│   ├── Hero.tsx           # Landing section
│   ├── About.tsx          # About section
│   ├── Skills.tsx         # Skills showcase
│   ├── Projects.tsx       # Project gallery
│   ├── Experience.tsx     # Work history & education
│   ├── Contact.tsx        # Contact form
│   └── Footer.tsx         # Footer section
├── App.tsx                # Main app component
├── index.tsx              # App entry point
└── index.css              # Global styles
```

## 🎨 Sections

### Hero Section
- Animated introduction with gradient text
- Call-to-action buttons
- Social media links
- Smooth scroll indicator

### About Section
- Personal introduction and background
- Key statistics and achievements
- Professional photo placeholder
- Expertise areas

### Skills Section
- Categorized technical skills
- Interactive progress bars
- Additional skills tags
- Visual skill icons

### Projects Section
- Filterable project gallery
- Project images and descriptions
- Technology tags
- GitHub and demo links
- Key features list

### Experience Section
- Work history with achievements
- Education background
- Professional certifications
- Timeline layout

### Contact Section
- Functional contact form
- Contact information
- Social media links
- Availability status

## 🚀 Getting Started

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd ml-ds-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm start
   ```

4. **Open your browser**
   Navigate to `http://localhost:3000`

### Building for Production

```bash
npm run build
```

## 🎯 Customization

### Personal Information
Update the following files with your information:

- **Hero.tsx**: Name, title, description, social links
- **About.tsx**: Personal background, stats, location
- **Skills.tsx**: Skill categories and proficiency levels
- **Projects.tsx**: Project details, images, links
- **Experience.tsx**: Work history, education, certifications
- **Contact.tsx**: Contact information and social links

### Styling
- **Colors**: Modify the color palette in `tailwind.config.js`
- **Fonts**: Update font imports in `public/index.html`
- **Animations**: Customize animations in `tailwind.config.js`

### Content
- **Projects**: Add your own projects with images and descriptions
- **Skills**: Update skill categories and proficiency levels
- **Experience**: Add your work history and education
- **Contact**: Update contact information and social links

## 📱 Responsive Design

The portfolio is fully responsive with breakpoints for:
- Mobile: 320px - 768px
- Tablet: 768px - 1024px
- Desktop: 1024px+

## 🌟 Key Features

### Animations
- Smooth scroll animations using Framer Motion
- Hover effects on interactive elements
- Staggered animations for lists and grids
- Loading animations for better UX

### Performance
- Optimized images and assets
- Lazy loading for better performance
- Efficient CSS with Tailwind
- Minimal bundle size

### Accessibility
- Semantic HTML structure
- ARIA labels for screen readers
- Keyboard navigation support
- High contrast color scheme

## 🚀 Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Deploy automatically

### Netlify
1. Build the project: `npm run build`
2. Upload the `build` folder to Netlify
3. Configure custom domain if needed

### GitHub Pages
1. Add `homepage` field to `package.json`
2. Install `gh-pages`: `npm install --save-dev gh-pages`
3. Add deploy scripts to `package.json`
4. Run `npm run deploy`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Support

If you have any questions or need help customizing the portfolio, please open an issue on GitHub.

---

**Made with ❤️ using React & TypeScript** 