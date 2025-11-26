import Sidebar from "@/components/Sidebar";

export default function DashboardLayout({ children }) {
    return (
        <div className="flex max-w-[1920px] mx-auto">
            <Sidebar />
            <main className="flex-1 p-10">{children}</main>
        </div>
    );
}
