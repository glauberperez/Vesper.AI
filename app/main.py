import sys
import requests
import json
from PyQt6.QtWidgets import (QApplication, QMainWindow, QTextEdit, QVBoxLayout, 
                             QWidget, QLabel, QPushButton, QSlider, QHBoxLayout, 
                             QLineEdit, QFormLayout, QProgressBar, QTabWidget, QMessageBox)
from PyQt6.QtCore import Qt, QThread, pyqtSignal
from PyQt6.QtGui import QIcon, QFont, QPalette, QColor

# --- 1. WORKER PARA GITHUB (Busca em Background) ---
class GitHubFetcher(QThread):
    finished = pyqtSignal(str) # Retorna o texto resumido
    error = pyqtSignal(str)

    def __init__(self, username_or_url):
        super().__init__()
        self.target = username_or_url

    def run(self):
        try:
            # Extrai usuário da URL ou usa o nome direto
            user = self.target.split('/')[-1] if 'github.com' in self.target else self.target
            # Limpa espaços extras
            user = user.strip()
            
            # Busca repositórios públicos
            url = f"https://api.github.com/users/{user}/repos?sort=updated&per_page=10"
            headers = {'Accept': 'application/vnd.github.v3+json'}
            response = requests.get(url, headers=headers, timeout=10)
            
            if response.status_code == 200:
                repos = response.json()
                if not repos:
                    self.finished.emit(f"Usuário '{user}' encontrado, mas sem repositórios públicos.")
                    return

                summary = f"--- GITHUB CONTEXT ({user}) ---\n"
                for repo in repos:
                    name = repo.get('name', 'N/A')
                    desc = repo.get('description') or 'Sem descrição'
                    lang = repo.get('language') or 'Vários'
                    summary += f"• {name} [{lang}]: {desc}\n"
                self.finished.emit(summary)
            elif response.status_code == 404:
                self.error.emit(f"Usuário '{user}' não encontrado no GitHub.")
            else:
                self.error.emit(f"Erro GitHub: {response.status_code}")
        except Exception as e:
            self.error.emit(f"Erro de conexão: {str(e)}")

# --- 2. MENU PRINCIPAL (Configuração) ---
class MainMenu(QMainWindow):
    def __init__(self):
        super().__init__()
        self.setWindowTitle("Interview Copilot // Setup")
        self.resize(800, 600)
        
        # Estilo CSS Dark Mode para o Menu
        self.setStyleSheet("""
            QMainWindow { background-color: #0B0F19; }
            QLabel { color: #cbd5e1; font-family: 'Segoe UI', sans-serif; font-size: 14px; }
            QLineEdit, QTextEdit { 
                background-color: #1e293b; color: white; border: 1px solid #334155; 
                border-radius: 6px; padding: 8px; font-family: Consolas, monospace;
            }
            QPushButton {
                background-color: #4f46e5; color: white; font-weight: bold;
                border-radius: 6px; padding: 10px; font-size: 14px;
            }
            QPushButton:hover { background-color: #4338ca; }
            QPushButton:disabled { background-color: #334155; color: #94a3b8; }
            QTabWidget::pane { border: 1px solid #334155; }
            QTabBar::tab { background: #1e293b; color: #cbd5e1; padding: 10px; margin-right: 2px; }
            QTabBar::tab:selected { background: #4f46e5; color: white; }
        """)

        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        main_layout = QVBoxLayout(central_widget)

        # Cabeçalho
        title = QLabel("CONFIGURAÇÃO DA SESSÃO")
        title.setStyleSheet("font-size: 24px; font-weight: bold; color: #818cf8; margin-bottom: 10px;")
        title.setAlignment(Qt.AlignmentFlag.AlignCenter)
        main_layout.addWidget(title)

        # Abas
        tabs = QTabWidget()
        
        # ABA 1: Dados Pessoais & CV
        tab_cv = QWidget()
        layout_cv = QVBoxLayout(tab_cv)
        
        layout_cv.addWidget(QLabel("1. Link do GitHub (Perfil ou URL):"))
        git_layout = QHBoxLayout()
        self.input_github = QLineEdit()
        self.input_github.setPlaceholderText("ex: torvalds")
        self.btn_fetch_git = QPushButton("Sincronizar GitHub")
        self.btn_fetch_git.setFixedWidth(150)
        self.btn_fetch_git.clicked.connect(self.fetch_github_data)
        git_layout.addWidget(self.input_github)
        git_layout.addWidget(self.btn_fetch_git)
        layout_cv.addLayout(git_layout)
        
        self.lbl_git_status = QLabel("Aguardando sincronização...")
        self.lbl_git_status.setStyleSheet("color: #94a3b8; font-size: 12px; font-style: italic;")
        layout_cv.addWidget(self.lbl_git_status)
        
        layout_cv.addWidget(QLabel("2. Cole seu Currículo (CV) Completo:"))
        self.text_cv = QTextEdit()
        self.text_cv.setPlaceholderText("Cole o texto do seu PDF aqui...")
        layout_cv.addWidget(self.text_cv)
        
        tabs.addTab(tab_cv, "👤 Perfil & Contexto")

        # ABA 2: Contexto da Entrevista
        tab_context = QWidget()
        layout_context = QVBoxLayout(tab_context)
        
        layout_context.addWidget(QLabel("3. Chave da API (OpenAI):"))
        self.input_api = QLineEdit()
        self.input_api.setEchoMode(QLineEdit.EchoMode.Password)
        self.input_api.setPlaceholderText("sk-...")
        layout_context.addWidget(self.input_api)

        layout_context.addWidget(QLabel("4. Descrição da Vaga / Stack Tecnológica:"))
        self.text_job = QTextEdit()
        self.text_job.setPlaceholderText("Cole a descrição da vaga ou tópicos que quer focar...")
        layout_context.addWidget(self.text_job)
        
        tabs.addTab(tab_context, "🔑 Vaga & API")

        main_layout.addWidget(tabs)

        # Botão Iniciar
        self.btn_start = QPushButton("🚀 INICIAR STEALTH MODE")
        self.btn_start.setStyleSheet("background-color: #10b981; margin-top: 10px; height: 50px; font-size: 16px;")
        self.btn_start.clicked.connect(self.launch_overlay)
        main_layout.addWidget(self.btn_start)

        # Dados Processados
        self.github_summary = ""

    def fetch_github_data(self):
        target = self.input_github.text().strip()
        if not target:
            self.lbl_git_status.setText("⚠️ Digite um usuário válido.")
            self.lbl_git_status.setStyleSheet("color: #f87171;")
            return

        self.btn_fetch_git.setEnabled(False)
        self.btn_fetch_git.setText("Buscando...")
        self.lbl_git_status.setText("Conectando ao GitHub API...")
        self.lbl_git_status.setStyleSheet("color: #fbbf24;")
        
        self.worker = GitHubFetcher(target)
        self.worker.finished.connect(self.on_git_success)
        self.worker.error.connect(self.on_git_error)
        self.worker.start()

    def on_git_success(self, summary):
        self.github_summary = summary
        self.lbl_git_status.setText("✅ Projetos carregados com sucesso!")
        self.lbl_git_status.setStyleSheet("color: #4ade80; font-weight: bold;")
        self.btn_fetch_git.setText("Sincronizado")
        self.btn_fetch_git.setEnabled(True)

    def on_git_error(self, err_msg):
        self.lbl_git_status.setText(f"❌ {err_msg}")
        self.lbl_git_status.setStyleSheet("color: #f87171;")
        self.btn_fetch_git.setEnabled(True)
        self.btn_fetch_git.setText("Tentar Novamente")

    def launch_overlay(self):
        # Validação Simples (Para teste, permitimos API Key vazia se quiser só ver a UI)
        api_key = self.input_api.text().strip()
        if not api_key:
             reply = QMessageBox.question(self, 'Teste de UI', 
                                          "API Key está vazia. Deseja iniciar apenas para testar a interface?",
                                          QMessageBox.StandardButton.Yes | QMessageBox.StandardButton.No)
             if reply == QMessageBox.StandardButton.No:
                 return

        # Consolida os dados
        context_data = {
            "api_key": api_key,
            "cv": self.text_cv.toPlainText(),
            "job_desc": self.text_job.toPlainText(),
            "github_context": self.github_summary
        }

        # Inicia o Overlay
        self.overlay = StealthOverlay(context_data)
        self.overlay.show()
        self.close() # Fecha o menu

# --- 3. O OVERLAY (Stealth Mode) ---
class StealthOverlay(QMainWindow):
    def __init__(self, context_data):
        super().__init__()
        self.context = context_data
        self.init_ui()
        self.show_debug_info()

    def init_ui(self):
        # Configurações Críticas para Linux/Fedora
        self.setWindowFlags(
            Qt.WindowType.WindowStaysOnTopHint | 
            Qt.WindowType.FramelessWindowHint | 
            Qt.WindowType.Tool 
        )
        self.setAttribute(Qt.WidgetAttribute.WA_TranslucentBackground)
        
        central_widget = QWidget()
        self.setCentralWidget(central_widget)
        # Borda fina para saber onde a janela está, mesmo vazia
        central_widget.setStyleSheet("background-color: rgba(0, 0, 0, 0);") 
        
        layout = QVBoxLayout(central_widget)
        layout.setContentsMargins(0, 0, 0, 0)

        # Header (Arrastável)
        self.header = QLabel(" :: Interview Copilot :: ")
        self.header.setStyleSheet("""
            background-color: rgba(15, 23, 42, 0.9);
            color: #818cf8;
            font-weight: bold;
            padding: 8px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
            border: 1px solid rgba(255, 255, 255, 0.1);
        """)
        self.header.setAlignment(Qt.AlignmentFlag.AlignCenter)
        layout.addWidget(self.header)

        # Área de Texto (Glass Effect)
        self.text_display = QTextEdit()
        self.text_display.setReadOnly(True)
        self.text_display.setStyleSheet("""
            QTextEdit {
                background-color: rgba(11, 15, 25, 0.85);
                color: #e2e8f0;
                border: 1px solid rgba(99, 102, 241, 0.3);
                border-bottom-left-radius: 8px;
                border-bottom-right-radius: 8px;
                font-family: 'Segoe UI', sans-serif;
                font-size: 14px;
                padding: 10px;
            }
        """)
        layout.addWidget(self.text_display)

        # Botão Fantasma (Flutuante na parte inferior)
        controls_layout = QHBoxLayout()
        controls_layout.setContentsMargins(10, 0, 10, 10)
        
        self.btn_ghost = QPushButton("👻 Ghost")
        self.btn_ghost.setCheckable(True)
        self.btn_ghost.clicked.connect(self.toggle_click_through)
        self.btn_ghost.setStyleSheet("""
            QPushButton { background: #4338ca; color: white; border-radius: 4px; padding: 4px; }
            QPushButton:checked { background: #22c55e; }
        """)
        
        self.btn_exit = QPushButton("❌ Sair")
        self.btn_exit.clicked.connect(self.close_app)
        self.btn_exit.setStyleSheet("background: #be123c; color: white; border-radius: 4px; padding: 4px;")

        controls_layout.addWidget(self.btn_ghost)
        controls_layout.addWidget(self.btn_exit)
        layout.addLayout(controls_layout)

        self.setGeometry(100, 100, 500, 400)
        self.old_pos = None

    def show_debug_info(self):
        # Mostra o que foi capturado do menu
        has_git = "✅ Sim" if self.context['github_context'] else "❌ Não"
        msg = (
            f"<b>SISTEMA DE TESTE UI INICIADO</b><br>"
            f"--------------------------------<br>"
            f"• GitHub Contexto: {has_git}<br>"
            f"• Tamanho do CV: {len(self.context['cv'])} caracteres<br>"
            f"• API Key Configurada: {'**********' if self.context['api_key'] else 'VAZIA'}<br><br>"
            f"<i>Aguardando integração com Whisper...</i>"
        )
        self.update_suggestion(msg)

    def update_suggestion(self, text):
        self.text_display.append(text)
        self.text_display.verticalScrollBar().setValue(
            self.text_display.verticalScrollBar().maximum()
        )

    def toggle_click_through(self):
        if self.btn_ghost.isChecked():
            # Tenta ativar click-through (pode variar no Wayland)
            self.setWindowFlag(Qt.WindowType.WindowTransparentForInput, True)
            self.setWindowFlag(Qt.WindowType.WindowStaysOnTopHint, True)
            self.setWindowFlag(Qt.WindowType.FramelessWindowHint, True)
            self.setWindowFlag(Qt.WindowType.Tool, True)
            
            self.header.setText(" :: GHOST MODE ON (Alt+Tab para sair) :: ")
            self.header.setStyleSheet("background-color: rgba(0, 255, 0, 0.1); color: #22c55e;")
            self.btn_ghost.setText("TRAVADO")
            self.btn_ghost.setEnabled(False) 
        else:
            self.setWindowFlag(Qt.WindowType.WindowTransparentForInput, False)
        
        self.show()

    def mousePressEvent(self, event):
        if event.button() == Qt.MouseButton.LeftButton:
            self.old_pos = event.globalPosition().toPoint()

    def mouseMoveEvent(self, event):
        if self.old_pos:
            delta = event.globalPosition().toPoint() - self.old_pos
            self.move(self.pos() + delta)
            self.old_pos = event.globalPosition().toPoint()

    def mouseReleaseEvent(self, event):
        self.old_pos = None
        
    def close_app(self):
        QApplication.quit()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    app.setStyle("Fusion") # Estilo mais limpo para Linux
    
    menu = MainMenu()
    menu.show()
    sys.exit(app.exec())