# 🎮 Jogo de Adivinhação (PIXI.js)

Um jogo da adivinhação moderno, interativo e de alta performance construído inteiramente em **Canvas** utilizando a poderosa engine **PIXI.js**. O projeto foi concebido para entregar uma experiência imersiva, com gerenciamento de estado eficiente, animações fluidas e suporte robusto à acessibilidade.

---

## ✨ Funcionalidades Principais

- **Suporte Multiplayer (Local)**: Jogue sozinho ou em grupo (de 1 a 4 jogadores), com a lógica de turnos gerenciada automaticamente.
- **Níveis de Dificuldade Dinâmicos**: 
  - **Fácil**: Sorteio de 1 a 50 (15 tentativas)
  - **Médio**: Sorteio de 1 a 100 (10 tentativas)
  - **Difícil**: Sorteio de 1 a 200 (5 tentativas)
- **Numpad Virtual Imersivo**: Teclado numérico renderizado inteiramente dentro do Canvas para interação com clique ou toque.
- **Histórico Visual**: Registro em tempo real de todos os palpites realizados na rodada para ajudar a memória dos jogadores.
- **Acessibilidade Completa (A11y)**:
  - 🗣️ **Text-to-Speech (TTS)**: Narração em voz dos turnos, vitórias, derrotas e dicas (Maior/Menor).
  - ⌨️ **Teclado Físico**: Suporte total para jogar usando as teclas numéricas (`0-9`), `Enter` e `Backspace`, sem necessidade do mouse.
  - 👁️ **Suporte a Leitores de Tela**: Elementos de Canvas configurados para integração com leitores nativos (NVDA, VoiceOver).
- **Sistema de Partículas**: Efeito de confetes explosivos na tela de vitória criados de forma nativa.

---

## 🛠️ Tecnologias Utilizadas

O projeto utiliza um stack moderno para desenvolvimento Frontend:

- **[Vite](https://vitejs.dev/)** - Bundler ultrarrápido para desenvolvimento e build.
- **[PIXI.js (v7)](https://pixijs.com/)** - Motor de renderização WebGL rápido e leve.
- **[GSAP](https://gsap.com/)** - Biblioteca padrão-ouro para animações suaves (utilizada para o efeito de tremor/shake de erros).
- **[Howler.js](https://howlerjs.com/)** - Gerenciador robusto para reprodução de efeitos sonoros.
- **[Nanostores](https://github.com/nanostores/nanostores)** - Gerenciamento de estado reativo, minúsculo e sem boilerplate.

---

## 📂 Estrutura do Projeto

A arquitetura do código foi projetada para ser modular e facilmente expansível:

```text
jogo_da_adivinhacao/
├── index.html              # Ponto de entrada
├── package.json            # Dependências e scripts
├── vite.config.js          # Configuração do Bundler
└── src/
    ├── main.js             # Inicialização do PIXI e Loop das Scenes
    ├── css/                # Folhas de estilo base
    ├── stores/
    │   └── gameStore.js    # Lógica de negócio, regras e estado global (Nanostores)
    ├── scenes/             # Fases do jogo
    │   ├── MenuScene.js
    │   ├── SetupScene.js
    │   ├── GameScene.js
    │   └── InstructionsScene.js
    ├── components/         # Elementos gráficos reutilizáveis
    │   ├── Button.js
    │   └── ParticleConfetti.js
    ├── utils/              # Funções de auxílio
    │   ├── audio.js        # Sons e narração TTS
    │   └── animate.js      # Integrações com GSAP
    └── sounds/             # Arquivos .mp3
```

---

## 🚀 Como Executar Localmente

### Pré-requisitos
- **Node.js** (versão 18 ou superior recomendada)

### Passos para Instalação

1. Abra o terminal e navegue até a pasta do projeto.
2. Instale todas as dependências:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. O jogo será servido localmente (geralmente em `http://localhost:3000` ou `http://localhost:5173`). O Vite avisará no console.

### Build para Produção

Para gerar os arquivos otimizados e minificados prontos para deploy:
```bash
npm run build
```
Os arquivos finais estarão disponíveis na pasta `dist/`. Para testar a build localmente antes do deploy, rode:
```bash
npm run preview
```

---

## 🎧 Observação sobre os Assets (Áudios)
Na pasta `src/sounds/`, existem três arquivos (`click.mp3`, `win.mp3`, `lose.mp3`). Atualmente eles estão configurados como placeholders. Para a melhor experiência de jogo, **substitua esses arquivos por efeitos sonoros reais** com os mesmos nomes.

---
Desenvolvido com foco em **Performance, Imersão e Acessibilidade**.