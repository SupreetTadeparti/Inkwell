import { useAuth } from "./AuthContext";
import { Navigate, useSearchParams } from "react-router-dom"

function App() {
  const { authenticated } = useAuth();
  const [searchParams] = useSearchParams();

  return authenticated === false ? <Navigate to={`/?canisterId=${searchParams.get('canisterId')}`} /> : (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
    </main>
  );
}

export default App;
