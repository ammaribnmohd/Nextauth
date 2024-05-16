import { Poppins } from "next/font/google";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { LoginButton } from "@/components/auth/login-button";

const poppinsFont = Poppins({
  weight: ['600'],
  subsets: ['latin']
});

export default function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-purple-900">
      <div className="space-y-6 text-center">
        <h1 className={cn(
          "text-6xl font-semibold text-yellow-300 drop-shadow-md",
          poppinsFont.className,
        )}>
          Authentication
        </h1>
        <p className="text-white text-lg">
          A simple authentication Service
        </p>
        <div>
          <LoginButton>
            <Button variant="secondary" size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-purple-900 hover:text-white">
              Sign in
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
