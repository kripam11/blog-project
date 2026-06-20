async function apiRequest(method, url, body) {
  const options = { method, headers: {} };

  if (body && Object.keys(body).length > 0) {
    options.headers["Content-Type"] = "application/json";
    options.body = JSON.stringify(body);
  }

  const response = await fetch(url, options);
  const text = await response.text();

  let data;
  try {
    data = JSON.parse(text);
  } catch {
    data = text;
  }

  showResult(method, url, response.status, data);
}

function showResult(method, url, status, data) {
  const output = document.getElementById("api-result");
  output.textContent = JSON.stringify({ method, url, status, data }, null, 2);
  output.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function getFormData(form) {
  const data = {};
  for (const [key, value] of new FormData(form).entries()) {
    if (value.trim() !== "") {
      data[key] = value.trim();
    }
  }
  return data;
}

document.querySelectorAll("[data-api-form]").forEach((form) => {
  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    const method = form.dataset.method;
    let url = form.dataset.url;
    const data = getFormData(form);

    for (const [key, value] of Object.entries(data)) {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, encodeURIComponent(value));
        delete data[key];
      }
    }

    await apiRequest(method, url, data);
  });
});
