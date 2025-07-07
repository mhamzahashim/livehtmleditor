
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { 
  Globe, Briefcase, ShoppingCart, BookOpen, 
  Camera, Utensils, Heart, Gamepad2
} from 'lucide-react';

interface ProjectTemplatesProps {
  onSelectTemplate: (code: string) => void;
}

const ProjectTemplates = ({ onSelectTemplate }: ProjectTemplatesProps) => {
  const templates = [
    {
      name: 'Landing Page',
      icon: <Globe className="w-5 h-5" />,
      description: 'Modern landing page with hero section',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Landing Page</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; }
        .hero { background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 4rem 2rem; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
        .btn { background: white; color: #667eea; padding: 0.75rem 2rem; border: none; border-radius: 25px; font-weight: bold; cursor: pointer; }
        .features { display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; padding: 4rem 2rem; }
        .feature { text-align: center; padding: 2rem; }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Welcome to Our Platform</h1>
        <p>Discover amazing features and grow your business</p>
        <button class="btn">Get Started Today</button>
    </section>
    
    <section class="features">
        <div class="feature">
            <h3>Feature One</h3>
            <p>Amazing feature that will help your business grow and succeed in the market.</p>
        </div>
        <div class="feature">
            <h3>Feature Two</h3>
            <p>Another incredible feature that provides value to your customers and users.</p>
        </div>
        <div class="feature">
            <h3>Feature Three</h3>
            <p>The final feature that completes the perfect solution for your needs.</p>
        </div>
    </section>
</body>
</html>`
    },
    {
      name: 'Portfolio',
      icon: <Briefcase className="w-5 h-5" />,
      description: 'Personal portfolio website',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Portfolio</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; color: #333; }
        header { background: #2c3e50; color: white; padding: 1rem 2rem; position: fixed; width: 100%; top: 0; z-index: 1000; }
        nav { display: flex; justify-content: space-between; align-items: center; }
        nav ul { display: flex; list-style: none; gap: 2rem; }
        nav a { color: white; text-decoration: none; }
        .intro { background: #ecf0f1; padding: 6rem 2rem 4rem; text-align: center; }
        .intro h1 { font-size: 2.5rem; margin-bottom: 1rem; }
        .projects { padding: 4rem 2rem; }
        .project-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; }
        .project { background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); overflow: hidden; }
        .project img { width: 100%; height: 200px; object-fit: cover; }
        .project-content { padding: 1.5rem; }
    </style>
</head>
<body>
    <header>
        <nav>
            <div class="logo">Portfolio</div>
            <ul>
                <li><a href="#home">Home</a></li>
                <li><a href="#projects">Projects</a></li>
                <li><a href="#contact">Contact</a></li>
            </ul>
        </nav>
    </header>
    
    <section class="intro" id="home">
        <h1>John Doe</h1>
        <p>Web Developer & Designer</p>
        <p>I create beautiful and functional websites that help businesses grow.</p>
    </section>
    
    <section class="projects" id="projects">
        <h2 style="text-align: center; margin-bottom: 3rem;">My Projects</h2>
        <div class="project-grid">
            <div class="project">
                <img src="https://via.placeholder.com/400x200/3498db/ffffff?text=Project+1" alt="Project 1">
                <div class="project-content">
                    <h3>E-commerce Website</h3>
                    <p>A modern e-commerce platform built with latest technologies.</p>
                </div>
            </div>
            <div class="project">
                <img src="https://via.placeholder.com/400x200/e74c3c/ffffff?text=Project+2" alt="Project 2">
                <div class="project-content">
                    <h3>Portfolio Website</h3>
                    <p>A beautiful portfolio website for a creative professional.</p>
                </div>
            </div>
        </div>
    </section>
</body>
</html>`
    },
    {
      name: 'Blog',
      icon: <BookOpen className="w-5 h-5" />,
      description: 'Simple blog layout',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Blog</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Georgia', serif; line-height: 1.6; color: #333; background: #f8f9fa; }
        header { background: white; padding: 2rem; text-align: center; border-bottom: 1px solid #e9ecef; }
        header h1 { color: #2c3e50; font-size: 2.5rem; }
        header p { color: #6c757d; margin-top: 0.5rem; }
        main { max-width: 800px; margin: 2rem auto; padding: 0 2rem; }
        article { background: white; margin-bottom: 2rem; padding: 2rem; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        article h2 { color: #2c3e50; margin-bottom: 1rem; }
        .meta { color: #6c757d; font-size: 0.9rem; margin-bottom: 1rem; }
        .read-more { color: #007bff; text-decoration: none; font-weight: bold; }
        .read-more:hover { text-decoration: underline; }
    </style>
</head>
<body>
    <header>
        <h1>My Blog</h1>
        <p>Thoughts, stories and ideas</p>
    </header>
    
    <main>
        <article>
            <h2>Getting Started with Web Development</h2>
            <div class="meta">Published on March 15, 2024 by John Doe</div>
            <p>Web development has become one of the most sought-after skills in today's digital world. Whether you're looking to change careers or enhance your current skill set, learning web development can open many doors...</p>
            <a href="#" class="read-more">Read More →</a>
        </article>
        
        <article>
            <h2>The Future of JavaScript</h2>
            <div class="meta">Published on March 10, 2024 by John Doe</div>
            <p>JavaScript continues to evolve and shape the web development landscape. With new features being added regularly and frameworks constantly emerging, it's an exciting time to be a JavaScript developer...</p>
            <a href="#" class="read-more">Read More →</a>
        </article>
        
        <article>
            <h2>CSS Grid vs Flexbox</h2>
            <div class="meta">Published on March 5, 2024 by John Doe</div>
            <p>Two of the most powerful layout systems in CSS are Grid and Flexbox. While they might seem similar at first glance, they each have their strengths and ideal use cases...</p>
            <a href="#" class="read-more">Read More →</a>
        </article>
    </main>
</body>
</html>`
    },
    {
      name: 'Restaurant',
      icon: <Utensils className="w-5 h-5" />,
      description: 'Restaurant website template',
      code: `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Restaurant</title>
    <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body { font-family: 'Arial', sans-serif; line-height: 1.6; }
        .hero { background: linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.5)), url('https://via.placeholder.com/1200x600/8B4513/ffffff?text=Restaurant') center/cover; color: white; padding: 6rem 2rem; text-align: center; }
        .hero h1 { font-size: 3rem; margin-bottom: 1rem; }
        .hero p { font-size: 1.2rem; margin-bottom: 2rem; }
        .btn { background: #d4af37; color: white; padding: 0.75rem 2rem; border: none; border-radius: 5px; cursor: pointer; font-weight: bold; }
        .menu { padding: 4rem 2rem; background: #f8f9fa; }
        .menu h2 { text-align: center; margin-bottom: 3rem; font-size: 2.5rem; color: #333; }
        .menu-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 2rem; max-width: 1200px; margin: 0 auto; }
        .menu-item { background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }
        .menu-item h3 { color: #8B4513; margin-bottom: 0.5rem; }
        .price { color: #d4af37; font-weight: bold; font-size: 1.2rem; }
    </style>
</head>
<body>
    <section class="hero">
        <h1>Bella Vista Restaurant</h1>
        <p>Authentic Italian Cuisine in the Heart of the City</p>
        <button class="btn">View Menu</button>
    </section>
    
    <section class="menu">
        <h2>Our Menu</h2>
        <div class="menu-grid">
            <div class="menu-item">
                <h3>Margherita Pizza</h3>
                <p>Fresh tomatoes, mozzarella, basil, and olive oil on our house-made crust</p>
                <div class="price">$16.99</div>
            </div>
            <div class="menu-item">
                <h3>Pasta Carbonara</h3>
                <p>Creamy pasta with pancetta, eggs, and freshly grated Parmesan cheese</p>
                <div class="price">$18.99</div>
            </div>
            <div class="menu-item">
                <h3>Chicken Parmigiana</h3>
                <p>Breaded chicken breast topped with marinara sauce and melted mozzarella</p>
                <div class="price">$22.99</div>
            </div>
            <div class="menu-item">
                <h3>Tiramisu</h3>
                <p>Traditional Italian dessert with coffee-soaked ladyfingers and mascarpone</p>
                <div class="price">$8.99</div>
            </div>
        </div>
    </section>
</body>
</html>`
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-4 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <h3 className="text-lg font-semibold text-slate-800">Project Templates</h3>
        <p className="text-sm text-slate-600 mt-1">Start with a pre-built template</p>
      </div>
      
      <ScrollArea className="flex-1 p-4">
        <div className="grid grid-cols-1 gap-4">
          {templates.map((template, index) => (
            <Card key={index} className="p-4 hover:shadow-lg transition-shadow cursor-pointer" onClick={() => onSelectTemplate(template.code)}>
              <div className="flex items-start gap-3">
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-blue-600">
                  {template.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-slate-800 mb-1">{template.name}</h4>
                  <p className="text-sm text-slate-600 mb-3">{template.description}</p>
                  <Button size="sm" className="w-full">
                    Use Template
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ProjectTemplates;
