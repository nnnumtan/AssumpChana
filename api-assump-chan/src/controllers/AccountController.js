const { CreateAccountUseCase } = require('../usecases/account');
const repositories = require('../repositories')
const services = require('../services')

exports.createAccountValidations = CreateAccountUseCase.getValidators;
exports.createAccount = async (req, res, next) => {
  try {
    const { uid, email, nickname, name, address, lineToken } = req.body;
    const useCase = new CreateAccountUseCase(services, repositories);
    const result = await useCase.execute({ uid, email, nickname, name, address, lineToken });

    res.status(200).json({ data: result });
  } catch (err) {
    next(err);
  }
};
