/* exported counterGenerator getAndSet power betterCounterGenerator */


const counterGenerator = () => {
  let count = 0;
  return function inner() {
    count++;
    return count;
  }
}

const getAndSet = () => {
  let data;
  return {
    set: function (setData) {
      data = setData;
    },
    get: function () {
      return data;
    }
  }
}

const power = (exponent) => {
  if (typeof exponent === 'number') {
    return (number) => {
      return number ** exponent;
    };
  } else {
    return NaN;
  }
}

const betterCounterGenerator = (initial = 0) => {
  let count = initial;
  if(typeof initial === "number"){
    return{
      up : function(){
        count++;
        return count;
      },
      down : function(){
        count--;
        return count;
      },
      reset : function(){
        count = initial;
        return count;
      }
    }
  }else{
    return NaN;
  }
  
}
