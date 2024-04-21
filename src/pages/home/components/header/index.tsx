import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/button";
import { useAuth } from "../../../../context/hooks";
import { useState } from "react";

export function Header() {
  const navigate = useNavigate();
  const { signout, user } = useAuth();
  const [isModalShow, setIsModalShow] = useState(false);

  const firstLetter = user?.name.substring(0, 1);

  function handleIsModalShow() {
    setIsModalShow(!isModalShow);
  }

  return (
    <header className="w-full min-h-16 px-6 p-2 bg-zinc-950 relative">
      <button
        onClick={handleIsModalShow}
        className="flex items-center text-base gap-2 ring-1 p-1 px-6 ring-zinc-800"
      >
        <div className="w-12 h-12 rounded-full bg-zinc-800">
          <span className="text-yellow-400 text-xl w-full h-full flex items-center justify-center">
            {firstLetter}
          </span>
        </div>
        <div className="flex flex-col">
          <span className="text-base font-semibold text-yellow-400">
            {user?.name}
          </span>
          <small className="text-zinc-500">Aluno(a)</small>
        </div>
      </button>
      {isModalShow ? (
        <div className="bg-zinc-900 ring-1 ring-zinc-800 w-44 p-4 mt-2 absolute">
          <Button onClick={() => [signout(), navigate("/")]}>Sair</Button>
        </div>
      ) : (
        ""
      )}
    </header>
  );
}
