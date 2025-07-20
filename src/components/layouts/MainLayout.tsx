"use client";

interface LayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen relative bg-white">
      <main>{children}</main>
    </div>
  );
}
