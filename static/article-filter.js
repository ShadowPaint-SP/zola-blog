(() => {
	const filterNav = document.querySelector("#article-filters");
	const articleList = document.querySelector("#article-list");

	if (!filterNav || !articleList) {
		return;
	}

	const articles = Array.from(articleList.querySelectorAll("article[data-article-tags]"));
	const controls = Array.from(document.querySelectorAll("[data-filter-tag]"));

	const readLocationTag = () => {
		const params = new URLSearchParams(window.location.search);
		const queryTag = params.get("tag");

		if (queryTag) {
			return queryTag;
		}

		if (window.location.hash.startsWith("#tag=")) {
			return decodeURIComponent(window.location.hash.slice(5));
		}

		return "";
	};

	const writeLocationTag = (tag) => {
		const url = new URL(window.location.href);

		if (tag) {
			url.searchParams.set("tag", tag);
			url.hash = "article-list";
		} else {
			url.searchParams.delete("tag");
			url.hash = "";
		}

		window.history.replaceState(null, "", url);
	};

	const articleHasTag = (article, tag) => {
		if (!tag) {
			return true;
		}

		return article.dataset.articleTags.split("||").includes(tag);
	};

	const applyFilter = (tag, updateUrl = true) => {
		articles.forEach((article) => {
			article.hidden = !articleHasTag(article, tag);
		});

		controls.forEach((control) => {
			const isActive = control.dataset.filterTag === tag;
			control.dataset.filterActive = String(isActive);

			if (control.matches("button")) {
				control.setAttribute("aria-pressed", String(isActive));
			}
		});

		if (updateUrl) {
			writeLocationTag(tag);
		}
	};

	controls.forEach((control) => {
		control.addEventListener("click", (event) => {
			event.preventDefault();
			applyFilter(control.dataset.filterTag || "");
		});
	});

	applyFilter(readLocationTag(), false);
})();
