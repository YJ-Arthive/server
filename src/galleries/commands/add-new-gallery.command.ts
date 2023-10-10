import { AddNewGalleryRequestDto } from '../dtos/add-new-gallery-request.dto';

export class AddNewGalleryCommand {
  constructor(readonly addRequest: AddNewGalleryRequestDto) {}
}
