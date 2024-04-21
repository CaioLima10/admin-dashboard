import { useNavigate } from "react-router-dom";
import { Button } from "../../components/button";
import { useAuth } from "../../context/hooks";

export function HomePage() {
  const navigate = useNavigate();
  const { signout, user } = useAuth();

  const firstLetter = user?.name.substring(0, 1);

  return (
    <div>
      <div className="flex items-center text-base gap-2">
        <div className="w-8 h-8 rounded-full bg-zinc-500">
          <span className="text-zinc-100 w-full h-full flex items-center justify-center">
            {firstLetter}
          </span>
        </div>
        <span>{user?.name}</span>
      </div>

      <Button onClick={() => [signout(), navigate("/")]}>Sair</Button>
    </div>
  );
}
