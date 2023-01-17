const { SetTimeUseCase } = require('../usecases/time');
const repositories = require('../repositories')
const services = require('../services')
const { lineNotify } = require('../configs');

exports.setTimeValidations = SetTimeUseCase.getValidators;
exports.setTime = async (req, res, next) => {
  try {
    const { label, alarm, repeat, accountId, amountunit, drugName } = req.body;
    const useCase = new SetTimeUseCase(services, repositories, lineNotify);
    const result = await useCase.execute({ label, alarm, repeat, accountId, amountunit, drugName });
    
    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};