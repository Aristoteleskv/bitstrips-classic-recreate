# Character Builder — Interface + Lógica

## Wireframe

```
┌────────────┬────────────────────────────────┐
│ CATEGORIAS  │           PREVIEW                      │
│ ────────── │      ┌────────────┐                  │
│ ○ Rosto     │      │             │                  │
│ ○ Cabelo    │      │   AVATAR    │                  │
│ ○ Olhos     │      │   GRANDE    │                  │
│ ○ Roupa     │      │             │                  │
│ ○ Acess.    │      └────────────┘                  │
│             │   [Expressão ▼] [Pose ▼]               │
│ PEÇAS       │                                        │
│ ┌──┐┌──┐   │                                        │
│ │  ││  │   │                                        │
│ └──┘└──┘   │                                        │
│ CORES       │                                        │
│ [■■■■■■]   │                                        │
│ [Salvar]    │                                        │
└────────────┴────────────────────────────────┘
```

## Fluxo

1. Selecionar CATEGORIA
2. Grid mostra peças da categoria
3. Clique → `AvatarManager.setPart()`
4. Renderer redesenha
5. Clique cor → `setPartColor()` / `setSkinTone()`
6. Expressão/pose → só estado de render
7. Salvar → `serializeAvatar()` → localStorage / JSON
8. PNG → canvas em alta resolução

## Integração

```
UI ──▶ AvatarManager.setPart / setPartColor
         │
         ▼
      Avatar (estado)
         │
         ▼
      AvatarRenderer.render(ctx, avatar, { expression, pose })
```
