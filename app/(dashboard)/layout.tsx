import Navbar from "@/components/navbar";
import { AuthProvider } from "@/context/userContext";

export default async function SetupLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <AuthProvider>
        <Navbar />
        {children}
      </AuthProvider>
    </>
  );
}
