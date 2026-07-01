import { BrowserRouter, Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Layout } from "./components/layout/Layout";
import { Home } from "./pages/Home";
import { Semesters } from "./pages/Semesters";
import { SemesterPage } from "./pages/SemesterPage";
import { CoursePage } from "./pages/CoursePage";
import { SearchPage } from "./pages/SearchPage";
import { About } from "./pages/About";
import { Contribute } from "./pages/Contribute";
import { NotFound } from "./pages/NotFound";

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
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="semesters" element={<Semesters />} />
            <Route path="semester/:id" element={<SemesterPage />} />
            <Route path="course/:id" element={<CoursePage />} />
            <Route path="search" element={<SearchPage />} />
            <Route path="about" element={<About />} />
            <Route path="contribute" element={<Contribute />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
}
