const { parseMikroTikLog } = require("./parser");

test('should parse correctly messages with one topic', () => {
    const message = 'system lorem ipsum';
    const actual = parseMikroTikLog(message);

    expect(actual.topic).toBe('system');
    expect(actual.severity).toBe('info');
    expect(actual.extra_topics).toBe('');
    expect(actual.prefix).toBe('');
    expect(actual.message).toBe('lorem ipsum');
});

test('should parse correctly messages with two topics', () => {
    const message = 'system,warn lorem ipsum';
    const actual = parseMikroTikLog(message);

    expect(actual.topic).toBe('system');
    expect(actual.severity).toBe('warn');
    expect(actual.extra_topics).toBe('');
    expect(actual.prefix).toBe('');
    expect(actual.message).toBe('lorem ipsum');
});

test('should parse correctly messages with three topics', () => {
    const message = 'system,warn,account lorem ipsum';
    const actual = parseMikroTikLog(message);

    expect(actual.topic).toBe('system');
    expect(actual.severity).toBe('warn');
    expect(actual.extra_topics).toBe('account');
    expect(actual.prefix).toBe('');
    expect(actual.message).toBe('lorem ipsum');
});

test('should parse correctly messages with four topics', () => {
    const message = 'system,warn,account,login lorem ipsum';
    const actual = parseMikroTikLog(message);

    expect(actual.topic).toBe('system');
    expect(actual.severity).toBe('warn');
    expect(actual.extra_topics).toBe('account,login');
    expect(actual.prefix).toBe('');
    expect(actual.message).toBe('lorem ipsum');
});

test('should parse correctly messages with prefix', () => {
    const message = 'firewall,info iot: lorem ipsum';
    const actual = parseMikroTikLog(message);

    expect(actual.topic).toBe('firewall');
    expect(actual.severity).toBe('info');
    expect(actual.extra_topics).toBe('');
    expect(actual.prefix).toBe('iot');
    expect(actual.message).toBe('lorem ipsum');
});

test('should parse correctly invalid messages', () => {
    const message = '!lorem ipsum';
    const actual = parseMikroTikLog(message);

    expect(actual.topic).toBe('');
    expect(actual.severity).toBe('info');
    expect(actual.extra_topics).toBe('');
    expect(actual.prefix).toBe('');
    expect(actual.message).toBe('!lorem ipsum');
});

test('should parse correctly messages with numbers and dashes', () => {
    const message = 'dot1x,info,e-mail lorem ipsum';
    const actual = parseMikroTikLog(message);

    expect(actual.topic).toBe('dot1x');
    expect(actual.severity).toBe('info');
    expect(actual.extra_topics).toBe('e-mail');
    expect(actual.prefix).toBe('');
    expect(actual.message).toBe('lorem ipsum');
});
