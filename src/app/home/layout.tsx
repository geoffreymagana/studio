import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Happy Anniversary - Home',
  description: 'A love story worth celebrating - Our personal anniversary celebration',
};

export default function HomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-background">
      {children}
    </div>
  );
}
