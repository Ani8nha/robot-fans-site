 document.addEventListener('DOMContentLoaded', () => {
        
        // 1. Inicializa os ícones
        if (window.lucide) {
            lucide.createIcons();
        }

        // 2. Configura o botão de Toggle (Menu)
        const toggleBtn = document.getElementById('toggle-btn');
        if (toggleBtn) {
            toggleBtn.addEventListener('click', toggleSidebar);
        }
    });

    // Função para ativar o item clicado
    function selectItem(button) {
        // Seleciona todos os botões
        const allButtons = document.querySelectorAll('.nav-btn');
        
        // Remove a classe 'active' de todos
        allButtons.forEach((btn) => {
            btn.classList.remove('active');
        });

        // Adiciona a classe 'active' apenas no botão clicado
        button.classList.add('active');
    }

    // Função para abrir/fechar a sidebar
    function toggleSidebar() {
        const sidebar = document.getElementById('sidebar');
        const icon = document.getElementById('toggle-icon');
        
        // Verifica se os elementos existem para evitar erros
        if (!sidebar || !icon) return;

        // Alterna a classe
        sidebar.classList.toggle('collapsed');

        // Troca o ícone
        const isCollapsed = sidebar.classList.contains('collapsed');
        if (isCollapsed) {
            icon.setAttribute('data-lucide', 'menu');
        } else {
            icon.setAttribute('data-lucide', 'chevron-left');
        }
        
        // Atualiza os ícones novamente
        if (window.lucide) {
            lucide.createIcons();
        }
    }