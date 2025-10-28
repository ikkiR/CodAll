import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "../../global/themes";

export const styles = StyleSheet.create({
  cursosCard: {
    flex: 1,
    width: '100%',
    height: 500,
    paddingHorizontal: 0,
    marginTop: 20,
    gap: 0,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 13.84,   
    elevation: 5, 
    overflow: 'hidden', 
    borderColor: theme.colors.gray,
    borderWidth: 1,
    marginBottom: 20,
  },

  cursoImage: {
    width: '100%', 
    height: '55%', 
    borderRadius: 30, 
    overflow: 'hidden', 
    marginTop: 0,
    borderEndEndRadius: 0,
    borderEndStartRadius: 0,
    borderColor: theme.colors.primary,
    borderWidth: 1,
    backgroundColor: '#ffffffff',
  },

  cursoTitle: {
    fontSize: 22,
    fontWeight: '500',
    marginTop: 20,
    color: theme.colors.white, 
  },

  cursoDescription: {
    fontSize: 14,
    color: theme.colors.white,
    marginTop: 10,
    paddingHorizontal: 4,
  },

  cursoTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginTop: 0,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  
  cursoLevel: {
    fontSize: 12,
    marginTop: 25,
    backgroundColor:'#04f60c74',
    borderRadius: 5,
    width: 60,
    height: '35%',
    textAlign: 'center',
    color: 'rgba(0, 0, 0, 1)',
    fontWeight: '600',
  },

  cursoDuration: {
    fontSize: 15,
    color: theme.colors.white, 
    fontWeight: '500',
    marginLeft: 0,
  },

  cursoInfo: {
    fontSize: 12,
    marginTop: 20,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 10,
    gap: 5, 
    justifyContent: 'space-between', 
    width: '100%',
    height: '15%',
  },

  cursoTimeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 5,
  },

  cursosUsers: {
    fontSize: 12,
    marginTop: 5,
    flexDirection: 'row',
    alignItems: 'center', 
    paddingHorizontal: 0,
    gap: 5,
    justifyContent: 'flex-end',
    width: 'auto', 
  },

  inscricoes: {
    fontSize: 15,
    textAlign: 'left', 
    color: theme.colors.white, 
    fontWeight: '500',
    marginLeft: 0, 
  },

  cursoProgress: {
    width: '90%',
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 30, 
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },

  cursoProgressText: {
    fontSize: 14,
    textAlign: 'center', 
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
});
