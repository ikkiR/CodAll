import { Dimensions, Platform, StyleSheet } from "react-native";
import { theme } from "../../global/themes";

export const styles = StyleSheet.create({
container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 30,
    
  },
    containerLogin: {
    width: '100%',
    alignItems: 'center',
    padding: 20,
    backgroundColor: theme.colors.secundary,
    borderRadius: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
    boxLogo: {
    alignItems: 'center',
    marginBottom: 30,
  },
  boxButton: {
    width: '100%',
    marginTop: 10,
    
  },
  button: {
    backgroundColor: theme.colors.botao,
    paddingVertical: 15,
    borderRadius: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
  shadowOffset: {
	  width: 0,
  	height: 6,
},
    shadowOpacity: 0.37,
    shadowRadius: 7.49,
    elevation: 12,
  },
  textbutton: {
    color: '#000000ff',
    fontSize: 18,
    fontWeight: 'bold',
    
  },
  input: {
    flex: 1,
    paddingVertical: Platform.OS === 'ios' ? 14 : 10,
    fontSize: 16,
    color: theme.colors.black,
    fontWeight: '600',
    borderRadius: 40,
  },
  text: {
    fontSize: 20,
    color: theme.colors.black,
    textAlign: 'center',
    maxWidth: '100%',
    gap: 10,
    marginTop: 20,
    fontWeight: '500',
  },
  fundo: {
    position: 'absolute',
    top: Platform.OS === 'android' ? 40 : 0, 
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '130%',
    opacity: 0.6, 
    zIndex: -1, 
  },
  pickerLabel: {
    fontSize: 14,
    color: theme.colors.black,
    fontWeight: '600',
    marginBottom: 6,
    alignSelf: 'flex-start',
  },
  pickerContainer: {
    width: '100%',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
    marginBottom: 12,
  },
  roleRow: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  roleToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  roleButton: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
  },
  roleButtonActive: {
    backgroundColor: theme.colors.botao,
  },
  roleButtonText: {
    fontSize: 13,
    color: theme.colors.black,
    fontWeight: '600',
  },
  roleButtonTextActive: {
    color: '#fff',
  },
  });
