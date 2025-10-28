// AuthContext.tsx
import React, { createContext, useCallback, useEffect, useMemo, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api, { setAuthToken } from '../services/api';

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
      console.log('[AuthContext] login response:', data);

      const dadosUsuario: Usuario = {
        nome: String(data.nome ?? 'Usuário'),
      };

      await AsyncStorage.setItem(CHAVE_SESSAO, JSON.stringify(dadosUsuario));

      if (data.token) {
        await AsyncStorage.setItem(CHAVE_TOKEN, data.token);
        setAuthToken(data.token);
      }

      setUsuario(dadosUsuario);
    } catch (e) {
      console.log('Erro no login:', e);
      throw e;
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
