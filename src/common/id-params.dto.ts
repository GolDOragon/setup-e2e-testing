import { IsNotEmpty, IsUUID } from 'class-validator';

export class IdParams {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
