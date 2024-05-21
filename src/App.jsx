import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StoreProvider } from "./store/StoreContext"
import Portfolio from "./components/pages/developer/dashboard/portfolio/Portfolio"
import Home from "./components/pages/developer/ui/Home"
import Banner from "./components/pages/developer/dashboard/banner/Banner"
import About from "./components/pages/developer/dashboard/about/About"
import Exp from "./components/pages/developer/dashboard/exp/Exp"
import Welcome from "./components/pages/developer/dashboard/welcome/Welcome"
import Services from "./components/pages/developer/dashboard/services/Services"
import Cta from "./components/pages/developer/dashboard/cta/Cta"
import Contact from "./components/pages/developer/dashboard/contact/Contact"
import UiContact from "./components/pages/developer/ui/contact/UiContact"
import ProjectsPage from "./components/pages/developer/ui/ProjectsPage"
import Projects from "./components/pages/developer/dashboard/projects/Projects"
import Login from "./components/pages/developer/access/Login"
import ForgotPassword from "./components/pages/developer/access/ForgotPassword"
import CreatePassword from "./components/pages/developer/access/CreatePassword"
import Users from "./components/pages/developer/dashboard/user/Users"
import PageNotFound from "./components/partials/PageNotFound"

function App() {
  const queryClient = new QueryClient

  return (
    <>
    <QueryClientProvider client={queryClient}>
    <StoreProvider>
      <Router>
        <Routes>
        <Route path="/dashboard" element={<Welcome/>}/>
        <Route path="/portfolio" element={<Portfolio/>}/>
        <Route path="/banner" element={<Banner/>}/>
        <Route path="/about" element={<About/>}/>
        <Route path="/experience" element={<Exp/>}/>
        <Route path="/projects" element={<ProjectsPage/>}/>
        <Route path="/project" element={<Projects/>}/>
        <Route path="/contact" element={<UiContact/>}/>
        <Route path="/contacts" element={<Contact/>}/>
        <Route path="/services" element={<Services/>}/>
        <Route path="/cta" element={<Cta/>}/>

        {/* // */}
        <Route path="/home" element={<Home/>}/>
        <Route path="/users" element={<Users/>}/>


        <Route path="/login" element={<Login/>}/>
        <Route path="/forgot-password" element={<ForgotPassword/>}/>
        <Route path="/create-password" element={<CreatePassword/>}/>
        <Route path="/*" element={<PageNotFound/>}/>

        </Routes>
      </Router>
      </StoreProvider>
      </QueryClientProvider>
    </>
  )
}

export default App
