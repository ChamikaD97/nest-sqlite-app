export class CreateFacLineDto {
  lineCode!: string;
  lineId!: string;
  officer!: string;
  startedDate!: Date;
}

export class UpdateFacLineDto {
  lineCode?: string;
  lineId?: string;
  officer?: string;
  startedDate?: Date;
}
