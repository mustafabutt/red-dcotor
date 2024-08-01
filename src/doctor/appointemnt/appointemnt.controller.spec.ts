import { Test, TestingModule } from '@nestjs/testing';
import { AppointemntController } from './appointemnt.controller';

describe('AppointemntController', () => {
  let controller: AppointemntController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AppointemntController],
    }).compile();

    controller = module.get<AppointemntController>(AppointemntController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
