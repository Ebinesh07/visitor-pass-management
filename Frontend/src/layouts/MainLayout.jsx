import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

const MainLayout = ({ children }) => {
  return (
    <div className="app-layout">

      <Sidebar />

      <div className="main-container">

        <Navbar />

        <main className="main-content">

          {children}

        </main>

      </div>

    </div>
  );
};

export default MainLayout;