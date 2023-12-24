import "./style.css";

const $ = (selector) => document.querySelector(selector);

const $html = $("#html");
const $css = $("#css");
const $js = $("#js");

function update() {
  const html = createHtml();
  $("iframe").setAttribute("srcdoc", html);
}

$js.addEventListener("input", update);

$css.addEventListener("input", update);

$html.addEventListener("input", update);

const createHtml = () => {
  const html = $html.value;
  const css = $css.value;
  const js = $js.value;
  return `
  <!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style>
    ${css}
    </style>
  </head>
  <body>
  ${html}

  <script>
  ${js}
  </script>
  </body>
  </html>
  `;
};

document.addEventListener("keydown", (e) => {
  if (e.key === "{") {
    // Evitar la inserción automática de '{' en algunos campos de texto
    e.preventDefault();

    // Obtener el elemento enfocado actualmente
    const focusedElement = document.activeElement;

    // Verificar si el elemento enfocado es un campo de texto editable
    if (
      focusedElement.tagName === "TEXTAREA" ||
      (focusedElement.tagName === "INPUT" &&
        ["text", "search", "password", "tel", "url"].includes(
          focusedElement.type.toLowerCase()
        ))
    ) {
      const cursorPosition = focusedElement.selectionStart;

      const textBeforeCursor = focusedElement.value.slice(0, cursorPosition);
      const textAfterCursor = focusedElement.value.slice(cursorPosition);

      focusedElement.value = `${textBeforeCursor}{}${textAfterCursor}`;

      focusedElement.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
    }
  }
});
