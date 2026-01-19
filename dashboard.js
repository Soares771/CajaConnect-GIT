// 1. Verificação de Segurança
const currentUser = localStorage.getItem('cajaUser');
if (!currentUser) {
    window.location.href = 'homepage.html';
} else {
    document.getElementById('username-display').textContent = currentUser;
}

// 2. Banco de Dados Inicial (Simulado)
const dadosIniciais = [
    {
        id: 1,
        titulo: "Oportunidade de Estágio - Suporte TI",
        autor: "Prof. Carlos (Coordenação)",
        tipo: "estagio",
        conteudo: "Empresa parceira no centro de Cajazeiras busca estagiário com conhecimentos em redes e manutenção. Enviar currículo para rh@empresa.com"
    },
    {
        id: 2,
        titulo: "Hackathon Campus Cajazeiras 2026",
        autor: "Centro Acadêmico",
        tipo: "evento",
        conteudo: "Preparem suas equipes! Nosso hackathon anual acontecerá no próximo mês. Temas: IA e Sustentabilidade."
    }
];

// Carregar posts do LocalStorage ou usar os iniciais
let posts = JSON.parse(localStorage.getItem('cajaPosts')) || dadosIniciais;

// 3. Função para Renderizar (Desenhar) os posts na tela
const feedArea = document.getElementById('feed-area');

function renderizarPosts(filtro = 'todos') {
    feedArea.innerHTML = ''; // Limpa a área

    const postsFiltrados = posts.filter(post => filtro === 'todos' ? true : post.tipo === filtro);

    postsFiltrados.forEach(post => {
        const div = document.createElement('div');
        div.className = 'post-card';
        div.innerHTML = `
            <div class="post-header">
                <h4 class="post-title">${post.titulo}</h4>
                <span class="badge tag-${post.tipo}">${post.tipo.toUpperCase()}</span>
            </div>
            <div class="post-meta">Publicado por: <strong>${post.autor}</strong></div>
            <p class="post-body">${post.conteudo}</p>
        `;
        // Adiciona o post no começo da lista (prepend)
        feedArea.prepend(div);
    });
}

// 4. Lógica de Adicionar Novo Post
document.getElementById('post-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const novoPost = {
        id: Date.now(), // Gera um ID único
        titulo: document.getElementById('post-title').value,
        tipo: document.getElementById('post-type').value,
        autor: document.getElementById('post-author').value,
        conteudo: document.getElementById('post-content').value
    };

    // Adiciona ao array e salva
    posts.push(novoPost);
    localStorage.setItem('cajaPosts', JSON.stringify(posts));

    // Limpa o formulário e atualiza a tela
    e.target.reset();
    renderizarPosts();
    alert('Publicação enviada com sucesso!');
});

// 5. Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('cajaUser');
    window.location.href = 'login.html';
});

// Inicializa a tela com todos os posts
renderizarPosts();

// Função global para os botões de filtro
window.filtrar = function(tipo) {
    renderizarPosts(tipo);
}