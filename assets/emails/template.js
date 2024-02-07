const template = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="icon" type="image/x-icon" href="./images/favicon.ico" />
    <title>JedyDev</title>
    <style>
      :root {
        --bg-color: #363062;
        --primary-color: #435585;
        --secondary-color: #818fb4;
        --optional-color: #f5e8c7;
        --text-color: white;
        --resalt-color: #ffc436;
        --keys-color: #ff9130;
        --content-text-color: #00a135;
      }

      * {
        box-sizing: border-box !important;
      }

      body {
        margin: 0;
        padding: 0;
        width: 100vw;
        overflow-x: hidden;
        font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI",
          Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue",
          sans-serif;
        background-color: var(--bg-color);
        color: var(--text-color);
        padding: 50px 0;
      }

      h2,
      h3,
      h4 {
        margin: 0;
        padding: 0;
      }

      /* Contenedores */

      main {
        width: 100%;
        display: flex;
        justify-content: center;
      }

      .container {
        width: 100%;
        max-width: 100%;
        margin: 0 10px;
        display: flex;
        flex-direction: column;
        gap: 50px;
      }

      .title_container {
        display: flex;
        gap: 10px;
      }

      .box {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .box_description {
        padding-left: 50px;
      }

      .subtitles {
        background-color: var(--secondary-color);
        padding: 10px 7px;
        border-radius: 10px;
      }

      .content__box {
        display: flex;
        flex-direction: column;
        gap: 20px;
      }

      .content_items {
        display: flex;
        gap: 7px;
      }

      .box_section2 {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }

      .contain_section2 {
        display: flex;
        flex-direction: column;
        gap: 30px;
      }

      /* Elementos */
      .fragments {
        max-width: 310px;
        color: var(--optional-color);
        overflow: hidden;
        border-right: 0.15em solid var(--optional-color);
        white-space: nowrap;
        letter-spacing: 0.15em;
        animation: typing 4s steps(50, end), blink-caret 0.75s step-end infinite;
        /* animation: typing 4s linear 0s 1 normal both,
          blink-caret 0.75s step-end infinite; */
      }

      .keys {
        color: var(--keys-color);
        margin: 0;
        padding: 0;
      }

      .values {
        color: var(--resalt-color);
      }

      .content_text {
        color: var(--content-text-color);
      }

      /* Container .container */

      /* Extra small */
      @media screen and (min-width: 576px) {
        .container {
          max-width: 540px;
        }
      }

      /* Small */
      @media screen and (min-width: 768px) {
        .container {
          max-width: 720px;
        }
      }

      /* Medium */
      @media screen and (min-width: 992px) {
        .container {
          max-width: 960px;
        }
      }

      /* large */
      @media screen and (min-width: 1200px) {
        .container {
          max-width: 1140px;
        }
      }

      /* Animaciones */
      @keyframes typing {
        from {
          width: 0;
        }
        to {
          width: 100%;
        }
      }

      @keyframes blink-caret {
        from,
        to {
          border-color: transparent;
        }
        50% {
          border-color: var(--optional-color);
        }
      }
    </style>
  </head>
  <body>
    <!-- Pagina principal -->
    <main>
      <div class="container">
        <!-- Titulo -->
        <div class="title_container">
          <h1>Welcome to technical test of</h1>
          <h1 class="fragments">Steam Academy</h1>
        </div>
        <!-- Boxes -->
      </div>
    </main>
  </body>
</html>
`;

module.exports = template;
