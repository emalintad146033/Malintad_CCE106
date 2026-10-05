const http = require('http');
const { URL } = require('url');

const PORT = 3001;

const students = [
  {
    id: 1,
    name: 'Juan Dela Cruz',
    email: 'juan@example.com',
    course: 'BS Information Technology',
  },
  {
    id: 2,
    name: 'Maria Santos',
    email: 'maria@example.com',
    course: 'BS Computer Science',
  },
  {
    id: 3,
    name: 'Pedro Garcia',
    email: 'pedro@example.com',
    course: 'BS Information Technology',
  },
  {
    id: 4,
    name: 'Ana Reyes',
    email: 'ana@example.com',
    course: 'BS Information Systems',
  },
];

const users = [
  {
    id: 1,
    name: 'Edieson Malintad',
    email: 'student@example.com',
    password: 'password123',
  },
];

const VALID_TOKEN = 'mock-student-token';

function sendJson(res, statusCode, data) {
  res.writeHead(statusCode, {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',
  });

  res.end(JSON.stringify(data));
}

function getToken(req) {
  const authorization = req.headers.authorization || '';

  if (!authorization.startsWith('Bearer ')) {
    return null;
  }

  return authorization.substring(7);
}

function isAuthenticated(req) {
  return getToken(req) === VALID_TOKEN;
}

function getRequestBody(req) {
  return new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk;
    });

    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch {
        reject(new Error('Invalid JSON body.'));
      }
    });

    req.on('error', reject);
  });
}

const server = http.createServer(async (req, res) => {
  const requestUrl = new URL(
    req.url || '/',
    `http://${req.headers.host || `localhost:${PORT}`}`
  );

  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    });

    res.end();
    return;
  }

  try {
    // POST /login
    if (req.method === 'POST' && requestUrl.pathname === '/login') {
      const body = await getRequestBody(req);

      const email = String(body.email || '').trim();
      const password = String(body.password || '');

      const user = users.find(
        (item) => item.email === email && item.password === password
      );

      if (!user) {
        sendJson(res, 401, {
          message: 'Invalid email or password.',
        });
        return;
      }

      sendJson(res, 200, {
        accessToken: VALID_TOKEN,
        user: {
          id: user.id,
          name: user.name,
          email: user.email,
        },
      });

      return;
    }

    // Authentication required below this point
    if (!isAuthenticated(req)) {
      sendJson(res, 401, {
        message: 'Unauthorized.',
      });
      return;
    }

    // GET /students
    if (req.method === 'GET' && requestUrl.pathname === '/students') {
      sendJson(res, 200, students);
      return;
    }

    // GET /students/:id
    const studentMatch = requestUrl.pathname.match(/^\/students\/([^/]+)$/);

    if (req.method === 'GET' && studentMatch) {
      const studentId = studentMatch[1];

      const student = students.find(
        (item) => String(item.id) === String(studentId)
      );

      if (!student) {
        sendJson(res, 404, {
          message: 'Student record not found.',
        });
        return;
      }

      sendJson(res, 200, student);
      return;
    }

    // GET /profile
    if (req.method === 'GET' && requestUrl.pathname === '/profile') {
      const user = users[0];

      sendJson(res, 200, {
        id: user.id,
        name: user.name,
        email: user.email,
      });

      return;
    }

    sendJson(res, 404, {
      message: 'Endpoint not found.',
    });
  } catch (error) {
    console.error(error);

    sendJson(res, 500, {
      message: 'Internal server error.',
    });
  }
});

server.listen(PORT, () => {
  console.log(`Mock API running at http://localhost:${PORT}`);
  console.log('Available endpoints:');
  console.log('POST /login');
  console.log('GET  /students');
  console.log('GET  /students/:id');
  console.log('GET  /profile');
});