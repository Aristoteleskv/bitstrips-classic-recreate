# Bitstrips Classic – Recriação

Recriação fiel do sistema de avatares e tirinhas do **Bitstrips original (2008–2016)**.

## Status

### Implementado

| Módulo | Descrição |
|--------|-----------|
| **ColorSystem** | Slots de cor, paletas de pele/cabelo/roupa, resolveColor |
| **PoseSystem** | Poses com transformação de membros (waving, thinking, running…) |
| **SaveFormat** | JSON versionado para avatar e tirinha + localStorage keys |
| **AssetLibrary** | Peças expandidas (cabelos, roupas, acessórios, expressões) |
| **AvatarManager / Renderer** | Criação, recolor, render com ordem clássica |
| **ComicManager / Renderer** | Painéis, balões (fala, pensamento, grito, sussurro) |
| **ExportComic** | Export PNG multi-painel em alta resolução |
| **Demo** | Character Builder interativo em `public/index.html` |

### Docs

- `docs/ASSET_LIBRARY.md` — estrutura de pastas e formato das peças
- `docs/CHARACTER_BUILDER.md` — wireframe + fluxo de lógica da UI

## Estrutura

```
src/
├── types/index.ts
├── core/
│   ├── ColorSystem.ts
│   ├── PoseSystem.ts
│   └── SaveFormat.ts
├── character/
│   ├── AssetLibrary.ts
│   ├── AvatarManager.ts
│   └── AvatarRenderer.ts
├── comic/
│   ├── ComicManager.ts
│   ├── ComicRenderer.ts
│   └── ExportComic.ts
└── index.ts
public/
└── index.html
docs/
├── ASSET_LIBRARY.md
└── CHARACTER_BUILDER.md
```

## Como rodar

```bash
git clone https://github.com/Aristoteleskv/bitstrips-classic-recreate.git
cd bitstrips-classic-recreate
npx serve public
```

## Formato de save (avatar)

```json
{
  "format": "bitstrips-avatar",
  "version": "1.0.0",
  "exportedAt": "2026-11-06T01:00:00.000Z",
  "avatar": { "...": "..." }
}
```

## Próximos passos

- Drag & drop de personagens/balões no Comic Builder
- Carregar peças a partir de JSON em `/assets/parts/`
- Mais props e cenários
- Poses com renderização real de membros transformados no canvas
- UI do Character Builder com grid de thumbnails

## Princípios

- Fidelidade visual ao Bitstrips Classic
- Contornos pretos grossos + cores chapadas
- Arquitetura modular e extensível
- Código limpo e tipado
