module.exports = {
  splitterFunc(args){
      const splitter = args.splitter;
      const splitted_msg = args.message.split(splitter);

      let result = [];
      for(let i = 0; i < splitted_msg.length; i++){
        result.push(splitted_msg[i]);
      }

      return {
        result: result
      }
  }
}
