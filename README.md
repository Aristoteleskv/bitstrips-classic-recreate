# Bitstrips Classic – App Completo

Recriação fiel do **Bitstrips original (2008–2016)** com Character Builder e Comic Builder.

## Como rodar

```bash
git clone https://github.com/Aristoteleskv/bitstrips-classic-recreate.git
cd bitstrips-classic-recreate
npx serve public
```

Abra o URL no browser (ex: `http://localhost:3000`).

## O que o app faz

### Aba Personagem
- Nome, gênero, tom de pele (paleta)
- 5 estilos de cabelo + cores
- Tops (T-Shirt, Hoodie, Camisa, Vestido) + cor
- Bottoms (Calça, Jeans, Saia)
- Óculos e chapéu
- 6 expressões (neutro, feliz, sorriso, triste, surpreso, bravo)
- Botão Aleatório
- Salvar / Carregar (localStorage)
- Exportar PNG

### Aba Tirinha
- Até 4 painéis
- Balões (fala, pensamento, grito, sussurro)
- **Arrastar balões** no canvas (mouse e touch)
- Expressão por painel
- Exportar tirinha PNG em alta resolução (2x)
- Salvar / Carregar tirinha completa

## Arquitetura (`src/`)

```
src/
├── types/
├── core/
│   ├── ColorSystem.ts
│   ├── PoseSystem.ts
│   └── SaveFormat.ts
├── character/
│   ├── AssetLibrary.ts
│   ├── AvatarManager.ts
│   └── AvatarRenderer.ts
└── comic/
    ├── ComicManager.ts
    ├── ComicRenderer.ts
    └── ExportComic.ts
```

## Formato de save

```json
{
  "format": "bitstrips-avatar",
  "version": "1.0.0",
  "avatar": { "...": "..." }
}
```

## Licença

MIT — projeto de recriação educacional/nostálgica.
