import React from "react";
import { Text, View, Keyboard, TouchableWithoutFeedback, ScrollView, Image, TouchableOpacity} from "react-native";
import {styles} from "./styles";
import { useNavigation } from "@react-navigation/native";
import { AuthContext } from "../../global/AuthContext";
import { Button } from "../../components/Button";
import { Aladin_400Regular } from '@expo-google-fonts/aladin';
import { useFonts } from 'expo-font';
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from "../../global/themes";
import { LinearGradient } from 'expo-linear-gradient';
import Card from "../../components/Cards";

export default function Home() {
    const navigation = useNavigation<any>();
    const { usuario, carregando } = React.useContext(AuthContext);
    const [fontsLoaded] = useFonts({
        Aladin_400Regular,
    });

    if (!fontsLoaded) return null;

    // Mostra tela de carregamento enquanto carrega a sessão
    if (carregando) {
        return <Text>Carregando...</Text>;
    }

    // Caso não esteja logado
    if (!usuario) {
        return <Text>Você precisa fazer login.</Text>;
    }
    
    function colorConclusao(): string {
        return theme.colors.success || '#4CAF50';
    }

    return (<>
    
    <Image source={{ uri: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80' }} style={styles.fundo} resizeMode="cover" />
        <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
              <View style={styles.container}>
                  <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
                      <Text style={styles.nome}>Olá, {nome} 👋</Text>
                      <Text style={styles.MeusCursos}>Meus Cursos</Text>
                    
                <TouchableOpacity onPress={() => navigation.navigate('CursoHtml')}>
                    <Card  
                        image="https://kinsta.com/wp-content/uploads/2021/03/HTML-5-Badge-Logo.png" 
                        title="HTML5" 
                        level="iniciante" 
                        description="Aprenda a criar páginas web modernas e responsivas." 
                        time="8 Horas" 
                        users="1.2k inscritos" 
                        progress="Concluído" 
                        nameLinear="laranja"
                        colorConclusao={colorConclusao()}
                    />
                </TouchableOpacity>
                    <Card  
                        image="https://logospng.org/download/css-3/logo-css-3-512.png" 
                        title="CSS3" 
                        level="iniciante" 
                        description="Aprenda estilizar páginas web com CSS3." 
                        time="6 Horas" 
                        users="900 inscritos" 
                        progress="Em Progresso" 
                        nameLinear="roxo"
                        colorConclusao={colorConclusao()}
                    />
                    <Card
                        image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSm8DJWWTCtbtKbCVVTJU561hy3U7iwnZuToy21ekjbo0u6quyccF43bD9ht9xyonk8MBU&usqp=CAU"
                        title="JavaScript"
                        level="medio"
                        description="Aprenda do básico ao avançado de JavaScript"
                        time="12 Horas"
                        users="1.5k inscritos"
                        progress="Inscrever-se"
                        nameLinear="amarelo"
                        colorConclusao={colorConclusao()}
                    />

                    <Card
                        image="https://cdn-icons-png.flaticon.com/512/2721/2721297.png"
                        title="Banco de Dados"
                        level="medio"
                        description="Aprenda conceitos de bancos de dados e SQL"
                        time="10 Horas"
                        users="750 inscritos"
                        progress="Inscrever-se"
                        nameLinear="vermelho"
                        colorConclusao={colorConclusao()}
                    />

                    <Card
                        image="https://play-lh.googleusercontent.com/dgFMLW8uRFSKoI0o69b4g6Ig8WsMMmXsFOWTlPr0y-lW_ViAXuC0ATULLmGD84FjNQ"
                        title="Lógica de Programação"
                        level="iniciante"
                        description="Fundamentos da programação e resolução de problemas"
                        time="14 Horas"
                        users="1.8k inscritos"
                        progress="Em Progresso"
                        nameLinear="verde"
                        colorConclusao={colorConclusao()}
                    />
                    <TouchableOpacity onPress={() => navigation.navigate('JogoTags')}>
                        <Card
                            image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRTJPVBMZ4PXF8bnMGbu9NyPbaQQ-pDR5LYCg&s"
                            title="JOGUE E APRENDA"
                            level="avancado"
                            description="Aprenda programação com jogos divertidos"
                            time="Até o divertimento acabar"
                            users="3k inscritos"
                            progress="Jogar Agora"
                            nameLinear="azul"
                            colorConclusao={colorConclusao()}
                        />
                    </TouchableOpacity>

    return (
        <>
            <Image
                source={{ uri: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80' }}
                style={styles.fundo}
                resizeMode="cover"
            />
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.container}>
                        <View style={{ paddingHorizontal: 16, paddingTop: 12 }}>
                            {/* Aqui pegamos o nome do usuário */}
                            <Text style={styles.nome}>Olá, {usuario.nome} 👋</Text>
                            <Text style={styles.welcome}>Continue aprendendo e alcance seus objetivos</Text>
                            <Text style={styles.MeusCursos}>Meus Cursos</Text>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </ScrollView>
        </>
    );
}
