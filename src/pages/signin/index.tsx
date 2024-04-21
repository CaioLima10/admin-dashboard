import { useEffect, useRef, useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks";
import { Label } from "../../components/label";

import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";

export function Signin() {
  const inputRef = useRef<HTMLInputElement>(null);

  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    if (inputRef.current && isShowPassword) {
      inputRef.current.focus();
    }
  }, [isShowPassword]);

  function handleLogin() {
    if (!email || !password) {
      setError("Preencha todos os campos");
      return;
    }

    const errorMessage = signin(email, password);

    if (errorMessage !== null && errorMessage !== undefined) {
      setError(errorMessage);
      return;
    }

    navigate("/home");
  }

  return (
    <section className="flex w-full min-h-screen items-center justify-center bg-zinc-950">
      <div className="hidden md:flex items-center bg-zinc-950 w-full min-h-screen"></div>
      <form className="w-full max-w-xl min-h-screen bg-zinc-900 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold text-zinc-300">
          Acessar sua conta
        </h1>
        <div className="w-[80%] flex flex-col items-center ">
          <Label>E-mail</Label>
          <Input
            value={email}
            onChange={(event) => [setEmail(event.target.value), setError("")]}
            placeholder="Seu e-mail"
            type="text"
          />
          <Label>Senha</Label>
          <div className="w-full max-w-md flex items-center justify-center gap-2">
            <Input
              value={password}
              onChange={(event) => [
                setPassword(event.target.value),
                setError(""),
              ]}
              placeholder="Sua senha"
              type={isShowPassword ? "password" : "text"}
              ref={inputRef}
            />
            <button
              className=" p-2 rounded-full bg-green-500 z-10 text-zinc-900 ring-1 ring-zinc-800"
              onClick={() => setIsShowPassword(!isShowPassword)}
              autoFocus
              type="button"
            >
              {!isShowPassword && <RiEyeLine size={16} />}
              {isShowPassword && <RiEyeCloseLine size={16} />}
            </button>
          </div>
          <span className="flex items-center text-red-500 mt-2">{error}</span>
          <Button type="button" onClick={handleLogin}>
            Registrar
          </Button>

          <div className="w-full max-w-md mt-2 ">
            <span className="text-zinc-400">Não tem uma conta?</span>
            <Link className="text-blue-500" to={"/signup"}>
              &nbsp;Registre-se
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
