import ky from 'ky'
const post_feed_instanse = ky.create({
    parseJson:(text) =>{
    return  JSON.parse(text,(key,value)=>{
        if(key.endsWith('At')) return new Date(value);
        return value;
      })
    }
});
export default post_feed_instanse