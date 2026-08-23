const http = require('http');

const request = (method, path, body = null) => {
  return new Promise((resolve, reject) => {
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: {
        'Content-Type': 'application/json',
      }
    };
    
    if (body) {
      options.headers['Content-Length'] = Buffer.byteLength(body);
    }

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', (chunk) => {
        data += chunk;
      });
      res.on('end', () => {
        let parsed;
        try { parsed = JSON.parse(data); } catch (e) { parsed = data; }
        resolve({ status: res.statusCode, headers: res.headers, data: parsed });
      });
    });

    req.on('error', (e) => {
      reject(e);
    });

    if (body) {
      req.write(body);
    }
    req.end();
  });
};

(async () => {
  try {
    console.log('--- USERS ---');
    let res = await request('GET', '/api/users');
    console.log('GET /users:', res.status, Array.isArray(res.data?.data) ? `Users count: ${res.data.data.length}` : res.data);
    
    res = await request('POST', '/api/users/register', JSON.stringify({name: 'Test', schoolId: 's1', classId: 'c1'}));
    console.log('POST /register:', res.status, res.data);
    const newUserId = res.data?.data?.id;
    
    if (newUserId) {
      res = await request('GET', `/api/users/${newUserId}`);
      console.log('GET /users/:id:', res.status, res.data?.data?.name);

      res = await request('PATCH', `/api/users/${newUserId}`, JSON.stringify({xp: 100}));
      console.log('PATCH /users/:id:', res.status, res.data?.data?.xp);

      res = await request('DELETE', `/api/users/${newUserId}`);
      console.log('DELETE /users/:id:', res.status);
    }

    console.log('\n--- AI ---');
    res = await request('POST', '/api/ai/ask', JSON.stringify({question: 'hello'}));
    console.log('POST /ai/ask:', res.status, res.data);

    res = await request('POST', '/api/ai/explain-fun', JSON.stringify({topic: 'math'}));
    console.log('POST /ai/explain-fun:', res.status, res.data);

    res = await request('POST', '/api/ai/solve-image', JSON.stringify({}));
    console.log('POST /ai/solve-image:', res.status, res.data);

    console.log('\n--- DUELS ---');
    res = await request('POST', '/api/duel/create', JSON.stringify({subject: 'Math', playerId: '1'}));
    console.log('POST /duel/create:', res.status, res.data);
    const duelId = res.data?.data?.id;

    if (duelId) {
      res = await request('POST', `/api/duel/${duelId}/join`, JSON.stringify({playerId: '2'}));
      console.log('POST /duel/:id/join:', res.status, res.data?.data?.status);

      res = await request('POST', `/api/duel/${duelId}/answer`, JSON.stringify({playerId: '1', questionIndex: 0, answer: '4'}));
      console.log('POST /duel/:id/answer (correct):', res.status, res.data);

      res = await request('POST', `/api/duel/${duelId}/answer`, JSON.stringify({playerId: '2', questionIndex: 1, answer: 'Paris'}));
      console.log('POST /duel/:id/answer (correct, complete):', res.status, res.data);

      res = await request('GET', `/api/duel/${duelId}/result`);
      console.log('GET /duel/:id/result:', res.status, res.data);
    }

    console.log('\n--- LEADERBOARD ---');
    res = await request('GET', '/api/leaderboard/school-1');
    console.log('GET /leaderboard/:schoolId:', res.status, Array.isArray(res.data?.data) ? `Array[${res.data.data.length}]` : res.data);

    console.log('\n--- QUIZ ---');
    res = await request('POST', '/api/quiz/generate', JSON.stringify({subject: 'Science'}));
    console.log('POST /quiz/generate:', res.status, res.data?.data?.questions ? `Questions: ${res.data.data.questions.length}` : res.data);

  } catch (err) {
    console.error('Error during testing:', err.message);
  }
})();
