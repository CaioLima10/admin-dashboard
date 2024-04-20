import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { useAuth } from "../../context/hooks";

export function HomePage() {
  const navigate = useNavigate();
  const { signout } = useAuth();

  return (
    <div>
      <Button onClick={() => [signout(), navigate("/")]}>Sair</Button>
    </div>
  );
}
