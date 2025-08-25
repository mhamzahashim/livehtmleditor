import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import ComponentLibrary from "./pages/ComponentLibrary";
import Notepad from "./pages/Notepad";
import Markdown from "./pages/Markdown";
import PdfConverter from "./pages/PdfConverter";
import NotFound from "./pages/NotFound";
import SiteHeader from "./components/layout/SiteHeader";
import SiteFooter from "./components/layout/SiteFooter";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <div className="min-h-screen flex flex-col">
        <SiteHeader />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/components" element={<ComponentLibrary />} />
            <Route path="/notepad" element={<Notepad />} />
            <Route path="/markdown" element={<Markdown />} />
            <Route path="/pdf-converter" element={<PdfConverter />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
        <SiteFooter />
      </div>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
