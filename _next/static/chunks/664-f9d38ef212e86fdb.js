"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[664],{387:(e,t,r)=>{r.d(t,{a:()=>ti});var n=r(3264),i=class{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}},o=new n.qUd(-1,1,1,-1,0,1),s=new n.LoY;s.setAttribute("position",new n.qtW([-1,3,0,-1,-1,0,3,-1,0],3)),s.setAttribute("uv",new n.qtW([0,2,0,0,2,0],2));var a=class{constructor(e){this._mesh=new n.eaF(s,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,o)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},l=class extends i{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){let n,i,o=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0),this.inverse?(n=0,i=1):(n=1,i=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(o.REPLACE,o.REPLACE,o.REPLACE),s.buffers.stencil.setFunc(o.ALWAYS,n,0xffffffff),s.buffers.stencil.setClear(i),s.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(o.EQUAL,1,0xffffffff),s.buffers.stencil.setOp(o.KEEP,o.KEEP,o.KEEP),s.buffers.stencil.setLocked(!0)}},c=class extends i{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},u=class extends i{constructor(e,t){super(),this.textureID=void 0!==t?t:"tDiffuse",e instanceof n.BKk?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=n.LlO.clone(e.uniforms),this.material=new n.BKk({defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this.fsQuad=new a(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this.fsQuad.material=this.material,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this.fsQuad.render(e)}},d={uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;

		}`},h=class{constructor(e,t){if(this.renderer=e,void 0===t){let r={minFilter:n.k6q,magFilter:n.k6q,format:n.GWd},i=e.getSize(new n.I9Y);this._pixelRatio=e.getPixelRatio(),this._width=i.width,this._height=i.height,(t=new n.nWS(this._width*this._pixelRatio,this._height*this._pixelRatio,r)).texture.name="EffectComposer.rt1"}else this._pixelRatio=1,this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],void 0===d&&console.error("THREE.EffectComposer relies on CopyShader"),void 0===u&&console.error("THREE.EffectComposer relies on ShaderPass"),this.copyPass=new u(d),this.clock=new n.zD7}swapBuffers(){let e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){let t=this.passes.indexOf(e);-1!==t&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){void 0===e&&(e=this.clock.getDelta());let t=this.renderer.getRenderTarget(),r=!1;for(let t=0,n=this.passes.length;t<n;t++){let n=this.passes[t];if(!1!==n.enabled){if(n.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(t),n.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),n.needsSwap){if(r){let t=this.renderer.getContext(),r=this.renderer.state.buffers.stencil;r.setFunc(t.NOTEQUAL,1,0xffffffff),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),r.setFunc(t.EQUAL,1,0xffffffff)}this.swapBuffers()}void 0!==l&&(n instanceof l?r=!0:n instanceof c&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(void 0===e){let t=this.renderer.getSize(new n.I9Y);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,(e=this.renderTarget1.clone()).setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;let r=this._width*this._pixelRatio,n=this._height*this._pixelRatio;this.renderTarget1.setSize(r,n),this.renderTarget2.setSize(r,n);for(let e=0;e<this.passes.length;e++)this.passes[e].setSize(r,n)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}},f=(new n.qUd(-1,1,1,-1,0,1),new n.LoY);f.setAttribute("position",new n.qtW([-1,3,0,-1,-1,0,3,-1,0],3)),f.setAttribute("uv",new n.qtW([0,2,0,0,2,0],2));var p=class extends i{constructor(e,t,r,i,o){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=void 0!==o?o:0,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new n.Q1f}render(e,t,r){let n,i,o=e.autoClear;e.autoClear=!1,void 0!==this.overrideMaterial&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor&&(e.getClearColor(this._oldClearColor),n=e.getClearAlpha(),e.setClearColor(this.clearColor,this.clearAlpha)),this.clearDepth&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor&&e.setClearColor(this._oldClearColor,n),void 0!==this.overrideMaterial&&(this.scene.overrideMaterial=i),e.autoClear=o}},m={SKIP:0,ADD:1,ALPHA:2,AVERAGE:3,COLOR_BURN:4,COLOR_DODGE:5,DARKEN:6,DIFFERENCE:7,EXCLUSION:8,LIGHTEN:9,MULTIPLY:10,DIVIDE:11,NEGATION:12,NORMAL:13,OVERLAY:14,REFLECT:15,SCREEN:16,SOFT_LIGHT:17,SUBTRACT:18},g=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return min(x + y, 1.0) * opacity + x * (1.0 - opacity);

}
`,v=`vec3 blend(const in vec3 x, const in vec3 y, const in float opacity) {

	return y * opacity + x * (1.0 - opacity);

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	float a = min(y.a, opacity);

	return vec4(blend(x.rgb, y.rgb, a), max(x.a, a));

}
`,_=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return (x + y) * 0.5 * opacity + x * (1.0 - opacity);

}
`,y=`float blend(const in float x, const in float y) {

	return (y == 0.0) ? y : max(1.0 - (1.0 - x) / y, 0.0);

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`,C=`float blend(const in float x, const in float y) {

	return (y == 1.0) ? y : min(x / (1.0 - y), 1.0);

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`,x=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return min(x, y) * opacity + x * (1.0 - opacity);

}
`,b=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return abs(x - y) * opacity + x * (1.0 - opacity);

}
`,E=`float blend(const in float x, const in float y) {

	return (y > 0.0) ? min(x / y, 1.0) : 1.0;

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`,T=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return (x + y - 2.0 * x * y) * opacity + x * (1.0 - opacity);

}
`,w=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return max(x, y) * opacity + x * (1.0 - opacity);

}
`,O=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return x * y * opacity + x * (1.0 - opacity);

}
`,S=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return (1.0 - abs(1.0 - x - y)) * opacity + x * (1.0 - opacity);

}
`,A=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return y * opacity + x * (1.0 - opacity);

}
`,P=`float blend(const in float x, const in float y) {

	return (x < 0.5) ? (2.0 * x * y) : (1.0 - 2.0 * (1.0 - x) * (1.0 - y));

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`,D=`float blend(const in float x, const in float y) {

	return (y == 1.0) ? y : min(x * x / (1.0 - y), 1.0);

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`,z=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return (1.0 - (1.0 - x) * (1.0 - y)) * opacity + x * (1.0 - opacity);

}
`,R=`float blend(const in float x, const in float y) {

	return (y < 0.5) ?
		(2.0 * x * y + x * x * (1.0 - 2.0 * y)) :
		(sqrt(x) * (2.0 * y - 1.0) + 2.0 * x * (1.0 - y));

}

vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	vec4 z = vec4(
		blend(x.r, y.r),
		blend(x.g, y.g),
		blend(x.b, y.b),
		blend(x.a, y.a)
	);

	return z * opacity + x * (1.0 - opacity);

}
`,M=`vec4 blend(const in vec4 x, const in vec4 y, const in float opacity) {

	return max(x + y - 1.0, 0.0) * opacity + x * (1.0 - opacity);

}
`,B=new Map([[m.SKIP,null],[m.ADD,g],[m.ALPHA,v],[m.AVERAGE,_],[m.COLOR_BURN,y],[m.COLOR_DODGE,C],[m.DARKEN,x],[m.DIFFERENCE,b],[m.EXCLUSION,T],[m.LIGHTEN,w],[m.MULTIPLY,O],[m.DIVIDE,E],[m.NEGATION,S],[m.NORMAL,A],[m.OVERLAY,P],[m.REFLECT,D],[m.SCREEN,z],[m.SOFT_LIGHT,R],[m.SUBTRACT,M]]),L=class extends n.Qev{constructor(e,t=1){super(),this.blendFunction=e,this.opacity=new n.nc$(t)}getBlendFunction(){return this.blendFunction}setBlendFunction(e){this.blendFunction=e,this.dispatchEvent({type:"change"})}getShaderCode(){return B.get(this.blendFunction)}},F={uniforms:{tDiffuse:{value:null},shape:{value:1},radius:{value:2},rotateR:{value:Math.PI/12*1},rotateG:{value:Math.PI/12*2},rotateB:{value:Math.PI/12*3},scatter:{value:1},width:{value:20},height:{value:20},blending:{value:1},blendingMode:{value:1},greyscale:{value:!1},disable:{value:!1}},vertexShader:`

		varying vec2 vUV;
		varying vec3 vPosition;

		void main() {

			vUV = uv;
			vPosition = position;

			gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

		}`,fragmentShader:`

		#define SQRT2_MINUS_ONE 0.41421356
		#define SQRT2_HALF_MINUS_ONE 0.20710678
		#define PI2 6.28318531
		#define SHAPE_DOT 1
		#define SHAPE_ELLIPSE 2
		#define SHAPE_LINE 3
		#define SHAPE_SQUARE 4
		#define BLENDING_LINEAR 1
		#define BLENDING_MULTIPLY 2
		#define BLENDING_ADD 3
		#define BLENDING_LIGHTER 4
		#define BLENDING_DARKER 5
		uniform sampler2D tDiffuse;
		uniform float radius;
		uniform float rotateR;
		uniform float rotateG;
		uniform float rotateB;
		uniform float scatter;
		uniform float width;
		uniform float height;
		uniform int shape;
		uniform bool disable;
		uniform float blending;
		uniform int blendingMode;
		varying vec2 vUV;
		varying vec3 vPosition;
		uniform bool greyscale;
		const int samples = 8;

		float blend( float a, float b, float t ) {

		// linear blend
			return a * ( 1.0 - t ) + b * t;

		}

		float hypot( float x, float y ) {

		// vector magnitude
			return sqrt( x * x + y * y );

		}

		float rand( vec2 seed ){

		// get pseudo-random number
			return fract( sin( dot( seed.xy, vec2( 12.9898, 78.233 ) ) ) * 43758.5453 );

		}

		float distanceToDotRadius( float channel, vec2 coord, vec2 normal, vec2 p, float angle, float rad_max ) {

		// apply shape-specific transforms
			float dist = hypot( coord.x - p.x, coord.y - p.y );
			float rad = channel;

			if ( shape == SHAPE_DOT ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

			} else if ( shape == SHAPE_ELLIPSE ) {

				rad = pow( abs( rad ), 1.125 ) * rad_max;

				if ( dist != 0.0 ) {
					float dot_p = abs( ( p.x - coord.x ) / dist * normal.x + ( p.y - coord.y ) / dist * normal.y );
					dist = ( dist * ( 1.0 - SQRT2_HALF_MINUS_ONE ) ) + dot_p * dist * SQRT2_MINUS_ONE;
				}

			} else if ( shape == SHAPE_LINE ) {

				rad = pow( abs( rad ), 1.5) * rad_max;
				float dot_p = ( p.x - coord.x ) * normal.x + ( p.y - coord.y ) * normal.y;
				dist = hypot( normal.x * dot_p, normal.y * dot_p );

			} else if ( shape == SHAPE_SQUARE ) {

				float theta = atan( p.y - coord.y, p.x - coord.x ) - angle;
				float sin_t = abs( sin( theta ) );
				float cos_t = abs( cos( theta ) );
				rad = pow( abs( rad ), 1.4 );
				rad = rad_max * ( rad + ( ( sin_t > cos_t ) ? rad - sin_t * rad : rad - cos_t * rad ) );

			}

			return rad - dist;

		}

		struct Cell {

		// grid sample positions
			vec2 normal;
			vec2 p1;
			vec2 p2;
			vec2 p3;
			vec2 p4;
			float samp2;
			float samp1;
			float samp3;
			float samp4;

		};

		vec4 getSample( vec2 point ) {

		// multi-sampled point
			vec4 tex = texture2D( tDiffuse, vec2( point.x / width, point.y / height ) );
			float base = rand( vec2( floor( point.x ), floor( point.y ) ) ) * PI2;
			float step = PI2 / float( samples );
			// float dist = radius * 0.66;
			float dist = radius * 0.0;

			for ( int i = 0; i < samples; ++i ) {

				float r = base + step * float( i );
				vec2 coord = point + vec2( cos( r ) * dist, sin( r ) * dist );
				tex += texture2D( tDiffuse, vec2( coord.x / width, coord.y / height ) );

			}

			tex /= float( samples ) + 1.0;
			return tex;

		}

		float getDotColour( Cell c, vec2 p, int channel, float angle, float aa ) {

		// get colour for given point
			float dist_c_1, dist_c_2, dist_c_3, dist_c_4, res;

			if ( channel == 0 ) {

				c.samp1 = getSample( c.p1 ).r;
				c.samp2 = getSample( c.p2 ).r;
				c.samp3 = getSample( c.p3 ).r;
				c.samp4 = getSample( c.p4 ).r;

			} else if (channel == 1) {

				c.samp1 = getSample( c.p1 ).g;
				c.samp2 = getSample( c.p2 ).g;
				c.samp3 = getSample( c.p3 ).g;
				c.samp4 = getSample( c.p4 ).g;

			} else {

				c.samp1 = getSample( c.p1 ).b;
				c.samp3 = getSample( c.p3 ).b;
				c.samp2 = getSample( c.p2 ).b;
				c.samp4 = getSample( c.p4 ).b;

			}

			dist_c_1 = distanceToDotRadius( c.samp1, c.p1, c.normal, p, angle, radius );
			dist_c_2 = distanceToDotRadius( c.samp2, c.p2, c.normal, p, angle, radius );
			dist_c_3 = distanceToDotRadius( c.samp3, c.p3, c.normal, p, angle, radius );
			dist_c_4 = distanceToDotRadius( c.samp4, c.p4, c.normal, p, angle, radius );
			res = ( dist_c_1 > 0.0 ) ? clamp( dist_c_1 / aa, 0.0, 1.0 ) : 0.0;
			// res = 0.0;
			res += ( dist_c_2 > 0.0 ) ? clamp( dist_c_2 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_3 > 0.0 ) ? clamp( dist_c_3 / aa, 0.0, 1.0 ) : 0.0;
			res += ( dist_c_4 > 0.0 ) ? clamp( dist_c_4 / aa, 0.0, 1.0 ) : 0.0;
			res = clamp( res, 0.0, 1.0 );

			return res;
			// return 2

		}

		Cell getReferenceCell( vec2 p, vec2 origin, float grid_angle, float step ) {

		// get containing cell
			Cell c;

		// calc grid
			vec2 n = vec2( cos( grid_angle ), sin( grid_angle ) );
			float threshold = step * 0.5;
			float dot_normal = n.x * ( p.x - origin.x ) + n.y * ( p.y - origin.y );
			float dot_line = -n.y * ( p.x - origin.x ) + n.x * ( p.y - origin.y );
			vec2 offset = vec2( n.x * dot_normal, n.y * dot_normal );
			float offset_normal = mod( hypot( offset.x, offset.y ), step );
			float normal_dir = ( dot_normal < 0.0 ) ? 1.0 : -1.0;
			float normal_scale = ( ( offset_normal < threshold ) ? -offset_normal : step - offset_normal ) * normal_dir;
			float offset_line = mod( hypot( ( p.x - offset.x ) - origin.x, ( p.y - offset.y ) - origin.y ), step );
			float line_dir = ( dot_line < 0.0 ) ? 1.0 : -1.0;
			float line_scale = ( ( offset_line < threshold ) ? -offset_line : step - offset_line ) * line_dir;

		// get closest corner
			c.normal = n;
			c.p1.x = p.x - n.x * normal_scale + n.y * line_scale;
			c.p1.y = p.y - n.y * normal_scale - n.x * line_scale;

		// scatter
			if ( scatter != 0.0 ) {

				float off_mag = scatter * threshold * 0.5;
				float off_angle = rand( vec2( floor( c.p1.x ), floor( c.p1.y ) ) ) * PI2;
				c.p1.x += cos( off_angle ) * off_mag;
				c.p1.y += sin( off_angle ) * off_mag;

			}

		// find corners
			float normal_step = normal_dir * ( ( offset_normal < threshold ) ? step : -step );
			float line_step = line_dir * ( ( offset_line < threshold ) ? step : -step );
			c.p2.x = c.p1.x - n.x * normal_step;
			c.p2.y = c.p1.y - n.y * normal_step;
			c.p3.x = c.p1.x + n.y * line_step;
			c.p3.y = c.p1.y - n.x * line_step;
			c.p4.x = c.p1.x - n.x * normal_step + n.y * line_step;
			c.p4.y = c.p1.y - n.y * normal_step - n.x * line_step;

			return c;

		}

		float blendColour( float a, float b, float t ) {

		// blend colours
			if ( blendingMode == BLENDING_LINEAR ) {
				return blend( a, b, 1.0 - t );
			} else if ( blendingMode == BLENDING_ADD ) {
				return blend( a, min( 1.0, a + b ), t );
			} else if ( blendingMode == BLENDING_MULTIPLY ) {
				return blend( a, max( 0.0, a * b ), t );
			} else if ( blendingMode == BLENDING_LIGHTER ) {
				return blend( a, max( a, b ), t );
			} else if ( blendingMode == BLENDING_DARKER ) {
				return blend( a, min( a, b ), t );
			} else {
				return blend( a, b, 1.0 - t );
			}

		}

		void main() {

			if ( ! disable ) {

		// setup
				vec2 p = vec2( vUV.x * width, vUV.y * height ) - vec2(vPosition.x, vPosition.y) * 3.0; // - position values to remove black borders.
				vec2 origin = vec2( 0, 0 );
				float aa = ( radius < 2.5 ) ? radius * 0.5 : 1.25;
				// float aa = 0.0;

		// get channel samples
				Cell cell_r = getReferenceCell( p, origin, rotateR, radius );
				Cell cell_g = getReferenceCell( p, origin, rotateG, radius );
				Cell cell_b = getReferenceCell( p, origin, rotateB, radius );
				float r = getDotColour( cell_r, p, 0, rotateR, aa );
				float g = getDotColour( cell_g, p, 1, rotateG, aa );
				float b = getDotColour( cell_b, p, 2, rotateB, aa );

		// blend with original
				vec4 colour = texture2D( tDiffuse, vUV );
				
				// add masking before blendColour
				if (colour.r == 0.0) {
					r = 0.0;
				} else {
					r = blendColour( r, colour.r, blending );
				}

				if (colour.g == 0.0) {
					g = 0.0;
				} else {
					g = blendColour( g, colour.g, blending );
				}

				if (colour.b == 0.0) {
					b = 0.0;
				} else {
					b = blendColour( b, colour.b, blending );
				}
				
				
				

				if ( greyscale ) {
					r = g = b = (r + b + g) / 3.0;
				}

				// add alpha channel to each r, g, b colors
				vec4 vR;
				vec4 vG;
				vec4 vB;
	
				// apply transparent to outside of mesh
				if (r == 0.0 && colour.r == 0.0) {
					vR = vec4( 0, 0, 0, 0 );
				} else {
					vR = vec4( r, 0, 0, 1 );
				}
	
				if (g == 0.0 && colour.g == 0.0) {
					vG = vec4( 0, 0, 0, 0 );
				} else {
					vG = vec4( 0, g, 0, 1 );
				}
	
				if (b == 0.0 && colour.b == 0.0) {
					vB = vec4( 0, 0, 0, 0 );
				} else {
					vB = vec4( 0, 0, b, 1 );
				}

				// gl_FragColor = vec4( r, g, b, 1.0 );
				gl_FragColor = vR + vG + vB;

			} else {

				gl_FragColor = texture2D( tDiffuse, vUV );

			}

		}`},k=class{constructor(){this.enabled=!0,this.needsSwap=!0,this.clear=!1,this.renderToScreen=!1}setSize(){}render(){console.error("THREE.Pass: .render() must be implemented in derived pass.")}},U=new n.qUd(-1,1,1,-1,0,1),j=new n.LoY;j.setAttribute("position",new n.qtW([-1,3,0,-1,-1,0,3,-1,0],3)),j.setAttribute("uv",new n.qtW([0,2,0,0,2,0],2));var I=class{constructor(e){this._mesh=new n.eaF(j,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,U)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}},N=class extends k{constructor(e,t,r){super(),void 0===F&&console.error("THREE.HalftonePass requires HalftoneShader"),this.uniforms=n.LlO.clone(F.uniforms),this.material=new n.BKk({uniforms:this.uniforms,fragmentShader:F.fragmentShader,vertexShader:F.vertexShader}),this.uniforms.width.value=e,this.uniforms.height.value=t,this.uniforms.disable.value=r.disable,this.fsQuad=new I(this.material),this.blendMode=new L(m.SCREEN),this.extensions=null}render(e,t,r){this.material.uniforms.tDiffuse.value=r.texture,this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(t),this.clear&&e.clear()),this.fsQuad.render(e)}setSize(e,t){this.uniforms.width.value=e,this.uniforms.height.value=t}initialize(e,t,r){}addEventListener(){}getAttributes(){return this.attributes}getFragmentShader(){return F.fragmentShader}getVertexShader(){return F.vertexShader}update(e,t,r){}},H=r(2115),Y=r(3816),V=r(5155);function X({disable:e=!1}){let{gl:t,scene:r,camera:n,size:i}=(0,Y.A)(),o=(0,H.useMemo)(()=>{let o=new h(t);o.addPass(new p(r,n));let s=new N(i.width,i.height,{shape:1,radius:2,rotateR:Math.PI/12,rotateB:Math.PI/12*2,rotateG:Math.PI/12*3,scatter:1,blending:1,blendingMode:1,greyscale:!1,disable:e});return o.addPass(s),o},[t,r,n,i,e]);return(0,H.useEffect)(()=>null==o?void 0:o.setSize(i.width,i.height),[o,i]),(0,Y.C)((e,r)=>(t.autoClear=!0,void o.render(r)),1),(0,V.jsx)(V.Fragment,{})}var Z=`// #pragma glslify: cnoise3 = require(glsl-noise/classic/3d) 

// noise source from https://github.com/hughsk/glsl-noise/blob/master/periodic/3d.glsl

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P)
{
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 
  return 2.2 * n_xyz;
}

//-------- start here ------------

mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);

  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

varying vec2 vUv;

uniform float uTime;
uniform float uSpeed;

uniform float uLoadingTime;

uniform float uNoiseDensity;
uniform float uNoiseStrength;

#define STANDARD
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>

void main() {

  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- start vertex ------------
  vUv = uv;

  float t = uTime * uSpeed;
  // Create a sine wave from top to bottom of the sphere
  float distortion = 0.75 * cnoise(0.43 * position * uNoiseDensity + t);

  vec3 pos = position + normal * distortion * uNoiseStrength * uLoadingTime;
  vPos = pos;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`,q=`
#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif

uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;

#ifdef TRANSMISSION
uniform float transmission;
#endif
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
// #include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>
// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment
// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.

varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;

uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;

varying vec3 color1;
varying vec3 color2;
varying vec3 color3;

// for npm package, need to add this manually
float linearToRelativeLuminance2( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}

void main() {

  //-------- basic gradient ------------
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);
  float clearcoat = 1.0;
  float clearcoatRoughness = 0.5;

  #include <clipping_planes_fragment>

  vec4 diffuseColor = vec4(
      mix(mix(color1, color2, smoothstep(-3.0, 3.0, vPos.x)), color3, vPos.z),
      1);
  // diffuseColor\uB294 \uC624\uBE0C\uC81D\uD2B8\uC758 \uBCA0\uC774\uC2A4 \uC0C9\uC0C1 (\uD658\uACBD\uC774\uB098 \uBE5B\uC774 \uACE0\uB824\uB418\uC9C0 \uC54A\uC740 \uBCF8\uC5F0\uC758
  // \uC0C9)

  // mix(x, y, a): a\uB97C \uCD95\uC73C\uB85C \uD588\uC744 \uB54C \uAC00\uC7A5 \uB0AE\uC740 \uAC12\uC5D0\uC11C x\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%, \uAC00\uC7A5
  // \uB192\uC740 \uAC12\uC5D0\uC11C y\uAC12\uC758 \uC601\uD5A5\uB825\uC744 100%\uB85C \uB9CC\uB4E0\uB2E4. smoothstep(x, y, a): a\uCD95\uC744
  // \uAE30\uC900\uC73C\uB85C x\uB97C \uCD5C\uC18C\uAC12, y\uB97C \uCD5C\uB300\uAC12\uC73C\uB85C \uADF8 \uC0AC\uC774\uC758 \uAC12\uC744 \uCABC\uAC20\uB2E4. x\uC640 y \uC0AC\uC774\uB97C
  // 0-100 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uCC98\uB7FC \uB2E8\uACC4\uBCC4\uB85C \uD45C\uD604\uD558\uACE0, x \uBBF8\uB9CC\uC758 \uAC12\uC740 0, y \uC774\uC0C1\uC758
  // \uAC12\uC740 100\uC73C\uB85C \uCC98\uB9AC

  // 1. smoothstep(-3.0, 3.0,vPos.x)\uB85C x\uCD95\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uD45C\uD604 \uB420 \uBC94\uC704\uB97C -3,
  // 3\uC73C\uB85C \uC815\uD55C\uB2E4.
  // 2. mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x))\uB85C color1\uACFC color3\uC744
  // \uC704\uC758 \uBC94\uC704 \uC548\uC5D0\uC11C \uADF8\uB77C\uB514\uC5B8\uD2B8\uB85C \uD45C\uD604\uD55C\uB2E4.
  // \uC608\uB97C \uB4E4\uC5B4 color1\uC774 \uB178\uB791, color3\uC774 \uD30C\uB791\uC774\uB77C\uACE0 \uCE58\uBA74, x\uCD95 \uAE30\uC900 -3\uBD80\uD130 3\uAE4C\uC9C0
  // \uB178\uB791\uACFC \uD30C\uB791 \uC0AC\uC774\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uAC00 \uB098\uD0C0\uB098\uACE0, -3\uBCF4\uB2E4 \uC791\uC740 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uB178\uB791,
  // 3\uBCF4\uB2E4 \uD070 \uAC12\uC5D0\uC11C\uB294 \uACC4\uC18D \uD30C\uB791\uC774 \uB098\uD0C0\uB09C\uB2E4.
  // 3. mix()\uB97C \uD55C \uBC88 \uB354 \uC0AC\uC6A9\uD574\uC11C \uC704\uC758 \uADF8\uB77C\uB514\uC5B8\uD2B8\uC640 color2\uB97C z\uCD95 \uAE30\uC900\uC73C\uB85C
  // \uBD84\uBC30\uD55C\uB2E4.

  //-------- materiality ------------
  ReflectedLight reflectedLight =
      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;

  #ifdef TRANSMISSION
    float totalTransmission = transmission;
  #endif
  #include <logdepthbuf_fragment>
  #include <map_fragment>
  #include <color_fragment>
  #include <alphamap_fragment>
  #include <alphatest_fragment>
  #include <roughnessmap_fragment>
  #include <metalnessmap_fragment>
  #include <normal_fragment_begin>
  #include <normal_fragment_maps>
  #include <clearcoat_normal_fragment_begin>
  #include <clearcoat_normal_fragment_maps>
  #include <emissivemap_fragment>
  // #include <transmissionmap_fragment>
  #include <lights_physical_fragment>
  #include <lights_fragment_begin>
  #include <lights_fragment_maps>
  #include <lights_fragment_end>
  #include <aomap_fragment>
    vec3 outgoingLight =
        reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
        reflectedLight.directSpecular + reflectedLight.indirectSpecular;
    //\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.
  #ifdef TRANSMISSION
    diffuseColor.a *=
        mix(saturate(1. - totalTransmission +
                    linearToRelativeLuminance2(reflectedLight.directSpecular +
                                              reflectedLight.indirectSpecular)),
            1.0, metalness);
  #endif


  #include <tonemapping_fragment>
  #include <encodings_fragment>
  #include <fog_fragment>
  #include <premultiplied_alpha_fragment>
  #include <dithering_fragment>


  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C
  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.
  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),
  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD
  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.
}
`,G=`// #pragma glslify: pnoise = require(glsl-noise/periodic/3d)

vec3 mod289(vec3 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 mod289(vec4 x)
{
  return x - floor(x * (1.0 / 289.0)) * 289.0;
}

vec4 permute(vec4 x)
{
  return mod289(((x*34.0)+1.0)*x);
}

vec4 taylorInvSqrt(vec4 r)
{
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

// Classic Perlin noise, periodic variant
float pnoise(vec3 P, vec3 rep)
{
  vec3 Pi0 = mod(floor(P), rep); // Integer part, modulo period
  vec3 Pi1 = mod(Pi0 + vec3(1.0), rep); // Integer part + 1, mod period
  Pi0 = mod289(Pi0);
  Pi1 = mod289(Pi1);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 * (1.0 / 7.0);
  vec4 gy0 = fract(floor(gx0) * (1.0 / 7.0)) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 * (1.0 / 7.0);
  vec4 gy1 = fract(floor(gx1) * (1.0 / 7.0)) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x);
  return 2.2 * n_xyz;
}


//-------- start here ------------

varying vec3 vNormal;
uniform float uTime;
uniform float uSpeed;
uniform float uNoiseDensity;
uniform float uNoiseStrength;
uniform float uFrequency;
uniform float uAmplitude;
varying vec3 vPos;
varying float vDistort;
varying vec2 vUv;
varying vec3 vViewPosition;

#define STANDARD
#ifndef FLAT_SHADED
  #ifdef USE_TANGENT
    varying vec3 vTangent;
    varying vec3 vBitangent;
  #endif
#endif

#include <clipping_planes_pars_vertex>
#include <color_pars_vertex>
#include <common>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <morphtarget_pars_vertex>
#include <shadowmap_pars_vertex>
#include <skinning_pars_vertex>
#include <uv2_pars_vertex>
#include <uv_pars_vertex>


// rotation
mat3 rotation3dY(float angle) {
  float s = sin(angle);
  float c = cos(angle);
  return mat3(c, 0.0, -s, 0.0, 1.0, 0.0, s, 0.0, c);
}

vec3 rotateY(vec3 v, float angle) { return rotation3dY(angle) * v; }

void main() {
  #include <beginnormal_vertex>
  #include <color_vertex>
  #include <defaultnormal_vertex>
  #include <morphnormal_vertex>
  #include <skinbase_vertex>
  #include <skinnormal_vertex>
  #include <uv2_vertex>
  #include <uv_vertex>
  #ifndef FLAT_SHADED
    vNormal = normalize(transformedNormal);
  #ifdef USE_TANGENT
    vTangent = normalize(transformedTangent);
    vBitangent = normalize(cross(vNormal, vTangent) * tangent.w);
  #endif
  #endif
  #include <begin_vertex>

  #include <clipping_planes_vertex>
  #include <displacementmap_vertex>
  #include <logdepthbuf_vertex>
  #include <morphtarget_vertex>
  #include <project_vertex>
  #include <skinning_vertex>
    vViewPosition = -mvPosition.xyz;
  #include <fog_vertex>
  #include <shadowmap_vertex>
  #include <worldpos_vertex>

  //-------- start vertex ------------
  float t = uTime * uSpeed;
  float distortion =
      pnoise((normal + t) * uNoiseDensity, vec3(10.0)) * uNoiseStrength;
  vec3 pos = position + (normal * distortion);
  float angle = sin(uv.y * uFrequency + t) * uAmplitude;
  pos = rotateY(pos, angle);

  vPos = pos;
  vDistort = distortion;
  vNormal = normal;
  vUv = uv;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.);
}
`,W=`
#define STANDARD
#ifdef PHYSICAL
#define REFLECTIVITY
#define CLEARCOAT
#define TRANSMISSION
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef TRANSMISSION
uniform float transmission;
#endif
#ifdef REFLECTIVITY
uniform float reflectivity;
#endif
#ifdef CLEARCOAT
uniform float clearcoat;
uniform float clearcoatRoughness;
#endif
#ifdef USE_SHEEN
uniform vec3 sheen;
#endif
varying vec3 vViewPosition;
#ifndef FLAT_SHADED
#ifdef USE_TANGENT
varying vec3 vTangent;
varying vec3 vBitangent;
#endif
#endif
#include <alphamap_pars_fragment>
#include <aomap_pars_fragment>
#include <color_pars_fragment>
#include <common>
#include <dithering_pars_fragment>
#include <emissivemap_pars_fragment>
#include <lightmap_pars_fragment>
#include <map_pars_fragment>
#include <packing>
#include <uv2_pars_fragment>
#include <uv_pars_fragment>
// #include <transmissionmap_pars_fragment>
#include <bsdfs>
#include <bumpmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <clipping_planes_pars_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <lights_physical_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <shadowmap_pars_fragment>
// include\uB97C \uD1B5\uD574 \uAC00\uC838\uC628 \uAC12\uC740 \uB300\uBD80\uBD84 \uD658\uACBD, \uBE5B \uB4F1\uC744 \uACC4\uC0B0\uD558\uAE30 \uC704\uD574\uC11C \uAE30\uBCF8 fragment
// shader\uC758 \uAC12\uB4E4\uC744 \uBC1B\uC544\uC654\uC2B5\uB2C8\uB2E4. \uC77C\uB2E8\uC740 \uBB34\uC2DC\uD558\uC154\uB3C4 \uB429\uB2C8\uB2E4.
varying vec3 vNormal;
varying float displacement;
varying vec3 vPos;
varying float vDistort;
uniform float uC1r;
uniform float uC1g;
uniform float uC1b;
uniform float uC2r;
uniform float uC2g;
uniform float uC2b;
uniform float uC3r;
uniform float uC3g;
uniform float uC3b;
varying vec3 color1;
varying vec3 color2;
varying vec3 color3;
varying float distanceToCenter;


// for npm package, need to add this manually
// 'linearToRelativeLuminance' : function already has a body
float linearToRelativeLuminance2( const in vec3 color ) {
    vec3 weights = vec3( 0.2126, 0.7152, 0.0722 );
    return dot( weights, color.rgb );
}

void main() {
  //-------- basic gradient ------------
  vec3 color1 = vec3(uC1r, uC1g, uC1b);
  vec3 color2 = vec3(uC2r, uC2g, uC2b);
  vec3 color3 = vec3(uC3r, uC3g, uC3b);
  float clearcoat = 1.0;
  float clearcoatRoughness = 0.5;
#include <clipping_planes_fragment>

  float distanceToCenter = distance(vPos, vec3(0, 0, 0));
  // distanceToCenter\uB85C \uC911\uC2EC\uC810\uACFC\uC758 \uAC70\uB9AC\uB97C \uAD6C\uD568.

  vec4 diffuseColor =
      vec4(mix(color3, mix(color2, color1, smoothstep(-1.0, 1.0, vPos.y)),
               distanceToCenter),
           1);

  //-------- materiality ------------
  ReflectedLight reflectedLight =
      ReflectedLight(vec3(0.0), vec3(0.0), vec3(0.0), vec3(0.0));
  vec3 totalEmissiveRadiance = emissive;
#ifdef TRANSMISSION
  float totalTransmission = transmission;
#endif
#include <logdepthbuf_fragment>
#include <map_fragment>
#include <color_fragment>
#include <alphamap_fragment>
#include <alphatest_fragment>
#include <roughnessmap_fragment>
#include <metalnessmap_fragment>
#include <normal_fragment_begin>
#include <normal_fragment_maps>
#include <clearcoat_normal_fragment_begin>
#include <clearcoat_normal_fragment_maps>
#include <emissivemap_fragment>
// #include <transmissionmap_fragment>
#include <lights_physical_fragment>
#include <lights_fragment_begin>
#include <lights_fragment_maps>
#include <lights_fragment_end>
#include <aomap_fragment>
  vec3 outgoingLight =
      reflectedLight.directDiffuse + reflectedLight.indirectDiffuse +
      reflectedLight.directSpecular + reflectedLight.indirectSpecular;
//\uC704\uC5D0\uC11C \uC815\uC758\uD55C diffuseColor\uC5D0 \uD658\uACBD\uC774\uB098 \uBC18\uC0AC\uAC12\uB4E4\uC744 \uBC18\uC601\uD55C \uAC12.
#ifdef TRANSMISSION
  diffuseColor.a *=
      mix(saturate(1. - totalTransmission +
                   linearToRelativeLuminance2(reflectedLight.directSpecular +
                                             reflectedLight.indirectSpecular)),
          1.0, metalness);
#endif
  gl_FragColor = vec4(outgoingLight, diffuseColor.a);
  // gl_FragColor\uAC00 fragment shader\uB97C \uD1B5\uD574 \uB098\uD0C0\uB098\uB294 \uCD5C\uC885\uAC12\uC73C\uB85C, diffuseColor\uC5D0\uC11C
  // \uC815\uC758\uD55C \uADF8\uB77C\uB514\uC5B8\uD2B8 \uC0C9\uC0C1 \uC704\uC5D0 \uBC18\uC0AC\uB098 \uBE5B\uC744 \uACC4\uC0B0\uD55C \uAC12\uC744 \uCD5C\uC885\uAC12\uC73C\uB85C \uC815\uC758.
  // gl_FragColor = vec4(mix(mix(color1, color3, smoothstep(-3.0, 3.0,vPos.x)),
  // color2, vNormal.z), 1.0); \uC704\uCC98\uB7FC \uCD5C\uC885\uAC12\uC744 \uADF8\uB77C\uB514\uC5B8\uD2B8 \uAC12 \uC790\uCCB4\uB97C \uB123\uC73C\uBA74 \uD658\uACBD
  // \uC601\uD5A5\uC5C6\uB294 \uADF8\uB77C\uB514\uC5B8\uD2B8\uB9CC \uD45C\uD604\uB428.

#include <tonemapping_fragment>
#include <encodings_fragment>
#include <fog_fragment>
#include <premultiplied_alpha_fragment>
#include <dithering_fragment>
}
`;function K({type:e}){return(0,V.jsxs)(V.Fragment,{children:["plane"===e&&(0,V.jsx)("planeGeometry",{args:[10,10,1,192]}),"sphere"===e&&(0,V.jsx)("icosahedronGeometry",{args:[1,64]}),"waterPlane"===e&&(0,V.jsx)("planeGeometry",{args:[10,10,192,192]})]})}function Q(e){if(e.startsWith("#")){let t;return(t=/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(e))?{r:parseInt(t[1],16),g:parseInt(t[2],16),b:parseInt(t[3],16)}:null}if(e.startsWith("rgb")){let t;return(t=e.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/))?{r:parseInt(t[1]),g:parseInt(t[2]),b:parseInt(t[3])}:null}throw Error("Invalid color format")}function $(e=0){return e/255}var J=r(2344),ee=({animate:e,uniforms:t,vertexShader:r,fragmentShader:i,onInit:o})=>{let s=(0,H.useMemo)(()=>{let e=Object.entries(t),s=t.colors,a=Q(s[0]),l=Q(s[1]),c=Q(s[2]),u={uC1r:{value:$(null==a?void 0:a.r)},uC1g:{value:$(null==a?void 0:a.g)},uC1b:{value:$(null==a?void 0:a.b)},uC2r:{value:$(null==l?void 0:l.r)},uC2g:{value:$(null==l?void 0:l.g)},uC2b:{value:$(null==l?void 0:l.b)},uC3r:{value:$(null==c?void 0:c.r)},uC3g:{value:$(null==c?void 0:c.g)},uC3b:{value:$(null==c?void 0:c.b)}},d=e.reduce((e,[t,r])=>{let i=n.LlO.clone({[t]:{value:r}});return(0,J.a)((0,J.a)({},e),i)},{}),h=new n.uSd({userData:d,metalness:.2,side:n.$EB,onBeforeCompile:e=>{e.uniforms=(0,J.a)((0,J.a)((0,J.a)({},e.uniforms),d),u),e.vertexShader=r,e.fragmentShader=i}});return e.forEach(([e])=>Object.defineProperty(h,e,{get:()=>h.uniforms[e].value,set:t=>h.uniforms[e].value=t})),o&&o(h),h},[t,r,i,o]);return(0,H.useEffect)(()=>()=>{s.dispose()},[s]),(0,Y.C)(({clock:t})=>{"on"===e&&s.userData.uTime&&(s.userData.uTime.value=t.getElapsedTime())}),(0,V.jsx)("primitive",{attach:"material",object:s})};function et(e){return e/180*Math.PI}function er({animate:e,positionX:t,positionY:r,positionZ:n,rotationX:i,rotationY:o,rotationZ:s,type:a,color1:l,color2:c,color3:u,uTime:d,uSpeed:h,uDensity:f,uStrength:p,uFrequency:m,uAmplitude:g}){return(0,V.jsxs)("mesh",{name:"shadergradient-mesh",position:[t,r,n],rotation:[i,o,s].map(e=>et(e)),children:[(0,V.jsx)(K,{type:a}),(0,V.jsx)(ee,{animate:e,uniforms:{colors:[l,c,u],uTime:d,uSpeed:h,uLoadingTime:1,uNoiseDensity:f,uNoiseStrength:p,uFrequency:m,uAmplitude:g,uIntensity:.5},vertexShader:"sphere"===a?G:Z,fragmentShader:"sphere"===a?W:q,onInit:e=>{console.log("material (onInit)",e)}})]})}var en=class extends n.BRH{constructor(e){super(e),this.type=n.ix0}parse(e){let t=function(e,t){switch(e){case 1:throw Error("THREE.RGBELoader: Read Error: "+(t||""));case 2:throw Error("THREE.RGBELoader: Write Error: "+(t||""));case 3:throw Error("THREE.RGBELoader: Bad File Format: "+(t||""));default:throw Error("THREE.RGBELoader: Memory Error: "+(t||""))}},r=`
`,i=function(e,t,n){t=t||1024;let i=e.pos,o=-1,s=0,a="",l=String.fromCharCode.apply(null,new Uint16Array(e.subarray(i,i+128)));for(;0>(o=l.indexOf(r))&&s<t&&i<e.byteLength;)a+=l,s+=l.length,i+=128,l+=String.fromCharCode.apply(null,new Uint16Array(e.subarray(i,i+128)));return -1<o&&(!1!==n&&(e.pos+=s+o+1),a+l.slice(0,o))},o=new Uint8Array(e);o.pos=0;let s=function(e){let r=/^\s*GAMMA\s*=\s*(\d+(\.\d+)?)\s*$/,n=/^\s*EXPOSURE\s*=\s*(\d+(\.\d+)?)\s*$/,o=/^\s*FORMAT=(\S+)\s*$/,s=/^\s*\-Y\s+(\d+)\s+\+X\s+(\d+)\s*$/,a={valid:0,string:"",comments:"",programtype:"RGBE",format:"",gamma:1,exposure:1,width:0,height:0},l,c;for(!(e.pos>=e.byteLength)&&(l=i(e))||t(1,"no header found"),(c=l.match(/^#\?(\S+)/))||t(3,"bad initial token"),a.valid|=1,a.programtype=c[1],a.string+=l+`
`;!1!==(l=i(e));){if(a.string+=l+`
`,"#"===l.charAt(0)){a.comments+=l+`
`;continue}if((c=l.match(r))&&(a.gamma=parseFloat(c[1])),(c=l.match(n))&&(a.exposure=parseFloat(c[1])),(c=l.match(o))&&(a.valid|=2,a.format=c[1]),(c=l.match(s))&&(a.valid|=4,a.height=parseInt(c[1],10),a.width=parseInt(c[2],10)),2&a.valid&&4&a.valid)break}return 2&a.valid||t(3,"missing format specifier"),4&a.valid||t(3,"missing image size specifier"),a}(o),a=s.width,l=s.height,c=function(e,r,n){if(r<8||r>32767||2!==e[0]||2!==e[1]||128&e[2])return new Uint8Array(e);r!==(e[2]<<8|e[3])&&t(3,"wrong scanline width");let i=new Uint8Array(4*r*n);i.length||t(4,"unable to allocate buffer space");let o=0,s=0,a=4*r,l=new Uint8Array(4),c=new Uint8Array(a),u=n;for(;u>0&&s<e.byteLength;){s+4>e.byteLength&&t(1),l[0]=e[s++],l[1]=e[s++],l[2]=e[s++],l[3]=e[s++],(2!=l[0]||2!=l[1]||(l[2]<<8|l[3])!=r)&&t(3,"bad rgbe scanline format");let n=0,d;for(;n<a&&s<e.byteLength;){let r=(d=e[s++])>128;if(r&&(d-=128),(0===d||n+d>a)&&t(3,"bad scanline data"),r){let t=e[s++];for(let e=0;e<d;e++)c[n++]=t}else c.set(e.subarray(s,s+d),n),n+=d,s+=d}for(let e=0;e<r;e++){let t=0;i[o]=c[e+t],t+=r,i[o+1]=c[e+t],t+=r,i[o+2]=c[e+t],t+=r,i[o+3]=c[e+t],o+=4}u--}return i}(o.subarray(o.pos),a,l),u,d,h;switch(this.type){case n.RQf:let f=new Float32Array(4*(h=c.length/4));for(let e=0;e<h;e++)!function(e,t,r,n){let i=Math.pow(2,e[t+3]-128)/255;r[n+0]=e[t+0]*i,r[n+1]=e[t+1]*i,r[n+2]=e[t+2]*i,r[n+3]=1}(c,4*e,f,4*e);u=f,d=n.RQf;break;case n.ix0:let p=new Uint16Array(4*(h=c.length/4));for(let e=0;e<h;e++)!function(e,t,r,i){let o=Math.pow(2,e[t+3]-128)/255;r[i+0]=n.GxU.toHalfFloat(Math.min(e[t+0]*o,65504)),r[i+1]=n.GxU.toHalfFloat(Math.min(e[t+1]*o,65504)),r[i+2]=n.GxU.toHalfFloat(Math.min(e[t+2]*o,65504)),r[i+3]=n.GxU.toHalfFloat(1)}(c,4*e,p,4*e);u=p,d=n.ix0;break;default:throw Error("THREE.RGBELoader: Unsupported type: "+this.type)}return{width:a,height:l,data:u,header:s.string,gamma:s.gamma,exposure:s.exposure,type:d}}setDataType(e){return this.type=e,this}load(e,t,r,i){return super.load(e,function(e,r){switch(e.type){case n.RQf:case n.ix0:"colorSpace"in e?e.colorSpace="srgb-linear":e.encoding=3e3,e.minFilter=n.k6q,e.magFilter=n.k6q,e.generateMipmaps=!1,e.flipY=!0}t&&t(e,r)},r,i)}};function ei(e,{path:t}){return(0,Y.F)(en,e,e=>e.setPath(t))}var eo=r(1892),es=e=>e.current&&e.current.isScene,ea=e=>es(e)?e.current:e;function el({background:e=!1,envPreset:t}){let{envBasePath:r}=(0,eo.a)(),i={city:ei("city.hdr",{path:r}),dawn:ei("dawn.hdr",{path:r}),lobby:ei("lobby.hdr",{path:r})}[t],o=(0,Y.A)(e=>e.scene);return H.useLayoutEffect(()=>{if(i){let t=ea(o),r=(t.background,t.environment);return"only"!==e&&(t.environment=i),e&&(t.background=i),()=>{"only"!==e&&(t.environment=r),e&&(t.background="black")}}},[o,i,e]),i.mapping=n.wfO,null}function ec({lightType:e,brightness:t,envPreset:r}){return(0,V.jsxs)(V.Fragment,{children:["3d"===e&&(0,V.jsx)("ambientLight",{intensity:(t||1)*Math.PI}),"env"===e&&(0,V.jsx)(H.Suspense,{fallback:(0,V.jsx)(eu,{}),children:(0,V.jsx)(el,{envPreset:r,background:!1,loadingCallback:()=>{}})})]})}function eu(){return(0,V.jsx)("ambientLight",{intensity:.4})}var ed=r(491),eh=r(7431),ef={LEFT:1,RIGHT:2,MIDDLE:4},ep=Object.freeze({NONE:0,ROTATE:1,TRUCK:2,OFFSET:4,DOLLY:8,ZOOM:16,TOUCH_ROTATE:32,TOUCH_TRUCK:64,TOUCH_OFFSET:128,TOUCH_DOLLY:256,TOUCH_ZOOM:512,TOUCH_DOLLY_TRUCK:1024,TOUCH_DOLLY_OFFSET:2048,TOUCH_DOLLY_ROTATE:4096,TOUCH_ZOOM_TRUCK:8192,TOUCH_ZOOM_OFFSET:16384,TOUCH_ZOOM_ROTATE:32768}),em={NONE:0,IN:1,OUT:-1};function eg(e){return e.isPerspectiveCamera}function ev(e){return e.isOrthographicCamera}var e_=2*Math.PI,ey=Math.PI/2,eC=Math.PI/180;function ex(e,t,r){return Math.max(t,Math.min(r,e))}function eb(e,t=1e-5){return Math.abs(e)<t}function eE(e,t,r=1e-5){return eb(e-t,r)}function eT(e,t){return Math.round(e/t)*t}function ew(e){return isFinite(e)?e:e<0?-Number.MAX_VALUE:Number.MAX_VALUE}function eO(e){return Math.abs(e)<Number.MAX_VALUE?e:1/0*e}function eS(e,t,r,n,i=1/0,o){let s=2/(n=Math.max(1e-4,n)),a=s*o,l=1/(1+a+.48*a*a+.235*a*a*a),c=e-t,u=t,d=i*n;t=e-(c=ex(c,-d,d));let h=(r.value+s*c)*o;r.value=(r.value-s*h)*l;let f=t+(c+h)*l;return u-e>0==f>u&&(r.value=((f=u)-u)/o),f}function eA(e,t,r,n,i=1/0,o,s){let a=2/(n=Math.max(1e-4,n)),l=a*o,c=1/(1+l+.48*l*l+.235*l*l*l),u=t.x,d=t.y,h=t.z,f=e.x-u,p=e.y-d,m=e.z-h,g=u,v=d,_=h,y=i*n,C=f*f+p*p+m*m;if(C>y*y){let e=Math.sqrt(C);f=f/e*y,p=p/e*y,m=m/e*y}u=e.x-f,d=e.y-p,h=e.z-m;let x=(r.x+a*f)*o,b=(r.y+a*p)*o,E=(r.z+a*m)*o;r.x=(r.x-a*x)*c,r.y=(r.y-a*b)*c,r.z=(r.z-a*E)*c,s.x=u+(f+x)*c,s.y=d+(p+b)*c,s.z=h+(m+E)*c;let T=g-e.x,w=v-e.y,O=_-e.z;return T*(s.x-g)+w*(s.y-v)+O*(s.z-_)>0&&(s.x=g,s.y=v,s.z=_,r.x=(s.x-g)/o,r.y=(s.y-v)/o,r.z=(s.z-_)/o),s}function eP(e,t){t.set(0,0),e.forEach(e=>{t.x+=e.clientX,t.y+=e.clientY}),t.x/=e.length,t.y/=e.length}function eD(e,t){return!!ev(e)&&(console.warn(`${t} is not supported in OrthographicCamera`),!0)}var ez,eR,eM,eB,eL,eF,ek,eU,ej,eI,eN,eH,eY,eV,eX,eZ,eq,eG,eW,eK,eQ,e$,eJ,e0,e1=class{constructor(){this._listeners={}}addEventListener(e,t){let r=this._listeners;void 0===r[e]&&(r[e]=[]),-1===r[e].indexOf(t)&&r[e].push(t)}hasEventListener(e,t){let r=this._listeners;return void 0!==r[e]&&-1!==r[e].indexOf(t)}removeEventListener(e,t){let r=this._listeners[e];if(void 0!==r){let e=r.indexOf(t);-1!==e&&r.splice(e,1)}}removeAllEventListeners(e){if(!e){this._listeners={};return}Array.isArray(this._listeners[e])&&(this._listeners[e].length=0)}dispatchEvent(e){let t=this._listeners[e.type];if(void 0!==t){e.target=this;let r=t.slice(0);for(let t=0,n=r.length;t<n;t++)r[t].call(this,e)}}},e2=1/8,e3=/Mac/.test(null==(ez=null==globalThis?void 0:globalThis.navigator)?void 0:ez.platform),e4=class e extends e1{static install(e){eM=Object.freeze(new(eR=e.THREE).Vector3(0,0,0)),eB=Object.freeze(new eR.Vector3(0,1,0)),eL=Object.freeze(new eR.Vector3(0,0,1)),eF=new eR.Vector2,ek=new eR.Vector3,eU=new eR.Vector3,ej=new eR.Vector3,eI=new eR.Vector3,eN=new eR.Vector3,eH=new eR.Vector3,eY=new eR.Vector3,eV=new eR.Vector3,eX=new eR.Vector3,eZ=new eR.Spherical,eq=new eR.Spherical,eG=new eR.Box3,eW=new eR.Box3,eK=new eR.Sphere,eQ=new eR.Quaternion,e$=new eR.Quaternion,eJ=new eR.Matrix4,e0=new eR.Raycaster}static get ACTION(){return ep}constructor(t,r){super(),this.minPolarAngle=0,this.maxPolarAngle=Math.PI,this.minAzimuthAngle=-1/0,this.maxAzimuthAngle=1/0,this.minDistance=Number.EPSILON,this.maxDistance=1/0,this.infinityDolly=!1,this.minZoom=.01,this.maxZoom=1/0,this.smoothTime=.25,this.draggingSmoothTime=.125,this.maxSpeed=1/0,this.azimuthRotateSpeed=1,this.polarRotateSpeed=1,this.dollySpeed=1,this.dollyDragInverted=!1,this.truckSpeed=2,this.dollyToCursor=!1,this.dragToOffset=!1,this.verticalDragToForward=!1,this.boundaryFriction=0,this.restThreshold=.01,this.colliderMeshes=[],this.cancel=()=>{},this._enabled=!0,this._state=ep.NONE,this._viewport=null,this._changedDolly=0,this._changedZoom=0,this._hasRested=!0,this._boundaryEnclosesCamera=!1,this._needsUpdate=!0,this._updatedLastTime=!1,this._elementRect=new DOMRect,this._isDragging=!1,this._dragNeedsUpdate=!0,this._activePointers=[],this._lockedPointer=null,this._interactiveArea=new DOMRect(0,0,1,1),this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._isUserControllingOffset=!1,this._isUserControllingZoom=!1,this._lastDollyDirection=em.NONE,this._thetaVelocity={value:0},this._phiVelocity={value:0},this._radiusVelocity={value:0},this._targetVelocity=new eR.Vector3,this._focalOffsetVelocity=new eR.Vector3,this._zoomVelocity={value:0},this._truckInternal=(e,t,r)=>{let n,i;if(eg(this._camera)){let r=ek.copy(this._camera.position).sub(this._target),o=this._camera.getEffectiveFOV()*eC,s=r.length()*Math.tan(.5*o);n=this.truckSpeed*e*s/this._elementRect.height,i=this.truckSpeed*t*s/this._elementRect.height}else{if(!ev(this._camera))return;let r=this._camera;n=e*(r.right-r.left)/r.zoom/this._elementRect.width,i=t*(r.top-r.bottom)/r.zoom/this._elementRect.height}this.verticalDragToForward?(r?this.setFocalOffset(this._focalOffsetEnd.x+n,this._focalOffsetEnd.y,this._focalOffsetEnd.z,!0):this.truck(n,0,!0),this.forward(-i,!0)):r?this.setFocalOffset(this._focalOffsetEnd.x+n,this._focalOffsetEnd.y+i,this._focalOffsetEnd.z,!0):this.truck(n,i,!0)},this._rotateInternal=(e,t)=>{let r=e_*this.azimuthRotateSpeed*e/this._elementRect.height,n=e_*this.polarRotateSpeed*t/this._elementRect.height;this.rotate(r,n,!0)},this._dollyInternal=(e,t,r)=>{let n=Math.pow(.95,-e*this.dollySpeed),i=this._sphericalEnd.radius,o=this._sphericalEnd.radius*n,s=ex(o,this.minDistance,this.maxDistance),a=s-o;this.infinityDolly&&this.dollyToCursor?this._dollyToNoClamp(o,!0):(this.infinityDolly&&!this.dollyToCursor&&this.dollyInFixed(a,!0),this._dollyToNoClamp(s,!0)),this.dollyToCursor&&(this._changedDolly+=(this.infinityDolly?o:s)-i,this._dollyControlCoord.set(t,r)),this._lastDollyDirection=Math.sign(-e)},this._zoomInternal=(e,t,r)=>{let n=Math.pow(.95,e*this.dollySpeed),i=this._zoom,o=this._zoom*n;this.zoomTo(o,!0),this.dollyToCursor&&(this._changedZoom+=o-i,this._dollyControlCoord.set(t,r))},void 0===eR&&console.error("camera-controls: `THREE` is undefined. You must first run `CameraControls.install( { THREE: THREE } )`. Check the docs for further information."),this._camera=t,this._yAxisUpSpace=new eR.Quaternion().setFromUnitVectors(this._camera.up,eB),this._yAxisUpSpaceInverse=this._yAxisUpSpace.clone().invert(),this._state=ep.NONE,this._target=new eR.Vector3,this._targetEnd=this._target.clone(),this._focalOffset=new eR.Vector3,this._focalOffsetEnd=this._focalOffset.clone(),this._spherical=new eR.Spherical().setFromVector3(ek.copy(this._camera.position).applyQuaternion(this._yAxisUpSpace)),this._sphericalEnd=this._spherical.clone(),this._lastDistance=this._spherical.radius,this._zoom=this._camera.zoom,this._zoomEnd=this._zoom,this._lastZoom=this._zoom,this._nearPlaneCorners=[new eR.Vector3,new eR.Vector3,new eR.Vector3,new eR.Vector3],this._updateNearPlaneCorners(),this._boundary=new eR.Box3(new eR.Vector3(-1/0,-1/0,-1/0),new eR.Vector3(1/0,1/0,1/0)),this._cameraUp0=this._camera.up.clone(),this._target0=this._target.clone(),this._position0=this._camera.position.clone(),this._zoom0=this._zoom,this._focalOffset0=this._focalOffset.clone(),this._dollyControlCoord=new eR.Vector2,this.mouseButtons={left:ep.ROTATE,middle:ep.DOLLY,right:ep.TRUCK,wheel:eg(this._camera)?ep.DOLLY:ev(this._camera)?ep.ZOOM:ep.NONE},this.touches={one:ep.TOUCH_ROTATE,two:eg(this._camera)?ep.TOUCH_DOLLY_TRUCK:ev(this._camera)?ep.TOUCH_ZOOM_TRUCK:ep.NONE,three:ep.TOUCH_TRUCK};let n=new eR.Vector2,i=new eR.Vector2,o=new eR.Vector2,s=e=>{if(!this._enabled||!this._domElement)return;if(0!==this._interactiveArea.left||0!==this._interactiveArea.top||1!==this._interactiveArea.width||1!==this._interactiveArea.height){let t=this._domElement.getBoundingClientRect(),r=e.clientX/t.width,n=e.clientY/t.height;if(r<this._interactiveArea.left||r>this._interactiveArea.right||n<this._interactiveArea.top||n>this._interactiveArea.bottom)return}let t="mouse"!==e.pointerType?null:(e.buttons&ef.LEFT)===ef.LEFT?ef.LEFT:(e.buttons&ef.MIDDLE)===ef.MIDDLE?ef.MIDDLE:(e.buttons&ef.RIGHT)===ef.RIGHT?ef.RIGHT:null;if(null!==t){let e=this._findPointerByMouseButton(t);e&&this._disposePointer(e)}if((e.buttons&ef.LEFT)===ef.LEFT&&this._lockedPointer)return;let r={pointerId:e.pointerId,clientX:e.clientX,clientY:e.clientY,deltaX:0,deltaY:0,mouseButton:t};this._activePointers.push(r),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),this._isDragging=!0,h(e)},a=e=>{e.cancelable&&e.preventDefault();let t=e.pointerId,r=this._lockedPointer||this._findPointerById(t);if(r){if(r.clientX=e.clientX,r.clientY=e.clientY,r.deltaX=e.movementX,r.deltaY=e.movementY,this._state=0,"touch"===e.pointerType)switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three}else(!this._isDragging&&this._lockedPointer||this._isDragging&&(e.buttons&ef.LEFT)===ef.LEFT)&&(this._state=this._state|this.mouseButtons.left),this._isDragging&&(e.buttons&ef.MIDDLE)===ef.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),this._isDragging&&(e.buttons&ef.RIGHT)===ef.RIGHT&&(this._state=this._state|this.mouseButtons.right);f()}},l=e=>{let t=this._findPointerById(e.pointerId);if(!(t&&t===this._lockedPointer)){if(t&&this._disposePointer(t),"touch"===e.pointerType)switch(this._activePointers.length){case 0:this._state=ep.NONE;break;case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three}else this._state=ep.NONE;p()}},c=-1,u=e=>{if(!this._domElement||!this._enabled||this.mouseButtons.wheel===ep.NONE)return;if(0!==this._interactiveArea.left||0!==this._interactiveArea.top||1!==this._interactiveArea.width||1!==this._interactiveArea.height){let t=this._domElement.getBoundingClientRect(),r=e.clientX/t.width,n=e.clientY/t.height;if(r<this._interactiveArea.left||r>this._interactiveArea.right||n<this._interactiveArea.top||n>this._interactiveArea.bottom)return}if(e.preventDefault(),this.dollyToCursor||this.mouseButtons.wheel===ep.ROTATE||this.mouseButtons.wheel===ep.TRUCK){let e=performance.now();c-e<1e3&&this._getClientRect(this._elementRect),c=e}let t=e3?-1:-3,r=1===e.deltaMode?e.deltaY/t:e.deltaY/(10*t),n=this.dollyToCursor?(e.clientX-this._elementRect.x)/this._elementRect.width*2-1:0,i=this.dollyToCursor?-((e.clientY-this._elementRect.y)/this._elementRect.height*2)+1:0;switch(this.mouseButtons.wheel){case ep.ROTATE:this._rotateInternal(e.deltaX,e.deltaY),this._isUserControllingRotate=!0;break;case ep.TRUCK:this._truckInternal(e.deltaX,e.deltaY,!1),this._isUserControllingTruck=!0;break;case ep.OFFSET:this._truckInternal(e.deltaX,e.deltaY,!0),this._isUserControllingOffset=!0;break;case ep.DOLLY:this._dollyInternal(-r,n,i),this._isUserControllingDolly=!0;break;case ep.ZOOM:this._zoomInternal(-r,n,i),this._isUserControllingZoom=!0}this.dispatchEvent({type:"control"})},d=t=>{if(!(!this._domElement||!this._enabled)){if(this.mouseButtons.right===e.ACTION.NONE){let e=t instanceof PointerEvent?t.pointerId:0,r=this._findPointerById(e);r&&this._disposePointer(r),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l);return}t.preventDefault()}},h=e=>{if(this._enabled){if(eP(this._activePointers,eF),this._getClientRect(this._elementRect),n.copy(eF),i.copy(eF),this._activePointers.length>=2){let e=eF.x-this._activePointers[1].clientX,t=eF.y-this._activePointers[1].clientY,r=Math.sqrt(e*e+t*t);o.set(0,r);let n=(this._activePointers[0].clientX+this._activePointers[1].clientX)*.5,s=(this._activePointers[0].clientY+this._activePointers[1].clientY)*.5;i.set(n,s)}if(this._state=0,e)if("pointerType"in e&&"touch"===e.pointerType)switch(this._activePointers.length){case 1:this._state=this.touches.one;break;case 2:this._state=this.touches.two;break;case 3:this._state=this.touches.three}else this._lockedPointer||(e.buttons&ef.LEFT)!==ef.LEFT||(this._state=this._state|this.mouseButtons.left),(e.buttons&ef.MIDDLE)===ef.MIDDLE&&(this._state=this._state|this.mouseButtons.middle),(e.buttons&ef.RIGHT)===ef.RIGHT&&(this._state=this._state|this.mouseButtons.right);else this._lockedPointer&&(this._state=this._state|this.mouseButtons.left);((this._state&ep.ROTATE)===ep.ROTATE||(this._state&ep.TOUCH_ROTATE)===ep.TOUCH_ROTATE||(this._state&ep.TOUCH_DOLLY_ROTATE)===ep.TOUCH_DOLLY_ROTATE||(this._state&ep.TOUCH_ZOOM_ROTATE)===ep.TOUCH_ZOOM_ROTATE)&&(this._sphericalEnd.theta=this._spherical.theta,this._sphericalEnd.phi=this._spherical.phi,this._thetaVelocity.value=0,this._phiVelocity.value=0),((this._state&ep.TRUCK)===ep.TRUCK||(this._state&ep.TOUCH_TRUCK)===ep.TOUCH_TRUCK||(this._state&ep.TOUCH_DOLLY_TRUCK)===ep.TOUCH_DOLLY_TRUCK||(this._state&ep.TOUCH_ZOOM_TRUCK)===ep.TOUCH_ZOOM_TRUCK)&&(this._targetEnd.copy(this._target),this._targetVelocity.set(0,0,0)),((this._state&ep.DOLLY)===ep.DOLLY||(this._state&ep.TOUCH_DOLLY)===ep.TOUCH_DOLLY||(this._state&ep.TOUCH_DOLLY_TRUCK)===ep.TOUCH_DOLLY_TRUCK||(this._state&ep.TOUCH_DOLLY_OFFSET)===ep.TOUCH_DOLLY_OFFSET||(this._state&ep.TOUCH_DOLLY_ROTATE)===ep.TOUCH_DOLLY_ROTATE)&&(this._sphericalEnd.radius=this._spherical.radius,this._radiusVelocity.value=0),((this._state&ep.ZOOM)===ep.ZOOM||(this._state&ep.TOUCH_ZOOM)===ep.TOUCH_ZOOM||(this._state&ep.TOUCH_ZOOM_TRUCK)===ep.TOUCH_ZOOM_TRUCK||(this._state&ep.TOUCH_ZOOM_OFFSET)===ep.TOUCH_ZOOM_OFFSET||(this._state&ep.TOUCH_ZOOM_ROTATE)===ep.TOUCH_ZOOM_ROTATE)&&(this._zoomEnd=this._zoom,this._zoomVelocity.value=0),((this._state&ep.OFFSET)===ep.OFFSET||(this._state&ep.TOUCH_OFFSET)===ep.TOUCH_OFFSET||(this._state&ep.TOUCH_DOLLY_OFFSET)===ep.TOUCH_DOLLY_OFFSET||(this._state&ep.TOUCH_ZOOM_OFFSET)===ep.TOUCH_ZOOM_OFFSET)&&(this._focalOffsetEnd.copy(this._focalOffset),this._focalOffsetVelocity.set(0,0,0)),this.dispatchEvent({type:"controlstart"})}},f=()=>{if(!this._enabled||!this._dragNeedsUpdate)return;this._dragNeedsUpdate=!1,eP(this._activePointers,eF);let e=this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement?this._lockedPointer||this._activePointers[0]:null,t=e?-e.deltaX:i.x-eF.x,r=e?-e.deltaY:i.y-eF.y;if(i.copy(eF),((this._state&ep.ROTATE)===ep.ROTATE||(this._state&ep.TOUCH_ROTATE)===ep.TOUCH_ROTATE||(this._state&ep.TOUCH_DOLLY_ROTATE)===ep.TOUCH_DOLLY_ROTATE||(this._state&ep.TOUCH_ZOOM_ROTATE)===ep.TOUCH_ZOOM_ROTATE)&&(this._rotateInternal(t,r),this._isUserControllingRotate=!0),(this._state&ep.DOLLY)===ep.DOLLY||(this._state&ep.ZOOM)===ep.ZOOM){let e=this.dollyToCursor?(n.x-this._elementRect.x)/this._elementRect.width*2-1:0,t=this.dollyToCursor?-((n.y-this._elementRect.y)/this._elementRect.height*2)+1:0,i=this.dollyDragInverted?-1:1;(this._state&ep.DOLLY)===ep.DOLLY?(this._dollyInternal(i*r*e2,e,t),this._isUserControllingDolly=!0):(this._zoomInternal(i*r*e2,e,t),this._isUserControllingZoom=!0)}if((this._state&ep.TOUCH_DOLLY)===ep.TOUCH_DOLLY||(this._state&ep.TOUCH_ZOOM)===ep.TOUCH_ZOOM||(this._state&ep.TOUCH_DOLLY_TRUCK)===ep.TOUCH_DOLLY_TRUCK||(this._state&ep.TOUCH_ZOOM_TRUCK)===ep.TOUCH_ZOOM_TRUCK||(this._state&ep.TOUCH_DOLLY_OFFSET)===ep.TOUCH_DOLLY_OFFSET||(this._state&ep.TOUCH_ZOOM_OFFSET)===ep.TOUCH_ZOOM_OFFSET||(this._state&ep.TOUCH_DOLLY_ROTATE)===ep.TOUCH_DOLLY_ROTATE||(this._state&ep.TOUCH_ZOOM_ROTATE)===ep.TOUCH_ZOOM_ROTATE){let e=eF.x-this._activePointers[1].clientX,t=eF.y-this._activePointers[1].clientY,r=Math.sqrt(e*e+t*t),n=o.y-r;o.set(0,r);let s=this.dollyToCursor?(i.x-this._elementRect.x)/this._elementRect.width*2-1:0,a=this.dollyToCursor?-((i.y-this._elementRect.y)/this._elementRect.height*2)+1:0;(this._state&ep.TOUCH_DOLLY)===ep.TOUCH_DOLLY||(this._state&ep.TOUCH_DOLLY_ROTATE)===ep.TOUCH_DOLLY_ROTATE||(this._state&ep.TOUCH_DOLLY_TRUCK)===ep.TOUCH_DOLLY_TRUCK||(this._state&ep.TOUCH_DOLLY_OFFSET)===ep.TOUCH_DOLLY_OFFSET?(this._dollyInternal(n*e2,s,a),this._isUserControllingDolly=!0):(this._zoomInternal(n*e2,s,a),this._isUserControllingZoom=!0)}((this._state&ep.TRUCK)===ep.TRUCK||(this._state&ep.TOUCH_TRUCK)===ep.TOUCH_TRUCK||(this._state&ep.TOUCH_DOLLY_TRUCK)===ep.TOUCH_DOLLY_TRUCK||(this._state&ep.TOUCH_ZOOM_TRUCK)===ep.TOUCH_ZOOM_TRUCK)&&(this._truckInternal(t,r,!1),this._isUserControllingTruck=!0),((this._state&ep.OFFSET)===ep.OFFSET||(this._state&ep.TOUCH_OFFSET)===ep.TOUCH_OFFSET||(this._state&ep.TOUCH_DOLLY_OFFSET)===ep.TOUCH_DOLLY_OFFSET||(this._state&ep.TOUCH_ZOOM_OFFSET)===ep.TOUCH_ZOOM_OFFSET)&&(this._truckInternal(t,r,!0),this._isUserControllingOffset=!0),this.dispatchEvent({type:"control"})},p=()=>{eP(this._activePointers,eF),i.copy(eF),this._dragNeedsUpdate=!1,(0===this._activePointers.length||1===this._activePointers.length&&this._activePointers[0]===this._lockedPointer)&&(this._isDragging=!1),0===this._activePointers.length&&this._domElement&&(this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this.dispatchEvent({type:"controlend"}))};this.lockPointer=()=>{this._enabled&&this._domElement&&(this.cancel(),this._lockedPointer={pointerId:-1,clientX:0,clientY:0,deltaX:0,deltaY:0,mouseButton:null},this._activePointers.push(this._lockedPointer),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.requestPointerLock(),this._domElement.ownerDocument.addEventListener("pointerlockchange",m),this._domElement.ownerDocument.addEventListener("pointerlockerror",g),this._domElement.ownerDocument.addEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.addEventListener("pointerup",l),h())},this.unlockPointer=()=>{var e,t,r;null!==this._lockedPointer&&(this._disposePointer(this._lockedPointer),this._lockedPointer=null),null==(e=this._domElement)||e.ownerDocument.exitPointerLock(),null==(t=this._domElement)||t.ownerDocument.removeEventListener("pointerlockchange",m),null==(r=this._domElement)||r.ownerDocument.removeEventListener("pointerlockerror",g),this.cancel()};let m=()=>{this._domElement&&this._domElement.ownerDocument.pointerLockElement===this._domElement||this.unlockPointer()},g=()=>{this.unlockPointer()};this._addAllEventListeners=e=>{this._domElement=e,this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none",this._domElement.addEventListener("pointerdown",s),this._domElement.addEventListener("pointercancel",l),this._domElement.addEventListener("wheel",u,{passive:!1}),this._domElement.addEventListener("contextmenu",d)},this._removeAllEventListeners=()=>{this._domElement&&(this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect="",this._domElement.removeEventListener("pointerdown",s),this._domElement.removeEventListener("pointercancel",l),this._domElement.removeEventListener("wheel",u,{passive:!1}),this._domElement.removeEventListener("contextmenu",d),this._domElement.ownerDocument.removeEventListener("pointermove",a,{passive:!1}),this._domElement.ownerDocument.removeEventListener("pointerup",l),this._domElement.ownerDocument.removeEventListener("pointerlockchange",m),this._domElement.ownerDocument.removeEventListener("pointerlockerror",g))},this.cancel=()=>{this._state!==ep.NONE&&(this._state=ep.NONE,this._activePointers.length=0,p())},r&&this.connect(r),this.update(0)}get camera(){return this._camera}set camera(e){this._camera=e,this.updateCameraUp(),this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0}get enabled(){return this._enabled}set enabled(e){this._enabled=e,this._domElement&&(e?(this._domElement.style.touchAction="none",this._domElement.style.userSelect="none",this._domElement.style.webkitUserSelect="none"):(this.cancel(),this._domElement.style.touchAction="",this._domElement.style.userSelect="",this._domElement.style.webkitUserSelect=""))}get active(){return!this._hasRested}get currentAction(){return this._state}get distance(){return this._spherical.radius}set distance(e){this._spherical.radius===e&&this._sphericalEnd.radius===e||(this._spherical.radius=e,this._sphericalEnd.radius=e,this._needsUpdate=!0)}get azimuthAngle(){return this._spherical.theta}set azimuthAngle(e){this._spherical.theta===e&&this._sphericalEnd.theta===e||(this._spherical.theta=e,this._sphericalEnd.theta=e,this._needsUpdate=!0)}get polarAngle(){return this._spherical.phi}set polarAngle(e){this._spherical.phi===e&&this._sphericalEnd.phi===e||(this._spherical.phi=e,this._sphericalEnd.phi=e,this._needsUpdate=!0)}get boundaryEnclosesCamera(){return this._boundaryEnclosesCamera}set boundaryEnclosesCamera(e){this._boundaryEnclosesCamera=e,this._needsUpdate=!0}set interactiveArea(e){this._interactiveArea.width=ex(e.width,0,1),this._interactiveArea.height=ex(e.height,0,1),this._interactiveArea.x=ex(e.x,0,1-this._interactiveArea.width),this._interactiveArea.y=ex(e.y,0,1-this._interactiveArea.height)}addEventListener(e,t){super.addEventListener(e,t)}removeEventListener(e,t){super.removeEventListener(e,t)}rotate(e,t,r=!1){return this.rotateTo(this._sphericalEnd.theta+e,this._sphericalEnd.phi+t,r)}rotateAzimuthTo(e,t=!1){return this.rotateTo(e,this._sphericalEnd.phi,t)}rotatePolarTo(e,t=!1){return this.rotateTo(this._sphericalEnd.theta,e,t)}rotateTo(e,t,r=!1){this._isUserControllingRotate=!1;let n=ex(e,this.minAzimuthAngle,this.maxAzimuthAngle),i=ex(t,this.minPolarAngle,this.maxPolarAngle);this._sphericalEnd.theta=n,this._sphericalEnd.phi=i,this._sphericalEnd.makeSafe(),this._needsUpdate=!0,r||(this._spherical.theta=this._sphericalEnd.theta,this._spherical.phi=this._sphericalEnd.phi);let o=!r||eE(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&eE(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold);return this._createOnRestPromise(o)}dolly(e,t=!1){return this.dollyTo(this._sphericalEnd.radius-e,t)}dollyTo(e,t=!1){return this._isUserControllingDolly=!1,this._lastDollyDirection=em.NONE,this._changedDolly=0,this._dollyToNoClamp(ex(e,this.minDistance,this.maxDistance),t)}_dollyToNoClamp(e,t=!1){let r=this._sphericalEnd.radius;if(this.colliderMeshes.length>=1){let t=this._collisionTest(),n=eE(t,this._spherical.radius);if(!(r>e)&&n)return Promise.resolve();this._sphericalEnd.radius=Math.min(e,t)}else this._sphericalEnd.radius=e;this._needsUpdate=!0,t||(this._spherical.radius=this._sphericalEnd.radius);let n=!t||eE(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(n)}dollyInFixed(e,t=!1){this._targetEnd.add(this._getCameraDirection(eI).multiplyScalar(e)),t||this._target.copy(this._targetEnd);let r=!t||eE(this._target.x,this._targetEnd.x,this.restThreshold)&&eE(this._target.y,this._targetEnd.y,this.restThreshold)&&eE(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(r)}zoom(e,t=!1){return this.zoomTo(this._zoomEnd+e,t)}zoomTo(e,t=!1){this._isUserControllingZoom=!1,this._zoomEnd=ex(e,this.minZoom,this.maxZoom),this._needsUpdate=!0,t||(this._zoom=this._zoomEnd);let r=!t||eE(this._zoom,this._zoomEnd,this.restThreshold);return this._changedZoom=0,this._createOnRestPromise(r)}pan(e,t,r=!1){return console.warn("`pan` has been renamed to `truck`"),this.truck(e,t,r)}truck(e,t,r=!1){this._camera.updateMatrix(),eN.setFromMatrixColumn(this._camera.matrix,0),eH.setFromMatrixColumn(this._camera.matrix,1),eN.multiplyScalar(e),eH.multiplyScalar(-t);let n=ek.copy(eN).add(eH),i=eU.copy(this._targetEnd).add(n);return this.moveTo(i.x,i.y,i.z,r)}forward(e,t=!1){ek.setFromMatrixColumn(this._camera.matrix,0),ek.crossVectors(this._camera.up,ek),ek.multiplyScalar(e);let r=eU.copy(this._targetEnd).add(ek);return this.moveTo(r.x,r.y,r.z,t)}elevate(e,t=!1){return ek.copy(this._camera.up).multiplyScalar(e),this.moveTo(this._targetEnd.x+ek.x,this._targetEnd.y+ek.y,this._targetEnd.z+ek.z,t)}moveTo(e,t,r,n=!1){this._isUserControllingTruck=!1;let i=ek.set(e,t,r).sub(this._targetEnd);this._encloseToBoundary(this._targetEnd,i,this.boundaryFriction),this._needsUpdate=!0,n||this._target.copy(this._targetEnd);let o=!n||eE(this._target.x,this._targetEnd.x,this.restThreshold)&&eE(this._target.y,this._targetEnd.y,this.restThreshold)&&eE(this._target.z,this._targetEnd.z,this.restThreshold);return this._createOnRestPromise(o)}lookInDirectionOf(e,t,r,n=!1){let i=ek.set(e,t,r).sub(this._targetEnd).normalize().multiplyScalar(-this._sphericalEnd.radius).add(this._targetEnd);return this.setPosition(i.x,i.y,i.z,n)}fitToBox(e,t,{cover:r=!1,paddingLeft:n=0,paddingRight:i=0,paddingBottom:o=0,paddingTop:s=0}={}){let a=[],l=e.isBox3?eG.copy(e):eG.setFromObject(e);l.isEmpty()&&(console.warn("camera-controls: fitTo() cannot be used with an empty box. Aborting"),Promise.resolve());let c=eT(this._sphericalEnd.theta,ey),u=eT(this._sphericalEnd.phi,ey);a.push(this.rotateTo(c,u,t));let d=ek.setFromSpherical(this._sphericalEnd).normalize(),h=eQ.setFromUnitVectors(d,eL),f=eE(Math.abs(d.y),1);f&&h.multiply(e$.setFromAxisAngle(eB,c)),h.multiply(this._yAxisUpSpaceInverse);let p=eW.makeEmpty();eU.copy(l.min).applyQuaternion(h),p.expandByPoint(eU),eU.copy(l.min).setX(l.max.x).applyQuaternion(h),p.expandByPoint(eU),eU.copy(l.min).setY(l.max.y).applyQuaternion(h),p.expandByPoint(eU),eU.copy(l.max).setZ(l.min.z).applyQuaternion(h),p.expandByPoint(eU),eU.copy(l.min).setZ(l.max.z).applyQuaternion(h),p.expandByPoint(eU),eU.copy(l.max).setY(l.min.y).applyQuaternion(h),p.expandByPoint(eU),eU.copy(l.max).setX(l.min.x).applyQuaternion(h),p.expandByPoint(eU),eU.copy(l.max).applyQuaternion(h),p.expandByPoint(eU),p.min.x-=n,p.min.y-=o,p.max.x+=i,p.max.y+=s,h.setFromUnitVectors(eL,d),f&&h.premultiply(e$.invert()),h.premultiply(this._yAxisUpSpace);let m=p.getSize(ek),g=p.getCenter(eU).applyQuaternion(h);if(eg(this._camera)){let e=this.getDistanceToFitBox(m.x,m.y,m.z,r);a.push(this.moveTo(g.x,g.y,g.z,t)),a.push(this.dollyTo(e,t)),a.push(this.setFocalOffset(0,0,0,t))}else if(ev(this._camera)){let e=this._camera,n=e.right-e.left,i=e.top-e.bottom,o=r?Math.max(n/m.x,i/m.y):Math.min(n/m.x,i/m.y);a.push(this.moveTo(g.x,g.y,g.z,t)),a.push(this.zoomTo(o,t)),a.push(this.setFocalOffset(0,0,0,t))}return Promise.all(a)}fitToSphere(t,r){let n=[],i="isObject3D"in t?e.createBoundingSphere(t,eK):eK.copy(t);if(n.push(this.moveTo(i.center.x,i.center.y,i.center.z,r)),eg(this._camera)){let e=this.getDistanceToFitSphere(i.radius);n.push(this.dollyTo(e,r))}else if(ev(this._camera)){let e=this._camera.right-this._camera.left,t=this._camera.top-this._camera.bottom,o=2*i.radius,s=Math.min(e/o,t/o);n.push(this.zoomTo(s,r))}return n.push(this.setFocalOffset(0,0,0,r)),Promise.all(n)}setLookAt(e,t,r,n,i,o,s=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=em.NONE,this._changedDolly=0;let a=eU.set(n,i,o),l=ek.set(e,t,r);this._targetEnd.copy(a),this._sphericalEnd.setFromVector3(l.sub(a).applyQuaternion(this._yAxisUpSpace)),this.normalizeRotations(),this._needsUpdate=!0,s||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));let c=!s||eE(this._target.x,this._targetEnd.x,this.restThreshold)&&eE(this._target.y,this._targetEnd.y,this.restThreshold)&&eE(this._target.z,this._targetEnd.z,this.restThreshold)&&eE(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&eE(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&eE(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(c)}lerpLookAt(e,t,r,n,i,o,s,a,l,c,u,d,h,f=!1){this._isUserControllingRotate=!1,this._isUserControllingDolly=!1,this._isUserControllingTruck=!1,this._lastDollyDirection=em.NONE,this._changedDolly=0;let p=ek.set(n,i,o),m=eU.set(e,t,r);eZ.setFromVector3(m.sub(p).applyQuaternion(this._yAxisUpSpace));let g=ej.set(c,u,d),v=eU.set(s,a,l);eq.setFromVector3(v.sub(g).applyQuaternion(this._yAxisUpSpace)),this._targetEnd.copy(p.lerp(g,h));let _=eq.theta-eZ.theta,y=eq.phi-eZ.phi,C=eq.radius-eZ.radius;this._sphericalEnd.set(eZ.radius+C*h,eZ.phi+y*h,eZ.theta+_*h),this.normalizeRotations(),this._needsUpdate=!0,f||(this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd));let x=!f||eE(this._target.x,this._targetEnd.x,this.restThreshold)&&eE(this._target.y,this._targetEnd.y,this.restThreshold)&&eE(this._target.z,this._targetEnd.z,this.restThreshold)&&eE(this._spherical.theta,this._sphericalEnd.theta,this.restThreshold)&&eE(this._spherical.phi,this._sphericalEnd.phi,this.restThreshold)&&eE(this._spherical.radius,this._sphericalEnd.radius,this.restThreshold);return this._createOnRestPromise(x)}setPosition(e,t,r,n=!1){return this.setLookAt(e,t,r,this._targetEnd.x,this._targetEnd.y,this._targetEnd.z,n)}setTarget(e,t,r,n=!1){let i=this.getPosition(ek),o=this.setLookAt(i.x,i.y,i.z,e,t,r,n);return this._sphericalEnd.phi=ex(this._sphericalEnd.phi,this.minPolarAngle,this.maxPolarAngle),o}setFocalOffset(e,t,r,n=!1){this._isUserControllingOffset=!1,this._focalOffsetEnd.set(e,t,r),this._needsUpdate=!0,n||this._focalOffset.copy(this._focalOffsetEnd);let i=!n||eE(this._focalOffset.x,this._focalOffsetEnd.x,this.restThreshold)&&eE(this._focalOffset.y,this._focalOffsetEnd.y,this.restThreshold)&&eE(this._focalOffset.z,this._focalOffsetEnd.z,this.restThreshold);return this._createOnRestPromise(i)}setOrbitPoint(e,t,r){this._camera.updateMatrixWorld(),eN.setFromMatrixColumn(this._camera.matrixWorldInverse,0),eH.setFromMatrixColumn(this._camera.matrixWorldInverse,1),eY.setFromMatrixColumn(this._camera.matrixWorldInverse,2);let n=ek.set(e,t,r),i=n.distanceTo(this._camera.position),o=n.sub(this._camera.position);eN.multiplyScalar(o.x),eH.multiplyScalar(o.y),eY.multiplyScalar(o.z),ek.copy(eN).add(eH).add(eY),ek.z=ek.z+i,this.dollyTo(i,!1),this.setFocalOffset(-ek.x,ek.y,-ek.z,!1),this.moveTo(e,t,r,!1)}setBoundary(e){if(!e){this._boundary.min.set(-1/0,-1/0,-1/0),this._boundary.max.set(1/0,1/0,1/0),this._needsUpdate=!0;return}this._boundary.copy(e),this._boundary.clampPoint(this._targetEnd,this._targetEnd),this._needsUpdate=!0}setViewport(e,t,r,n){if(null===e){this._viewport=null;return}this._viewport=this._viewport||new eR.Vector4,"number"==typeof e?this._viewport.set(e,t,r,n):this._viewport.copy(e)}getDistanceToFitBox(e,t,r,n=!1){if(eD(this._camera,"getDistanceToFitBox"))return this._spherical.radius;let i=e/t,o=this._camera.getEffectiveFOV()*eC,s=this._camera.aspect;return((n?i>s:i<s)?t:e/s)*.5/Math.tan(.5*o)+.5*r}getDistanceToFitSphere(e){if(eD(this._camera,"getDistanceToFitSphere"))return this._spherical.radius;let t=this._camera.getEffectiveFOV()*eC,r=2*Math.atan(Math.tan(.5*t)*this._camera.aspect);return e/Math.sin(.5*(1<this._camera.aspect?t:r))}getTarget(e,t=!0){return(e&&e.isVector3?e:new eR.Vector3).copy(t?this._targetEnd:this._target)}getPosition(e,t=!0){return(e&&e.isVector3?e:new eR.Vector3).setFromSpherical(t?this._sphericalEnd:this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(t?this._targetEnd:this._target)}getSpherical(e,t=!0){return(e||new eR.Spherical).copy(t?this._sphericalEnd:this._spherical)}getFocalOffset(e,t=!0){return(e&&e.isVector3?e:new eR.Vector3).copy(t?this._focalOffsetEnd:this._focalOffset)}normalizeRotations(){this._sphericalEnd.theta=this._sphericalEnd.theta%e_,this._sphericalEnd.theta<0&&(this._sphericalEnd.theta+=e_),this._spherical.theta+=e_*Math.round((this._sphericalEnd.theta-this._spherical.theta)/e_)}stop(){this._focalOffset.copy(this._focalOffsetEnd),this._target.copy(this._targetEnd),this._spherical.copy(this._sphericalEnd),this._zoom=this._zoomEnd}reset(e=!1){if(!eE(this._camera.up.x,this._cameraUp0.x)||!eE(this._camera.up.y,this._cameraUp0.y)||!eE(this._camera.up.z,this._cameraUp0.z)){this._camera.up.copy(this._cameraUp0);let e=this.getPosition(ek);this.updateCameraUp(),this.setPosition(e.x,e.y,e.z)}return Promise.all([this.setLookAt(this._position0.x,this._position0.y,this._position0.z,this._target0.x,this._target0.y,this._target0.z,e),this.setFocalOffset(this._focalOffset0.x,this._focalOffset0.y,this._focalOffset0.z,e),this.zoomTo(this._zoom0,e)])}saveState(){this._cameraUp0.copy(this._camera.up),this.getTarget(this._target0),this.getPosition(this._position0),this._zoom0=this._zoom,this._focalOffset0.copy(this._focalOffset)}updateCameraUp(){this._yAxisUpSpace.setFromUnitVectors(this._camera.up,eB),this._yAxisUpSpaceInverse.copy(this._yAxisUpSpace).invert()}applyCameraUp(){let e=ek.subVectors(this._target,this._camera.position).normalize(),t=eU.crossVectors(e,this._camera.up);this._camera.up.crossVectors(t,e).normalize(),this._camera.updateMatrixWorld();let r=this.getPosition(ek);this.updateCameraUp(),this.setPosition(r.x,r.y,r.z)}update(e){let t=this._sphericalEnd.theta-this._spherical.theta,r=this._sphericalEnd.phi-this._spherical.phi,n=this._sphericalEnd.radius-this._spherical.radius,i=eV.subVectors(this._targetEnd,this._target),o=eX.subVectors(this._focalOffsetEnd,this._focalOffset),s=this._zoomEnd-this._zoom;if(eb(t))this._thetaVelocity.value=0,this._spherical.theta=this._sphericalEnd.theta;else{let t=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.theta=eS(this._spherical.theta,this._sphericalEnd.theta,this._thetaVelocity,t,1/0,e),this._needsUpdate=!0}if(eb(r))this._phiVelocity.value=0,this._spherical.phi=this._sphericalEnd.phi;else{let t=this._isUserControllingRotate?this.draggingSmoothTime:this.smoothTime;this._spherical.phi=eS(this._spherical.phi,this._sphericalEnd.phi,this._phiVelocity,t,1/0,e),this._needsUpdate=!0}if(eb(n))this._radiusVelocity.value=0,this._spherical.radius=this._sphericalEnd.radius;else{let t=this._isUserControllingDolly?this.draggingSmoothTime:this.smoothTime;this._spherical.radius=eS(this._spherical.radius,this._sphericalEnd.radius,this._radiusVelocity,t,this.maxSpeed,e),this._needsUpdate=!0}if(eb(i.x)&&eb(i.y)&&eb(i.z))this._targetVelocity.set(0,0,0),this._target.copy(this._targetEnd);else{let t=this._isUserControllingTruck?this.draggingSmoothTime:this.smoothTime;eA(this._target,this._targetEnd,this._targetVelocity,t,this.maxSpeed,e,this._target),this._needsUpdate=!0}if(eb(o.x)&&eb(o.y)&&eb(o.z))this._focalOffsetVelocity.set(0,0,0),this._focalOffset.copy(this._focalOffsetEnd);else{let t=this._isUserControllingOffset?this.draggingSmoothTime:this.smoothTime;eA(this._focalOffset,this._focalOffsetEnd,this._focalOffsetVelocity,t,this.maxSpeed,e,this._focalOffset),this._needsUpdate=!0}if(eb(s))this._zoomVelocity.value=0,this._zoom=this._zoomEnd;else{let t=this._isUserControllingZoom?this.draggingSmoothTime:this.smoothTime;this._zoom=eS(this._zoom,this._zoomEnd,this._zoomVelocity,t,1/0,e)}if(this.dollyToCursor){if(eg(this._camera)&&0!==this._changedDolly){let e=this._spherical.radius-this._lastDistance,t=this._camera,r=this._getCameraDirection(eI),n=ek.copy(r).cross(t.up).normalize();0===n.lengthSq()&&(n.x=1);let i=eU.crossVectors(n,r),o=this._sphericalEnd.radius*Math.tan(t.getEffectiveFOV()*eC*.5),s=(this._sphericalEnd.radius-e-this._sphericalEnd.radius)/this._sphericalEnd.radius,a=ej.copy(this._targetEnd).add(n.multiplyScalar(this._dollyControlCoord.x*o*t.aspect)).add(i.multiplyScalar(this._dollyControlCoord.y*o)),l=ek.copy(this._targetEnd).lerp(a,s),c=this._lastDollyDirection===em.IN&&this._spherical.radius<=this.minDistance,u=this._lastDollyDirection===em.OUT&&this.maxDistance<=this._spherical.radius;if(this.infinityDolly&&(c||u)){this._sphericalEnd.radius-=e,this._spherical.radius-=e;let t=eU.copy(r).multiplyScalar(-e);l.add(t)}this._boundary.clampPoint(l,l);let d=eU.subVectors(l,this._targetEnd);this._targetEnd.copy(l),this._target.add(d),this._changedDolly-=e,eb(this._changedDolly)&&(this._changedDolly=0)}else if(ev(this._camera)&&0!==this._changedZoom){let e=this._zoom-this._lastZoom,t=this._camera,r=ek.set(this._dollyControlCoord.x,this._dollyControlCoord.y,(t.near+t.far)/(t.near-t.far)).unproject(t),n=eU.set(0,0,-1).applyQuaternion(t.quaternion),i=ej.copy(r).add(n.multiplyScalar(-r.dot(t.up))),o=-(this._zoom-e-this._zoom)/this._zoom,s=this._getCameraDirection(eI),a=this._targetEnd.dot(s),l=ek.copy(this._targetEnd).lerp(i,o),c=l.dot(s),u=s.multiplyScalar(c-a);l.sub(u),this._boundary.clampPoint(l,l);let d=eU.subVectors(l,this._targetEnd);this._targetEnd.copy(l),this._target.add(d),this._changedZoom-=e,eb(this._changedZoom)&&(this._changedZoom=0)}}this._camera.zoom!==this._zoom&&(this._camera.zoom=this._zoom,this._camera.updateProjectionMatrix(),this._updateNearPlaneCorners(),this._needsUpdate=!0),this._dragNeedsUpdate=!0;let a=this._collisionTest();this._spherical.radius=Math.min(this._spherical.radius,a),this._spherical.makeSafe(),this._camera.position.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse).add(this._target),this._camera.lookAt(this._target),eb(this._focalOffset.x)&&eb(this._focalOffset.y)&&eb(this._focalOffset.z)||(this._camera.updateMatrixWorld(),eN.setFromMatrixColumn(this._camera.matrix,0),eH.setFromMatrixColumn(this._camera.matrix,1),eY.setFromMatrixColumn(this._camera.matrix,2),eN.multiplyScalar(this._focalOffset.x),eH.multiplyScalar(-this._focalOffset.y),eY.multiplyScalar(this._focalOffset.z),ek.copy(eN).add(eH).add(eY),this._camera.position.add(ek)),this._boundaryEnclosesCamera&&this._encloseToBoundary(this._camera.position.copy(this._target),ek.setFromSpherical(this._spherical).applyQuaternion(this._yAxisUpSpaceInverse),1);let l=this._needsUpdate;return l&&!this._updatedLastTime?(this._hasRested=!1,this.dispatchEvent({type:"wake"}),this.dispatchEvent({type:"update"})):l?(this.dispatchEvent({type:"update"}),eb(t,this.restThreshold)&&eb(r,this.restThreshold)&&eb(n,this.restThreshold)&&eb(i.x,this.restThreshold)&&eb(i.y,this.restThreshold)&&eb(i.z,this.restThreshold)&&eb(o.x,this.restThreshold)&&eb(o.y,this.restThreshold)&&eb(o.z,this.restThreshold)&&eb(s,this.restThreshold)&&!this._hasRested&&(this._hasRested=!0,this.dispatchEvent({type:"rest"}))):!l&&this._updatedLastTime&&this.dispatchEvent({type:"sleep"}),this._lastDistance=this._spherical.radius,this._lastZoom=this._zoom,this._updatedLastTime=l,this._needsUpdate=!1,l}toJSON(){return JSON.stringify({enabled:this._enabled,minDistance:this.minDistance,maxDistance:ew(this.maxDistance),minZoom:this.minZoom,maxZoom:ew(this.maxZoom),minPolarAngle:this.minPolarAngle,maxPolarAngle:ew(this.maxPolarAngle),minAzimuthAngle:ew(this.minAzimuthAngle),maxAzimuthAngle:ew(this.maxAzimuthAngle),smoothTime:this.smoothTime,draggingSmoothTime:this.draggingSmoothTime,dollySpeed:this.dollySpeed,truckSpeed:this.truckSpeed,dollyToCursor:this.dollyToCursor,verticalDragToForward:this.verticalDragToForward,target:this._targetEnd.toArray(),position:ek.setFromSpherical(this._sphericalEnd).add(this._targetEnd).toArray(),zoom:this._zoomEnd,focalOffset:this._focalOffsetEnd.toArray(),target0:this._target0.toArray(),position0:this._position0.toArray(),zoom0:this._zoom0,focalOffset0:this._focalOffset0.toArray()})}fromJSON(e,t=!1){let r=JSON.parse(e);this.enabled=r.enabled,this.minDistance=r.minDistance,this.maxDistance=eO(r.maxDistance),this.minZoom=r.minZoom,this.maxZoom=eO(r.maxZoom),this.minPolarAngle=r.minPolarAngle,this.maxPolarAngle=eO(r.maxPolarAngle),this.minAzimuthAngle=eO(r.minAzimuthAngle),this.maxAzimuthAngle=eO(r.maxAzimuthAngle),this.smoothTime=r.smoothTime,this.draggingSmoothTime=r.draggingSmoothTime,this.dollySpeed=r.dollySpeed,this.truckSpeed=r.truckSpeed,this.dollyToCursor=r.dollyToCursor,this.verticalDragToForward=r.verticalDragToForward,this._target0.fromArray(r.target0),this._position0.fromArray(r.position0),this._zoom0=r.zoom0,this._focalOffset0.fromArray(r.focalOffset0),this.moveTo(r.target[0],r.target[1],r.target[2],t),eZ.setFromVector3(ek.fromArray(r.position).sub(this._targetEnd).applyQuaternion(this._yAxisUpSpace)),this.rotateTo(eZ.theta,eZ.phi,t),this.dollyTo(eZ.radius,t),this.zoomTo(r.zoom,t),this.setFocalOffset(r.focalOffset[0],r.focalOffset[1],r.focalOffset[2],t),this._needsUpdate=!0}connect(e){if(this._domElement)return void console.warn("camera-controls is already connected.");e.setAttribute("data-camera-controls-version","2.9.0"),this._addAllEventListeners(e),this._getClientRect(this._elementRect)}disconnect(){this.cancel(),this._removeAllEventListeners(),this._domElement&&(this._domElement.removeAttribute("data-camera-controls-version"),this._domElement=void 0)}dispose(){this.removeAllEventListeners(),this.disconnect()}_getTargetDirection(e){return e.setFromSpherical(this._spherical).divideScalar(this._spherical.radius).applyQuaternion(this._yAxisUpSpaceInverse)}_getCameraDirection(e){return this._getTargetDirection(e).negate()}_findPointerById(e){return this._activePointers.find(t=>t.pointerId===e)}_findPointerByMouseButton(e){return this._activePointers.find(t=>t.mouseButton===e)}_disposePointer(e){this._activePointers.splice(this._activePointers.indexOf(e),1)}_encloseToBoundary(e,t,r){let n=t.lengthSq();if(0===n)return e;let i=eU.copy(t).add(e),o=this._boundary.clampPoint(i,ej).sub(i),s=o.lengthSq();if(0===s)return e.add(t);if(s===n)return e;if(0===r)return e.add(t).add(o);{let n=1+r*s/t.dot(o);return e.add(eU.copy(t).multiplyScalar(n)).add(o.multiplyScalar(1-r))}}_updateNearPlaneCorners(){if(eg(this._camera)){let e=this._camera,t=e.near,r=Math.tan(.5*(e.getEffectiveFOV()*eC))*t,n=r*e.aspect;this._nearPlaneCorners[0].set(-n,-r,0),this._nearPlaneCorners[1].set(n,-r,0),this._nearPlaneCorners[2].set(n,r,0),this._nearPlaneCorners[3].set(-n,r,0)}else if(ev(this._camera)){let e=this._camera,t=1/e.zoom,r=e.left*t,n=e.right*t,i=e.top*t,o=e.bottom*t;this._nearPlaneCorners[0].set(r,i,0),this._nearPlaneCorners[1].set(n,i,0),this._nearPlaneCorners[2].set(n,o,0),this._nearPlaneCorners[3].set(r,o,0)}}_collisionTest(){let e=1/0;if(!(this.colliderMeshes.length>=1)||eD(this._camera,"_collisionTest"))return e;let t=this._getTargetDirection(eI);eJ.lookAt(eM,t,this._camera.up);for(let r=0;r<4;r++){let n=eU.copy(this._nearPlaneCorners[r]);n.applyMatrix4(eJ);let i=ej.addVectors(this._target,n);e0.set(i,t),e0.far=this._spherical.radius+1;let o=e0.intersectObjects(this.colliderMeshes);0!==o.length&&o[0].distance<e&&(e=o[0].distance)}return e}_getClientRect(e){if(!this._domElement)return;let t=this._domElement.getBoundingClientRect();return e.x=t.left,e.y=t.top,this._viewport?(e.x+=this._viewport.x,e.y+=t.height-this._viewport.w-this._viewport.y,e.width=this._viewport.z,e.height=this._viewport.w):(e.width=t.width,e.height=t.height),e}_createOnRestPromise(e){return e?Promise.resolve():(this._hasRested=!1,this.dispatchEvent({type:"transitionstart"}),new Promise(e=>{let t=()=>{this.removeEventListener("rest",t),e()};this.addEventListener("rest",t)}))}_addAllEventListeners(e){}_removeAllEventListeners(){}get dampingFactor(){return console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead."),0}set dampingFactor(e){console.warn(".dampingFactor has been deprecated. use smoothTime (in seconds) instead.")}get draggingDampingFactor(){return console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead."),0}set draggingDampingFactor(e){console.warn(".draggingDampingFactor has been deprecated. use draggingSmoothTime (in seconds) instead.")}static createBoundingSphere(e,t=new eR.Sphere){let r=t.center;eG.makeEmpty(),e.traverseVisible(e=>{e.isMesh&&eG.expandByObject(e)}),eG.getCenter(r);let n=0;return e.traverseVisible(e=>{if(!e.isMesh)return;let t=e.geometry.clone();t.applyMatrix4(e.matrixWorld);let i=t.attributes.position;for(let e=0,t=i.count;e<t;e++)ek.fromBufferAttribute(i,e),n=Math.max(n,r.distanceToSquared(ek))}),t.radius=Math.sqrt(n),t}};function e5(e){var{smoothTime:t=.05}=e,r=(0,J.c)(e,["smoothTime"]);e4.install({THREE:eh}),(0,Y.e)({CameraControls:e4});let n=(0,Y.A)(e=>e.camera),i=(0,Y.A)(e=>e.gl),o=function({type:e,cAzimuthAngle:t,cPolarAngle:r,cDistance:n,cameraZoom:i,zoomOut:o,enableTransition:s=!0}){let a=(0,H.useRef)();return(0,Y.C)((e,t)=>a.current.update(t)),(0,H.useEffect)(()=>{let e=a.current;null==e||e.rotateTo(et(t),et(r),s)},[a,t,r]),(0,H.useEffect)(()=>{let t=a.current;o?"sphere"===e?(null==t||t.dollyTo(ed.f.distance,s),null==t||t.zoomTo(ed.f.zoom,s)):(null==t||t.dollyTo(ed.e.distance,s),null==t||t.zoomTo(ed.e.zoom,s)):"sphere"===e?(null==t||t.zoomTo(i,s),null==t||t.dollyTo(ed.d,s)):(null==t||t.dollyTo(n,s),null==t||t.zoomTo(ed.c,s))},[a,o,e,i,n]),a}(r);return(0,V.jsx)("cameraControls",{ref:o,args:[n,i.domElement],enableDamping:!0,smoothTime:t,zoomSpeed:10,dollySpeed:10,restThreshold:0})}function e8(e){return(0,V.jsx)(V.Fragment,{children:(0,V.jsx)(e5,(0,J.a)({},e))})}var e7=(0,J.d)((e,t)=>{t.exports=e=>encodeURIComponent(e).replace(/[!'()*]/g,e=>`%${e.charCodeAt(0).toString(16).toUpperCase()}`)}),e9=(0,J.d)((e,t)=>{var r="%[a-f0-9]{2}",n=RegExp("("+r+")|([^%]+?)","gi"),i=RegExp("("+r+")+","gi");t.exports=function(e){if("string"!=typeof e)throw TypeError("Expected `encodedURI` to be of type `string`, got `"+typeof e+"`");try{return e=e.replace(/\+/g," "),decodeURIComponent(e)}catch(t){return function(e){for(var t={"%FE%FF":"��","%FF%FE":"��"},r=i.exec(e);r;){try{t[r[0]]=decodeURIComponent(r[0])}catch(e){var o=function(e){try{return decodeURIComponent(e)}catch(i){for(var t=e.match(n)||[],r=1;r<t.length;r++)t=(e=(function e(t,r){try{return[decodeURIComponent(t.join(""))]}catch(e){}if(1===t.length)return t;r=r||1;var n=t.slice(0,r),i=t.slice(r);return Array.prototype.concat.call([],e(n),e(i))})(t,r).join("")).match(n)||[];return e}}(r[0]);o!==r[0]&&(t[r[0]]=o)}r=i.exec(e)}t["%C2"]="�";for(var s=Object.keys(t),a=0;a<s.length;a++){var l=s[a];e=e.replace(RegExp(l,"g"),t[l])}return e}(e)}}}),e6=(0,J.d)((e,t)=>{t.exports=(e,t)=>{if("string"!=typeof e||"string"!=typeof t)throw TypeError("Expected the arguments to be of type `string`");if(""===t)return[e];let r=e.indexOf(t);return -1===r?[e]:[e.slice(0,r),e.slice(r+t.length)]}}),te=(0,J.d)((e,t)=>{t.exports=function(e,t){for(var r={},n=Object.keys(e),i=Array.isArray(t),o=0;o<n.length;o++){var s=n[o],a=e[s];(i?-1!==t.indexOf(s):t(s,a,e))&&(r[s]=a)}return r}}),tt=(0,J.d)(e=>{var t=e7(),r=e9(),n=e6(),i=te(),o=e=>null==e,s=Symbol("encodeFragmentIdentifier");function a(e){if("string"!=typeof e||1!==e.length)throw TypeError("arrayFormatSeparator must be single character string")}function l(e,r){return r.encode?r.strict?t(e):encodeURIComponent(e):e}function c(e,t){return t.decode?r(e):e}function u(e){let t=e.indexOf("#");return -1!==t&&(e=e.slice(0,t)),e}function d(e){let t=(e=u(e)).indexOf("?");return -1===t?"":e.slice(t+1)}function h(e,t){return t.parseNumbers&&!Number.isNaN(Number(e))&&"string"==typeof e&&""!==e.trim()?e=Number(e):t.parseBooleans&&null!==e&&("true"===e.toLowerCase()||"false"===e.toLowerCase())&&(e="true"===e.toLowerCase()),e}function f(e,t){a((t=Object.assign({decode:!0,sort:!0,arrayFormat:"none",arrayFormatSeparator:",",parseNumbers:!1,parseBooleans:!1},t)).arrayFormatSeparator);let r=function(e){let t;switch(e.arrayFormat){case"index":return(e,r,n)=>{if(t=/\[(\d*)\]$/.exec(e),e=e.replace(/\[\d*\]$/,""),!t){n[e]=r;return}void 0===n[e]&&(n[e]={}),n[e][t[1]]=r};case"bracket":return(e,r,n)=>{if(t=/(\[\])$/.exec(e),e=e.replace(/\[\]$/,""),!t){n[e]=r;return}if(void 0===n[e]){n[e]=[r];return}n[e]=[].concat(n[e],r)};case"colon-list-separator":return(e,r,n)=>{if(t=/(:list)$/.exec(e),e=e.replace(/:list$/,""),!t){n[e]=r;return}if(void 0===n[e]){n[e]=[r];return}n[e]=[].concat(n[e],r)};case"comma":case"separator":return(t,r,n)=>{let i="string"==typeof r&&r.includes(e.arrayFormatSeparator),o="string"==typeof r&&!i&&c(r,e).includes(e.arrayFormatSeparator);r=o?c(r,e):r;let s=i||o?r.split(e.arrayFormatSeparator).map(t=>c(t,e)):null===r?r:c(r,e);n[t]=s};case"bracket-separator":return(t,r,n)=>{let i=/(\[\])$/.test(t);if(t=t.replace(/\[\]$/,""),!i){n[t]=r&&c(r,e);return}let o=null===r?[]:r.split(e.arrayFormatSeparator).map(t=>c(t,e));if(void 0===n[t]){n[t]=o;return}n[t]=[].concat(n[t],o)};default:return(e,t,r)=>{if(void 0===r[e]){r[e]=t;return}r[e]=[].concat(r[e],t)}}}(t),i=Object.create(null);if("string"!=typeof e||!(e=e.trim().replace(/^[?#&]/,"")))return i;for(let o of e.split("&")){if(""===o)continue;let[e,s]=n(t.decode?o.replace(/\+/g," "):o,"=");s=void 0===s?null:["comma","separator","bracket-separator"].includes(t.arrayFormat)?s:c(s,t),r(c(e,t),s,i)}for(let e of Object.keys(i)){let r=i[e];if("object"==typeof r&&null!==r)for(let e of Object.keys(r))r[e]=h(r[e],t);else i[e]=h(r,t)}return!1===t.sort?i:(!0===t.sort?Object.keys(i).sort():Object.keys(i).sort(t.sort)).reduce((e,t)=>{let r=i[t];return r&&"object"==typeof r&&!Array.isArray(r)?e[t]=function e(t){return Array.isArray(t)?t.sort():"object"==typeof t?e(Object.keys(t)).sort((e,t)=>Number(e)-Number(t)).map(e=>t[e]):t}(r):e[t]=r,e},Object.create(null))}e.extract=d,e.parse=f,e.stringify=(e,t)=>{if(!e)return"";a((t=Object.assign({encode:!0,strict:!0,arrayFormat:"none",arrayFormatSeparator:","},t)).arrayFormatSeparator);let r=r=>t.skipNull&&o(e[r])||t.skipEmptyString&&""===e[r],n=function(e){switch(e.arrayFormat){case"index":return t=>(r,n)=>{let i=r.length;return void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,[l(t,e),"[",i,"]"].join("")]:[...r,[l(t,e),"[",l(i,e),"]=",l(n,e)].join("")]};case"bracket":return t=>(r,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,[l(t,e),"[]"].join("")]:[...r,[l(t,e),"[]=",l(n,e)].join("")];case"colon-list-separator":return t=>(r,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,[l(t,e),":list="].join("")]:[...r,[l(t,e),":list=",l(n,e)].join("")];case"comma":case"separator":case"bracket-separator":{let t="bracket-separator"===e.arrayFormat?"[]=":"=";return r=>(n,i)=>void 0===i||e.skipNull&&null===i||e.skipEmptyString&&""===i?n:(i=null===i?"":i,0===n.length?[[l(r,e),t,l(i,e)].join("")]:[[n,l(i,e)].join(e.arrayFormatSeparator)])}default:return t=>(r,n)=>void 0===n||e.skipNull&&null===n||e.skipEmptyString&&""===n?r:null===n?[...r,l(t,e)]:[...r,[l(t,e),"=",l(n,e)].join("")]}}(t),i={};for(let t of Object.keys(e))r(t)||(i[t]=e[t]);let s=Object.keys(i);return!1!==t.sort&&s.sort(t.sort),s.map(r=>{let i=e[r];return void 0===i?"":null===i?l(r,t):Array.isArray(i)?0===i.length&&"bracket-separator"===t.arrayFormat?l(r,t)+"[]":i.reduce(n(r),[]).join("&"):l(r,t)+"="+l(i,t)}).filter(e=>e.length>0).join("&")},e.parseUrl=(e,t)=>{t=Object.assign({decode:!0},t);let[r,i]=n(e,"#");return Object.assign({url:r.split("?")[0]||"",query:f(d(e),t)},t&&t.parseFragmentIdentifier&&i?{fragmentIdentifier:c(i,t)}:{})},e.stringifyUrl=(t,r)=>{r=Object.assign({encode:!0,strict:!0,[s]:!0},r);let n=u(t.url).split("?")[0]||"",i=e.extract(t.url),o=Object.assign(e.parse(i,{sort:!1}),t.query),a=e.stringify(o,r);a&&(a=`?${a}`);let c=function(e){let t="",r=e.indexOf("#");return -1!==r&&(t=e.slice(r)),t}(t.url);return t.fragmentIdentifier&&(c=`#${r[s]?l(t.fragmentIdentifier,r):t.fragmentIdentifier}`),`${n}${a}${c}`},e.pick=(t,r,n)=>{n=Object.assign({parseFragmentIdentifier:!0,[s]:!1},n);let{url:o,query:a,fragmentIdentifier:l}=e.parseUrl(t,n);return e.stringifyUrl({url:o,query:i(a,r),fragmentIdentifier:l},n)},e.exclude=(t,r,n)=>{let i=Array.isArray(r)?e=>!r.includes(e):(e,t)=>!r(e,t);return e.pick(t,i,n)}}),tr={halo:{title:"Halo",color:"white",props:{type:"plane",uAmplitude:1,uDensity:1.3,uSpeed:.4,uStrength:4,uTime:0,uFrequency:5.5,range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",axesHelper:"off",brightness:1.2,cAzimuthAngle:180,cDistance:3.6,cPolarAngle:90,cameraZoom:1,color1:"#ff5005",color2:"#dbba95",color3:"#d0bce1",embedMode:"off",envPreset:"city",gizmoHelper:"hide",grain:"on",lightType:"3d",pixelDensity:1,fov:45,positionX:-1.4,positionY:0,positionZ:0,reflection:.1,rotationX:0,rotationY:10,rotationZ:50,shader:"defaults",animate:"on",wireframe:!1}},pensive:{title:"Pensive",color:"white",props:{range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",animate:"on",axesHelper:"off",brightness:1.5,cAzimuthAngle:250,cDistance:1.5,cPolarAngle:140,cameraZoom:12.5,color1:"#809bd6",color2:"#910aff",color3:"#af38ff",embedMode:"off",envPreset:"city",gizmoHelper:"hide",grain:"on",lightType:"3d",pixelDensity:1,fov:45,positionX:0,positionY:0,positionZ:0,reflection:.5,rotationX:0,rotationY:0,rotationZ:140,shader:"defaults",type:"sphere",uAmplitude:7,uDensity:.8,uFrequency:5.5,uSpeed:.3,uStrength:.4,uTime:0,wireframe:!1}},mint:{title:"Mint",color:"white",props:{range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",animate:"on",axesHelper:"off",brightness:1.2,cAzimuthAngle:170,cDistance:4.4,cPolarAngle:70,cameraZoom:1,color1:"#94ffd1",color2:"#6bf5ff",color3:"#ffffff",embedMode:"off",envPreset:"city",gizmoHelper:"hide",grain:"off",lightType:"3d",pixelDensity:1,fov:45,positionX:0,positionY:.9,positionZ:-.3,reflection:.1,rotationX:45,rotationY:0,rotationZ:0,shader:"defaults",type:"waterPlane",uAmplitude:0,uDensity:1.2,uFrequency:0,uSpeed:.2,uStrength:3.4,uTime:0,wireframe:!1}},interstella:{title:"Interstella",color:"white",props:{range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",animate:"on",axesHelper:"off",brightness:.8,cAzimuthAngle:270,cDistance:.5,cPolarAngle:180,cameraZoom:15.1,color1:"#73bfc4",color2:"#ff810a",color3:"#8da0ce",embedMode:"off",envPreset:"city",gizmoHelper:"hide",grain:"on",lightType:"env",pixelDensity:1,fov:45,positionX:-.1,positionY:0,positionZ:0,reflection:.4,rotationX:0,rotationY:130,rotationZ:70,shader:"defaults",type:"sphere",uAmplitude:3.2,uDensity:.8,uFrequency:5.5,uSpeed:.3,uStrength:.3,uTime:0,wireframe:!1}},nightyNight:{title:"Nighty night",color:"white",props:{range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",animate:"on",axesHelper:"off",brightness:1,cAzimuthAngle:180,cDistance:2.8,cPolarAngle:80,cameraZoom:9.1,color1:"#606080",color2:"#8d7dca",color3:"#212121",embedMode:"off",envPreset:"city",gizmoHelper:"hide",grain:"on",lightType:"3d",pixelDensity:1,fov:45,positionX:0,positionY:0,positionZ:0,reflection:.1,rotationX:50,rotationY:0,rotationZ:-60,shader:"defaults",type:"waterPlane",uAmplitude:0,uDensity:1.5,uFrequency:0,uSpeed:.3,uStrength:1.5,uTime:8,wireframe:!1}},violaOrientalis:{title:"Viola orientalis",color:"white",props:{range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",animate:"on",axesHelper:"on",brightness:1.1,cAzimuthAngle:0,cDistance:7.1,cPolarAngle:140,cameraZoom:17.3,color1:"#ffffff",color2:"#ffbb00",color3:"#0700ff",embedMode:"off",envPreset:"city",grain:"off",lightType:"3d",pixelDensity:1,fov:45,positionX:0,positionY:0,positionZ:0,reflection:.1,rotationX:0,rotationY:0,rotationZ:0,shader:"defaults",type:"sphere",uAmplitude:1.4,uDensity:1.1,uSpeed:.1,uStrength:1,uTime:0,uFrequency:5.5,wireframe:!1}},universe:{title:"Universe",color:"white",props:{range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",animate:"on",axesHelper:"on",brightness:1.1,cAzimuthAngle:180,cDistance:3.9,cPolarAngle:115,cameraZoom:1,color1:"#5606ff",color2:"#fe8989",color3:"#000000",embedMode:"off",envPreset:"city",grain:"off",lightType:"3d",pixelDensity:1,fov:45,positionX:-.5,positionY:.1,positionZ:0,reflection:.1,rotationX:0,rotationY:0,rotationZ:235,shader:"defaults",type:"waterPlane",uAmplitude:0,uDensity:1.1,uSpeed:.1,uStrength:2.4,uTime:.2,uFrequency:5.5,wireframe:!1}},sunset:{title:"Sunset",color:"white",props:{range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",animate:"on",axesHelper:"on",bgColor1:"#000000",bgColor2:"#000000",brightness:1.5,cAzimuthAngle:60,cDistance:7.1,cPolarAngle:90,cameraZoom:15.3,color1:"#ff7a33",color2:"#33a0ff",color3:"#ffc53d",embedMode:"off",envPreset:"dawn",grain:"off",lightType:"3d",pixelDensity:1,fov:45,positionX:0,positionY:-.15,positionZ:0,reflection:.1,rotationX:0,rotationY:0,rotationZ:0,shader:"defaults",type:"sphere",uAmplitude:1.4,uDensity:1.1,uSpeed:.1,uStrength:.4,uTime:0,uFrequency:5.5,wireframe:!1}},mandarin:{title:"Mandarin",color:"white",props:{range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",animate:"on",axesHelper:"on",bgColor1:"#000000",bgColor2:"#000000",brightness:1.2,cAzimuthAngle:180,cDistance:2.4,cPolarAngle:95,cameraZoom:1,color1:"#ff6a1a",color2:"#c73c00",color3:"#FD4912",embedMode:"off",envPreset:"city",grain:"off",lightType:"3d",pixelDensity:1,fov:45,positionX:0,positionY:-2.1,positionZ:0,reflection:.1,rotationX:0,rotationY:0,rotationZ:225,shader:"defaults",type:"waterPlane",uAmplitude:0,uDensity:1.8,uSpeed:.2,uStrength:3,uTime:.2,uFrequency:5.5,wireframe:!1}},cottonCandy:{title:"Cotton Candy",color:"white",props:{range:"enabled",rangeStart:0,rangeEnd:40,frameRate:10,destination:"onCanvas",format:"gif",animate:"on",axesHelper:"off",brightness:1.2,cAzimuthAngle:180,cDistance:2.9,cPolarAngle:120,cameraZoom:1,color1:"#ebedff",color2:"#f3f2f8",color3:"#dbf8ff",embedMode:"off",envPreset:"city",grain:"off",lightType:"3d",pixelDensity:1,fov:45,positionX:0,positionY:1.8,positionZ:0,reflection:.1,rotationX:0,rotationY:0,rotationZ:-90,shader:"defaults",type:"waterPlane",uAmplitude:0,uDensity:1,uSpeed:.3,uStrength:3,uTime:.2,uFrequency:5.5,wireframe:!1}}};Object.values(tr);var tn=(0,J.f)(tt());function ti(e){let t=(0,J.a)((0,J.a)({},tr.halo.props),e),{control:r,urlString:n}=t,i=(0,J.c)(t,["control","urlString"]);"query"===r&&(i=tn.parse(n.replace("http://localhost:3001/customize","").replace("https://shadergradient.co/customize","").replace("https://www.shadergradient.co/customize",""),{parseNumbers:!0,parseBooleans:!0,arrayFormat:"index"}));let o=i,{lightType:s,envPreset:a,brightness:l,grain:c,toggleAxis:u}=o;return(0,J.c)(o,["lightType","envPreset","brightness","grain","toggleAxis"]),(0,V.jsxs)(V.Fragment,{children:[(0,V.jsx)(er,(0,J.a)({},i)),(0,V.jsx)(ec,{lightType:s,brightness:l,envPreset:a}),"off"!==c&&(0,V.jsx)(X,{}),(0,V.jsx)(e8,(0,J.a)({},i))]})}},491:(e,t,r)=>{r.d(t,{a:()=>n,c:()=>i,d:()=>o,e:()=>s,f:()=>a,m:()=>l});var n=(e,t)=>({dpr:e,camera:{fov:t},linear:!0,flat:!0,gl:{preserveDrawingBuffer:!0}}),i=1,o=14,s={zoom:1,distance:14},a={zoom:5,distance:14},l="https://ruucm.github.io/shadergradient/shadergradient@1.0.0/hdr/"},802:(e,t,r)=>{r.d(t,{Ay:()=>eC,os:()=>eC});var n,i,o,s,a,l,c,u=r(934),d={},h=180/Math.PI,f=Math.PI/180,p=Math.atan2,m=/([A-Z])/g,g=/(left|right|width|margin|padding|x)/i,v=/[\s,\(]\S/,_={autoAlpha:"opacity,visibility",scale:"scaleX,scaleY",alpha:"opacity"},y=function(e,t){return t.set(t.t,t.p,Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},C=function(e,t){return t.set(t.t,t.p,1===e?t.e:Math.round((t.s+t.c*e)*1e4)/1e4+t.u,t)},x=function(e,t){return t.set(t.t,t.p,e?Math.round((t.s+t.c*e)*1e4)/1e4+t.u:t.b,t)},b=function(e,t){var r=t.s+t.c*e;t.set(t.t,t.p,~~(r+(r<0?-.5:.5))+t.u,t)},E=function(e,t){return t.set(t.t,t.p,e?t.e:t.b,t)},T=function(e,t){return t.set(t.t,t.p,1!==e?t.b:t.e,t)},w=function(e,t,r){return e.style[t]=r},O=function(e,t,r){return e.style.setProperty(t,r)},S=function(e,t,r){return e._gsap[t]=r},A=function(e,t,r){return e._gsap.scaleX=e._gsap.scaleY=r},P=function(e,t,r,n,i){var o=e._gsap;o.scaleX=o.scaleY=r,o.renderTransform(i,o)},D=function(e,t,r,n,i){var o=e._gsap;o[t]=r,o.renderTransform(i,o)},z="transform",R=z+"Origin",M=function e(t,r){var n=this,i=this.target,o=i.style,s=i._gsap;if(t in d&&o){if(this.tfm=this.tfm||{},"transform"===t)return _.transform.split(",").forEach(function(t){return e.call(n,t,r)});if(~(t=_[t]||t).indexOf(",")?t.split(",").forEach(function(e){return n.tfm[e]=Q(i,e)}):this.tfm[t]=s.x?s[t]:Q(i,t),t===R&&(this.tfm.zOrigin=s.zOrigin),this.props.indexOf(z)>=0)return;s.svg&&(this.svgo=i.getAttribute("data-svg-origin"),this.props.push(R,r,"")),t=z}(o||r)&&this.props.push(t,r,o[t])},B=function(e){e.translate&&(e.removeProperty("translate"),e.removeProperty("scale"),e.removeProperty("rotate"))},L=function(){var e,t,r=this.props,n=this.target,i=n.style,o=n._gsap;for(e=0;e<r.length;e+=3)r[e+1]?2===r[e+1]?n[r[e]](r[e+2]):n[r[e]]=r[e+2]:r[e+2]?i[r[e]]=r[e+2]:i.removeProperty("--"===r[e].substr(0,2)?r[e]:r[e].replace(m,"-$1").toLowerCase());if(this.tfm){for(t in this.tfm)o[t]=this.tfm[t];o.svg&&(o.renderTransform(),n.setAttribute("data-svg-origin",this.svgo||"")),(e=l())&&e.isStart||i[z]||(B(i),o.zOrigin&&i[R]&&(i[R]+=" "+o.zOrigin+"px",o.zOrigin=0,o.renderTransform()),o.uncache=1)}},F=function(e,t){var r={target:e,props:[],revert:L,save:M};return e._gsap||u.os.core.getCache(e),t&&e.style&&e.nodeType&&t.split(",").forEach(function(e){return r.save(e)}),r},k=function(e,t){var r=n.createElementNS?n.createElementNS((t||"http://www.w3.org/1999/xhtml").replace(/^https/,"http"),e):n.createElement(e);return r&&r.style?r:n.createElement(e)},U=function e(t,r,n){var i=getComputedStyle(t);return i[r]||i.getPropertyValue(r.replace(m,"-$1").toLowerCase())||i.getPropertyValue(r)||!n&&e(t,I(r)||r,1)||""},j="O,Moz,ms,Ms,Webkit".split(","),I=function(e,t,r){var n=(t||s).style,i=5;if(e in n&&!r)return e;for(e=e.charAt(0).toUpperCase()+e.substr(1);i--&&!(j[i]+e in n););return i<0?null:(3===i?"ms":i>=0?j[i]:"")+e},N=function(){"undefined"!=typeof window&&window.document&&(i=(n=window.document).documentElement,s=k("div")||{style:{}},k("div"),R=(z=I(z))+"Origin",s.style.cssText="border-width:0;line-height:0;position:absolute;padding:0",c=!!I("perspective"),l=u.os.core.reverting,o=1)},H=function(e){var t,r=e.ownerSVGElement,n=k("svg",r&&r.getAttribute("xmlns")||"http://www.w3.org/2000/svg"),o=e.cloneNode(!0);o.style.display="block",n.appendChild(o),i.appendChild(n);try{t=o.getBBox()}catch(e){}return n.removeChild(o),i.removeChild(n),t},Y=function(e,t){for(var r=t.length;r--;)if(e.hasAttribute(t[r]))return e.getAttribute(t[r])},V=function(e){var t,r;try{t=e.getBBox()}catch(n){t=H(e),r=1}return t&&(t.width||t.height)||r||(t=H(e)),!t||t.width||t.x||t.y?t:{x:+Y(e,["x","cx","x1"])||0,y:+Y(e,["y","cy","y1"])||0,width:0,height:0}},X=function(e){return!!(e.getCTM&&(!e.parentNode||e.ownerSVGElement)&&V(e))},Z=function(e,t){if(t){var r,n=e.style;t in d&&t!==R&&(t=z),n.removeProperty?(("ms"===(r=t.substr(0,2))||"webkit"===t.substr(0,6))&&(t="-"+t),n.removeProperty("--"===r?t:t.replace(m,"-$1").toLowerCase())):n.removeAttribute(t)}},q=function(e,t,r,n,i,o){var s=new u.J7(e._pt,t,r,0,1,o?T:E);return e._pt=s,s.b=n,s.e=i,e._props.push(r),s},G={deg:1,rad:1,turn:1},W={grid:1,flex:1},K=function e(t,r,i,o){var a,l,c,h,f=parseFloat(i)||0,p=(i+"").trim().substr((f+"").length)||"px",m=s.style,v=g.test(r),_="svg"===t.tagName.toLowerCase(),y=(_?"client":"offset")+(v?"Width":"Height"),C="px"===o,x="%"===o;if(o===p||!f||G[o]||G[p])return f;if("px"===p||C||(f=e(t,r,i,"px")),h=t.getCTM&&X(t),(x||"%"===p)&&(d[r]||~r.indexOf("adius")))return a=h?t.getBBox()[v?"width":"height"]:t[y],(0,u.E_)(x?f/a*100:f/100*a);if(m[v?"width":"height"]=100+(C?p:o),l="rem"!==o&&~r.indexOf("adius")||"em"===o&&t.appendChild&&!_?t:t.parentNode,h&&(l=(t.ownerSVGElement||{}).parentNode),l&&l!==n&&l.appendChild||(l=n.body),(c=l._gsap)&&x&&c.width&&v&&c.time===u.au.time&&!c.uncache)return(0,u.E_)(f/c.width*100);if(x&&("height"===r||"width"===r)){var b=t.style[r];t.style[r]=100+o,a=t[y],b?t.style[r]=b:Z(t,r)}else(x||"%"===p)&&!W[U(l,"display")]&&(m.position=U(t,"position")),l===t&&(m.position="static"),l.appendChild(s),a=s[y],l.removeChild(s),m.position="absolute";return v&&x&&((c=(0,u.a0)(l)).time=u.au.time,c.width=l[y]),(0,u.E_)(C?a*f/100:a&&f?100/a*f:0)},Q=function(e,t,r,n){var i;return o||N(),t in _&&"transform"!==t&&~(t=_[t]).indexOf(",")&&(t=t.split(",")[0]),d[t]&&"transform"!==t?(i=ec(e,n),i="transformOrigin"!==t?i[t]:i.svg?i.origin:eu(U(e,R))+" "+i.zOrigin+"px"):(!(i=e.style[t])||"auto"===i||n||~(i+"").indexOf("calc("))&&(i=er[t]&&er[t](e,t,r)||U(e,t)||(0,u.n)(e,t)||+("opacity"===t)),r&&!~(i+"").trim().indexOf(" ")?K(e,t,i,r)+r:i},$=function(e,t,r,n){if(!r||"none"===r){var i=I(t,e,1),o=i&&U(e,i,1);o&&o!==r?(t=i,r=o):"borderColor"===t&&(r=U(e,"borderTopColor"))}var s,a,l,c,d,h,f,p,m,g,v,_=new u.J7(this._pt,e.style,t,0,1,u.l1),y=0,C=0;if(_.b=r,_.e=n,r+="","var(--"===(n+="").substring(0,6)&&(n=U(e,n.substring(4,n.indexOf(")")))),"auto"===n&&(h=e.style[t],e.style[t]=n,n=U(e,t)||n,h?e.style[t]=h:Z(e,t)),s=[r,n],(0,u.Uc)(s),r=s[0],n=s[1],l=r.match(u.vM)||[],(n.match(u.vM)||[]).length){for(;a=u.vM.exec(n);)f=a[0],m=n.substring(y,a.index),d?d=(d+1)%5:("rgba("===m.substr(-5)||"hsla("===m.substr(-5))&&(d=1),f!==(h=l[C++]||"")&&(c=parseFloat(h)||0,v=h.substr((c+"").length),"="===f.charAt(1)&&(f=(0,u.B0)(c,f)+v),p=parseFloat(f),g=f.substr((p+"").length),y=u.vM.lastIndex-g.length,g||(g=g||u.Yz.units[t]||v,y===n.length&&(n+=g,_.e+=g)),v!==g&&(c=K(e,t,h,g)||0),_._pt={_next:_._pt,p:m||1===C?m:",",s:c,c:p-c,m:d&&d<4||"zIndex"===t?Math.round:0});_.c=y<n.length?n.substring(y,n.length):""}else _.r="display"===t&&"none"===n?T:E;return u.Ks.test(n)&&(_.e=0),this._pt=_,_},J={top:"0%",bottom:"100%",left:"0%",right:"100%",center:"50%"},ee=function(e){var t=e.split(" "),r=t[0],n=t[1]||"50%";return("top"===r||"bottom"===r||"left"===n||"right"===n)&&(e=r,r=n,n=e),t[0]=J[r]||r,t[1]=J[n]||n,t.join(" ")},et=function(e,t){if(t.tween&&t.tween._time===t.tween._dur){var r,n,i,o=t.t,s=o.style,a=t.u,l=o._gsap;if("all"===a||!0===a)s.cssText="",n=1;else for(i=(a=a.split(",")).length;--i>-1;)d[r=a[i]]&&(n=1,r="transformOrigin"===r?R:z),Z(o,r);n&&(Z(o,z),l&&(l.svg&&o.removeAttribute("transform"),s.scale=s.rotate=s.translate="none",ec(o,1),l.uncache=1,B(s)))}},er={clearProps:function(e,t,r,n,i){if("isFromStart"!==i.data){var o=e._pt=new u.J7(e._pt,t,r,0,0,et);return o.u=n,o.pr=-10,o.tween=i,e._props.push(r),1}}},en=[1,0,0,1,0,0],ei={},eo=function(e){return"matrix(1, 0, 0, 1, 0, 0)"===e||"none"===e||!e},es=function(e){var t=U(e,z);return eo(t)?en:t.substr(7).match(u.vX).map(u.E_)},ea=function(e,t){var r,n,o,s,a=e._gsap||(0,u.a0)(e),l=e.style,c=es(e);return a.svg&&e.getAttribute("transform")?"1,0,0,1,0,0"===(c=[(o=e.transform.baseVal.consolidate().matrix).a,o.b,o.c,o.d,o.e,o.f]).join(",")?en:c:(c!==en||e.offsetParent||e===i||a.svg||(o=l.display,l.display="block",(r=e.parentNode)&&(e.offsetParent||e.getBoundingClientRect().width)||(s=1,n=e.nextElementSibling,i.appendChild(e)),c=es(e),o?l.display=o:Z(e,"display"),s&&(n?r.insertBefore(e,n):r?r.appendChild(e):i.removeChild(e))),t&&c.length>6?[c[0],c[1],c[4],c[5],c[12],c[13]]:c)},el=function(e,t,r,n,i,o){var s,a,l,c,u=e._gsap,d=i||ea(e,!0),h=u.xOrigin||0,f=u.yOrigin||0,p=u.xOffset||0,m=u.yOffset||0,g=d[0],v=d[1],_=d[2],y=d[3],C=d[4],x=d[5],b=t.split(" "),E=parseFloat(b[0])||0,T=parseFloat(b[1])||0;r?d!==en&&(a=g*y-v*_)&&(l=y/a*E+-_/a*T+(_*x-y*C)/a,c=-v/a*E+g/a*T-(g*x-v*C)/a,E=l,T=c):(E=(s=V(e)).x+(~b[0].indexOf("%")?E/100*s.width:E),T=s.y+(~(b[1]||b[0]).indexOf("%")?T/100*s.height:T)),n||!1!==n&&u.smooth?(u.xOffset=p+((C=E-h)*g+(x=T-f)*_)-C,u.yOffset=m+(C*v+x*y)-x):u.xOffset=u.yOffset=0,u.xOrigin=E,u.yOrigin=T,u.smooth=!!n,u.origin=t,u.originIsAbsolute=!!r,e.style[R]="0px 0px",o&&(q(o,u,"xOrigin",h,E),q(o,u,"yOrigin",f,T),q(o,u,"xOffset",p,u.xOffset),q(o,u,"yOffset",m,u.yOffset)),e.setAttribute("data-svg-origin",E+" "+T)},ec=function(e,t){var r=e._gsap||new u.n6(e);if("x"in r&&!t&&!r.uncache)return r;var n,i,o,s,a,l,d,m,g,v,_,y,C,x,b,E,T,w,O,S,A,P,D,M,B,L,F,k,j,I,N,H,Y=e.style,V=r.scaleX<0,Z=getComputedStyle(e),q=U(e,R)||"0";return n=i=o=l=d=m=g=v=_=0,s=a=1,r.svg=!!(e.getCTM&&X(e)),Z.translate&&(("none"!==Z.translate||"none"!==Z.scale||"none"!==Z.rotate)&&(Y[z]=("none"!==Z.translate?"translate3d("+(Z.translate+" 0 0").split(" ").slice(0,3).join(", ")+") ":"")+("none"!==Z.rotate?"rotate("+Z.rotate+") ":"")+("none"!==Z.scale?"scale("+Z.scale.split(" ").join(",")+") ":"")+("none"!==Z[z]?Z[z]:"")),Y.scale=Y.rotate=Y.translate="none"),x=ea(e,r.svg),r.svg&&(r.uncache?(B=e.getBBox(),q=r.xOrigin-B.x+"px "+(r.yOrigin-B.y)+"px",M=""):M=!t&&e.getAttribute("data-svg-origin"),el(e,M||q,!!M||r.originIsAbsolute,!1!==r.smooth,x)),y=r.xOrigin||0,C=r.yOrigin||0,x!==en&&(w=x[0],O=x[1],S=x[2],A=x[3],n=P=x[4],i=D=x[5],6===x.length?(s=Math.sqrt(w*w+O*O),a=Math.sqrt(A*A+S*S),l=w||O?p(O,w)*h:0,(g=S||A?p(S,A)*h+l:0)&&(a*=Math.abs(Math.cos(g*f))),r.svg&&(n-=y-(y*w+C*S),i-=C-(y*O+C*A))):(H=x[6],I=x[7],F=x[8],k=x[9],j=x[10],N=x[11],n=x[12],i=x[13],o=x[14],d=(b=p(H,j))*h,b&&(M=P*(E=Math.cos(-b))+F*(T=Math.sin(-b)),B=D*E+k*T,L=H*E+j*T,F=-(P*T)+F*E,k=-(D*T)+k*E,j=-(H*T)+j*E,N=-(I*T)+N*E,P=M,D=B,H=L),m=(b=p(-S,j))*h,b&&(M=w*(E=Math.cos(-b))-F*(T=Math.sin(-b)),B=O*E-k*T,L=S*E-j*T,N=A*T+N*E,w=M,O=B,S=L),l=(b=p(O,w))*h,b&&(M=w*(E=Math.cos(b))+O*(T=Math.sin(b)),B=P*E+D*T,O=O*E-w*T,D=D*E-P*T,w=M,P=B),d&&Math.abs(d)+Math.abs(l)>359.9&&(d=l=0,m=180-m),s=(0,u.E_)(Math.sqrt(w*w+O*O+S*S)),a=(0,u.E_)(Math.sqrt(D*D+H*H)),g=Math.abs(b=p(P,D))>2e-4?b*h:0,_=N?1/(N<0?-N:N):0),r.svg&&(M=e.getAttribute("transform"),r.forceCSS=e.setAttribute("transform","")||!eo(U(e,z)),M&&e.setAttribute("transform",M))),Math.abs(g)>90&&270>Math.abs(g)&&(V?(s*=-1,g+=l<=0?180:-180,l+=l<=0?180:-180):(a*=-1,g+=g<=0?180:-180)),t=t||r.uncache,r.x=n-((r.xPercent=n&&(!t&&r.xPercent||(Math.round(e.offsetWidth/2)===Math.round(-n)?-50:0)))?e.offsetWidth*r.xPercent/100:0)+"px",r.y=i-((r.yPercent=i&&(!t&&r.yPercent||(Math.round(e.offsetHeight/2)===Math.round(-i)?-50:0)))?e.offsetHeight*r.yPercent/100:0)+"px",r.z=o+"px",r.scaleX=(0,u.E_)(s),r.scaleY=(0,u.E_)(a),r.rotation=(0,u.E_)(l)+"deg",r.rotationX=(0,u.E_)(d)+"deg",r.rotationY=(0,u.E_)(m)+"deg",r.skewX=g+"deg",r.skewY=v+"deg",r.transformPerspective=_+"px",(r.zOrigin=parseFloat(q.split(" ")[2])||!t&&r.zOrigin||0)&&(Y[R]=eu(q)),r.xOffset=r.yOffset=0,r.force3D=u.Yz.force3D,r.renderTransform=r.svg?em:c?ep:eh,r.uncache=0,r},eu=function(e){return(e=e.split(" "))[0]+" "+e[1]},ed=function(e,t,r){var n=(0,u.l_)(t);return(0,u.E_)(parseFloat(t)+parseFloat(K(e,"x",r+"px",n)))+n},eh=function(e,t){t.z="0px",t.rotationY=t.rotationX="0deg",t.force3D=0,ep(e,t)},ef="0deg",ep=function(e,t){var r=t||this,n=r.xPercent,i=r.yPercent,o=r.x,s=r.y,a=r.z,l=r.rotation,c=r.rotationY,u=r.rotationX,d=r.skewX,h=r.skewY,p=r.scaleX,m=r.scaleY,g=r.transformPerspective,v=r.force3D,_=r.target,y=r.zOrigin,C="",x="auto"===v&&e&&1!==e||!0===v;if(y&&(u!==ef||c!==ef)){var b,E=parseFloat(c)*f,T=Math.sin(E),w=Math.cos(E);o=ed(_,o,-(T*(b=Math.cos(E=parseFloat(u)*f))*y)),s=ed(_,s,-(-Math.sin(E)*y)),a=ed(_,a,-(w*b*y)+y)}"0px"!==g&&(C+="perspective("+g+") "),(n||i)&&(C+="translate("+n+"%, "+i+"%) "),(x||"0px"!==o||"0px"!==s||"0px"!==a)&&(C+="0px"!==a||x?"translate3d("+o+", "+s+", "+a+") ":"translate("+o+", "+s+") "),l!==ef&&(C+="rotate("+l+") "),c!==ef&&(C+="rotateY("+c+") "),u!==ef&&(C+="rotateX("+u+") "),(d!==ef||h!==ef)&&(C+="skew("+d+", "+h+") "),(1!==p||1!==m)&&(C+="scale("+p+", "+m+") "),_.style[z]=C||"translate(0, 0)"},em=function(e,t){var r,n,i,o,s,a=t||this,l=a.xPercent,c=a.yPercent,d=a.x,h=a.y,p=a.rotation,m=a.skewX,g=a.skewY,v=a.scaleX,_=a.scaleY,y=a.target,C=a.xOrigin,x=a.yOrigin,b=a.xOffset,E=a.yOffset,T=a.forceCSS,w=parseFloat(d),O=parseFloat(h);p=parseFloat(p),m=parseFloat(m),(g=parseFloat(g))&&(m+=g=parseFloat(g),p+=g),p||m?(p*=f,m*=f,r=Math.cos(p)*v,n=Math.sin(p)*v,i=-(Math.sin(p-m)*_),o=Math.cos(p-m)*_,m&&(g*=f,i*=s=Math.sqrt(1+(s=Math.tan(m-g))*s),o*=s,g&&(r*=s=Math.sqrt(1+(s=Math.tan(g))*s),n*=s)),r=(0,u.E_)(r),n=(0,u.E_)(n),i=(0,u.E_)(i),o=(0,u.E_)(o)):(r=v,o=_,n=i=0),(w&&!~(d+"").indexOf("px")||O&&!~(h+"").indexOf("px"))&&(w=K(y,"x",d,"px"),O=K(y,"y",h,"px")),(C||x||b||E)&&(w=(0,u.E_)(w+C-(C*r+x*i)+b),O=(0,u.E_)(O+x-(C*n+x*o)+E)),(l||c)&&(s=y.getBBox(),w=(0,u.E_)(w+l/100*s.width),O=(0,u.E_)(O+c/100*s.height)),s="matrix("+r+","+n+","+i+","+o+","+w+","+O+")",y.setAttribute("transform",s),T&&(y.style[z]=s)},eg=function(e,t,r,n,i){var o,s,a=(0,u.vQ)(i),l=parseFloat(i)*(a&&~i.indexOf("rad")?h:1)-n,c=n+l+"deg";return a&&("short"===(o=i.split("_")[1])&&(l%=360)!=l%180&&(l+=l<0?360:-360),"cw"===o&&l<0?l=(l+36e9)%360-360*~~(l/360):"ccw"===o&&l>0&&(l=(l-36e9)%360-360*~~(l/360))),e._pt=s=new u.J7(e._pt,t,r,n,l,C),s.e=c,s.u="deg",e._props.push(r),s},ev=function(e,t){for(var r in t)e[r]=t[r];return e},e_=function(e,t,r){var n,i,o,s,a,l,c,h=ev({},r._gsap),f=r.style;for(i in h.svg?(o=r.getAttribute("transform"),r.setAttribute("transform",""),f[z]=t,n=ec(r,1),Z(r,z),r.setAttribute("transform",o)):(o=getComputedStyle(r)[z],f[z]=t,n=ec(r,1),f[z]=o),d)(o=h[i])!==(s=n[i])&&0>"perspective,force3D,transformOrigin,svgOrigin".indexOf(i)&&(a=(0,u.l_)(o)!==(c=(0,u.l_)(s))?K(r,i,o,c):parseFloat(o),l=parseFloat(s),e._pt=new u.J7(e._pt,n,i,a,l-a,y),e._pt.u=c||0,e._props.push(i));ev(n,h)};(0,u.fA)("padding,margin,Width,Radius",function(e,t){var r="Right",n="Bottom",i="Left",o=(t<3?["Top",r,n,i]:["Top"+i,"Top"+r,n+r,n+i]).map(function(r){return t<2?e+r:"border"+r+e});er[t>1?"border"+e:e]=function(e,t,r,n,i){var s,a;if(arguments.length<4)return 5===(a=(s=o.map(function(t){return Q(e,t,r)})).join(" ")).split(s[0]).length?s[0]:a;s=(n+"").split(" "),a={},o.forEach(function(e,t){return a[e]=s[t]=s[t]||s[(t-1)/2|0]}),e.init(t,a,i)}});var ey={name:"css",register:N,targetTest:function(e){return e.style&&e.nodeType},init:function(e,t,r,n,i){var s,a,l,c,h,f,p,m,g,C,E,T,w,O,S,A,P=this._props,D=e.style,M=r.vars.startAt;for(p in o||N(),this.styles=this.styles||F(e),A=this.styles.props,this.tween=r,t)if("autoRound"!==p&&(a=t[p],!(u.wU[p]&&(0,u.Zm)(p,t,r,n,e,i)))){if(h=typeof a,f=er[p],"function"===h&&(h=typeof(a=a.call(r,n,e,i))),"string"===h&&~a.indexOf("random(")&&(a=(0,u.Vy)(a)),f)f(this,e,p,a,r)&&(S=1);else if("--"===p.substr(0,2))s=(getComputedStyle(e).getPropertyValue(p)+"").trim(),a+="",u.qA.lastIndex=0,u.qA.test(s)||(m=(0,u.l_)(s),g=(0,u.l_)(a)),g?m!==g&&(s=K(e,p,s,g)+g):m&&(a+=m),this.add(D,"setProperty",s,a,n,i,0,0,p),P.push(p),A.push(p,0,D[p]);else if("undefined"!==h){if(M&&p in M?(s="function"==typeof M[p]?M[p].call(r,n,e,i):M[p],(0,u.vQ)(s)&&~s.indexOf("random(")&&(s=(0,u.Vy)(s)),(0,u.l_)(s+"")||"auto"===s||(s+=u.Yz.units[p]||(0,u.l_)(Q(e,p))||""),"="===(s+"").charAt(1)&&(s=Q(e,p))):s=Q(e,p),c=parseFloat(s),(C="string"===h&&"="===a.charAt(1)&&a.substr(0,2))&&(a=a.substr(2)),l=parseFloat(a),p in _&&("autoAlpha"===p&&(1===c&&"hidden"===Q(e,"visibility")&&l&&(c=0),A.push("visibility",0,D.visibility),q(this,D,"visibility",c?"inherit":"hidden",l?"inherit":"hidden",!l)),"scale"!==p&&"transform"!==p&&~(p=_[p]).indexOf(",")&&(p=p.split(",")[0])),E=p in d){if(this.styles.save(p),"string"===h&&"var(--"===a.substring(0,6)&&(l=parseFloat(a=U(e,a.substring(4,a.indexOf(")"))))),T||((w=e._gsap).renderTransform&&!t.parseTransform||ec(e,t.parseTransform),O=!1!==t.smoothOrigin&&w.smooth,(T=this._pt=new u.J7(this._pt,D,z,0,1,w.renderTransform,w,0,-1)).dep=1),"scale"===p)this._pt=new u.J7(this._pt,w,"scaleY",w.scaleY,(C?(0,u.B0)(w.scaleY,C+l):l)-w.scaleY||0,y),this._pt.u=0,P.push("scaleY",p),p+="X";else if("transformOrigin"===p){A.push(R,0,D[R]),a=ee(a),w.svg?el(e,a,0,O,0,this):((g=parseFloat(a.split(" ")[2])||0)!==w.zOrigin&&q(this,w,"zOrigin",w.zOrigin,g),q(this,D,p,eu(s),eu(a)));continue}else if("svgOrigin"===p){el(e,a,1,O,0,this);continue}else if(p in ei){eg(this,w,p,c,C?(0,u.B0)(c,C+a):a);continue}else if("smoothOrigin"===p){q(this,w,"smooth",w.smooth,a);continue}else if("force3D"===p){w[p]=a;continue}else if("transform"===p){e_(this,a,e);continue}}else p in D||(p=I(p)||p);if(E||(l||0===l)&&(c||0===c)&&!v.test(a)&&p in D)m=(s+"").substr((c+"").length),l||(l=0),g=(0,u.l_)(a)||(p in u.Yz.units?u.Yz.units[p]:m),m!==g&&(c=K(e,p,s,g)),this._pt=new u.J7(this._pt,E?w:D,p,c,(C?(0,u.B0)(c,C+l):l)-c,!E&&("px"===g||"zIndex"===p)&&!1!==t.autoRound?b:y),this._pt.u=g||0,m!==g&&"%"!==g&&(this._pt.b=s,this._pt.r=x);else if(p in D)$.call(this,e,p,s,C?C+a:a);else if(p in e)this.add(e,p,s||e[p],C?C+a:a,n,i);else if("parseTransform"!==p){(0,u.dg)(p,a);continue}E||(p in D?A.push(p,0,D[p]):"function"==typeof e[p]?A.push(p,2,e[p]()):A.push(p,1,s||e[p])),P.push(p)}}S&&(0,u.St)(this)},render:function(e,t){if(t.tween._time||!l())for(var r=t._pt;r;)r.r(e,r.d),r=r._next;else t.styles.revert()},get:Q,aliases:_,getSetter:function(e,t,r){var n=_[t];return n&&0>n.indexOf(",")&&(t=n),t in d&&t!==R&&(e._gsap.x||Q(e,"x"))?r&&a===r?"scale"===t?A:S:(a=r||{},"scale"===t?P:D):e.style&&!(0,u.OF)(e.style[t])?w:~t.indexOf("-")?O:(0,u.Dx)(e,t)},core:{_removeProperty:Z,_getMatrix:ea}};u.os.utils.checkPrefix=I,u.os.core.getStyleSaver=F,function(e,t,r,n){var i=(0,u.fA)(e+","+t+","+r,function(e){d[e]=1});(0,u.fA)(t,function(e){u.Yz.units[e]="deg",ei[e]=1}),_[i[13]]=e+","+t,(0,u.fA)(n,function(e){var t=e.split(":");_[t[1]]=i[t[0]]})}("x,y,z,scale,scaleX,scaleY,xPercent,yPercent","rotation,rotationX,rotationY,skewX,skewY","transform,transformOrigin,svgOrigin,force3D,smoothOrigin,transformPerspective","0:translateX,1:translateY,2:translateZ,8:rotate,8:rotationZ,8:rotateZ,9:rotateX,10:rotateY"),(0,u.fA)("x,y,z,top,right,bottom,left,width,height,fontSize,padding,margin,perspective",function(e){u.Yz.units[e]="px"}),u.os.registerPlugin(ey);var eC=u.os.registerPlugin(ey)||u.os;eC.core.Tween},901:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"RouterContext",{enumerable:!0,get:function(){return n}});let n=r(8229)._(r(2115)).default.createContext(null)},1193:(e,t)=>{function r(e){var t;let{config:r,src:n,width:i,quality:o}=e,s=o||(null==(t=r.qualities)?void 0:t.reduce((e,t)=>Math.abs(t-75)<Math.abs(e-75)?t:e))||75;return r.path+"?url="+encodeURIComponent(n)+"&w="+i+"&q="+s+(n.startsWith("/_next/static/media/"),"")}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n}}),r.__next_img_default=!0;let n=r},1469:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return l},getImageProps:function(){return a}});let n=r(8229),i=r(8883),o=r(3063),s=n._(r(1193));function a(e){let{props:t}=(0,i.getImgProps)(e,{defaultLoader:s.default,imgConf:{deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1}});for(let[e,r]of Object.entries(t))void 0===r&&delete t[e];return{props:t}}let l=o.Image},1892:(e,t,r)=>{r.d(t,{a:()=>g,b:()=>v});var n=r(2115),i=r(491),o=r(2344),s=r(3816),a=r(7431);function l(e,t){let r;return(...n)=>{window.clearTimeout(r),r=window.setTimeout(()=>e(...n),t)}}let c=["x","y","top","bottom","left","right","width","height"],u=(e,t)=>c.every(r=>e[r]===t[r]);var d=r(6354),h=r(5155);function f({ref:e,children:t,fallback:r,resize:i,style:o,gl:c,events:d=s.f,eventSource:f,eventPrefix:p,shadows:m,linear:g,flat:v,legacy:_,orthographic:y,frameloop:C,dpr:x,performance:b,raycaster:E,camera:T,scene:w,onPointerMissed:O,onCreated:S,...A}){n.useMemo(()=>(0,s.e)(a),[]);let P=(0,s.u)(),[D,z]=function({debounce:e,scroll:t,polyfill:r,offsetSize:i}={debounce:0,scroll:!1,offsetSize:!1}){var o,s,a;let c=r||("undefined"==typeof window?class{}:window.ResizeObserver);if(!c)throw Error("This browser does not support ResizeObserver out of the box. See: https://github.com/react-spring/react-use-measure/#resize-observer-polyfills");let[d,h]=(0,n.useState)({left:0,top:0,width:0,height:0,bottom:0,right:0,x:0,y:0}),f=(0,n.useRef)({element:null,scrollContainers:null,resizeObserver:null,lastBounds:d,orientationHandler:null}),p=e?"number"==typeof e?e:e.scroll:null,m=e?"number"==typeof e?e:e.resize:null,g=(0,n.useRef)(!1);(0,n.useEffect)(()=>(g.current=!0,()=>void(g.current=!1)));let[v,_,y]=(0,n.useMemo)(()=>{let e=()=>{if(!f.current.element)return;let{left:e,top:t,width:r,height:n,bottom:o,right:s,x:a,y:l}=f.current.element.getBoundingClientRect(),c={left:e,top:t,width:r,height:n,bottom:o,right:s,x:a,y:l};f.current.element instanceof HTMLElement&&i&&(c.height=f.current.element.offsetHeight,c.width=f.current.element.offsetWidth),Object.freeze(c),g.current&&!u(f.current.lastBounds,c)&&h(f.current.lastBounds=c)};return[e,m?l(e,m):e,p?l(e,p):e]},[h,i,p,m]);function C(){f.current.scrollContainers&&(f.current.scrollContainers.forEach(e=>e.removeEventListener("scroll",y,!0)),f.current.scrollContainers=null),f.current.resizeObserver&&(f.current.resizeObserver.disconnect(),f.current.resizeObserver=null),f.current.orientationHandler&&("orientation"in screen&&"removeEventListener"in screen.orientation?screen.orientation.removeEventListener("change",f.current.orientationHandler):"onorientationchange"in window&&window.removeEventListener("orientationchange",f.current.orientationHandler))}function x(){f.current.element&&(f.current.resizeObserver=new c(y),f.current.resizeObserver.observe(f.current.element),t&&f.current.scrollContainers&&f.current.scrollContainers.forEach(e=>e.addEventListener("scroll",y,{capture:!0,passive:!0})),f.current.orientationHandler=()=>{y()},"orientation"in screen&&"addEventListener"in screen.orientation?screen.orientation.addEventListener("change",f.current.orientationHandler):"onorientationchange"in window&&window.addEventListener("orientationchange",f.current.orientationHandler))}return o=y,s=!!t,(0,n.useEffect)(()=>{if(s)return window.addEventListener("scroll",o,{capture:!0,passive:!0}),()=>void window.removeEventListener("scroll",o,!0)},[o,s]),a=_,(0,n.useEffect)(()=>(window.addEventListener("resize",a),()=>void window.removeEventListener("resize",a)),[a]),(0,n.useEffect)(()=>{C(),x()},[t,y,_]),(0,n.useEffect)(()=>C,[]),[e=>{e&&e!==f.current.element&&(C(),f.current.element=e,f.current.scrollContainers=function e(t){let r=[];if(!t||t===document.body)return r;let{overflow:n,overflowX:i,overflowY:o}=window.getComputedStyle(t);return[n,i,o].some(e=>"auto"===e||"scroll"===e)&&r.push(t),[...r,...e(t.parentElement)]}(e),x())},d,v]}({scroll:!0,debounce:{scroll:50,resize:0},...i}),R=n.useRef(null),M=n.useRef(null);n.useImperativeHandle(e,()=>R.current);let B=(0,s.a)(O),[L,F]=n.useState(!1),[k,U]=n.useState(!1);if(L)throw L;if(k)throw k;let j=n.useRef(null);(0,s.b)(()=>{let e=R.current;z.width>0&&z.height>0&&e&&(j.current||(j.current=(0,s.c)(e)),async function(){await j.current.configure({gl:c,scene:w,events:d,shadows:m,linear:g,flat:v,legacy:_,orthographic:y,frameloop:C,dpr:x,performance:b,raycaster:E,camera:T,size:z,onPointerMissed:(...e)=>null==B.current?void 0:B.current(...e),onCreated:e=>{null==e.events.connect||e.events.connect(f?(0,s.i)(f)?f.current:f:M.current),p&&e.setEvents({compute:(e,t)=>{let r=e[p+"X"],n=e[p+"Y"];t.pointer.set(r/t.size.width*2-1,-(2*(n/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)}}),null==S||S(e)}}),j.current.render((0,h.jsx)(P,{children:(0,h.jsx)(s.E,{set:U,children:(0,h.jsx)(n.Suspense,{fallback:(0,h.jsx)(s.B,{set:F}),children:null!=t?t:null})})}))}())}),n.useEffect(()=>{let e=R.current;if(e)return()=>(0,s.d)(e)},[]);let I=f?"none":"auto";return(0,h.jsx)("div",{ref:M,style:{position:"relative",width:"100%",height:"100%",overflow:"hidden",pointerEvents:I,...o},...A,children:(0,h.jsx)("div",{ref:D,style:{width:"100%",height:"100%"},children:(0,h.jsx)("canvas",{ref:R,style:{display:"block"},children:r})})})}function p(e){return(0,h.jsx)(d.Af,{children:(0,h.jsx)(f,{...e})})}r(1933),r(5220),r(2407);var m=(0,n.createContext)({}),g=()=>(0,n.useContext)(m);function v({children:e,style:t={},pixelDensity:r=1,fov:s=45,pointerEvents:l,className:c,envBasePath:u,lazyLoad:d=!0,threshold:f=.1}){let{isInView:g,containerRef:v}=function(e=!0,t=.1){let[r,i]=(0,n.useState)(!0),o=(0,n.useRef)(null);return(0,n.useEffect)(()=>{if(!e)return;let r=new IntersectionObserver(([e])=>{i(e.isIntersecting)},{threshold:t});return o.current&&r.observe(o.current),()=>r.disconnect()},[e,t]),{isInView:r,containerRef:o}}(d,f),_=(0,n.useMemo)(()=>({envBasePath:u||i.m}),[u]);return(0,n.useEffect)(()=>{a.ShaderChunk.uv2_pars_vertex="",a.ShaderChunk.uv2_vertex="",a.ShaderChunk.uv2_pars_fragment="",a.ShaderChunk.encodings_fragment=""},[]),(0,h.jsx)("div",{ref:v,style:(0,o.a)({width:"100%",height:"100%"},t),children:(!d||g)&&(0,h.jsx)(m.Provider,{value:_,children:(0,h.jsx)(p,(0,o.b)((0,o.a)({style:{pointerEvents:l},resize:{offsetSize:!0},className:c},(0,i.a)(r,s)),{children:e}))})})}},1933:(e,t,r)=>{e.exports=r(6500)},2344:(e,t,r)=>{r.d(t,{a:()=>p,b:()=>m,c:()=>g,d:()=>v,f:()=>y});var n=Object.create,i=Object.defineProperty,o=Object.defineProperties,s=Object.getOwnPropertyDescriptor,a=Object.getOwnPropertyDescriptors,l=Object.getOwnPropertyNames,c=Object.getOwnPropertySymbols,u=Object.getPrototypeOf,d=Object.prototype.hasOwnProperty,h=Object.prototype.propertyIsEnumerable,f=(e,t,r)=>t in e?i(e,t,{enumerable:!0,configurable:!0,writable:!0,value:r}):e[t]=r,p=(e,t)=>{for(var r in t||(t={}))d.call(t,r)&&f(e,r,t[r]);if(c)for(var r of c(t))h.call(t,r)&&f(e,r,t[r]);return e},m=(e,t)=>o(e,a(t)),g=(e,t)=>{var r={};for(var n in e)d.call(e,n)&&0>t.indexOf(n)&&(r[n]=e[n]);if(null!=e&&c)for(var n of c(e))0>t.indexOf(n)&&h.call(e,n)&&(r[n]=e[n]);return r},v=(e,t)=>()=>(t||e((t={exports:{}}).exports,t),t.exports),_=(e,t,r,n)=>{if(t&&"object"==typeof t||"function"==typeof t)for(let o of l(t))d.call(e,o)||o===r||i(e,o,{get:()=>t[o],enumerable:!(n=s(t,o))||n.enumerable});return e},y=(e,t,r)=>(r=null!=e?n(u(e)):{},_(!t&&e&&e.__esModule?r:i(r,"default",{value:e,enumerable:!0}),e))},2407:(e,t,r)=>{e.exports=r(6892)},2436:(e,t,r)=>{var n=r(2115),i="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},o=n.useState,s=n.useEffect,a=n.useLayoutEffect,l=n.useDebugValue;function c(e){var t=e.getSnapshot;e=e.value;try{var r=t();return!i(e,r)}catch(e){return!0}}var u="undefined"==typeof window||void 0===window.document||void 0===window.document.createElement?function(e,t){return t()}:function(e,t){var r=t(),n=o({inst:{value:r,getSnapshot:t}}),i=n[0].inst,u=n[1];return a(function(){i.value=r,i.getSnapshot=t,c(i)&&u({inst:i})},[e,r,t]),s(function(){return c(i)&&u({inst:i}),e(function(){c(i)&&u({inst:i})})},[e]),l(r),r};t.useSyncExternalStore=void 0!==n.useSyncExternalStore?n.useSyncExternalStore:u},2464:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"AmpStateContext",{enumerable:!0,get:function(){return n}});let n=r(8229)._(r(2115)).default.createContext({})},3063:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"Image",{enumerable:!0,get:function(){return C}});let n=r(8229),i=r(6966),o=r(5155),s=i._(r(2115)),a=n._(r(7650)),l=n._(r(5564)),c=r(8883),u=r(5840),d=r(6752);r(3230);let h=r(901),f=n._(r(1193)),p=r(6654),m={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",dangerouslyAllowSVG:!1,unoptimized:!1};function g(e,t,r,n,i,o,s){let a=null==e?void 0:e.src;e&&e["data-loaded-src"]!==a&&(e["data-loaded-src"]=a,("decode"in e?e.decode():Promise.resolve()).catch(()=>{}).then(()=>{if(e.parentElement&&e.isConnected){if("empty"!==t&&i(!0),null==r?void 0:r.current){let t=new Event("load");Object.defineProperty(t,"target",{writable:!1,value:e});let n=!1,i=!1;r.current({...t,nativeEvent:t,currentTarget:e,target:e,isDefaultPrevented:()=>n,isPropagationStopped:()=>i,persist:()=>{},preventDefault:()=>{n=!0,t.preventDefault()},stopPropagation:()=>{i=!0,t.stopPropagation()}})}(null==n?void 0:n.current)&&n.current(e)}}))}function v(e){return s.use?{fetchPriority:e}:{fetchpriority:e}}let _=(0,s.forwardRef)((e,t)=>{let{src:r,srcSet:n,sizes:i,height:a,width:l,decoding:c,className:u,style:d,fetchPriority:h,placeholder:f,loading:m,unoptimized:_,fill:y,onLoadRef:C,onLoadingCompleteRef:x,setBlurComplete:b,setShowAltText:E,sizesInput:T,onLoad:w,onError:O,...S}=e,A=(0,s.useCallback)(e=>{e&&(O&&(e.src=e.src),e.complete&&g(e,f,C,x,b,_,T))},[r,f,C,x,b,O,_,T]),P=(0,p.useMergedRef)(t,A);return(0,o.jsx)("img",{...S,...v(h),loading:m,width:l,height:a,decoding:c,"data-nimg":y?"fill":"1",className:u,style:d,sizes:i,srcSet:n,src:r,ref:P,onLoad:e=>{g(e.currentTarget,f,C,x,b,_,T)},onError:e=>{E(!0),"empty"!==f&&b(!0),O&&O(e)}})});function y(e){let{isAppRouter:t,imgAttributes:r}=e,n={as:"image",imageSrcSet:r.srcSet,imageSizes:r.sizes,crossOrigin:r.crossOrigin,referrerPolicy:r.referrerPolicy,...v(r.fetchPriority)};return t&&a.default.preload?(a.default.preload(r.src,n),null):(0,o.jsx)(l.default,{children:(0,o.jsx)("link",{rel:"preload",href:r.srcSet?void 0:r.src,...n},"__nimg-"+r.src+r.srcSet+r.sizes)})}let C=(0,s.forwardRef)((e,t)=>{let r=(0,s.useContext)(h.RouterContext),n=(0,s.useContext)(d.ImageConfigContext),i=(0,s.useMemo)(()=>{var e;let t=m||n||u.imageConfigDefault,r=[...t.deviceSizes,...t.imageSizes].sort((e,t)=>e-t),i=t.deviceSizes.sort((e,t)=>e-t),o=null==(e=t.qualities)?void 0:e.sort((e,t)=>e-t);return{...t,allSizes:r,deviceSizes:i,qualities:o}},[n]),{onLoad:a,onLoadingComplete:l}=e,p=(0,s.useRef)(a);(0,s.useEffect)(()=>{p.current=a},[a]);let g=(0,s.useRef)(l);(0,s.useEffect)(()=>{g.current=l},[l]);let[v,C]=(0,s.useState)(!1),[x,b]=(0,s.useState)(!1),{props:E,meta:T}=(0,c.getImgProps)(e,{defaultLoader:f.default,imgConf:i,blurComplete:v,showAltText:x});return(0,o.jsxs)(o.Fragment,{children:[(0,o.jsx)(_,{...E,unoptimized:T.unoptimized,placeholder:T.placeholder,fill:T.fill,onLoadRef:p,onLoadingCompleteRef:g,setBlurComplete:C,setShowAltText:b,sizesInput:e.sizes,ref:t}),T.priority?(0,o.jsx)(y,{isAppRouter:!r,imgAttributes:E}):null]})});("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},3816:(e,t,r)=>{let n,i,o,s,a;r.d(t,{A:()=>eu,B:()=>j,C:()=>ed,E:()=>I,F:()=>em,a:()=>k,b:()=>F,c:()=>eF,d:()=>eU,e:()=>ex,f:()=>eQ,i:()=>B,u:()=>U});var l=r(3264),c=r(7431),u=r(2115),d=r.t(u,2),h=r(1933),f=r(5643);let p=e=>{let t,r=new Set,n=(e,n)=>{let i="function"==typeof e?e(t):e;if(!Object.is(i,t)){let e=t;t=(null!=n?n:"object"!=typeof i||null===i)?i:Object.assign({},t,i),r.forEach(r=>r(t,e))}},i=()=>t,o={setState:n,getState:i,getInitialState:()=>s,subscribe:e=>(r.add(e),()=>r.delete(e))},s=t=e(n,i,o);return o},m=e=>e?p(e):p,{useSyncExternalStoreWithSelector:g}=f,v=e=>e,_=(e,t)=>{let r=m(e),n=(e,n=t)=>(function(e,t=v,r){let n=g(e.subscribe,e.getState,e.getInitialState,t,r);return u.useDebugValue(n),n})(r,e,n);return Object.assign(n,r),n},y=(e,t)=>e?_(e,t):_;var C=r(5220),x=r.n(C),b=r(2407);let E=e=>"object"==typeof e&&"function"==typeof e.then,T=[];function w(e,t,r=(e,t)=>e===t){if(e===t)return!0;if(!e||!t)return!1;let n=e.length;if(t.length!==n)return!1;for(let i=0;i<n;i++)if(!r(e[i],t[i]))return!1;return!0}function O(e,t=null,r=!1,n={}){for(let i of(null===t&&(t=[e]),T))if(w(t,i.keys,i.equal)){if(r)return;if(Object.prototype.hasOwnProperty.call(i,"error"))throw i.error;if(Object.prototype.hasOwnProperty.call(i,"response"))return n.lifespan&&n.lifespan>0&&(i.timeout&&clearTimeout(i.timeout),i.timeout=setTimeout(i.remove,n.lifespan)),i.response;if(!r)throw i.promise}let i={keys:t,equal:n.equal,remove:()=>{let e=T.indexOf(i);-1!==e&&T.splice(e,1)},promise:(E(e)?e:e(...t)).then(e=>{i.response=e,n.lifespan&&n.lifespan>0&&(i.timeout=setTimeout(i.remove,n.lifespan))}).catch(e=>i.error=e)};if(T.push(i),!r)throw i.promise}let S=(e,t,r)=>O(e,t,!1,r),A=(e,t,r)=>void O(e,t,!0,r),P=e=>{if(void 0===e||0===e.length)T.splice(0,T.length);else{let t=T.find(t=>w(e,t.keys,t.equal));t&&t.remove()}};var D=r(5155),z=r(6354);function R(e){let t=e.root;for(;t.getState().previousRoot;)t=t.getState().previousRoot;return t}r(9509),d.act;let M=e=>e&&e.isOrthographicCamera,B=e=>e&&e.hasOwnProperty("current"),L=e=>null!=e&&("string"==typeof e||"number"==typeof e||e.isColor),F=((e,t)=>"undefined"!=typeof window&&((null==(e=window.document)?void 0:e.createElement)||(null==(t=window.navigator)?void 0:t.product)==="ReactNative"))()?u.useLayoutEffect:u.useEffect;function k(e){let t=u.useRef(e);return F(()=>void(t.current=e),[e]),t}function U(){let e=(0,z.u5)(),t=(0,z.y3)();return u.useMemo(()=>({children:r})=>{let n=(0,z.Nz)(e,!0,e=>e.type===u.StrictMode)?u.StrictMode:u.Fragment;return(0,D.jsx)(n,{children:(0,D.jsx)(t,{children:r})})},[e,t])}function j({set:e}){return F(()=>(e(new Promise(()=>null)),()=>e(!1)),[e]),null}let I=(e=>((e=class extends u.Component{constructor(...e){super(...e),this.state={error:!1}}componentDidCatch(e){this.props.set(e)}render(){return this.state.error?null:this.props.children}}).getDerivedStateFromError=()=>({error:!0}),e))();function N(e){var t;let r="undefined"!=typeof window?null!=(t=window.devicePixelRatio)?t:2:1;return Array.isArray(e)?Math.min(Math.max(e[0],r),e[1]):e}function H(e){var t;return null==(t=e.__r3f)?void 0:t.root.getState()}let Y={obj:e=>e===Object(e)&&!Y.arr(e)&&"function"!=typeof e,fun:e=>"function"==typeof e,str:e=>"string"==typeof e,num:e=>"number"==typeof e,boo:e=>"boolean"==typeof e,und:e=>void 0===e,nul:e=>null===e,arr:e=>Array.isArray(e),equ(e,t,{arrays:r="shallow",objects:n="reference",strict:i=!0}={}){let o;if(typeof e!=typeof t||!!e!=!!t)return!1;if(Y.str(e)||Y.num(e)||Y.boo(e))return e===t;let s=Y.obj(e);if(s&&"reference"===n)return e===t;let a=Y.arr(e);if(a&&"reference"===r)return e===t;if((a||s)&&e===t)return!0;for(o in e)if(!(o in t))return!1;if(s&&"shallow"===r&&"shallow"===n){for(o in i?t:e)if(!Y.equ(e[o],t[o],{strict:i,objects:"reference"}))return!1}else for(o in i?t:e)if(e[o]!==t[o])return!1;if(Y.und(o)){if(a&&0===e.length&&0===t.length||s&&0===Object.keys(e).length&&0===Object.keys(t).length)return!0;if(e!==t)return!1}return!0}},V=["children","key","ref"];function X(e,t,r,n){let i=null==e?void 0:e.__r3f;return!i&&(i={root:t,type:r,parent:null,children:[],props:function(e){let t={};for(let r in e)V.includes(r)||(t[r]=e[r]);return t}(n),object:e,eventCount:0,handlers:{},isHidden:!1},e&&(e.__r3f=i)),i}function Z(e,t){let r=e[t];if(!t.includes("-"))return{root:e,key:t,target:r};for(let i of(r=e,t.split("-"))){var n;t=i,e=r,r=null==(n=r)?void 0:n[t]}return{root:e,key:t,target:r}}let q=/-\d+$/;function G(e,t){if(Y.str(t.props.attach)){if(q.test(t.props.attach)){let r=t.props.attach.replace(q,""),{root:n,key:i}=Z(e.object,r);Array.isArray(n[i])||(n[i]=[])}let{root:r,key:n}=Z(e.object,t.props.attach);t.previousAttach=r[n],r[n]=t.object}else Y.fun(t.props.attach)&&(t.previousAttach=t.props.attach(e.object,t.object))}function W(e,t){if(Y.str(t.props.attach)){let{root:r,key:n}=Z(e.object,t.props.attach),i=t.previousAttach;void 0===i?delete r[n]:r[n]=i}else null==t.previousAttach||t.previousAttach(e.object,t.object);delete t.previousAttach}let K=[...V,"args","dispose","attach","object","onUpdate","dispose"],Q=new Map,$=["map","emissiveMap","sheenColorMap","specularColorMap","envMap"],J=/^on(Pointer|Click|DoubleClick|ContextMenu|Wheel)/;function ee(e,t){var r,n;let i=e.__r3f,o=i&&R(i).getState(),s=null==i?void 0:i.eventCount;for(let r in t){let s=t[r];if(K.includes(r))continue;if(i&&J.test(r)){"function"==typeof s?i.handlers[r]=s:delete i.handlers[r],i.eventCount=Object.keys(i.handlers).length;continue}if(void 0===s)continue;let{root:a,key:c,target:u}=Z(e,r);u instanceof l.zgK&&s instanceof l.zgK?u.mask=s.mask:u instanceof l.Q1f&&L(s)?u.set(s):null!==u&&"object"==typeof u&&"function"==typeof u.set&&"function"==typeof u.copy&&null!=s&&s.constructor&&u.constructor===s.constructor?u.copy(s):null!==u&&"object"==typeof u&&"function"==typeof u.set&&Array.isArray(s)?"function"==typeof u.fromArray?u.fromArray(s):u.set(...s):null!==u&&"object"==typeof u&&"function"==typeof u.set&&"number"==typeof s?"function"==typeof u.setScalar?u.setScalar(s):u.set(s):(a[c]=s,o&&!o.linear&&$.includes(c)&&null!=(n=a[c])&&n.isTexture&&a[c].format===l.GWd&&a[c].type===l.OUM&&(a[c].colorSpace=l.er$))}if(null!=i&&i.parent&&null!=o&&o.internal&&null!=(r=i.object)&&r.isObject3D&&s!==i.eventCount){let e=i.object,t=o.internal.interaction.indexOf(e);t>-1&&o.internal.interaction.splice(t,1),i.eventCount&&null!==e.raycast&&o.internal.interaction.push(e)}return i&&void 0===i.props.attach&&(i.object.isBufferGeometry?i.props.attach="geometry":i.object.isMaterial&&(i.props.attach="material")),i&&et(i),e}function et(e){var t;if(!e.parent)return;null==e.props.onUpdate||e.props.onUpdate(e.object);let r=null==(t=e.root)||null==t.getState?void 0:t.getState();r&&0===r.internal.frames&&r.invalidate()}function er(e,t){e.manual||(M(e)?(e.left=-(t.width/2),e.right=t.width/2,e.top=t.height/2,e.bottom=-(t.height/2)):e.aspect=t.width/t.height,e.updateProjectionMatrix())}let en=e=>null==e?void 0:e.isObject3D;function ei(e){return(e.eventObject||e.object).uuid+"/"+e.index+e.instanceId}function eo(e,t,r,n){let i=r.get(t);i&&(r.delete(t),0===r.size&&(e.delete(n),i.target.releasePointerCapture(n)))}let es=e=>!!(null!=e&&e.render),ea=u.createContext(null),el=(e,t)=>{let r=y((r,n)=>{let i,o=new l.Pq0,s=new l.Pq0,a=new l.Pq0;function c(e=n().camera,t=s,r=n().size){let{width:i,height:l,top:u,left:d}=r,h=i/l;t.isVector3?a.copy(t):a.set(...t);let f=e.getWorldPosition(o).distanceTo(a);if(M(e))return{width:i/e.zoom,height:l/e.zoom,top:u,left:d,factor:1,distance:f,aspect:h};{let t=2*Math.tan(e.fov*Math.PI/180/2)*f,r=i/l*t;return{width:r,height:t,top:u,left:d,factor:i/r,distance:f,aspect:h}}}let d=e=>r(t=>({performance:{...t.performance,current:e}})),h=new l.I9Y;return{set:r,get:n,gl:null,camera:null,raycaster:null,events:{priority:1,enabled:!0,connected:!1},scene:null,xr:null,invalidate:(t=1)=>e(n(),t),advance:(e,r)=>t(e,r,n()),legacy:!1,linear:!1,flat:!1,controls:null,clock:new l.zD7,pointer:h,mouse:h,frameloop:"always",onPointerMissed:void 0,performance:{current:1,min:.5,max:1,debounce:200,regress:()=>{let e=n();i&&clearTimeout(i),e.performance.current!==e.performance.min&&d(e.performance.min),i=setTimeout(()=>d(n().performance.max),e.performance.debounce)}},size:{width:0,height:0,top:0,left:0},viewport:{initialDpr:0,dpr:0,width:0,height:0,top:0,left:0,aspect:0,distance:0,factor:0,getCurrentViewport:c},setEvents:e=>r(t=>({...t,events:{...t.events,...e}})),setSize:(e,t,i=0,o=0)=>{let a=n().camera,l={width:e,height:t,top:i,left:o};r(e=>({size:l,viewport:{...e.viewport,...c(a,s,l)}}))},setDpr:e=>r(t=>{let r=N(e);return{viewport:{...t.viewport,dpr:r,initialDpr:t.viewport.initialDpr||r}}}),setFrameloop:(e="always")=>{let t=n().clock;t.stop(),t.elapsedTime=0,"never"!==e&&(t.start(),t.elapsedTime=0),r(()=>({frameloop:e}))},previousRoot:void 0,internal:{interaction:[],hovered:new Map,subscribers:[],initialClick:[0,0],initialHits:[],capturedMap:new Map,lastEvent:u.createRef(),active:!1,frames:0,priority:0,subscribe:(e,t,r)=>{let i=n().internal;return i.priority=i.priority+ +(t>0),i.subscribers.push({ref:e,priority:t,store:r}),i.subscribers=i.subscribers.sort((e,t)=>e.priority-t.priority),()=>{let r=n().internal;null!=r&&r.subscribers&&(r.priority=r.priority-(t>0),r.subscribers=r.subscribers.filter(t=>t.ref!==e))}}}}}),n=r.getState(),i=n.size,o=n.viewport.dpr,s=n.camera;return r.subscribe(()=>{let{camera:e,size:t,viewport:n,gl:a,set:l}=r.getState();if(t.width!==i.width||t.height!==i.height||n.dpr!==o){i=t,o=n.dpr,er(e,t),n.dpr>0&&a.setPixelRatio(n.dpr);let r="undefined"!=typeof HTMLCanvasElement&&a.domElement instanceof HTMLCanvasElement;a.setSize(t.width,t.height,r)}e!==s&&(s=e,l(t=>({viewport:{...t.viewport,...t.viewport.getCurrentViewport(e)}})))}),r.subscribe(t=>e(t)),r};function ec(){let e=u.useContext(ea);if(!e)throw Error("R3F: Hooks can only be used within the Canvas component!");return e}function eu(e=e=>e,t){return ec()(e,t)}function ed(e,t=0){let r=ec(),n=r.getState().internal.subscribe,i=k(e);return F(()=>n(i,t,r),[t,n,r]),null}let eh=new WeakMap,ef=e=>{var t;return"function"==typeof e&&(null==e||null==(t=e.prototype)?void 0:t.constructor)===e};function ep(e,t){return function(r,...n){let i;return ef(r)?(i=eh.get(r))||(i=new r,eh.set(r,i)):i=r,e&&e(i),Promise.all(n.map(e=>new Promise((r,n)=>i.load(e,e=>{en(null==e?void 0:e.scene)&&Object.assign(e,function(e){let t={nodes:{},materials:{},meshes:{}};return e&&e.traverse(e=>{e.name&&(t.nodes[e.name]=e),e.material&&!t.materials[e.material.name]&&(t.materials[e.material.name]=e.material),e.isMesh&&!t.meshes[e.name]&&(t.meshes[e.name]=e)}),t}(e.scene)),r(e)},t,t=>n(Error(`Could not load ${e}: ${null==t?void 0:t.message}`))))))}}function em(e,t,r,n){let i=Array.isArray(t)?t:[t],o=S(ep(r,n),[e,...i],{equal:Y.equ});return Array.isArray(t)?o:o[0]}em.preload=function(e,t,r){let n=Array.isArray(t)?t:[t];return A(ep(r),[e,...n])},em.clear=function(e,t){return P([e,...Array.isArray(t)?t:[t]])};let eg={},ev=/^three(?=[A-Z])/,e_=e=>`${e[0].toUpperCase()}${e.slice(1)}`,ey=0,eC=e=>"function"==typeof e;function ex(e){if(eC(e)){let t=`${ey++}`;return eg[t]=e,t}Object.assign(eg,e)}function eb(e,t){let r=e_(e),n=eg[r];if("primitive"!==e&&!n)throw Error(`R3F: ${r} is not part of the THREE namespace! Did you forget to extend? See: https://docs.pmnd.rs/react-three-fiber/api/objects#using-3rd-party-objects-declaratively`);if("primitive"===e&&!t.object)throw Error("R3F: Primitives without 'object' are invalid!");if(void 0!==t.args&&!Array.isArray(t.args))throw Error("R3F: The args prop must be an array!")}function eE(e){if(e.isHidden){var t;e.props.attach&&null!=(t=e.parent)&&t.object?G(e.parent,e):en(e.object)&&!1!==e.props.visible&&(e.object.visible=!0),e.isHidden=!1,et(e)}}function eT(e,t,r){let n=t.root.getState();if(e.parent||e.object===n.scene){if(!t.object){var i,o;let e=eg[e_(t.type)];t.object=null!=(i=t.props.object)?i:new e(...null!=(o=t.props.args)?o:[]),t.object.__r3f=t}if(ee(t.object,t.props),t.props.attach)G(e,t);else if(en(t.object)&&en(e.object)){let n=e.object.children.indexOf(null==r?void 0:r.object);if(r&&-1!==n){let r=e.object.children.indexOf(t.object);-1!==r?(e.object.children.splice(r,1),e.object.children.splice(r<n?n-1:n,0,t.object)):(t.object.parent=e.object,e.object.children.splice(n,0,t.object),t.object.dispatchEvent({type:"added"}),e.object.dispatchEvent({type:"childadded",child:t.object}))}else e.object.add(t.object)}for(let e of t.children)eT(t,e);et(t)}}function ew(e,t){t&&(t.parent=e,e.children.push(t),eT(e,t))}function eO(e,t,r){if(!t||!r)return;t.parent=e;let n=e.children.indexOf(r);-1!==n?e.children.splice(n,0,t):e.children.push(t),eT(e,t,r)}function eS(e){if("function"==typeof e.dispose){let t=()=>{try{e.dispose()}catch{}};"undefined"!=typeof IS_REACT_ACT_ENVIRONMENT?t():(0,b.unstable_scheduleCallback)(b.unstable_IdlePriority,t)}}function eA(e,t,r){if(!t)return;t.parent=null;let n=e.children.indexOf(t);-1!==n&&e.children.splice(n,1),t.props.attach?W(e,t):en(t.object)&&en(e.object)&&(e.object.remove(t.object),function(e,t){let{internal:r}=e.getState();r.interaction=r.interaction.filter(e=>e!==t),r.initialHits=r.initialHits.filter(e=>e!==t),r.hovered.forEach((e,n)=>{(e.eventObject===t||e.object===t)&&r.hovered.delete(n)}),r.capturedMap.forEach((e,n)=>{eo(r.capturedMap,t,e,n)})}(R(t),t.object));let i=null!==t.props.dispose&&!1!==r;for(let e=t.children.length-1;e>=0;e--){let r=t.children[e];eA(t,r,i)}t.children.length=0,delete t.object.__r3f,i&&"primitive"!==t.type&&"Scene"!==t.object.type&&eS(t.object),void 0===r&&et(t)}let eP=[],eD=()=>{},ez={},eR=0,eM=function(e){let t=x()(e);return t.injectIntoDevTools({bundleType:0,rendererPackageName:"@react-three/fiber",version:u.version}),t}({isPrimaryRenderer:!1,warnsIfNotActing:!1,supportsMutation:!0,supportsPersistence:!1,supportsHydration:!1,createInstance:function(e,t,r){var n;return eb(e=e_(e)in eg?e:e.replace(ev,""),t),"primitive"===e&&null!=(n=t.object)&&n.__r3f&&delete t.object.__r3f,X(t.object,r,e,t)},removeChild:eA,appendChild:ew,appendInitialChild:ew,insertBefore:eO,appendChildToContainer(e,t){let r=e.getState().scene.__r3f;t&&r&&ew(r,t)},removeChildFromContainer(e,t){let r=e.getState().scene.__r3f;t&&r&&eA(r,t)},insertInContainerBefore(e,t,r){let n=e.getState().scene.__r3f;t&&r&&n&&eO(n,t,r)},getRootHostContext:()=>ez,getChildHostContext:()=>ez,commitUpdate(e,t,r,n,i){var o,s,a;eb(t,n);let l=!1;if("primitive"===e.type&&r.object!==n.object||(null==(o=n.args)?void 0:o.length)!==(null==(s=r.args)?void 0:s.length)?l=!0:null!=(a=n.args)&&a.some((e,t)=>{var n;return e!==(null==(n=r.args)?void 0:n[t])})&&(l=!0),l)eP.push([e,{...n},i]);else{let t=function(e,t){let r={};for(let n in t)if(!K.includes(n)&&!Y.equ(t[n],e.props[n]))for(let e in r[n]=t[n],t)e.startsWith(`${n}-`)&&(r[e]=t[e]);for(let n in e.props){if(K.includes(n)||t.hasOwnProperty(n))continue;let{root:i,key:o}=Z(e.object,n);if(i.constructor&&0===i.constructor.length){let e=function(e){let t=Q.get(e.constructor);try{t||(t=new e.constructor,Q.set(e.constructor,t))}catch(e){}return t}(i);Y.und(e)||(r[o]=e[o])}else r[o]=0}return r}(e,n);Object.keys(t).length&&(Object.assign(e.props,t),ee(e.object,t))}(null===i.sibling||(4&i.flags)==0)&&function(){for(let[e]of eP){let t=e.parent;if(t)for(let r of(e.props.attach?W(t,e):en(e.object)&&en(t.object)&&t.object.remove(e.object),e.children))r.props.attach?W(e,r):en(r.object)&&en(e.object)&&e.object.remove(r.object);e.isHidden&&eE(e),e.object.__r3f&&delete e.object.__r3f,"primitive"!==e.type&&eS(e.object)}for(let[n,i,o]of eP){n.props=i;let s=n.parent;if(s){let i=eg[e_(n.type)];n.object=null!=(e=n.props.object)?e:new i(...null!=(t=n.props.args)?t:[]),n.object.__r3f=n;var e,t,r=n.object;for(let e of[o,o.alternate])if(null!==e)if("function"==typeof e.ref){null==e.refCleanup||e.refCleanup();let t=e.ref(r);"function"==typeof t&&(e.refCleanup=t)}else e.ref&&(e.ref.current=r);for(let e of(ee(n.object,n.props),n.props.attach?G(s,n):en(n.object)&&en(s.object)&&s.object.add(n.object),n.children))e.props.attach?G(n,e):en(e.object)&&en(n.object)&&n.object.add(e.object);et(n)}}eP.length=0}()},finalizeInitialChildren:()=>!1,commitMount(){},getPublicInstance:e=>null==e?void 0:e.object,prepareForCommit:()=>null,preparePortalMount:e=>X(e.getState().scene,e,"",{}),resetAfterCommit:()=>{},shouldSetTextContent:()=>!1,clearContainer:()=>!1,hideInstance:function(e){if(!e.isHidden){var t;e.props.attach&&null!=(t=e.parent)&&t.object?W(e.parent,e):en(e.object)&&(e.object.visible=!1),e.isHidden=!0,et(e)}},unhideInstance:eE,createTextInstance:eD,hideTextInstance:eD,unhideTextInstance:eD,scheduleTimeout:"function"==typeof setTimeout?setTimeout:void 0,cancelTimeout:"function"==typeof clearTimeout?clearTimeout:void 0,noTimeout:-1,getInstanceFromNode:()=>null,beforeActiveInstanceBlur(){},afterActiveInstanceBlur(){},detachDeletedInstance(){},prepareScopeUpdate(){},getInstanceFromScope:()=>null,shouldAttemptEagerTransition:()=>!1,trackSchedulerEvent:()=>{},resolveEventType:()=>null,resolveEventTimeStamp:()=>-1.1,requestPostPaintCallback(){},maySuspendCommit:()=>!1,preloadInstance:()=>!0,startSuspendingCommit(){},suspendInstance(){},waitForCommitToBeReady:()=>null,NotPendingTransition:null,HostTransitionContext:u.createContext(null),setCurrentUpdatePriority(e){eR=e},getCurrentUpdatePriority:()=>eR,resolveUpdatePriority(){var e;if(0!==eR)return eR;switch("undefined"!=typeof window&&(null==(e=window.event)?void 0:e.type)){case"click":case"contextmenu":case"dblclick":case"pointercancel":case"pointerdown":case"pointerup":return h.DiscreteEventPriority;case"pointermove":case"pointerout":case"pointerover":case"pointerenter":case"pointerleave":case"wheel":return h.ContinuousEventPriority;default:return h.DefaultEventPriority}},resetFormInstance(){}}),eB=new Map,eL={objects:"shallow",strict:!1};function eF(e){let t,r,n=eB.get(e),i=null==n?void 0:n.fiber,o=null==n?void 0:n.store;n&&console.warn("R3F.createRoot should only be called once!");let s="function"==typeof reportError?reportError:console.error,a=o||el(eG,eW),u=i||eM.createContainer(a,h.ConcurrentRoot,null,!1,null,"",s,s,s,null);n||eB.set(e,{fiber:u,store:a});let d=!1,f=null;return{async configure(n={}){var i,o;let s;f=new Promise(e=>s=e);let{gl:u,size:h,scene:p,events:m,onCreated:g,shadows:v=!1,linear:_=!1,flat:y=!1,legacy:C=!1,orthographic:x=!1,frameloop:b="always",dpr:E=[1,2],performance:T,raycaster:w,camera:O,onPointerMissed:S}=n,A=a.getState(),P=A.gl;if(!A.gl){let t={canvas:e,powerPreference:"high-performance",antialias:!0,alpha:!0},r="function"==typeof u?await u(t):u;P=es(r)?r:new c.WebGLRenderer({...t,...u}),A.set({gl:P})}let D=A.raycaster;D||A.set({raycaster:D=new l.tBo});let{params:z,...R}=w||{};if(Y.equ(R,D,eL)||ee(D,{...R}),Y.equ(z,D.params,eL)||ee(D,{params:{...D.params,...z}}),!A.camera||A.camera===r&&!Y.equ(r,O,eL)){r=O;let e=null==O?void 0:O.isCamera,t=e?O:x?new l.qUd(0,0,0,0,.1,1e3):new l.ubm(75,0,.1,1e3);!e&&(t.position.z=5,O&&(ee(t,O),!t.manual&&("aspect"in O||"left"in O||"right"in O||"bottom"in O||"top"in O)&&(t.manual=!0,t.updateProjectionMatrix())),A.camera||null!=O&&O.rotation||t.lookAt(0,0,0)),A.set({camera:t}),D.camera=t}if(!A.scene){let e;null!=p&&p.isScene?X(e=p,a,"",{}):(X(e=new l.Z58,a,"",{}),p&&ee(e,p)),A.set({scene:e})}m&&!A.events.handlers&&A.set({events:m(a)});let M=function(e,t){if(!t&&"undefined"!=typeof HTMLCanvasElement&&e instanceof HTMLCanvasElement&&e.parentElement){let{width:t,height:r,top:n,left:i}=e.parentElement.getBoundingClientRect();return{width:t,height:r,top:n,left:i}}return!t&&"undefined"!=typeof OffscreenCanvas&&e instanceof OffscreenCanvas?{width:e.width,height:e.height,top:0,left:0}:{width:0,height:0,top:0,left:0,...t}}(e,h);if(Y.equ(M,A.size,eL)||A.setSize(M.width,M.height,M.top,M.left),E&&A.viewport.dpr!==N(E)&&A.setDpr(E),A.frameloop!==b&&A.setFrameloop(b),A.onPointerMissed||A.set({onPointerMissed:S}),T&&!Y.equ(T,A.performance,eL)&&A.set(e=>({performance:{...e.performance,...T}})),!A.xr){let e=(e,t)=>{let r=a.getState();"never"!==r.frameloop&&eW(e,!0,r,t)},t=()=>{let t=a.getState();t.gl.xr.enabled=t.gl.xr.isPresenting,t.gl.xr.setAnimationLoop(t.gl.xr.isPresenting?e:null),t.gl.xr.isPresenting||eG(t)},r={connect(){let e=a.getState().gl;e.xr.addEventListener("sessionstart",t),e.xr.addEventListener("sessionend",t)},disconnect(){let e=a.getState().gl;e.xr.removeEventListener("sessionstart",t),e.xr.removeEventListener("sessionend",t)}};"function"==typeof(null==(i=P.xr)?void 0:i.addEventListener)&&r.connect(),A.set({xr:r})}if(P.shadowMap){let e=P.shadowMap.enabled,t=P.shadowMap.type;if(P.shadowMap.enabled=!!v,Y.boo(v))P.shadowMap.type=l.Wk7;else if(Y.str(v)){let e={basic:l.bTm,percentage:l.QP0,soft:l.Wk7,variance:l.RyA};P.shadowMap.type=null!=(o=e[v])?o:l.Wk7}else Y.obj(v)&&Object.assign(P.shadowMap,v);(e!==P.shadowMap.enabled||t!==P.shadowMap.type)&&(P.shadowMap.needsUpdate=!0)}return l.ppV.enabled=!C,d||(P.outputColorSpace=_?l.Zr2:l.er$,P.toneMapping=y?l.y_p:l.FV),A.legacy!==C&&A.set(()=>({legacy:C})),A.linear!==_&&A.set(()=>({linear:_})),A.flat!==y&&A.set(()=>({flat:y})),!u||Y.fun(u)||es(u)||Y.equ(u,P,eL)||ee(P,u),t=g,d=!0,s(),this},render(r){return d||f||this.configure(),f.then(()=>{eM.updateContainer((0,D.jsx)(ek,{store:a,children:r,onCreated:t,rootElement:e}),u,null,()=>void 0)}),a},unmount(){eU(e)}}}function ek({store:e,children:t,onCreated:r,rootElement:n}){return F(()=>{let t=e.getState();t.set(e=>({internal:{...e.internal,active:!0}})),r&&r(t),e.getState().events.connected||null==t.events.connect||t.events.connect(n)},[]),(0,D.jsx)(ea.Provider,{value:e,children:t})}function eU(e,t){let r=eB.get(e),n=null==r?void 0:r.fiber;if(n){let i=null==r?void 0:r.store.getState();i&&(i.internal.active=!1),eM.updateContainer(null,n,null,()=>{i&&setTimeout(()=>{try{null==i.events.disconnect||i.events.disconnect(),null==(r=i.gl)||null==(n=r.renderLists)||null==n.dispose||n.dispose(),null==(o=i.gl)||null==o.forceContextLoss||o.forceContextLoss(),null!=(s=i.gl)&&s.xr&&i.xr.disconnect();var r,n,o,s,a=i.scene;for(let e in"Scene"!==a.type&&(null==a.dispose||a.dispose()),a){let t=a[e];(null==t?void 0:t.type)!=="Scene"&&(null==t||null==t.dispose||t.dispose())}eB.delete(e),t&&t(e)}catch(e){}},500)})}}let ej=new Set,eI=new Set,eN=new Set;function eH(e,t){if(e.size)for(let{callback:r}of e.values())r(t)}function eY(e,t){switch(e){case"before":return eH(ej,t);case"after":return eH(eI,t);case"tail":return eH(eN,t)}}function eV(e,t,r){let o=t.clock.getDelta();"never"===t.frameloop&&"number"==typeof e&&(o=e-t.clock.elapsedTime,t.clock.oldTime=t.clock.elapsedTime,t.clock.elapsedTime=e),n=t.internal.subscribers;for(let e=0;e<n.length;e++)(i=n[e]).ref.current(i.store.getState(),o,r);return!t.internal.priority&&t.gl.render&&t.gl.render(t.scene,t.camera),t.internal.frames=Math.max(0,t.internal.frames-1),"always"===t.frameloop?1:t.internal.frames}let eX=!1,eZ=!1;function eq(e){for(let r of(s=requestAnimationFrame(eq),eX=!0,o=0,eY("before",e),eZ=!0,eB.values())){var t;(a=r.store.getState()).internal.active&&("always"===a.frameloop||a.internal.frames>0)&&!(null!=(t=a.gl.xr)&&t.isPresenting)&&(o+=eV(e,a))}if(eZ=!1,eY("after",e),0===o)return eY("tail",e),eX=!1,cancelAnimationFrame(s)}function eG(e,t=1){var r;if(!e)return eB.forEach(e=>eG(e.store.getState(),t));(null==(r=e.gl.xr)||!r.isPresenting)&&e.internal.active&&"never"!==e.frameloop&&(t>1?e.internal.frames=Math.min(60,e.internal.frames+t):eZ?e.internal.frames=2:e.internal.frames=1,eX||(eX=!0,requestAnimationFrame(eq)))}function eW(e,t=!0,r,n){if(t&&eY("before",e),r)eV(e,r,n);else for(let t of eB.values())eV(e,t.store.getState());t&&eY("after",e)}let eK={onClick:["click",!1],onContextMenu:["contextmenu",!1],onDoubleClick:["dblclick",!1],onWheel:["wheel",!0],onPointerDown:["pointerdown",!0],onPointerUp:["pointerup",!0],onPointerLeave:["pointerleave",!0],onPointerMove:["pointermove",!0],onPointerCancel:["pointercancel",!0],onLostPointerCapture:["lostpointercapture",!0]};function eQ(e){let{handlePointer:t}=function(e){function t(e){return e.filter(e=>["Move","Over","Enter","Out","Leave"].some(t=>{var r;return null==(r=e.__r3f)?void 0:r.handlers["onPointer"+t]}))}function r(t){let{internal:r}=e.getState();for(let e of r.hovered.values())if(!t.length||!t.find(t=>t.object===e.object&&t.index===e.index&&t.instanceId===e.instanceId)){let n=e.eventObject.__r3f;if(r.hovered.delete(ei(e)),null!=n&&n.eventCount){let r=n.handlers,i={...e,intersections:t};null==r.onPointerOut||r.onPointerOut(i),null==r.onPointerLeave||r.onPointerLeave(i)}}}function n(e,t){for(let r=0;r<t.length;r++){let n=t[r].__r3f;null==n||null==n.handlers.onPointerMissed||n.handlers.onPointerMissed(e)}}return{handlePointer:function(i){switch(i){case"onPointerLeave":case"onPointerCancel":return()=>r([]);case"onLostPointerCapture":return t=>{let{internal:n}=e.getState();"pointerId"in t&&n.capturedMap.has(t.pointerId)&&requestAnimationFrame(()=>{n.capturedMap.has(t.pointerId)&&(n.capturedMap.delete(t.pointerId),r([]))})}}return function(o){let{onPointerMissed:s,internal:a}=e.getState();a.lastEvent.current=o;let c="onPointerMove"===i,u="onClick"===i||"onContextMenu"===i||"onDoubleClick"===i,d=function(t,r){let n=e.getState(),i=new Set,o=[],s=r?r(n.internal.interaction):n.internal.interaction;for(let e=0;e<s.length;e++){let t=H(s[e]);t&&(t.raycaster.camera=void 0)}n.previousRoot||null==n.events.compute||n.events.compute(t,n);let a=s.flatMap(function(e){let r=H(e);if(!r||!r.events.enabled||null===r.raycaster.camera)return[];if(void 0===r.raycaster.camera){var n;null==r.events.compute||r.events.compute(t,r,null==(n=r.previousRoot)?void 0:n.getState()),void 0===r.raycaster.camera&&(r.raycaster.camera=null)}return r.raycaster.camera?r.raycaster.intersectObject(e,!0):[]}).sort((e,t)=>{let r=H(e.object),n=H(t.object);return r&&n&&n.events.priority-r.events.priority||e.distance-t.distance}).filter(e=>{let t=ei(e);return!i.has(t)&&(i.add(t),!0)});for(let e of(n.events.filter&&(a=n.events.filter(a,n)),a)){let t=e.object;for(;t;){var l;null!=(l=t.__r3f)&&l.eventCount&&o.push({...e,eventObject:t}),t=t.parent}}if("pointerId"in t&&n.internal.capturedMap.has(t.pointerId))for(let e of n.internal.capturedMap.get(t.pointerId).values())i.has(ei(e.intersection))||o.push(e.intersection);return o}(o,c?t:void 0),h=u?function(t){let{internal:r}=e.getState(),n=t.offsetX-r.initialClick[0],i=t.offsetY-r.initialClick[1];return Math.round(Math.sqrt(n*n+i*i))}(o):0;"onPointerDown"===i&&(a.initialClick=[o.offsetX,o.offsetY],a.initialHits=d.map(e=>e.eventObject)),u&&!d.length&&h<=2&&(n(o,a.interaction),s&&s(o)),c&&r(d),!function(e,t,n,i){if(e.length){let o={stopped:!1};for(let s of e){let a=H(s.object);if(a||s.object.traverseAncestors(e=>{let t=H(e);if(t)return a=t,!1}),a){let{raycaster:c,pointer:u,camera:d,internal:h}=a,f=new l.Pq0(u.x,u.y,0).unproject(d),p=e=>{var t,r;return null!=(t=null==(r=h.capturedMap.get(e))?void 0:r.has(s.eventObject))&&t},m=e=>{let r={intersection:s,target:t.target};h.capturedMap.has(e)?h.capturedMap.get(e).set(s.eventObject,r):h.capturedMap.set(e,new Map([[s.eventObject,r]])),t.target.setPointerCapture(e)},g=e=>{let t=h.capturedMap.get(e);t&&eo(h.capturedMap,s.eventObject,t,e)},v={};for(let e in t){let r=t[e];"function"!=typeof r&&(v[e]=r)}let _={...s,...v,pointer:u,intersections:e,stopped:o.stopped,delta:n,unprojectedPoint:f,ray:c.ray,camera:d,stopPropagation(){let n="pointerId"in t&&h.capturedMap.get(t.pointerId);(!n||n.has(s.eventObject))&&(_.stopped=o.stopped=!0,h.hovered.size&&Array.from(h.hovered.values()).find(e=>e.eventObject===s.eventObject)&&r([...e.slice(0,e.indexOf(s)),s]))},target:{hasPointerCapture:p,setPointerCapture:m,releasePointerCapture:g},currentTarget:{hasPointerCapture:p,setPointerCapture:m,releasePointerCapture:g},nativeEvent:t};if(i(_),!0===o.stopped)break}}}}(d,o,h,function(e){let t=e.eventObject,r=t.__r3f;if(!(null!=r&&r.eventCount))return;let s=r.handlers;if(c){if(s.onPointerOver||s.onPointerEnter||s.onPointerOut||s.onPointerLeave){let t=ei(e),r=a.hovered.get(t);r?r.stopped&&e.stopPropagation():(a.hovered.set(t,e),null==s.onPointerOver||s.onPointerOver(e),null==s.onPointerEnter||s.onPointerEnter(e))}null==s.onPointerMove||s.onPointerMove(e)}else{let r=s[i];r?(!u||a.initialHits.includes(t))&&(n(o,a.interaction.filter(e=>!a.initialHits.includes(e))),r(e)):u&&a.initialHits.includes(t)&&n(o,a.interaction.filter(e=>!a.initialHits.includes(e)))}})}}}}(e);return{priority:1,enabled:!0,compute(e,t,r){t.pointer.set(e.offsetX/t.size.width*2-1,-(2*(e.offsetY/t.size.height))+1),t.raycaster.setFromCamera(t.pointer,t.camera)},connected:void 0,handlers:Object.keys(eK).reduce((e,r)=>({...e,[r]:t(r)}),{}),update:()=>{var t;let{events:r,internal:n}=e.getState();null!=(t=n.lastEvent)&&t.current&&r.handlers&&r.handlers.onPointerMove(n.lastEvent.current)},connect:t=>{let{set:r,events:n}=e.getState();if(null==n.disconnect||n.disconnect(),r(e=>({events:{...e.events,connected:t}})),n.handlers)for(let e in n.handlers){let r=n.handlers[e],[i,o]=eK[e];t.addEventListener(i,r,{passive:o})}},disconnect:()=>{let{set:t,events:r}=e.getState();if(r.connected){if(r.handlers)for(let e in r.handlers){let t=r.handlers[e],[n]=eK[e];r.connected.removeEventListener(n,t)}t(e=>({events:{...e.events,connected:void 0}}))}}}}},5029:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"default",{enumerable:!0,get:function(){return s}});let n=r(2115),i=n.useLayoutEffect,o=n.useEffect;function s(e){let{headManager:t,reduceComponentsToState:r}=e;function s(){if(t&&t.mountedInstances){let i=n.Children.toArray(Array.from(t.mountedInstances).filter(Boolean));t.updateHead(r(i,e))}}return i(()=>{var r;return null==t||null==(r=t.mountedInstances)||r.add(e.children),()=>{var r;null==t||null==(r=t.mountedInstances)||r.delete(e.children)}}),i(()=>(t&&(t._pendingUpdate=s),()=>{t&&(t._pendingUpdate=s)})),o(()=>(t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null),()=>{t&&t._pendingUpdate&&(t._pendingUpdate(),t._pendingUpdate=null)})),null}},5100:(e,t)=>{function r(e){let{widthInt:t,heightInt:r,blurWidth:n,blurHeight:i,blurDataURL:o,objectFit:s}=e,a=n?40*n:t,l=i?40*i:r,c=a&&l?"viewBox='0 0 "+a+" "+l+"'":"";return"%3Csvg xmlns='http://www.w3.org/2000/svg' "+c+"%3E%3Cfilter id='b' color-interpolation-filters='sRGB'%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3CfeColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 100 -1' result='s'/%3E%3CfeFlood x='0' y='0' width='100%25' height='100%25'/%3E%3CfeComposite operator='out' in='s'/%3E%3CfeComposite in2='SourceGraphic'/%3E%3CfeGaussianBlur stdDeviation='20'/%3E%3C/filter%3E%3Cimage width='100%25' height='100%25' x='0' y='0' preserveAspectRatio='"+(c?"none":"contain"===s?"xMidYMid":"cover"===s?"xMidYMid slice":"none")+"' style='filter: url(%23b);' href='"+o+"'/%3E%3C/svg%3E"}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImageBlurSvg",{enumerable:!0,get:function(){return r}})},5220:(e,t,r)=>{e.exports=r(1724)},5564:(e,t,r)=>{var n=r(9509);Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{default:function(){return g},defaultHead:function(){return h}});let i=r(8229),o=r(6966),s=r(5155),a=o._(r(2115)),l=i._(r(5029)),c=r(2464),u=r(2830),d=r(7544);function h(e){void 0===e&&(e=!1);let t=[(0,s.jsx)("meta",{charSet:"utf-8"},"charset")];return e||t.push((0,s.jsx)("meta",{name:"viewport",content:"width=device-width"},"viewport")),t}function f(e,t){return"string"==typeof t||"number"==typeof t?e:t.type===a.default.Fragment?e.concat(a.default.Children.toArray(t.props.children).reduce((e,t)=>"string"==typeof t||"number"==typeof t?e:e.concat(t),[])):e.concat(t)}r(3230);let p=["name","httpEquiv","charSet","itemProp"];function m(e,t){let{inAmpMode:r}=t;return e.reduce(f,[]).reverse().concat(h(r).reverse()).filter(function(){let e=new Set,t=new Set,r=new Set,n={};return i=>{let o=!0,s=!1;if(i.key&&"number"!=typeof i.key&&i.key.indexOf("$")>0){s=!0;let t=i.key.slice(i.key.indexOf("$")+1);e.has(t)?o=!1:e.add(t)}switch(i.type){case"title":case"base":t.has(i.type)?o=!1:t.add(i.type);break;case"meta":for(let e=0,t=p.length;e<t;e++){let t=p[e];if(i.props.hasOwnProperty(t))if("charSet"===t)r.has(t)?o=!1:r.add(t);else{let e=i.props[t],r=n[t]||new Set;("name"!==t||!s)&&r.has(e)?o=!1:(r.add(e),n[t]=r)}}}return o}}()).reverse().map((e,t)=>{let i=e.key||t;if(n.env.__NEXT_OPTIMIZE_FONTS&&!r&&"link"===e.type&&e.props.href&&["https://fonts.googleapis.com/css","https://use.typekit.net/"].some(t=>e.props.href.startsWith(t))){let t={...e.props||{}};return t["data-href"]=t.href,t.href=void 0,t["data-optimized-fonts"]=!0,a.default.cloneElement(e,t)}return a.default.cloneElement(e,{key:i})})}let g=function(e){let{children:t}=e,r=(0,a.useContext)(c.AmpStateContext),n=(0,a.useContext)(u.HeadManagerContext);return(0,s.jsx)(l.default,{reduceComponentsToState:m,headManager:n,inAmpMode:(0,d.isInAmpMode)(r),children:t})};("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},5643:(e,t,r)=>{e.exports=r(6115)},5840:(e,t)=>{Object.defineProperty(t,"__esModule",{value:!0}),!function(e,t){for(var r in t)Object.defineProperty(e,r,{enumerable:!0,get:t[r]})}(t,{VALID_LOADERS:function(){return r},imageConfigDefault:function(){return n}});let r=["default","imgix","cloudinary","akamai","custom"],n={deviceSizes:[640,750,828,1080,1200,1920,2048,3840],imageSizes:[16,32,48,64,96,128,256,384],path:"/_next/image",loader:"default",loaderFile:"",domains:[],disableStaticImages:!1,minimumCacheTTL:60,formats:["image/webp"],dangerouslyAllowSVG:!1,contentSecurityPolicy:"script-src 'none'; frame-src 'none'; sandbox;",contentDispositionType:"attachment",localPatterns:void 0,remotePatterns:[],qualities:void 0,unoptimized:!1}},6115:(e,t,r)=>{var n=r(2115),i=r(9033),o="function"==typeof Object.is?Object.is:function(e,t){return e===t&&(0!==e||1/e==1/t)||e!=e&&t!=t},s=i.useSyncExternalStore,a=n.useRef,l=n.useEffect,c=n.useMemo,u=n.useDebugValue;t.useSyncExternalStoreWithSelector=function(e,t,r,n,i){var d=a(null);if(null===d.current){var h={hasValue:!1,value:null};d.current=h}else h=d.current;var f=s(e,(d=c(function(){function e(e){if(!l){if(l=!0,s=e,e=n(e),void 0!==i&&h.hasValue){var t=h.value;if(i(t,e))return a=t}return a=e}if(t=a,o(s,e))return t;var r=n(e);return void 0!==i&&i(t,r)?(s=e,t):(s=e,a=r)}var s,a,l=!1,c=void 0===r?null:r;return[function(){return e(t())},null===c?void 0:function(){return e(c())}]},[t,r,n,i]))[0],d[1]);return l(function(){h.hasValue=!0,h.value=f},[f]),u(f),f}},6354:(e,t,r)=>{r.d(t,{Af:()=>a,Nz:()=>i,u5:()=>l,y3:()=>d});var n=r(2115);function i(e,t,r){if(!e)return;if(!0===r(e))return e;let n=t?e.return:e.child;for(;n;){let e=i(n,t,r);if(e)return e;n=t?null:n.sibling}}function o(e){try{return Object.defineProperties(e,{_currentRenderer:{get:()=>null,set(){}},_currentRenderer2:{get:()=>null,set(){}}})}catch(t){return e}}(()=>{var e,t;return"undefined"!=typeof window&&((null==(e=window.document)?void 0:e.createElement)||(null==(t=window.navigator)?void 0:t.product)==="ReactNative")})()?n.useLayoutEffect:n.useEffect;let s=o(n.createContext(null));class a extends n.Component{render(){return n.createElement(s.Provider,{value:this._reactInternals},this.props.children)}}function l(){let e=n.useContext(s);if(null===e)throw Error("its-fine: useFiber must be called within a <FiberProvider />!");let t=n.useId();return n.useMemo(()=>{for(let r of[e,null==e?void 0:e.alternate]){if(!r)continue;let e=i(r,!1,e=>{let r=e.memoizedState;for(;r;){if(r.memoizedState===t)return!0;r=r.next}});if(e)return e}},[e,t])}let c=Symbol.for("react.context"),u=e=>null!==e&&"object"==typeof e&&"$$typeof"in e&&e.$$typeof===c;function d(){let e=function(){let e=l(),[t]=n.useState(()=>new Map);t.clear();let r=e;for(;r;){let e=r.type;u(e)&&e!==s&&!t.has(e)&&t.set(e,n.use(o(e))),r=r.return}return t}();return n.useMemo(()=>Array.from(e.keys()).reduce((t,r)=>i=>n.createElement(t,null,n.createElement(r.Provider,{...i,value:e.get(r)})),e=>n.createElement(a,{...e})),[e])}},6500:(e,t)=>{t.ConcurrentRoot=1,t.ContinuousEventPriority=8,t.DefaultEventPriority=32,t.DiscreteEventPriority=2},6654:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"useMergedRef",{enumerable:!0,get:function(){return i}});let n=r(2115);function i(e,t){let r=(0,n.useRef)(null),i=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=i.current;t&&(i.current=null,t())}else e&&(r.current=o(e,n)),t&&(i.current=o(t,n))},[e,t])}function o(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof t.default||"object"==typeof t.default&&null!==t.default)&&void 0===t.default.__esModule&&(Object.defineProperty(t.default,"__esModule",{value:!0}),Object.assign(t.default,t),e.exports=t.default)},6752:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"ImageConfigContext",{enumerable:!0,get:function(){return o}});let n=r(8229)._(r(2115)),i=r(5840),o=n.default.createContext(i.imageConfigDefault)},6766:(e,t,r)=>{r.d(t,{default:()=>i.a});var n=r(1469),i=r.n(n)},6892:(e,t)=>{function r(e,t){var r=e.length;for(e.push(t);0<r;){var n=r-1>>>1,i=e[n];if(0<o(i,t))e[n]=t,e[r]=i,r=n;else break}}function n(e){return 0===e.length?null:e[0]}function i(e){if(0===e.length)return null;var t=e[0],r=e.pop();if(r!==t){e[0]=r;for(var n=0,i=e.length,s=i>>>1;n<s;){var a=2*(n+1)-1,l=e[a],c=a+1,u=e[c];if(0>o(l,r))c<i&&0>o(u,l)?(e[n]=u,e[c]=r,n=c):(e[n]=l,e[a]=r,n=a);else if(c<i&&0>o(u,r))e[n]=u,e[c]=r,n=c;else break}}return t}function o(e,t){var r=e.sortIndex-t.sortIndex;return 0!==r?r:e.id-t.id}if(t.unstable_now=void 0,"object"==typeof performance&&"function"==typeof performance.now){var s,a=performance;t.unstable_now=function(){return a.now()}}else{var l=Date,c=l.now();t.unstable_now=function(){return l.now()-c}}var u=[],d=[],h=1,f=null,p=3,m=!1,g=!1,v=!1,_="function"==typeof setTimeout?setTimeout:null,y="function"==typeof clearTimeout?clearTimeout:null,C="undefined"!=typeof setImmediate?setImmediate:null;function x(e){for(var t=n(d);null!==t;){if(null===t.callback)i(d);else if(t.startTime<=e)i(d),t.sortIndex=t.expirationTime,r(u,t);else break;t=n(d)}}function b(e){if(v=!1,x(e),!g)if(null!==n(u))g=!0,z();else{var t=n(d);null!==t&&R(b,t.startTime-e)}}var E=!1,T=-1,w=5,O=-1;function S(){return!(t.unstable_now()-O<w)}function A(){if(E){var e=t.unstable_now();O=e;var r=!0;try{e:{g=!1,v&&(v=!1,y(T),T=-1),m=!0;var o=p;try{t:{for(x(e),f=n(u);null!==f&&!(f.expirationTime>e&&S());){var a=f.callback;if("function"==typeof a){f.callback=null,p=f.priorityLevel;var l=a(f.expirationTime<=e);if(e=t.unstable_now(),"function"==typeof l){f.callback=l,x(e),r=!0;break t}f===n(u)&&i(u),x(e)}else i(u);f=n(u)}if(null!==f)r=!0;else{var c=n(d);null!==c&&R(b,c.startTime-e),r=!1}}break e}finally{f=null,p=o,m=!1}}}finally{r?s():E=!1}}}if("function"==typeof C)s=function(){C(A)};else if("undefined"!=typeof MessageChannel){var P=new MessageChannel,D=P.port2;P.port1.onmessage=A,s=function(){D.postMessage(null)}}else s=function(){_(A,0)};function z(){E||(E=!0,s())}function R(e,r){T=_(function(){e(t.unstable_now())},r)}t.unstable_IdlePriority=5,t.unstable_ImmediatePriority=1,t.unstable_LowPriority=4,t.unstable_NormalPriority=3,t.unstable_Profiling=null,t.unstable_UserBlockingPriority=2,t.unstable_cancelCallback=function(e){e.callback=null},t.unstable_continueExecution=function(){g||m||(g=!0,z())},t.unstable_forceFrameRate=function(e){0>e||125<e?console.error("forceFrameRate takes a positive int between 0 and 125, forcing frame rates higher than 125 fps is not supported"):w=0<e?Math.floor(1e3/e):5},t.unstable_getCurrentPriorityLevel=function(){return p},t.unstable_getFirstCallbackNode=function(){return n(u)},t.unstable_next=function(e){switch(p){case 1:case 2:case 3:var t=3;break;default:t=p}var r=p;p=t;try{return e()}finally{p=r}},t.unstable_pauseExecution=function(){},t.unstable_requestPaint=function(){},t.unstable_runWithPriority=function(e,t){switch(e){case 1:case 2:case 3:case 4:case 5:break;default:e=3}var r=p;p=e;try{return t()}finally{p=r}},t.unstable_scheduleCallback=function(e,i,o){var s=t.unstable_now();switch(o="object"==typeof o&&null!==o&&"number"==typeof(o=o.delay)&&0<o?s+o:s,e){case 1:var a=-1;break;case 2:a=250;break;case 5:a=0x3fffffff;break;case 4:a=1e4;break;default:a=5e3}return a=o+a,e={id:h++,callback:i,priorityLevel:e,startTime:o,expirationTime:a,sortIndex:-1},o>s?(e.sortIndex=o,r(d,e),null===n(u)&&e===n(d)&&(v?(y(T),T=-1):v=!0,R(b,o-s))):(e.sortIndex=a,r(u,e),g||m||(g=!0,z())),e},t.unstable_shouldYield=S,t.unstable_wrapCallback=function(e){var t=p;return function(){var r=p;p=t;try{return e.apply(this,arguments)}finally{p=r}}}},7544:(e,t)=>{function r(e){let{ampFirst:t=!1,hybrid:r=!1,hasQuery:n=!1}=void 0===e?{}:e;return t||r&&n}Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"isInAmpMode",{enumerable:!0,get:function(){return r}})},8883:(e,t,r)=>{Object.defineProperty(t,"__esModule",{value:!0}),Object.defineProperty(t,"getImgProps",{enumerable:!0,get:function(){return l}}),r(3230);let n=r(5100),i=r(5840),o=["-moz-initial","fill","none","scale-down",void 0];function s(e){return void 0!==e.default}function a(e){return void 0===e?e:"number"==typeof e?Number.isFinite(e)?e:NaN:"string"==typeof e&&/^[0-9]+$/.test(e)?parseInt(e,10):NaN}function l(e,t){var r,l;let c,u,d,{src:h,sizes:f,unoptimized:p=!1,priority:m=!1,loading:g,className:v,quality:_,width:y,height:C,fill:x=!1,style:b,overrideSrc:E,onLoad:T,onLoadingComplete:w,placeholder:O="empty",blurDataURL:S,fetchPriority:A,decoding:P="async",layout:D,objectFit:z,objectPosition:R,lazyBoundary:M,lazyRoot:B,...L}=e,{imgConf:F,showAltText:k,blurComplete:U,defaultLoader:j}=t,I=F||i.imageConfigDefault;if("allSizes"in I)c=I;else{let e=[...I.deviceSizes,...I.imageSizes].sort((e,t)=>e-t),t=I.deviceSizes.sort((e,t)=>e-t),n=null==(r=I.qualities)?void 0:r.sort((e,t)=>e-t);c={...I,allSizes:e,deviceSizes:t,qualities:n}}if(void 0===j)throw Object.defineProperty(Error("images.loaderFile detected but the file is missing default export.\nRead more: https://nextjs.org/docs/messages/invalid-images-config"),"__NEXT_ERROR_CODE",{value:"E163",enumerable:!1,configurable:!0});let N=L.loader||j;delete L.loader,delete L.srcSet;let H="__next_img_default"in N;if(H){if("custom"===c.loader)throw Object.defineProperty(Error('Image with src "'+h+'" is missing "loader" prop.\nRead more: https://nextjs.org/docs/messages/next-image-missing-loader'),"__NEXT_ERROR_CODE",{value:"E252",enumerable:!1,configurable:!0})}else{let e=N;N=t=>{let{config:r,...n}=t;return e(n)}}if(D){"fill"===D&&(x=!0);let e={intrinsic:{maxWidth:"100%",height:"auto"},responsive:{width:"100%",height:"auto"}}[D];e&&(b={...b,...e});let t={responsive:"100vw",fill:"100vw"}[D];t&&!f&&(f=t)}let Y="",V=a(y),X=a(C);if((l=h)&&"object"==typeof l&&(s(l)||void 0!==l.src)){let e=s(h)?h.default:h;if(!e.src)throw Object.defineProperty(Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include src. Received "+JSON.stringify(e)),"__NEXT_ERROR_CODE",{value:"E460",enumerable:!1,configurable:!0});if(!e.height||!e.width)throw Object.defineProperty(Error("An object should only be passed to the image component src parameter if it comes from a static image import. It must include height and width. Received "+JSON.stringify(e)),"__NEXT_ERROR_CODE",{value:"E48",enumerable:!1,configurable:!0});if(u=e.blurWidth,d=e.blurHeight,S=S||e.blurDataURL,Y=e.src,!x)if(V||X){if(V&&!X){let t=V/e.width;X=Math.round(e.height*t)}else if(!V&&X){let t=X/e.height;V=Math.round(e.width*t)}}else V=e.width,X=e.height}let Z=!m&&("lazy"===g||void 0===g);(!(h="string"==typeof h?h:Y)||h.startsWith("data:")||h.startsWith("blob:"))&&(p=!0,Z=!1),c.unoptimized&&(p=!0),H&&!c.dangerouslyAllowSVG&&h.split("?",1)[0].endsWith(".svg")&&(p=!0);let q=a(_),G=Object.assign(x?{position:"absolute",height:"100%",width:"100%",left:0,top:0,right:0,bottom:0,objectFit:z,objectPosition:R}:{},k?{}:{color:"transparent"},b),W=U||"empty"===O?null:"blur"===O?'url("data:image/svg+xml;charset=utf-8,'+(0,n.getImageBlurSvg)({widthInt:V,heightInt:X,blurWidth:u,blurHeight:d,blurDataURL:S||"",objectFit:G.objectFit})+'")':'url("'+O+'")',K=o.includes(G.objectFit)?"fill"===G.objectFit?"100% 100%":"cover":G.objectFit,Q=W?{backgroundSize:K,backgroundPosition:G.objectPosition||"50% 50%",backgroundRepeat:"no-repeat",backgroundImage:W}:{},$=function(e){let{config:t,src:r,unoptimized:n,width:i,quality:o,sizes:s,loader:a}=e;if(n)return{src:r,srcSet:void 0,sizes:void 0};let{widths:l,kind:c}=function(e,t,r){let{deviceSizes:n,allSizes:i}=e;if(r){let e=/(^|\s)(1?\d?\d)vw/g,t=[];for(let n;n=e.exec(r);)t.push(parseInt(n[2]));if(t.length){let e=.01*Math.min(...t);return{widths:i.filter(t=>t>=n[0]*e),kind:"w"}}return{widths:i,kind:"w"}}return"number"!=typeof t?{widths:n,kind:"w"}:{widths:[...new Set([t,2*t].map(e=>i.find(t=>t>=e)||i[i.length-1]))],kind:"x"}}(t,i,s),u=l.length-1;return{sizes:s||"w"!==c?s:"100vw",srcSet:l.map((e,n)=>a({config:t,src:r,quality:o,width:e})+" "+("w"===c?e:n+1)+c).join(", "),src:a({config:t,src:r,quality:o,width:l[u]})}}({config:c,src:h,unoptimized:p,width:V,quality:q,sizes:f,loader:N});return{props:{...L,loading:Z?"lazy":g,fetchPriority:A,width:V,height:X,decoding:P,className:v,style:{...G,...Q},sizes:$.sizes,srcSet:$.srcSet,src:E||$.src},meta:{unoptimized:p,priority:m,placeholder:O,fill:x}}}},9033:(e,t,r)=>{e.exports=r(2436)},9088:(e,t,r)=>{r.d(t,{u:()=>t1});var n,i,o,s,a,l,c,u,d,h,f,p,m,g=function(){return n||"undefined"!=typeof window&&(n=window.gsap)&&n.registerPlugin&&n},v=1,_=[],y=[],C=[],x=Date.now,b=function(e,t){return t},E=function(){var e=d.core,t=e.bridge||{},r=e._scrollers,n=e._proxies;r.push.apply(r,y),n.push.apply(n,C),y=r,C=n,b=function(e,r){return t[e](r)}},T=function(e,t){return~C.indexOf(e)&&C[C.indexOf(e)+1][t]},w=function(e){return!!~h.indexOf(e)},O=function(e,t,r,n,i){return e.addEventListener(t,r,{passive:!1!==n,capture:!!i})},S=function(e,t,r,n){return e.removeEventListener(t,r,!!n)},A="scrollLeft",P="scrollTop",D=function(){return f&&f.isPressed||y.cache++},z=function(e,t){var r=function r(n){if(n||0===n){v&&(o.history.scrollRestoration="manual");var i=f&&f.isPressed;e(n=r.v=Math.round(n)||(f&&f.iOS?1:0)),r.cacheID=y.cache,i&&b("ss",n)}else(t||y.cache!==r.cacheID||b("ref"))&&(r.cacheID=y.cache,r.v=e());return r.v+r.offset};return r.offset=0,e&&r},R={s:A,p:"left",p2:"Left",os:"right",os2:"Right",d:"width",d2:"Width",a:"x",sc:z(function(e){return arguments.length?o.scrollTo(e,M.sc()):o.pageXOffset||s[A]||a[A]||l[A]||0})},M={s:P,p:"top",p2:"Top",os:"bottom",os2:"Bottom",d:"height",d2:"Height",a:"y",op:R,sc:z(function(e){return arguments.length?o.scrollTo(R.sc(),e):o.pageYOffset||s[P]||a[P]||l[P]||0})},B=function(e,t){return(t&&t._ctx&&t._ctx.selector||n.utils.toArray)(e)[0]||("string"==typeof e&&!1!==n.config().nullTargetWarn?console.warn("Element not found:",e):null)},L=function(e,t){for(var r=t.length;r--;)if(t[r]===e||t[r].contains(e))return!0;return!1},F=function(e,t){var r=t.s,i=t.sc;w(e)&&(e=s.scrollingElement||a);var o=y.indexOf(e),l=i===M.sc?1:2;~o||(o=y.push(e)-1),y[o+l]||O(e,"scroll",D);var c=y[o+l],u=c||(y[o+l]=z(T(e,r),!0)||(w(e)?i:z(function(t){return arguments.length?e[r]=t:e[r]})));return u.target=e,c||(u.smooth="smooth"===n.getProperty(e,"scrollBehavior")),u},k=function(e,t,r){var n=e,i=e,o=x(),s=o,a=t||50,l=Math.max(500,3*a),c=function(e,t){var l=x();t||l-o>a?(i=n,n=e,s=o,o=l):r?n+=e:n=i+(e-i)/(l-s)*(o-s)};return{update:c,reset:function(){i=n=r?0:n,s=o=0},getVelocity:function(e){var t=s,a=i,u=x();return(e||0===e)&&e!==n&&c(e),o===s||u-s>l?0:(n+(r?a:-a))/((r?u:o)-t)*1e3}}},U=function(e,t){return t&&!e._gsapAllow&&e.preventDefault(),e.changedTouches?e.changedTouches[0]:e},j=function(e){var t=Math.max.apply(Math,e),r=Math.min.apply(Math,e);return Math.abs(t)>=Math.abs(r)?t:r},I=function(){(d=n.core.globals().ScrollTrigger)&&d.core&&E()},N=function(e){return n=e||g(),!i&&n&&"undefined"!=typeof document&&document.body&&(o=window,a=(s=document).documentElement,l=s.body,h=[o,s,a,l],n.utils.clamp,m=n.core.context||function(){},u="onpointerenter"in l?"pointer":"mouse",c=H.isTouch=o.matchMedia&&o.matchMedia("(hover: none), (pointer: coarse)").matches?1:2*("ontouchstart"in o||navigator.maxTouchPoints>0||navigator.msMaxTouchPoints>0),p=H.eventTypes=("ontouchstart"in a?"touchstart,touchmove,touchcancel,touchend":!("onpointerdown"in a)?"mousedown,mousemove,mouseup,mouseup":"pointerdown,pointermove,pointercancel,pointerup").split(","),setTimeout(function(){return v=0},500),I(),i=1),i};R.op=M,y.cache=0;var H=function(){var e;function t(e){this.init(e)}return t.prototype.init=function(e){i||N(n)||console.warn("Please gsap.registerPlugin(Observer)"),d||I();var t=e.tolerance,r=e.dragMinimum,h=e.type,g=e.target,v=e.lineHeight,y=e.debounce,C=e.preventDefault,b=e.onStop,E=e.onStopDelay,T=e.ignore,A=e.wheelSpeed,P=e.event,z=e.onDragStart,H=e.onDragEnd,Y=e.onDrag,V=e.onPress,X=e.onRelease,Z=e.onRight,q=e.onLeft,G=e.onUp,W=e.onDown,K=e.onChangeX,Q=e.onChangeY,$=e.onChange,J=e.onToggleX,ee=e.onToggleY,et=e.onHover,er=e.onHoverEnd,en=e.onMove,ei=e.ignoreCheck,eo=e.isNormalizer,es=e.onGestureStart,ea=e.onGestureEnd,el=e.onWheel,ec=e.onEnable,eu=e.onDisable,ed=e.onClick,eh=e.scrollSpeed,ef=e.capture,ep=e.allowClicks,em=e.lockAxis,eg=e.onLockAxis;this.target=g=B(g)||a,this.vars=e,T&&(T=n.utils.toArray(T)),t=t||1e-9,r=r||0,A=A||1,eh=eh||1,h=h||"wheel,touch,pointer",y=!1!==y,v||(v=parseFloat(o.getComputedStyle(l).lineHeight)||22);var ev,e_,ey,eC,ex,eb,eE,eT=this,ew=0,eO=0,eS=e.passive||!C&&!1!==e.passive,eA=F(g,R),eP=F(g,M),eD=eA(),ez=eP(),eR=~h.indexOf("touch")&&!~h.indexOf("pointer")&&"pointerdown"===p[0],eM=w(g),eB=g.ownerDocument||s,eL=[0,0,0],eF=[0,0,0],ek=0,eU=function(){return ek=x()},ej=function(e,t){return(eT.event=e)&&T&&L(e.target,T)||t&&eR&&"touch"!==e.pointerType||ei&&ei(e,t)},eI=function(){var e=eT.deltaX=j(eL),r=eT.deltaY=j(eF),n=Math.abs(e)>=t,i=Math.abs(r)>=t;$&&(n||i)&&$(eT,e,r,eL,eF),n&&(Z&&eT.deltaX>0&&Z(eT),q&&eT.deltaX<0&&q(eT),K&&K(eT),J&&eT.deltaX<0!=ew<0&&J(eT),ew=eT.deltaX,eL[0]=eL[1]=eL[2]=0),i&&(W&&eT.deltaY>0&&W(eT),G&&eT.deltaY<0&&G(eT),Q&&Q(eT),ee&&eT.deltaY<0!=eO<0&&ee(eT),eO=eT.deltaY,eF[0]=eF[1]=eF[2]=0),(eC||ey)&&(en&&en(eT),ey&&(z&&1===ey&&z(eT),Y&&Y(eT),ey=0),eC=!1),eb&&(eb=!1,1)&&eg&&eg(eT),ex&&(el(eT),ex=!1),ev=0},eN=function(e,t,r){eL[r]+=e,eF[r]+=t,eT._vx.update(e),eT._vy.update(t),y?ev||(ev=requestAnimationFrame(eI)):eI()},eH=function(e,t){em&&!eE&&(eT.axis=eE=Math.abs(e)>Math.abs(t)?"x":"y",eb=!0),"y"!==eE&&(eL[2]+=e,eT._vx.update(e,!0)),"x"!==eE&&(eF[2]+=t,eT._vy.update(t,!0)),y?ev||(ev=requestAnimationFrame(eI)):eI()},eY=function(e){if(!ej(e,1)){var t=(e=U(e,C)).clientX,n=e.clientY,i=t-eT.x,o=n-eT.y,s=eT.isDragging;eT.x=t,eT.y=n,(s||(i||o)&&(Math.abs(eT.startX-t)>=r||Math.abs(eT.startY-n)>=r))&&(ey=s?2:1,s||(eT.isDragging=!0),eH(i,o))}},eV=eT.onPress=function(e){ej(e,1)||e&&e.button||(eT.axis=eE=null,e_.pause(),eT.isPressed=!0,e=U(e),ew=eO=0,eT.startX=eT.x=e.clientX,eT.startY=eT.y=e.clientY,eT._vx.reset(),eT._vy.reset(),O(eo?g:eB,p[1],eY,eS,!0),eT.deltaX=eT.deltaY=0,V&&V(eT))},eX=eT.onRelease=function(e){if(!ej(e,1)){S(eo?g:eB,p[1],eY,!0);var t=!isNaN(eT.y-eT.startY),r=eT.isDragging,i=r&&(Math.abs(eT.x-eT.startX)>3||Math.abs(eT.y-eT.startY)>3),s=U(e);!i&&t&&(eT._vx.reset(),eT._vy.reset(),C&&ep&&n.delayedCall(.08,function(){if(x()-ek>300&&!e.defaultPrevented){if(e.target.click)e.target.click();else if(eB.createEvent){var t=eB.createEvent("MouseEvents");t.initMouseEvent("click",!0,!0,o,1,s.screenX,s.screenY,s.clientX,s.clientY,!1,!1,!1,!1,0,null),e.target.dispatchEvent(t)}}})),eT.isDragging=eT.isGesturing=eT.isPressed=!1,b&&r&&!eo&&e_.restart(!0),ey&&eI(),H&&r&&H(eT),X&&X(eT,i)}},eZ=function(e){return e.touches&&e.touches.length>1&&(eT.isGesturing=!0)&&es(e,eT.isDragging)},eq=function(){return eT.isGesturing=!1,ea(eT)},eG=function(e){if(!ej(e)){var t=eA(),r=eP();eN((t-eD)*eh,(r-ez)*eh,1),eD=t,ez=r,b&&e_.restart(!0)}},eW=function(e){if(!ej(e)){e=U(e,C),el&&(ex=!0);var t=(1===e.deltaMode?v:2===e.deltaMode?o.innerHeight:1)*A;eN(e.deltaX*t,e.deltaY*t,0),b&&!eo&&e_.restart(!0)}},eK=function(e){if(!ej(e)){var t=e.clientX,r=e.clientY,n=t-eT.x,i=r-eT.y;eT.x=t,eT.y=r,eC=!0,b&&e_.restart(!0),(n||i)&&eH(n,i)}},eQ=function(e){eT.event=e,et(eT)},e$=function(e){eT.event=e,er(eT)},eJ=function(e){return ej(e)||U(e,C)&&ed(eT)};e_=eT._dc=n.delayedCall(E||.25,function(){eT._vx.reset(),eT._vy.reset(),e_.pause(),b&&b(eT)}).pause(),eT.deltaX=eT.deltaY=0,eT._vx=k(0,50,!0),eT._vy=k(0,50,!0),eT.scrollX=eA,eT.scrollY=eP,eT.isDragging=eT.isGesturing=eT.isPressed=!1,m(this),eT.enable=function(e){return!eT.isEnabled&&(O(eM?eB:g,"scroll",D),h.indexOf("scroll")>=0&&O(eM?eB:g,"scroll",eG,eS,ef),h.indexOf("wheel")>=0&&O(g,"wheel",eW,eS,ef),(h.indexOf("touch")>=0&&c||h.indexOf("pointer")>=0)&&(O(g,p[0],eV,eS,ef),O(eB,p[2],eX),O(eB,p[3],eX),ep&&O(g,"click",eU,!0,!0),ed&&O(g,"click",eJ),es&&O(eB,"gesturestart",eZ),ea&&O(eB,"gestureend",eq),et&&O(g,u+"enter",eQ),er&&O(g,u+"leave",e$),en&&O(g,u+"move",eK)),eT.isEnabled=!0,eT.isDragging=eT.isGesturing=eT.isPressed=eC=ey=!1,eT._vx.reset(),eT._vy.reset(),eD=eA(),ez=eP(),e&&e.type&&eV(e),ec&&ec(eT)),eT},eT.disable=function(){eT.isEnabled&&(_.filter(function(e){return e!==eT&&w(e.target)}).length||S(eM?eB:g,"scroll",D),eT.isPressed&&(eT._vx.reset(),eT._vy.reset(),S(eo?g:eB,p[1],eY,!0)),S(eM?eB:g,"scroll",eG,ef),S(g,"wheel",eW,ef),S(g,p[0],eV,ef),S(eB,p[2],eX),S(eB,p[3],eX),S(g,"click",eU,!0),S(g,"click",eJ),S(eB,"gesturestart",eZ),S(eB,"gestureend",eq),S(g,u+"enter",eQ),S(g,u+"leave",e$),S(g,u+"move",eK),eT.isEnabled=eT.isPressed=eT.isDragging=!1,eu&&eu(eT))},eT.kill=eT.revert=function(){eT.disable();var e=_.indexOf(eT);e>=0&&_.splice(e,1),f===eT&&(f=0)},_.push(eT),eo&&w(g)&&(f=eT),eT.enable(P)},e=[{key:"velocityX",get:function(){return this._vx.getVelocity()}},{key:"velocityY",get:function(){return this._vy.getVelocity()}}],function(e,t){for(var r=0;r<t.length;r++){var n=t[r];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}(t.prototype,e),t}();H.version="3.13.0",H.create=function(e){return new H(e)},H.register=N,H.getAll=function(){return _.slice()},H.getById=function(e){return _.filter(function(t){return t.vars.id===e})[0]},g()&&n.registerPlugin(H);var Y,V,X,Z,q,G,W,K,Q,$,J,ee,et,er,en,ei,eo,es,ea,el,ec,eu,ed,eh,ef,ep,em,eg,ev,e_,ey,eC,ex,eb,eE,eT,ew,eO,eS=1,eA=Date.now,eP=eA(),eD=0,ez=0,eR=function(e,t,r){var n=eZ(e)&&("clamp("===e.substr(0,6)||e.indexOf("max")>-1);return r["_"+t+"Clamp"]=n,n?e.substr(6,e.length-7):e},eM=function(e,t){return t&&(!eZ(e)||"clamp("!==e.substr(0,6))?"clamp("+e+")":e},eB=function(){return er=1},eL=function(){return er=0},eF=function(e){return e},ek=function(e){return Math.round(1e5*e)/1e5||0},eU=function(){return"undefined"!=typeof window},ej=function(){return Y||eU()&&(Y=window.gsap)&&Y.registerPlugin&&Y},eI=function(e){return!!~W.indexOf(e)},eN=function(e){return("Height"===e?ey:X["inner"+e])||q["client"+e]||G["client"+e]},eH=function(e){return T(e,"getBoundingClientRect")||(eI(e)?function(){return tG.width=X.innerWidth,tG.height=ey,tG}:function(){return ti(e)})},eY=function(e,t,r){var n=r.d,i=r.d2,o=r.a;return(o=T(e,"getBoundingClientRect"))?function(){return o()[n]}:function(){return(t?eN(i):e["client"+i])||0}},eV=function(e,t){var r=t.s,n=t.d2,i=t.d,o=t.a;return Math.max(0,(o=T(e,r="scroll"+n))?o()-eH(e)()[i]:eI(e)?(q[r]||G[r])-eN(n):e[r]-e["offset"+n])},eX=function(e,t){for(var r=0;r<ea.length;r+=3)(!t||~t.indexOf(ea[r+1]))&&e(ea[r],ea[r+1],ea[r+2])},eZ=function(e){return"string"==typeof e},eq=function(e){return"function"==typeof e},eG=function(e){return"number"==typeof e},eW=function(e){return"object"==typeof e},eK=function(e,t,r){return e&&e.progress(+!t)&&r&&e.pause()},eQ=function(e,t){if(e.enabled){var r=e._ctx?e._ctx.add(function(){return t(e)}):t(e);r&&r.totalTime&&(e.callbackAnimation=r)}},e$=Math.abs,eJ="left",e0="right",e1="bottom",e2="width",e3="height",e4="Right",e5="Left",e8="Bottom",e7="padding",e9="margin",e6="Width",te="Height",tt=function(e){return X.getComputedStyle(e)},tr=function(e){var t=tt(e).position;e.style.position="absolute"===t||"fixed"===t?t:"relative"},tn=function(e,t){for(var r in t)r in e||(e[r]=t[r]);return e},ti=function(e,t){var r=t&&"matrix(1, 0, 0, 1, 0, 0)"!==tt(e)[en]&&Y.to(e,{x:0,y:0,xPercent:0,yPercent:0,rotation:0,rotationX:0,rotationY:0,scale:1,skewX:0,skewY:0}).progress(1),n=e.getBoundingClientRect();return r&&r.progress(0).kill(),n},to=function(e,t){var r=t.d2;return e["offset"+r]||e["client"+r]||0},ts=function(e){var t,r=[],n=e.labels,i=e.duration();for(t in n)r.push(n[t]/i);return r},ta=function(e){var t=Y.utils.snap(e),r=Array.isArray(e)&&e.slice(0).sort(function(e,t){return e-t});return r?function(e,n,i){var o;if(void 0===i&&(i=.001),!n)return t(e);if(n>0){for(e-=i,o=0;o<r.length;o++)if(r[o]>=e)return r[o];return r[o-1]}for(o=r.length,e+=i;o--;)if(r[o]<=e)return r[o];return r[0]}:function(r,n,i){void 0===i&&(i=.001);var o=t(r);return!n||Math.abs(o-r)<i||o-r<0==n<0?o:t(n<0?r-e:r+e)}},tl=function(e,t,r,n){return r.split(",").forEach(function(r){return e(t,r,n)})},tc=function(e,t,r,n,i){return e.addEventListener(t,r,{passive:!n,capture:!!i})},tu=function(e,t,r,n){return e.removeEventListener(t,r,!!n)},td=function(e,t,r){(r=r&&r.wheelHandler)&&(e(t,"wheel",r),e(t,"touchmove",r))},th={startColor:"green",endColor:"red",indent:0,fontSize:"16px",fontWeight:"normal"},tf={toggleActions:"play",anticipatePin:0},tp={top:0,left:0,center:.5,bottom:1,right:1},tm=function(e,t){if(eZ(e)){var r=e.indexOf("="),n=~r?(e.charAt(r-1)+1)*parseFloat(e.substr(r+1)):0;~r&&(e.indexOf("%")>r&&(n*=t/100),e=e.substr(0,r-1)),e=n+(e in tp?tp[e]*t:~e.indexOf("%")?parseFloat(e)*t/100:parseFloat(e)||0)}return e},tg=function(e,t,r,n,i,o,s,a){var l=i.startColor,c=i.endColor,u=i.fontSize,d=i.indent,h=i.fontWeight,f=Z.createElement("div"),p=eI(r)||"fixed"===T(r,"pinType"),m=-1!==e.indexOf("scroller"),g=p?G:r,v=-1!==e.indexOf("start"),_=v?l:c,y="border-color:"+_+";font-size:"+u+";color:"+_+";font-weight:"+h+";pointer-events:none;white-space:nowrap;font-family:sans-serif,Arial;z-index:1000;padding:4px 8px;border-width:0;border-style:solid;";return y+="position:"+((m||a)&&p?"fixed;":"absolute;"),(m||a||!p)&&(y+=(n===M?e0:e1)+":"+(o+parseFloat(d))+"px;"),s&&(y+="box-sizing:border-box;text-align:left;width:"+s.offsetWidth+"px;"),f._isStart=v,f.setAttribute("class","gsap-marker-"+e+(t?" marker-"+t:"")),f.style.cssText=y,f.innerText=t||0===t?e+"-"+t:e,g.children[0]?g.insertBefore(f,g.children[0]):g.appendChild(f),f._offset=f["offset"+n.op.d2],tv(f,0,n,v),f},tv=function(e,t,r,n){var i={display:"block"},o=r[n?"os2":"p2"],s=r[n?"p2":"os2"];e._isFlipped=n,i[r.a+"Percent"]=n?-100:0,i[r.a]=n?"1px":0,i["border"+o+e6]=1,i["border"+s+e6]=0,i[r.p]=t+"px",Y.set(e,i)},t_=[],ty={},tC=function(){return eA()-eD>34&&(eE||(eE=requestAnimationFrame(tj)))},tx=function(){ed&&ed.isPressed&&!(ed.startX>G.clientWidth)||(y.cache++,ed?eE||(eE=requestAnimationFrame(tj)):tj(),eD||tS("scrollStart"),eD=eA())},tb=function(){ep=X.innerWidth,ef=X.innerHeight},tE=function(e){y.cache++,(!0===e||!et&&!eu&&!Z.fullscreenElement&&!Z.webkitFullscreenElement&&(!eh||ep!==X.innerWidth||Math.abs(X.innerHeight-ef)>.25*X.innerHeight))&&K.restart(!0)},tT={},tw=[],tO=function e(){return tu(t1,"scrollEnd",e)||tF(!0)},tS=function(e){return tT[e]&&tT[e].map(function(e){return e()})||tw},tA=[],tP=function(e){for(var t=0;t<tA.length;t+=5)(!e||tA[t+4]&&tA[t+4].query===e)&&(tA[t].style.cssText=tA[t+1],tA[t].getBBox&&tA[t].setAttribute("transform",tA[t+2]||""),tA[t+3].uncache=1)},tD=function(e,t){var r;for(ei=0;ei<t_.length;ei++)(r=t_[ei])&&(!t||r._ctx===t)&&(e?r.kill(1):r.revert(!0,!0));eC=!0,t&&tP(t),t||tS("revert")},tz=function(e,t){y.cache++,(t||!eT)&&y.forEach(function(e){return eq(e)&&e.cacheID++&&(e.rec=0)}),eZ(e)&&(X.history.scrollRestoration=ev=e)},tR=0,tM=function(){if(ew!==tR){var e=ew=tR;requestAnimationFrame(function(){return e===tR&&tF(!0)})}},tB=function(){G.appendChild(e_),ey=!ed&&e_.offsetHeight||X.innerHeight,G.removeChild(e_)},tL=function(e){return Q(".gsap-marker-start, .gsap-marker-end, .gsap-marker-scroller-start, .gsap-marker-scroller-end").forEach(function(t){return t.style.display=e?"none":"block"})},tF=function(e,t){if(q=Z.documentElement,G=Z.body,W=[X,Z,q,G],eD&&!e&&!eC)return void tc(t1,"scrollEnd",tO);tB(),eT=t1.isRefreshing=!0,y.forEach(function(e){return eq(e)&&++e.cacheID&&(e.rec=e())});var r=tS("refreshInit");el&&t1.sort(),t||tD(),y.forEach(function(e){eq(e)&&(e.smooth&&(e.target.style.scrollBehavior="auto"),e(0))}),t_.slice(0).forEach(function(e){return e.refresh()}),eC=!1,t_.forEach(function(e){if(e._subPinOffset&&e.pin){var t=e.vars.horizontal?"offsetWidth":"offsetHeight",r=e.pin[t];e.revert(!0,1),e.adjustPinSpacing(e.pin[t]-r),e.refresh()}}),ex=1,tL(!0),t_.forEach(function(e){var t=eV(e.scroller,e._dir),r="max"===e.vars.end||e._endClamp&&e.end>t,n=e._startClamp&&e.start>=t;(r||n)&&e.setPositions(n?t-1:e.start,r?Math.max(n?t:e.start+1,t):e.end,!0)}),tL(!1),ex=0,r.forEach(function(e){return e&&e.render&&e.render(-1)}),y.forEach(function(e){eq(e)&&(e.smooth&&requestAnimationFrame(function(){return e.target.style.scrollBehavior="smooth"}),e.rec&&e(e.rec))}),tz(ev,1),K.pause(),tR++,eT=2,tj(2),t_.forEach(function(e){return eq(e.vars.onRefresh)&&e.vars.onRefresh(e)}),eT=t1.isRefreshing=!1,tS("refresh")},tk=0,tU=1,tj=function(e){if(2===e||!eT&&!eC){t1.isUpdating=!0,eO&&eO.update(0);var t=t_.length,r=eA(),n=r-eP>=50,i=t&&t_[0].scroll();if(tU=tk>i?-1:1,eT||(tk=i),n&&(eD&&!er&&r-eD>200&&(eD=0,tS("scrollEnd")),J=eP,eP=r),tU<0){for(ei=t;ei-- >0;)t_[ei]&&t_[ei].update(0,n);tU=1}else for(ei=0;ei<t;ei++)t_[ei]&&t_[ei].update(0,n);t1.isUpdating=!1}eE=0},tI=[eJ,"top",e1,e0,e9+e8,e9+e4,e9+"Top",e9+e5,"display","flexShrink","float","zIndex","gridColumnStart","gridColumnEnd","gridRowStart","gridRowEnd","gridArea","justifySelf","alignSelf","placeSelf","order"],tN=tI.concat([e2,e3,"boxSizing","max"+e6,"max"+te,"position",e9,e7,e7+"Top",e7+e4,e7+e8,e7+e5]),tH=function(e,t,r){tX(r);var n=e._gsap;if(n.spacerIsNative)tX(n.spacerState);else if(e._gsap.swappedIn){var i=t.parentNode;i&&(i.insertBefore(e,t),i.removeChild(t))}e._gsap.swappedIn=!1},tY=function(e,t,r,n){if(!e._gsap.swappedIn){for(var i,o=tI.length,s=t.style,a=e.style;o--;)s[i=tI[o]]=r[i];s.position="absolute"===r.position?"absolute":"relative","inline"===r.display&&(s.display="inline-block"),a[e1]=a[e0]="auto",s.flexBasis=r.flexBasis||"auto",s.overflow="visible",s.boxSizing="border-box",s[e2]=to(e,R)+"px",s[e3]=to(e,M)+"px",s[e7]=a[e9]=a.top=a[eJ]="0",tX(n),a[e2]=a["max"+e6]=r[e2],a[e3]=a["max"+te]=r[e3],a[e7]=r[e7],e.parentNode!==t&&(e.parentNode.insertBefore(t,e),t.appendChild(e)),e._gsap.swappedIn=!0}},tV=/([A-Z])/g,tX=function(e){if(e){var t,r,n=e.t.style,i=e.length,o=0;for((e.t._gsap||Y.core.getCache(e.t)).uncache=1;o<i;o+=2)r=e[o+1],t=e[o],r?n[t]=r:n[t]&&n.removeProperty(t.replace(tV,"-$1").toLowerCase())}},tZ=function(e){for(var t=tN.length,r=e.style,n=[],i=0;i<t;i++)n.push(tN[i],r[tN[i]]);return n.t=e,n},tq=function(e,t,r){for(var n,i=[],o=e.length,s=8*!!r;s<o;s+=2)n=e[s],i.push(n,n in t?t[n]:e[s+1]);return i.t=e.t,i},tG={left:0,top:0},tW=function(e,t,r,n,i,o,s,a,l,c,u,d,h,f){eq(e)&&(e=e(a)),eZ(e)&&"max"===e.substr(0,3)&&(e=d+("="===e.charAt(4)?tm("0"+e.substr(3),r):0));var p,m,g,v=h?h.time():0;if(h&&h.seek(0),isNaN(e)||(e*=1),eG(e))h&&(e=Y.utils.mapRange(h.scrollTrigger.start,h.scrollTrigger.end,0,d,e)),s&&tv(s,r,n,!0);else{eq(t)&&(t=t(a));var _,y,C,x,b=(e||"0").split(" ");(_=ti(g=B(t,a)||G)||{}).left||_.top||"none"!==tt(g).display||(x=g.style.display,g.style.display="block",_=ti(g),x?g.style.display=x:g.style.removeProperty("display")),y=tm(b[0],_[n.d]),C=tm(b[1]||"0",r),e=_[n.p]-l[n.p]-c+y+i-C,s&&tv(s,C,n,r-C<20||s._isStart&&C>20),r-=r-C}if(f&&(a[f]=e||-.001,e<0&&(e=0)),o){var E=e+r,T=o._isStart;p="scroll"+n.d2,tv(o,E,n,T&&E>20||!T&&(u?Math.max(G[p],q[p]):o.parentNode[p])<=E+1),u&&(l=ti(s),u&&(o.style[n.op.p]=l[n.op.p]-n.op.m-o._offset+"px"))}return h&&g&&(p=ti(g),h.seek(d),m=ti(g),h._caScrollDist=p[n.p]-m[n.p],e=e/h._caScrollDist*d),h&&h.seek(v),h?e:Math.round(e)},tK=/(webkit|moz|length|cssText|inset)/i,tQ=function(e,t,r,n){if(e.parentNode!==t){var i,o,s=e.style;if(t===G){for(i in e._stOrig=s.cssText,o=tt(e))+i||tK.test(i)||!o[i]||"string"!=typeof s[i]||"0"===i||(s[i]=o[i]);s.top=r,s.left=n}else s.cssText=e._stOrig;Y.core.getCache(e).uncache=1,t.appendChild(e)}},t$=function(e,t,r){var n=t,i=n;return function(t){var o=Math.round(e());return o!==n&&o!==i&&Math.abs(o-n)>3&&Math.abs(o-i)>3&&(t=o,r&&r()),i=n,n=Math.round(t)}},tJ=function(e,t,r){var n={};n[t.p]="+="+r,Y.set(e,n)},t0=function(e,t){var r=F(e,t),n="_scroll"+t.p2,i=function t(i,o,s,a,l){var c=t.tween,u=o.onComplete,d={};s=s||r();var h=t$(r,s,function(){c.kill(),t.tween=0});return l=a&&l||0,a=a||i-s,c&&c.kill(),o[n]=i,o.inherit=!1,o.modifiers=d,d[n]=function(){return h(s+a*c.ratio+l*c.ratio*c.ratio)},o.onUpdate=function(){y.cache++,t.tween&&tj()},o.onComplete=function(){t.tween=0,u&&u.call(c)},c=t.tween=Y.to(e,o)};return e[n]=r,r.wheelHandler=function(){return i.tween&&i.tween.kill()&&(i.tween=0)},tc(e,"wheel",r.wheelHandler),t1.isTouch&&tc(e,"touchmove",r.wheelHandler),i},t1=function(){function e(t,r){V||e.register(Y)||console.warn("Please gsap.registerPlugin(ScrollTrigger)"),eg(this),this.init(t,r)}return e.prototype.init=function(t,r){if(this.progress=this.start=0,this.vars&&this.kill(!0,!0),!ez){this.update=this.refresh=this.kill=eF;return}var n,i,o,s,a,l,c,u,d,h,f,p,m,g,v,_,x,b,E,w,O,S,A,P,D,z,L,k,U,j,I,N,H,V,W,K,ee,en,eo,es,ea,eu=t=tn(eZ(t)||eG(t)||t.nodeType?{trigger:t}:t,tf),ed=eu.onUpdate,eh=eu.toggleClass,ef=eu.id,ep=eu.onToggle,em=eu.onRefresh,eg=eu.scrub,ev=eu.trigger,e_=eu.pin,ey=eu.pinSpacing,eC=eu.invalidateOnRefresh,eE=eu.anticipatePin,ew=eu.onScrubComplete,eP=eu.onSnapComplete,eB=eu.once,eL=eu.snap,eU=eu.pinReparent,ej=eu.pinSpacer,eN=eu.containerAnimation,eX=eu.fastScrollEnd,eJ=eu.preventOverlaps,e0=t.horizontal||t.containerAnimation&&!1!==t.horizontal?R:M,e1=!eg&&0!==eg,tl=B(t.scroller||X),td=Y.core.getCache(tl),tp=eI(tl),tv=("pinType"in t?t.pinType:T(tl,"pinType")||tp&&"fixed")==="fixed",tC=[t.onEnter,t.onLeave,t.onEnterBack,t.onLeaveBack],tb=e1&&t.toggleActions.split(" "),tT="markers"in t?t.markers:tf.markers,tw=tp?0:parseFloat(tt(tl)["border"+e0.p2+e6])||0,tS=this,tA=t.onRefreshInit&&function(){return t.onRefreshInit(tS)},tP=eY(tl,tp,e0),tD=!tp||~C.indexOf(tl)?eH(tl):function(){return tG},tz=0,tR=0,tB=0,tL=F(tl,e0);if(tS._startClamp=tS._endClamp=!1,tS._dir=e0,eE*=45,tS.scroller=tl,tS.scroll=eN?eN.time.bind(eN):tL,l=tL(),tS.vars=t,r=r||t.animation,"refreshPriority"in t&&(el=1,-9999===t.refreshPriority&&(eO=tS)),td.tweenScroll=td.tweenScroll||{top:t0(tl,M),left:t0(tl,R)},tS.tweenTo=o=td.tweenScroll[e0.p],tS.scrubDuration=function(e){(W=eG(e)&&e)?V?V.duration(e):V=Y.to(r,{ease:"expo",totalProgress:"+=0",inherit:!1,duration:W,paused:!0,onComplete:function(){return ew&&ew(tS)}}):(V&&V.progress(1).kill(),V=0)},r&&(r.vars.lazy=!1,r._initted&&!tS.isReverted||!1!==r.vars.immediateRender&&!1!==t.immediateRender&&r.duration()&&r.render(0,!0,!0),tS.animation=r.pause(),r.scrollTrigger=tS,tS.scrubDuration(eg),N=0,ef||(ef=r.vars.id)),eL&&((!eW(eL)||eL.push)&&(eL={snapTo:eL}),"scrollBehavior"in G.style&&Y.set(tp?[G,q]:tl,{scrollBehavior:"auto"}),y.forEach(function(e){return eq(e)&&e.target===(tp?Z.scrollingElement||q:tl)&&(e.smooth=!1)}),a=eq(eL.snapTo)?eL.snapTo:"labels"===eL.snapTo?(n=r,function(e){return Y.utils.snap(ts(n),e)}):"labelsDirectional"===eL.snapTo?(i=r,function(e,t){return ta(ts(i))(e,t.direction)}):!1!==eL.directional?function(e,t){return ta(eL.snapTo)(e,eA()-tR<500?0:t.direction)}:Y.utils.snap(eL.snapTo),K=eW(K=eL.duration||{min:.1,max:2})?$(K.min,K.max):$(K,K),ee=Y.delayedCall(eL.delay||W/2||.1,function(){var e=tL(),t=eA()-tR<500,n=o.tween;if((t||10>Math.abs(tS.getVelocity()))&&!n&&!er&&tz!==e){var i,s,l=(e-u)/_,c=r&&!e1?r.totalProgress():l,h=t?0:(c-H)/(eA()-J)*1e3||0,f=Y.utils.clamp(-l,1-l,e$(h/2)*h/.185),p=l+(!1===eL.inertia?0:f),m=eL,g=m.onStart,v=m.onInterrupt,y=m.onComplete;if(eG(i=a(p,tS))||(i=p),s=Math.max(0,Math.round(u+i*_)),e<=d&&e>=u&&s!==e){if(n&&!n._initted&&n.data<=e$(s-e))return;!1===eL.inertia&&(f=i-l),o(s,{duration:K(e$(.185*Math.max(e$(p-c),e$(i-c))/h/.05||0)),ease:eL.ease||"power3",data:e$(s-e),onInterrupt:function(){return ee.restart(!0)&&v&&v(tS)},onComplete:function(){tS.update(),tz=tL(),r&&!e1&&(V?V.resetTo("totalProgress",i,r._tTime/r._tDur):r.progress(i)),N=H=r&&!e1?r.totalProgress():tS.progress,eP&&eP(tS),y&&y(tS)}},e,f*_,s-e-f*_),g&&g(tS,o.tween)}}else tS.isActive&&tz!==e&&ee.restart(!0)}).pause()),ef&&(ty[ef]=tS),(ea=(ev=tS.trigger=B(ev||!0!==e_&&e_))&&ev._gsap&&ev._gsap.stRevert)&&(ea=ea(tS)),e_=!0===e_?ev:B(e_),eZ(eh)&&(eh={targets:ev,className:eh}),e_&&(!1===ey||ey===e9||(ey=(!!ey||!e_.parentNode||!e_.parentNode.style||"flex"!==tt(e_.parentNode).display)&&e7),tS.pin=e_,(s=Y.core.getCache(e_)).spacer?x=s.pinState:(ej&&((ej=B(ej))&&!ej.nodeType&&(ej=ej.current||ej.nativeElement),s.spacerIsNative=!!ej,ej&&(s.spacerState=tZ(ej))),s.spacer=w=ej||Z.createElement("div"),w.classList.add("pin-spacer"),ef&&w.classList.add("pin-spacer-"+ef),s.pinState=x=tZ(e_)),!1!==t.force3D&&Y.set(e_,{force3D:!0}),tS.spacer=w=s.spacer,z=(I=tt(e_))[ey+e0.os2],S=Y.getProperty(e_),A=Y.quickSetter(e_,e0.a,"px"),tY(e_,w,I),E=tZ(e_)),tT){g=eW(tT)?tn(tT,th):th,p=tg("scroller-start",ef,tl,e0,g,0),m=tg("scroller-end",ef,tl,e0,g,0,p),O=p["offset"+e0.op.d2];var tF=B(T(tl,"content")||tl);h=this.markerStart=tg("start",ef,tF,e0,g,O,0,eN),f=this.markerEnd=tg("end",ef,tF,e0,g,O,0,eN),eN&&(es=Y.quickSetter([h,f],e0.a,"px")),tv||C.length&&!0===T(tl,"fixedMarkers")||(tr(tp?G:tl),Y.set([p,m],{force3D:!0}),k=Y.quickSetter(p,e0.a,"px"),j=Y.quickSetter(m,e0.a,"px"))}if(eN){var tk=eN.vars.onUpdate,tj=eN.vars.onUpdateParams;eN.eventCallback("onUpdate",function(){tS.update(0,0,1),tk&&tk.apply(eN,tj||[])})}if(tS.previous=function(){return t_[t_.indexOf(tS)-1]},tS.next=function(){return t_[t_.indexOf(tS)+1]},tS.revert=function(e,t){if(!t)return tS.kill(!0);var n=!1!==e||!tS.enabled,i=et;n!==tS.isReverted&&(n&&(en=Math.max(tL(),tS.scroll.rec||0),tB=tS.progress,eo=r&&r.progress()),h&&[h,f,p,m].forEach(function(e){return e.style.display=n?"none":"block"}),n&&(et=tS,tS.update(n)),!e_||eU&&tS.isActive||(n?tH(e_,w,x):tY(e_,w,tt(e_),L)),n||tS.update(n),et=i,tS.isReverted=n)},tS.refresh=function(n,i,s,a){if(!et&&tS.enabled||i){if(e_&&n&&eD)return void tc(e,"scrollEnd",tO);!eT&&tA&&tA(tS),et=tS,o.tween&&!s&&(o.tween.kill(),o.tween=0),V&&V.pause(),eC&&r&&(r.revert({kill:!1}).invalidate(),r.getChildren&&r.getChildren(!0,!0,!1).forEach(function(e){return e.vars.immediateRender&&e.render(0,!0,!0)})),tS.isReverted||tS.revert(!0,!0),tS._subPinOffset=!1;var g,y,C,T,O,A,z,k,j,I,N,H,X,W=tP(),K=tD(),Q=eN?eN.duration():eV(tl,e0),$=_<=.01||!_,J=0,er=a||0,ei=eW(s)?s.end:t.end,es=t.endTrigger||ev,ea=eW(s)?s.start:t.start||(0!==t.start&&ev?e_?"0 0":"0 100%":0),el=tS.pinnedContainer=t.pinnedContainer&&B(t.pinnedContainer,tS),eu=ev&&Math.max(0,t_.indexOf(tS))||0,ed=eu;for(tT&&eW(s)&&(H=Y.getProperty(p,e0.p),X=Y.getProperty(m,e0.p));ed-- >0;)(A=t_[ed]).end||A.refresh(0,1)||(et=tS),(z=A.pin)&&(z===ev||z===e_||z===el)&&!A.isReverted&&(I||(I=[]),I.unshift(A),A.revert(!0,!0)),A!==t_[ed]&&(eu--,ed--);for(eq(ea)&&(ea=ea(tS)),u=tW(ea=eR(ea,"start",tS),ev,W,e0,tL(),h,p,tS,K,tw,tv,Q,eN,tS._startClamp&&"_startClamp")||(e_?-.001:0),eq(ei)&&(ei=ei(tS)),eZ(ei)&&!ei.indexOf("+=")&&(~ei.indexOf(" ")?ei=(eZ(ea)?ea.split(" ")[0]:"")+ei:(J=tm(ei.substr(2),W),ei=eZ(ea)?ea:(eN?Y.utils.mapRange(0,eN.duration(),eN.scrollTrigger.start,eN.scrollTrigger.end,u):u)+J,es=ev)),ei=eR(ei,"end",tS),d=Math.max(u,tW(ei||(es?"100% 0":Q),es,W,e0,tL()+J,f,m,tS,K,tw,tv,Q,eN,tS._endClamp&&"_endClamp"))||-.001,J=0,ed=eu;ed--;)(z=(A=t_[ed]).pin)&&A.start-A._pinPush<=u&&!eN&&A.end>0&&(g=A.end-(tS._startClamp?Math.max(0,A.start):A.start),(z===ev&&A.start-A._pinPush<u||z===el)&&isNaN(ea)&&(J+=g*(1-A.progress)),z===e_&&(er+=g));if(u+=J,d+=J,tS._startClamp&&(tS._startClamp+=J),tS._endClamp&&!eT&&(tS._endClamp=d||-.001,d=Math.min(d,eV(tl,e0))),_=d-u||(u-=.01)&&.001,$&&(tB=Y.utils.clamp(0,1,Y.utils.normalize(u,d,en))),tS._pinPush=er,h&&J&&((g={})[e0.a]="+="+J,el&&(g[e0.p]="-="+tL()),Y.set([h,f],g)),e_&&!(ex&&tS.end>=eV(tl,e0)))g=tt(e_),T=e0===M,C=tL(),P=parseFloat(S(e0.a))+er,!Q&&d>1&&(N={style:N=(tp?Z.scrollingElement||q:tl).style,value:N["overflow"+e0.a.toUpperCase()]},tp&&"scroll"!==tt(G)["overflow"+e0.a.toUpperCase()]&&(N.style["overflow"+e0.a.toUpperCase()]="scroll")),tY(e_,w,g),E=tZ(e_),y=ti(e_,!0),k=tv&&F(tl,T?R:M)(),ey?((L=[ey+e0.os2,_+er+"px"]).t=w,(ed=ey===e7?to(e_,e0)+_+er:0)&&(L.push(e0.d,ed+"px"),"auto"!==w.style.flexBasis&&(w.style.flexBasis=ed+"px")),tX(L),el&&t_.forEach(function(e){e.pin===el&&!1!==e.vars.pinSpacing&&(e._subPinOffset=!0)}),tv&&tL(en)):(ed=to(e_,e0))&&"auto"!==w.style.flexBasis&&(w.style.flexBasis=ed+"px"),tv&&((O={top:y.top+(T?C-u:k)+"px",left:y.left+(T?k:C-u)+"px",boxSizing:"border-box",position:"fixed"})[e2]=O["max"+e6]=Math.ceil(y.width)+"px",O[e3]=O["max"+te]=Math.ceil(y.height)+"px",O[e9]=O[e9+"Top"]=O[e9+e4]=O[e9+e8]=O[e9+e5]="0",O[e7]=g[e7],O[e7+"Top"]=g[e7+"Top"],O[e7+e4]=g[e7+e4],O[e7+e8]=g[e7+e8],O[e7+e5]=g[e7+e5],b=tq(x,O,eU),eT&&tL(0)),r?(j=r._initted,ec(1),r.render(r.duration(),!0,!0),D=S(e0.a)-P+_+er,U=Math.abs(_-D)>1,tv&&U&&b.splice(b.length-2,2),r.render(0,!0,!0),j||r.invalidate(!0),r.parent||r.totalTime(r.totalTime()),ec(0)):D=_,N&&(N.value?N.style["overflow"+e0.a.toUpperCase()]=N.value:N.style.removeProperty("overflow-"+e0.a));else if(ev&&tL()&&!eN)for(y=ev.parentNode;y&&y!==G;)y._pinOffset&&(u-=y._pinOffset,d-=y._pinOffset),y=y.parentNode;I&&I.forEach(function(e){return e.revert(!1,!0)}),tS.start=u,tS.end=d,l=c=eT?en:tL(),eN||eT||(l<en&&tL(en),tS.scroll.rec=0),tS.revert(!1,!0),tR=eA(),ee&&(tz=-1,ee.restart(!0)),et=0,r&&e1&&(r._initted||eo)&&r.progress()!==eo&&r.progress(eo||0,!0).render(r.time(),!0,!0),($||tB!==tS.progress||eN||eC||r&&!r._initted)&&(r&&!e1&&(r._initted||tB||!1!==r.vars.immediateRender)&&r.totalProgress(eN&&u<-.001&&!tB?Y.utils.normalize(u,d,0):tB,!0),tS.progress=$||(l-u)/_===tB?0:tB),e_&&ey&&(w._pinOffset=Math.round(tS.progress*D)),V&&V.invalidate(),isNaN(H)||(H-=Y.getProperty(p,e0.p),X-=Y.getProperty(m,e0.p),tJ(p,e0,H),tJ(h,e0,H-(a||0)),tJ(m,e0,X),tJ(f,e0,X-(a||0))),$&&!eT&&tS.update(),!em||eT||v||(v=!0,em(tS),v=!1)}},tS.getVelocity=function(){return(tL()-c)/(eA()-J)*1e3||0},tS.endAnimation=function(){eK(tS.callbackAnimation),r&&(V?V.progress(1):r.paused()?e1||eK(r,tS.direction<0,1):eK(r,r.reversed()))},tS.labelToScroll=function(e){return r&&r.labels&&(u||tS.refresh()||u)+r.labels[e]/r.duration()*_||0},tS.getTrailing=function(e){var t=t_.indexOf(tS),r=tS.direction>0?t_.slice(0,t).reverse():t_.slice(t+1);return(eZ(e)?r.filter(function(t){return t.vars.preventOverlaps===e}):r).filter(function(e){return tS.direction>0?e.end<=u:e.start>=d})},tS.update=function(e,t,n){if(!eN||n||e){var i,s,a,h,f,m,g,v=!0===eT?en:tS.scroll(),y=e?0:(v-u)/_,C=y<0?0:y>1?1:y||0,x=tS.progress;if(t&&(c=l,l=eN?tL():v,eL&&(H=N,N=r&&!e1?r.totalProgress():C)),eE&&e_&&!et&&!eS&&eD&&(!C&&u<v+(v-c)/(eA()-J)*eE?C=1e-4:1===C&&d>v+(v-c)/(eA()-J)*eE&&(C=.9999)),C!==x&&tS.enabled){if(h=(f=(i=tS.isActive=!!C&&C<1)!=(!!x&&x<1))||!!C!=!!x,tS.direction=C>x?1:-1,tS.progress=C,h&&!et&&(s=C&&!x?0:1===C?1:1===x?2:3,e1&&(a=!f&&"none"!==tb[s+1]&&tb[s+1]||tb[s],g=r&&("complete"===a||"reset"===a||a in r))),eJ&&(f||g)&&(g||eg||!r)&&(eq(eJ)?eJ(tS):tS.getTrailing(eJ).forEach(function(e){return e.endAnimation()})),!e1&&(!V||et||eS?r&&r.totalProgress(C,!!(et&&(tR||e))):(V._dp._time-V._start!==V._time&&V.render(V._dp._time-V._start),V.resetTo?V.resetTo("totalProgress",C,r._tTime/r._tDur):(V.vars.totalProgress=C,V.invalidate().restart()))),e_)if(e&&ey&&(w.style[ey+e0.os2]=z),tv){if(h){if(m=!e&&C>x&&d+1>v&&v+1>=eV(tl,e0),eU)if(!e&&(i||m)){var T=ti(e_,!0),O=v-u;tQ(e_,G,T.top+(e0===M?O:0)+"px",T.left+(e0===M?0:O)+"px")}else tQ(e_,w);tX(i||m?b:E),U&&C<1&&i||A(P+(1!==C||m?0:D))}}else A(ek(P+D*C));!eL||o.tween||et||eS||ee.restart(!0),eh&&(f||eB&&C&&(C<1||!eb))&&Q(eh.targets).forEach(function(e){return e.classList[i||eB?"add":"remove"](eh.className)}),!ed||e1||e||ed(tS),h&&!et?(e1&&(g&&("complete"===a?r.pause().totalProgress(1):"reset"===a?r.restart(!0).pause():"restart"===a?r.restart(!0):r[a]()),ed&&ed(tS)),(f||!eb)&&(ep&&f&&eQ(tS,ep),tC[s]&&eQ(tS,tC[s]),eB&&(1===C?tS.kill(!1,1):tC[s]=0),!f&&tC[s=1===C?1:3]&&eQ(tS,tC[s])),eX&&!i&&Math.abs(tS.getVelocity())>(eG(eX)?eX:2500)&&(eK(tS.callbackAnimation),V?V.progress(1):eK(r,"reverse"===a?1:!C,1))):e1&&ed&&!et&&ed(tS)}if(j){var S=eN?v/eN.duration()*(eN._caScrollDist||0):v;k(S+ +!!p._isFlipped),j(S)}es&&es(-v/eN.duration()*(eN._caScrollDist||0))}},tS.enable=function(t,r){tS.enabled||(tS.enabled=!0,tc(tl,"resize",tE),tp||tc(tl,"scroll",tx),tA&&tc(e,"refreshInit",tA),!1!==t&&(tS.progress=tB=0,l=c=tz=tL()),!1!==r&&tS.refresh())},tS.getTween=function(e){return e&&o?o.tween:V},tS.setPositions=function(e,t,r,n){if(eN){var i=eN.scrollTrigger,o=eN.duration(),s=i.end-i.start;e=i.start+s*e/o,t=i.start+s*t/o}tS.refresh(!1,!1,{start:eM(e,r&&!!tS._startClamp),end:eM(t,r&&!!tS._endClamp)},n),tS.update()},tS.adjustPinSpacing=function(e){if(L&&e){var t=L.indexOf(e0.d)+1;L[t]=parseFloat(L[t])+e+"px",L[1]=parseFloat(L[1])+e+"px",tX(L)}},tS.disable=function(t,r){if(tS.enabled&&(!1!==t&&tS.revert(!0,!0),tS.enabled=tS.isActive=!1,r||V&&V.pause(),en=0,s&&(s.uncache=1),tA&&tu(e,"refreshInit",tA),ee&&(ee.pause(),o.tween&&o.tween.kill()&&(o.tween=0)),!tp)){for(var n=t_.length;n--;)if(t_[n].scroller===tl&&t_[n]!==tS)return;tu(tl,"resize",tE),tp||tu(tl,"scroll",tx)}},tS.kill=function(e,n){tS.disable(e,n),V&&!n&&V.kill(),ef&&delete ty[ef];var i=t_.indexOf(tS);i>=0&&t_.splice(i,1),i===ei&&tU>0&&ei--,i=0,t_.forEach(function(e){return e.scroller===tS.scroller&&(i=1)}),i||eT||(tS.scroll.rec=0),r&&(r.scrollTrigger=null,e&&r.revert({kill:!1}),n||r.kill()),h&&[h,f,p,m].forEach(function(e){return e.parentNode&&e.parentNode.removeChild(e)}),eO===tS&&(eO=0),e_&&(s&&(s.uncache=1),i=0,t_.forEach(function(e){return e.pin===e_&&i++}),i||(s.spacer=0)),t.onKill&&t.onKill(tS)},t_.push(tS),tS.enable(!1,!1),ea&&ea(tS),r&&r.add&&!_){var tI=tS.update;tS.update=function(){tS.update=tI,y.cache++,u||d||tS.refresh()},Y.delayedCall(.01,tS.update),_=.01,u=d=0}else tS.refresh();e_&&tM()},e.register=function(t){return V||(Y=t||ej(),eU()&&window.document&&e.enable(),V=ez),V},e.defaults=function(e){if(e)for(var t in e)tf[t]=e[t];return tf},e.disable=function(e,t){ez=0,t_.forEach(function(r){return r[t?"kill":"disable"](e)}),tu(X,"wheel",tx),tu(Z,"scroll",tx),clearInterval(ee),tu(Z,"touchcancel",eF),tu(G,"touchstart",eF),tl(tu,Z,"pointerdown,touchstart,mousedown",eB),tl(tu,Z,"pointerup,touchend,mouseup",eL),K.kill(),eX(tu);for(var r=0;r<y.length;r+=3)td(tu,y[r],y[r+1]),td(tu,y[r],y[r+2])},e.enable=function(){if(X=window,q=(Z=document).documentElement,G=Z.body,Y&&(Q=Y.utils.toArray,$=Y.utils.clamp,eg=Y.core.context||eF,ec=Y.core.suppressOverwrites||eF,ev=X.history.scrollRestoration||"auto",tk=X.pageYOffset||0,Y.core.globals("ScrollTrigger",e),G)){ez=1,(e_=document.createElement("div")).style.height="100vh",e_.style.position="absolute",tB(),function e(){return ez&&requestAnimationFrame(e)}(),H.register(Y),e.isTouch=H.isTouch,em=H.isTouch&&/(iPad|iPhone|iPod|Mac)/g.test(navigator.userAgent),eh=1===H.isTouch,tc(X,"wheel",tx),W=[X,Z,q,G],Y.matchMedia?(e.matchMedia=function(e){var t,r=Y.matchMedia();for(t in e)r.add(t,e[t]);return r},Y.addEventListener("matchMediaInit",function(){return tD()}),Y.addEventListener("matchMediaRevert",function(){return tP()}),Y.addEventListener("matchMedia",function(){tF(0,1),tS("matchMedia")}),Y.matchMedia().add("(orientation: portrait)",function(){return tb(),tb})):console.warn("Requires GSAP 3.11.0 or later"),tb(),tc(Z,"scroll",tx);var t,r,n=G.hasAttribute("style"),i=G.style,o=i.borderTopStyle,s=Y.core.Animation.prototype;for(s.revert||Object.defineProperty(s,"revert",{value:function(){return this.time(-.01,!0)}}),i.borderTopStyle="solid",M.m=Math.round((t=ti(G)).top+M.sc())||0,R.m=Math.round(t.left+R.sc())||0,o?i.borderTopStyle=o:i.removeProperty("border-top-style"),n||(G.setAttribute("style",""),G.removeAttribute("style")),ee=setInterval(tC,250),Y.delayedCall(.5,function(){return eS=0}),tc(Z,"touchcancel",eF),tc(G,"touchstart",eF),tl(tc,Z,"pointerdown,touchstart,mousedown",eB),tl(tc,Z,"pointerup,touchend,mouseup",eL),en=Y.utils.checkPrefix("transform"),tN.push(en),V=eA(),K=Y.delayedCall(.2,tF).pause(),ea=[Z,"visibilitychange",function(){var e=X.innerWidth,t=X.innerHeight;Z.hidden?(eo=e,es=t):(eo!==e||es!==t)&&tE()},Z,"DOMContentLoaded",tF,X,"load",tF,X,"resize",tE],eX(tc),t_.forEach(function(e){return e.enable(0,1)}),r=0;r<y.length;r+=3)td(tu,y[r],y[r+1]),td(tu,y[r],y[r+2])}},e.config=function(t){"limitCallbacks"in t&&(eb=!!t.limitCallbacks);var r=t.syncInterval;r&&clearInterval(ee)||(ee=r)&&setInterval(tC,r),"ignoreMobileResize"in t&&(eh=1===e.isTouch&&t.ignoreMobileResize),"autoRefreshEvents"in t&&(eX(tu)||eX(tc,t.autoRefreshEvents||"none"),eu=-1===(t.autoRefreshEvents+"").indexOf("resize"))},e.scrollerProxy=function(e,t){var r=B(e),n=y.indexOf(r),i=eI(r);~n&&y.splice(n,i?6:2),t&&(i?C.unshift(X,t,G,t,q,t):C.unshift(r,t))},e.clearMatchMedia=function(e){t_.forEach(function(t){return t._ctx&&t._ctx.query===e&&t._ctx.kill(!0,!0)})},e.isInViewport=function(e,t,r){var n=(eZ(e)?B(e):e).getBoundingClientRect(),i=n[r?e2:e3]*t||0;return r?n.right-i>0&&n.left+i<X.innerWidth:n.bottom-i>0&&n.top+i<X.innerHeight},e.positionInViewport=function(e,t,r){eZ(e)&&(e=B(e));var n=e.getBoundingClientRect(),i=n[r?e2:e3],o=null==t?i/2:t in tp?tp[t]*i:~t.indexOf("%")?parseFloat(t)*i/100:parseFloat(t)||0;return r?(n.left+o)/X.innerWidth:(n.top+o)/X.innerHeight},e.killAll=function(e){if(t_.slice(0).forEach(function(e){return"ScrollSmoother"!==e.vars.id&&e.kill()}),!0!==e){var t=tT.killAll||[];tT={},t.forEach(function(e){return e()})}},e}();t1.version="3.13.0",t1.saveStyles=function(e){return e?Q(e).forEach(function(e){if(e&&e.style){var t=tA.indexOf(e);t>=0&&tA.splice(t,5),tA.push(e,e.style.cssText,e.getBBox&&e.getAttribute("transform"),Y.core.getCache(e),eg())}}):tA},t1.revert=function(e,t){return tD(!e,t)},t1.create=function(e,t){return new t1(e,t)},t1.refresh=function(e){return e?tE(!0):(V||t1.register())&&tF(!0)},t1.update=function(e){return++y.cache&&tj(2*(!0===e))},t1.clearScrollMemory=tz,t1.maxScroll=function(e,t){return eV(e,t?R:M)},t1.getScrollFunc=function(e,t){return F(B(e),t?R:M)},t1.getById=function(e){return ty[e]},t1.getAll=function(){return t_.filter(function(e){return"ScrollSmoother"!==e.vars.id})},t1.isScrolling=function(){return!!eD},t1.snapDirectional=ta,t1.addEventListener=function(e,t){var r=tT[e]||(tT[e]=[]);~r.indexOf(t)||r.push(t)},t1.removeEventListener=function(e,t){var r=tT[e],n=r&&r.indexOf(t);n>=0&&r.splice(n,1)},t1.batch=function(e,t){var r,n=[],i={},o=t.interval||.016,s=t.batchMax||1e9,a=function(e,t){var r=[],n=[],i=Y.delayedCall(o,function(){t(r,n),r=[],n=[]}).pause();return function(e){r.length||i.restart(!0),r.push(e.trigger),n.push(e),s<=r.length&&i.progress(1)}};for(r in t)i[r]="on"===r.substr(0,2)&&eq(t[r])&&"onRefreshInit"!==r?a(r,t[r]):t[r];return eq(s)&&(s=s(),tc(t1,"refresh",function(){return s=t.batchMax()})),Q(e).forEach(function(e){var t={};for(r in i)t[r]=i[r];t.trigger=e,n.push(t1.create(t))}),n};var t2,t3=function(e,t,r,n){return t>n?e(n):t<0&&e(0),r>n?(n-t)/(r-t):r<0?t/(t-r):1},t4=function e(t,r){!0===r?t.style.removeProperty("touch-action"):t.style.touchAction=!0===r?"auto":r?"pan-"+r+(H.isTouch?" pinch-zoom":""):"none",t===q&&e(G,r)},t5={auto:1,scroll:1},t8=function(e){var t,r=e.event,n=e.target,i=e.axis,o=(r.changedTouches?r.changedTouches[0]:r).target,s=o._gsap||Y.core.getCache(o),a=eA();if(!s._isScrollT||a-s._isScrollT>2e3){for(;o&&o!==G&&(o.scrollHeight<=o.clientHeight&&o.scrollWidth<=o.clientWidth||!(t5[(t=tt(o)).overflowY]||t5[t.overflowX]));)o=o.parentNode;s._isScroll=o&&o!==n&&!eI(o)&&(t5[(t=tt(o)).overflowY]||t5[t.overflowX]),s._isScrollT=a}(s._isScroll||"x"===i)&&(r.stopPropagation(),r._gsapAllow=!0)},t7=function(e,t,r,n){return H.create({target:e,capture:!0,debounce:!1,lockAxis:!0,type:t,onWheel:n=n&&t8,onPress:n,onDrag:n,onScroll:n,onEnable:function(){return r&&tc(Z,H.eventTypes[0],t6,!1,!0)},onDisable:function(){return tu(Z,H.eventTypes[0],t6,!0)}})},t9=/(input|label|select|textarea)/i,t6=function(e){var t=t9.test(e.target.tagName);(t||t2)&&(e._gsapAllow=!0,t2=t)},re=function(e){eW(e)||(e={}),e.preventDefault=e.isNormalizer=e.allowClicks=!0,e.type||(e.type="wheel,touch"),e.debounce=!!e.debounce,e.id=e.id||"normalizer";var t,r,n,i,o,s,a,l,c=e,u=c.normalizeScrollX,d=c.momentum,h=c.allowNestedScroll,f=c.onRelease,p=B(e.target)||q,m=Y.core.globals().ScrollSmoother,g=m&&m.get(),v=em&&(e.content&&B(e.content)||g&&!1!==e.content&&!g.smooth()&&g.content()),_=F(p,M),C=F(p,R),x=1,b=(H.isTouch&&X.visualViewport?X.visualViewport.scale*X.visualViewport.width:X.outerWidth)/X.innerWidth,E=0,T=eq(d)?function(){return d(t)}:function(){return d||2.8},w=t7(p,e.type,!0,h),O=function(){return i=!1},S=eF,A=eF,P=function(){r=eV(p,M),A=$(+!!em,r),u&&(S=$(0,eV(p,R))),n=tR},D=function(){v._gsap.y=ek(parseFloat(v._gsap.y)+_.offset)+"px",v.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+parseFloat(v._gsap.y)+", 0, 1)",_.offset=_.cacheID=0},z=function(){if(i){requestAnimationFrame(O);var e=ek(t.deltaY/2),r=A(_.v-e);if(v&&r!==_.v+_.offset){_.offset=r-_.v;var n=ek((parseFloat(v&&v._gsap.y)||0)-_.offset);v.style.transform="matrix3d(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, "+n+", 0, 1)",v._gsap.y=n+"px",_.cacheID=y.cache,tj()}return!0}_.offset&&D(),i=!0},L=function(){P(),o.isActive()&&o.vars.scrollY>r&&(_()>r?o.progress(1)&&_(r):o.resetTo("scrollY",r))};return v&&Y.set(v,{y:"+=0"}),e.ignoreCheck=function(e){return em&&"touchmove"===e.type&&z(e)||x>1.05&&"touchstart"!==e.type||t.isGesturing||e.touches&&e.touches.length>1},e.onPress=function(){i=!1;var e=x;x=ek((X.visualViewport&&X.visualViewport.scale||1)/b),o.pause(),e!==x&&t4(p,x>1.01||!u&&"x"),s=C(),a=_(),P(),n=tR},e.onRelease=e.onGestureStart=function(e,t){if(_.offset&&D(),t){y.cache++;var n,i,s=T();u&&(i=(n=C())+-(.05*s*e.velocityX)/.227,s*=t3(C,n,i,eV(p,R)),o.vars.scrollX=S(i)),i=(n=_())+-(.05*s*e.velocityY)/.227,s*=t3(_,n,i,eV(p,M)),o.vars.scrollY=A(i),o.invalidate().duration(s).play(.01),(em&&o.vars.scrollY>=r||n>=r-1)&&Y.to({},{onUpdate:L,duration:s})}else l.restart(!0);f&&f(e)},e.onWheel=function(){o._ts&&o.pause(),eA()-E>1e3&&(n=0,E=eA())},e.onChange=function(e,t,r,i,o){if(tR!==n&&P(),t&&u&&C(S(i[2]===t?s+(e.startX-e.x):C()+t-i[1])),r){_.offset&&D();var l=o[2]===r,c=l?a+e.startY-e.y:_()+r-o[1],d=A(c);l&&c!==d&&(a+=d-c),_(d)}(r||t)&&tj()},e.onEnable=function(){t4(p,!u&&"x"),t1.addEventListener("refresh",L),tc(X,"resize",L),_.smooth&&(_.target.style.scrollBehavior="auto",_.smooth=C.smooth=!1),w.enable()},e.onDisable=function(){t4(p,!0),tu(X,"resize",L),t1.removeEventListener("refresh",L),w.kill()},e.lockAxis=!1!==e.lockAxis,(t=new H(e)).iOS=em,em&&!_()&&_(1),em&&Y.ticker.add(eF),l=t._dc,o=Y.to(t,{ease:"power4",paused:!0,inherit:!1,scrollX:u?"+=0.1":"+=0",scrollY:"+=0.1",modifiers:{scrollY:t$(_,_(),function(){return o.pause()})},onUpdate:tj,onComplete:l.vars.onComplete}),t};t1.sort=function(e){if(eq(e))return t_.sort(e);var t=X.pageYOffset||0;return t1.getAll().forEach(function(e){return e._sortY=e.trigger?t+e.trigger.getBoundingClientRect().top:e.start+X.innerHeight}),t_.sort(e||function(e,t){return -1e6*(e.vars.refreshPriority||0)+(e.vars.containerAnimation?1e6:e._sortY)-((t.vars.containerAnimation?1e6:t._sortY)+-1e6*(t.vars.refreshPriority||0))})},t1.observe=function(e){return new H(e)},t1.normalizeScroll=function(e){if(void 0===e)return ed;if(!0===e&&ed)return ed.enable();if(!1===e){ed&&ed.kill(),ed=e;return}var t=e instanceof H?e:re(e);return ed&&ed.target===t.target&&ed.kill(),eI(t.target)&&(ed=t),t},t1.core={_getVelocityProp:k,_inputObserver:t7,_scrollers:y,_proxies:C,bridge:{ss:function(){eD||tS("scrollStart"),eD=eA()},ref:function(){return et}}},ej()&&Y.registerPlugin(t1)}}]);