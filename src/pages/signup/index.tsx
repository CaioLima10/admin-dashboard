import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useState } from "react";
import { useAuth } from "../../context/hooks";

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
          value={emailConfirm}
          onChange={(event) => [
            setEmailConfirm(event.target.value),
            setError(""),
          ]}
          placeholder="confirme o email"
          type="text"
        />
        <Input
          value={password}
          onChange={(event) => [setPassword(event.target.value), setError("")]}
          placeholder="digite sua senha"
          type="password"
        />
        <span>{error}</span>
        <Button type="button" onClick={handleSignup}>
          Inscreva-se
        </Button>

        <div>
          <span>eu já tenho conta?</span>
          <Link to={"/"}>&nbsp;Entre</Link>
        </div>
      </div>
    </form>
  );
}
