import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Linking } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { VideoView, useVideoPlayer } from "expo-video";
import { Audio } from "expo-av";


export default function CursoHtml() {
    const navigation = useNavigation<any>();
    const screenWidth = Dimensions.get('window').width;

    const player = useVideoPlayer(require('../../../Assets/cursohtmlmodulo1.mp4'), player => {
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
            <Text style={styles.titulo}>Modulo 1 - Introdução ao HTML</Text>
        </View>
            <Text style={styles.subtitulo}>Objetivo do Módulo 1  💪🏻</Text>

            <Text style={styles.descricao}> Neste módulo, você aprenderá os conceitos básicos do HTML, incluindo a estrutura de uma página web, tags essenciais e como criar seu primeiro documento HTML.</Text>
            
            <Text style={styles.subtitulo}>O que é HTML ❓</Text>

            <Text style={styles.descricao}> • HTML (HyperText Markup Language) é a linguagem padrão usada para criar páginas web. </Text>

            <Text style={styles.descricao}>• Ele fornece a estrutura básica de um site, permitindo que você organize e formate o conteúdo.</Text>

            <Text style={styles.subtitulo}>Estrutura Básica de um Documento HTML  ⚒️</Text>

            <Text style={styles.descricao}> • Uma página HTML típica tem quatro partes principais:</Text>

            <Text style={styles.descricao}> 1. Elemento raiz <Text style={styles.tag}>&lt;!DOCTYPE html&gt;</Text>: Declaração para indicar que o documento é HTML5.</Text>
           
            <Text style={styles.descricao}> 2. Tag HTML <Text style={styles.tag}>&lt;html&gt;</Text>: A tag principal que envolve o conteúdo.</Text>
            
            <Text style={styles.descricao}> 3. Cabeçalho <Text style={styles.tag}>&lt;head&gt;</Text> e Corpo <Text style={styles.tag}>&lt;body&gt;</Text>: Contém informações sobre a página (como o título e metadados).</Text>
            
            <Text style={styles.descricao}> 4. Corpo <Text style={styles.tag}>&lt;body&gt;</Text>: Contém o conteúdo visível da página.</Text>
           
            <Text style={styles.subtitulo}>Exemplo de Estrutura HTML:  👇🏻</Text>
            
            <Image source={{ uri: 'https://blog.codapp.com.br/wp-content/uploads/2022/05/estruturabasica.png' }} style={styles.imagem} resizeMode="contain" />
           
            <Text style={styles.subtitulo}>Primeiras Tags Importantes  ⚙️</Text>
            
            <Text style={styles.descricao}> • <Text style={styles.tag}>&lt;h1&gt;</Text> a <Text style={styles.tag}>&lt;h6&gt;</Text>: Títulos de diferentes níveis.</Text>
            
            <Text style={styles.descricao}> • <Text style={styles.tag}>&lt;p&gt;</Text>: Parágrafos de texto.</Text>
            
            <Text style={styles.descricao}> • <Text style={styles.tag}>&lt;a&gt;</Text>: Links para outras páginas ou recursos.</Text>
            
            <Text style={styles.subtitulo}>Exemplo de link:</Text>
           
            <Image source={{ uri: 'https://media.licdn.com/dms/image/v2/C4D12AQGcrzBG6gDbNw/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1606910291466?e=1762387200&v=beta&t=fDIv4guvfaC6autOwmMXoupVt3ER40fGS1ZC_UDyOUo' }} style={styles.imagem} resizeMode="cover" />
           
            <Text style={styles.subtitulo}>Recursos Adicionais 🎥</Text>

            <View style={styles.videoContainer}>
                <Text style={styles.videoTitle}>Tutorial: Introdução ao HTML</Text>
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
                    📹 Este vídeo demonstra os conceitos básicos do HTML que acabamos de aprender.
                </Text>
            </View>
            
            <Text style={styles.subtitulo}>Desafio  🎯</Text>
            
            <Text style={styles.descricao}> Crie um arquivo HTML simples que inclua um título, um parágrafo e um link para seu site favorito. Experimente diferentes tags para ver como elas afetam a aparência do conteúdo.</Text>

            <Text style={styles.subtitulo}>Conclusão do Módulo 1  🎉</Text>

            <Text style={styles.descricao}> Parabéns por concluir o primeiro módulo! Agora você entende os fundamentos do HTML e está pronto para avançar para o próximo módulo, onde exploraremos mais tags e atributos essenciais.</Text>
           
            <View style={styles.containerInferior}>
                    <Text style={styles.textoBotao}>Próximo Módulo: Estruturando Conteúdo e Trabalhando com Imagens</Text>
                <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("CursoHtml2")}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#fff" />
                </TouchableOpacity>
           </View>
           
            </ScrollView>
            </>
    );
}