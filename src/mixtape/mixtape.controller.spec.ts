import { Test, TestingModule } from '@nestjs/testing';
import { MixtapeController } from './mixtape.controller';

describe('MixtapeController', () => {
  let controller: MixtapeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MixtapeController],
    }).compile();

    controller = module.get<MixtapeController>(MixtapeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
