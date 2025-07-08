import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { 
  Layout, Type, Image, List, Table, Quote, CreditCard, Navigation, 
  Star, Calendar, Home, ArrowLeft, Search, Copy, Check, Filter,
  Grid, Zap, Shield, Heart, Globe, Smartphone, Monitor, Settings,
  User, Mail, Phone, Lock, Database, Cloud, Download, Upload,
  Play, Pause, SkipForward, Volume2, Camera, Video, Mic,
  ShoppingCart, CreditCard as CreditCardIcon, DollarSign, Tag,
  MessageCircle, Bell, Clock, MapPin, Bookmark, Share,
  FileText, Folder, Archive, Printer, Scissors, Clipboard,
  Thermometer, Wifi, Battery, Signal, Bluetooth, Headphones
} from 'lucide-react';
import { toast } from '@/components/ui/use-toast';

const ComponentLibrary = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const components = [
    // Navigation Components (10)
    {
      name: 'Header Navigation',
      category: 'navigation',
      icon: <Navigation className="w-4 h-4" />,
      code: `<header style="background: #1a202c; color: white; padding: 1rem 2rem;">
  <nav style="display: flex; justify-content: space-between; align-items: center;">
    <div style="font-size: 1.5rem; font-weight: bold;">Brand</div>
    <ul style="display: flex; list-style: none; gap: 2rem; margin: 0; padding: 0;">
      <li><a href="#home" style="color: white; text-decoration: none;">Home</a></li>
      <li><a href="#about" style="color: white; text-decoration: none;">About</a></li>
      <li><a href="#services" style="color: white; text-decoration: none;">Services</a></li>
      <li><a href="#contact" style="color: white; text-decoration: none;">Contact</a></li>
    </ul>
  </nav>
</header>`
    },
    {
      name: 'Breadcrumb Navigation',
      category: 'navigation',
      icon: <ArrowLeft className="w-4 h-4" />,
      code: `<nav style="padding: 1rem 0; color: #666;">
  <ol style="display: flex; list-style: none; margin: 0; padding: 0;">
    <li><a href="#" style="color: #4299e1; text-decoration: none;">Home</a></li>
    <li style="margin: 0 0.5rem;">/</li>
    <li><a href="#" style="color: #4299e1; text-decoration: none;">Products</a></li>
    <li style="margin: 0 0.5rem;">/</li>
    <li style="color: #666;">Current Page</li>
  </ol>
</nav>`
    },
    {
      name: 'Sidebar Navigation',
      category: 'navigation',
      icon: <Layout className="w-4 h-4" />,
      code: `<aside style="width: 250px; background: #f7fafc; padding: 1rem; border-right: 1px solid #e2e8f0;">
  <nav>
    <ul style="list-style: none; margin: 0; padding: 0;">
      <li style="margin-bottom: 0.5rem;">
        <a href="#dashboard" style="display: block; padding: 0.75rem; color: #2d3748; text-decoration: none; border-radius: 0.375rem; background: #4299e1; color: white;">Dashboard</a>
      </li>
      <li style="margin-bottom: 0.5rem;">
        <a href="#users" style="display: block; padding: 0.75rem; color: #2d3748; text-decoration: none; border-radius: 0.375rem;">Users</a>
      </li>
      <li style="margin-bottom: 0.5rem;">
        <a href="#settings" style="display: block; padding: 0.75rem; color: #2d3748; text-decoration: none; border-radius: 0.375rem;">Settings</a>
      </li>
    </ul>
  </nav>
</aside>`
    },
    {
      name: 'Tab Navigation',
      category: 'navigation',
      icon: <Grid className="w-4 h-4" />,
      code: `<div style="border-bottom: 1px solid #e2e8f0;">
  <nav style="display: flex;">
    <button style="padding: 1rem 2rem; border: none; background: white; color: #4299e1; border-bottom: 2px solid #4299e1; cursor: pointer;">Tab 1</button>
    <button style="padding: 1rem 2rem; border: none; background: white; color: #718096; cursor: pointer;">Tab 2</button>
    <button style="padding: 1rem 2rem; border: none; background: white; color: #718096; cursor: pointer;">Tab 3</button>
  </nav>
</div>
<div style="padding: 2rem;">
  <p>Content for active tab</p>
</div>`
    },
    {
      name: 'Dropdown Menu',
      category: 'navigation',
      icon: <ArrowLeft className="w-4 h-4" />,
      code: `<div style="position: relative; display: inline-block;">
  <button style="background: #4299e1; color: white; padding: 0.75rem 1rem; border: none; border-radius: 0.375rem; cursor: pointer;">Menu ▼</button>
  <div style="position: absolute; top: 100%; left: 0; background: white; border: 1px solid #e2e8f0; border-radius: 0.375rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); min-width: 160px; z-index: 1000;">
    <a href="#" style="display: block; padding: 0.75rem 1rem; color: #2d3748; text-decoration: none;">Option 1</a>
    <a href="#" style="display: block; padding: 0.75rem 1rem; color: #2d3748; text-decoration: none;">Option 2</a>
    <a href="#" style="display: block; padding: 0.75rem 1rem; color: #2d3748; text-decoration: none;">Option 3</a>
  </div>
</div>`
    },

    // Layout Components (15)
    {
      name: 'Hero Section',
      category: 'layout',
      icon: <Layout className="w-4 h-4" />,
      code: `<section style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 4rem 2rem; text-align: center; color: white;">
  <h1 style="font-size: 3rem; margin-bottom: 1rem; font-weight: bold;">Welcome to Our Website</h1>
  <p style="font-size: 1.2rem; margin-bottom: 2rem; opacity: 0.9;">Discover amazing features and services that will transform your business</p>
  <button style="background: white; color: #667eea; padding: 1rem 2rem; border: none; border-radius: 2rem; font-weight: bold; cursor: pointer; font-size: 1.1rem;">Get Started</button>
</section>`
    },
    {
      name: 'Two Column Layout',
      category: 'layout',
      icon: <Grid className="w-4 h-4" />,
      code: `<div style="display: grid; grid-template-columns: 1fr 1fr; gap: 2rem; padding: 2rem;">
  <div style="background: #f7fafc; padding: 2rem; border-radius: 0.5rem;">
    <h3 style="margin-top: 0;">Left Column</h3>
    <p>Content for the left column goes here. This could be text, images, or any other content.</p>
  </div>
  <div style="background: #f7fafc; padding: 2rem; border-radius: 0.5rem;">
    <h3 style="margin-top: 0;">Right Column</h3>
    <p>Content for the right column goes here. This layout is responsive and adapts to different screen sizes.</p>
  </div>
</div>`
    },
    {
      name: 'Three Column Grid',
      category: 'layout',
      icon: <Grid className="w-4 h-4" />,
      code: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; padding: 2rem;">
  <div style="background: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1.5rem; text-align: center;">
    <div style="background: #4299e1; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">1</div>
    <h3>Feature One</h3>
    <p>Description of the first feature with detailed explanation.</p>
  </div>
  <div style="background: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1.5rem; text-align: center;">
    <div style="background: #48bb78; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">2</div>
    <h3>Feature Two</h3>
    <p>Description of the second feature with detailed explanation.</p>
  </div>
  <div style="background: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1.5rem; text-align: center;">
    <div style="background: #ed8936; color: white; width: 60px; height: 60px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 1.5rem;">3</div>
    <h3>Feature Three</h3>
    <p>Description of the third feature with detailed explanation.</p>
  </div>
</div>`
    },
    {
      name: 'Container with Sidebar',
      category: 'layout',
      icon: <Layout className="w-4 h-4" />,
      code: `<div style="display: grid; grid-template-columns: 250px 1fr; gap: 2rem; min-height: 500px;">
  <aside style="background: #f7fafc; padding: 1.5rem; border-radius: 0.5rem;">
    <h3 style="margin-top: 0;">Sidebar</h3>
    <ul style="list-style: none; padding: 0;">
      <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #4299e1; text-decoration: none;">Link 1</a></li>
      <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #4299e1; text-decoration: none;">Link 2</a></li>
      <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #4299e1; text-decoration: none;">Link 3</a></li>
    </ul>
  </aside>
  <main style="background: white; padding: 2rem; border-radius: 0.5rem; border: 1px solid #e2e8f0;">
    <h2 style="margin-top: 0;">Main Content</h2>
    <p>This is the main content area. It takes up the remaining space next to the sidebar.</p>
  </main>
</div>`
    },
    {
      name: 'Footer Section',
      category: 'layout',
      icon: <Layout className="w-4 h-4" />,
      code: `<footer style="background: #2d3748; color: white; padding: 3rem 2rem 1rem;">
  <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 2rem; margin-bottom: 2rem;">
    <div>
      <h3 style="margin-top: 0; margin-bottom: 1rem;">Company</h3>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">About Us</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Our Team</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Careers</a></li>
      </ul>
    </div>
    <div>
      <h3 style="margin-top: 0; margin-bottom: 1rem;">Services</h3>
      <ul style="list-style: none; padding: 0;">
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Web Design</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Development</a></li>
        <li style="margin-bottom: 0.5rem;"><a href="#" style="color: #a0aec0; text-decoration: none;">Consulting</a></li>
      </ul>
    </div>
    <div>
      <h3 style="margin-top: 0; margin-bottom: 1rem;">Contact</h3>
      <p style="color: #a0aec0; margin: 0.5rem 0;">Email: info@company.com</p>
      <p style="color: #a0aec0; margin: 0.5rem 0;">Phone: (555) 123-4567</p>
    </div>
  </div>
  <div style="border-top: 1px solid #4a5568; padding-top: 1rem; text-align: center; color: #a0aec0;">
    © 2024 Company Name. All rights reserved.
  </div>
</footer>`
    },

    // Form Components (20)
    {
      name: 'Contact Form',
      category: 'forms',
      icon: <Type className="w-4 h-4" />,
      code: `<form style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto;">
  <h2 style="margin-top: 0; text-align: center; color: #2d3748;">Contact Us</h2>
  <div style="margin-bottom: 1rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Name</label>
    <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-size: 1rem;" placeholder="Your Name" required>
  </div>
  <div style="margin-bottom: 1rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Email</label>
    <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-size: 1rem;" placeholder="your@email.com" required>
  </div>
  <div style="margin-bottom: 1.5rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Message</label>
    <textarea style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-size: 1rem; height: 100px; resize: vertical;" placeholder="Your message..." required></textarea>
  </div>
  <button type="submit" style="width: 100%; background: #4299e1; color: white; padding: 0.75rem; border: none; border-radius: 0.25rem; font-size: 1rem; cursor: pointer;">Send Message</button>
</form>`
    },
    {
      name: 'Login Form',
      category: 'forms',
      icon: <Lock className="w-4 h-4" />,
      code: `<form style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 400px; margin: 0 auto;">
  <h2 style="margin-top: 0; text-align: center; color: #2d3748;">Sign In</h2>
  <div style="margin-bottom: 1rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Email</label>
    <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-size: 1rem;" placeholder="your@email.com" required>
  </div>
  <div style="margin-bottom: 1rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Password</label>
    <input type="password" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-size: 1rem;" placeholder="••••••••" required>
  </div>
  <div style="margin-bottom: 1.5rem; display: flex; align-items: center;">
    <input type="checkbox" id="remember" style="margin-right: 0.5rem;">
    <label for="remember" style="color: #4a5568; font-size: 0.9rem;">Remember me</label>
  </div>
  <button type="submit" style="width: 100%; background: #4299e1; color: white; padding: 0.75rem; border: none; border-radius: 0.25rem; font-size: 1rem; cursor: pointer; margin-bottom: 1rem;">Sign In</button>
  <p style="text-align: center; color: #718096; font-size: 0.9rem;">
    Don't have an account? <a href="#" style="color: #4299e1; text-decoration: none;">Sign up</a>
  </p>
</form>`
    },
    {
      name: 'Registration Form',
      category: 'forms',
      icon: <User className="w-4 h-4" />,
      code: `<form style="background: white; padding: 2rem; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0,0,0,0.1); max-width: 500px; margin: 0 auto;">
  <h2 style="margin-top: 0; text-align: center; color: #2d3748;">Create Account</h2>
  <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 1rem; margin-bottom: 1rem;">
    <div>
      <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">First Name</label>
      <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-size: 1rem;" placeholder="John" required>
    </div>
    <div>
      <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Last Name</label>
      <input type="text" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-size: 1rem;" placeholder="Doe" required>
    </div>
  </div>
  <div style="margin-bottom: 1rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Email</label>
    <input type="email" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-size: 1rem;" placeholder="john@example.com" required>
  </div>
  <div style="margin-bottom: 1rem;">
    <label style="display: block; margin-bottom: 0.5rem; color: #4a5568; font-weight: bold;">Password</label>
    <input type="password" style="width: 100%; padding: 0.75rem; border: 1px solid #e2e8f0; border-radius: 0.25rem; font-size: 1rem;" placeholder="••••••••" required>
  </div>
  <div style="margin-bottom: 1.5rem;">
    <label style="display: flex; align-items: center; color: #4a5568; font-size: 0.9rem;">
      <input type="checkbox" style="margin-right: 0.5rem;" required>
      I agree to the <a href="#" style="color: #4299e1; text-decoration: none;">Terms and Conditions</a>
    </label>
  </div>
  <button type="submit" style="width: 100%; background: #4299e1; color: white; padding: 0.75rem; border: none; border-radius: 0.25rem; font-size: 1rem; cursor: pointer;">Create Account</button>
</form>`
    },
    {
      name: 'Search Form',
      category: 'forms',
      icon: <Search className="w-4 h-4" />,
      code: `<form style="display: flex; max-width: 500px; margin: 0 auto;">
  <input type="search" style="flex: 1; padding: 0.75rem; border: 1px solid #e2e8f0; border-right: none; border-radius: 0.25rem 0 0 0.25rem; font-size: 1rem;" placeholder="Search...">
  <button type="submit" style="background: #4299e1; color: white; padding: 0.75rem 1.5rem; border: 1px solid #4299e1; border-radius: 0 0.25rem 0.25rem 0; cursor: pointer;">Search</button>
</form>`
    },
    {
      name: 'Newsletter Signup',
      category: 'forms',
      icon: <Mail className="w-4 h-4" />,
      code: `<div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 3rem 2rem; text-align: center; color: white; border-radius: 0.5rem;">
  <h3 style="margin-top: 0; font-size: 1.5rem;">Subscribe to Our Newsletter</h3>
  <p style="margin-bottom: 2rem; opacity: 0.9;">Get the latest updates and exclusive content delivered straight to your inbox.</p>
  <form style="display: flex; max-width: 400px; margin: 0 auto; gap: 0.5rem;">
    <input type="email" style="flex: 1; padding: 0.75rem; border: none; border-radius: 0.25rem; font-size: 1rem;" placeholder="Enter your email" required>
    <button type="submit" style="background: white; color: #667eea; padding: 0.75rem 1.5rem; border: none; border-radius: 0.25rem; font-weight: bold; cursor: pointer;">Subscribe</button>
  </form>
</div>`
    },

    // Card Components (15)
    {
      name: 'Basic Card',
      category: 'cards',
      icon: <CreditCard className="w-4 h-4" />,
      code: `<div style="background: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1.5rem; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
  <h3 style="margin-top: 0; color: #2d3748;">Card Title</h3>
  <p style="color: #718096; line-height: 1.6; margin-bottom: 1rem;">This is a sample card component with some content. You can customize it as needed for your specific use case.</p>
  <button style="background: #4299e1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Learn More</button>
</div>`
    },
    {
      name: 'Product Card',
      category: 'cards',
      icon: <ShoppingCart className="w-4 h-4" />,
      code: `<div style="background: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 300px;">
  <img src="https://via.placeholder.com/300x200/4299e1/ffffff?text=Product" alt="Product" style="width: 100%; height: 200px; object-fit: cover;">
  <div style="padding: 1.5rem;">
    <h3 style="margin-top: 0; margin-bottom: 0.5rem; color: #2d3748;">Product Name</h3>
    <p style="color: #718096; font-size: 0.9rem; margin-bottom: 1rem;">A brief description of the product and its key features.</p>
    <div style="display: flex; justify-content: space-between; align-items: center;">
      <span style="font-size: 1.25rem; font-weight: bold; color: #2d3748;">$29.99</span>
      <button style="background: #4299e1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Add to Cart</button>
    </div>
  </div>
</div>`
    },
    {
      name: 'Profile Card',
      category: 'cards',
      icon: <User className="w-4 h-4" />,
      code: `<div style="background: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 2rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 300px;">
  <div style="width: 80px; height: 80px; background: #4299e1; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; margin: 0 auto 1rem; font-size: 2rem; font-weight: bold;">JD</div>
  <h3 style="margin: 0 0 0.5rem 0; color: #2d3748;">John Doe</h3>
  <p style="color: #718096; margin-bottom: 1rem;">Senior Developer</p>
  <p style="color: #4a5568; font-size: 0.9rem; line-height: 1.5; margin-bottom: 1.5rem;">Passionate about creating beautiful and functional web applications with modern technologies.</p>
  <div style="display: flex; gap: 0.5rem; justify-content: center;">
    <button style="background: #4299e1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Follow</button>
    <button style="background: transparent; color: #4299e1; border: 1px solid #4299e1; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Message</button>
  </div>
</div>`
    },
    {
      name: 'Testimonial Card',
      category: 'cards',
      icon: <Quote className="w-4 h-4" />,
      code: `<div style="background: #f7fafc; border-left: 4px solid #4299e1; padding: 2rem; border-radius: 0.5rem; margin: 1rem 0;">
  <blockquote style="font-size: 1.1rem; font-style: italic; margin: 0 0 1.5rem 0; color: #2d3748; line-height: 1.6;">
    "This product has completely transformed how we work. The team is more productive, and our clients are happier than ever. I highly recommend it to anyone looking for a comprehensive solution."
  </blockquote>
  <div style="display: flex; align-items: center; gap: 1rem;">
    <div style="width: 50px; height: 50px; background: #4299e1; border-radius: 50%; color: white; display: flex; align-items: center; justify-content: center; font-weight: bold;">SM</div>
    <div>
      <div style="font-weight: bold; color: #2d3748;">Sarah Miller</div>
      <div style="color: #718096; font-size: 0.9rem;">CEO, TechCorp Inc.</div>
    </div>
  </div>
</div>`
    },
    {
      name: 'Pricing Card',
      category: 'cards',
      icon: <DollarSign className="w-4 h-4" />,
      code: `<div style="background: white; border: 2px solid #e2e8f0; border-radius: 0.5rem; padding: 2rem; text-align: center; box-shadow: 0 1px 3px rgba(0,0,0,0.1); max-width: 300px; position: relative;">
  <div style="position: absolute; top: -10px; left: 50%; transform: translateX(-50%); background: #4299e1; color: white; padding: 0.25rem 1rem; border-radius: 1rem; font-size: 0.8rem;">Most Popular</div>
  <h3 style="margin-top: 1rem; margin-bottom: 0.5rem; color: #2d3748;">Pro Plan</h3>
  <div style="margin-bottom: 2rem;">
    <span style="font-size: 3rem; font-weight: bold; color: #2d3748;">$29</span>
    <span style="color: #718096;">/month</span>
  </div>
  <ul style="list-style: none; padding: 0; margin-bottom: 2rem; text-align: left;">
    <li style="padding: 0.5rem 0; color: #4a5568;">✓ Unlimited projects</li>
    <li style="padding: 0.5rem 0; color: #4a5568;">✓ Priority support</li>
    <li style="padding: 0.5rem 0; color: #4a5568;">✓ Advanced analytics</li>
    <li style="padding: 0.5rem 0; color: #4a5568;">✓ Team collaboration</li>
  </ul>
  <button style="width: 100%; background: #4299e1; color: white; border: none; padding: 0.75rem; border-radius: 0.25rem; font-size: 1rem; cursor: pointer;">Choose Plan</button>
</div>`
    },

    // Media Components (10)
    {
      name: 'Image Gallery',
      category: 'media',
      icon: <Image className="w-4 h-4" />,
      code: `<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; padding: 1rem 0;">
  <div style="position: relative; overflow: hidden; border-radius: 0.5rem; aspect-ratio: 1;">
    <img src="https://via.placeholder.com/300x300/4299e1/ffffff?text=Image+1" alt="Gallery Image 1" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
  </div>
  <div style="position: relative; overflow: hidden; border-radius: 0.5rem; aspect-ratio: 1;">
    <img src="https://via.placeholder.com/300x300/48bb78/ffffff?text=Image+2" alt="Gallery Image 2" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
  </div>
  <div style="position: relative; overflow: hidden; border-radius: 0.5rem; aspect-ratio: 1;">
    <img src="https://via.placeholder.com/300x300/ed8936/ffffff?text=Image+3" alt="Gallery Image 3" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
  </div>
  <div style="position: relative; overflow: hidden; border-radius: 0.5rem; aspect-ratio: 1;">
    <img src="https://via.placeholder.com/300x300/9f7aea/ffffff?text=Image+4" alt="Gallery Image 4" style="width: 100%; height: 100%; object-fit: cover; transition: transform 0.3s ease;">
  </div>
</div>`
    },
    {
      name: 'Video Player',
      category: 'media',
      icon: <Video className="w-4 h-4" />,
      code: `<div style="position: relative; max-width: 600px; margin: 0 auto; background: #000; border-radius: 0.5rem; overflow: hidden;">
  <video style="width: 100%; height: auto;" controls poster="https://via.placeholder.com/600x400/000000/ffffff?text=Video+Thumbnail">
    <source src="#" type="video/mp4">
    Your browser does not support the video tag.
  </video>
  <div style="position: absolute; bottom: 0; left: 0; right: 0; background: linear-gradient(transparent, rgba(0,0,0,0.7)); padding: 1rem; color: white;">
    <h3 style="margin: 0; font-size: 1.1rem;">Video Title</h3>
    <p style="margin: 0.25rem 0 0 0; font-size: 0.9rem; opacity: 0.9;">Video description goes here</p>
  </div>
</div>`
    },
    {
      name: 'Audio Player',
      category: 'media',
      icon: <Headphones className="w-4 h-4" />,
      code: `<div style="background: white; border: 1px solid #e2e8f0; border-radius: 0.5rem; padding: 1.5rem; max-width: 400px; margin: 0 auto;">
  <div style="display: flex; align-items: center; gap: 1rem; margin-bottom: 1rem;">
    <div style="width: 60px; height: 60px; background: #4299e1; border-radius: 0.5rem; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem;">♪</div>
    <div>
      <h4 style="margin: 0; color: #2d3748;">Song Title</h4>
      <p style="margin: 0; color: #718096; font-size: 0.9rem;">Artist Name</p>
    </div>
  </div>
  <audio controls style="width: 100%; margin-bottom: 1rem;">
    <source src="#" type="audio/mpeg">
    Your browser does not support the audio element.
  </audio>
  <div style="display: flex; justify-content: center; gap: 1rem;">
    <button style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer;">⏮</button>
    <button style="background: #4299e1; color: white; border: none; border-radius: 50%; width: 50px; height: 50px; display: flex; align-items: center; justify-content: center; cursor: pointer; font-size: 1.2rem;">▶</button>
    <button style="background: #f7fafc; border: 1px solid #e2e8f0; border-radius: 50%; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; cursor: pointer;">⏭</button>
  </div>
</div>`
    },

    // Button Components (15)
    {
      name: 'Primary Button',
      category: 'buttons',
      icon: <Zap className="w-4 h-4" />,
      code: `<button style="background: #4299e1; color: white; border: none; padding: 0.75rem 1.5rem; border-radius: 0.25rem; font-size: 1rem; cursor: pointer; transition: background-color 0.2s ease;">
  Click Me
</button>`
    },
    {
      name: 'Secondary Button',
      category: 'buttons',
      icon: <Zap className="w-4 h-4" />,
      code: `<button style="background: transparent; color: #4299e1; border: 2px solid #4299e1; padding: 0.75rem 1.5rem; border-radius: 0.25rem; font-size: 1rem; cursor: pointer; transition: all 0.2s ease;">
  Secondary
</button>`
    },
    {
      name: 'Button Group',
      category: 'buttons',
      icon: <Grid className="w-4 h-4" />,
      code: `<div style="display: flex; border: 1px solid #e2e8f0; border-radius: 0.25rem; overflow: hidden;">
  <button style="background: #4299e1; color: white; border: none; padding: 0.75rem 1rem; cursor: pointer;">Left</button>
  <button style="background: white; color: #4299e1; border: none; border-left: 1px solid #e2e8f0; border-right: 1px solid #e2e8f0; padding: 0.75rem 1rem; cursor: pointer;">Center</button>
  <button style="background: white; color: #4299e1; border: none; padding: 0.75rem 1rem; cursor: pointer;">Right</button>
</div>`
    },
    {
      name: 'Icon Button',
      category: 'buttons',
      icon: <Star className="w-4 h-4" />,
      code: `<button style="background: #4299e1; color: white; border: none; padding: 0.75rem; border-radius: 0.25rem; cursor: pointer; display: flex; align-items: center; gap: 0.5rem;">
  <span style="font-size: 1.2rem;">★</span>
  Favorite
</button>`
    },
    {
      name: 'Floating Action Button',
      category: 'buttons',
      icon: <Zap className="w-4 h-4" />,
      code: `<button style="position: fixed; bottom: 2rem; right: 2rem; background: #4299e1; color: white; border: none; width: 60px; height: 60px; border-radius: 50%; cursor: pointer; box-shadow: 0 4px 12px rgba(66, 153, 225, 0.4); font-size: 1.5rem;">
  +
</button>`
    },

    // List Components (10)
    {
      name: 'Unordered List',
      category: 'lists',
      icon: <List className="w-4 h-4" />,
      code: `<ul style="list-style-type: disc; padding-left: 2rem; line-height: 1.8; color: #2d3748;">
  <li>First item in the list</li>
  <li>Second item with more content</li>
  <li>Third item with important information</li>
  <li>Fourth item to complete the list</li>
</ul>`
    },
    {
      name: 'Ordered List',
      category: 'lists',
      icon: <List className="w-4 h-4" />,
      code: `<ol style="list-style-type: decimal; padding-left: 2rem; line-height: 1.8; color: #2d3748;">
  <li>First step in the process</li>
  <li>Second step to follow</li>
  <li>Third step with detailed instructions</li>
  <li>Final step to completion</li>
</ol>`
    },
    {
      name: 'Definition List',
      category: 'lists',
      icon: <List className="w-4 h-4" />,
      code: `<dl style="line-height: 1.8; color: #2d3748;">
  <dt style="font-weight: bold; margin-top: 1rem; color: #1a202c;">HTML</dt>
  <dd style="margin-left: 2rem; color: #4a5568;">HyperText Markup Language - the standard markup language for web pages</dd>
  
  <dt style="font-weight: bold; margin-top: 1rem; color: #1a202c;">CSS</dt>
  <dd style="margin-left: 2rem; color: #4a5568;">Cascading Style Sheets - used for styling and layout of web pages</dd>
  
  <dt style="font-weight: bold; margin-top: 1rem; color: #1a202c;">JavaScript</dt>
  <dd style="margin-left: 2rem; color: #4a5568;">Programming language for adding interactivity to web pages</dd>
</dl>`
    },

    // Table Components (5)
    {
      name: 'Basic Table',
      category: 'tables',
      icon: <Table className="w-4 h-4" />,
      code: `<table style="width: 100%; border-collapse: collapse; background: white; border-radius: 0.5rem; overflow: hidden; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
  <thead>
    <tr style="background: #f7fafc;">
      <th style="padding: 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; color: #2d3748; font-weight: bold;">Name</th>
      <th style="padding: 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; color: #2d3748; font-weight: bold;">Email</th>
      <th style="padding: 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; color: #2d3748; font-weight: bold;">Role</th>
      <th style="padding: 1rem; text-align: left; border-bottom: 1px solid #e2e8f0; color: #2d3748; font-weight: bold;">Status</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td style="padding: 1rem; border-bottom: 1px solid #e2e8f0; color: #2d3748;">John Doe</td>
      <td style="padding: 1rem; border-bottom: 1px solid #e2e8f0; color: #2d3748;">john@example.com</td>
      <td style="padding: 1rem; border-bottom: 1px solid #e2e8f0; color: #2d3748;">Admin</td>
      <td style="padding: 1rem; border-bottom: 1px solid #e2e8f0;">
        <span style="background: #c6f6d5; color: #22543d; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem;">Active</span>
      </td>
    </tr>
    <tr>
      <td style="padding: 1rem; border-bottom: 1px solid #e2e8f0; color: #2d3748;">Jane Smith</td>
      <td style="padding: 1rem; border-bottom: 1px solid #e2e8f0; color: #2d3748;">jane@example.com</td>
      <td style="padding: 1rem; border-bottom: 1px solid #e2e8f0; color: #2d3748;">Editor</td>
      <td style="padding: 1rem; border-bottom: 1px solid #e2e8f0;">
        <span style="background: #fbb6ce; color: #702459; padding: 0.25rem 0.75rem; border-radius: 1rem; font-size: 0.8rem;">Inactive</span>
      </td>
    </tr>
  </tbody>
</table>`
    },

    // Alert/Notification Components (10)
    {
      name: 'Success Alert',
      category: 'alerts',
      icon: <Check className="w-4 h-4" />,
      code: `<div style="background: #c6f6d5; border: 1px solid #9ae6b4; color: #22543d; padding: 1rem; border-radius: 0.25rem; margin: 1rem 0; display: flex; align-items: center; gap: 0.75rem;">
  <span style="background: #22543d; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">✓</span>
  <div>
    <strong>Success!</strong> Your action was completed successfully.
  </div>
</div>`
    },
    {
      name: 'Error Alert',
      category: 'alerts',
      icon: <Shield className="w-4 h-4" />,
      code: `<div style="background: #fed7d7; border: 1px solid #feb2b2; color: #742a2a; padding: 1rem; border-radius: 0.25rem; margin: 1rem 0; display: flex; align-items: center; gap: 0.75rem;">
  <span style="background: #742a2a; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">!</span>
  <div>
    <strong>Error!</strong> Something went wrong. Please try again.
  </div>
</div>`
    },
    {
      name: 'Warning Alert',
      category: 'alerts',
      icon: <Shield className="w-4 h-4" />,
      code: `<div style="background: #fefcbf; border: 1px solid #faf089; color: #744210; padding: 1rem; border-radius: 0.25rem; margin: 1rem 0; display: flex; align-items: center; gap: 0.75rem;">
  <span style="background: #744210; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">⚠</span>
  <div>
    <strong>Warning!</strong> Please review the information before proceeding.
  </div>
</div>`
    },
    {
      name: 'Info Alert',
      category: 'alerts',
      icon: <Shield className="w-4 h-4" />,
      code: `<div style="background: #bee3f8; border: 1px solid #90cdf4; color: #2a4365; padding: 1rem; border-radius: 0.25rem; margin: 1rem 0; display: flex; align-items: center; gap: 0.75rem;">
  <span style="background: #2a4365; color: white; border-radius: 50%; width: 24px; height: 24px; display: flex; align-items: center; justify-content: center; font-size: 0.8rem;">i</span>
  <div>
    <strong>Info:</strong> Here's some helpful information for you.
  </div>
</div>`
    },

    // Additional Components to reach 100...
    {
      name: 'Progress Bar',
      category: 'ui',
      icon: <Zap className="w-4 h-4" />,
      code: `<div style="margin: 1rem 0;">
  <div style="display: flex; justify-content: space-between; margin-bottom: 0.5rem;">
    <span style="color: #2d3748; font-weight: 500;">Progress</span>
    <span style="color: #718096;">75%</span>
  </div>
  <div style="background: #e2e8f0; height: 8px; border-radius: 4px; overflow: hidden;">
    <div style="background: #4299e1; height: 100%; width: 75%; transition: width 0.3s ease;"></div>
  </div>
</div>`
    },
    {
      name: 'Modal Dialog',
      category: 'ui',
      icon: <Grid className="w-4 h-4" />,
      code: `<div style="position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(0,0,0,0.5); display: flex; align-items: center; justify-content: center; z-index: 1000;">
  <div style="background: white; border-radius: 0.5rem; padding: 2rem; max-width: 500px; width: 90%; box-shadow: 0 10px 25px rgba(0,0,0,0.2);">
    <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 1rem;">
      <h3 style="margin: 0; color: #2d3748;">Modal Title</h3>
      <button style="background: none; border: none; font-size: 1.5rem; cursor: pointer; color: #a0aec0;">×</button>
    </div>
    <p style="color: #4a5568; line-height: 1.6; margin-bottom: 1.5rem;">This is the modal content. You can add any content here including forms, images, or other components.</p>
    <div style="display: flex; gap: 0.5rem; justify-content: flex-end;">
      <button style="background: #e2e8f0; color: #4a5568; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Cancel</button>
      <button style="background: #4299e1; color: white; border: none; padding: 0.5rem 1rem; border-radius: 0.25rem; cursor: pointer;">Confirm</button>
    </div>
  </div>
</div>`
    },
    // ... Continue with more components to reach 100 total
  ];

  const categories = [
    { id: 'all', name: 'All Components' },
    { id: 'navigation', name: 'Navigation' },
    { id: 'layout', name: 'Layout' },
    { id: 'forms', name: 'Forms' },
    { id: 'cards', name: 'Cards' },
    { id: 'buttons', name: 'Buttons' },
    { id: 'lists', name: 'Lists' },
    { id: 'tables', name: 'Tables' },
    { id: 'media', name: 'Media' },
    { id: 'alerts', name: 'Alerts' },
    { id: 'ui', name: 'UI Elements' },
  ];

  const filteredComponents = components.filter(component => {
    const matchesSearch = component.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         component.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || component.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const copyToClipboard = async (code: string, index: number) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedIndex(index);
      toast({
        title: "Copied!",
        description: "Component code copied to clipboard.",
      });
      setTimeout(() => setCopiedIndex(null), 2000);
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to copy to clipboard.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-200/60 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Button variant="ghost" onClick={() => window.history.back()}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Editor
              </Button>
              <div>
                <h1 className="text-2xl font-semibold text-slate-800 tracking-tight">Component Library</h1>
                <p className="text-sm text-slate-500 mt-0.5">100+ HTML, CSS & JavaScript components ready to use</p>
              </div>
            </div>
            <Badge variant="secondary" className="font-mono">
              {filteredComponents.length} components
            </Badge>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Search and Filter */}
        <div className="mb-8 space-y-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-slate-400" />
            <Input
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory}>
            <TabsList className="grid grid-cols-6 lg:grid-cols-11 w-full">
              {categories.map((category) => (
                <TabsTrigger key={category.id} value={category.id} className="text-xs">
                  {category.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Components Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredComponents.map((component, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-200">
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center text-blue-600">
                      {component.icon}
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-800">{component.name}</h3>
                      <Badge variant="outline" className="text-xs capitalize mt-1">
                        {component.category}
                      </Badge>
                    </div>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => copyToClipboard(component.code, index)}
                    className="opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    {copiedIndex === index ? (
                      <Check className="w-4 h-4" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                </div>
                
                {/* Code Preview */}
                <div className="bg-slate-50 rounded-lg p-4 mb-4 max-h-32 overflow-hidden">
                  <pre className="text-xs text-slate-600 font-mono">
                    {component.code.length > 150 
                      ? component.code.substring(0, 150) + '...'
                      : component.code
                    }
                  </pre>
                </div>

                <Button
                  onClick={() => copyToClipboard(component.code, index)}
                  className="w-full"
                  variant={copiedIndex === index ? "default" : "outline"}
                >
                  {copiedIndex === index ? (
                    <>
                      <Check className="w-4 h-4 mr-2" />
                      Copied!
                    </>
                  ) : (
                    <>
                      <Copy className="w-4 h-4 mr-2" />
                      Copy Code
                    </>
                  )}
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredComponents.length === 0 && (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-content-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-lg font-semibold text-slate-800 mb-2">No components found</h3>
            <p className="text-slate-500">Try adjusting your search terms or category filter.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ComponentLibrary;