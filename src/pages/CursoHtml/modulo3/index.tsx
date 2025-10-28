import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Linking } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { VideoView, useVideoPlayer } from "expo-video";
import { Audio } from "expo-av";


export default function CursoHtml3() {
    const navigation = useNavigation<any>();
    const screenWidth = Dimensions.get('window').width;

    const player = useVideoPlayer(require('../../../Assets/cursohtmlmodulo3.mp4'), player => {
        player.loop = false;
        player.muted = false;
        player.volume = 1.0;
    });
    
    useEffect(() => {
        Audio.setAudioModeAsync({
            allowsRecordingIOS: false,
            playsInSilentModeIOS: true,
            staysActiveInBackground: false,
            shouldDuckAndroid: true,
            playThroughEarpieceAndroid: false,
        });
    }, []);
    
    return (<>
        <Image source={{ uri: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713?w=1200&q=80' }} style={styles.fundo} resizeMode="cover" />
        
        <ScrollView style={styles.container}>

        <View style={styles.containerSuperior}>
            <Text style={styles.titulo}>Modulo 3 - Aprendendo sobre Formulários e Tabelas</Text>
        </View>
            <Text style={styles.subtitulo}>Objetivo do Módulo 3  💪🏻</Text>

            <Text style={styles.descricao}> Ensinar a criação de formulários e tabelas para entrada e exibição de dados.</Text>

            <Text style={styles.subtitulo}>Formulários 📝</Text>

            <Text style={styles.descricao}> • Os formulários em HTML são criados usando a tag <Text style={styles.tag}>&lt;form&gt;</Text>.</Text>

            <Text style={styles.descricao}> • Elementos comuns de formulário incluem <Text style={styles.tag}>&lt;input&gt;</Text>, <Text style={styles.tag}>&lt;textarea&gt;</Text> e <Text style={styles.tag}>&lt;select&gt;</Text>.</Text>

            <Text style={styles.subtitulo}>Exemplo de Formulário simples:  👇🏻</Text>

            <Image source={{ uri: 'https://i.postimg.cc/L8B9w1t2/Captura-de-tela-2025-10-25-141812.png' }} style={styles.imagem1} resizeMode="contain" />


            <Text style={styles.subtitulo}>Tabelas 📊</Text>

            <Text style={styles.descricao}> • As tabelas em HTML são criadas usando a tag <Text style={styles.tag}>&lt;table&gt;</Text>.</Text>

            <Text style={styles.descricao}> • As tabelas são compostas por linhas (<Text style={styles.tag}>&lt;tr&gt;</Text>) e células (<Text style={styles.tag}>&lt;td&gt;</Text>).</Text>

            <Text style={styles.descricao}>• Cada item da lista é definido com a tag <Text style={styles.tag}>&lt;li&gt;</Text>.</Text>

            <Text style={styles.descricao}>• As listas podem ser aninhadas, ou seja, você pode ter listas dentro de listas.</Text>

            <Text style={styles.subtitulo}>Exemplo de tabela:  👇🏻</Text>

            <Image source={{ uri: 'https://i.postimg.cc/Gp4c2504/Captura-de-tela-2025-10-25-142110.png' }} style={styles.imagem} resizeMode="contain" />

            
            <Text style={styles.subtitulo}>Recursos Adicionais 🎥</Text>

            <View style={styles.videoContainer}>
                <Text style={styles.videoTitle}>Tutorial: Trabalhando com Imagens</Text>
                <View style={styles.videoWrapper}>
                    <VideoView
                        style={styles.video}
                        player={player}
                        allowsFullscreen
                        allowsPictureInPicture
                        showsTimecodes
                        requiresLinearPlayback={false}
                    />
                </View>
                <TouchableOpacity 
                    style={styles.youtubeButton}
                    onPress={() => {
                        const youtubeUrl = 'https://www.youtube.com/watch?v=E6CdIawPTh0&list=PLHz_AreHm4dkZ9-atkcmcBaMZdmLHft8n&index=12';
                        Linking.openURL(youtubeUrl);
                    }}
                >
                    <MaterialIcons name="play-circle-fill" size={24} color="#FF0000" />
                    <Text style={styles.youtubeButtonText}>Assistir no YouTube</Text>
                    <MaterialIcons name="open-in-new" size={16} color="#666" />
                </TouchableOpacity>
                <Text style={styles.videoDescription}>
                    📹 Este vídeo demonstra como adicionar formulários e tabelas em HTML.
                </Text>
            </View>
            
            <Text style={styles.subtitulo}>Desafio  🎯</Text>

            <Text style={styles.descricao}> Crie um formulário simples que contenha campos para nome, e-mail e mensagem. Em seguida, crie uma tabela para listar informações sobre amigos.</Text>

            <Text style={styles.subtitulo}>Conclusão do Módulo 3  🎉</Text>

            <Text style={styles.descricao}> Parabéns por concluir o terceiro módulo! Agora que você completou os três módulos, você já tem uma boa base para criar páginas HTML básicas!</Text>

            <View style={styles.containerInferior}>
                    <Text style={styles.textoBotao}>Concluir Curso</Text>
                <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("Home")}>
                    <MaterialIcons name="check-circle" size={30} color="#fff" />
                </TouchableOpacity>
           </View>
           
            </ScrollView>
            </>
    );
}