import React from "react";
import { Text, View, Image } from "react-native";
import { styles } from "./styles"
import { LinearGradient } from "expo-linear-gradient";
import { MaterialIcons } from '@expo/vector-icons';
import { theme } from '../../global/themes';

interface CardProps {
    image: string;
    title: string;
    level: string;
    description: string;
    time: string;
    users: string;
    progress: string;
    nameLinear: string;
    colorConclusao: string;
}

export default function Card({ title, level, description, time, users, progress, image, nameLinear}: CardProps) {
    
    const getLinearColors = (): [string, string, string] => {
        switch (nameLinear) {
            case "laranja":
                return ['#cc5500', '#ff8800', '#ffa500'];
            case "roxo":
                return ['#6a0dad', '#8a2be2', '#9370db'];
            case "amarelo":
                return ['#cc8800', '#ffcc00', '#ffdd44'];
            case "vermelho":
                return ['#ff0000', '#ff6347', '#ff7f50'];
            case "azul":
                return ['#003366', '#0066cc', '#3399ff'];
            case "verde":
                return ['#006600', '#339933', '#66cc66'];
            default:
                return ['#cccccc', '#ffffff', '#f0f0f0'];
        }
    };

    const getStatusInfo = () => {
        const progressLower = progress.toLowerCase();
        
        if(progressLower === 'concluído') {
            return {
                color: '#4CAF50', // Verde
                icon: 'check-circle',
                backgroundColor: '#E8F5E8'
            };
        } else if(progressLower === 'em progresso') {
            return {
                color: '#9E9E9E', // Cinza
                icon: 'play-circle-outline',
                backgroundColor: '#F5F5F5'
            };
        } else if(progressLower === 'jogar agora') {
            // Card do jogo
            return {
                color: '#FF6347', // Vermelho/Laranja
                icon: 'sports-esports',
                backgroundColor: '#FFE4E1'
            };
        } else {
            // Inscrever-se
            return {
                color: '#2196F3', // Azul
                icon: 'add-circle-outline',
                backgroundColor: '#E3F2FD'
            };
        }
    };

    const statusInfo = getStatusInfo();

    let levelBadge;
    
    if(level === 'iniciante') {
        levelBadge = <Text style={styles.cursoLevel}>Iniciante</Text>;
    } else if(level === 'medio') {
        levelBadge = <Text style={[styles.cursoLevel, {backgroundColor: '#f7f70974'}]}>Médio</Text>;
    } else if(level === 'avancado') {
       levelBadge = <Text style={[styles.cursoLevel, {backgroundColor: '#ed0b0bda'}]}>Avançado</Text>;
    }
    
    return (
        <LinearGradient
            colors={getLinearColors()} 
            style={styles.cursosCard}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
        >
            <Image source={{ uri: image }} style={styles.cursoImage} resizeMode="contain" />
            
            <View style={styles.cursoTextContainer}>
                <Text style={styles.cursoTitle}>{title}</Text> 
                {levelBadge}
            </View>
           
            <Text style={styles.cursoDescription}>{description}</Text>

            <View style={styles.cursoInfo}>
                <View style={styles.cursoTimeContainer}>
                    <MaterialIcons name="access-time" size={20} color={theme.colors.white} />
                    <Text style={styles.cursoDuration}>{time}</Text>
                </View>
                <View style={styles.cursosUsers}>
                    <MaterialIcons name="people" size={24} color={theme.colors.white} />
                    <Text style={styles.inscricoes}>{users}</Text>
                </View>
            </View>
            
            <View style={[styles.cursoProgress, { backgroundColor: statusInfo.backgroundColor }]}>
                <MaterialIcons name={statusInfo.icon as any} size={20} color={statusInfo.color} />
                <Text style={[styles.cursoProgressText, { color: statusInfo.color }]}>{progress}</Text>
            </View>
                                
        </LinearGradient>
    )
};