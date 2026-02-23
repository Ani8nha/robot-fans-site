// LISTA DE PRODUTOS
        const products = [
            { id: 1, name: "Kit Robot's Fans", price: 65.00, category: "Kits", image: "6.jpg", description: "Kit completo com desconto: Camiseta, Bottom, Adesivo e Lápis.", tag: "Mais Vendido" },
            { id: 2, name: "Camiseta Oficial 9484", price: 50.00, category: "Vestuário", image: "4.jpg", description: "Malha confortável com design da temporada.", tag: "Novo" },
            { id: 3, name: "Boné District", price: 30.00, category: "Vestuário", image: "1.jpg", description: "Bordado de alta qualidade. Identidade visual forte." },
            { id: 4, name: "Bandana Multiuso", price: 20.00, category: "Vestuário", image: "3.jpg", description: "Ideal para eventos e treinos." },
            { id: 5, name: "Ecobag Robot's", price: 30.00, category: "Sustentáveis", image: "2.jpg", description: "Algodão cru. Substitua sacolas plásticas." },
            { id: 6, name: "Garrafinha Personalizada", price: 35.00, category: "Sustentáveis", image: "7.jpg", description: "Material durável para o dia a dia." },
            { id: 7, name: "Bandana Roxa", price: 20.00, category: "Vestuário", image: "9.jpg", description: "Ideal para eventos e treinos." },
            { id: 8, name: "Chaveiro 3D", price: 15.00, category: "Colecionáveis", image: "11.jpg", description: "Impresso em PLA biodegradável." },
            { id: 9, name: "Bottom (Broche)", price: 10.00, category: "Colecionáveis", image: "10.jpg", description: "Para personalizar sua mochila." },
            { id: 10, name: "Chaveiro Scorpion", price: 15.00, category: "Colecionáveis", image: "13.jpg", description: "Impresso em PLA biodegradável." },
            { id: 11, name: "Chaveiro 9484", price: 15.00, category: "Colecionáveis", image: "12.jpg", description: "Impresso em PLA biodegradável." },
            { id: 12, name: "Garrafinha Scorpion", price: 35.00, category: "Sustentáveis", image: "8.jpg", description: "Material durável para o dia a dia." }
        ];

        // Estado do carrinho de compras na memória
        let cart = [];

        // Funções para abrir/fechar o carrinho
        window.openCart = () => {
            document.getElementById('cart-sidebar').classList.add('open');
            document.getElementById('cart-overlay').classList.add('open');
        };

        window.closeCart = () => {
            document.getElementById('cart-sidebar').classList.remove('open');
            document.getElementById('cart-overlay').classList.remove('open');
        };

        // Função para atualizar o interface do carrinho
        window.updateCartUI = () => {
            const cartBody = document.getElementById('cart-body');
            const cartBadge = document.getElementById('cart-badge');
            const cartTotal = document.getElementById('cart-total');

            // Atualiza o contador do botão
            cartBadge.innerText = cart.length;

            if (cart.length === 0) {
                cartBody.innerHTML = `
                    <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; color:var(--text-muted); gap: 1rem;">
                        <svg class="icon-svg" style="width:48px; height:48px; opacity:0.5;" viewBox="0 0 24 24"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 0 1-8 0"></path></svg>
                        <p>O seu carrinho está vazio.</p>
                    </div>`;
                cartTotal.innerText = `R$ 0.00`;
                return;
            }

            let total = 0;
            cartBody.innerHTML = '';
            
            cart.forEach(item => {
                total += item.price;
                cartBody.innerHTML += `
                    <div class="cart-item">
                        <div class="flex items-center gap-4">
                            <img src="${item.image}" alt="${item.productName}" style="width: 50px; height: 50px; border-radius: 8px; object-fit: cover; border: 1px solid var(--border-color);">
                            <div>
                                <h4>${item.productName}</h4>
                                <div class="cart-item-price">R$ ${item.price.toFixed(2)}</div>
                            </div>
                        </div>
                        <button onclick="removeFromCart('${item.cartId}')" class="btn-remove" title="Remover Produto">
                            <svg class="icon-svg" viewBox="0 0 24 24"><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>
                        </button>
                    </div>
                `;
            });

            cartTotal.innerText = `R$ ${total.toFixed(2)}`;
        };

        // Adicionar um produto ao carrinho
        window.addToCart = (productData) => {
            // Cria um ID único para cada item no carrinho
            const uniqueCartId = Date.now().toString() + Math.random().toString(36).substring(2);
            
            cart.push({
                cartId: uniqueCartId,
                productName: productData.name,
                price: Number(productData.price),
                image: productData.image
            });
            
            updateCartUI();
            openCart(); // Abre o menu lateral quando se adiciona um item
        };

        // Remover um produto do carrinho
        window.removeFromCart = (cartId) => {
            cart = cart.filter(item => item.cartId !== cartId);
            updateCartUI();
        };

        // Renderizar a grelha de produtos na página
        const renderProducts = (category) => {
            const grid = document.getElementById('product-grid');
            grid.innerHTML = '';
            
            // Filtra pela categoria selecionada ou mostra todos
            const filtered = category === 'Todos' ? products : products.filter(p => p.category === category);

            filtered.forEach(product => {
                const card = document.createElement('div');
                card.className = 'product-card';
                
                // Prepara os dados do produto para passar na função onClick
                const productDataStr = JSON.stringify({ 
                    name: product.name, 
                    price: product.price, 
                    image: product.image 
                }).replace(/"/g, '&quot;');
                
                const fallbackAttr = product.fallbackImg ? `onerror="this.src='${product.fallbackImg}'"` : `onerror="this.src='https://placehold.co/400x400/18181b/ffb800?text=Foto'"`;

                card.innerHTML = `
                    <div class="img-wrapper">
                        <img src="${product.image}" alt="${product.name}" class="product-img" ${fallbackAttr}>
                    </div>
                    <div class="flex flex-col" style="flex:1;">
                        <div class="product-cat">${product.category}</div>
                        <h3 class="product-title">${product.name}</h3>
                        <p class="product-desc">${product.description}</p>
                        <div style="margin-top: auto; padding-top: 1rem;">
                            <div class="product-price">R$ ${Number(product.price).toFixed(2)}</div>
                            <button onclick="window.addToCart(${productDataStr})" class="btn btn-primary w-full mt-4">
                                Adicionar ao Carrinho
                            </button>
                        </div>
                    </div>
                `;
                grid.appendChild(card);
            });
        };

        // Inicializar a página quando carregar
        document.addEventListener('DOMContentLoaded', () => {
            // Mostra os produtos e o estado inicial do carrinho
            renderProducts('Todos');
            updateCartUI();

            // Lógica dos botões de filtro
            document.querySelectorAll('.filter-btn').forEach(btn => {
                btn.addEventListener('click', (e) => {
                    // Remove a classe 'active' de todos e adiciona no clicado
                    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                    e.target.classList.add('active');
                    
                    // Renderiza os produtos com a nova categoria
                    renderProducts(e.target.dataset.category);
                });
            });
        });