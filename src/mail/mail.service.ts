import Handlebars from 'handlebars';
import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { I18nContext } from 'nestjs-i18n';
import { MailData } from './interfaces/mail-data.interface';
import { AllConfigType } from 'src/config/config.type';
import { MaybeType } from '../utils/types/maybe.type';
import { SendgridService } from './sendgrid.service';
@Injectable()
export class MailService {
  constructor(
    private readonly mailerService: MailerService,
    private readonly sendGridService: SendgridService,
    private readonly configService: ConfigService<AllConfigType>,
  ) {}

  async userSignUp(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let emailConfirmTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;

    if (i18n) {
      [emailConfirmTitle, text1, text2, text3] = await Promise.all([
        i18n.t('common.confirmEmail'),
        i18n.t('confirm-email.text1'),
        i18n.t('confirm-email.text2'),
        i18n.t('confirm-email.text3'),
      ]);
    }
    const frontendDomain = this.configService.get('app.frontendDomain', {
      infer: true,
    });
    const emailConfirmationLink = `${frontendDomain}/confirm-email/${mailData.data.hash}`;

    const emailText =
      `<p>{{text1}}</p>` +
      `<p>{{text2}}</p>` +
      `<p>{{text3}}</p>` +
      `${emailConfirmationLink}`;

    const template = Handlebars.compile(emailText);
    const data = { text1, text2, text3, emailConfirmationLink };
    const email = template(data);

    const mail = {
      to: mailData.to,
      subject: emailConfirmTitle,
      from: 'contact@fikia.io',
      html: email,
    };

    await this.sendGridService.send(mail);
  }

  async forgotPassword(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let resetPasswordTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;
    let text4: MaybeType<string>;

    if (i18n) {
      [resetPasswordTitle, text1, text2, text3, text4] = await Promise.all([
        i18n.t('common.resetPassword'),
        i18n.t('reset-password.text1'),
        i18n.t('reset-password.text2'),
        i18n.t('reset-password.text3'),
        i18n.t('reset-password.text4'),
      ]);
    }

    await this.mailerService.sendMail({
      to: mailData.to,
      subject: resetPasswordTitle,
      text: `${this.configService.get('app.frontendDomain', {
        infer: true,
      })}/reset-password/${mailData.data.hash} ${resetPasswordTitle}`,
      template: 'reset-password',
      context: {
        title: resetPasswordTitle,
        url: `${this.configService.get('app.frontendDomain', {
          infer: true,
        })}/reset-password/${mailData.data.hash}`,
        actionTitle: resetPasswordTitle,
        app_name: this.configService.get('app.name', {
          infer: true,
        }),
        text1,
        text2,
        text3,
        text4,
      },
    });
  }

  async joinWaitlistMail(mailData: MailData<{ hash: string }>): Promise<void> {
    const i18n = I18nContext.current();
    let joinWaitlistMailTitle: MaybeType<string>;
    let text1: MaybeType<string>;
    let text2: MaybeType<string>;
    let text3: MaybeType<string>;
    let text4: MaybeType<string>;
    let text5: MaybeType<string>;
    let text6: MaybeType<string>;
    let text7: MaybeType<string>;

    if (i18n) {
      [joinWaitlistMailTitle, text1, text2, text3, text4, text5, text6, text7] =
        await Promise.all([
          i18n.t('common.waitlist'),
          i18n.t('waitlist.text1'),
          i18n.t('waitlist.text2'),
          i18n.t('waitlist.text3'),
          i18n.t('waitlist.text4'),
          i18n.t('waitlist.text5'),
          i18n.t('waitlist.text6'),
          i18n.t('waitlist.text7'),
        ]);
    }

    const emailText =
      '<p>{{text1}}</p>' +
      "<p style='width:800px'>{{text2}}</p>" +
      "<p style='width:800px'>{{text3}}</p>" +
      "<p style='width:800px'>{{text4}}</p>" +
      "<p style='width:800px'>{{text5}}</p>" +
      "<p style='width:800px'>{{text6}}</p>" +
      "<p style='font-weight:600'>{{text7}}</p>";

    const template = Handlebars.compile(emailText);
    const data = { text1, text2, text3, text4, text5, text6, text7 };
    const email = template(data);

    const mail = {
      to: mailData.to,
      subject: joinWaitlistMailTitle,
      from: 'contact@fikia.io',
      html: email,
    };

    await this.sendGridService.send(mail);
  }
}
