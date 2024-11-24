export class GlitchPass extends Pass {
	constructor(dt_size?: number);
	uniforms: object;
	material: ShaderMaterial;
	fsQuad: FullScreenQuad;
	goWild: boolean;
	curF: number;
	randX: number;
	isPass: boolean;
	enabled: boolean;
	needsSwap: boolean;
	clear: boolean;
	renderToScreen: boolean;

	generateTrigger(): void;
	generateHeightmap(dt_size: number): DataTexture;
	setSize(width: number, height: number): void;
	render(renderer: WebGLRenderer, writeBuffer: WebGLRenderTarget, readBuffer: WebGLRenderTarget, deltaTime: number, maskActive: boolean): void;
	dispose(): void;
}
