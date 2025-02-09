

export const random = (len: number) => {
  let options = "djhfas123fawefasbdfasufawefwefasdb35345858435287340";
  let length = options.length
  let ans = "";
  for(let i = 0; i<length; i++){
    ans +=options[Math.floor(Math.random()*length)]
  }
  return ans;
}


