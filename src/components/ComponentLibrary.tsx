
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
      name: 'Hero Minimal',
      icon: <Layout className="w-4 h-4" />,
      code: `<section style="padding: 6rem 2rem; text-align: center; background: #f8fafc;">
  <h1 style="font-size: 2.5rem; margin-bottom: 1rem; color: #1a202c;">Clean & Simple</h1>
  <p style="font-size: 1.1rem; color: #4a5568; max-width: 600px; margin: 0 auto 2rem;">A minimalist approach to modern web design</p>
  <button style="background: #2d3748; color: white; padding: 0.75rem 1.5rem; border: none; border-radius: 4px; cursor: pointer;">Learn More</button>
</section>`
    },
    {
      name: 'Hero Video',
      icon: <Layout className="w-4 h-4" />,
      code: `<section style="position: relative; height: 60vh; display: flex; align-items: center; justify-content: center; color: white; text-align: center; background: url('https://via.placeholder.com/1920x1080/2a2a2a/ffffff?text=Video+Background') center/cover;">
  <div style="background: rgba(0,0,0,0.4); padding: 3rem; border-radius: 8px;">
    <h1 style="font-size: 3rem; margin-bottom: 1rem;">Experience Innovation</h1>
    <p style="font-size: 1.2rem; margin-bottom: 2rem;">Where technology meets creativity</p>
    <button style="background: #e53e3e; color: white; padding: 1rem 2rem; border: none; border-radius: 25px; font-weight: bold; cursor: pointer;">Watch Video</button>
  </div>
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
    },
    {
      name: 'Product Card',
      icon: <CreditCard className="w-4 h-4" />,
      code: `<div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; max-width: 300px;">
  <img src="https://via.placeholder.com/300x200/4299e1/ffffff?text=Product" alt="Product" style="width: 100%; height: 200px; object-fit: cover;">
  <div style="padding: 1.5rem;">
    <h3 style="margin: 0 0 0.5rem 0; color: #2d3748;">Premium Product</h3>
    <p style="color: #718096; margin: 0 0 1rem 0; font-size: 0.9rem;">High-quality product with amazing features</p>
    <div style="display: flex; align-items: center; justify-content: space-between;">
      <span style="font-size: 1.25rem; font-weight: bold; color: #2d3748;">$99.99</span>
      <button style="background: #4299e1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 6px; cursor: pointer;">Add to Cart</button>
    </div>
  </div>
</div>`
    },
    {
      name: 'Pricing Card',
      icon: <CreditCard className="w-4 h-4" />,
      code: `<div style="background: white; border: 2px solid #e2e8f0; border-radius: 8px; padding: 2rem; text-align: center; max-width: 300px; position: relative;">
  <div style="background: #4299e1; color: white; padding: 0.25rem 1rem; border-radius: 12px; font-size: 0.8rem; position: absolute; top: -10px; left: 50%; transform: translateX(-50%);">Popular</div>
  <h3 style="margin: 1rem 0 0.5rem 0; color: #2d3748;">Pro Plan</h3>
  <div style="font-size: 2.5rem; font-weight: bold; color: #2d3748; margin: 1rem 0;">$29<span style="font-size: 1rem; color: #718096;">/month</span></div>
  <ul style="list-style: none; padding: 0; margin: 1.5rem 0;">
    <li style="padding: 0.5rem 0; color: #4a5568;">✓ Unlimited projects</li>
    <li style="padding: 0.5rem 0; color: #4a5568;">✓ 24/7 support</li>
    <li style="padding: 0.5rem 0; color: #4a5568;">✓ Advanced features</li>
  </ul>
  <button style="width: 100%; background: #4299e1; color: white; border: none; padding: 0.75rem; border-radius: 6px; font-weight: bold; cursor: pointer;">Get Started</button>
</div>`
    },
    {
      name: 'Team Member',
      icon: <CreditCard className="w-4 h-4" />,
      code: `<div style="background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; text-align: center; max-width: 250px;">
  <img src="https://via.placeholder.com/250x250/48bb78/ffffff?text=JD" alt="Team Member" style="width: 100%; height: 250px; object-fit: cover;">
  <div style="padding: 1.5rem;">
    <h3 style="margin: 0 0 0.5rem 0; color: #2d3748;">John Doe</h3>
    <p style="color: #718096; margin: 0 0 1rem 0;">Frontend Developer</p>
    <div style="display: flex; justify-content: center; gap: 0.5rem;">
      <a href="#" style="color: #4299e1; text-decoration: none;">LinkedIn</a>
      <a href="#" style="color: #4299e1; text-decoration: none;">Twitter</a>
    </div>
  </div>
</div>`
    },
    {
      name: 'Blog Post Card',
      icon: <CreditCard className="w-4 h-4" />,
      code: `<article style="background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); overflow: hidden; max-width: 350px;">
  <img src="https://via.placeholder.com/350x200/ed8936/ffffff?text=Blog+Post" alt="Blog Post" style="width: 100%; height: 200px; object-fit: cover;">
  <div style="padding: 1.5rem;">
    <div style="color: #4299e1; font-size: 0.8rem; margin-bottom: 0.5rem;">TECHNOLOGY</div>
    <h3 style="margin: 0 0 0.5rem 0; color: #2d3748;">The Future of Web Development</h3>
    <p style="color: #718096; margin: 0 0 1rem 0; font-size: 0.9rem;">Exploring the latest trends and technologies shaping the future of web development...</p>
    <div style="display: flex; align-items: center; justify-content: space-between; font-size: 0.8rem; color: #a0aec0;">
      <span>Dec 15, 2024</span>
      <span>5 min read</span>
    </div>
  </div>
</article>`
    },
    {
      name: 'Newsletter Signup',
      icon: <Type className="w-4 h-4" />,
      code: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; padding: 3rem 2rem; border-radius: 8px; text-align: center; max-width: 500px; margin: 2rem auto;">
  <h3 style="margin: 0 0 1rem 0; font-size: 1.5rem;">Stay Updated</h3>
  <p style="margin: 0 0 2rem 0; opacity: 0.9;">Get the latest news and updates delivered to your inbox.</p>
  <div style="display: flex; gap: 0.5rem; max-width: 400px; margin: 0 auto;">
    <input type="email" placeholder="Enter your email" style="flex: 1; padding: 0.75rem; border: none; border-radius: 4px; font-size: 1rem;">
    <button style="background: white; color: #667eea; border: none; padding: 0.75rem 1.5rem; border-radius: 4px; font-weight: bold; cursor: pointer;">Subscribe</button>
  </div>
</div>`
    },
    {
      name: 'Feature Highlight',
      icon: <Star className="w-4 h-4" />,
      code: `<div style="display: flex; align-items: center; gap: 2rem; padding: 2rem; background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1);">
  <div style="background: #4299e1; color: white; width: 80px; height: 80px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 2rem; flex-shrink: 0;">★</div>
  <div>
    <h3 style="margin: 0 0 0.5rem 0; color: #2d3748;">Premium Feature</h3>
    <p style="margin: 0; color: #718096;">Experience the best with our premium feature set designed for professionals.</p>
  </div>
</div>`
    },
    {
      name: 'Stats Section',
      icon: <Layout className="w-4 h-4" />,
      code: `<section style="background: #2d3748; color: white; padding: 4rem 2rem;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 2rem; text-align: center;">
    <div>
      <div style="font-size: 3rem; font-weight: bold; color: #4299e1;">1000+</div>
      <div style="margin-top: 0.5rem; color: #a0aec0;">Happy Customers</div>
    </div>
    <div>
      <div style="font-size: 3rem; font-weight: bold; color: #48bb78;">50+</div>
      <div style="margin-top: 0.5rem; color: #a0aec0;">Projects Completed</div>
    </div>
    <div>
      <div style="font-size: 3rem; font-weight: bold; color: #ed8936;">24/7</div>
      <div style="margin-top: 0.5rem; color: #a0aec0;">Support Available</div>
    </div>
    <div>
      <div style="font-size: 3rem; font-weight: bold; color: #9f7aea;">99%</div>
      <div style="margin-top: 0.5rem; color: #a0aec0;">Satisfaction Rate</div>
    </div>
  </div>
</section>`
    },
    {
      name: 'Call to Action',
      icon: <Layout className="w-4 h-4" />,
      code: `<section style="background: linear-gradient(45deg, #4299e1, #667eea); color: white; padding: 4rem 2rem; text-align: center;">
  <h2 style="margin: 0 0 1rem 0; font-size: 2.5rem;">Ready to Get Started?</h2>
  <p style="margin: 0 0 2rem 0; font-size: 1.2rem; opacity: 0.9; max-width: 600px; margin-left: auto; margin-right: auto;">Join thousands of satisfied customers and transform your business today.</p>
  <div style="display: flex; gap: 1rem; justify-content: center; flex-wrap: wrap;">
    <button style="background: white; color: #4299e1; border: none; padding: 1rem 2rem; border-radius: 25px; font-weight: bold; cursor: pointer;">Start Free Trial</button>
    <button style="background: transparent; color: white; border: 2px solid white; padding: 1rem 2rem; border-radius: 25px; font-weight: bold; cursor: pointer;">Learn More</button>
  </div>
</section>`
    },
    {
      name: 'FAQ Item',
      icon: <List className="w-4 h-4" />,
      code: `<div style="border: 1px solid #e2e8f0; border-radius: 8px; margin-bottom: 1rem;">
  <div style="padding: 1.5rem; background: #f7fafc; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
    <h4 style="margin: 0; color: #2d3748;">What is included in the basic plan?</h4>
    <span style="color: #4299e1; font-size: 1.5rem;">+</span>
  </div>
  <div style="padding: 1.5rem; color: #718096; border-top: 1px solid #e2e8f0;">
    The basic plan includes access to all core features, 24/7 customer support, and monthly updates. Perfect for individuals and small teams getting started.
  </div>
</div>`
    },
    {
      name: 'Progress Bar',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="margin: 1rem 0;">
  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
    <span style="color: #2d3748; font-weight: 500;">Project Progress</span>
    <span style="color: #718096;">75%</span>
  </div>
  <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
    <div style="background: linear-gradient(90deg, #4299e1, #667eea); height: 100%; width: 75%; transition: width 0.3s ease;"></div>
  </div>
</div>`
    },
    {
      name: 'Alert Success',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="background: #f0fff4; border: 1px solid #9ae6b4; color: #22543d; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
  <div style="display: flex; align-items: center; gap: 0.5rem;">
    <span style="color: #38a169; font-weight: bold;">✓</span>
    <strong>Success!</strong> Your changes have been saved successfully.
  </div>
</div>`
    },
    {
      name: 'Alert Warning',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="background: #fffbf0; border: 1px solid #fbd38d; color: #744210; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
  <div style="display: flex; align-items: center; gap: 0.5rem;">
    <span style="color: #ed8936; font-weight: bold;">⚠</span>
    <strong>Warning!</strong> Please review your information before proceeding.
  </div>
</div>`
    },
    {
      name: 'Alert Error',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="background: #fff5f5; border: 1px solid #feb2b2; color: #742a2a; padding: 1rem; border-radius: 8px; margin: 1rem 0;">
  <div style="display: flex; align-items: center; gap: 0.5rem;">
    <span style="color: #e53e3e; font-weight: bold;">✕</span>
    <strong>Error!</strong> Something went wrong. Please try again.
  </div>
</div>`
    },
    {
      name: 'Badge',
      icon: <Layout className="w-4 h-4" />,
      code: `<span style="background: #4299e1; color: white; padding: 0.25rem 0.75rem; border-radius: 12px; font-size: 0.8rem; font-weight: 500;">New</span>`
    },
    {
      name: 'Tag',
      icon: <Layout className="w-4 h-4" />,
      code: `<span style="background: #edf2f7; color: #4a5568; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">JavaScript</span>`
    },
    {
      name: 'Breadcrumb',
      icon: <Navigation className="w-4 h-4" />,
      code: `<nav style="padding: 1rem 0;">
  <ol style="display: flex; list-style: none; padding: 0; margin: 0; font-size: 0.9rem;">
    <li><a href="#" style="color: #4299e1; text-decoration: none;">Home</a></li>
    <li style="margin: 0 0.5rem; color: #a0aec0;">/</li>
    <li><a href="#" style="color: #4299e1; text-decoration: none;">Products</a></li>
    <li style="margin: 0 0.5rem; color: #a0aec0;">/</li>
    <li style="color: #718096;">Current Page</li>
  </ol>
</nav>`
    },
    {
      name: 'Pagination',
      icon: <Navigation className="w-4 h-4" />,
      code: `<nav style="display: flex; justify-content: center; align-items: center; gap: 0.5rem; margin: 2rem 0;">
  <button style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0; background: white; border-radius: 4px; cursor: pointer;">Previous</button>
  <button style="padding: 0.5rem 0.75rem; border: 1px solid #4299e1; background: #4299e1; color: white; border-radius: 4px; cursor: pointer;">1</button>
  <button style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0; background: white; border-radius: 4px; cursor: pointer;">2</button>
  <button style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0; background: white; border-radius: 4px; cursor: pointer;">3</button>
  <button style="padding: 0.5rem 0.75rem; border: 1px solid #e2e8f0; background: white; border-radius: 4px; cursor: pointer;">Next</button>
</nav>`
    },
    {
      name: 'Search Bar',
      icon: <Type className="w-4 h-4" />,
      code: `<div style="position: relative; max-width: 400px; margin: 1rem 0;">
  <input type="text" placeholder="Search..." style="width: 100%; padding: 0.75rem 2.5rem 0.75rem 1rem; border: 1px solid #e2e8f0; border-radius: 25px; font-size: 1rem; outline: none;">
  <button style="position: absolute; right: 0.5rem; top: 50%; transform: translateY(-50%); background: #4299e1; color: white; border: none; width: 2rem; height: 2rem; border-radius: 50%; cursor: pointer;">🔍</button>
</div>`
    },
    {
      name: 'Social Links',
      icon: <Navigation className="w-4 h-4" />,
      code: `<div style="display: flex; gap: 1rem; justify-content: center; margin: 2rem 0;">
  <a href="#" style="background: #1da1f2; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">T</a>
  <a href="#" style="background: #4267b2; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">F</a>
  <a href="#" style="background: #e4405f; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">I</a>
  <a href="#" style="background: #0077b5; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; text-decoration: none;">L</a>
</div>`
    },
    {
      name: 'Modal',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
  <div style="background: white; border-radius: 8px; padding: 2rem; max-width: 400px; width: 90%; position: relative;">
    <button style="position: absolute; top: 1rem; right: 1rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;">×</button>
    <h3 style="margin: 0 0 1rem 0; color: #2d3748;">Confirm Action</h3>
    <p style="color: #718096; margin: 0 0 2rem 0;">Are you sure you want to proceed with this action?</p>
    <div style="display: flex; gap: 1rem; justify-content: flex-end;">
      <button style="background: #e2e8f0; color: #4a5568; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Cancel</button>
      <button style="background: #e53e3e; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Confirm</button>
    </div>
  </div>
</div>`
    },
    {
      name: 'Tooltip',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="position: relative; display: inline-block;">
  <button style="background: #4299e1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Hover me</button>
  <div style="position: absolute; bottom: 100%; left: 50%; transform: translateX(-50%); background: #2d3748; color: white; padding: 0.5rem 0.75rem; border-radius: 4px; font-size: 0.8rem; white-space: nowrap; margin-bottom: 0.5rem; opacity: 0; pointer-events: none; transition: opacity 0.3s;">
    This is a tooltip
    <div style="position: absolute; top: 100%; left: 50%; transform: translateX(-50%); border-left: 5px solid transparent; border-right: 5px solid transparent; border-top: 5px solid #2d3748;"></div>
  </div>
</div>`
    },
    {
      name: 'Accordion',
      icon: <List className="w-4 h-4" />,
      code: `<div style="border: 1px solid #e2e8f0; border-radius: 8px;">
  <div style="padding: 1rem; background: #f7fafc; border-bottom: 1px solid #e2e8f0; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
    <span style="font-weight: 500; color: #2d3748;">Section 1</span>
    <span style="color: #4299e1;">▼</span>
  </div>
  <div style="padding: 1rem; color: #718096;">Content for section 1 goes here.</div>
  
  <div style="padding: 1rem; background: #f7fafc; border-bottom: 1px solid #e2e8f0; cursor: pointer; display: flex; justify-content: space-between; align-items: center;">
    <span style="font-weight: 500; color: #2d3748;">Section 2</span>
    <span style="color: #4299e1;">▶</span>
  </div>
</div>`
    },
    {
      name: 'Tabs',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="margin: 2rem 0;">
  <div style="display: flex; border-bottom: 1px solid #e2e8f0;">
    <button style="padding: 0.75rem 1.5rem; border: none; background: none; color: #4299e1; border-bottom: 2px solid #4299e1; cursor: pointer;">Tab 1</button>
    <button style="padding: 0.75rem 1.5rem; border: none; background: none; color: #718096; cursor: pointer;">Tab 2</button>
    <button style="padding: 0.75rem 1.5rem; border: none; background: none; color: #718096; cursor: pointer;">Tab 3</button>
  </div>
  <div style="padding: 2rem 0;">
    <h3 style="margin: 0 0 1rem 0; color: #2d3748;">Tab 1 Content</h3>
    <p style="color: #718096; margin: 0;">This is the content for the first tab. You can add any content here.</p>
  </div>
</div>`
    },
    {
      name: 'Sidebar',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="display: flex; min-height: 400px;">
  <aside style="width: 250px; background: #2d3748; color: white; padding: 1.5rem;">
    <h3 style="margin: 0 0 1.5rem 0;">Navigation</h3>
    <nav>
      <ul style="list-style: none; padding: 0; margin: 0;">
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: white; text-decoration: none; display: block; padding: 0.5rem 0;">Dashboard</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none; display: block; padding: 0.5rem 0;">Analytics</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none; display: block; padding: 0.5rem 0;">Settings</a></li>
      </ul>
    </nav>
  </aside>
  <main style="flex: 1; padding: 1.5rem; background: #f7fafc;">
    <h2 style="margin: 0 0 1rem 0; color: #2d3748;">Main Content</h2>
    <p style="color: #718096;">This is the main content area.</p>
  </main>
</div>`
    },
    {
      name: 'Timeline',
      icon: <List className="w-4 h-4" />,
      code: `<div style="position: relative; padding-left: 2rem; margin: 2rem 0;">
  <div style="position: absolute; left: 0.75rem; top: 0; bottom: 0; width: 2px; background: #e2e8f0;"></div>
  
  <div style="position: relative; margin-bottom: 2rem;">
    <div style="position: absolute; left: -1.75rem; top: 0.5rem; width: 12px; height: 12px; background: #4299e1; border-radius: 50%;"></div>
    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2d3748;">Project Started</h4>
      <p style="margin: 0; color: #718096; font-size: 0.9rem;">Initial project setup and planning phase</p>
      <small style="color: #a0aec0;">Jan 15, 2024</small>
    </div>
  </div>
  
  <div style="position: relative;">
    <div style="position: absolute; left: -1.75rem; top: 0.5rem; width: 12px; height: 12px; background: #48bb78; border-radius: 50%;"></div>
    <div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem;">
      <h4 style="margin: 0 0 0.5rem 0; color: #2d3748;">Development Complete</h4>
      <p style="margin: 0; color: #718096; font-size: 0.9rem;">All features implemented and tested</p>
      <small style="color: #a0aec0;">Mar 20, 2024</small>
    </div>
  </div>
</div>`
    },
    {
      name: 'Profile Card',
      icon: <CreditCard className="w-4 h-4" />,
      code: `<div style="background: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); overflow: hidden; max-width: 300px; text-align: center;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); height: 80px; position: relative;">
    <img src="https://via.placeholder.com/80x80/ffffff/4299e1?text=JD" alt="Profile" style="width: 80px; height: 80px; border-radius: 50%; border: 4px solid white; position: absolute; bottom: -40px; left: 50%; transform: translateX(-50%);">
  </div>
  <div style="padding: 3rem 1.5rem 1.5rem;">
    <h3 style="margin: 0 0 0.5rem 0; color: #2d3748;">John Doe</h3>
    <p style="color: #718096; margin: 0 0 1rem 0;">Senior Developer</p>
    <p style="color: #a0aec0; font-size: 0.9rem; margin: 0 0 1.5rem 0;">Building amazing web experiences with modern technologies.</p>
    <button style="background: #4299e1; color: white; border: none; padding: 0.5rem 1.5rem; border-radius: 20px; cursor: pointer;">Follow</button>
  </div>
</div>`
    },
    {
      name: 'Login Form',
      icon: <Type className="w-4 h-4" />,
      code: `<form style="background: white; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 2rem; max-width: 400px; margin: 2rem auto;">
  <h2 style="margin: 0 0 1.5rem 0; text-align: center; color: #2d3748;">Sign In</h2>
  <div style="margin-bottom: 1rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: 500;">Email</label>
    <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 1rem;" placeholder="your@email.com">
  </div>
  <div style="margin-bottom: 1.5rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: 500;">Password</label>
    <input type="password" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 6px; font-size: 1rem;" placeholder="••••••••">
  </div>
  <button type="submit" style="width: 100%; background: #4299e1; color: white; border: none; padding: 0.75rem; border-radius: 6px; font-size: 1rem; font-weight: 500; cursor: pointer; margin-bottom: 1rem;">Sign In</button>
  <p style="text-align: center; margin: 0; color: #718096; font-size: 0.9rem;">Don't have an account? <a href="#" style="color: #4299e1; text-decoration: none;">Sign up</a></p>
</form>`
    },
    {
      name: 'Dashboard Card',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="background: white; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); padding: 1.5rem;">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 1rem;">
    <h3 style="margin: 0; color: #2d3748;">Total Sales</h3>
    <span style="background: #f0fff4; color: #22543d; padding: 0.25rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">+12%</span>
  </div>
  <div style="font-size: 2rem; font-weight: bold; color: #2d3748; margin-bottom: 0.5rem;">$24,780</div>
  <p style="color: #718096; margin: 0; font-size: 0.9rem;">Compared to last month</p>
</div>`
    },
    {
      name: 'Kanban Card',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="background: white; border: 1px solid #e2e8f0; border-radius: 6px; padding: 1rem; margin-bottom: 0.5rem; cursor: pointer;">
  <div style="display: flex; align-items: center; justify-content: space-between; margin-bottom: 0.5rem;">
    <span style="background: #e2e8f0; color: #4a5568; padding: 0.125rem 0.5rem; border-radius: 12px; font-size: 0.7rem;">TASK</span>
    <span style="color: #a0aec0; font-size: 0.8rem;">HIGH</span>
  </div>
  <h4 style="margin: 0 0 0.5rem 0; color: #2d3748; font-size: 0.9rem;">Update user interface</h4>
  <p style="color: #718096; margin: 0 0 1rem 0; font-size: 0.8rem;">Redesign the dashboard layout for better UX</p>
  <div style="display: flex; align-items: center; justify-content: space-between;">
    <div style="display: flex; gap: 0.25rem;">
      <img src="https://via.placeholder.com/24x24/4299e1/ffffff?text=J" alt="Assignee" style="width: 24px; height: 24px; border-radius: 50%;">
      <img src="https://via.placeholder.com/24x24/48bb78/ffffff?text=S" alt="Assignee" style="width: 24px; height: 24px; border-radius: 50%;">
    </div>
    <span style="color: #a0aec0; font-size: 0.8rem;">Due: Mar 15</span>
  </div>
</div>`
    },
    {
      name: 'Weather Card',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="background: linear-gradient(135deg, #74b9ff 0%, #0984e3 100%); color: white; border-radius: 12px; padding: 2rem; text-align: center; max-width: 250px;">
  <div style="font-size: 3rem; margin-bottom: 0.5rem;">☀️</div>
  <h3 style="margin: 0 0 0.5rem 0;">New York</h3>
  <div style="font-size: 2.5rem; font-weight: bold; margin-bottom: 0.5rem;">72°F</div>
  <p style="margin: 0 0 1rem 0; opacity: 0.9;">Sunny</p>
  <div style="display: flex; justify-content: space-between; font-size: 0.9rem; opacity: 0.8;">
    <span>H: 78°</span>
    <span>L: 65°</span>
  </div>
</div>`
    },
    {
      name: 'Music Player',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="background: #2d3748; color: white; border-radius: 12px; padding: 1.5rem; max-width: 300px;">
  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
    <img src="https://via.placeholder.com/60x60/4299e1/ffffff?text=♪" alt="Album" style="width: 60px; height: 60px; border-radius: 8px;">
    <div>
      <h4 style="margin: 0 0 0.25rem 0;">Song Title</h4>
      <p style="margin: 0; color: #a0aec0; font-size: 0.9rem;">Artist Name</p>
    </div>
  </div>
  <div style="background: #4a5568; height: 4px; border-radius: 2px; margin-bottom: 1rem; overflow: hidden;">
    <div style="background: #4299e1; height: 100%; width: 60%;"></div>
  </div>
  <div style="display: flex; justify-content: center; align-items: center; gap: 1rem;">
    <button style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">⏮</button>
    <button style="background: #4299e1; border: none; color: white; width: 40px; height: 40px; border-radius: 50%; font-size: 1.2rem; cursor: pointer;">⏸</button>
    <button style="background: none; border: none; color: white; font-size: 1.2rem; cursor: pointer;">⏭</button>
  </div>
</div>`
    },
    {
      name: 'Chat Bubble',
      icon: <Quote className="w-4 h-4" />,
      code: `<div style="max-width: 70%; margin-bottom: 1rem;">
  <div style="background: #4299e1; color: white; padding: 0.75rem 1rem; border-radius: 18px 18px 4px 18px; margin-bottom: 0.25rem;">
    Hey! How are you doing today?
  </div>
  <div style="font-size: 0.8rem; color: #a0aec0; text-align: right;">2:30 PM</div>
</div>
<div style="max-width: 70%; margin-bottom: 1rem; margin-left: auto;">
  <div style="background: #e2e8f0; color: #2d3748; padding: 0.75rem 1rem; border-radius: 18px 18px 18px 4px; margin-bottom: 0.25rem;">
    I'm doing great! Thanks for asking. How about you?
  </div>
  <div style="font-size: 0.8rem; color: #a0aec0;">2:32 PM</div>
</div>`
    },
    {
      name: 'Calendar Widget',
      icon: <Calendar className="w-4 h-4" />,
      code: `<div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; max-width: 300px;">
  <div style="background: #4299e1; color: white; padding: 1rem; text-align: center;">
    <h3 style="margin: 0 0 0.5rem 0;">December 2024</h3>
    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; font-size: 0.8rem;">
      <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
    </div>
  </div>
  <div style="padding: 1rem;">
    <div style="display: grid; grid-template-columns: repeat(7, 1fr); gap: 0.25rem; text-align: center; font-size: 0.9rem;">
      <div style="color: #a0aec0;">29</div><div style="color: #a0aec0;">30</div><div>1</div><div>2</div><div>3</div><div>4</div><div>5</div>
      <div>6</div><div>7</div><div>8</div><div>9</div><div>10</div><div>11</div><div>12</div>
      <div>13</div><div>14</div><div style="background: #4299e1; color: white; border-radius: 50%; width: 2rem; height: 2rem; display: flex; align-items: center; justify-content: center;">15</div><div>16</div><div>17</div><div>18</div><div>19</div>
    </div>
  </div>
</div>`
    },
    {
      name: 'Notification',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1); padding: 1rem; max-width: 350px; position: relative;">
  <button style="position: absolute; top: 0.5rem; right: 0.5rem; background: none; border: none; color: #a0aec0; cursor: pointer;">×</button>
  <div style="display: flex; align-items: start; gap: 0.75rem;">
    <div style="background: #4299e1; color: white; width: 40px; height: 40px; border-radius: 50%; display: flex; align-items: center; justify-content: center; flex-shrink: 0;">!</div>
    <div>
      <h4 style="margin: 0 0 0.25rem 0; color: #2d3748;">New Update Available</h4>
      <p style="margin: 0 0 0.5rem 0; color: #718096; font-size: 0.9rem;">Version 2.1.0 is now available with new features and bug fixes.</p>
      <div style="display: flex; gap: 0.5rem;">
        <button style="background: #4299e1; color: white; border: none; padding: 0.25rem 0.75rem; border-radius: 4px; font-size: 0.8rem; cursor: pointer;">Update</button>
        <button style="background: none; border: none; color: #718096; font-size: 0.8rem; cursor: pointer;">Later</button>
      </div>
    </div>
  </div>
</div>`
    },
    {
      name: 'Loading Spinner',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; padding: 2rem;">
  <div style="width: 40px; height: 40px; border: 4px solid #e2e8f0; border-top: 4px solid #4299e1; border-radius: 50%; animation: spin 1s linear infinite;"></div>
  <p style="margin: 1rem 0 0 0; color: #718096;">Loading...</p>
</div>
<style>
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>`
    },
    {
      name: 'File Upload',
      icon: <Type className="w-4 h-4" />,
      code: `<div style="border: 2px dashed #cbd5e0; border-radius: 8px; padding: 2rem; text-align: center; cursor: pointer; transition: border-color 0.3s; background: #f7fafc;">
  <div style="color: #4299e1; font-size: 3rem; margin-bottom: 1rem;">📁</div>
  <h3 style="margin: 0 0 0.5rem 0; color: #2d3748;">Drop files here</h3>
  <p style="margin: 0 0 1rem 0; color: #718096;">or click to browse</p>
  <button style="background: #4299e1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 4px; cursor: pointer;">Choose Files</button>
  <p style="margin: 1rem 0 0 0; font-size: 0.8rem; color: #a0aec0;">Supports: JPG, PNG, PDF, DOC</p>
</div>`
    },
    {
      name: 'Rating Stars',
      icon: <Star className="w-4 h-4" />,
      code: `<div style="display: flex; align-items: center; gap: 1rem; margin: 1rem 0;">
  <div style="display: flex; gap: 0.25rem;">
    <span style="color: #ffd700; font-size: 1.2rem;">★</span>
    <span style="color: #ffd700; font-size: 1.2rem;">★</span>
    <span style="color: #ffd700; font-size: 1.2rem;">★</span>
    <span style="color: #ffd700; font-size: 1.2rem;">★</span>
    <span style="color: #e2e8f0; font-size: 1.2rem;">★</span>
  </div>
  <span style="color: #718096; font-size: 0.9rem;">4.0 out of 5</span>
  <span style="color: #a0aec0; font-size: 0.9rem;">(128 reviews)</span>
</div>`
    },
    {
      name: 'Comment Box',
      icon: <Quote className="w-4 h-4" />,
      code: `<div style="border: 1px solid #e2e8f0; border-radius: 8px; padding: 1rem; margin: 1rem 0;">
  <div style="display: flex; align-items: center; gap: 0.75rem; margin-bottom: 0.75rem;">
    <img src="https://via.placeholder.com/40x40/48bb78/ffffff?text=JS" alt="User" style="width: 40px; height: 40px; border-radius: 50%;">
    <div>
      <h4 style="margin: 0; color: #2d3748; font-size: 0.9rem;">Jane Smith</h4>
      <p style="margin: 0; color: #a0aec0; font-size: 0.8rem;">2 hours ago</p>
    </div>
  </div>
  <p style="margin: 0 0 0.75rem 0; color: #4a5568; line-height: 1.5;">This is a really helpful article! I've been looking for this information for weeks. Thank you for sharing.</p>
  <div style="display: flex; gap: 1rem; font-size: 0.8rem;">
    <button style="background: none; border: none; color: #4299e1; cursor: pointer;">👍 12</button>
    <button style="background: none; border: none; color: #718096; cursor: pointer;">Reply</button>
  </div>
</div>`
    },
    {
      name: 'Shopping Cart',
      icon: <CreditCard className="w-4 h-4" />,
      code: `<div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; padding: 1.5rem; max-width: 400px;">
  <h3 style="margin: 0 0 1rem 0; color: #2d3748;">Shopping Cart</h3>
  <div style="border-bottom: 1px solid #e2e8f0; padding-bottom: 1rem; margin-bottom: 1rem;">
    <div style="display: flex; align-items: center; gap: 1rem;">
      <img src="https://via.placeholder.com/60x60/4299e1/ffffff?text=Item" alt="Product" style="width: 60px; height: 60px; border-radius: 6px;">
      <div style="flex: 1;">
        <h4 style="margin: 0 0 0.25rem 0; color: #2d3748; font-size: 0.9rem;">Product Name</h4>
        <p style="margin: 0; color: #718096; font-size: 0.8rem;">Size: M, Color: Blue</p>
      </div>
      <div style="text-align: right;">
        <p style="margin: 0 0 0.25rem 0; color: #2d3748; font-weight: 500;">$49.99</p>
        <div style="display: flex; align-items: center; gap: 0.5rem;">
          <button style="background: #e2e8f0; border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer;">-</button>
          <span style="font-size: 0.9rem;">1</span>
          <button style="background: #e2e8f0; border: none; width: 24px; height: 24px; border-radius: 4px; cursor: pointer;">+</button>
        </div>
      </div>
    </div>
  </div>
  <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
    <span style="color: #4a5568; font-weight: 500;">Total:</span>
    <span style="color: #2d3748; font-weight: bold; font-size: 1.1rem;">$49.99</span>
  </div>
  <button style="width: 100%; background: #4299e1; color: white; border: none; padding: 0.75rem; border-radius: 6px; font-weight: 500; cursor: pointer;">Checkout</button>
</div>`
    },
    {
      name: 'Event Card',
      icon: <Calendar className="w-4 h-4" />,
      code: `<div style="background: white; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden; max-width: 350px;">
  <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 1.5rem; color: white;">
    <div style="display: flex; justify-content: space-between; align-items: start;">
      <div>
        <h3 style="margin: 0 0 0.5rem 0;">Web Design Conference</h3>
        <p style="margin: 0; opacity: 0.9; font-size: 0.9rem;">Join us for a day of inspiration</p>
      </div>
      <div style="background: rgba(255,255,255,0.2); padding: 0.5rem; border-radius: 6px; text-align: center; min-width: 60px;">
        <div style="font-size: 1.5rem; font-weight: bold; line-height: 1;">15</div>
        <div style="font-size: 0.8rem; opacity: 0.9;">DEC</div>
      </div>
    </div>
  </div>
  <div style="padding: 1.5rem;">
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 0.75rem; color: #718096; font-size: 0.9rem;">
      <span>📍</span>
      <span>San Francisco, CA</span>
    </div>
    <div style="display: flex; align-items: center; gap: 0.5rem; margin-bottom: 1rem; color: #718096; font-size: 0.9rem;">
      <span>🕒</span>
      <span>9:00 AM - 6:00 PM</span>
    </div>
    <button style="width: 100%; background: #4299e1; color: white; border: none; padding: 0.75rem; border-radius: 6px; font-weight: 500; cursor: pointer;">Register Now</button>
  </div>
</div>`
    }
  ];

  return (
    <div className="h-full flex flex-col">
      <div className="p-3 border-b border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <h3 className="text-sm font-semibold text-slate-800">Component Library</h3>
        <p className="text-xs text-slate-600 mt-1">Click to insert pre-built components</p>
      </div>
      
      <ScrollArea className="flex-1 p-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
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
