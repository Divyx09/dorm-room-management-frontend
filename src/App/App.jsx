import AppRouter from "./router/AppRouter";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const App = () => {
  return (
    <div>
      <Navbar />
      <AppRouter />
      <Footer />
    </div>
  );
};

export default App;
