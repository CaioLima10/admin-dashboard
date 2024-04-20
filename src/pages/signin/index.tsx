import { useState } from "react";
import { Button } from "../../components/button";
import { Input } from "../../components/input";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/hooks";

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
    <form>
      <h1>Registre sua conta</h1>
      <div className="flex flex-col gap-4">
        <Input
          value={email}
          onChange={(event) => [setEmail(event.target.value), setError("")]}
          placeholder="digite um email"
          type="text"
        />
        <Input
          value={password}
          onChange={(event) => [setPassword(event.target.value), setError("")]}
          placeholder="digite sua senha"
          type="password"
        />
        <span>{error}</span>
        <Button type="button" onClick={handleLogin}>
          Registrar
        </Button>

        <div>
          <span>Não tem uma conta?</span>
          <Link to={"/signup"}>&nbsp;Registre-se</Link>
        </div>
      </div>
    </form>
  );
}
