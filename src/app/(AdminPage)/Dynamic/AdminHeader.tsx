// components/PageHeaderClient.tsx
"use client";

import PageNavbar from "../(Page)/Sidebar/Navbar/PageNavbar";

export default function PageHeaderClient() {
  const toggleSidebar = () => {
    console.log("Sidebar toggled!");
  };

  return <PageNavbar toggleSidebar={toggleSidebar} />;
}
