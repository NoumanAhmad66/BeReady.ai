import React from "react";

import Footer from "./components/Footer/Footer.jsx";

import Navbar from "./components/Navbar/Navbar.jsx";
import { BrowserRouter as Router ,Route, Routes} from "react-router-dom";

import Solution from "./pages/Solutions/Solution.jsx";
import Home from "./pages/Home/Home.jsx";
import Interview from "./pages/Interview/Interview.jsx";
import InterviewScreen from "./pages/InterviewScreen/InterviewScreen.jsx";


const DefaultLayout = ({ children }) => (
  <>
    <Navbar />
    {children}
    <Footer />
  </>
);

const InterviewLayout = ({ children }) => <>{children}</>;

const App = () => (
  <Router>
    <Routes>
    <Route path="/InterviewScreen" element={<InterviewLayout><InterviewScreen/></InterviewLayout>}/>
      <Route path="/" element={<DefaultLayout><Home /></DefaultLayout>} />
      <Route path="/Solution" element={<DefaultLayout><Solution /></DefaultLayout>} />
      <Route path="/Interview" element={<InterviewLayout><Interview /></InterviewLayout>} />
      
    </Routes>
  </Router>
);

export default App;
