uniform sampler2D source;
uniform sampler2D diffuse;
uniform float time;

varying vec2 vUv;

// method from 
// https://stackoverflow.com/a/72973369
vec4 blendOver(vec4 a, vec4 b) {
    float newAlpha = mix(b.w, 1.0, a.w);
    vec3 newColor = mix(b.w * b.xyz, a.xyz, a.w);
    float divideFactor = (newAlpha > 0.00001 ? (1.0 / newAlpha) : 1.0);
    return vec4(divideFactor * newColor, newAlpha);
}

void main() {

    // sample the source texture (the source rendertarget)
    vec4 a = texture2D(source, vUv);

    // sample the input texture (pingpong input) 
    vec4 b = texture2D(diffuse, vUv);

    // do something (resample the feedback texture)
    float t = time * 0.5;
    vec2 move = normalize(vec2(cos(t), sin(t)));
    vec2 delta = vec2(((b.xy - .5) + move) * 0.005);
    b = texture2D(diffuse, vUv + delta);

    // blend the source texture over the feedback texture
    gl_FragColor = blendOver(a, b);

}