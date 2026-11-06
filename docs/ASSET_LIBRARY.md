# Asset Library — Estrutura de Arquivos

## Visão geral

A biblioteca de assets é organizada por **categoria de peça**, espelhando o sistema modular do Bitstrips original.

```
assets/
├── parts/
│   ├── head/
│   ├── hairFront/
│   ├── hairBack/
│   ├── eyes/
│   ├── eyebrows/
│   ├── nose/
│   ├── mouth/
│   ├── ears/
│   ├── body/
│   ├── top/
│   ├── bottom/
│   ├── shoes/
│   ├── glasses/
│   └── hat/
├── expressions/
├── poses/
├── props/
├── backgrounds/
└── balloons/
```

## Formato de um Part (JSON)

```json
{
  "id": "hair_front_medium_01",
  "category": "hairFront",
  "name": "Medium Side Part",
  "tags": ["medium", "female"],
  "zIndex": 90,
  "colorSlots": ["hair"],
  "defaultColors": { "hair": "#5C3A21" },
  "layers": [
    {
      "id": "hair_base",
      "type": "shape",
      "pathData": "M14,42 C22,15 ... Z",
      "colorSlot": "hair"
    }
  ]
}
```

## Coordenadas canônicas

Espaço do personagem: **0–100 (X) × 0–300 (Y)**

- Head: ~0–140
- Torso: ~140–220
- Legs: ~220–300

## Regras

1. Um arquivo por peça
2. IDs estáveis (não renomear)
3. Tags para filtros na UI
4. zIndex segue CLASSIC_RENDER_ORDER
5. Cores só via slots
