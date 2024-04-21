import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Input } from "../../components/input";
import { Button } from "../../components/button";
import { useAuth } from "../../context/hooks";
import { Label } from "../../components/label";

import { RiEyeLine } from "react-icons/ri";
import { RiEyeCloseLine } from "react-icons/ri";

import ImageAtronautStudying from "../../assets/astronauta_estudando.png";
import ImageAtronautFloating from "../../assets/astronauta_flutuando_pelo_espaço.png";
import { ImageBottomSoon } from "../../components/imageBottomSoon";
import { emailValidation, nameRegex, passwordRegex } from "./utils/regEx";

export function Signup() {
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const { signup } = useAuth();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [emailConfirm, setEmailConfirm] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isShowPassword, setIsShowPassword] = useState(false);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [isShowPassword]);

  function handleSignup() {
    if (!email || !emailConfirm || !password) {
      setError("Preencha todos os campos");
      return;
    } else if (email !== emailConfirm) {
      setError("Os e-mails não são iguais");
      return;
    }

    const errorMessage = signup(email, password, name);

    if (errorMessage !== null && errorMessage !== undefined) {
      setError(errorMessage);
      return;
    }

    alert("Usuario cadastrado com sucesso");
    navigate("/");
  }

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newEmail = event.target.value;
    setEmail(newEmail);
    setError("");

    if (!emailValidation(newEmail)) {
      setError("Endereço de e-mail inválido");
    } else {
      setError("");
    }
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
    setError("");

    if (!nameRegex(newName)) {
      setError("Nome inválido");
    } else {
      setError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = event.target.value;
    setPassword(newPassword);
    setError("");

    if (!passwordRegex(newPassword)) {
      setError("A senha deve ter pelo menos 6 caracteres");
    } else {
      setError("");
    }
  };

  return (
    <section className="flex w-full screen items-center justify-center bg-zinc-950">
      <div className="hidden md:flex items-center bg-zinc-950 w-full min-h-screen relative">
        <div className="flex items-center justify-center mx-auto">
          <img
            src={ImageAtronautStudying}
            alt="ASTRONAUTA-ESTUDANDO"
            className="absolute left-0 bottom-0 z-10"
          />
          <ImageBottomSoon />
          <img
            src={ImageAtronautFloating}
            alt="ASTRONAUTA-FLUTUANDO"
            className="absolute -right-20 -top-2"
          />
        </div>
      </div>
      <form className="w-full max-w-xl min-h-screen bg-zinc-900 flex flex-col items-center justify-center ">
        <h1 className="mb-2 text-2xl font-bold text-zinc-300">
          Registre sua conta
        </h1>
        <div className="w-[80%] flex flex-col items-center">
          <Label>Nome</Label>
          <Input
            value={name}
            placeholder="Digite seu Nome"
            type="text"
            onChange={handleNameChange}
          />
          <Label>E-mail</Label>
          <Input
            value={email}
            onChange={handleEmailChange}
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
          <div className="w-full max-w-md flex items-center justify-center gap-2">
            <Input
              value={password}
              onChange={handlePasswordChange}
              placeholder="Sua senha"
              type={isShowPassword ? "password" : "text"}
              ref={inputRef}
            />
            <button
              className=" p-2 rounded-full bg-yellow-400 z-10 text-zinc-900 ring-1 ring-zinc-800"
              onClick={() => setIsShowPassword(!isShowPassword)}
              autoFocus
              type="button"
            >
              {!isShowPassword && <RiEyeLine size={16} />}
              {isShowPassword && <RiEyeCloseLine size={16} />}
            </button>
          </div>
          <span className="flex items-center text-red-500 mt-2">{error}</span>
          <Button type="button" onClick={handleSignup}>
            Entrar
          </Button>

          <div className="w-full max-w-md mt-2 ">
            <span className="text-zinc-400">Já tenho conta?</span>
            <Link className="text-cyan-500 font-bold" to={"/signin"}>
              &nbsp;Entrar
            </Link>
          </div>
        </div>
      </form>
    </section>
  );
}
