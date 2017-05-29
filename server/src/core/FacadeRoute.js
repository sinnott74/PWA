const Route = require('./Route');
const TransactionInfo = require('./TransactionInfo');

/**
 * FacadeRoute configures a server side route.
 * @class
 * @extends {Route}
 * @inheritdoc
 */
class FacadeRoute extends Route {

  constructor(req, res) {
    super(req, res);

    if(!this.facade || typeof this.facade !== 'string') {
      throw new TypeError('facade method must be specified');
    }
  }

  async businessLogic() {
    let relativeFacadePath = this.facade;
    let Facade = require(relativeFacadePath);
    let facade = new Facade();
    let operation = this.operation;
    let facadeInput = this._createFacadeInput();

    TransactionInfo.bindEmitter(this.req);
    TransactionInfo.bindEmitter(this.res);
    return TransactionInfo.startTransaction(function() {
      return facade[operation](facadeInput);
    });
  }

  /**
 * Converts the req paremeters i.e. params/body/query into a facade input
 * @param {*} req
 * @param {*} properties
 */
  _createFacadeInput() {
    let facadeInput = {};

    for(let key in this.inputs) {
      let property = this.inputs[key];
      // check for ths property on params/body/query
      let parameter = (this.req.params[property]
        || this.req.body[property]
        || this.req.query[property]);
      facadeInput[property] = parameter;
    }

    return facadeInput;
  }
}

module.exports = FacadeRoute;