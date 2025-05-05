import { Container, FormContainer, LoginContainer } from "./styles";
import logo from "./assets/logo.png";
import axios from "axios";
import { useEffect, useState } from "react";

import addButton from "./assets/buttons/add-ellipse-svgrepo-com.svg";
import removeButton from "./assets/buttons/remove-ellipse-svgrepo-com.svg";

function App() {
  //login states
  const [ceia, setCeia] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [loading, setLoading] = useState(false);
  const [logado, setLogado] = useState(false);
  //inputs
  const [userName, setUserName] = useState("");
  const [senha, setSenha] = useState("");

  const [palavraState, setPalavraState] = useState({
    pregador: "",
    tema: "",
    subtema: "",
    passagem: "",
  });

  const [avisos, setAvisos] = useState<avisosType[]>([
    {
      titulo: "",
      descrição: "",
    },
  ]);

  const [musicas, setMusicas] = useState<initialMusicArray[]>([
    {
      nome: "",
      cantor: "",
    },
  ]);

  const [musicasPosPalavra, setMusicasPosPalavra] = useState<
    initialMusicArray[]
  >([
    {
      nome: "",
      cantor: "",
    },
  ]);

  const [musicasCeia, setMusicasCeia] = useState<initialMusicArray[]>([
    {
      nome: "",
      cantor: "",
    },
  ]);

  //Verifica Submit
  function verifySubmit() {
    let camposVazios =
      palavraState.pregador.trim() === "" ||
      palavraState.passagem.trim() === "" ||
      palavraState.tema.trim() === "";

    // Verifica avisos
    for (const aviso of avisos) {
      if (!aviso.titulo?.trim() || !aviso.descrição?.trim()) {
        camposVazios = true;
        break;
      }
    }

    // Verifica louvores iniciais
    for (const musica of musicas) {
      if (!musica.nome?.trim() || !musica.cantor?.trim()) {
        camposVazios = true;
        break;
      }
    }

    // Verifica louvores pós-palavra
    for (const musica of musicasPosPalavra) {
      if (!musica.nome?.trim() || !musica.cantor?.trim()) {
        camposVazios = true;
        break;
      }
    }

    // Verifica louvores da ceia (caso ceia esteja ativa)
    if (ceia) {
      for (const musica of musicasCeia) {
        if (!musica.nome?.trim() || !musica.cantor?.trim()) {
          camposVazios = true;
          break;
        }
      }
    }

    setSubmit(!camposVazios);
  }

  //handle change ceia
  function handleChangeMusicaCeia(
    id: number,
    campo: "nome" | "cantor",
    valor: string
  ) {
    setMusicasCeia((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [campo]: valor } : m))
    );
  }

  function removeMusicCeia() {
    if (musicasCeia.length > 1) {
      setMusicasCeia((prev) => prev.slice(0, -1));
    }
  }

  function addMusicCeia() {
    const novaMusica: initialMusicArray = {
      id: musicasCeia.length + 1,
      nome: "",
      cantor: "",
    };

    setMusicasCeia((prev) => [...prev, novaMusica]);
  }

  //handle change pós palavra
  function handleChangeMusicaPosPalvra(
    id: number,
    campo: "nome" | "cantor",
    valor: string
  ) {
    setMusicasPosPalavra((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [campo]: valor } : m))
    );
  }

  function removeMusicPosPalavra() {
    if (musicasPosPalavra.length > 1) {
      setMusicasPosPalavra((prev) => prev.slice(0, -1));
    }
  }

  function addMusicPosPalavra() {
    const novaMusica: initialMusicArray = {
      id: musicasPosPalavra.length + 1,
      nome: "",
      cantor: "",
    };

    setMusicasPosPalavra((prev) => [...prev, novaMusica]);
  }

  //handle change inicial
  function handleChangeMusica(
    id: number,
    campo: "nome" | "cantor",
    valor: string
  ) {
    setMusicas((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [campo]: valor } : m))
    );
  }

  function removeMusic() {
    if (musicas.length > 1) {
      setMusicas((prev) => prev.slice(0, -1));
    }
  }

  function addMusic() {
    const novaMusica: initialMusicArray = {
      id: musicas.length + 1,
      nome: "",
      cantor: "",
    };

    setMusicas((prev) => [...prev, novaMusica]);
  }

  //handle avisos
  function handleChangeAvisos(
    id: number,
    campo: "titulo" | "descrição",
    valor: string
  ) {
    setAvisos((prev) =>
      prev.map((m) => (m.id === id ? { ...m, [campo]: valor } : m))
    );
  }

  function removeAvisos() {
    if (avisos.length > 1) {
      setAvisos((prev) => prev.slice(0, -1));
    }
  }

  function addAvisos() {
    const novaMusica: avisosType = {
      id: avisos.length + 1,
      titulo: "",
      descrição: "",
    };

    setAvisos((prev) => [...prev, novaMusica]);
  }

  //fetchLogin do admin
  async function fetchLogin(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`http://localhost:8000/admin/login/`, {
        userName: userName,
        senha: senha,
      });

      setLoading(false);
      setLogado(true);
    } catch (error: unknown) {
      setLoading(false);
      alert("ou senha ou usuário, estão errados");
      console.error(error);
    }
  }
  //fetch submit
  async function SubmitFetch(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const postData: apiLiturgy = {
      avisos: avisos,
      louvoresIniciais: musicas,
      louvorPosPalavra: musicasPosPalavra,
      louvorCeia: musicasCeia,
      pregador: palavraState.pregador,
      tema: palavraState.tema,
      subtema: palavraState.subtema,
      versiculo: palavraState.passagem,
      santaCeia: ceia,
    };
    await axios
      .post(`http://localhost:8000/admin/replaceliturgy/`, postData)
      .then((response) => {
        alert("Programação salva");
        console.log(response);
      })
      .catch((error) => {
        alert("Tivemos um erro ao salvar");
        console.error(error);
      });
  }

  //fetch logout
  async function LogoutFetch() {
    await axios
      .post(`http://localhost:8000/admin/logout/`)
      .then(() => {
        alert("Deslogado com sucesso");
        setLogado(false);
      })
      .catch((error) => {
        alert("tivemos algum problema para deslogar");
        console.error(error);
      });
  }

  useEffect(() => {
    verifySubmit();
  }, [
    userName,
    senha,
    palavraState.pregador,
    palavraState.passagem,
    palavraState.subtema,
    palavraState.tema,
    avisos,
    musicas,
    musicasPosPalavra,
    musicasCeia,
    ceia,
  ]);

  return (
    <>
      <Container>
        {!logado ? (
          <>
            <LoginContainer>
              <img src={logo} alt="logo" />
              <h2 className="mb-4">ACESSO</h2>
              <form onSubmit={(e) => fetchLogin(e)}>
                <div className="input-div mb-3">
                  <label htmlFor="userName" className="form-label">
                    Nome de usuário
                  </label>
                  <div className="input-group input-group-sm mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="userName"
                      name="userName"
                      onChange={(e) => setUserName(e.target.value)}
                      value={userName}
                    />
                  </div>
                </div>
                <div className="input-div mb-3">
                  <label htmlFor="senha" className="form-label">
                    Senha
                  </label>
                  <div className="input-group input-group-sm mb-3">
                    <input
                      type="password"
                      className="form-control"
                      id="senha"
                      name="senha"
                      onChange={(e) => setSenha(e.target.value)}
                      value={senha}
                    />
                  </div>
                </div>
                <button
                  disabled={loading}
                  type="submit"
                  className="btn btn-light"
                >
                  Acessar
                </button>
              </form>
            </LoginContainer>
          </>
        ) : (
          <>
            <FormContainer onSubmit={(e) => SubmitFetch(e)}>
              <a
                type="button"
                className="btn btn-danger"
                onClick={() => LogoutFetch()}
              >
                Sair
              </a>
              <img src={logo} alt="" />
              <h2 style={{ color: "grey" }} className="title-form mb-4">
                Defina a programação de domingo
              </h2>
              <div className="form-input tema">
                <label htmlFor="tema">Tema</label>
                <input
                  id="tema"
                  name="tema"
                  type="text"
                  value={palavraState.tema}
                  onChange={(e) =>
                    setPalavraState((t) => ({
                      ...t,
                      tema: e.target.value,
                    }))
                  }
                />
              </div>
              <div className="form-input sub-tema">
                <label htmlFor="subtema">Sub-tema</label>
                <input
                  value={palavraState.subtema}
                  onChange={(e) =>
                    setPalavraState((t) => ({
                      ...t,
                      subtema: e.target.value,
                    }))
                  }
                  id="subtema"
                  name="subtema"
                  type="text"
                />
              </div>
              <div className="form-input versículo">
                <label htmlFor="versiculo">Passagem do tema</label>
                <input
                  value={palavraState.passagem}
                  onChange={(e) =>
                    setPalavraState((t) => ({
                      ...t,
                      passagem: e.target.value,
                    }))
                  }
                  id="versiculo"
                  name="versiculo"
                  type="text"
                />
              </div>
              <div className="form-input pregador mt-3">
                <label htmlFor="pregador">pregador</label>
                <input
                  value={palavraState.pregador}
                  onChange={(e) =>
                    setPalavraState((t) => ({
                      ...t,
                      pregador: e.target.value,
                    }))
                  }
                  id="pregador"
                  name="pregador"
                  type="text"
                />
              </div>
              {/* LOUVORES INICIAIS */}
              <ul className="music-table">
                <label htmlFor="versiculo">Louvores iniciais </label>
                {musicas.map((e) => (
                  <li className="music-item">
                    <div className="form-input card-musica">
                      nome da música
                      <input
                        className="mb-1 "
                        id="musica"
                        name="nome"
                        type="text"
                        value={e.nome}
                        onChange={(ev) =>
                          handleChangeMusica(e.id!, "nome", ev.target.value)
                        }
                      />
                      cantor
                      <input
                        id="musica"
                        name="cantor"
                        type="text"
                        value={e.cantor}
                        onChange={(ev) =>
                          handleChangeMusica(e.id!, "cantor", ev.target.value)
                        }
                      />
                    </div>
                  </li>
                ))}
                <div className="buttons">
                  <img
                    onClick={() => addMusic()}
                    src={addButton}
                    alt="adicionar música"
                  />
                  <img
                    onClick={() => removeMusic()}
                    src={removeButton}
                    alt="remover música"
                  />
                </div>
              </ul>
              {/* LOUVORES PÓS PALAVRA */}
              <ul className="music-table mt-4">
                <label htmlFor="versiculo">Louvores pós palavra </label>
                {musicasPosPalavra.map((e) => (
                  <li className="music-item">
                    <div className="form-input card-musica">
                      nome da música
                      <input
                        className="mb-1 "
                        id="musica"
                        name="nome"
                        type="text"
                        value={e.nome}
                        onChange={(ev) =>
                          handleChangeMusicaPosPalvra(
                            e.id!,
                            "nome",
                            ev.target.value
                          )
                        }
                      />
                      cantor
                      <input
                        id="musica"
                        name="cantor"
                        type="text"
                        value={e.cantor}
                        onChange={(ev) =>
                          handleChangeMusicaPosPalvra(
                            e.id!,
                            "cantor",
                            ev.target.value
                          )
                        }
                      />
                    </div>
                  </li>
                ))}
                <div className="buttons">
                  <img
                    onClick={() => addMusicPosPalavra()}
                    src={addButton}
                    alt="adicionar música"
                  />
                  <img
                    onClick={() => removeMusicPosPalavra()}
                    src={removeButton}
                    alt="remover música"
                  />
                </div>
              </ul>
              {/* SWITCH CEIA */}
              <div className="form-check form-switch mt-4 ">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="switchCheckDefault"
                  onChange={(e) => setCeia(e.target.checked)}
                />
                <label
                  className="form-check-label"
                  htmlFor="switchCheckDefault"
                >
                  Teremos ceia?
                </label>
              </div>
              {/* LOUVORES CEIA */}
              {ceia && (
                <>
                  <ul className="music-table">
                    <label htmlFor="versiculo">Louvores Ceia </label>
                    {musicasCeia.map((e) => (
                      <li className="music-item">
                        <div className="form-input card-musica">
                          nome da música
                          <input
                            className="mb-1 "
                            id="musica"
                            name="nome"
                            type="text"
                            value={e.nome}
                            onChange={(ev) =>
                              handleChangeMusicaCeia(
                                e.id!,
                                "nome",
                                ev.target.value
                              )
                            }
                          />
                          cantor
                          <input
                            id="musica"
                            name="cantor"
                            type="text"
                            value={e.cantor}
                            onChange={(ev) =>
                              handleChangeMusicaCeia(
                                e.id!,
                                "cantor",
                                ev.target.value
                              )
                            }
                          />
                        </div>
                      </li>
                    ))}
                    <div className="buttons">
                      <img
                        onClick={() => addMusicCeia()}
                        src={addButton}
                        alt="adicionar música"
                      />
                      <img
                        onClick={() => removeMusicCeia()}
                        src={removeButton}
                        alt="remover música"
                      />
                    </div>
                  </ul>
                </>
              )}
              {/* AVISOS */}
              <ul className="music-table mt-4">
                <label htmlFor="versiculo">Avisos </label>
                {avisos.map((e) => (
                  <li className="music-item">
                    <div className="form-input card-musica">
                      Título
                      <input
                        className="mb-1 "
                        id="musica"
                        name="titulo"
                        type="text"
                        value={e.titulo}
                        onChange={(ev) =>
                          handleChangeAvisos(e.id!, "titulo", ev.target.value)
                        }
                      />
                      descrição
                      <textarea
                        id="musica"
                        name="descricao"
                        value={e.descrição}
                        style={{
                          padding: "4px",
                          border: "1px solid grey",
                          borderRadius: "8px",
                        }}
                        onChange={(ev) =>
                          handleChangeAvisos(
                            e.id!,
                            "descrição",
                            ev.target.value
                          )
                        }
                      />
                    </div>
                  </li>
                ))}
                <div className="buttons">
                  <img
                    onClick={() => addAvisos()}
                    src={addButton}
                    alt="adicionar música"
                  />
                  <img
                    onClick={() => removeAvisos()}
                    src={removeButton}
                    alt="remover música"
                  />
                </div>
              </ul>
              {/* SUBMIT */}
              <button
                disabled={!submit}
                style={{
                  border: "1px solid grey",
                  boxShadow: "0px 5px 5px rgba(0,0,0,0.3)",
                }}
                type="submit"
                className="btn btn-light mt-4"
              >
                Salvar
              </button>
            </FormContainer>
          </>
        )}
      </Container>
    </>
  );
}

export default App;
