describe('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    await setTimeout(() => {
      // do small delay
    }, 5000);
    const response = await global.request.get('/user');

    expect(response.statusCode).toBe(200);
    expect(response.body.length).toBe(0);
  });
});
