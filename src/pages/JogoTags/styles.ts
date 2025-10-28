import { StyleSheet, Dimensions } from "react-native";

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  menuContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 30,
  },

  gameContainer: {
    flex: 1,
    position: 'relative',
  },

  // Menu Styles
  gameTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#2E8B57',
    textAlign: 'center',
    marginBottom: 10,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    fontFamily: 'monospace',
  },

  subtitle: {
    fontSize: 18,
    color: '#4169E1',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '600',
  },

  gameOverContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 25,
    marginBottom: 30,
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#FFD700',
  },

  gameOverText: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FF6347',
    marginBottom: 10,
  },

  finalScore: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 5,
  },

  tagsCollected: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
    marginBottom: 5,
  },

  tagsWrong: {
    fontSize: 18,
    color: '#F44336',
    fontWeight: '600',
    marginBottom: 5,
  },

  perfectGame: {
    fontSize: 16,
    color: '#FF6347',
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 10,
  },

  instructions: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 15,
    padding: 20,
    marginBottom: 30,
    width: '100%',
  },

  instructionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2E8B57',
    marginBottom: 10,
    textAlign: 'center',
  },

  instructionText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 5,
    fontWeight: '500',
  },

  playButton: {
    backgroundColor: '#32CD32',
    borderRadius: 25,
    paddingVertical: 15,
    paddingHorizontal: 40,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },

  playButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    fontFamily: 'monospace',
  },

  homeButton: {
    backgroundColor: '#FF6347',
    borderRadius: 20,
    paddingVertical: 12,
    paddingHorizontal: 30,
    flexDirection: 'row',
    alignItems: 'center',
    elevation: 3,
  },

  homeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    fontFamily: 'monospace',
  },

  // Game Styles
  hud: {
    position: 'absolute',
    top: 50,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 100,
  },

  scoreText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'monospace',
  },

  progressText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF6347',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'monospace',
  },

  speedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FFD700',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'monospace',
  },

  missedText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#FF6B6B',
    textShadowColor: '#000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
    fontFamily: 'monospace',
  },

  pauseButton: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    borderRadius: 20,
    padding: 8,
  },

  tag: {
    position: 'absolute',
    backgroundColor: '#4CAF50',
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 8,
    minWidth: 80,
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    borderWidth: 2,
    borderColor: '#fff',
  },

  tagText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    fontFamily: 'monospace',
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.8)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },

  clickableTag: {
    position: 'absolute',
    minWidth: 160,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
  },

  tagTouchable: {
    elevation: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.5,
    shadowRadius: 10,
    padding: 10, // Adiciona padding para área de toque maior
  },

  tagGradient: {
    borderRadius: 25,
    paddingHorizontal: 28,
    paddingVertical: 22,
    minWidth: 160,
    minHeight: 80,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.9)',
    transform: [{ scale: 1 }],
  },

  tagButton: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 16,
    elevation: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    borderWidth: 3,
    borderColor: '#4ECDC4',
    minWidth: 140,
    minHeight: 60,
    alignItems: 'center',
    justifyContent: 'center',
    transform: [{ scale: 1 }],
  },

  basket: {
    position: 'absolute',
    bottom: 120,
    width: 80,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(139, 69, 19, 0.8)',
    borderRadius: 15,
    borderWidth: 3,
    borderColor: '#8B4513',
  },

  basketText: {
    fontSize: 40,
  },

  character: {
    position: 'absolute',
    bottom: 100,
    width: 80,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
  },

  basketIcon: {
    fontSize: 50,
    textShadowColor: '#000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 3,
  },





  controls: {
    position: 'absolute',
    bottom: 30,
    left: 0,
    right: 0,
    alignItems: 'center',
  },

  controlHint: {
    fontSize: 16,
    color: '#2E8B57',
    fontWeight: 'bold',
    textAlign: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    fontFamily: 'monospace',
  },

  feedbackContainer: {
    position: 'absolute',
    top: '40%',
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },

  feedbackText: {
    fontSize: 26,
    fontWeight: '900',
    color: '#fff',
    textAlign: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    paddingHorizontal: 25,
    paddingVertical: 15,
    borderRadius: 20,
    textShadowColor: '#000',
    textShadowOffset: { width: 3, height: 3 },
    textShadowRadius: 6,
    borderWidth: 2,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
});