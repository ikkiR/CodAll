import React, { useEffect, useState, useContext } from 'react';
import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { styles } from './styles';
import { AuthContext, getUserIdFromToken } from '../../global/AuthContext';
import api from '../../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

// Prefixo usado para armazenar overrides locais por usuário (edições temporárias)
const STORAGE_OVERRIDE_KEY_PREFIX = '@codeall:perfil_override';

export default function Perfil() {
  const navigation = useNavigation<any>();
  const { usuario, carregarSessao } = useContext(AuthContext);

  const [carregando, setCarregando] = useState<boolean>(true);
  const [salvando, setSalvando] = useState<boolean>(false);
  const [editando, setEditando] = useState<boolean>(false);

  const [dados, setDados] = useState<any | null>(null);

  // estados de formulário
  const [form, setForm] = useState({
    name: '',
    phone: '',
    cpf: '',
    cep: '',
    address: '',
    number: '',
    complement: '',
    district: '',
    city: '',
    email: '',
    // campos de senha (não pré-preenchidos por segurança)
    senha_atual: '',
    nova_senha: '',
  });

  // carrega perfil ao montar
  useEffect(() => {
    let mounted = true;

    async function carregarPerfil() {
      setCarregando(true);
      try {
        // obtém id do token (assíncrono)
        const idRaw = await getUserIdFromToken();

        // garante que usamos um inteiro para a rota /usuarios/<int:id>
        let userId: number | null = null;
        if (idRaw != null) {
          const n = Number(idRaw);
          if (!Number.isNaN(n) && Number.isInteger(n)) {
            userId = n;
          } else {
            console.log('[Perfil] id do token não é inteiro válido, usando fallback /usuarios/me - idRaw:', idRaw);
          }
        }

        const attemptUrl = userId !== null ? `/usuarios/${userId}` : '/usuarios/me';

        // DEBUG: log da URL que vamos chamar e headers atuais do axios (útil para verificar Authorization)
        try {
          console.log('[Perfil] Tentando GET', attemptUrl);
          console.log('[Perfil] axios defaults headers:', api.defaults?.headers?.common);
          // log mascarado do token salvo no AsyncStorage (não expor token completo)
          try {
            const tokenDbg = await AsyncStorage.getItem('@codeall:token');
            const maskedToken = tokenDbg ? `${String(tokenDbg).slice(0,6)}...${String(tokenDbg).slice(-6)}` : null;
            console.log('[Perfil] token (mascarado):', maskedToken);
          } catch (e) {
            // ignore
          }
        } catch (e) {
          // ignore
        }

  // faz a chamada para a URL apropriada
  let resp: any;
  resp = await api.get(attemptUrl);

        if (!mounted) return;

        // Tenta normalizar o objeto de usuário a partir de diferentes possíveis respostas
        let base = resp.data;
        // alguns backends retornam { user: {...} } ou { data: {...} }
        if (base?.user) base = base.user;
        if (base?.data) base = base.data;

        // merge com overrides locais (se existirem) - chave por usuário
        try {
          const overrideKey = `${STORAGE_OVERRIDE_KEY_PREFIX}:${userId ?? 'anon'}`;
          const ovTxt = await AsyncStorage.getItem(overrideKey);
          if (ovTxt) {
            const ov = JSON.parse(ovTxt);
            base = { ...base, ...ov };
          }
        } catch (e) {
          // ignore
        }

        setDados(base);

        setForm({
          // preferir chaves em português (vindo do backend), fallback para versões em inglês
          name: (base.nome ?? base.name ?? '') as string,
          phone: (base.telefone ?? base.phone ?? '') as string,
          cpf: (base.cpf ?? '') as string,
          cep: (base.cep ?? '') as string,
          address: (base.endereco ?? base.address ?? '') as string,
          number: (base.numero ?? base.number ?? '') as string,
          complement: (base.complemento ?? base.complement ?? '') as string,
          district: (base.bairro ?? base.district ?? '') as string,
          city: (base.cidade ?? base.city ?? '') as string,
          email: (base.email ?? '') as string,
          // não preencher campos de senha a partir do backend
          senha_atual: '',
          nova_senha: '',
        });
      } catch (err: any) {
          // DEBUG: informações detalhadas para diagnóstico
          console.log('[Perfil] Erro ao carregar perfil. url:', err?.config?.url);
          console.log('[Perfil] status:', err?.response?.status);
          console.log('[Perfil] response data:', err?.response?.data);
          console.log('[Perfil] request headers sent:', err?.config?.headers);

          console.log('Erro ao carregar perfil:', err?.response?.data ?? err);
          Alert.alert('Erro', err?.response?.data?.message ?? 'Falha ao carregar perfil.');
      } finally {
        if (mounted) setCarregando(false);
      }
    }

    carregarPerfil();
    return () => {
      mounted = false;
    };
  }, [carregarSessao, usuario]);

  // Função para detectar se houve alterações
  function houveAlteracao() {
    if (!dados) return true;
    if ((form.name || '').trim() !== (dados.name ?? dados.nome ?? '').trim()) return true;
    if ((form.phone || '') !== (dados.phone ?? dados.telefone ?? '')) return true;
    if ((form.cpf || '') !== (dados.cpf ?? '')) return true;
    if ((form.cep || '') !== (dados.cep ?? '')) return true;
    if ((form.address || '') !== (dados.address ?? dados.endereco ?? '')) return true;
    if ((form.number || '') !== (dados.number ?? dados.numero ?? '')) return true;
    if ((form.complement || '') !== (dados.complement ?? dados.complemento ?? '')) return true;
    if ((form.district || '') !== (dados.district ?? dados.bairro ?? '')) return true;
    if ((form.city || '') !== (dados.city ?? dados.cidade ?? '')) return true;
    // se usuário preencheu qualquer campo de senha, considerar alteração
    if ((form.senha_atual || '').trim() !== '') return true;
    if ((form.nova_senha || '').trim() !== '') return true;
    return false;
  }

  // Envia atualização para o servidor (PUT) e salva override local
  const onSalvar = async () => {
    try {
      if (!houveAlteracao()) {
        Alert.alert('Info', 'Nenhuma alteração para salvar.');
        return;
      }

      setSalvando(true);

      // payload com os campos editáveis
      // NOTE: o backend espera campos em português (ex: nome, telefone, endereco, bairro, cidade)
      const payload: any = {
        nome: (form.name || '').trim(),
        telefone: form.phone,
        cpf: form.cpf,
        cep: form.cep,
        endereco: form.address,
        numero: form.number,
        complemento: form.complement,
        bairro: form.district,
        cidade: form.city,
      };

      // Validação local: se nova senha foi informada, exigir a senha atual
      if ((form.nova_senha || '').trim() !== '' && (form.senha_atual || '').trim() === '') {
        Alert.alert('Erro', 'Informe sua senha atual para alterar para a nova senha.');
        setSalvando(false);
        return;
      }

      // incluir campos de senha no payload apenas quando necessário
      if ((form.senha_atual || '').trim() !== '' || (form.nova_senha || '').trim() !== '') {
        payload.senha_atual = form.senha_atual;
        payload.nova_senha = form.nova_senha;
      }

      // tenta obter id para usar rota /usuarios/<int:id>, senão usa /usuarios/me
      const idRaw = await getUserIdFromToken();
      let userId: number | null = null;
      if (idRaw != null) {
        const n = Number(idRaw);
        if (!Number.isNaN(n) && Number.isInteger(n)) userId = n;
      }

      try {
        if (userId !== null) {
          await api.put(`/usuarios/${userId}`, payload);
        } else {
          await api.put('/usuarios/me', payload);
        }
      } catch (err: any) {
        // Se PUT falhar, tentamos POST em rota alternativa (alguns backends usam POST)
        console.log('PUT falhou, tentando POST de fallback:', err?.response?.data ?? err);
        try {
          if (userId !== null) {
            await api.post(`/usuarios/${userId}`, payload);
          } else {
            await api.post('/usuarios/me', payload);
          }
        } catch (err2: any) {
          throw err2;
        }
      }

      // salva override local para persistir edição no cliente (chave por usuário)
      try {
        const override = { ...payload };
        const overrideKey = `${STORAGE_OVERRIDE_KEY_PREFIX}:${userId ?? 'anon'}`;
        await AsyncStorage.setItem(overrideKey, JSON.stringify(override));
      } catch (e) {
        console.log('Erro ao salvar override local:', e);
      }

  // atualiza estado local e sessão se necessário
  const novoDados = { ...dados, ...payload };
  setDados(novoDados);
  // limpa campos sensíveis do formulário
  setForm((s) => ({ ...s, senha_atual: '', nova_senha: '' }));
  setEditando(false);

      // se nome mudou, atualiza sessão para refletir cabeçalho
      try {
        const sessaoTxt = await AsyncStorage.getItem('@codeall:sessao');
        if (sessaoTxt) {
          const sessao = JSON.parse(sessaoTxt);
          if (sessao && sessao.nome !== (payload.nome || '').trim()) {
            const novo = { ...sessao, nome: (payload.nome || '').trim() };
            await AsyncStorage.setItem('@codeall:sessao', JSON.stringify(novo));
            // recarrega sessão em AuthContext
            await carregarSessao();
          }
        }
      } catch (e) {
        // ignore
      }

      Alert.alert('Sucesso', 'Dados atualizados com sucesso.');
    } catch (e: any) {
      console.log('Erro ao salvar perfil:', e?.response?.data ?? e);
      Alert.alert('Erro', e?.response?.data?.message ?? 'Falha ao salvar alterações.');
    } finally {
      setSalvando(false);
    }
  };

  if (carregando) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}> 
        <ActivityIndicator size="small" />
      </View>
    );
  }

  if (!dados) {
    return (
      <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}> 
        <Text style={styles.textoValor}>Nenhum dado encontrado.</Text>
      </View>
    );
  }

  const itens: Array<{ rotulo: string; valor: string | null | undefined }> = [
    { rotulo: 'Nome', valor: dados.name ?? dados.nome },
    { rotulo: 'E-mail', valor: dados.email },
    { rotulo: 'Telefone', valor: dados.phone ?? dados.telefone ?? '' },
    { rotulo: 'CPF', valor: dados.cpf ?? '' },
    { rotulo: 'CEP', valor: dados.cep ?? '' },
    { rotulo: 'Endereço', valor: dados.address ?? dados.endereco ?? '' },
    { rotulo: 'Número', valor: dados.number ?? dados.numero ?? '' },
    { rotulo: 'Complemento', valor: dados.complement ?? dados.complemento ?? '' },
    { rotulo: 'Bairro', valor: dados.district ?? dados.bairro ?? '' },
    { rotulo: 'Cidade', valor: dados.city ?? dados.cidade ?? '' },
  ];

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <Text style={styles.titulo}>Meus dados</Text>
      {!editando ? (
        <>
          {itens.map((item) => (
            <View key={item.rotulo} style={styles.linha}>
              <Text style={styles.textoRotulo}>{item.rotulo}:</Text>
              <Text style={styles.textoValor}>{item.valor || '-'}</Text>
            </View>
          ))}
          <Button title="Editar" onPress={() => setEditando(true)} />
          <View style={{ height: 8 }} />
          <Button 
            title="⚙️ Configurar Servidor" 
            onPress={() => navigation.navigate('ConfigurarServidor')} 
          />
        </>
      ) : (
        <>
          <Input title="Nome" value={form.name} onChangeText={(t) => setForm((s) => ({ ...s, name: t }))} />
          <Input title="Telefone" value={form.phone} onChangeText={(t) => setForm((s) => ({ ...s, phone: t }))} keyboardType="phone-pad" />
          <Input title="CPF" value={form.cpf} onChangeText={(t) => setForm((s) => ({ ...s, cpf: t }))} />
          <Input title="CEP" value={form.cep} onChangeText={(t) => setForm((s) => ({ ...s, cep: t }))} keyboardType="number-pad" />
          <Input title="Endereço" value={form.address} onChangeText={(t) => setForm((s) => ({ ...s, address: t }))} />
          <Input title="Número" value={form.number} onChangeText={(t) => setForm((s) => ({ ...s, number: t }))} keyboardType="number-pad" />
          <Input title="Complemento" value={form.complement} onChangeText={(t) => setForm((s) => ({ ...s, complement: t }))} />
          <Input title="Bairro" value={form.district} onChangeText={(t) => setForm((s) => ({ ...s, district: t }))} />
          <Input title="Cidade" value={form.city} onChangeText={(t) => setForm((s) => ({ ...s, city: t }))} />
          {/* Campos de senha (edição) */}
          <Input title="Senha atual" value={form.senha_atual} onChangeText={(t) => setForm((s) => ({ ...s, senha_atual: t }))} secureTextEntry />
          <Input title="Nova senha" value={form.nova_senha} onChangeText={(t) => setForm((s) => ({ ...s, nova_senha: t }))} secureTextEntry />
          <View style={{ height: 8 }} />
          <Button title={salvando ? 'Salvando...' : 'Salvar'} onPress={onSalvar} disabled={salvando} loading={salvando} />
          <View style={{ height: 8 }} />
          <Button title="Cancelar" onPress={() => { setEditando(false); if (dados) {
            setForm({
              name: dados.name ?? dados.nome ?? '',
              phone: dados.phone ?? dados.telefone ?? '',
              cpf: dados.cpf ?? '',
              cep: dados.cep ?? '',
              address: dados.address ?? dados.endereco ?? '',
              number: dados.number ?? dados.numero ?? '',
              complement: dados.complement ?? dados.complemento ?? '',
              district: dados.district ?? dados.bairro ?? '',
              city: dados.city ?? dados.cidade ?? '',
              email: dados.email ?? '',
              // limpa campos de senha ao cancelar
              senha_atual: '',
              nova_senha: '',
            });
          } }} />
        </>
      )}
    </ScrollView>
  );
}
