# 🧢 Pokémon Trainer App

Una aplicación web desarrollada con Angular que te permite convertirte en entrenador Pokémon. Puedes crear tu perfil, seleccionar tu equipo con la primera generación de Pokémon desde la [PokeAPI](https://pokeapi.co/), visualizar tus estadísticas y editar tu información en cualquier momento.

---

## 🚀 Funcionalidades Principales

### 🎮 1. Configura tu Perfil de Entrenador

- Carga de foto (**requerido**)
- Ingreso de nombre (**requerido**)
- Selección de pasatiempo
- Fecha de nacimiento (**requerido**)
- Identificación:
  - DUI con validación de formato y autocompletado de guión (si es mayor de edad)
  - Carnet de minoridad (opcional si es menor)

> Los campos con asterisco son requeridos según la condición del usuario.

---

### 2. Selección de Pokémon

- Consulta y visualiza los Pokémon de la primera generación desde la PokeAPI.
- Filtra por **nombre** o **ID**.
- Selecciona **tres** Pokémon para formar tu equipo.

---

### 3. Perfil del Entrenador

- Muestra:
  - Foto de perfil
  - Nombre, edad y pasatiempo
  - DUI o carnet de minoridad (si está presente)
- Muestra equipo Pokémon:
  - Sprite
  - Nombre
  - Tipo
  - Barra de stats con colores según tipo

> Los stats se escalan con máximos definidos:
>
> - Salud (255), Ataque (190), Defensa (230)
> - Ataque Especial (194), Defensa Especial (230), Velocidad (180)

---

### Edición

- Editar Perfil: modifica nombre, fecha, documento y pasatiempo.
- Editar Pokémon: permite seleccionar nuevos Pokémon para el equipo.

---

---

## Docker

### Construir imagen de producción

```bash
docker build -t pokemon-trainer-app .
```
