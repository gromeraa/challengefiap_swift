# Challenge Swift

Protótipo completo de e-commerce desenvolvido para o Challenge Swift da FIAP, recriando a experiência digital da marca com foco em responsividade, fidelização e jornada de compra. O repositório reúne tanto o front-end navegável quanto o modelo de dados pensado para sustentar a operação.

## 🗂️ Estrutura do projeto

- `challenge_swift_web/` – aplicação estática (HTML, CSS e JavaScript) que apresenta a nova experiência Swift.
- `challenge_swift_bd/` – documentação do modelo de dados exportada em XML a partir da ferramenta de modelagem utilizada no challenge (conceitual, lógico e físico).

## ✨ Principais funcionalidades

- Navegação responsiva com menu mobile e comportamento consistente em desktop.
- Hero banner com autoplay e indicadores, inspirado em campanhas reais da marca.
- Vitrine dinâmica de produtos com carrosséis e cards enriquecidos (preço, selo, avaliações, CTA).
- Página de produto com destaques de venda, cálculo de economia e sugestão de itens relacionados.
- Carrinho funcional em front-end puro, com cálculo de frete, cupons, programa Select Club e animações de feedback.
- Fluxo de cadastro/login com UX refinada (mostrar/ocultar senha, formulários em múltiplos passos).
- Área Swift Club com animações de digitação e CTA para engajamento no programa de fidelidade.

## 🛠️ Stack e recursos

- **HTML5** semântico para organizar conteúdo e melhorar acessibilidade.
- **CSS3** com design system próprio, variáveis, reset e componentes reutilizáveis.
- **Bootstrap 5** para grid responsivo e utilitários produtivos.
- **JavaScript Vanilla (ES6+)** para interações (carrossel, carrinho, cupons, navegação, animações).
- **Font Awesome** e **Google Fonts** para identidade visual próxima da marca.
- **Modelo de dados em PDF** contemplando visão de negócio, lógica e física do banco.

## 🚀 Como executar localmente

A aplicação web é totalmente estática. Você pode abrir `challenge_swift_web/index.html` diretamente no navegador ou, para uma experiência mais próxima de produção, servir os arquivos com HTTP.

```powershell
# Requer Node.js instalados
cd challenge_swift_web
npx serve
```

O comando acima disponibiliza o site em `http://localhost:3000`. Qualquer outro servidor estático (Live Server, http-server, etc.) também funciona.

## 🧱 Modelo de dados

O diretório `challenge_swift_bd` traz o modelo de dados entregue no challenge. Os arquivos XML armazenam entidades, relacionamentos, visões e scripts de geração de DDL. Utilize a mesma ferramenta de modelagem do projeto (ex.: SAP PowerDesigner) para importar o artefato e visualizar diagramas.

Principais entregáveis:

- `logical/` – modelo lógico de dados com entidades e atributos normalizados.
- `rel/` – vista relacional com tabelas, chaves e relacionamentos físicos.
- `mapping/` – mapeamentos e regras de transformação utilizadas na modelagem.

## 🧭 Decisões de design

- Identidade inspirada nas campanhas Swift reais, transcrevendo cores, tipografia e tom.
- Hierarquia visual organizada por variáveis CSS para facilitar manutenção e escalabilidade.
- Interações acessíveis: foco visível, suporte a teclado e mensagens de feedback animadas.
<<<<<<< HEAD
- Lógica de carrinho mantida no front-end para demonstrar a regra de negócio mesmo sem backend.
=======
- Lógica de carrinho mantida no front-end para demonstrar a regra de negócio mesmo sem backend.
>>>>>>> b2dbc29a95953f931ecd9551c17b8147c6495e72
