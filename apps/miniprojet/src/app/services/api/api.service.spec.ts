import { ApiService } from './api.service';

describe('ApiService', () => {
  const service: ApiService = new ApiService();

  it('should create', () => {
    expect(service).toBeTruthy();
  });
});
