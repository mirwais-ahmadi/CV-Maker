import UserSidebar from "@/components/UserSidebar"; // you can create a user-specific sidebar or reuse
export default function UserDashboardLayout({ children }) {
    return (
        <div className="flex min-h-screen">
            <UserSidebar />
            <main className="flex-1 p-6">{children}</main>
        </div>
    );
}
