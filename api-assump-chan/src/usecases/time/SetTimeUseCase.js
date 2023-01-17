const joi = require("joi");
const logger = require("../../utils/logger")("SeTimeUseCase");
const { ValidationError } = require("../../errors");
const { lineNotify } = require("../../utils/lineNotify");
const cron = require("node-cron");

/**
 * SetTimeUseCase
 */
class SetTimeUseCase {
  /**
   * Constructor›
   * @param {TimeService} TimeService
   * @param {Repositories} repositories
   * @param {{ token: string, url: string }} lineNotify
   */
  constructor({ TimeService, AccountService }, repositories, lineNotify) {
    this.TimeService = TimeService;
    this.repositories = repositories;
    this.AccountService = AccountService;
    this.lineNotify = lineNotify;
  }

  /**
   * Validators
   */
  static getValidators = joi.object({
    accountId: joi.string().required(),
    label: joi.string().required(),
    alarm: joi.string().required(),
    repeat: joi.array().required(),
    drugName: joi.string().required(),
    amountunit: joi.string().required(),
  });

  /**
   * Execute
   */
  async execute({ label, alarm, repeat, accountId, amountunit, drugName }) {
    const accountService = new this.AccountService(this.repositories);
    const timeService = new this.TimeService(this.repositories);

    const [hour, minute] = String(alarm).split(":");
    let time = `* ${minute} ${hour} * * `;
    let i = 0;
    for (const item of repeat) {
      i += 1;
      if (i > 1) {
        time += `,`;
      }
      if (item == 0) {
        time += 'Sun';
      } else if (item == 1){
        time += 'Mon';
      }else if (item == 2){
        time += 'Tue'
      }else if (item == 3){
        time += 'Wed'
      }else if (item == 4){
        time += 'Thu'
      }else if (item == 5){
        time += 'Fr'
      }else if (item == 6){
        time += 'Sat'
      }
    }
    time = time.toString();

    // if(!time[repeat]) {
    if (!time) {
      logger.error(`Failed to set time accountId=${accountId}`, {
        label,
        alarm,
        repeat,
        accountId,
        amountunit,
        drugName,
      });
      throw new ValidationError("Cannot to set time");
    }

    const [, , , , , every] = time.split(" ");

    const info = { every, pattern: time };
    await timeService.setTime({
      label,
      alarm,
      info,
      accountId,
      amountunit,
      drugName,
    });
    const { lineToken } = await accountService.findByAccountId(accountId);
    const payload = {
      message: `${drugName} ${amountunit} ${label}`,
      token: lineToken,
      url: this.lineNotify.url,
    };

    /*
      * * * * * *
      | | | | | |
      | | | | | day of week   ( 0-7 or names, 0 or 7 are sunday )
      | | | | month         ( 1-12 or names )
      | | | day of month  ( 1-31 )
      | | hour          ( 0-23 )
      | minute        ( 0-59 )
      second        ( 0-59 )
    */
    let once = 1;
    cron.schedule(
      // time[repeat],
      time,
      async () => {
        if (once) {
          await lineNotify(payload);
          once = 0;
        }
      },
      { timezone: "Asia/Bangkok" }
    );

    logger.info(`Successfully set time accountId=${accountId}`, {
      label,
      alarm,
      repeat,
      accountId,
      amountunit,
      drugName,
    });

    return { message: "Successfully set time" };
  }
}

module.exports = SetTimeUseCase;
