const Blockchain = require('./index');
const Block = require('./block');

describe('Blockchain', () => {
  let bc;
  beforeEach(() => {
    bc = new Blockchain();
    bc2 = new Blockchain();
  });

  it('starts with genesis block', () => {
    expect(bc.chain[0]).toEqual(Block.genesis());
  });

  it('adds a new block', () => {
    const data = 'foo';
    bc.addBlock(data);
    expect(bc.chain[bc.chain.length - 1].data).toEqual(data);
  });

  it('validates a valid chain', () => {
    bc2.addBlock('foo');
    expect(bc.isValidChain(bc2.chain)).toBe(true);
  });

  it('invalidate a chain with a corrupt genesis block', () => {
    bc2.chain[0].data = 'Bad Data';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });

  it('invalidate corrupt chain', () => {
    bc2.addBlock('foo');
    bc2.chain[1].data = 'Not foo';
    expect(bc.isValidChain(bc2.chain)).toBe(false);
  });
});
