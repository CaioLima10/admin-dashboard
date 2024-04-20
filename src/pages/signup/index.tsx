import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useState } from "react";
import { useAuth } from "../../context/hooks";
import { Label } from "../../components/label";

export function Signup() {
  const navigate = useNavigate();
  const { signup } = useAuth();

  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  function handleSignup() {
    if (!email || !emailConfirm || !password) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConfirm) {
      setError("Os e-mails não são iguais");
      return;
    }

    const errorMessage = signup(email, password);

    if (errorMessage !== null && errorMessage !== undefined) {
      setError(errorMessage);
      return;
    }

    alert("Usuario cadastrado com sucesso");
    navigate("/");
  }

  return (
    <section className="flex">
      <div className="hidden md:flex items-center bg-zinc-950 w-full max-w-5xl h-screen"></div>
      <form className="w-full md:max-w-2xl h-screen bg-zinc-900 flex flex-col items-center justify-center duration-300">
        <h1 className="mb-4 text-2xl font-bold text-zinc-300">
          Registre sua conta
        </h1>
        <div className="w-[80%] flex flex-col items-center">
          <Label>E-mail</Label>
          <Input
            value={email}
            onChange={(event) => [setEmail(event.target.value), setError("")]}
            placeholder="Seu e-mail"
            type="text"
          />
          <Label>Confirmar E-mail</Label>
          <Input
            value={emailConfirm}
            onChange={(event) => [
              setEmailConfirm(event.target.value),
              setError(""),
            ]}
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
          <span className="flex items-center text-red-500 mt-2">{error}</span>
          <Button type="button" onClick={handleSignup}>
            Entrar
          </Button>

          <div className="w-full max-w-md mt-2 ">
            <span className="text-zinc-400">Já tenho conta?</span>
            <Link className="text-blue-500" to={"/signin"}>
              &nbsp;Entrar
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
