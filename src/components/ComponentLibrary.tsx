
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Card } from '@/components/ui/card';
import { 
  Layout, Type, Image, List, Table, Quote, 
  CreditCard, Navigation, Star, Calendar
} from 'lucide-react';

interface ComponentLibraryProps {
  onInsertComponent: (code: string) => void;
}

const ComponentLibrary = ({ onInsertComponent }: ComponentLibraryProps) => {
  const components = [
    {
      name: 'Hero Section',
      icon: <Layout className="w-4 h-4" />,
      code: `<section class="hero" style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 2rem; text-align: center; color: white;">
  <h1 style="font-size: 3rem; margin-bottom: 1rem;">Welcome to Our Website</h1>
  <p style="font-size: 1.2rem; margin-bottom: 2rem;">Discover amazing features and services</p>
  <button style="background: white; color: #667eea; padding: 0.75rem 2rem; border: none; border-radius: 25px; font-weight: bold; cursor: pointer;">Get Started</button>
</section>`
    },
    {
      name: 'Card Component',
      icon: <CreditCard className="w-4 h-4" />,
      code: `<div class="card" style="background: white; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); padding: 1.5rem; margin: 1rem 0;">
  <h3 style="margin-top: 0; color: #333;">Card Title</h3>
  <p style="color: #666; line-height: 1.6;">This is a sample card component with some content. You can customize it as needed.</p>
  <button style="background: #4299e1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Learn More</button>
</div>`
    },
    {
      name: 'Navigation Bar',
      icon: <Navigation className="w-4 h-4" />,
      code: `<nav style="background: #2d3748; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center;">
  <div style="color: white; font-size: 1.5rem; font-weight: bold;">Brand</div>
  <ul style="display: flex; list-style: none; margin: 0; padding: 0; gap: 2rem;">
    <li><a href="#" style="color: white; text-decoration: none;">Home</a></li>
    <li><a href="#" style="color: white; text-decoration: none;">About</a></li>
    <li><a href="#" style="color: white; text-decoration: none;">Services</a></li>
    <li><a href="#" style="color: white; text-decoration: none;">Contact</a></li>
  </ul>
</nav>`
    },
    {
      name: 'Feature Grid',
      icon: <Layout className="w-4 h-4" />,
      code: `<div class="features" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; padding: 2rem;">
  <div style="text-align: center; padding: 1.5rem;">
    <div style="background: #4299e1; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">1</div>
    <h3>Feature One</h3>
    <p>Description of the first feature</p>
  </div>
  <div style="text-align: center; padding: 1.5rem;">
    <div style="background: #48bb78; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">2</div>
    <h3>Feature Two</h3>
    <p>Description of the second feature</p>
  </div>
  <div style="text-align: center; padding: 1.5rem;">
    <div style="background: #ed8936; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem;">3</div>
    <h3>Feature Three</h3>
    <p>Description of the third feature</p>
  </div>
</div>`
    },
    {
      name: 'Testimonial',
      icon: <Quote className="w-4 h-4" />,
      code: `<div class="testimonial" style="background: #f7fafc; padding: 2rem; border-radius: 8px; margin: 2rem 0; border-left: 4px solid #4299e1;">
  <blockquote style="font-size: 1.1rem; font-style: italic; margin: 0 0 1rem 0; color: #2d3748;">
    "This is an amazing product that has really helped our business grow. I highly recommend it to anyone looking for a solution."
  </blockquote>
  <div style="display: flex; align-items: center; gap: 1rem;">
    <div style="width: 50px; height: 50px; background: #4299e1; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">JD</div>
    <div>
      <div style="font-weight: bold; color: #2d3748;">John Doe</div>
      <div style="color: #718096; font-size: 0.9rem;">CEO, Company Inc.</div>
    </div>
  </div>
</div>`
    },
    {
      name: 'Contact Form',
      icon: <Type className="w-4 h-4" />,
      code: `<form class="contact-form" style="background: white; padding: 2rem; border-radius: 8px; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 500px; margin: 2rem auto;">
  <h2 style="margin-top: 0; text-align: center; color: #2d3748;">Contact Us</h2>
  <div style="margin-bottom: 1rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Name</label>
    <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 1rem;" placeholder="Your Name">
  </div>
  <div style="margin-bottom: 1rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Email</label>
    <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 1rem;" placeholder="your@email.com">
  </div>
  <div style="margin-bottom: 1.5rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Message</label>
    <textarea style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 4px; font-size: 1rem; height: 100px; resize: vertical;" placeholder="Your message..."></textarea>
  </div>
  <button type="submit" style="width: 100%; background: #4299e1; color: white; padding: 0.75rem; border: none; border-radius: 4px; font-size: 1rem; cursor: pointer;">Send Message</button>
</form>`
    },
    {
      name: 'Image Gallery',
      icon: <Image className="w-4 h-4" />,
      code: `<div class="gallery" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; padding: 2rem 0;">
  <div style="position: relative; overflow: hidden; border-radius: 8px; aspect-ratio: 1;">
    <img src="https://via.placeholder.com/300x300/4299e1/ffffff?text=Image+1" alt="Gallery Image 1" style="width: 100%; height: 100%; object-fit: cover;">
  </div>
  <div style="position: relative; overflow: hidden; border-radius: 8px; aspect-ratio: 1;">
    <img src="https://via.placeholder.com/300x300/48bb78/ffffff?text=Image+2" alt="Gallery Image 2" style="width: 100%; height: 100%; object-fit: cover;">
  </div>
  <div style="position: relative; overflow: hidden; border-radius: 8px; aspect-ratio: 1;">
    <img src="https://via.placeholder.com/300x300/ed8936/ffffff?text=Image+3" alt="Gallery Image 3" style="width: 100%; height: 100%; object-fit: cover;">
  </div>
  <div style="position: relative; overflow: hidden; border-radius: 8px; aspect-ratio: 1;">
    <img src="https://via.placeholder.com/300x300/9f7aea/ffffff?text=Image+4" alt="Gallery Image 4" style="width: 100%; height: 100%; object-fit: cover;">
  </div>
</div>`
    },
    {
      name: 'Footer',
      icon: <Layout className="w-4 h-4" />,
      code: `<footer style="background: #2d3748; color: white; padding: 3rem 2rem 1rem;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
    <div>
      <h3 style="margin-top: 0;">Company</h3>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">About Us</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Our Team</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Careers</a></li>
      </ul>
    </div>
    <div>
      <h3 style="margin-top: 0;">Services</h3>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Web Design</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Development</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Consulting</a></li>
      </ul>
    </div>
    <div>
      <h3 style="margin-top: 0;">Contact</h3>
      <p style="color: #a0aec0; margin: 0.5rem 0;">Email: info@company.com</p>
      <p style="color: #a0aec0; margin: 0.5rem 0;">Phone: (555) 123-4567</p>
    </div>
  </div>
  <div style="border-top: 1px solid #4a5568; padding-top: 1rem; text-align: center; color: #a0aec0;">
    © 2024 Company Name. All rights reserved.
  </div>
</footer>`
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <h3 className="text-sm font-semibold text-slate-800">Component Library</h3>
        <p className="text-xs text-slate-600 mt-1">Click to insert pre-built components</p>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="grid grid-cols-2 gap-2">
          {components.map((component, index) => (
            <Button
              key={index}
              onClick={() => onInsertComponent(component.code)}
              variant="outline"
              size="sm"
              className="h-auto p-3 flex flex-col items-center text-center hover:bg-blue-50"
            >
              {component.icon}
              <span className="text-xs mt-1">{component.name}</span>
            </Button>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
};

export default ComponentLibrary;
