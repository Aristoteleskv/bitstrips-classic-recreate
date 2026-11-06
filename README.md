# Bitstrips Classic – Recriação

Recriação fiel do sistema de avatares e tirinhas do **Bitstrips original (2008–2016)**.

## Status atual

### Já implementado

**Arquitetura**
- Sistema modular de personagens (parts + layers + color slots)
- Ordem de renderização clássica do Bitstrips
- Expressões e poses separadas
- Estrutura completa para Comic Builder

**Biblioteca de peças expandida**
- 5 estilos de cabelo (curto, médio, longo, espetado, cacheado) + frente/trás
- Vários olhos, sobrancelhas, bocas (neutro, sorriso, grin, triste, surpreso)
- Tops: T-Shirt, Hoodie, Camisa social, Vestido
- Bottoms: Calça, Jeans, Saia
- Acessórios: óculos redondos/retangulares, boné, gorro
- Shapes SVG melhorados (mais próximos do visual clássico)

**Comic Builder (base)**
- `ComicManager` – criação de tirinhas, painéis, personagens e balões
- `ComicRenderer` – renderização de painéis + balões (fala, pensamento, grito, sussurro)

**Demo (`public/index.html`)**
- Character Builder interativo
- Troca de gênero, pele, cabelo, roupa, acessórios e expressões
- Botão Aleatório
- Exportação PNG e JSON
- Salvamento local (localStorage)

## Estrutura

```
src/
├── types/index.ts
├── character/
│   ├── AvatarManager.ts
│   ├── AssetLibrary.ts
│   └── AvatarRenderer.ts
├── comic/
│   ├── ComicManager.ts
│   └── ComicRenderer.ts
└── index.ts
public/
└── index.html
```

## Como rodar

```bash
cd bitstrips-classic-recreate
npx serve public
```

Abra o endereço mostrado no terminal.

## Próximos passos

- Integrar o ComicRenderer completo na demo (arrastar personagens/balões)
- Mais peças e props
- Melhorar ainda mais os paths SVG
- Sistema de poses com transformação de membros
- Exportação de tirinha multi-painel em alta resolução

## Princípios

- Fidelidade visual ao Bitstrips Classic
- Contornos pretos grossos + cores chapadas
- Arquitetura modular e extensível
- Código limpo e tipado
