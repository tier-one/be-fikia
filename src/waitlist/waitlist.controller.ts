import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { WaitListDto } from './dto/waitlist.entity';
import { WaitListService } from './waitlist.service';

@ApiTags('Waitlist')
@Controller({
  path: 'waitlist',
  version: '1',
})
export class WaitlistController {
  constructor(private readonly waitListService: WaitListService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createWaitlist(@Body() waitListDto: WaitListDto): Promise<WaitListDto> {
    return this.waitListService.createWaitlist(waitListDto);
  }
}
