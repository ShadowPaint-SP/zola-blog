document.addEventListener("DOMContentLoaded", () => {
	const alertLabels = {
		note: "Note",
		tip: "Tip",
		important: "Important",
		warning: "Warning",
		caution: "Caution",
	};

	document.querySelectorAll("blockquote[class*='markdown-alert-']").forEach((alert) => {
		const type = Object.keys(alertLabels).find((name) =>
			alert.classList.contains(`markdown-alert-${name}`),
		);

		if (!type || alert.classList.contains(type)) {
			return;
		}

		alert.classList.add(type);

		const title = document.createElement("p");
		title.classList.add("alert-title");

		const icon = document.createElement("i");
		icon.classList.add("icon");

		title.appendChild(icon);
		title.append(alertLabels[type]);
		alert.prepend(title);
	});

	if (!navigator.clipboard) {
		return;
	}

	const copyCodeText =
		document.getElementById("copy-code-text")?.textContent?.trim() || "Copy Code";

	document.querySelectorAll("pre > code[data-lang]").forEach((code) => {
		const block = code.parentElement;

		if (!(block instanceof HTMLPreElement)) {
			return;
		}

		if (block.closest(".pre-container") || block.closest(".crt")) {
			return;
		}

		const title = document.createElement("span");
		title.textContent = code.getAttribute("data-lang") || "text";

		const icon = document.createElement("i");
		icon.classList.add("icon");

		const button = document.createElement("button");
		button.type = "button";
		button.setAttribute("title", copyCodeText);
		button.setAttribute("aria-label", copyCodeText);
		button.appendChild(icon);

		const header = document.createElement("div");
		header.classList.add("header");
		header.appendChild(title);
		header.appendChild(button);

		const container = document.createElement("div");
		container.classList.add("pre-container");
		container.appendChild(header);

		block.parentNode.insertBefore(container, block);
		container.appendChild(block);

		button.addEventListener("click", async () => {
			await navigator.clipboard.writeText(code.innerText);

			header.classList.add("active");
			button.setAttribute("disabled", "true");

			header.addEventListener(
				"animationend",
				() => {
					header.classList.remove("active");
					button.removeAttribute("disabled");
				},
				{ once: true },
			);
		});
	});
});
