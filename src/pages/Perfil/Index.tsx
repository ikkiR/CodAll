// import React, { useEffect, useMemo, useState } from 'react';
// import { View, Text, ScrollView, ActivityIndicator, Alert } from 'react-native';
// import { styles } from './styles';
// import { AuthContext } from '../../global/AuthContext';
// import { apiBuscarUsuarioPorEmail, UsuarioCompleto } from '../../services/api';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { Input } from '../../components/input';
// import { Button } from '../../components/Button';
// import { useNavigation } from '@react-navigation/native';

// export default function Perfil() {
//   const navigation = useNavigation<any>();
//   const { usuario, carregarSessao } = React.useContext(AuthContext);
//   const [carregando, setCarregando] = useState<boolean>(true);
//   const [dados, setDados] = useState<UsuarioCompleto | null>(null);
//   const [editando, setEditando] = useState<boolean>(false);
//   const [salvando, setSalvando] = useState<boolean>(false);
//   const emailKey = (usuario?.email || '').toLowerCase();
//   const STORAGE_OVERRIDE_KEY = useMemo(() => `@codeall:perfilOverride:${emailKey}`, [emailKey]);
//   const [form, setForm] = useState({
//     name: '',
//     phone: '',
//     cpf: '',
//     cep: '',
//     address: '',
//     number: '',
//     complement: '',
//     district: '',
//     city: '',
//   });

//   useEffect(() => {
//     const carregar = async () => {
//       try {
//         if (!usuario?.email) {
//           setCarregando(false);
//           return Alert.alert('Erro', 'Usuário não autenticado.');
//         }
//         const resp = await apiBuscarUsuarioPorEmail(usuario.email);
//         let base = resp.user;
//         try {
//           const ovTxt = await AsyncStorage.getItem(STORAGE_OVERRIDE_KEY);
//           if (ovTxt) {
//             const ov = JSON.parse(ovTxt);
//             base = { ...base, ...ov };
//           }
//         } catch {}
//         setDados(base);
//         setForm({
//           name: base.name || '',
//           phone: base.phone || '',
//           cpf: base.cpf || '',
//           cep: base.cep || '',
//           address: base.address || '',
//           number: base.number || '',
//           complement: base.complement || '',
//           district: base.district || '',
//           city: base.city || '',
//         });
//       } catch (e: any) {
//         Alert.alert('Erro', e?.message || 'Falha ao buscar dados do usuário');
//       } finally {
//         setCarregando(false);
//       }
//     };
//     carregar();
//   }, [usuario?.email, STORAGE_OVERRIDE_KEY]);

//   const onSalvar = async () => {
//     try {
//       if (!usuario?.email) return;
//       setSalvando(true);
//       // Salva somente os campos editáveis como override local
//       const override = { ...form };
//       await AsyncStorage.setItem(STORAGE_OVERRIDE_KEY, JSON.stringify(override));
//       // Atualiza dados em tela
//       setDados((prev) => prev ? { ...prev, ...override } as UsuarioCompleto : (null as any));
//       setEditando(false);
//       // Se o nome mudou, atualiza sessão para refletir saudação e cabeçalho
//       if (usuario && usuario.nome !== (form.name || '').trim()) {
//         const novo = { ...usuario, nome: (form.name || '').trim() };
//         try {
//           await AsyncStorage.setItem('@codeall:sessao', JSON.stringify(novo));
//           await carregarSessao();
//         } catch {}
//       }
//       Alert.alert('Sucesso', 'Dados atualizados localmente.');
//     } catch (e: any) {
//       Alert.alert('Erro', e?.message || 'Falha ao salvar alterações');
//     } finally {
//       setSalvando(false);
//     }
//   };

//   if (carregando) {
//     return (
//       <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
//         <ActivityIndicator size="small" />
//       </View>
//     );
//   }

//   if (!dados) {
//     return (
//       <View style={[styles.container, { alignItems: 'center', justifyContent: 'center' }]}>
//         <Text style={styles.textoValor}>Nenhum dado encontrado.</Text>
//       </View>
//     );
//   }

//   const itens: Array<{ rotulo: string; valor: string | null | undefined }> = [
//     { rotulo: 'Nome', valor: dados.name },
//     { rotulo: 'E-mail', valor: dados.email },
//     { rotulo: 'Telefone', valor: dados.phone || '' },
//     { rotulo: 'CPF', valor: dados.cpf || '' },
//     { rotulo: 'CEP', valor: dados.cep || '' },
//     { rotulo: 'Endereço', valor: dados.address || '' },
//     { rotulo: 'Número', valor: dados.number || '' },
//     { rotulo: 'Complemento', valor: dados.complement || '' },
//     { rotulo: 'Bairro', valor: dados.district || '' },
//     { rotulo: 'Cidade', valor: dados.city || '' },
//   ];

//   return (
//     <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
//       <Text style={styles.titulo}>Meus dados</Text>
//       {!editando ? (
//         <>
//           {itens.map((item) => (
//             <View key={item.rotulo} style={styles.linha}>
//               <Text style={styles.textoRotulo}>{item.rotulo}:</Text>
//               <Text style={styles.textoValor}>{item.valor || '-'}</Text>
//             </View>
//           ))}
//           <Button title="Editar" onPress={() => setEditando(true)} />
//           <View style={{ height: 8 }} />
//           <Button 
//             title="⚙️ Configurar Servidor" 
//             onPress={() => navigation.navigate('ConfigurarServidor')} 
//           />
//         </>
//       ) : (
//         <>
//           <Input title="Nome" value={form.name} onChangeText={(t) => setForm((s) => ({ ...s, name: t }))} />
//           <Input title="Telefone" value={form.phone} onChangeText={(t) => setForm((s) => ({ ...s, phone: t }))} keyboardType="phone-pad" />
//           <Input title="CPF" value={form.cpf} onChangeText={(t) => setForm((s) => ({ ...s, cpf: t }))} />
//           <Input title="CEP" value={form.cep} onChangeText={(t) => setForm((s) => ({ ...s, cep: t }))} keyboardType="number-pad" />
//           <Input title="Endereço" value={form.address} onChangeText={(t) => setForm((s) => ({ ...s, address: t }))} />
//           <Input title="Número" value={form.number} onChangeText={(t) => setForm((s) => ({ ...s, number: t }))} keyboardType="number-pad" />
//           <Input title="Complemento" value={form.complement} onChangeText={(t) => setForm((s) => ({ ...s, complement: t }))} />
//           <Input title="Bairro" value={form.district} onChangeText={(t) => setForm((s) => ({ ...s, district: t }))} />
//           <Input title="Cidade" value={form.city} onChangeText={(t) => setForm((s) => ({ ...s, city: t }))} />
//           <View style={{ height: 8 }} />
//           <Button title={salvando ? 'Salvando...' : 'Salvar'} onPress={onSalvar} disabled={salvando} loading={salvando} />
//           <View style={{ height: 8 }} />
//           <Button title="Cancelar" onPress={() => { setEditando(false); if (dados) {
//             setForm({
//               name: dados.name || '',
//               phone: dados.phone || '',
//               cpf: dados.cpf || '',
//               cep: dados.cep || '',
//               address: dados.address || '',
//               number: dados.number || '',
//               complement: dados.complement || '',
//               district: dados.district || '',
//               city: dados.city || '',
//             });
//           } }} />
//         </>
//       )}
//     </ScrollView>
//   );
// }
