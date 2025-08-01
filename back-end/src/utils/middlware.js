


module.exports = async function Middleware( model, _id, detailes, ...handlers) {
  
  let handlerIndex = -1;
  let data = null;
  let rejectStatu = {
    state: false,
    error: null
  };

  const orignalId = _id;

  let filter = {};

  if (! _id) {
    throw new Error('Invalid _id');
  }

  if (! model || typeof model.findOne !== 'function' || typeof model.updateOne !== 'function') {
    throw new Error('Invalid model provided to middleware');
  }

  for (const handler of handlers) {
    if (typeof handler == 'function' && handler.required) {

      filter = Object.assign(filter, handler.required);

    }else 
      throw new Error('Next handler is not a function');
  }

  data = await model.findOne({_id: orignalId}, filter);

  if (! data) {
    return {
      statu: false
    }
  }

  if (handlers.length === 0) {
    throw new Error('No middleware handlers provided');
  }

  function reject(error) {
    rejectStatu.state = true;
    rejectStatu.error = error;
  }

  const next = async()=> {
    handlerIndex ++;

    if (handlerIndex >= handlers.length) return;

    const handler = handlers[handlerIndex];

    await handler(data, detailes, next, reject);
  }
  await next();

  if (! rejectStatu.state) {

    await model.updateOne(
      {_id: orignalId},
      {$set: data},
    );
    return {
      statu: true,
    }
  }else {
    return {
      statu: false,
      error: rejectStatu.error
    }
  }
}

