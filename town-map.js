(() => {
  const stage = document.querySelector('[data-neighborhood-section]');
  if (!stage || !('IntersectionObserver' in window) || !('ResizeObserver' in window)) return;

  const layer = stage.querySelector('[data-town-map]');
  const canvas = layer.querySelector('canvas');
  const controls = stage.querySelector('[data-map-ui]');
  const surface = stage.querySelector('[data-map-surface]');
  const pauseButton = stage.querySelector('[data-map-pause]');
  const status = stage.querySelector('[data-map-status]');
  const reducedMotion = matchMedia('(prefers-reduced-motion: reduce)');
  const world = [1040, 570];
  const frameInterval = 1000 / 30;
  const moveDuration = 6.8;
  const inactive = [-1200, -1200, 0, 0];
  const css = getComputedStyle(document.documentElement);
  const palette = Object.fromEntries(Object.entries({
    ink: '--primary-dark-1', stone: '--primary-dark-3', rust: '--primary-brand-2',
    orange: '--primary-brand-1', sand: '--primary-light-3', paper: '--primary-light-1',
  }).map(([name, variable]) => [name, css.getPropertyValue(variable).trim()]));
  const lerp = (a, b, t) => a + (b - a) * t;
  const limit = (value, min, max) => Math.min(max, Math.max(min, value));
  const easing = (value) => {
    const t = limit(value, 0, 1);
    return t * t * (3 - 2 * t);
  };

  // A hand-laid village network, with a bend in the river and lanes joining at irregular angles.
  const roads = [
    [16, [[-25,456],[69,421],[135,376],[223,337],[317,325],[406,349],[492,313],[581,254],[664,223],[755,242],[817,271],[907,224],[1060,187]]],
    [10, [[151,589],[212,531],[245,474],[268,409],[307,357],[317,325],[313,262],[278,211],[232,152],[210,106],[190,-20]]],
    [9, [[-20,107],[95,146],[166,199],[241,225],[328,230],[401,207],[455,161],[487,102],[526,69],[621,-20]]],
    [10, [[458,590],[499,537],[538,491],[566,432],[545,369],[492,313],[482,253],[512,212],[554,181],[561,123],[535,67]]],
    [9, [[778,588],[739,515],[675,477],[622,436],[608,373],[622,313],[649,269],[664,223],[646,165],[666,92],[718,-20]]],
    [7, [[-20,286],[77,270],[133,290],[164,330],[135,376],[122,441],[95,510],[53,581]]],
    [7, [[214,531],[301,500],[377,501],[432,463],[452,410],[429,366],[406,349]]],
    [7, [[401,207],[420,258],[453,284],[492,313]]],
    [7, [[906,224],[934,295],[914,346],[923,411],[974,469],[1060,490]]],
    [6, [[566,432],[523,416],[477,400],[452,410],[413,428],[363,412],[334,381],[307,357]]],
  ].map(([width, knots]) => ({ width, ...pathFrom(knots) }));

  const river = pathFrom([[653,-45],[696,52],[740,116],[745,174],[755,242],[770,301],[809,375],[823,430],[796,502],[820,610]]);
  const church = { x: 461, y: 248, width: 29, height: 18, angle: -0.8 };
  const roofs = [church];

  function pathFrom(knots) {
    const points = [];
    for (let index = 0; index < knots.length - 1; index += 1) {
      const a = knots[Math.max(0, index - 1)];
      const b = knots[index];
      const c = knots[index + 1];
      const d = knots[Math.min(knots.length - 1, index + 2)];
      for (let step = 0; step < 8; step += 1) {
        const t = step / 8;
        points.push(b.map((value, axis) => (
          2 * value + (c[axis] - a[axis]) * t
          + (2 * a[axis] - 5 * value + 4 * c[axis] - d[axis]) * t * t
          + (-a[axis] + 3 * value - 3 * c[axis] + d[axis]) * t * t * t
        ) / 2));
      }
    }
    points.push(knots.at(-1));
    const distances = [0];
    for (let index = 1; index < points.length; index += 1) {
      distances.push(distances[index - 1] + Math.hypot(
        points[index][0] - points[index - 1][0], points[index][1] - points[index - 1][1],
      ));
    }
    return { points, distances, length: distances.at(-1) };
  }

  function sample(path, distance) {
    const progress = limit(distance, 0, path.length);
    const end = Math.max(1, path.distances.findIndex((value) => value >= progress));
    const [ax, ay] = path.points[end - 1];
    const [bx, by] = path.points[end];
    const amount = (progress - path.distances[end - 1]) / (path.distances[end] - path.distances[end - 1]);
    return { x: lerp(ax, bx, amount), y: lerp(ay, by, amount), angle: Math.atan2(by - ay, bx - ax) };
  }

  function project(path, x, y) {
    let nearest = { error: Infinity };
    for (let index = 1; index < path.points.length; index += 1) {
      const [ax, ay] = path.points[index - 1];
      const [bx, by] = path.points[index];
      const dx = bx - ax;
      const dy = by - ay;
      const amount = limit(((x - ax) * dx + (y - ay) * dy) / (dx * dx + dy * dy), 0, 1);
      const error = Math.hypot(x - (ax + dx * amount), y - (ay + dy * amount));
      if (error < nearest.error) {
        nearest = { path, error, distance: lerp(path.distances[index - 1], path.distances[index], amount) };
      }
    }
    return nearest;
  }

  let seed = 71;
  function random() {
    seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
    return seed / 4294967296;
  }

  for (const road of roads) {
    for (const side of [-1, 1]) {
      for (let distance = 18; distance < road.length - 10; distance += 19 + random() * 18) {
        const spot = sample(road, distance);
        const offset = road.width * 0.5 + 11 + random() * 13;
        const x = spot.x - Math.sin(spot.angle) * offset * side;
        const y = spot.y + Math.cos(spot.angle) * offset * side;
        const width = 10 + random() * 15;
        const height = 8 + random() * 11;
        const radius = Math.min(width, height) * 0.5;

        if (x < 10 || x > world[0] - 10 || y < 10 || y > world[1] - 10) continue;
        if (project(river, x, y).error < 29) continue;
        if (roads.some((path) => project(path, x, y).error < path.width / 2 + radius + 3)) continue;
        if (roofs.some((roof) => Math.hypot(roof.x - x, roof.y - y) < (roof.width + width) * 0.49 + 2)) continue;
        roofs.push({ x, y, width, height, angle: spot.angle + (random() - 0.5) * 0.51 });
      }
    }
  }

  function drawVillage() {
    const art = document.createElement('canvas');
    [art.width, art.height] = world;
    const pen = art.getContext('2d');
    const fields = [
      [[0,0],[295,0],[220,79],[153,100],[0,74]],
      [[0,188],[116,200],[153,233],[130,258],[0,255]],
      [[33,525],[100,465],[147,481],[175,532],[127,570],[0,570]],
      [[325,520],[395,518],[457,483],[489,526],[434,570],[309,570]],
      [[807,0],[1040,0],[1040,152],[941,176],[827,150],[796,94]],
      [[858,370],[891,372],[900,425],[955,489],[1040,515],[1040,570],[865,570],[839,506]],
    ];
    pen.fillStyle = palette.sand;
    pen.fillRect(0, 0, ...world);
    pen.lineCap = 'round';
    pen.lineJoin = 'round';

    function line(points, colour, width, alpha, close = false) {
      pen.beginPath();
      points.forEach(([x, y], index) => index ? pen.lineTo(x, y) : pen.moveTo(x, y));
      if (close) pen.closePath();
      pen.globalAlpha = alpha;
      pen.strokeStyle = colour;
      pen.lineWidth = width;
      pen.stroke();
    }

    fields.forEach((points, index) => {
      pen.beginPath();
      points.forEach(([x, y], i) => i ? pen.lineTo(x, y) : pen.moveTo(x, y));
      pen.closePath();
      pen.globalAlpha = 0.14 + (index % 3) * 0.045;
      pen.fillStyle = palette.rust;
      pen.fill();
      pen.save();
      pen.clip();
      for (let row = -100; row < 750; row += 10) {
        line([[0, row], [1040, row - 260]], palette.rust, 0.85, 0.26);
      }
      pen.restore();
    });

    for (let contour = 0; contour < 9; contour += 1) {
      const y = contour * 13;
      line(pathFrom([[0, y + 30], [85, y + 16], [149, y + 27], [208, y + 21], [279, y - 14]]).points,
        palette.stone, 0.65, 0.23);
    }
    fields.forEach((points) => line(points, palette.stone, 0.8, 0.32, true));
    line(river.points, palette.stone, 55, 0.54);
    line(river.points, palette.stone, 48, 0.58);
    line(river.points.map(([x, y]) => [x + 6, y]), palette.paper, 1.4, 0.39);

    roads.forEach((road) => line(road.points, palette.stone, road.width + 2, 0.52));
    roads.forEach((road) => line(road.points, palette.paper, road.width, 1));

    roofs.forEach((roof, index) => {
      const { x, y, width, height, angle } = roof;
      pen.save();
      pen.translate(x, y);
      pen.rotate(angle);
      pen.globalAlpha = 0.21;
      pen.fillStyle = palette.ink;
      pen.fillRect(-width / 2 + 2, -height / 2 + 2, width, height);
      pen.globalAlpha = 0.62 + (index % 4) * 0.07;
      pen.fillStyle = index % 5 ? palette.rust : palette.stone;
      pen.fillRect(-width / 2, -height / 2, width, height);
      pen.globalAlpha = 0.29;
      pen.fillStyle = palette.paper;
      pen.fillRect(-width / 2, -height / 2, width, height / 2);
      line([[-width / 2, 0], [width / 2, 0]], palette.paper, 0.85, 0.75);
      if (roof === church) {
        pen.globalAlpha = 0.86;
        pen.fillStyle = palette.stone;
        pen.fillRect(-width / 2 - 8, -5, 10, 10);
        line([[-width / 2 - 7, 0], [-width / 2, 0]], palette.paper, 0.9, 0.85);
        line([[-width / 2 - 3.5, -3.4], [-width / 2 - 3.5, 3.4]], palette.paper, 0.9, 0.85);
      }
      pen.restore();
    });
    return art;
  }

  const fragment = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform sampler2D u_map;
uniform vec2 u_size;
uniform vec4 u_view;
uniform vec4 u_hover;
uniform vec4 u_selected;
uniform vec2 u_roofAngles;
uniform vec4 u_car1;
uniform vec4 u_car2;
uniform vec4 u_truck;
uniform vec4 u_family;
uniform vec3 u_ink;
uniform vec3 u_rust;
uniform vec3 u_orange;
uniform vec3 u_paper;

vec2 rotate(vec2 p, float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c) * p;
}
float box(vec2 p, vec2 size, float corner) {
  vec2 edge = abs(p) - size + corner;
  return min(max(edge.x, edge.y), 0.0) + length(max(edge, 0.0)) - corner;
}
float fill(float edge, float pixel) {
  return 1.0 - smoothstep(-pixel, pixel, edge);
}
vec3 highlight(vec3 colour, vec2 p, vec4 roof, float angle, float strength, float pixel) {
  if (distance(p, roof.xy) > 32.0) return colour;
  vec2 at = rotate(p - roof.xy, angle);
  float edge = box(at, roof.zw, 1.3);
  colour = mix(colour, u_orange, fill(edge, pixel) * strength);
  float border = fill(abs(box(at, roof.zw + 2.8, 2.0)) - 0.65, pixel);
  return mix(colour, u_rust, border * strength);
}
vec3 vehicle(vec3 colour, vec2 p, vec4 pose, float size, bool truck, float pixel) {
  if (pose.w < 0.5 || distance(p, pose.xy) > 24.0) return colour;
  vec2 q = rotate(p - pose.xy, pose.z);
  colour = mix(colour, u_ink, fill(box(q + vec2(-1.3, -1.7), vec2(size + 1.1, 4.8), 2.0), pixel) * 0.8);
  float base = fill(box(q, vec2(size, 4.2), 2.0), pixel);
  colour = mix(colour, truck ? u_rust : u_paper, base);
  float cab = fill(box(q - vec2(size * 0.56, 0.0), vec2(1.8, 3.2), 0.6), pixel);
  if (truck) {
    float cargo = fill(box(q + vec2(3.0, 0.0), vec2(size * 0.62, 3.55), 0.8), pixel);
    colour = mix(colour, u_paper, cargo);
    colour = mix(colour, u_orange, fill(box(q - vec2(size * 0.74, 0.0), vec2(2.35, 3.55), 0.8), pixel));
  }
  return mix(colour, u_ink, cab * 0.85);
}
vec3 person(vec3 colour, vec2 p, float size, float stepTime, vec3 coat, float pixel) {
  float gait = sin(stepTime * 16.0) * 0.6;
  float shoes = min(length(p - vec2(-1.1, 2.9 + gait)), length(p - vec2(1.1, 2.9 - gait)));
  colour = mix(colour, u_ink, fill(shoes - 0.75, pixel));
  colour = mix(colour, coat, fill(box(p, vec2(size, size * 0.88), 1.05), pixel));
  return mix(colour, u_paper, fill(length(p - vec2(0.0, -1.65)) - size * 0.43, pixel));
}

void main() {
  vec2 uv = gl_FragCoord.xy / u_size;
  vec2 p = u_view.xy + vec2(uv.x, 1.0 - uv.y) * u_view.zw;
  float pixel = u_view.w / u_size.y;
  vec3 colour = texture2D(u_map, p / vec2(1040.0, 570.0)).rgb;
  colour = highlight(colour, p, u_hover, u_roofAngles.x, 0.68, pixel);
  colour = highlight(colour, p, u_selected, u_roofAngles.y, 1.0, pixel);
  colour = vehicle(colour, p, u_car1, 6.7, false, pixel);
  colour = vehicle(colour, p, u_car2, 6.7, false, pixel);
  colour = vehicle(colour, p, u_truck, 13.0, true, pixel);
  if (u_family.w > 0.5 && distance(p, u_family.xy) < 20.0) {
    vec2 q = p - u_family.xy;
    colour = person(colour, q + vec2(5.2, -2.1), 2.4, u_family.z, u_rust, pixel);
    colour = person(colour, q + vec2(-4.8, 4.3), 2.2, u_family.z + 0.3, u_ink, pixel);
    colour = person(colour, q + vec2(-6.0, -3.0), 1.65, u_family.z + 0.6, u_rust, pixel);
    colour = mix(colour, u_paper, fill(box(q + vec2(8.0, -1.0), vec2(1.95), 0.24), pixel));
  }
  gl_FragColor = vec4(colour, 1.0);
}
`;

  function makeRenderer(gl, art) {
    function compile(type, source) {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const error = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(error);
      }
      return shader;
    }

    const program = gl.createProgram();
    const vertex = compile(gl.VERTEX_SHADER, 'attribute vec2 a_position; void main() { gl_Position = vec4(a_position, 0.0, 1.0); }');
    const pixel = compile(gl.FRAGMENT_SHADER, fragment);
    gl.attachShader(program, vertex);
    gl.attachShader(program, pixel);
    gl.linkProgram(program);
    gl.deleteShader(vertex);
    gl.deleteShader(pixel);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program));
    gl.useProgram(program);

    const triangle = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, triangle);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const attribute = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(attribute);
    gl.vertexAttribPointer(attribute, 2, gl.FLOAT, false, 0, 0);

    const texture = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, texture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, art);
    gl.uniform1i(gl.getUniformLocation(program, 'u_map'), 0);

    for (const name of ['ink', 'rust', 'orange', 'paper']) {
      const channels = palette[name].slice(1).match(/../g).map((channel) => parseInt(channel, 16) / 255);
      gl.uniform3fv(gl.getUniformLocation(program, 'u_' + name), channels);
    }

    const uniforms = Object.fromEntries(['size', 'view', 'hover', 'selected', 'roofAngles', 'car1', 'car2', 'truck', 'family']
      .map((name) => [name, gl.getUniformLocation(program, 'u_' + name)]));
    const rectangle = (roof) => roof ? [roof.x, roof.y, roof.width / 2, roof.height / 2] : inactive;
    return (width, height, view, hover, selected, cars, truck, family) => {
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }
      gl.viewport(0, 0, width, height);
      gl.uniform2f(uniforms.size, width, height);
      gl.uniform4fv(uniforms.view, view);
      gl.uniform4fv(uniforms.hover, rectangle(hover));
      gl.uniform4fv(uniforms.selected, rectangle(selected));
      gl.uniform2f(uniforms.roofAngles, hover?.angle || 0, selected?.angle || 0);
      gl.uniform4fv(uniforms.car1, cars[0]);
      gl.uniform4fv(uniforms.car2, cars[1]);
      gl.uniform4fv(uniforms.truck, truck);
      gl.uniform4fv(uniforms.family, family);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };
  }

  const messages = {
    choose: ['Choose a roof to see move-in day.', 'Wählen Sie ein Dach, um den Einzug zu sehen.', 'Kies een dak en bekijk de verhuizing.'],
    driving: ['A moving truck is on its way.', 'Der Umzugswagen ist unterwegs.', 'De verhuiswagen is onderweg.'],
    unloading: ['The family is unloading boxes.', 'Die Familie lädt die Kisten aus.', 'Het gezin laadt de dozen uit.'],
    home: ['The family has moved in.', 'Die Familie ist eingezogen.', 'Het gezin is ingetrokken.'],
  };
  let renderer;
  let inView = false;
  let paused = false;
  let frame = 0;
  let lastFrame;
  let elapsed = 0;
  let hovered;
  let move;
  let message = 'choose';
  let viewport;

  function nearestRoof(x, y) {
    return roofs.reduce((nearest, roof) => (
      Math.hypot(x - roof.x, y - roof.y) < Math.hypot(x - nearest.x, y - nearest.y) ? roof : nearest
    ));
  }

  function renderControls() {
    status.textContent = siteLanguage.text(...messages[message]);
    const pauseLabel = paused
      ? siteLanguage.text('Resume map', 'Karte fortsetzen', 'Kaart hervatten')
      : siteLanguage.text('Pause map', 'Karte pausieren', 'Kaart pauzeren');
    pauseButton.setAttribute('aria-label', pauseLabel);
    pauseButton.title = pauseLabel;
    pauseButton.toggleAttribute('data-paused', paused);
    surface.setAttribute('aria-label', siteLanguage.text('Play move-in on the illustrated map', 'Einzug auf der illustrierten Karte abspielen', 'Bekijk de verhuizing op de geïllustreerde kaart'));
  }

  function carAt(path, offset, speed, time) {
    const pose = sample(path, (offset + time * speed) % path.length);
    return [pose.x - 2 * Math.sin(pose.angle), pose.y + 2 * Math.cos(pose.angle), pose.angle, 1];
  }

  function movingActors() {
    if (!move) return [inactive, inactive];
    const { roof, route, start, direction, span, age } = move;
    const driveEnd = 3.4;
    const unloadAt = 4.05;
    if (age < driveEnd) {
      const progress = start + direction * span * easing(age / driveEnd);
      const onRoad = sample(route.path, progress);
      return [[onRoad.x, onRoad.y, onRoad.angle + (direction < 0 ? Math.PI : 0), 1], inactive];
    }

    const onRoad = sample(route.path, route.distance);
    const turn = easing((age - driveEnd) / (unloadAt - driveEnd));
    const dx = roof.x - onRoad.x;
    const dy = roof.y - onRoad.y;
    const angle = Math.atan2(dy, dx);
    const from = onRoad.angle + (direction < 0 ? Math.PI : 0);
    const difference = Math.atan2(Math.sin(angle - from), Math.cos(angle - from));
    const parking = [onRoad.x + dx * 0.38 * turn, onRoad.y + dy * 0.38 * turn, from + difference * turn, 1];

    if (age < unloadAt) return [parking, inactive];
    const walk = easing((age - unloadAt) / 1.85);
    const family = [
      onRoad.x + dx * lerp(0.28, 0.81, walk) - Math.sin(angle) * 7,
      onRoad.y + dy * lerp(0.28, 0.81, walk) + Math.cos(angle) * 7,
      Math.min(age - unloadAt, 1.85), 1,
    ];
    return [parking, family];
  }

  function draw() {
    if (!renderer || !viewport) return;
    const still = reducedMotion.matches;
    const time = still ? 0 : elapsed;
    const [truck, family] = still ? [inactive, inactive] : movingActors();
    const cars = [carAt(roads[0], 340, 13, time), carAt(roads[4], 230, 10, time)];
    renderer(viewport.resolutionX, viewport.resolutionY, viewport.view, still ? null : hovered,
      still ? null : move?.roof, cars, truck, family);
  }

  function measure() {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    const [mapWidth, mapHeight] = world;
    const aspect = width / height;
    const viewWidth = Math.min(mapWidth, mapHeight * aspect);
    const viewHeight = Math.min(mapHeight, mapWidth / aspect);
    const ratio = Math.min(devicePixelRatio || 1, 1.5);
    viewport = {
      width, height,
      resolutionX: Math.floor(width * ratio),
      resolutionY: Math.floor(height * ratio),
      view: [(mapWidth - viewWidth) / 2, (mapHeight - viewHeight) / 2, viewWidth, viewHeight],
    };
  }

  function animate(now) {
    frame = 0;
    if (!renderer || !inView || document.hidden || reducedMotion.matches || paused) return;
    if (lastFrame === undefined || now - lastFrame >= frameInterval) {
      const delta = lastFrame === undefined ? 0 : (now - lastFrame) / 1000;
      lastFrame = now;
      elapsed += delta;
      if (move && move.age < moveDuration) {
        move.age = Math.min(moveDuration, move.age + delta);
        const nextMessage = move.age === moveDuration ? 'home' : move.age >= 4.05 ? 'unloading' : 'driving';
        if (nextMessage !== message) {
          message = nextMessage;
          renderControls();
        }
      }
      draw();
    }
    frame = requestAnimationFrame(animate);
  }

  function syncMotion() {
    if (frame) cancelAnimationFrame(frame);
    frame = 0;
    lastFrame = undefined;
    const interactive = Boolean(renderer) && !reducedMotion.matches;
    surface.hidden = !interactive;
    pauseButton.hidden = !interactive;
    status.hidden = !interactive;
    if (!renderer || !inView || document.hidden) return;
    if (reducedMotion.matches || paused) draw();
    else frame = requestAnimationFrame(animate);
  }

  function roofAt(event) {
    if (!viewport) return nearestRoof(385, 243);
    const [x, y, width, height] = viewport.view;
    if (event.detail === 0 && event.type === 'click') return nearestRoof(x + width * 0.34, y + height * 0.38);
    const bounds = canvas.getBoundingClientRect();
    return nearestRoof(x + (event.clientX - bounds.left) * width / viewport.width,
      y + (event.clientY - bounds.top) * height / viewport.height);
  }

  surface.addEventListener('pointermove', (event) => {
    if (paused || reducedMotion.matches || event.pointerType === 'touch') return;
    hovered = roofAt(event);
  }, { passive: true });
  surface.addEventListener('pointerleave', () => { hovered = null; });
  surface.addEventListener('click', (event) => {
    if (!renderer || reducedMotion.matches) return;
    const roof = roofAt(event);
    const route = roads.map((road) => project(road, roof.x, roof.y))
      .reduce((best, candidate) => candidate.error < best.error ? candidate : best);
    const direction = route.distance > 90 ? 1 : -1;
    const span = Math.min(157, direction > 0 ? route.distance : route.path.length - route.distance);
    move = { roof, route, direction, span, start: route.distance - span * direction, age: paused ? moveDuration : 0 };
    message = paused ? 'home' : 'driving';
    renderControls();
    if (paused) draw();
  });
  pauseButton.addEventListener('click', () => {
    paused = !paused;
    hovered = null;
    renderControls();
    syncMotion();
  });
  document.addEventListener('languagechange', renderControls);
  renderControls();

  const art = drawVillage();
  layer.hidden = false;
  controls.hidden = false;
  let gl;
  try {
    gl = canvas.getContext('webgl', { alpha: false, antialias: false, depth: false, stencil: false, powerPreference: 'low-power' });
  } catch {
    gl = null;
  }
  if (!gl) {
    const still = canvas.getContext('2d');
    function paintStill() {
      measure();
      if (!still || !viewport) return;
      [canvas.width, canvas.height] = [viewport.resolutionX, viewport.resolutionY];
      still.drawImage(art, ...viewport.view, 0, 0, canvas.width, canvas.height);
    }
    new ResizeObserver(paintStill).observe(stage);
    paintStill();
    return;
  }

  function restoreMap() {
    try {
      renderer = makeRenderer(gl, art);
    } catch (error) {
      renderer = null;
      canvas.hidden = true;
      console.warn('The illustrated map is using its CSS fallback.', error);
    }
    if (renderer) canvas.hidden = false;
    measure();
    syncMotion();
  }

  canvas.addEventListener('webglcontextlost', (event) => {
    event.preventDefault();
    renderer = null;
    canvas.hidden = true;
    syncMotion();
  });
  canvas.addEventListener('webglcontextrestored', restoreMap);
  new IntersectionObserver(([entry]) => {
    inView = entry.isIntersecting && entry.intersectionRatio > 0;
    syncMotion();
  }).observe(stage);
  new ResizeObserver(() => {
    measure();
    if (inView && !document.hidden && (paused || reducedMotion.matches)) draw();
  }).observe(stage);
  window.addEventListener('resize', measure, { passive: true });
  document.addEventListener('visibilitychange', syncMotion);
  reducedMotion.addEventListener('change', syncMotion);
  restoreMap();
})();

