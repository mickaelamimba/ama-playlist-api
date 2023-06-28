import { Test, TestingModule } from '@nestjs/testing';
import { MixtapeService } from './mixtape.service';

describe('MixtapeService', () => {
  let service: MixtapeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MixtapeService],
    }).compile();

    service = module.get<MixtapeService>(MixtapeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
