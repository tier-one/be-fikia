import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as SendGrid from '@sendgrid/mail';
import { AllConfigType } from 'src/config/config.type';

@Injectable()
export class SendgridService {
  constructor(private readonly configService: ConfigService<AllConfigType>) {
    const apiKey = this.configService.get<string>('mail.sendGridAPIKey', {
      infer: true,
    })!;
    SendGrid.setApiKey(apiKey);
  }

  async send(mail: SendGrid.MailDataRequired) {
    const transport = await SendGrid.send(mail);
    return transport;
  }
}
