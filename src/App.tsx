import { AuthProvider } from "./context/auth";
import { RoutesApp } from "./routes";

export function App() {
  return (
    <AuthProvider>
      <RoutesApp />
    </AuthProvider>
  );
}

export default App;
