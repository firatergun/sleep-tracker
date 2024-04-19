import { createMockReq, createMockResp } from '../../../utils/test-util';

const mockMorgan = jest.fn();

jest.mock('morgan', () => mockMorgan);

const mockHttp = jest.fn();

jest.mock('../../../utils/logger', () => ({
  http: mockHttp,
}));

describe('requestLogger middleware', () => {
  require('../../../middleware/request-logger');

  const req = createMockReq();
  const res = createMockResp();

  const formatCallback = mockMorgan.mock.calls[0][0];
  const options = mockMorgan.mock.calls[0][1];

  let tokens: any;

  beforeEach(() => {
    tokens = {
      method: jest.fn().mockReturnValue('POST'),
      url: jest.fn().mockReturnValue('/testUrl'),
      status: jest.fn().mockReturnValue(400),
      res: jest.fn().mockReturnValue(11234),
      'response-time': jest.fn().mockReturnValue(100),
    };
  });

  it('should be configured correctly with morgan', () => {
    const expectedJsonStr =
      '{"method":"POST","url":"/testUrl","status":400,"content_length":11234,"response_time":100}';

    const message = formatCallback(tokens, req, res);

    expect(message).toEqual(expectedJsonStr);

    options.stream.write(expectedJsonStr);

    expect(mockHttp).toBeCalledTimes(1);
    expect(mockHttp).toBeCalledWith(`incoming-request`, JSON.parse(expectedJsonStr));
  });

  it('should print null for status if status not found', () => {
    tokens.status = jest.fn().mockReturnValue(undefined);
    const message = formatCallback(tokens, req, res);

    expect(message).toEqual(
      '{"method":"POST","url":"/testUrl","status":null,"content_length":11234,"response_time":100}',
    );
  });

  it('should print 0 for response_time if there is no response time', () => {
    tokens['response-time'] = jest.fn().mockReturnValue(undefined);
    const message = formatCallback(tokens, req, res);

    expect(message).toEqual(
      '{"method":"POST","url":"/testUrl","status":400,"content_length":11234,"response_time":0}',
    );
  });
});
