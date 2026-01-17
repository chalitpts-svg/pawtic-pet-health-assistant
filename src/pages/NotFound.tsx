import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { PawPrint, Home } from "lucide-react";
import { Button } from "@/components/ui/button";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 bg-background">
      <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center mb-6">
        <PawPrint className="w-12 h-12 text-muted-foreground" />
      </div>
      
      <h1 className="text-4xl font-bold text-foreground mb-2">404</h1>
      <p className="text-muted-foreground text-center mb-8">
        ไม่พบหน้าที่คุณกำลังค้นหา<br />
        ลองกลับไปหน้าหลักนะ
      </p>
      
      <Link to="/">
        <Button>
          <Home className="w-5 h-5 mr-2" />
          กลับหน้าหลัก
        </Button>
      </Link>
    </div>
  );
};

export default NotFound;
