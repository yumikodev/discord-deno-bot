# Discord Deno Bot

Creado por [@yasuyumiko](https://yumikodev.vercel.app)

## Sobre el proyecto

Esta es una variante del proyecto [discord.ts-bot](https://github.com/yumikodev/discord.ts-bot), pero usando [Deno 2](https://deno.com/blog/v2.0) y la posibilidad de ejecutar Typescript de forma nativa.

## Pasos a seguir.

1. En Deno 2 debemos instalar las dependencias, ejecutaremos `deno install` para eso. [(Leer más)](https://docs.deno.com/runtime/fundamentals/modules/)

2. Para poder ejecutar el comando de desarrollo es necesario instalar [`denon`](https://deno.land/x/denon) globalmente.

   > El siguiente comando es parar un acceso rápido, pero recomiendo consultar la web oficial de [Denon](https://deno.land/x/denon)

   ```bash
   deno install -qAf --global --unstable https://deno.land/x/denon/denon.ts
   ```

3. Ten en cuenta las variables de entorno en el archivo `.env.example` necesarias para que el proyecto funcione (si lo ejecutarás de forma local, crea un archivo `.env` y agrega las variables ahí).

4. Los eventos del bot se encuentran en la carpeta `src/events` y los commandos en `src/commands`.

5. Si quieres que los comandos de aplicación sean globales, puedes cambiarlo en `src/modules/handler/builder`. [(Leer más)](https://discordjs.guide/creating-your-bot/command-deployment.html#guild-commands)

## Comandos

- `deno run start`: Para ejecutar el proyecto en modo producción (**¡SIN COMPILAR!**).

- `deno run dev`: Para ejecutar el proyecto en modo desarrollo (detecta los cambios y reinicia automático, requiere denon (**paso 2**)).

- `deno run lint` o `deno lint`: Para verificar que no hay errores.

## Licencia

Eres libre de usar este código a tu gusto, usa la [licencia MIT](LICENSE).

### Eso es todo :D
