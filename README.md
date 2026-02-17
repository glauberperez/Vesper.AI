# 🦇 Vesper: The Invisible Interview Copilot

> **Domine a entrevista técnica.**
> *Real-time Audio Transcription & Context-Aware AI Assistant overlay.*

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Python](https://img.shields.io/badge/python-3.10%2B-blue)
![Platform](https://img.shields.io/badge/platform-Windows%20%7C%20Linux-lightgrey)

## 📜 Sobre o Projeto

**Vesper** é uma ferramenta de assistência em tempo real projetada para desenvolvedores e profissionais de tecnologia. Diferente de assistentes genéricos, o Vesper escuta o áudio do sistema (Zoom, Google Meet, Teams), transcreve a pergunta instantaneamente usando **Whisper (Local)** e gera respostas técnicas precisas baseadas no **teu próprio contexto** (CV e GitHub).

Tudo isso acontece numa interface **"Ghost Mode"** (transparente e clicável através dela), permitindo que mantenhas o contacto visual com a câmara enquanto codificas ou lês a sugestão.

## ✨ Funcionalidades Principais

* **👻 Ghost Mode (Overlay Stealth):** Janela flutuante semitransparente que fica sobre o Zoom/IDE. O mouse passa *através* da janela ("Click-through"), permitindo interação total com o sistema sem mover o assistente.
* **⚡ Latência Ultra-Baixa:** Utiliza `faster-whisper` com aceleração CTranslate2 para transcrição em tempo real rodando localmente (CPU/GPU).
* **🧠 Deep Context RAG:** Não receba respostas genéricas da Wikipédia. O Vesper ingere o teu **CV** e teus **Repositórios GitHub** para sugerir respostas baseadas na *tua* experiência real de código.
* **🔐 Privacidade Total (BYOK):** "Bring Your Own Key". Suas chaves da OpenAI/Anthropic ficam salvas localmente. O áudio é processado na sua máquina. Nada é enviado para servidores de terceiros além da LLM escolhida.
* **🐧 Cross-Platform:** Desenvolvido em **PyQt6**, rodando nativamente em Windows e Linux (suporte a Wayland/X11).

## 🛠️ Tech Stack

* **Core:** Python 3.10+
* **GUI:** PyQt6 (Qt)
* **Audio/STT:** Faster-Whisper, SoundDevice, Numpy
* **LLM Integration:** OpenAI API (GPT-4o)
* **Data Fetching:** Requests (GitHub API)

## 🚀 Como Rodar Localmente

### Pré-requisitos
* Python 3.10 ou superior.
* Uma chave de API da OpenAI (`sk-...`).
* **Linux (Fedora/Ubuntu):** Instalar `python3-devel`, `portaudio-devel` e `xcb` libs.
* **Windows:** Instalar [VB-Cable](https://vb-audio.com/Cable/) (para rotear áudio do sistema).

### Instalação

```bash
# 1. Clone o repositório
git clone [https://github.com/SEU_USUARIO/vesper-ai.git](https://github.com/SEU_USUARIO/vesper-ai.git)
cd vesper-ai

# 2. Crie um ambiente virtual (Recomendado)
python -m venv .venv
source .venv/bin/activate  # Linux/Mac
# .venv\Scripts\activate   # Windows

# 3. Instale as dependências
pip install -r requirements.txt

# 4. Execute a aplicação
python main.py
```


### ⚠️ Aviso Legal (Disclaimer)
Esta ferramenta foi desenvolvida como uma prova de conceito (PoC) para explorar as capacidades de modelos de transcrição local e LLMs em tempo real. O uso ético em entrevistas é de total responsabilidade do usuário. O autor não encoraja o uso para trapaças ou desonestidade. Use para treino e suporte, não para substituir seu conhecimento.


### 🤝 Contribuição
Pull requests são bem-vindos. Para mudanças maiores, por favor abra uma issue primeiro para discutir o que você gostaria de mudar.
