import { Platform, StyleSheet } from "react-native";
import { theme } from "../../../global/themes";

export const styles = StyleSheet.create({
  fundo: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 30 : 0, 
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    opacity: 0.3, 
    zIndex: -1,
  },
    container: {
    flex: 1,
    marginBottom: 0,
 },
  containerSuperior: {
    width: '100%',
    padding: 25,
    backgroundColor: theme.colors.gray_light,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    borderEndStartRadius: 20,
    borderEndEndRadius: 20,
  },
    titulo: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 18,
    paddingTop: 20,
    textAlign: 'center',
    alignItems: 'center',
  },
    icon: {
    width: 50,
    height: 50,
    backgroundColor: theme.colors.botao,
    borderRadius: 50,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },

    descricao: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'justify',
    marginTop: 15,
    padding: 15,
    paddingHorizontal: 30,
    fontWeight: '400',
    marginBottom: 5,
    backgroundColor: theme.colors.gray_light,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 5.25,
    shadowRadius: 4.84,
    elevation: 5,
    color: theme.colors.text,

  },
    subtitulo: {
    fontSize: 22,
    fontWeight: '800',
    marginTop: 30,
    paddingHorizontal: 30,
    textAlign: 'center',
    alignItems: 'center',
    

  },
  tag : {
    fontSize: 16,
    backgroundColor: theme.colors.gray,
    color: theme.colors.white,
    
  },

    imagem : {
    width: '100%',
    height: 600,
    marginTop: 20,
    marginBottom: 20,
    
    },

    containerInferior: {
    width: '100%',
    padding: 25,
    backgroundColor: theme.colors.primary,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginTop: 15,
  },
    botao: {
    backgroundColor: theme.colors.botao,
    padding: 20,
    borderRadius: 50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'right',
    marginTop: 10,
  },
    textoBotao: {
    fontSize: 16,
    color: theme.colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
    videoButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginVertical: 15,
    marginHorizontal: 15,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderWidth: 1,
    borderColor: "#e9ecef",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },

  videoButtonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
    marginLeft: 12,
    textAlign: "left",
  },

  videoContainer: {
    backgroundColor: "#fff",
    borderRadius: 12,
    paddingVertical: 20,
    paddingHorizontal: 15,
    marginVertical: 15,
    marginHorizontal: 15,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 10.1,
    shadowRadius: 4,
  },

  videoTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    textAlign: "center",
  },

  videoWrapper: {
    width: "100%",
    alignItems: "center",
    marginBottom: 12,
  },

  video: {
    width: "100%",
    height: 200,
    backgroundColor: "#000",
    borderRadius: 8,
  },

  youtubeButton: {
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#e9ecef",
    width: "100%",
  },

  youtubeButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginLeft: 8,
    marginRight: 8,
  },

  videoDescription: {
    fontSize: 14,
    color: "#666",
    textAlign: "center",
    fontStyle: "italic",
    lineHeight: 20,
  },

    imagem1 : {
    width: '100%',
    height: 400,
    marginTop: 20,
    marginBottom: 20,
    },

    

});

export default styles;