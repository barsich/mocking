import getLevel from '../app';
import fetchData from '../http';

jest.mock('../http');

beforeEach(() => {
  jest.resetAllMocks();
});

test('should call fetchData with correct URL', () => {
  fetchData.mockReturnValue({});
  getLevel(1);
  expect(fetchData).toBeCalledWith('https://server/user/1');
});

test('should process the response OK correctly', () => {
  fetchData.mockReturnValue({
    status: 'ok',
    level: 3,
  });
  expect(getLevel(1)).toBe('Ваш текущий уровень: 3');
});

test('should process the response NOT OK correctly', () => {
  fetchData.mockReturnValue({
    status: 404,
  });
  expect(getLevel(1)).toBe('Информация об уровне временно недоступна');
});
