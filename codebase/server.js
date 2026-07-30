const http = require('http');
const fs = require('fs/promises');
const path = require('path');

const rootDir = __dirname;
const dataDir = path.join(rootDir, 'data');
const profilesJsonPath = path.join(dataDir, 'mock_profiles.json');
const profilesJsPath = path.join(dataDir, 'mock_profiles.js');
const port = Number(process.env.PORT || 3000);

const mimeTypes = {
  '.html': 'text/html; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.svg': 'image/svg+xml; charset=utf-8'
};

function sendJson(res, statusCode, payload) {
  res.writeHead(statusCode, { 'Content-Type': 'application/json; charset=utf-8' });
  res.end(JSON.stringify(payload));
}

async function readProfiles() {
  const raw = await fs.readFile(profilesJsonPath, 'utf8');
  return JSON.parse(raw);
}

async function writeProfiles(data) {
  data.total = data.profiles.length;
  data.generatedAt = new Date().toISOString();
  const jsonText = `${JSON.stringify(data, null, 2)}\n`;
  const jsText = `const MOCK_PROFILES_DATA = ${JSON.stringify(data, null, 2)};\n`;
  await fs.writeFile(profilesJsonPath, jsonText, 'utf8');
  await fs.writeFile(profilesJsPath, jsText, 'utf8');
}

function getNextStudentId(profiles) {
  const maxNumber = profiles.reduce((max, profile) => {
    const match = String(profile.id || '').match(/^MP(\d+)$/);
    return match ? Math.max(max, Number(match[1])) : max;
  }, 0);
  return `MP${String(maxNumber + 1).padStart(4, '0')}`;
}

function readBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', chunk => {
      body += chunk;
      if (body.length > 1024 * 1024) {
        reject(new Error('Request body too large'));
        req.destroy();
      }
    });
    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

function normalizeSkills(skills) {
  if (!Array.isArray(skills)) return [];
  const seen = new Set();
  return skills
    .map(skill => ({
      name: String(skill.name || '').trim(),
      level: Math.max(1, Math.min(5, Number(skill.level) || 3))
    }))
    .filter(skill => {
      if (!skill.name || seen.has(skill.name)) return false;
      seen.add(skill.name);
      return true;
    });
}

async function handleProfilesPost(req, res) {
  try {
    const body = await readBody(req);
    const input = JSON.parse(body || '{}');
    const data = await readProfiles();

    if (!Array.isArray(data.profiles)) {
      throw new Error('mock_profiles.json has invalid profiles schema');
    }

    const displayName = String(input.displayName || '').trim();
    const skills = normalizeSkills(input.skills);

    if (!displayName) {
      sendJson(res, 400, { error: 'displayName is required' });
      return;
    }
    if (skills.length === 0) {
      sendJson(res, 400, { error: 'At least one skill is required' });
      return;
    }

    const id = getNextStudentId(data.profiles);
    const newProfile = {
      id,
      displayName,
      email: String(input.email || '').trim() || `${id.toLowerCase()}@example.com`,
      skills,
      desiredRoles: Array.isArray(input.desiredRoles) && input.desiredRoles.length > 0
        ? input.desiredRoles.map(role => String(role).trim()).filter(Boolean)
        : ['Developer'],
      interests: Array.isArray(input.interests) ? input.interests.map(item => String(item).trim()).filter(Boolean) : [],
      currentIndustry: String(input.currentIndustry || '').trim() || 'Sinh viên',
      yearsOfExperience: Math.max(0, Number(input.yearsOfExperience) || 0),
      availability: String(input.availability || '').trim() || 'part_time',
      location: String(input.location || '').trim() || 'Remote',
      notes: String(input.notes || '').trim() || 'Hồ sơ được tạo từ form Chia Role Nhóm.'
    };

    data.profiles.push(newProfile);
    await writeProfiles(data);
    sendJson(res, 201, { profile: newProfile, data });
  } catch (err) {
    sendJson(res, 500, { error: err.message });
  }
}

async function serveStatic(req, res) {
  const requestUrl = new URL(req.url, `http://${req.headers.host}`);
  const pathname = requestUrl.pathname === '/' ? '/index.html' : decodeURIComponent(requestUrl.pathname);
  const filePath = path.normalize(path.join(rootDir, pathname));

  if (!filePath.startsWith(rootDir)) {
    res.writeHead(403);
    res.end('Forbidden');
    return;
  }

  try {
    const content = await fs.readFile(filePath);
    const ext = path.extname(filePath);
    res.writeHead(200, { 'Content-Type': mimeTypes[ext] || 'application/octet-stream' });
    res.end(content);
  } catch (err) {
    res.writeHead(err.code === 'ENOENT' ? 404 : 500);
    res.end(err.code === 'ENOENT' ? 'Not found' : err.message);
  }
}

const server = http.createServer(async (req, res) => {
  if (req.method === 'GET' && req.url === '/api/profiles') {
    try {
      sendJson(res, 200, await readProfiles());
    } catch (err) {
      sendJson(res, 500, { error: err.message });
    }
    return;
  }

  if (req.method === 'POST' && req.url === '/api/profiles') {
    await handleProfilesPost(req, res);
    return;
  }

  await serveStatic(req, res);
});

server.listen(port, () => {
  console.log(`VLearn Codelabs running at http://localhost:${port}`);
});
