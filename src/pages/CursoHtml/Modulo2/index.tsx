import React, { useState, useEffect } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions, Linking } from "react-native";
import { styles } from "./styles";
import { useNavigation } from "@react-navigation/native";
import MaterialIcons from "@react-native-vector-icons/material-icons";
import { VideoView, useVideoPlayer } from "expo-video";
import { Audio } from "expo-av";


export default function CursoHtml2() {
    const navigation = useNavigation<any>();
    const screenWidth = Dimensions.get('window').width;

    const player = useVideoPlayer(require('../../../Assets/cursohtmlmodulo2.mp4'), player => {
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
            <Text style={styles.titulo}>Modulo 2 - Estruturando Conteúdo e Trabalhando com Imagens</Text>
        </View>
            <Text style={styles.subtitulo}>Objetivo do Módulo 2  💪🏻</Text>

            <Text style={styles.descricao}> Neste módulo, você aprenderá a Explorar tags adicionais para criar conteúdo mais estruturado, como listas, imagens e links.</Text>

            <Text style={styles.subtitulo}>Listas 📋</Text>

            <Text style={styles.descricao}> • As listas em HTML são criadas usando as tags <Text style={styles.tag}>&lt;ul&gt;</Text> (lista não ordenada) e <Text style={styles.tag}>&lt;ol&gt;</Text> (lista ordenada).</Text>

            <Text style={styles.descricao}>• Cada item da lista é definido com a tag <Text style={styles.tag}>&lt;li&gt;</Text>.</Text>

            <Text style={styles.descricao}>• As listas podem ser aninhadas, ou seja, você pode ter listas dentro de listas.</Text>

            <Text style={styles.subtitulo}>Exemplo de Lista:  👇🏻</Text>

            <Image source={{ uri: 'https://i.ytimg.com/vi/yhvfA40ukfQ/maxresdefault.jpg' }} style={styles.imagem} resizeMode="contain" />

            <Text style={styles.subtitulo}>Imagens 🖼️</Text>

            <Text style={styles.descricao}> • As imagens em HTML são inseridas usando a tag <Text style={styles.tag}>&lt;img&gt;</Text>.</Text>

            <Text style={styles.descricao}> • Atributos comuns: <Text style={styles.tag}>src</Text> (caminho da imagem) <Text style={styles.tag}>alt</Text> (texto alternativo).</Text>

            <Image source={{ uri: 'https://media.licdn.com/dms/image/v2/C4D12AQGcrzBG6gDbNw/article-inline_image-shrink_1000_1488/article-inline_image-shrink_1000_1488/0/1606910291466?e=1762387200&v=beta&t=fDIv4guvfaC6autOwmMXoupVt3ER40fGS1ZC_UDyOUo' }} style={styles.imagem} resizeMode="cover" />


            <Text style={styles.subtitulo}>Atributos em HTML 🪄</Text>

            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;href&gt;</Text>: Usado em links.</Text>
            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;src&gt;</Text>: Usado para especificar o caminho da imagem.</Text>
            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;alt&gt;</Text>: Texto alternativo para imagens.</Text>
            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;title&gt;</Text>: Define o título da página.</Text>

            <Text style={styles.subtitulo}>Estruturação Avançada de Conteúdo 📚</Text>
            <Text style={styles.descricao}> • <Text style={styles.tag}>&lt;div&gt;</Text>: Contêiner genérico para agrupar elementos.</Text>
            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;span&gt;</Text>: Contêiner em linha para estilização.</Text>
            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;header&gt;</Text>: Define o cabeçalho de uma seção ou página.</Text>
            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;footer&gt;</Text>: Define o rodapé de uma seção ou página.</Text>
            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;section&gt;</Text>: Define uma seção genérica de conteúdo.</Text>
            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;article&gt;</Text>: Define um conteúdo independente e autocontido.</Text>
            <Text style={styles.descricao}>• <Text style={styles.tag}>&lt;meta&gt;</Text>: Metadados sobre a página.</Text>

            <Text style={styles.subtitulo}>Exemplo de link:</Text>
           
            <Image source={{ uri: 'https://hermes.dio.me/assets/articles/55252286-0639-411d-ad10-535e6abdb7d3.png' }} style={styles.imagem2} resizeMode="contain" />
           
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
                    📹 Este vídeo mostra como estruturar conteúdo e adicionar imagens e links em HTML.
                </Text>
            </View>
            
            <Text style={styles.subtitulo}>Desafio  🎯</Text>
            
            <Text style={styles.descricao}> Crie uma página com uma lista de tarefas, incluindo uma imagem e um link para outro site. </Text>

            <Text style={styles.subtitulo}>Conclusão do Módulo 2  🎉</Text>

            <Text style={styles.descricao}> Parabéns por concluir o segundo módulo! Agora você entende como estruturar conteúdo e adicionar imagens e links em HTML e está pronto para avançar para o próximo módulo, onde exploraremos sobre Formulários e Tabelas.</Text>
           
            <View style={styles.containerInferior}>
                    <Text style={styles.textoBotao}>Próximo Módulo: Aprendendo sobre Formulários e Tabelas</Text>
                <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate("CursoHtml3")}>
                    <MaterialIcons name="arrow-forward-ios" size={20} color="#fff" />
                </TouchableOpacity>
           </View>
           
            </ScrollView>
            </>
    );
}