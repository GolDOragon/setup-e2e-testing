describe('AppController (e2e)', () => {
  it('/ (GET)', async () => {
    await setTimeout(() => {
      // do small delay
    }, 5000);
    const response = await global.request.get('/user');
    // console.log(response);

    expect(response.statusCode).toBe(200);
    // expect(response.body).toEqual([]);
    expect(response.body.length).toBe(0);
  });
});
