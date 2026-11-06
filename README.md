# Bitstrips Classic – App Completo

Recriação do **Bitstrips original (2008–2016)**.

## Correr o app (local completo)

Os ficheiros completos estão em:

```
public/index.html
public/app-assets.js   # peças + estado
public/app-render.js   # desenho avatar/tirinha  (✅ no GitHub)
public/app-ui.js       # controlos + drag + save
public/app.js          # tudo num só ficheiro (alternativa)
```

### Opção A — usar o build local completo

```bash
cd bitstrips-classic-recreate
# copiar os JS completos da pasta de build se ainda não estiverem
npx serve public
```

### Opção B — um só app.js

Se tiveres o `app.js` completo:

```html
<script src="app.js"></script>
```

em vez dos três scripts.

## Funcionalidades

### Personagem
- Pele, cabelo (5 estilos), roupa, óculos, chapéu
- 6 expressões
- Aleatório / Salvar / Carregar / PNG

### Tirinha
- Até 4 painéis
- Balões (fala, pensamento, grito, sussurro)
- Arrastar balões (rato + touch)
- Export PNG 2x

## Arquitetura TypeScript (`src/`)

ColorSystem, PoseSystem, SaveFormat, AvatarManager, ComicManager, ExportComic.

## Repo

https://github.com/Aristoteleskv/bitstrips-classic-recreate
