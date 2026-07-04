import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HelmetProvider } from "react-helmet-async";
import { Analytics } from "@vercel/analytics/react";
import { Layout } from "./components/layout/Layout";
import { AdminLayout } from "./components/layout/AdminLayout";
import { Home } from "./pages/Home";
import { Trimesters } from "./pages/Trimesters";
import { TrimesterPage } from "./pages/TrimesterPage";
import { CoursePage } from "./pages/CoursePage";
import { SearchPage } from "./pages/SearchPage";
import { About } from "./pages/About";
import { Contribute } from "./pages/Contribute";
import { NotFound } from "./pages/NotFound";
import { AdminDashboard } from "./pages/admin/AdminDashboard";
import { AdminCourses } from "./pages/admin/AdminCourses";
import { AdminResources } from "./pages/admin/AdminResources";
import { AdminContributions } from "./pages/admin/AdminContributions";
import { AdminAdmins } from "./pages/admin/AdminAdmins";
import { AdminActivityLog } from "./pages/admin/AdminActivityLog";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000,
      retry: 2,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <HelmetProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="trimesters" element={<Trimesters />} />
              <Route path="trimester/:id" element={<TrimesterPage />} />
              <Route path="course/:id" element={<CoursePage />} />
              <Route path="search" element={<SearchPage />} />
              <Route path="about" element={<About />} />
              <Route path="contribute" element={<Contribute />} />
              <Route path="*" element={<NotFound />} />
            </Route>
            <Route path="nimda" element={<AdminLayout />}>
              <Route index element={<AdminDashboard />} />
              <Route path="courses" element={<AdminCourses />} />
              <Route path="resources" element={<AdminResources />} />
              <Route path="contributions" element={<AdminContributions />} />
              <Route path="admins" element={<AdminAdmins />} />
              <Route path="activity-log" element={<AdminActivityLog />} />
              <Route path="*" element={<AdminDashboard />} />
            </Route>
          </Routes>
        </BrowserRouter>
        <Analytics />
      </QueryClientProvider>
    </HelmetProvider>
  );
}
