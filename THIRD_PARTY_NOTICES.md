# Third-party components

## Adapted layout editor

- Source: [honkoku-ocr-web](https://github.com/yuta1984/honkoku-ocr-web), by **Yuta Hashimoto / 橋本雄太**.
- Fixed revision: `24469701412edda5be26c89784a29c7525bbb899`.
- License: [Creative Commons Attribution 4.0 International](https://creativecommons.org/licenses/by/4.0/).
- Adapted files: `ui/ImageViewer.tsx`, `ui/main.tsx`, portions of `ui/viewer.css` and `ui/workspace.css`.
- Changes: local data types; NDL plain text replaces Koji conversion; integration with Omeka and server-side inference; a sequential parent workspace; disabling geometry edits outside the layout stage; explicit line focus; direction-aware vertical/horizontal display; orientation-aware keyboard and button reordering. Subsequent reliability changes are noted in the source.
- The original browser inference, browser model cache, commercial LLM connectors and data store are not bundled. This module is an independent adaptation; attribution does not imply endorsement.
- The upstream license is retained at `licenses/honkoku-ocr-web-CC-BY-4.0.txt`.

## OCR backend

- [NDL古典籍OCR-Lite](https://github.com/ndl-lab/ndlkotenocr-lite), National Diet Library, Japan.
- Fixed revision: `ede4283845cdc0ba2bda8b7ebfc3dc80b33c92c8`.
- License: CC BY 4.0; see the original `LICENCE` and `LICENCE_DEPENDENCEIES` retained in `worker/vendor/ndlkotenocr/` and copies under `licenses/`.
- We bundle an unmodified runtime subset (RTMDet, PARSeq, XML generation, reading-order code and character/class configuration) under `worker/vendor/ndlkotenocr/`. Its file hashes and origin are recorded in `ORIGIN.json`. Models, GUI, training code, samples and Git history are excluded. We import these bundled files at runtime. The adapter separates layout and character recognition, applies CPU-only ONNX session options, and passes manually edited image-coordinate rectangles into PARSeq. The NDL original source and models remain unchanged.

## UI packages

React / React DOM (MIT) and OpenSeadragon (BSD-3-Clause) are bundled by Vite. Their license texts are retained under `licenses/`. Build dependency versions are recorded in `package-lock.json`.

## Optional translation models

- Original model: [Qwen3-4B-Instruct-2507](https://huggingface.co/Qwen/Qwen3-4B-Instruct-2507), Apache 2.0.
- GGUF conversion: [bartowski/Qwen_Qwen3-4B-Instruct-2507-GGUF](https://huggingface.co/bartowski/Qwen_Qwen3-4B-Instruct-2507-GGUF), revision `ae44f08e1392f39c0e474af10c3ff8355c8b6688`, `Q4_K_M`.
- Runtime: [llama.cpp](https://github.com/ggml-org/llama.cpp), MIT, pinned build `b10980`.
- Model files are downloaded separately into the private runtime, not bundled in this module. Their sources, fixed revisions, sizes, hashes and license links are recorded in `worker/models.json`.

### Qwen3.5-9B

- Original model: [Qwen3.5-9B](https://huggingface.co/Qwen/Qwen3.5-9B), Apache 2.0.
- GGUF conversion: [bartowski/Qwen_Qwen3.5-9B-GGUF](https://huggingface.co/bartowski/Qwen_Qwen3.5-9B-GGUF), revision `182be2fd6c7bc44887d88a91cb03ff009cc9f549`, Q4_K_M.
- The model is downloaded separately. `worker/models.json` pins its source, size, hash and license link. Weights are not modified by this module.
- Only text inference is used. The UI labels all generated translations for human review.

### Qwen3.5-35B-A3B

- Original model: [Qwen3.5-35B-A3B](https://huggingface.co/Qwen/Qwen3.5-35B-A3B), Apache 2.0.
- GGUF conversion: [bartowski/Qwen_Qwen3.5-35B-A3B-GGUF](https://huggingface.co/bartowski/Qwen_Qwen3.5-35B-A3B-GGUF), revision `3d2a22d4eb631b9c8fd2be94599dc2fd84b4a595`, Q4_K_M.
- Model weights are downloaded separately into the private runtime, with the fixed size and SHA-256 recorded in `worker/models.json`. Weights are not modified by this module; only text inference is used.

## License scope of this distribution

The original code of Kobun OCR / Translation is distributed under GPL-3.0-or-later. That license does not replace the licenses on the third-party material listed above. The adapted honkoku-ocr-web material and the bundled NDL runtime subset remain subject to CC BY 4.0, with attribution and change notices preserved here and in the corresponding source files.
