describe('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    const response = await global.request
      .get('/user')
      .set('Accept', 'application/json');

    expect(response.headers['content-type']).toMatch(/json/);
    expect(response.status).toEqual(200);
    expect(response.body.length).toBe(0);
  });

  test('Post user', async () => {
    await setTimeout(() => {
      // small delay
    }, 1000);
    const response = await global.request
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        login: 'userForTest',
        password: 'secretpassword',
      });

    expect(response.status).toBe(201);

    const users = await global.request.get('/user');

    expect(users.body.length).toBe(1);
    // expect(users.body[0])
  });

  test('Create many users', async () => {
    let i = 0;

    await global.request
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        login: `userForTest${i++}`,
        password: 'secretpassword',
      });
    await global.request
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        login: `userForTest${i++}`,
        password: 'secretpassword',
      });
    await global.request
      .post('/user')
      .set('Accept', 'application/json')
      .send({
        login: `userForTest${i++}`,
        password: 'secretpassword',
      });

    const users = await global.request.get('/user');

    expect(users.body.length).toBe(4);
  });
});
