import { NextFunction, Request, Response } from 'express';

export const createMockReq = (): Request => {
  const mockReq = {
    body: {},
    query: {},
    params: {},
  } as Request;
  return mockReq;
};

export const createMockResp = (): Response => {
  const mockResp = {} as Response;
  mockResp.status = jest.fn().mockReturnValue(mockResp);
  mockResp.send = jest.fn().mockReturnValue(mockResp);
  mockResp.json = jest.fn().mockReturnValue(mockResp);
  mockResp.setHeader = jest.fn().mockReturnValue(mockResp);
  return mockResp;
};

export const createMockNext = (): NextFunction => {
  const mockNext = jest.fn() as NextFunction;
  return mockNext;
};

export const createTestData = () => {
  return {
    id: 'uuid',
    aString: 'value1',
    aNumber: 5,
    aDecimal: 7.85,
    anObject: {
      key: 'value',
    },
    anArray: ['item-0', 'item-1'],
    aTime: Date.now(),
  };
};

export const mockGet = jest.fn();
export const mockPost = jest.fn();
export const mockPut = jest.fn();
export const mockPatch = jest.fn();
export const mockDelete = jest.fn();
export const mockUse = jest.fn();

export const mockExpress = () => {
  jest.mock('express', () => ({
    Router: () => ({
      get: mockGet,
      post: mockPost,
      put: mockPut,
      patch: mockPatch,
      delete: mockDelete,
      use: mockUse,
    }),
    static: jest.fn(),
  }));
};

mockExpress();
