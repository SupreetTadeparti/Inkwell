import { useAuth } from "./AuthContext";
import { Navigate, useSearchParams } from "react-router-dom"

function App() {
  const { actor } = useAuth();
  const [searchParams] = useSearchParams();

  if (actor === null) return <Navigate to={`/?canisterId=${searchParams.get('canisterId')}`} />

  return (
    <main>
      <img src="/logo2.svg" alt="DFINITY logo" />
    </main>
  );
}

export default App;
