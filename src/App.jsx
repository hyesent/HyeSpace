import { BrowserRouter, Routes, Route } from "react-router-dom";
import { StoreProvider } from "./context/StoreContext";
import { Toast } from "./components/UI";
import { useStore } from "./context/StoreContext";
import Header from "./components/Header";
import HomePage from "./pages/HomePage";
import AccountPage from "./pages/AccountPage";
import VerifyPage from "./pages/VerifyPage";

const AppShell = () => {
  const { toast } = useStore();

  return (
    <div className="app">
      <Header />
      <main className="main">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/verify" element={<VerifyPage />} />
        </Routes>
      </main>
      <Toast message={toast.message} visible={toast.visible} />
    </div>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <StoreProvider>
        <AppShell />
      </StoreProvider>
    </BrowserRouter>
  );
};

export default App;