export class ShittyProjectorElement extends HTMLElement {
	static documentStyles = new CSSStyleSheet();

	static {
		this.documentStyles.replaceSync(`
			@property --shitty-projector-scan-y-offset {
				syntax: "<length>";
				inherits: false;
				initial-value: 0px;
			}

			@keyframes shitty-projector-scan {
				from { --shitty-projector-scan-y-offset: 0px; }
				to { --shitty-projector-scan-y-offset: 40px; }
			}

			:root:has(shitty-projector) {
				block-size: 100%;
				transition-property: backdrop-filter, -webkit-backdrop-filter;
				transition-timing-function: ease;
				transition-duration: 1s;
			}

			:root:has(shitty-projector:not(:state(disabled))) {
				filter:
					brightness(0.95)
					contrast(0.9)
					saturate(0.9)
					blur(0.3px)
					hue-rotate(20deg);
				mask: linear-gradient(to bottom, #000, #000 90%, rgb(0 0 0 / 0.95)) 0 var(--shitty-projector-scan-y-offset, 0px) / auto 40px;

				@media (prefers-reduced-motion: no-preference) {
					animation: shitty-projector-scan 40s linear infinite;
				}
			}
		`);

		document.adoptedStyleSheets.push(this.documentStyles);
	}

	#internals = this.attachInternals();

	static get observedAttributes() { return ["disabled"]; }
	attributeChangedCallback(name, oldValue, newValue) {
		if (newValue === name || newValue === "")
			this.#internals.states.add("disabled");
		else this.#internals.states.delete("disabled");
	}
}
