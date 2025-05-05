declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_API_URL: string;
    REACT_APP_DEBUG: string;
    BANCO_DE_DADOS: string;
    // Adicione outras variáveis aqui
  }
}

type initialMusicArray = {
  id?: number;
  nome: string;
  cantor: string;
};

type avisosType = {
  id?: number;
  titulo: string;
  descrição: string;
};

type apiLiturgy = {
  id?: number;
  tema: string;
  subtema?: string;
  versiculo: string;
  louvoresIniciais: initialMusicArray[];
  pregador: string;
  louvorPosPalavra: initialMusicArray[];
  santaCeia?: boolean;
  louvorCeia?: initialMusicArray[];
  avisos: avisosType[];
};
