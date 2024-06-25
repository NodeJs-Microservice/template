const globalTeardown = async () => {
  if ((global as any).__MONGOOD__) {
    await (global as any).__MONGOOD__.stop();
  }
};

export default globalTeardown;
