function $(selector, parent) {
  return (parent || document).querySelector(selector);
}
function simpleMultiPrompt(message, fields) {
  return new Promise(function (resolve) {
    const inputs = fields
      .map(
        (field) =>
          `<label for="${field.id}">${field.label}</label>
           <input type="text" id="${field.id}" placeholder="${field.placeholder}" required>`
      )
      .join("<br>");

    const actions = [`<button type="submit">OK</button>`];

    const el = createPromptEl(message + "<br><br>" + inputs, actions);
    document.body.appendChild(el);

    $("#custom-prompt").addEventListener("submit", function (e) {
      e.preventDefault();

      const values = {};
      fields.forEach((field) => {
        values[field.id] = $(`#${field.id}`).value.trim();
      });

      document.body.removeChild(el);
      resolve(values);
    });

    $(`#${fields[0].id}`).focus();
  });
}

function createPromptEl(message, actions, title = "") {
  const el = document.createElement("div");
  el.id = "custom-prompt-container";
  el.innerHTML = `
      <form id="custom-prompt">
        ${title ? `<h3 class="prompt-title">${title}</h3>` : ""}
        <label for="custom-prompt-input">${message}</label>
        <div class="actions">
          ${actions.join("")} 
        </div>
      </form>`;
  return el;
}

function simplePrompt(message, _default, placeholder = "") {
  return new Promise(function (resolve) {
    const actions = [
      `<input type="text" id="custom-prompt-input" placeholder="${placeholder}" required>`,
      `<button type="submit">OK</button>`,
    ];
    const el = createPromptEl(message, actions);
    document.body.appendChild(el);
    const input = $("#custom-prompt-input");
    input.focus();
    input.value = _default;
    $("#custom-prompt").addEventListener("submit", function (e) {
      e.preventDefault();
      const answer = input.value;
      document.body.removeChild(el);
      resolve(answer);
    });
  });
}

function simpleConfirm(
  message,
  { cancel = "Cancel", ok = "OK", focus = "no", title = "" } = {}
) {
  return new Promise(function (resolve) {
    const actions = [
      '<div class="fill"></div>',
      `<button name="action" class="action-btn" type="submit" value="no">${cancel}</button>`,
      `<button name="action" class="action-btn" type="submit" value="yes">${ok}</button>`,
    ];
    const el = createPromptEl(message, actions, title);
    document.body.appendChild(el);
    const input = $(`button[value='${focus}']`, el);
    input && input.focus();
    $("#custom-prompt").addEventListener("submit", function (e) {
      e.preventDefault();
      const answer = e.submitter.value;
      document.body.removeChild(el);
      resolve(answer === "yes");
    });
  });
}

function simpleAlert(message) {
  return new Promise(function (resolve) {
    const actions = [
      '<div class="fill"></div>',
      `<button name="action" class="action-btn" type="submit" value="yes">OK</button>`,
    ];
    const el = createPromptEl(message, actions);
    document.body.appendChild(el);
    const input = $("button", el);
    input.focus();
    $("#custom-prompt").addEventListener("submit", function (e) {
      e.preventDefault();
      document.body.removeChild(el);
      resolve(true);
    });
  });
}
