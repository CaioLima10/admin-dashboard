import { useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks";
import { Label } from "../../components/label";

export function Signin() {
  const { signin } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

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
    <section className="flex">
      <div className="flex items-center bg-zinc-950 w-full max-w-5xl h-screen"></div>
      <form className="w-full max-w-2xl h-screen bg-zinc-900 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold text-zinc-300">
          Acessar sua conta
        </h1>
        <div className="w-full flex flex-col items-center ">
          <Label>E-mail</Label>
          <Input
            value={email}
            onChange={(event) => [setEmail(event.target.value), setError("")]}
            placeholder="Seu e-mail"
            type="text"
          />
          <Label>Senha</Label>
          <Input
            value={password}
            onChange={(event) => [
              setPassword(event.target.value),
              setError(""),
            ]}
            placeholder="Sua senha"
            type="password"
          />
          <span>{error}</span>
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
