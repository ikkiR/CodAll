// AuthContext.tsx
// React + React Native imports
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Instância axios configurada e helper para setar Authorization header
import api, { setAuthToken } from '../services/api';

// Biblioteca pequena para decodificar JWT sem validar assinatura.
// Usada apenas para extrair campos do payload no cliente (não substitui validação do servidor).
// `jwt-decode` exports may not expose a default in some TS configs; import as namespace
// NOTA: em alguns ambientes a importação de `jwt-decode` pode ter problemas de compatibilidade
// (ex.: `jwt_decode is not a function`). Para evitar dependências e garantir portabilidade
// decodificamos o payload do JWT manualmente com base64url. Isso NÃO valida assinatura.

function base64UrlDecode(input: string): string {
  // converte base64url para base64
  let base64 = input.replace(/-/g, '+').replace(/_/g, '/');
  // adiciona padding
  while (base64.length % 4) base64 += '=';

  // tenta várias estratégias para decodificar base64 -> string
  if (typeof globalThis.atob === 'function') {
    // atob disponível (browsers / alguns ambientes RN)
    try {
      // atob retorna latin1; precisamos garantir UTF-8
      const binary = globalThis.atob(base64);
      // decode UTF-8
      try {
        return decodeURIComponent(
          Array.prototype.map
            .call(binary, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
            .join('')
        );
      } catch (_) {
        return binary;
      }
    } catch (e) {
      // fallthrough
    }
  }

  if (typeof Buffer !== 'undefined') {
    return Buffer.from(base64, 'base64').toString('utf8');
  }

  // último recurso: try atob from global (older RN) or throw
  if (typeof (global as any).atob === 'function') {
    const binary = (global as any).atob(base64);
    try {
      return decodeURIComponent(
        Array.prototype.map
          .call(binary, (c: string) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
          .join('')
      );
    } catch (_) {
      return binary;
    }
  }

  throw new Error('Nenhum decodificador base64 disponível no ambiente');
}

function decodeJwtPayload(token: string): any | null {
  try {
    const parts = token.split('.');
    if (parts.length < 2) return null;
    const payload = parts[1];
    const json = base64UrlDecode(payload);
    return JSON.parse(json);
  } catch (e) {
    console.log('Erro ao decodificar JWT manualmente:', e);
    return null;
  }
}

// Tipo do usuário
export type Usuario = {
  nome: string;
};

// Tipos do contexto
type DadosContextoAuth = {
  usuario: Usuario | null;
  carregando: boolean;
  entrar: (login: string, senha: string) => Promise<void>;
  sair: () => Promise<void>;
  carregarSessao: () => Promise<void>;
};

// --- Helper: decodificar token JWT e extrair o ID do usuário ---
// Observações:
// - Decodificar o token no cliente NÃO valida sua assinatura ou integridade.
// - Sempre confie no servidor para autenticação/autorização. Use este helper apenas
//   para conveniência (ex.: montar uma rota /usuarios/:id) quando não houver /usuarios/me.

// Tipos possíveis do payload (aceitamos vários formatos comuns)
type JwtPayload = {
  // payload pode ter um objeto `sub` com campos do usuário
  sub?: any;
  // ou campos planos como `id`, `userId`, `userid`
  id?: number | string;
  userId?: number | string;
  userid?: number | string;
  exp?: number; // expiração (unix seconds)
  [key: string]: any;
};

// Chave usada no AsyncStorage para armazenar o token
const TOKEN_KEY = '@codeall:token';

/**
 * getUserIdFromToken
 * - Lê o token do AsyncStorage e tenta decodificar o payload JWT
 * - Procura por campos comuns que representem o id do usuário
 * - Retorna `number | string | null` dependendo do conteúdo do payload
 */
export async function getUserIdFromToken(): Promise<number | string | null> {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (!token) return null;

  // Decodifica o payload do JWT usando implementacao local
  const payload = decodeJwtPayload(token) as JwtPayload;

    // Tenta diferentes formatos comuns usado por backends
    let id =
      payload?.sub?.id ?? // ex.: { sub: { id: 3, nome: '...' } }
      payload?.sub ?? // ex.: sub = 3
      payload?.id ??
      payload?.userId ??
      payload?.userid ??
      null;

    // Se id for string numérica, converte para number (o backend espera int nas rotas)
    if (typeof id === 'string' && /^[0-9]+$/.test(id)) {
      id = Number(id);
    }

    return id ?? null;
  } catch (e) {
    // Log não mostra o token completo, só o erro da decodificação
    console.log('Erro ao decodificar token:', e);
    return null;
  }
}


// Contexto padrão
export const AuthContext = createContext<DadosContextoAuth>({
  usuario: null,
  carregando: false,
  async entrar() {},
  async sair() {},
  async carregarSessao() {},
});

type ProvedorAuthProps = { children: React.ReactNode };

export function ProvedorAuth({ children }: ProvedorAuthProps) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [carregando, setCarregando] = useState(true);

  const CHAVE_SESSAO = '@codeall:sessao';
  const CHAVE_TOKEN = '@codeall:token';

  // Carrega sessão ao iniciar o app
  const carregarSessao = useCallback(async () => {
    setCarregando(true);
    try {
      const [sessao, token] = await Promise.all([
        AsyncStorage.getItem(CHAVE_SESSAO),
        AsyncStorage.getItem(CHAVE_TOKEN),
      ]);

      if (sessao) setUsuario(JSON.parse(sessao));
      if (token) setAuthToken(token || null);
        // DEBUG (mascarado): confirma que existe um token salvo sem expor todo o valor
        try {
          const masked = token ? `${String(token).slice(0,6)}...${String(token).slice(-6)}` : null;
          console.log('[AuthContext] token (mascarado) ao carregar sessão:', masked);
        } catch (e) {
          // ignore
        }
    } catch (e) {
      console.log('Erro ao carregar sessão:', e);
    } finally {
      setCarregando(false);
    }
  }, []);

  useEffect(() => {
    carregarSessao();
  }, [carregarSessao]);

  // Login
  const entrar = useCallback(async (login: string, senha: string) => {
    setCarregando(true);
    try {
      const resp = await api.post('/usuarios/login', { login, senha });
      const data = resp.data;

      // O backend pode retornar diferentes formatos: { token, usuario: { nome } } ou { token, nome }
      const nomeDoServidor =
        data?.usuario?.nome || data?.usuario?.name || data?.nome || data?.name || (data && typeof data === 'string' ? data : null) || 'Usuário';

      const dadosUsuario: Usuario = {
        nome: String(nomeDoServidor),
      };

      await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(dadosUsuario));

      if (data.token) {
        await AsyncStorage.setItem(CHAVE_TOKEN, data.token);
        setAuthToken(data.token);
      }

      setUsuario(dadosUsuario);
    } catch (e: any) {
      console.log('Erro no login:', e);

      // extrai mensagem do servidor (defensivo)
  const respData = e?.response?.data;
  let serverMsg: string = '';

      if (respData) {
        if (typeof respData === 'string') {
          serverMsg = respData;
        } else if (typeof respData === 'object') {
          // procura campos comuns
          serverMsg = respData.mensagem || respData.message || respData.erro || respData.error || null;
          // se não encontramos uma string útil, stringify como fallback (limitado)
          if (!serverMsg) {
            try {
              serverMsg = JSON.stringify(respData);
            } catch (_err) {
              serverMsg = String(respData);
            }
          }
        }
      }

  // fallback para error.message ou texto padrão
  serverMsg = serverMsg || String(e?.message ?? 'Erro ao realizar login');

  // truncar para evitar logs/exposição muito longos
  if (serverMsg.length > 800) serverMsg = serverMsg.slice(0, 800) + '...';

  // lança um Error com mensagem amigável para o frontend
  throw new Error(serverMsg);
    } finally {
      setCarregando(false);
    }
  }, []);

  // Logout
  const sair = useCallback(async () => {
    setCarregando(true);
    try {
      await AsyncStorage.multiRemove([CHAVE_SESSAO, CHAVE_TOKEN]);
      setAuthToken(null);
      setUsuario(null);
    } catch (e) {
      console.log('Erro ao sair:', e);
    } finally {
      setCarregando(false);
    }
  }, []);

  const valor = useMemo(
    () => ({ usuario, carregando, entrar, sair, carregarSessao }),
    [usuario, carregando, entrar, sair, carregarSessao]
  );

  return <AuthContext.Provider value={valor}>{children}</AuthContext.Provider>;
}

export default AuthContext;
